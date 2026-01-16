import React, { useState, useEffect, useRef } from 'react';
import { DAYS_SETTINGS, TRIP_DATA, HOTEL_INFO } from './constants';
import { EventCard, getCategoryColor, getCategoryIcon } from './components/EventCard';
import { WeatherWidget } from './components/WeatherWidget';
import { ToolsView } from './components/ToolsView';
import { MapPin, Briefcase, X, Music, Plane, Utensils, Camera, ShoppingBag, Bed, Car, ChevronDown, Clock, FileText, Sparkles } from 'lucide-react';
import { EventItem, EventTag } from './types';

const FadeInSection: React.FC<{ children: React.ReactNode, delay?: string }> = ({ children, delay = '0ms' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adding a micro-task delay to ensure the browser paints the initial state first
            // if the element is already in viewport on load.
            requestAnimationFrame(() => {
                setIsVisible(true);
            });
            if(domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1, rootMargin: '20px' });
    if (domRef.current) observer.observe(domRef.current);
    return () => { if(domRef.current) observer.disconnect(); }
  }, []);

  return <div ref={domRef} className={`${isVisible ? 'reveal-visible' : 'reveal-hidden'}`} style={{ transitionDelay: delay }}>{children}</div>;
};

const App = () => {
  const [activeTab, setActiveTab] = useState<'ITINERARY' | 'TOOLS'>('ITINERARY');
  const [currentDayIdx, setCurrentDayIdx] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);
  const [nextEvent, setNextEvent] = useState<EventItem | null>(null);
  const [isHotelExpanded, setIsHotelExpanded] = useState(false);
  
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBgRef = useRef<HTMLDivElement>(null);

  // FIXED: Force scroll to top whenever Day or Tab changes.
  // This solves the issue where switching from a long page to a short page
  // keeps the scroll position at the bottom.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentDayIdx, activeTab]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const shouldBeScrolled = scrollTop > 20;
          if (shouldBeScrolled !== isScrolled) setIsScrolled(shouldBeScrolled);

          const winHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;
          const scrollableHeight = docHeight - winHeight;
          const scrollPercent = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;
          
          // Clamp to 0-1 range to prevent overshooting
          const p = Math.min(1, Math.max(0, scrollPercent));

          // PERF: Use transform scaleX instead of width to avoid layout thrashing
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${p})`;
          }
          if (progressBgRef.current) {
            progressBgRef.current.style.transform = `scaleX(${p})`;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // PERF: Passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    const checkTime = () => {
        const now = new Date();
        const currentTimeVal = now.getHours() * 60 + now.getMinutes();
        const dayEvents = TRIP_DATA[currentDayIdx]?.events || [];
        let upcoming = dayEvents.find(event => {
            if (!event.time) return false;
            const [h, m] = event.time.split(':').map(Number);
            return (h * 60 + m) > currentTimeVal;
        });
        if (!upcoming && dayEvents.length > 0) {
             const valid = dayEvents.filter(e => e.time);
             setNextEvent(valid[valid.length - 1] || null);
        } else { setNextEvent(upcoming || null); }
    };
    checkTime(); 
    const interval = setInterval(checkTime, 60000); 
    return () => clearInterval(interval);
  }, [currentDayIdx]);

  const getTagColor = (tag: EventTag) => {
    switch (tag) {
      case 'FUN': return 'bg-purple-500';
      case 'FOOD': return 'bg-orange-500';
      case 'TRANSPORT': return 'bg-sky-500';
      case 'SIGHTSEEING': return 'bg-green-500';
      case 'SHOPPING': return 'bg-pink-500';
      default: return 'bg-rose-500';
    }
  };

  const handleHotelNav = () => {
     // Use exact Japanese name + address for precise navigation
     window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('ヴィアインプライム心斎橋四ツ橋')}`, '_blank');
  };

  return (
    // Removed overflow-x-hidden from here to allow sticky to work
    <div className="min-h-screen pb-32 bg-[#FDFCF8]">
      
      {/* Header Area */}
      <header className={`bg-[#FDFCF8]/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className={`max-w-xl mx-auto px-6 pt-safe-top relative flex items-center justify-center transition-all duration-300 ${isScrolled ? 'h-12' : 'h-16'}`}>
          <button onClick={() => setActiveTab(prev => prev === 'ITINERARY' ? 'TOOLS' : 'ITINERARY')} className={`absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all active:scale-90 ${activeTab === 'TOOLS' ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-500'}`}>
             {activeTab === 'ITINERARY' ? <Briefcase size={20} /> : <X size={20} />}
          </button>
          <div className={`text-center transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
            <div className={`text-[9px] tracking-[0.2em] text-gray-400 uppercase transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'}`}>FAMILY TRIP</div>
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-lg font-serif-jp font-bold text-gray-900">關西旅行</h1>
              <span className={`border border-gray-900 rounded-full px-1.5 py-0.5 text-[8px] font-bold transition-all duration-300 ${isScrolled ? 'opacity-0 w-0 px-0 overflow-hidden border-0' : 'opacity-100'}`}>2026</span>
            </div>
          </div>
        </div>

        {activeTab === 'ITINERARY' && (
          <div className="max-w-xl mx-auto border-t border-gray-100/50">
            <div className="flex justify-between items-center px-6 py-3 overflow-x-auto no-scrollbar">
              {DAYS_SETTINGS.map((day, idx) => {
                const isActive = idx + 1 === currentDayIdx;
                return (
                  // FIXED: Removed inline window.scrollTo to let useEffect handle it properly
                  <button key={idx} onClick={() => setCurrentDayIdx(idx + 1)} className="flex flex-col items-center min-w-[3.5rem] relative">
                    <span className="text-[9px] font-bold text-gray-400 mb-1">{day.w}</span>
                    <span className={`text-xl font-serif-jp ${isActive ? 'text-gray-900 font-bold' : 'text-gray-300 font-light'}`}>{day.d}</span>
                    {isActive && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-rose-600 animate-pulse"></div>}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-xl mx-auto relative">
        {activeTab === 'ITINERARY' ? (
          <>
            <FadeInSection key={`hero-${currentDayIdx}`} delay="0ms">
              <div className="h-56 relative overflow-hidden">
                <img src={TRIP_DATA[currentDayIdx].img} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[10px] text-white/80 uppercase tracking-[0.2em] mb-1">Day {currentDayIdx} • {DAYS_SETTINGS[currentDayIdx-1].city}</div>
                    <h2 className="text-2xl font-serif-jp font-bold text-white tracking-wider">{TRIP_DATA[currentDayIdx].title}</h2>
                </div>
              </div>
            </FadeInSection>
            <div className="px-6 mt-4">
               {/* Wrapped in FadeInSection for Apple-style reveal. Added delay to ensure animation plays even if already in viewport. */}
               <FadeInSection key={`weather-${currentDayIdx}`} delay="100ms">
                   <WeatherWidget city={DAYS_SETTINGS[currentDayIdx-1].city} />
               </FadeInSection>
               
               {/* ENRICHED HOTEL INFO CARD (Day 1 only) */}
               {currentDayIdx === 1 && (
                 <FadeInSection delay="200ms">
                   {/* MODIFIED: Blended Background Style */}
                   <div className="bg-[#FAF9F6] rounded-xl border border-[#EBE9E4] mb-6 relative overflow-hidden my-2">
                       
                       {/* Modified: Decorative Sparkles moved to bottom-right watermark style to prevent overlap with header button */}
                       <div className="absolute -right-6 -bottom-6 text-gray-100 pointer-events-none transform -rotate-12">
                           <Sparkles size={100} strokeWidth={1} />
                       </div>

                       <div className="p-4 pl-5 relative z-10">
                           {/* Header */}
                           <div className="flex justify-between items-start mb-4">
                               <div>
                                   <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
                                       <Bed size={14} />
                                       <span className="text-[10px] font-bold uppercase tracking-widest">Accommodation</span>
                                   </div>
                                   <h3 className="text-lg font-bold text-[#2D2926] font-serif-jp leading-tight">
                                       {HOTEL_INFO.title}
                                   </h3>
                               </div>
                               <button 
                                  onClick={() => setIsHotelExpanded(!isHotelExpanded)} 
                                  className="text-gray-300 p-1 hover:text-gray-500 transition-colors"
                               >
                                  <ChevronDown size={20} className={`transition-transform duration-300 ${isHotelExpanded ? 'rotate-180' : ''}`} />
                               </button>
                           </div>

                           {/* Info Grid */}
                           <div className="grid grid-cols-2 gap-3 mb-4">
                               <div className="bg-white p-2.5 rounded-lg border border-[#EBE9E4]">
                                   <div className="flex items-center gap-1 text-[9px] text-gray-400 font-bold uppercase mb-1">
                                       <Clock size={10} /> Check-in
                                   </div>
                                   <div className="font-mono text-sm font-bold text-gray-700">15:00 後</div>
                               </div>
                               <div className="bg-white p-2.5 rounded-lg border border-[#EBE9E4]">
                                   <div className="flex items-center gap-1 text-[9px] text-gray-400 font-bold uppercase mb-1">
                                       <FileText size={10} /> Booking ID
                                   </div>
                                   <div className="font-mono text-sm font-bold text-gray-700 select-all">{HOTEL_INFO.booking?.id}</div>
                               </div>
                           </div>

                           {/* Address */}
                           <div 
                              onClick={handleHotelNav} 
                              className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer hover:text-gray-800 transition-colors active:opacity-60 mb-1"
                           >
                               <MapPin size={14} className="shrink-0 mt-0.5 text-gray-400" />
                               <span className="border-b border-dashed border-gray-300 hover:border-gray-500 transition-colors leading-relaxed">
                                  {HOTEL_INFO.address}
                               </span>
                           </div>

                           {/* Expanded Details */}
                           <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isHotelExpanded ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-dashed border-gray-200' : 'max-h-0 opacity-0'}`}>
                               <div className="space-y-3 mb-4">
                                  {HOTEL_INFO.details?.map((detail, idx) => (
                                     <div key={idx}>
                                        <div className="text-xs font-bold text-gray-700 mb-0.5">{detail.title}</div>
                                        <div className="text-xs text-gray-500 font-serif-jp leading-relaxed">{detail.content}</div>
                                     </div>
                                  ))}
                               </div>
                               <button 
                                  onClick={handleHotelNav} 
                                  className="w-full bg-[#2D2926] hover:bg-[#4A4642] text-white py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md transition-colors flex items-center justify-center gap-2"
                               >
                                  <MapPin size={14} />
                                  Open in Google Maps
                               </button>
                           </div>
                       </div>
                   </div>
                   {/* Divider */}
                   <div className="h-[1px] bg-gray-100 my-6"></div>
                 </FadeInSection>
               )}

               <div className="space-y-4">
                  {TRIP_DATA[currentDayIdx].events.map((event, idx) => (
                    <EventCard key={`${currentDayIdx}-${idx}`} event={event} city={DAYS_SETTINGS[currentDayIdx-1].city} isLast={idx === TRIP_DATA[currentDayIdx].events.length - 1} />
                  ))}
               </div>
            </div>
          </>
        ) : <ToolsView /> }
      </main>

      {/* REFINED PREMIUM PROGRESS CAPSULE */}
      {activeTab === 'ITINERARY' && nextEvent && (
        <div className="fixed bottom-[calc(2rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[380px] animate-slideUp">
             {/* Dynamic Island Container */}
             <div className="relative bg-[#1a1a1a]/95 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-white/10 flex items-center p-1.5 pr-5 overflow-hidden">
                
                {/* 
                   PERFORMANCE FIX: 
                   Using transform: scaleX() for 60fps+ animations.
                   Container has rounded corners + overflow-hidden to prevent scaling distortion.
                   The inner bars are w-full and initialized at scaleX(0).
                */}
                
                {/* 1. Background Fill Wrapper */}
                <div className="absolute inset-y-0 left-3 right-3 rounded-lg overflow-hidden pointer-events-none">
                    <div 
                        ref={progressBgRef} 
                        className="h-full bg-white/5 origin-left will-change-transform" 
                        style={{ width: '100%', transform: 'scaleX(0)' }}
                    ></div>
                </div>

                {/* 2. Main Progress Line Wrapper */}
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-white/10 rounded-full overflow-hidden pointer-events-none">
                     <div 
                        ref={progressBarRef} 
                        className="h-full bg-gradient-to-r from-rose-500 to-amber-500 shadow-[0_0_12px_rgba(244,63,94,0.8)] rounded-full origin-left will-change-transform" 
                        style={{ width: '100%', transform: 'scaleX(0)' }}
                     ></div>
                </div>
                
                {/* Left Icon Circle */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative z-10" style={{ backgroundColor: '#2a2a2a' }}>
                    <div className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        {getCategoryIcon(nextEvent.tag, 20)}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 ml-3 min-w-0 flex flex-col justify-center h-12 relative z-10">
                    <div className="flex justify-between items-baseline mb-0.5">
                        <span className={`text-[9px] font-bold text-gray-400 tracking-wider uppercase`}>Next Event</span>
                        <span className="font-mono text-xs font-bold text-white/90">{nextEvent.time}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white truncate pr-2 leading-tight">
                        {nextEvent.title}
                    </h4>
                </div>

                {/* Right Arrow / Action Hint */}
                <div className="ml-1 text-white/30 relative z-10">
                   {nextEvent.tag === 'FUN' ? <Music size={16} className="animate-pulse" /> : <MapPin size={16} />}
                </div>
             </div>
        </div>
      )}

    </div>
  );
};

export default App;