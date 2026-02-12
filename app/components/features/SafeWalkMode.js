'use client';
import { useState } from 'react';
import Icon from '../Icon';
import toast from 'react-hot-toast';

export default function SafeWalkMode() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '딸 김영희',
    phone: '010-1234-5678',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    if (!isEnabled) {
      // Request location permission
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setIsEnabled(true);
            toast.success('안심 귀가 모드가 활성화되었습니다');
            console.log('Safe Walk activated at:', position.coords);
          },
          (error) => {
            toast.error('위치 권한이 필요합니다');
            console.error('Location error:', error);
          }
        );
      } else {
        toast.error('이 기기에서는 위치 서비스를 사용할 수 없습니다');
      }
    } else {
      setIsEnabled(false);
      toast('안심 귀가 모드가 비활성화되었습니다');
    }
  };

  const handleSaveContact = () => {
    setIsEditing(false);
    toast.success('비상 연락처가 저장되었습니다');
  };

  return (
    <div className="card">
      <div className="flex items-start gap-3 mb-md">
        <div className={`p-3 rounded-full ${isEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
          <Icon 
            name="Shield" 
            size={24} 
            color={isEnabled ? 'green' : 'var(--gray-400)'}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">안심 귀가 모드</h3>
          <p className="text-sm text-secondary leading-relaxed">
            산책 중 이상 패턴 감지 시 자동으로 가족에게 알립니다
          </p>
        </div>
        <button
          onClick={handleToggle}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            isEnabled ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
              isEnabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Status Indicator */}
      {isEnabled && (
        <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-md flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-700 font-medium">
            현재 위치를 모니터링하고 있습니다
          </span>
        </div>
      )}

      {/* Emergency Contact */}
      <div className="border-t pt-md mt-md">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold">비상 연락처</h4>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-primary pressable"
          >
            {isEditing ? '취소' : '수정'}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-sm text-secondary block mb-1">이름</label>
              <input
                type="text"
                value={emergencyContact.name}
                onChange={(e) => setEmergencyContact({...emergencyContact, name: e.target.value})}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                style={{ fontSize: '16px' }}
              />
            </div>
            <div>
              <label className="text-sm text-secondary block mb-1">전화번호</label>
              <input
                type="tel"
                value={emergencyContact.phone}
                onChange={(e) => setEmergencyContact({...emergencyContact, phone: e.target.value})}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                style={{ fontSize: '16px' }}
              />
            </div>
            <button
              onClick={handleSaveContact}
              className="btn-primary w-full"
            >
              저장하기
            </button>
          </div>
        ) : (
          <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="var(--primary)" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{emergencyContact.name}</div>
              <div className="text-sm text-secondary">{emergencyContact.phone}</div>
            </div>
            <Icon name="Phone" size={20} color="var(--primary)" />
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="border-t pt-md mt-md">
        <h4 className="font-bold mb-3 flex items-center gap-2">
          <Icon name="Info" size={16} />
          <span className="text-sm">작동 방식</span>
        </h4>
        <ul className="text-sm text-secondary space-y-2">
          <li className="flex gap-2">
            <span>•</span>
            <span>15분 이상 같은 위치에 머물 경우 확인 알림</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>예상 도착 시간보다 30분 지연 시 가족에게 자동 알림</span>
          </li>
          <li className="flex gap-2">
            <span>•</span>
            <span>비상 상황 시 음량 버튼 5회 연속 클릭으로 즉시 알림</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
