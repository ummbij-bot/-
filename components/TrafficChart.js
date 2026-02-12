'use client';

export default function TrafficChart() {
  // Mock Data: Hourly visitors (10am - 8pm)
  const data = [12, 19, 35, 42, 28, 15, 22, 30, 45, 38, 20];
  const max = Math.max(...data);
  
  return (
    <div className="w-full h-40 flex items-end justify-between gap-2 mt-4">
      {data.map((val, i) => (
        <div key={i} className="flex flex-col items-center flex-1 group">
            <div className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 mb-1">{val}명</div>
            <div 
                className="w-full bg-mint-500 rounded-t-md transition-all hover:bg-mint-600"
                style={{ height: `${(val / max) * 100}%` }}
            />
            <div className="text-[10px] text-gray-400 mt-1">{i + 10}시</div>
        </div>
      ))}
    </div>
  );
}
