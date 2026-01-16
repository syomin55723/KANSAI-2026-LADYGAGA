import React, { useMemo } from 'react';
import { Sun, Cloud, CloudRain, CloudSun, Moon } from 'lucide-react';

interface WeatherWidgetProps {
  city: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city }) => {
  // Generate 24h forecast starting from current hour
  const forecast = useMemo(() => {
    const currentHour = new Date().getHours();
    const data = [];
    
    for (let i = 0; i < 24; i++) {
      const hour = (currentHour + i) % 24;
      const displayTime = i === 0 ? '現在' : `${hour.toString().padStart(2, '0')}:00`;
      
      // Mock logic for icon/temp based on time of day
      let Icon = Sun;
      let temp = 15;
      let color = 'text-amber-500';

      if (hour < 6 || hour > 18) {
        Icon = Moon;
        color = 'text-indigo-400';
        temp = 10;
      } else if (hour === 12) {
        Icon = Sun;
        color = 'text-orange-500';
        temp = 18;
      } else {
        Icon = CloudSun;
        color = 'text-gray-500';
        temp = 14;
      }

      data.push({ time: displayTime, icon: Icon, temp, color });
    }
    return data;
  }, []);

  return (
    <div className="w-full py-4 bg-[#FDFCF8]">
      <div className="flex justify-between items-end mb-4 px-2">
        <div>
          <h2 className="text-2xl font-serif-jp font-bold text-gray-900 tracking-wide mb-1">{city}</h2>
          <p className="text-xs text-gray-400 font-serif-jp tracking-wider">未來24小時天氣預報</p>
        </div>
      </div>
      
      {/* Scrollable Container */}
      <div className="flex overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 space-x-6 snap-x">
        {forecast.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 min-w-[3.5rem] snap-start">
            <span className="text-[10px] text-gray-400 font-serif-jp tracking-wider whitespace-nowrap">{item.time}</span>
            <item.icon size={20} className={`${item.color} stroke-[1.5]`} />
            <span className="text-lg font-medium text-gray-600 font-serif-jp">{item.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};