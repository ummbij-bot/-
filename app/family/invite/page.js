'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVitality } from '../../context/VitalityContext';
import { joinFamilyGroup, createFamilyGroup, generateInviteLink } from '../../../lib/api/familyService';
import { toast } from 'react-hot-toast';

function InviteContent() {
  const { user, language, t } = useVitality();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [familyId, setFamilyId] = useState(searchParams.get('id') || '');
  const [inviteLink, setInviteLink] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (user?.familyId) {
      setInviteLink(generateInviteLink(user.familyId));
    }
  }, [user]);

  const handleCreate = async () => {
    if (!user) return toast.error(t?.('login_required') || '로그인이 필요합니다.');
    const res = await createFamilyGroup(user.uid, `${user.displayName || 'Masil'}의 가족`);
    if (res.success) {
      toast.success('가족 그룹이 생성되었습니다! 🎉');
      setInviteLink(generateInviteLink(res.familyId));
    } else {
      toast.error('그룹 생성 실패: ' + res.error);
    }
  };

  const handleJoin = async () => {
    if (!user) return toast.error(t?.('login_required') || '로그인이 필요합니다.');
    if (!familyId) return toast.error('가족 ID를 입력해주세요.');
    
    setIsJoining(true);
    const res = await joinFamilyGroup(user.uid, familyId);
    if (res.success) {
      toast.success('가족 그룹에 합류했습니다! ❤️');
      router.push('/family/dashboard');
    } else {
      toast.error(res.message || '가입 실패');
    }
    setIsJoining(false);
  };

  return (
    <div className="page-container bg-white">
      <div className="content-wrapper pb-24">
        <header className="mb-10 text-center">
          <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">가족 마실 초대</h1>
          <p className="text-gray-500 mt-2 font-medium">함께 걸으며 서로의 활력을 챙겨주세요.</p>
        </header>

        {user?.familyId ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 text-center shadow-inner">
              <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-4">나의 초대 QR코드</h2>
              <div className="w-48 h-48 bg-white mx-auto rounded-3xl shadow-lg border-4 border-primary/10 flex items-center justify-center text-4xl mb-4">
                📱
              </div>
              <p className="text-xs text-gray-400 font-bold">가족에게 위 화면을 보여주세요.</p>
            </div>

            <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
              <h3 className="text-sm font-black text-gray-800 mb-2">초대 링크 공유하기</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={inviteLink} 
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono text-gray-500"
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(inviteLink);
                    toast.success('복사되었습니다!');
                  }}
                  className="bg-primary text-white px-4 py-3 rounded-xl text-xs font-black uppercase"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/family/dashboard')}
              className="w-full py-5 bg-gray-900 text-white rounded-3xl text-lg font-black shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              가족 대시보드로 이동
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 text-center">
              <p className="text-gray-600 mb-6 font-medium leading-relaxed">아직 가족 그룹에 소속되어 있지 않습니다.<br/>새로운 그룹을 만들거나 초대받은 ID를 입력하세요.</p>
              
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="가족 ID (예: family_abc123)"
                    value={familyId}
                    onChange={(e) => setFamilyId(e.target.value)}
                    className="w-full bg-white border-2 border-blue-100 rounded-2xl px-6 py-4 text-sm font-bold focus:border-primary outline-none transition-all"
                  />
                </div>
                <button 
                  onClick={handleJoin}
                  disabled={isJoining}
                  className="w-full py-4 bg-primary text-white rounded-2xl text-base font-black shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
                >
                  {isJoining ? '처리 중...' : '가족 그룹 합류하기'}
                </button>
              </div>
              
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-blue-100"></div>
                <span className="px-4 text-[10px] font-black text-blue-300 uppercase tracking-widest">또는</span>
                <div className="flex-1 h-px bg-blue-100"></div>
              </div>

              <button 
                onClick={handleCreate}
                className="w-full py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl text-base font-black hover:border-primary hover:text-primary transition-all"
              >
                새로운 가족 그룹 만들기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FamilyInvitePage() {
  return (
    <Suspense fallback={<div className="flex-center h-screen font-black text-primary">Loading...</div>}>
      <InviteContent />
    </Suspense>
  );
}
