'use client';
import Icon from './Icon';

export default function GroupCard({ group }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    return `${month}월 ${day}일 ${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card mb-md pressable" style={{ padding: '0', overflow: 'hidden' }}>
      {/* Image Header */}
      <div className="relative h-32 overflow-hidden">
        <img 
          src={group.image} 
          alt={group.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-3 right-3">
          <h3 className="text-white font-bold text-lg">{group.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-secondary mb-3">
          <Icon name="MapPin" size={16} />
          <span>{group.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-secondary mb-1">참여자</div>
            <div className="font-bold text-primary">{group.members}명</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-secondary mb-1">거리</div>
            <div className="font-bold">{group.distance}</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-xs text-secondary mb-1">난이도</div>
            <div className="font-bold">{group.difficulty}</div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Calendar" size={16} color="var(--primary)" />
            <span className="font-medium">{formatDate(group.nextWalk)}</span>
          </div>
          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
}
