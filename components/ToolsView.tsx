import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Plane, Home, Wallet, Trash2, RotateCw, Copy, Check, FileText, ShieldCheck, Siren, Globe, Plus, PieChart as PieChartIcon, List, ChevronDown, Utensils, Train, ShoppingBag, Bed, HelpCircle, User, ArrowRightLeft, RefreshCw, Banknote, Share2, Phone, ExternalLink, MapPin, Music, QrCode, ArrowRight } from 'lucide-react';
import { Expense } from '../types';

// Constants
const FAMILY_MEMBERS = ['M', 'T', 'A'];
const DEFAULT_RATE = 0.215; // 萬一 API 掛掉的備用匯率
const APP_URL = 'https://syomin55723.github.io/KANSAI-2026-LADYGAGA/';

const CATEGORIES = [
  { value: 'Food', label: '餐飲', icon: Utensils, color: '#F97316' },
  { value: 'Transport', label: '交通', icon: Train, color: '#0EA5E9' },
  { value: 'Shopping', label: '購物', icon: ShoppingBag, color: '#EC4899' },
  { value: 'Stay', label: '住宿', icon: Bed, color: '#10B981' },
  { value: 'Fun', label: '娛樂', icon:  Music, color: '#8B5CF6' },
  { value: 'Other', label: '其他', icon: HelpCircle, color: '#64748B' }
];

// Checklist Data Structure
const CHECKLIST_ITEMS = [
  {
    category: "重要文件",
    color: "bg-rose-500",
    items: [
      { id: 'doc_passport', label: '護照' },
      { id: 'doc_ticket', label: '機票' },
      { id: 'doc_insurance', label: '旅遊保險' },
      { id: 'doc_money', label: '現金及信用卡' },
    ]
  },
  {
    category: "衣服",
    color: "bg-blue-500",
    items: [
      { id: 'clothes_underwear', label: '內褲 (4套)' },
      { id: 'clothes_socks', label: '襪子 (4雙)' },
      { id: 'clothes_heattech', label: '發熱/褲 (2條)' },
      { id: 'clothes_longsleeve', label: '長袖衣物 (2件)' },
      { id: 'clothes_down', label: '羽絨衣 (1件)' },
      { id: 'clothes_slippers', label: '拖鞋' },
    ]
  },
  {
    category: "盥洗用品",
    color: "bg-teal-500",
    items: [
      { id: 'toiletries_face', label: '洗面乳、保養品' },
      { id: 'toiletries_towel', label: '毛巾、浴巾' },
      { id: 'toiletries_tissue', label: '面紙、衛生紙' },
    ]
  },
  {
    category: "電子產品",
    color: "bg-amber-500",
    items: [
      { id: 'elec_extension', label: '延長線' },
      { id: 'elec_phone', label: '手機及充電器' },
      { id: 'elec_adapter', label: '轉接插頭' },
      { id: 'elec_powerbank', label: '行動電源' },
    ]
  },
  {
    category: "其他必需品",
    color: "bg-purple-500",
    items: [
      { id: 'other_backpack', label: '小型背包 (外出用)' },
      { id: 'other_rain', label: '雨具 (摺疊傘或雨衣)' },
      { id: 'other_mask', label: '口罩' },
      { id: 'other_pocket_tissue', label: '隨身小包面紙' },
    ]
  }
];

const CATEGORY_COLORS: Record<string, string> = CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.value]: cat.color }), {});

export const ToolsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'INFO' | 'BUDGET'>('INFO');
  const [isFlightFlipped, setIsFlightFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  
  // Exchange Rate State
  const [exchangeRate, setExchangeRate] = useState<number>(DEFAULT_RATE);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLoadingRate, setIsLoadingRate] = useState(false);

  // Budget State
  const [filterPayer, setFilterPayer] = useState<string>('ALL');
  
  // Important Docs State
  const [docStatus, setDocStatus] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('kansai_docs');
    return saved ? JSON.parse(saved) : {};
  });

  // Expense Data
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('kansai_expenses');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error("Error parsing expenses", e);
        }
    }
    // Default Data
    return [
      { id: '1', item: '虎航機票', amount: 148100, category: 'Transport', payer: 'M', isPaid: true },
      { id: '2', item: 'Via Inn Prime 住宿', amount: 61532, category: 'Stay', payer: 'T', isPaid: true },
      { id: '3', item: '環球影城門票', amount: 25000, category: 'Fun', payer: 'A', isPaid: true },
    ];
  });

  // Form State
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCurrency, setNewCurrency] = useState<'TWD' | 'JPY'>('TWD'); // Default to TWD for convenience
  const [newCategory, setNewCategory] = useState('Food');
  const [newPayer, setNewPayer] = useState('M');

  // Persistence
  useEffect(() => {
    localStorage.setItem('kansai_docs', JSON.stringify(docStatus));
  }, [docStatus]);

  useEffect(() => {
    localStorage.setItem('kansai_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Fetch Rate Logic
  useEffect(() => {
    const fetchRate = async () => {
        const now = Date.now();
        const savedRate = localStorage.getItem('kansai_rate_val');
        const savedTime = localStorage.getItem('kansai_rate_time');
        
        if (savedRate && savedTime && (now - parseInt(savedTime) < 3600000)) {
            setExchangeRate(parseFloat(savedRate));
            const date = new Date(parseInt(savedTime));
            setLastUpdated(`${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`);
            return;
        }

        setIsLoadingRate(true);
        try {
            const res = await fetch('https://api.exchangerate-api.com/v4/latest/JPY');
            const data = await res.json();
            if (data && data.rates && data.rates.TWD) {
                const newRate = data.rates.TWD;
                setExchangeRate(newRate);
                localStorage.setItem('kansai_rate_val', newRate.toString());
                localStorage.setItem('kansai_rate_time', now.toString());
                
                const date = new Date(now);
                setLastUpdated(`${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}`);
            }
        } catch (error) {
            console.error("Rate fetch failed", error);
        } finally {
            setIsLoadingRate(false);
        }
    };

    fetchRate();
  }, []);

  // Handlers
  const toggleDoc = (key: string) => {
    setDocStatus((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
      const shareData = {
          title: 'Kansai Trip 2026',
          text: '我們的2026京阪旅遊行程表',
          url: APP_URL
      };
      if (navigator.share) {
          try {
              await navigator.share(shareData);
          } catch (err) {
              console.log('Share canceled');
          }
      } else {
          handleCopy(APP_URL);
          // Alert removed, UI feedback is handled by copied state in button
      }
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem || !newAmount) return;

    let finalAmount = parseInt(newAmount);

    if (newCurrency === 'TWD') {
        finalAmount = Math.round(finalAmount / exchangeRate);
    }

    const expense: Expense = {
      id: Date.now().toString(),
      item: newItem,
      amount: finalAmount, 
      category: newCategory as any,
      payer: newPayer,
      isPaid: true
    };

    setExpenses([expense, ...expenses]);
    setNewItem('');
    setNewAmount('');
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirmDeleteId === id) {
      setExpenses(prev => prev.filter(item => item.id !== id));
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
      setTimeout(() => {
        setConfirmDeleteId(prev => prev === id ? null : prev);
      }, 3000);
    }
  };

  const openHotelMap = () => {
    // Use precise Japanese name for Google Maps query
    window.open("https://www.google.com/maps/search/?api=1&query=ヴィアインプライム心斎橋四ツ橋", "_blank");
  };

  const openVJW = () => {
    window.open("https://www.vjw.digital.go.jp/", "_blank");
  };

  // Calculations
  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  const chartData = CATEGORIES.map(cat => {
    const value = expenses.filter(e => e.category === cat.value).reduce((sum, e) => sum + e.amount, 0);
    return { name: cat.label, value, color: cat.color };
  }).filter(d => d.value > 0);

  const filteredExpenses = filterPayer === 'ALL' 
    ? expenses 
    : expenses.filter(e => e.payer === filterPayer);

  const toTWD = (jpy: number) => Math.round(jpy * exchangeRate).toLocaleString();

  const PhoneItem = ({ label, number, desc, fullWidth }: { label: string, number: string, desc?: string, fullWidth?: boolean }) => (
      <a href={`tel:${number}`} className={`flex flex-col justify-center p-2.5 bg-gray-50 border border-gray-100 rounded-lg active:bg-gray-100 transition-colors ${fullWidth ? 'col-span-2' : ''}`}>
          <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-700">{label}</span>
              <Phone size={12} className="text-gray-400" />
          </div>
          <div className="text-sm font-mono font-bold text-gray-900 mt-0.5">{number}</div>
          {desc && <div className="text-[9px] text-gray-400 mt-0.5">{desc}</div>}
      </a>
  );

  return (
    <div className="px-6 py-6 pb-24">
      <style>{`
        .recharts-sector:focus,
        .recharts-layer:focus,
        .recharts-pie-sector:focus {
          outline: none !important;
        }
      `}</style>
      
      <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
        <button 
          onClick={() => setActiveTab('INFO')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'INFO' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
        >
          <div className="flex items-center justify-center gap-2">
            <Globe size={14} /> 旅遊資訊
          </div>
        </button>
        <button 
          onClick={() => setActiveTab('BUDGET')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'BUDGET' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
        >
          <div className="flex items-center justify-center gap-2">
            <Wallet size={14} /> 旅行帳本
          </div>
        </button>
      </div>

      {activeTab === 'INFO' ? (
        <div className="space-y-6 animate-fadeIn">
            {/* 1. Flight Card (3D Flip) - Enhanced Tigerair Edition */}
            <div className="perspective-1000 h-56 cursor-pointer group" onClick={() => setIsFlightFlipped(!isFlightFlipped)}>
                <div className={`relative w-full h-full duration-700 transform-style-3d transition-all ${isFlightFlipped ? 'rotate-y-180' : ''}`}>
                    
                    {/* Front: Departure (Outbound) */}
                    <div 
                      className="absolute w-full h-full backface-hidden bg-[#222] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-gray-800"
                      style={{ transform: 'translateZ(1px)' }}
                    >
                        {/* Top Accent Bar */}
                        <div className="h-1.5 w-full bg-amber-400"></div>
                        
                        <div className="p-5 flex-1 flex flex-col relative">
                           {/* Watermark Logo */}
                           <div className="absolute right-[-20px] top-[-20px] opacity-[0.05] pointer-events-none transform rotate-12">
                               <Plane size={180} />
                           </div>

                           {/* Header */}
                           <div className="flex justify-between items-start mb-4">
                               <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold text-xs">T</div>
                                  <span className="text-white font-bold tracking-wider text-sm">tigerair</span>
                               </div>
                               <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded text-[10px] text-amber-400 font-bold border border-white/5">
                                  <span>BOARDING PASS</span>
                               </div>
                           </div>

                           {/* Main Route */}
                           <div className="flex justify-between items-center mb-5 relative z-10">
                              <div className="text-left">
                                  <div className="text-4xl font-black text-white tracking-widest font-mono">KHH</div>
                                  <div className="text-[10px] text-gray-400 font-medium uppercase mt-1">Kaohsiung</div>
                              </div>
                              
                              <div className="flex-1 px-4 flex flex-col items-center">
                                  <div className="w-full flex items-center gap-1">
                                      <div className="h-[2px] w-2 bg-amber-400/50 rounded-full"></div>
                                      <div className="h-[2px] flex-1 bg-dashed-line opacity-30"></div> {/* Custom dashed if needed, or dots */}
                                      <Plane size={16} className="text-amber-400 rotate-90" fill="currentColor" />
                                      <div className="h-[2px] flex-1 bg-dashed-line opacity-30"></div>
                                      <div className="h-[2px] w-2 bg-amber-400/50 rounded-full"></div>
                                  </div>
                                  <span className="text-[10px] text-amber-400 font-mono mt-1">2h 45m</span>
                              </div>

                              <div className="text-right">
                                  <div className="text-4xl font-black text-white tracking-widest font-mono">KIX</div>
                                  <div className="text-[10px] text-gray-400 font-medium uppercase mt-1">Osaka</div>
                              </div>
                           </div>

                           {/* Footer Info */}
                           <div className="grid grid-cols-3 gap-4 mt-auto border-t border-white/10 pt-4">
                               <div>
                                   <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Flight</div>
                                   <div className="text-lg font-bold text-white font-mono">IT284</div>
                               </div>
                               <div className="text-center">
                                   <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Date</div>
                                   <div className="text-lg font-bold text-white font-mono">18 JAN</div>
                               </div>
                               <div className="text-right">
                                   <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Time</div>
                                   <div className="text-lg font-bold text-amber-400 font-mono">10:40</div>
                               </div>
                           </div>
                        </div>

                        {/* Bottom Barcode Decorative Strip */}
                        <div className="bg-white px-5 py-3 flex justify-between items-center relative">
                            {/* Jagged Edge Top */}
                            <div className="absolute top-[-4px] left-0 w-full h-[4px]" style={{ background: 'radial-gradient(circle, transparent 70%, white 72%)', backgroundSize: '10px 10px' }}></div>
                            
                            <div className="flex flex-col gap-[2px] opacity-80 w-2/3">
                                <div className="h-1 w-full bg-black"></div>
                                <div className="h-0.5 w-full bg-black"></div>
                                <div className="h-2 w-full bg-black"></div>
                            </div>
                            <RotateCw size={14} className="text-gray-400 animate-pulse" />
                        </div>
                    </div>

                    {/* Back: Return (Inbound) */}
                    <div 
                      className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-gray-200"
                      style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
                    >
                        <div className="h-1.5 w-full bg-gray-800"></div>
                        
                        <div className="p-5 flex-1 flex flex-col relative">
                           <div className="flex justify-between items-start mb-4">
                               <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xs">T</div>
                                  <span className="text-gray-800 font-bold tracking-wider text-sm">tigerair</span>
                               </div>
                               <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-500 font-bold border border-gray-200">
                                  <span>RETURN TICKET</span>
                               </div>
                           </div>

                           <div className="flex justify-between items-center mb-5 relative z-10">
                              <div className="text-left">
                                  <div className="text-4xl font-black text-gray-800 tracking-widest font-mono">KIX</div>
                                  <div className="text-[10px] text-gray-400 font-medium uppercase mt-1">Osaka</div>
                              </div>
                              
                              <div className="flex-1 px-4 flex flex-col items-center">
                                  <div className="w-full flex items-center gap-1">
                                      <div className="h-[2px] w-2 bg-gray-300 rounded-full"></div>
                                      <div className="h-[1px] flex-1 bg-gray-300"></div>
                                      <Plane size={16} className="text-gray-400 rotate-[270deg]" />
                                      <div className="h-[1px] flex-1 bg-gray-300"></div>
                                      <div className="h-[2px] w-2 bg-gray-300 rounded-full"></div>
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-mono mt-1">3h 25m</span>
                              </div>

                              <div className="text-right">
                                  <div className="text-4xl font-black text-gray-800 tracking-widest font-mono">KHH</div>
                                  <div className="text-[10px] text-gray-400 font-medium uppercase mt-1">Kaohsiung</div>
                              </div>
                           </div>

                           <div className="grid grid-cols-3 gap-4 mt-auto border-t border-gray-100 pt-4">
                               <div>
                                   <div className="text-[9px] text-gray-400 uppercase tracking-widest mb-0.5">Flight</div>
                                   <div className="text-lg font-bold text-gray-800 font-mono">IT285</div>
                               </div>
                               <div className="text-center">
                                   <div className="text-[9px] text-gray-400 uppercase tracking-widest mb-0.5">Date</div>
                                   <div className="text-lg font-bold text-gray-800 font-mono">22 JAN</div>
                               </div>
                               <div className="text-right">
                                   <div className="text-[9px] text-gray-400 uppercase tracking-widest mb-0.5">Time</div>
                                   <div className="text-lg font-bold text-gray-800 font-mono">11:30</div>
                               </div>
                           </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="bg-gray-50 px-5 py-3 flex justify-between items-center border-t border-gray-100 border-dashed">
                           <div className="flex items-center gap-2">
                              <QrCode size={24} className="text-gray-800" />
                              <div className="text-[9px] text-gray-400 uppercase leading-tight">Scan for<br/>Check-in</div>
                           </div>
                           <RotateCw size={14} className="text-gray-400" />
                        </div>
                    </div>

                </div>
            </div>

            {/* 1.5 NEW VJW Card (Must Have) */}
            <div onClick={openVJW} className="bg-[#2D2926] rounded-xl relative overflow-hidden shadow-lg border-l-8 border-[#D3381C] cursor-pointer active:scale-[0.98] transition-transform">
                <div className="p-6 flex items-center justify-between">
                    <div>
                        <div className="bg-[#D3381C] text-white text-[10px] font-bold px-2 py-0.5 rounded inline-block mb-2 tracking-widest">MUST HAVE</div>
                        <h3 className="text-2xl font-serif-jp text-white mb-1">Visit Japan Web</h3>
                        <p className="text-gray-400 text-xs tracking-wide">入境審查 & 海關申報 (請截圖 QR Code)</p>
                    </div>
                    <div className="bg-[#D3381C] w-12 h-12 rounded-full flex items-center justify-center shadow-lg shrink-0">
                        <ExternalLink size={24} className="text-white" />
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute -right-4 -bottom-8 text-white/5 pointer-events-none">
                    <Globe size={100} />
                </div>
            </div>

            {/* 2. Hotel Card (Enhanced) */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-gray-400">
                        <Home size={16} />
                        <span className="text-xs font-bold tracking-wider">住宿資訊</span>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">已付款</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 font-serif-jp mb-0.5">Via Inn Prime 心齋橋四橋</h2>
                <p className="text-xs text-gray-400 mb-2 font-serif-jp">ヴィアインプライム心斎橋四ツ橋</p>
                
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-4 font-mono">
                    <MapPin size={12} className="text-rose-500" />
                    <span>大阪市西區新町 1-5-10</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3 mb-4">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-xs font-bold text-gray-500">訂單編號</span>
                        <span className="text-xs font-mono font-bold text-gray-900 select-all">1359041361069473</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-xs font-bold text-gray-500">PIN 碼</span>
                        <span className="text-xs font-mono font-bold text-gray-900 select-all">8647</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                        <span className="text-xs font-bold text-gray-500">入住日期</span>
                        <span className="text-xs font-bold text-gray-900">1/18 (15:00) - 1/22</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500">房型</span>
                        <span className="text-xs font-bold text-gray-900">雙人床房 (禁菸)</span>
                    </div>
                </div>

                <button onClick={openHotelMap} className="w-full bg-[#2D2926] text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 active:bg-black transition-colors">
                    <MapPin size={14} />
                    Google Maps 導航
                </button>
            </div>

            {/* 3. Checklist (Expanded) */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText size={16} /> 出發前行李檢查
                </h3>
                
                <div className="space-y-6">
                    {CHECKLIST_ITEMS.map((group, idx) => (
                        <div key={idx}>
                            <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider pl-1 flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${group.color}`}></span>
                                {group.category}
                            </h4>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => toggleDoc(item.id)} 
                                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group active:scale-[0.99] transition-transform select-none"
                                    >
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 ${docStatus[item.id] ? 'bg-green-500 border-green-500 text-white shadow-sm' : 'border-gray-200 group-hover:border-gray-300 bg-white'}`}>
                                            {docStatus[item.id] && <Check size={14} strokeWidth={3} />}
                                        </div>
                                        <span className={`text-sm transition-colors duration-200 ${docStatus[item.id] ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-700'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Emergency Contacts (Enhanced) */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-2 text-rose-600 mb-4">
                    <Siren size={18} />
                    <h3 className="font-bold text-gray-900">緊急服務與實用電話</h3>
                </div>
                
                <div className="space-y-6">
                    {/* Life Line */}
                    <div>
                        <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> 🚨 生命第一線
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <PhoneItem label="報警專線" number="110" desc="搶劫、車禍、糾紛" />
                            <PhoneItem label="救護車/消防" number="119" desc="火災、急救" />
                            <PhoneItem label="海難救援" number="118" />
                            <PhoneItem label="夜間急診" number="#7119" desc="身體不適諮詢" />
                        </div>
                    </div>

                    {/* Taiwan Specific */}
                    <div>
                        <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> 🇹🇼 台灣旅客專屬
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <PhoneItem label="大阪辦事處" number="06-6443-8481" fullWidth />
                             <PhoneItem label="外交部急難救助" number="+886-800-085-095" desc="台灣直撥" fullWidth />
                             <PhoneItem label="東京辦事處" number="03-3280-7811" />
                             <PhoneItem label="福岡辦事處" number="092-734-2810" />
                        </div>
                    </div>

                    {/* Airport & Transport */}
                    <div>
                        <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> ✈️ 機場＆交通救援
                        </div>
                         <div className="grid grid-cols-2 gap-2">
                            <PhoneItem label="關西機場" number="072-455-2500" fullWidth />
                            <PhoneItem label="成田機場" number="0476-34-8000" />
                            <PhoneItem label="羽田機場" number="03-5757-8111" />
                            <PhoneItem label="JR失物招領" number="03-3231-1880" />
                            <PhoneItem label="地鐵失物" number="03-3834-5577" />
                        </div>
                    </div>

                     {/* Practical */}
                    <div>
                        <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 💡 實用專線
                        </div>
                         <div className="grid grid-cols-1 gap-2">
                            <PhoneItem label="多語言翻譯支援" number="03-5285-8185" desc="中英韓 24小時" />
                            <PhoneItem label="旅遊諮詢 (JNTO)" number="050-3816-2787" desc="官方中文支援" />
                            <PhoneItem label="災害留言" number="171" desc="電話不通時報平安" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Share App Link */}
            <div className="pt-2 pb-6 flex justify-center">
                 <button 
                    onClick={handleShare}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-lg active:scale-95 transition-all duration-300 ${copied ? 'bg-green-600 text-white' : 'bg-gray-900 text-white'}`}
                 >
                    {copied ? <Check size={16} /> : <Share2 size={16} />}
                    <span className="text-xs font-bold tracking-widest uppercase">
                        {copied ? 'Link Copied!' : 'Share App Link'}
                    </span>
                 </button>
            </div>

        </div>
      ) : (
        <div className="animate-fadeIn space-y-6">
            
            {/* 1. Summary Cards */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#2D2926] text-white p-4 rounded-xl shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">總花費</div>
                        <div className="flex flex-col">
                            {/* Priority: TWD */}
                            <span className="text-2xl font-serif-jp font-bold">NT$ {toTWD(totalAmount)}</span>
                            <span className="text-xs text-gray-400 mt-1 font-mono">¥ {totalAmount.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="absolute right-[-10px] bottom-[-10px] opacity-10">
                        <Wallet size={60} />
                    </div>
                </div>
                <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm relative overflow-hidden">
                     <div className="relative z-10">
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">每人均攤</div>
                        <div className="flex flex-col">
                            {/* Priority: TWD */}
                            <span className="text-xl font-serif-jp font-bold text-gray-900">NT$ {toTWD(totalAmount / 3)}</span>
                            <span className="text-[10px] text-gray-500 mt-1 font-mono">¥ {Math.round(totalAmount / 3).toLocaleString()}</span>
                        </div>
                     </div>
                     {/* Exchange Rate Badge */}
                     <div className="absolute top-2 right-2 flex flex-col items-end">
                        <div className={`bg-gray-50 px-1.5 py-0.5 rounded text-[8px] border border-gray-100 flex items-center gap-1 ${isLoadingRate ? 'text-blue-500' : 'text-gray-400'}`}>
                            <ArrowRightLeft size={8} /> 
                            {isLoadingRate ? '更新中...' : exchangeRate}
                        </div>
                        <div className="text-[8px] text-gray-300 mt-0.5 scale-90 origin-right">
                           {lastUpdated} 更新
                        </div>
                     </div>
                </div>
            </div>

            {/* 2. Chart Section (Donut) */}
            {totalAmount > 0 && (
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col items-center">
                    <h3 className="text-sm font-bold text-gray-700 w-full mb-2 flex items-center gap-2">
                        <PieChartIcon size={14} /> 消費分佈
                    </h3>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    isAnimationActive={true}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    // Tooltip Priority: TWD
                                    formatter={(value: number) => `NT$${toTWD(value)} (¥${value.toLocaleString()})`}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* 3. Add Expense Form */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Plus size={16} /> 新增消費
                </h3>
                <form onSubmit={handleAddExpense} className="space-y-4">
                    <div className="space-y-3">
                        <input 
                            type="text" 
                            placeholder="項目名稱 (e.g. 晚餐)" 
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        
                        {/* Amount & Currency Selection */}
                        <div className="flex gap-2">
                            <div className="relative flex-[2]">
                                <input 
                                    type="number" 
                                    placeholder={`金額 (${newCurrency})`}
                                    value={newAmount}
                                    onChange={(e) => setNewAmount(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                                />
                            </div>
                            <div className="relative flex-1">
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <Banknote size={14} />
                                </div>
                                <select 
                                    value={newCurrency}
                                    onChange={(e) => setNewCurrency(e.target.value as 'TWD' | 'JPY')}
                                    className="w-full h-full appearance-none bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-8 py-2.5 text-sm text-gray-700 font-bold focus:outline-none focus:ring-2 focus:ring-gray-200 text-center"
                                >
                                    <option value="TWD">TWD</option>
                                    <option value="JPY">JPY</option>
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Category Selection Grid - UI REPLACEMENT FOR BETTER INTUITION */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">選擇類別</label>
                        <div className="grid grid-cols-3 gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.value}
                                    type="button"
                                    onClick={() => setNewCategory(cat.value)}
                                    className={`flex flex-col items-center justify-center py-2.5 rounded-xl border transition-all duration-200 ${newCategory === cat.value ? 'bg-white shadow-md' : 'bg-gray-50 border-transparent grayscale opacity-60'}`}
                                    style={{ borderColor: newCategory === cat.value ? cat.color : 'transparent' }}
                                >
                                    <div className="p-1.5 rounded-full mb-1" style={{ backgroundColor: newCategory === cat.value ? `${cat.color}20` : 'transparent' }}>
                                        <cat.icon size={18} style={{ color: cat.color }} />
                                    </div>
                                    <span className={`text-[10px] font-bold ${newCategory === cat.value ? 'text-gray-900' : 'text-gray-400'}`}>{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Payer Selection */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">付款人</label>
                        <div className="flex gap-2">
                            {FAMILY_MEMBERS.map(m => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => setNewPayer(m)}
                                    className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${newPayer === m ? 'bg-[#2D2926] text-white border-[#2D2926] shadow-md' : 'bg-gray-50 text-gray-400 border-transparent'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-bold mt-2 active:scale-[0.98] transition-transform shadow-lg">
                        加入列表
                    </button>
                </form>
            </div>

            {/* 4. Filter & List */}
            <div>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mb-2 px-1">
                    <button 
                        onClick={() => setFilterPayer('ALL')}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${filterPayer === 'ALL' ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                    >
                        全部
                    </button>
                    {FAMILY_MEMBERS.map(m => (
                         <button 
                            key={m}
                            onClick={() => setFilterPayer(m)}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${filterPayer === m ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                        >
                            {m} 付款
                        </button>
                    ))}
                </div>

                <div className="space-y-3 mt-4">
                    {filteredExpenses.map((expense) => {
                        const catInfo = CATEGORIES.find(c => c.value === expense.category);
                        const CatIcon = catInfo?.icon || HelpCircle;
                        
                        return (
                            <div key={expense.id} className="bg-white p-3.5 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${catInfo?.color}15` }}>
                                        <CatIcon size={18} style={{ color: catInfo?.color }} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800 text-sm">{expense.item}</div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] font-bold text-gray-400">
                                                {expense.payer} 付款
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                                            <span className="text-[10px] text-gray-400">
                                                {catInfo?.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end">
                                        <span className="font-mono font-bold text-gray-800">NT$ {toTWD(expense.amount)}</span>
                                        <span className="text-[10px] text-gray-400 font-mono">¥ {expense.amount.toLocaleString()}</span>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={(e) => handleDeleteClick(e, expense.id)} 
                                        className={`transition-all p-2 rounded-lg flex items-center gap-1 ${confirmDeleteId === expense.id ? 'bg-red-50 text-red-600 ring-1 ring-red-200' : 'text-gray-300 hover:text-red-400 hover:bg-gray-50'}`}
                                    >
                                        {confirmDeleteId === expense.id ? (
                                            <>
                                                <span className="text-[10px] font-bold whitespace-nowrap animate-fadeIn">確定?</span>
                                                <Trash2 size={14} />
                                            </>
                                        ) : (
                                            <Trash2 size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    
                    {filteredExpenses.length === 0 && (
                        <div className="text-center py-12 text-gray-300 text-sm italic font-serif-jp">
                            尚未有消費紀錄
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};