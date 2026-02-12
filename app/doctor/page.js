'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { sendMessageToDrMasil } from '../../lib/ai/chatbot_service';

export default function DoctorPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: '안녕하세요! 건강 주치의 **Dr. 마실**입니다. 👨‍⚕️\n오늘 어디 불편하신 곳은 없으신가요?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendMessageToDrMasil(userMsg.text);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: response };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-content" style={{ paddingBottom: '80px', background: '#f5f7fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header className="bg-white p-4 shadow-sm flex items-center gap-3 sticky top-0 z-10">
            <button onClick={() => router.back()} className="text-2xl">←</button>
            <div>
                <h1 className="text-lg font-bold flex items-center gap-2">
                    Dr. Masil
                    <span className="badge badge-mint text-xs">AI Doctor</span>
                </h1>
                <p className="text-xs text-green-600 font-medium">● 온라인 (답변 대기 중)</p>
            </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div 
                        className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-wrap shadow-sm text-sm ${
                            msg.sender === 'user' 
                                ? 'bg-gold-500 text-white rounded-tr-none' 
                                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                        }`}
                        dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }}
                    />
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                        <span className="animate-pulse">✍️ Dr. Masil이 답변을 작성 중입니다...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="증상을 말씀해 주세요 (예: 무릎이 아파요)"
                    className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <button 
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-gold-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md disabled:bg-gray-300"
                >
                    ➤
                </button>
            </div>
        </div>
    </main>
  );
}
