'use client';

import { useState } from 'react';
import { useVitality } from '../context/VitalityContext';

/**
 * GlobalFeed Component
 * "Instagram for Seniors" with auto-translation.
 */
export default function GlobalFeed() {
  const { language } = useVitality();
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Maria (Spain)',
      image: 'https://images.unsplash.com/photo-1548243688-c7e5a87be755?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      text: '¡Caminando por el parque con mi nieto!',
      translation: 'Walking in the park with my grandson!',
      likes: 24
    },
    {
      id: 2,
      user: 'Kenji (Japan)',
      image: 'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      text: '今日の富士山はとても綺麗です。',
      translation: 'Mt. Fuji looks beautiful today.',
      likes: 156
    },
    {
      id: 3,
      user: 'Sarah (UK)',
      image: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      text: 'Lovely garden walk this morning.',
      translation: 'Lovely garden walk this morning.',
      likes: 42
    }
  ]);

  const toggleTranslate = (id) => {
    // Determine target language for demo (simplified)
    // In real app, call Translation API
    alert('AI 번역 중... (Demo)');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <span>🌍</span> 골든워커 (Global)
        </h3>
        
        <div className="space-y-6">
            {posts.map(post => (
                <div key={post.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                             {/* Placeholder Avatar */}
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user}`} alt={post.user} />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{post.user}</span>
                    </div>
                    
                    <div className="rounded-xl overflow-hidden mb-3 h-48 relative">
                        <img src={post.image} alt="Post" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex justify-between items-start">
                        <p className="text-sm text-gray-800 flex-1 mr-2">
                            {post.text}
                        </p>
                        <button 
                            onClick={() => toggleTranslate(post.id)}
                            className="text-xs text-blue-500 font-bold whitespace-nowrap bg-blue-50 px-2 py-1 rounded-full"
                        >
                            A/가 번역
                        </button>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-gray-400 text-xs">
                        <span className="text-red-400">❤️</span> {post.likes} 응원
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}
