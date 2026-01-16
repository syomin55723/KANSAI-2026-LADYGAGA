
import React, { useState, useEffect, useRef } from 'react';
import { EventItem, EventTag } from '../types';
import { 
  Train, 
  MapPin, 
  Navigation,
  Utensils,
  Camera,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Ticket,
  Music,
  Bed,
  Car,
  Crown,
  Sparkles,
  QrCode,
  CalendarClock,
  Users,
  Map as MapIcon,
  Flame, // For Daruma
  Zap, // For Gaga
  Disc, // For Music Album
  AlertTriangle, // For Alert
  AlertCircle, // For Subtle Important
  Info // For Transport details
} from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  city: string;
  isLast: boolean;
}

// Export for use in App.tsx to match colors
export const getCategoryIcon = (tag: EventTag, size: number = 12) => {
  switch (tag) {
    case 'TRANSPORT': return <Train size={size} />;
    case 'FOOD': return <Utensils size={size} />;
    case 'SIGHTSEEING': return <Camera size={size} />;
    case 'SHOPPING': return <ShoppingBag size={size} />;
    case 'FUN': return <Music size={size} />;
    case 'CHECK-IN': return <Bed size={size} />;
    default: return <Car size={size} />;
  }
};

// Japanese Traditional Colors (Nippon Colors) - Muted & Elegant
export const getCategoryColor = (tag: EventTag) => {
    switch(tag) {
        case 'FOOD': return '#C46243'; // 柿色 Kaki-iro (Terra Cotta)
        case 'SIGHTSEEING': return '#6A8372'; // 利休茶 Rikyucha (Sage Green) - More distinct green
        case 'TRANSPORT': return '#3E5C76'; // 藍鉄 Aitetsu (Indigo Iron) - More distinct blue
        case 'SHOPPING': return '#A86965'; // 蘇芳香 Suoukou (Dusty Rose)
        case 'CHECK-IN': return '#6E552F'; // 煤竹色 Susutake-iro (Smoked Bamboo)
        case 'FUN': return '#8A6BBE'; // 藤紫 Fuji-murasaki (Wisteria)
        default: return '#949495'; // 銀鼠 Ginnezu (Silver Grey)
    }
};

export const EventCard: React.FC<EventCardProps> = ({ event, city, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  // Scroll Reveal Logic
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { 
        threshold: 0.1,
        rootMargin: "20px"
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
        if (domRef.current) observer.disconnect();
    };
  }, []);
  
  // Dynamic color logic
  let themeColor = getCategoryColor(event.tag);
  
  if (event.specialTheme === 'FOX') {
      themeColor = '#C9171E';
  }

  if (event.isSpecial) {
      if (event.specialTheme === 'RED') themeColor = '#D3381C';
      else if (event.specialTheme === 'GAGA') themeColor = '#F472B6'; 
      else if (event.specialTheme === 'ALERT') themeColor = '#EF4444'; 
      else themeColor = '#B48811'; // Gold
  }
  
  const handleNav = (e: React.MouseEvent) => {
      e.stopPropagation();
      const query = event.address || `${event.title} ${city}`;
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  };

  const handleTransitNav = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (event.from && event.to) {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(event.from)}&destination=${encodeURIComponent(event.to)}&travelmode=transit`, '_blank');
    }
  };

  const handleBookingLink = (e: React.MouseEvent) => {
      e.stopPropagation();
      if(event.booking?.url) window.open(event.booking.url, '_blank');
  };

  const animationClass = isVisible ? 'reveal-visible' : 'reveal-hidden';

  // --- Transit Route Component (Minimalist Adjustment) ---
  const TransitRouteWidget = () => {
    if (!event.from || !event.to) return null;
    return (
      <div 
        onClick={handleTransitNav}
        className="mt-1 flex items-center gap-1.5 py-1 text-[#9CA3AF] hover:text-[#2D2926] active:opacity-60 transition-all cursor-pointer w-fit"
      >
        <MapPin size={10} className="shrink-0" />
        <div className="text-[10px] font-medium font-serif-jp flex items-center gap-1.5 tracking-tight">
          <span>{event.from}</span>
          <span className="opacity-40 font-sans">→</span>
          <span>{event.to}</span>
        </div>
      </div>
    );
  };

  // Special Card Layout (Full Width)
  if (event.isSpecial) {
    const isRed = event.specialTheme === 'RED';
    const isGaga = event.specialTheme === 'GAGA';
    const isAlert = event.specialTheme === 'ALERT';
    
    let shimmerClass = isRed ? 'bg-red-shimmer' : 'bg-gold-shimmer';
    let mainBgClass = 'bg-[#FFFEFA]';
    let borderColor = isRed ? 'border-[#F4A4A4]' : 'border-[#E6C888]';
    let mainTextColor = isRed ? 'text-[#C9171E]' : 'text-[#8A6A0A]';
    let accentColor = isRed ? 'text-[#D3381C]' : 'text-[#B48811]';
    let highlightBg = isRed ? 'bg-[#FFF5F5]' : 'bg-[#FFFCF5]';
    let highlightBorder = isRed ? 'border-[#FFD1D1]' : 'border-[#F5E6C9]';
    let btnGradient = isRed ? 'from-[#D3381C] to-[#C9171E]' : 'from-[#C5A059] to-[#B48811]';
    let icon = isRed ? <Flame size={12} fill="#D3381C" /> : <Crown size={12} fill="#B48811" />;
    let badgeText = isRed ? 'Victory Daruma' : 'Special Experience';
    let descTextColor = 'text-[#6B5D4D]';

    if (isGaga) {
        shimmerClass = 'bg-gradient-to-r from-[#F472B6] via-[#A78BFA] to-[#34D399] animate-pulse';
        mainBgClass = 'bg-[#111]';
        borderColor = 'border-[#333]';
        mainTextColor = 'text-white';
        accentColor = 'text-[#F472B6]';
        highlightBg = 'bg-[#222]';
        highlightBorder = 'border-[#444]';
        btnGradient = 'from-[#DB2777] to-[#9333EA]'; 
        icon = <Zap size={12} className="text-[#34D399]" fill="currentColor" />;
        badgeText = 'THE MAIN EVENT';
        descTextColor = 'text-gray-300';
    } 
    else if (isAlert) {
        shimmerClass = 'hidden'; 
        mainBgClass = 'bg-[#DC2626] active:translate-y-[2px] transition-transform shadow-xl';
        borderColor = 'border-transparent border-b-[6px] border-b-[#991B1B]'; 
        mainTextColor = 'text-white';
        accentColor = 'text-[#FEE2E2]';
        highlightBg = 'bg-[#B91C1C]';
        highlightBorder = 'border-[#7F1D1D]';
        btnGradient = 'from-[#7F1D1D] to-[#991B1B]';
        icon = <AlertTriangle size={12} className="text-[#FEE2E2]" fill="currentColor" />;
        badgeText = 'MUST NOT MISS';
        descTextColor = 'text-[#FEF2F2]';
    }

    return (
      <div 
        ref={domRef}
        className={`flex w-full mb-8 mt-2 ${animationClass}`}
      >
         <div className="w-full relative group cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
             <div className={`absolute -inset-[3px] ${shimmerClass} rounded-xl blur-[1px] opacity-100`}></div>
             <div className={`relative ${mainBgClass} rounded-xl p-5 border ${borderColor} shadow-sm transition-colors duration-300 overflow-hidden`}>
                 <div className="flex items-start gap-3 mb-3 relative z-10">
                    <span className={`font-serif-jp text-xl font-bold leading-none mt-1 ${accentColor}`}>{event.time}</span>
                    <div className="mt-1.5"><div className={`w-1.5 h-1.5 rotate-45 ${isGaga ? 'bg-[#34D399]' : (isRed ? 'bg-[#C9171E]' : (isAlert ? 'bg-white' : 'bg-[#B48811]'))}`}></div></div>
                    <div className="flex-1">
                        <h3 className={`text-2xl font-black leading-tight mb-1 ${mainTextColor} ${isGaga ? 'font-sans tracking-tighter italic' : 'font-serif-jp'}`}>
                          {event.title}
                        </h3>
                        <div className={`flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] uppercase ${accentColor}`}>
                               {icon}
                               <span>{badgeText}</span>
                        </div>
                    </div>
                    <div className={accentColor}>
                       {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                 </div>

                 <p className={`text-sm font-serif-jp leading-relaxed mb-1 relative z-10 ${descTextColor}`}>
                    {event.description}
                 </p>

                 {/* Transit Route Widget */}
                 <TransitRouteWidget />

                 <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1200px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                    <div className={`pt-4 border-t border-dashed space-y-4 ${isGaga ? 'border-[#444]' : (isRed || isAlert ? 'border-[#FCA5A5]/30' : 'border-[#F0E6D2]')}`}>
                       {event.vocab && event.vocab.length > 0 && (
                          <div className="mb-2">
                              <div className={`text-[9px] uppercase tracking-widest mb-2 font-bold ${isGaga ? 'text-gray-500' : (isAlert ? 'text-red-200' : 'text-[#A8A29E]')}`}>Point & Speak</div>
                              <div className="grid grid-cols-1 gap-2">
                                  {event.vocab.map((v, i) => (
                                      <div key={i} className={`flex justify-between items-center p-2.5 rounded border shadow-sm ${isGaga ? 'bg-[#222] border-[#333] text-gray-200' : (isAlert ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-[#EBE9E4] text-[#4B4845]')}`}>
                                          <span className="font-bold text-sm">{v.cn}</span>
                                          <span className={`font-serif-jp text-xs ${isGaga ? 'text-[#34D399]' : (isAlert ? 'text-white/80' : 'text-[#898580]')}`}>{v.jp}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                       )}
                       {event.details && event.details.length > 0 && (
                          <div className="space-y-3">
                              {event.details.map((detail, idx) => {
                                  const useCustom = !!detail.accentColor;
                                  const dBg = useCustom ? detail.bgColor : highlightBg;
                                  const dBorder = useCustom ? detail.borderColor : highlightBorder;
                                  const dText = useCustom ? detail.accentColor : accentColor;
                                  const dIcon = useCustom ? <Disc size={12} /> : (isAlert ? <AlertTriangle size={10} /> : <Sparkles size={10} />);
                                  return (
                                    <div 
                                      key={idx} 
                                      className={`p-3 rounded-lg border ${!useCustom ? dBg + ' ' + dBorder : ''}`}
                                      style={useCustom ? { backgroundColor: detail.bgColor, borderColor: detail.borderColor } : {}}
                                    >
                                        <h4 
                                          className={`text-xs font-bold mb-1 flex items-center gap-1 ${!useCustom ? dText : ''}`}
                                          style={useCustom ? { color: detail.accentColor } : {}}
                                        >
                                           {dIcon} {detail.title}
                                        </h4>
                                        <p className={`text-sm leading-relaxed font-serif-jp whitespace-pre-wrap ${isGaga ? 'text-gray-300' : (isAlert ? 'text-red-50' : 'text-[#595550]')}`}>
                                            {detail.content}
                                        </p>
                                    </div>
                                  );
                              })}
                          </div>
                       )}
                       <button 
                          onClick={handleNav}
                          className={`w-full bg-gradient-to-r ${btnGradient} text-white py-3 rounded-lg text-xs font-bold tracking-widest uppercase shadow-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                       >
                          <Navigation size={14} />
                          {isGaga ? 'NAVIGATE TO VENUE' : '前往目的地'}
                       </button>
                    </div>
                 </div>
             </div>
         </div>
      </div>
    );
  }

  // Standard Card Layout
  return (
    <div 
      ref={domRef}
      className={`flex w-full group ${animationClass}`}
    >
      <div className="w-[5.5rem] shrink-0 flex flex-col items-end pr-6 pt-5">
        <span className="font-serif-jp text-lg text-[#2D2926] tracking-tight leading-none opacity-90">
          {event.time}
        </span>
      </div>

      <div className="flex-1 relative min-w-0 border-b border-[#EBE9E4] pb-8 pt-4">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer transition-all duration-300 rounded-lg -ml-3 pl-3 pr-2 py-3 hover:bg-[#F2F0EB]"
        >
          <div className="flex flex-col relative">
            <div 
                className="absolute left-[-12px] top-1 bottom-1 w-[3px] rounded-full transition-opacity opacity-80"
                style={{ backgroundColor: themeColor }}
            ></div>

            <div className="mb-2">
               <div className="flex justify-between items-start mb-1 relative">
                   <h3 className="text-xl font-serif-jp font-medium text-[#2D2926] leading-snug tracking-wide max-w-[85%]">
                     {event.title}
                     {event.isImportant && (
                         <AlertCircle size={16} className="inline-block ml-1.5 text-rose-600 align-text-bottom mb-0.5" fill="currentColor" fillOpacity={0.15} />
                     )}
                   </h3>
                   <div className="pt-1 text-[#A8A29E] opacity-0 group-hover:opacity-100 transition-opacity">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                   </div>
               </div>
               
               <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1.5 uppercase tracking-widest text-[9px] font-bold opacity-90" style={{ color: themeColor }}>
                       {getCategoryIcon(event.tag)}
                       <span>{event.tag}</span>
                   </div>
                   {event.isTicket && (
                      <span className="border border-[#B4A598] text-[#9C8C74] text-[9px] px-1.5 py-[1px] font-serif-jp rounded-sm transform -rotate-2 opacity-80 bg-[#F7F5F0]">
                        予約済
                      </span>
                   )}
                   {event.booking && (
                       <span className="bg-[#2D2926] text-white text-[9px] px-2 py-[2px] rounded-full font-bold flex items-center gap-1 shadow-sm">
                           <Ticket size={10} />
                           予約済
                       </span>
                   )}
                   {event.mapEmbedUrl && !isExpanded && (
                       <div className="flex items-center gap-1 text-[9px] text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                          <MapIcon size={8} /> MAP
                       </div>
                   )}
               </div>
            </div>

            <p className="text-sm text-[#595550] font-serif-jp leading-7 text-justify tracking-wide mb-1 line-clamp-3">
               {event.description}
            </p>

            {/* Transit Route Widget */}
            <TransitRouteWidget />

            {/* Minimal Transport Detail Preview (New Feature) */}
            {event.tag === 'TRANSPORT' && !isExpanded && event.details && event.details.length > 0 && (
               <div className="mt-2 text-[10px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 flex items-start gap-1.5">
                  <Info size={12} className="shrink-0 mt-0.5 text-sky-500"/>
                  <span className="line-clamp-2 leading-relaxed">{event.details[0].content}</span>
               </div>
            )}
            
            {(event.address) && !isExpanded && !event.from && (
               <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF] font-serif-jp mt-1">
                  <MapPin size={10} />
                  <span className="truncate">{event.address}</span>
               </div>
            )}

            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
               <div className="pt-4 border-t border-dashed border-[#DCD9D0]">
                  {event.mapEmbedUrl && (
                      <div className="mb-6 rounded-xl overflow-hidden shadow-sm border border-[#EBE9E4] bg-gray-50">
                          <div className="px-3 py-2 bg-white border-b border-[#EBE9E4] flex items-center gap-2">
                             <MapIcon size={12} className="text-gray-400"/>
                             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Map View</span>
                          </div>
                          <iframe 
                            src={event.mapEmbedUrl} 
                            width="100%" 
                            height="200" 
                            style={{border:0}} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                          ></iframe>
                      </div>
                  )}

                  {event.booking && (
                      <div className="mb-6 relative mx-1">
                          <div className="bg-white rounded-lg shadow-md border-x-2 border-[#2D2926] relative overflow-hidden">
                              <div className="bg-[#2D2926] px-4 py-2 flex justify-between items-center text-white">
                                  <span className="text-[10px] tracking-widest font-bold">予約確認</span>
                                  <QrCode size={16} />
                              </div>
                              <div className="p-5 flex flex-col items-center border-b-2 border-dashed border-[#EBE9E4]">
                                  <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">予約番号</div>
                                  <div className="text-2xl font-mono font-black text-[#2D2926] tracking-widest mb-2 select-all">
                                      {event.booking.id}
                                  </div>
                                  <div className="text-xs text-gray-500 font-serif-jp text-center">
                                      {event.booking.site}
                                  </div>
                              </div>
                              <div className="bg-[#FAF9F6] p-4 grid grid-cols-2 gap-y-4 gap-x-2">
                                  <div>
                                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase mb-1">
                                          <CalendarClock size={10} /> 日時
                                      </div>
                                      <div className="text-sm font-bold text-gray-700">{event.time}</div>
                                  </div>
                                  <div>
                                      <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase mb-1">
                                          <Users size={10} /> 人数
                                      </div>
                                      <div className="text-sm font-bold text-gray-700">{event.booking.pax}位</div>
                                  </div>
                                  <div className="col-span-2">
                                      <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">プラン</div>
                                      <div className="text-xs font-bold text-gray-700 leading-relaxed">
                                          {event.booking.plan}
                                      </div>
                                  </div>
                              </div>
                              <div className="p-3 bg-white text-center">
                                  <span className="text-xs font-mono text-gray-500">
                                      {event.booking.price} (現場支付)
                                  </span>
                                  {event.booking.url && (
                                      <button 
                                        onClick={handleBookingLink}
                                        className="mt-2 text-[10px] text-blue-600 underline block w-full"
                                      >
                                          查看Tabelog頁面
                                      </button>
                                  )}
                              </div>
                          </div>
                      </div>
                  )}

                  {event.vocab && event.vocab.length > 0 && (
                     <div className="mb-6">
                        <div className="text-[9px] text-[#A8A29E] uppercase tracking-widest mb-2 font-bold">Point & Speak</div>
                        <div className="grid grid-cols-1 gap-2">
                            {event.vocab.map((v, i) => (
                                <div key={i} className="flex justify-between items-center bg-white p-2.5 rounded border border-[#EBE9E4] shadow-sm">
                                    <span className="font-bold text-[#4B4845] text-sm">{v.cn}</span>
                                    <span className="font-serif-jp text-xs text-[#898580]">{v.jp}</span>
                                </div>
                            ))}
                        </div>
                     </div>
                  )}

                  {event.details && event.details.length > 0 && (
                      <div className="space-y-4 mb-4">
                          {event.details.map((detail, idx) => (
                              <div key={idx} className="relative pl-3 border-l-[3px]" style={{ borderColor: detail.isHighlight ? themeColor : '#E5E7EB' }}>
                                  <h4 className="text-sm font-bold text-[#4B4845] mb-1">
                                      {detail.title}
                                  </h4>
                                  <p className="text-sm text-[#595550] leading-relaxed font-serif-jp whitespace-pre-wrap">
                                      {detail.content}
                                  </p>
                              </div>
                          ))}
                      </div>
                  )}

                  <div className="flex gap-3 mt-4">
                       <button 
                          onClick={handleNav}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#2D2926] text-[#FDFCF8] py-3 rounded text-xs tracking-widest hover:bg-[#4A4642] transition-colors shadow-md"
                       >
                          <Navigation size={14} />
                          導航前往
                       </button>
                       {event.phone && (
                           <div className="flex-1 flex flex-col items-center justify-center bg-[#F2F0EB] text-[#595550] py-2 rounded text-[10px] border border-[#EBE9E4]">
                              <span className="uppercase font-bold text-[#9C8C74] text-[8px]">Car GPS</span>
                              <span className="font-mono text-sm font-bold">{event.phone}</span>
                           </div>
                       )}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
