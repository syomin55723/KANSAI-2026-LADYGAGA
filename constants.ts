
import { DayData, DaySetting, EventItem } from './types';

export const DAYS_SETTINGS: DaySetting[] = [
  { d: '18', w: 'SUN', k_num: '第一天', city: '大阪/京都', temp_L: 10, temp_H: 17 },
  { d: '19', w: 'MON', k_num: '第二天', city: '大阪 難波', temp_L: 12, temp_H: 18 },
  { d: '20', w: 'TUE', k_num: '第三天', city: '大阪 北攝', temp_L: 9, temp_H: 15 },
  { d: '21', w: 'WED', k_num: '第四天', city: '京瓷巨蛋', temp_L: 11, temp_H: 16 },
  { d: '22', w: 'THU', k_num: '第五天', city: '關西機場', temp_L: 10, temp_H: 15 }
];

// Dedicated Hotel Info (Extracted from Day 1)
export const HOTEL_INFO: EventItem = { 
  time: "15:00", 
  title: "Via Inn Prime 心齋橋四橋", 
  tag: "CHECK-IN", 
  // Removed isSpecial to allow custom minimal rendering in App.tsx
  address: "大阪市西區新町 1-5-10", 
  phone: "+81-6-65335489",
  description: "【入住憑證】Trip.com 訂單。Check-in 請出示護照。",
  booking: {
      id: "1359041361069473",
      site: "Trip.com (PIN: 8647)",
      plan: "雙人床房 (Double Room) / 禁菸",
      pax: 2,
      price: "TWD 8,884 (已付清)",
      timeLimit: "15:00 Check-in"
  },
  details: [
      { title: "入住/退房", content: "IN: 1/18 15:00 後\nOUT: 1/22 10:00 前" },
      { title: "房型資訊", content: "1 張大床 (Queen Bed)。\n住客姓名: LIN TING" },
      { title: "取消政策", content: "1/16 23:59 前免費取消。之後收取費用。" },
      { title: "設施", content: "1F/2F AEON超市 (24H)。智慧免治馬桶、浴缸、離子吹風機。", isHighlight: true },
      { title: "住宿稅", content: "現場需支付大阪宿泊稅 (依人頭計算)。" }
  ]
};

export const TRIP_DATA: Record<number, DayData> = {
  1: { 
      title: "雅洛號與伏見稻荷的古都序曲", 
      loc: "大阪 → 京都",
      img: "https://www.hankyu.co.jp/kyotrain-garaku/_nuxt/img/f8e1c78.jpg",
      events: [
          { 
            time: "10:40", title: "抵達關西機場 (KIX)", tag: "TRANSPORT", isTicket: true, from: "高雄 KHH", to: "大阪 KIX", 
            description: "【入境攻略】搭乘台灣虎航 IT284 抵達。第一次來別緊張，跟著人群走。",
            details: [
              { title: "通關流程", content: "檢疫 → 入國審查 (準備好 Visit Japan Web QR Code) → 領行李 → 稅關申報。" },
              { title: "交通票券", content: "出關後上 2F 走空橋到「關西機場站」。建議去南海電鐵櫃台兌換/購買 Rapi:t 特急券，順便買 ICOCA 卡。", isHighlight: true },
              { title: "搭車方向", content: "搭乘「南海電鐵」空港急行或 Rapi:t 特急前往「難波 (Namba)」方向。" }
            ]
          },
          { 
            time: "11:15", title: "前往飯店寄放行李", tag: "TRANSPORT", address: "大阪市西區新町 1-5-10", from: "關西機場", to: "四橋站", 
            description: "【移動路徑】機場 → 難波 → 四橋站。先把大行李甩掉，輕裝上陣！",
            vocab: [
              { cn: "四橋線 (藍色)", jp: "四つ橋線 (Yotsubashi-sen)" },
              { cn: "寄放行李", jp: "荷物を預けたいです" }
            ],
            details: [
              { title: "轉乘教學", content: "抵達南海難波站後，依指標往「地下鐵四橋線」走 (約走 8-10 分)。搭乘藍色線往「西梅田」方向，在「四橋站」下車。" },
              { title: "飯店位置", content: "四橋站 2 號出口直結，或搭電梯至大廳寄放行李。", isHighlight: true }
            ]
          },
          { 
            time: "12:30", title: "移動至梅田商圈", tag: "TRANSPORT", from: "四橋站", to: "西梅田/大阪梅田", 
            description: "【梅田迷宮挑戰】前往搭乘雅洛號的起點「阪急大阪梅田站」。",
            details: [
              { title: "地鐵路線", content: "從「四橋站」搭乘四橋線至終點「西梅田站」。" },
              { title: "迷路救星", content: "梅田地下街非常複雜。建議出西梅田站後，直接「上到一樓地面」，跟著「阪急電車」的大指標走最保險。", isHighlight: true },
              { title: "午餐建議", content: "若時間充裕，可在阪急百貨附近簡單吃點東西，或買便當在車上吃。" }
            ]
          },
          { 
            time: "14:00", title: "京TRAIN 雅洛號", tag: "FUN", isSpecial: true, isTicket: false, from: "阪急大阪梅田", to: "京都河原町", 
            description: "【搭車即是京都】阪急電鐵的極致之作，以「京町家」為設計靈感。全車 6 節車廂分別代表「秋、冬、春、夏、初秋、早春」六個季節，讓您在移動中就能感受到濃濃的古都風情。",
            details: [
              { title: "絕美庭園", content: "絕對要去看 2 號車 (冬之章)，車廂內竟然設有真實的「枯山水庭園」與雪見窗，是全車最特別的設計。", isHighlight: true },
              { title: "車廂主題", content: "• 1號車(秋)：楓葉與流水\n• 3號車(春)：櫻花紛飛的粉色空間\n• 4號車(夏)：葵花與御簾的優雅\n• 5、6號車：芒草與梅花的季節更迭" },
              { title: "座位攻略", content: "3、4 號車廂設有「面向窗戶」的觀景座，可飽覽沿途淀川風景。全車自由席，建議提早 20 分鐘至 1 號線月台排隊。" },
              { title: "免費搭乘", content: "無需預約、不需特急料金，只需刷 ICOCA (410円) 即可享受這輛美術館等級的列車。" }
            ]
          },
          { 
            time: "14:50", title: "DE FRITES STAAN 炸薯條", tag: "FOOD", address: "京都府京都市中京区中之町542-2",
            description: "【河原町必吃】搭完雅洛號剛好來吃！位於河原町商店街巷弄內的超人氣荷蘭薯條專賣店。",
            vocab: [
                { cn: "招牌薯條", jp: "フリッツ (Frites)" },
                { cn: "酸奶醬", jp: "サワークリーム (Sour Cream)" }
            ],
            details: [
                { title: "口感", content: "不同於一般的細薯條，這裡的薯條切得較粗，外層炸得金黃酥脆，內部保有馬鈴薯的綿密口感，熱騰騰的非常好吃。", isHighlight: true },
                { title: "必點沾醬", content: "沾醬是靈魂！網友激推「黑松露美乃滋」與「明太子醬」，濃郁的香氣與薯條是絕配。" },
                { title: "位置", content: "距離阪急河原町站步行約 3-5 分鐘，就在新京極商店街旁的小巷子裡。" }
            ]
          },
          { 
            time: "15:30", title: "伏見稻荷大社 (交通)", tag: "TRANSPORT", from: "京都河原町", to: "伏見稻荷", 
            description: "【跨越鴨川】吃完薯條後，散步去轉乘京阪電車。",
            details: [
              { title: "轉乘路徑", content: "1. 從薯條店步行至「祇園四條站」 (約 8 分鐘)，途中會跨越鴨川。\n2. 進入京阪電車站。" },
              { title: "電車搭乘", content: "搭乘京阪本線 (往淀屋橋/大阪方向)，在「伏見稻荷站」下車 (急行、準急、普通皆停)。", isHighlight: true }
            ]
          },
          { 
            time: "15:50", title: "まるもち家 (Marumochiya)", tag: "FOOD", address: "京都府京都市伏見区深草一ノ坪町27-9", 
            description: "【人氣甜點】伏見稻荷大社旁的排隊名店，必吃圓滾滾的烤年糕與水信玄餅。",
            vocab: [
              { cn: "水信玄餅", jp: "水まる餅 (Mizu Maru Mochi)" },
              { cn: "烤年糕", jp: "まるもち" }
            ],
            details: [
              { title: "必點", content: "「水まる餅」透明如水滴般，入口即化，拍照超美。搭配黃豆粉與黑糖蜜。", isHighlight: true }
            ]
          },
          { 
            time: "16:00", title: "はな家 (Hanaya)", tag: "FOOD", address: "京都府京都市伏見区深草 開土町1-3-3 伏見稲荷境内", 
            description: "【參道美食】充滿日式風情的休息處，補充體力準備爬山。",
            details: [
              { title: "推薦", content: "稻荷壽司 (豆皮壽司) 是這裡的名物，據說是狐狸大仙的最愛。也有烏龍麵可暖胃。" }
            ]
          },
          { 
            time: "16:20", title: "伏見稻荷大社", tag: "SIGHTSEEING", 
            isSpecial: false, 
            specialTheme: 'FOX', 
            address: "京都市伏見區深草藪之內町68", 
            description: "【千本鳥居】供奉商業之神，朱紅色的鳥居隧道視覺效果極其震撼。這裡也是狐狸使者的家。",
            details: [
              { title: "參拜路線", content: "穿過巨大的樓門與本殿後，後方就是「千本鳥居」入口。建議走到「奧社奉拜所」即可折返。", isHighlight: true },
              { title: "重輕石", content: "在奧社有一對石燈籠，許願後拿起石頭，若比想像中輕，願望就會實現。" }
            ]
          },
          { 
            time: "18:00", title: "京都晚間散策/回程", tag: "TRANSPORT", from: "祇園四條", to: "大阪", 
            description: "【歸途】視體力決定晚餐地點。可回祇園四條附近覓食，或直接回大阪。",
            details: [
              { title: "回程建議", content: "搭乘京阪電車回「淀屋橋」，轉御堂筋線回「心齋橋/難波」。或原路搭阪急回梅田。" }
            ]
          }
      ]
  },
  2: { 
      title: "難波魂與道頓堀的購物盛典", 
      loc: "大阪 難波",
      img: "https://static.gltjp.com/glt/data/article/21000/20444/20240128_050140_1f54ffbe_w1920.webp",
      events: [
          { 
            time: "09:30", title: "おにぎりごりちゃん 難波店", tag: "FOOD", address: "大阪市中央区南船場3-5-28 富士ビル南船場 1F", phone: "+81 6-6484-8325",
            description: "【朝食提案】難波超人氣飯糰店！主打餡料爆炸的職人手作飯糰，每一口都是滿足。",
            vocab: [
              { cn: "奶油明太子", jp: "バター明太子" },
              { cn: "炸蝦塔塔醬", jp: "エビマヨ" },
              { cn: "鮭魚卵", jp: "いくら" }
            ],
            details: [
              { title: "必點菜單", content: "人氣 No.1 的奶油明太子，熱飯的溫度融化奶油，香氣十足。", isHighlight: true },
              { title: "排隊攻略", content: "位於南船場。建議開店前 15 分鐘抵達。店內位置少，若趕時間可選擇外帶。" }
            ]
          },
          { 
            time: "11:30", title: "難波八阪神社", tag: "SIGHTSEEING", address: "大阪市浪速區元町2-9-19", phone: "06-6641-1149",
            description: "【巨大獅子】隱藏在市區的震撼景點，巨大的獅子殿張著大口，據說能吸走厄運招來勝利。",
            details: [
              { title: "交通指引", content: "從「難波站」步行約 8-10 分鐘。建議走「南館」出口出來，沿著パークス通り (Parks Dori) 往南走。", isHighlight: true },
              { title: "必買伴手禮", content: "獅子頭造型的御守非常獨特，適合送給考生或求職的朋友。" },
              { title: "攝影熱點", content: "站在獅子口正前方，使用廣角鏡頭拍攝最具張力。" }
            ]
          },
          { 
            time: "12:00", title: "心齋橋 & 道頓堀 購物美食攻略", tag: "SHOPPING", address: "大阪市中央區道頓堀1丁目",
            mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.258807897855!2d135.5012953!3d34.6687233!2m3!1f0!2f0!3f0!3m2!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7136999002b%3A0x6b707cd4502579b!2sDotonbori!5e0!3m2!1sen!2sjp!4v1709230000000",
            description: "【究極導遊書】集結了您指定的必逛服飾店與必吃美食清單。地圖已鎖定最熱鬧的固力果跑跑人區域。點擊下方列表中的店名可直接導航！",
            details: [
              { title: "🛍️ 必逛服飾 (點擊導航)", content: "• 📍 UNIQLO 心齋橋店: 心斎橋筋1-2-17\n• 📍 GU 心齋橋店: 心斎橋筋2-1-17\n• 📍 SENSE OF PLACE: 心斎橋筋2-7-3\n• 📍 PARK by oneway: 心斎橋筋2-6-1" },
              { title: "🍔 Shake Shack 大丸心齋橋店", content: "【位置】大丸心齋橋店 本館 1F (心斎橋筋1-7-1)\n【特色】店內裝潢超美！\n【必點】ShackBurger (招牌起司堡) 與 大阪限定口味奶昔。", isHighlight: true },
              { title: "🍜 どうとんぼり神座 (Kamukura)", content: "【位置】心斎橋筋2-8-26\n【特色】蔬菜清湯系拉麵。\n【必點】Oishii Ramen。吃到一半務必加入桌上的辣韭菜。" },
              { title: "🥪 心斎橋サンド (Shinsaibashi Sand)", content: "【位置】東心斎橋2-4-18 (稍微在巷子裡)\n【特色】深夜排隊炸豬排三明治。\n【必點】特選Togo豬排三明治 (ポークカツサンド)。" },
              { title: "🐙 たこ焼き 十八番 道頓堀店", content: "【位置】道頓堀1-7-21 (中座くいだおれ大樓旁)\n【特色】酥脆口感，麵糊加了天婦羅花。\n【必點】鹽味章魚燒 (塩) 或 醬汁美乃滋。" },
              { title: "🍦 北極冰棒 (Hokkyoku)", content: "【位置】難波3-8-22\n【特色】昭和懷舊手工冰棒。\n【必點】牛奶、紅豆、抹茶。逛街解熱首選。" },
              { title: "🍜 なにわ麺次郎 (Naniwa Menjiro)", content: "【位置】難波4-1-17 (近鐵難波站內)\n【特色】米其林必比登推薦，要在「站內」才吃得到喔！\n【必點】黃金蜆拉麵 (黄金貝らーめん)。" },
              { title: "🥮 月化粧 なんば店", content: "【位置】難波3-2-15\n【特色】可以買到「現烤」的熱騰騰月化粧。\n【必點】月化粧燒 (月化粧焼)。" }
            ]
          },
          { 
            time: "17:00", title: "返回飯店 (置放戰利品)", tag: "TRANSPORT", from: "心齋橋", to: "Via Inn Prime",
            description: "【戰利品卸貨】將 Shopping 完的戰利品拿回飯店置放！兩手空空再去吃大餐。",
            details: [
               { title: "移動建議", content: "從心齋橋步行回飯店約 5-8 分鐘。放完東西後再出發前往難波餐廳。" }
            ]
          },
          { 
            time: "19:00", title: "すし酒場 FUJIYAMA TOKYO", tag: "FOOD", address: "大阪府大阪市西区北堀江1-3-7 倉商ビル B1F", phone: "+81 6-6484-8325",
            description: "【予約確認】令人期待的壽司與松葉蟹吃到飽！地點在北堀江，請確認導航位置正確。",
            booking: {
                id: "QXNDSZGEJV",
                site: "すし酒場 FUJIYAMA TOKYO 大阪難波店",
                plan: "[2小時壽司與松葉蟹吃到飽] 震撼十足的松葉蟹、大吞拿魚、魚子醬、海膽、大份壽司等約90種任你吃！",
                pax: 2,
                price: "JPY 9,898/人 (含稅)",
                timeLimit: "2小時",
                url: "https://tabelog.com/tw/osaka/A2701/A270201/27147344/"
            },
            vocab: [
                { cn: "我有預約", jp: "予約しています" },
                { cn: "吃到飽", jp: "食べ放題 (Tabehoudai)" }
            ],
            details: [
                { title: "📍 重要導航資訊", content: "請導航至「大阪府大阪市西区北堀江1-3-7 倉商ビル B1F」。", isHighlight: true },
                { title: "用餐規則", content: "用餐時間限制 2 小時。餐費請於現場支付。" },
                { title: "必吃重點", content: "專攻松葉蟹、海膽與大份量壽司 (溢れ寿司)。" }
            ]
          }
      ]
  },
  3: { 
      title: "勝運之寺與大阪城史詩", 
      loc: "大阪 北攝",
      img: "https://d1grca2t3zpuug.cloudfront.net/2025/12/DSCF0078-1200x800-1764760155.webp",
      events: [
          { 
            time: "08:00", title: "出發前往 勝尾寺 (箕面萱野線)", tag: "TRANSPORT", from: "Via Inn Prime 心齋橋四橋", to: "勝尾寺",
            description: "【新路線更新】搭乘御堂筋線直通「北大阪急行電鐵」至終點站「箕面萱野站」，再轉乘巴士直達勝尾寺。",
            details: [
               { title: "Step 1: 地鐵", content: "從難波/心齋橋搭乘御堂筋線（千里中央・箕面萱野行），坐到終點「箕面萱野站」。(約 35-40 分)" },
               { title: "Step 2: 轉乘巴士", content: "出站後前往巴士站，搭乘【阪急巴士 特急30】往勝尾寺。(車程約 20-30 分)", isHighlight: true },
               { title: "🚌 特急30 平日參考班次", content: "09:10、09:40、10:10、10:40、11:10 (班次僅供參考，建議提早排隊)" }
            ]
          },
          { 
            time: "09:30", title: "勝尾寺 (Katsuo-ji)", tag: "SIGHTSEEING", address: "大阪府箕面市粟生間谷2914-1", phone: "072-721-7010",
            isSpecial: true,
            specialTheme: 'RED',
            description: "【必勝祈福】1300年歷史的勝運之寺。無論是考試、就職或生意，這裡都是大阪人求好運的首選。滿山的達摩牆更是視覺震撼！",
            vocab: [
              { cn: "達摩", jp: "だるま (Daruma)" },
              { cn: "勝運", jp: "かちうん (Kachiun)" },
              { cn: "線香", jp: "線香 (Senkou)" }
            ],
            details: [
              { title: "👺 祈願流程攻略", content: "1. 【挑選達摩】在授予所憑直覺挑選一尊有緣的達摩。\n2. 【寫下心願】在達摩背後寫下今年的目標。\n3. 【煙燻加持】拿著達摩去香爐繞幾圈，注入勝氣。\n4. 【畫龍點睛】畫上「右眼」(面對達摩是左邊) 許願。\n5. 【放置/帶回】可將達摩供奉在「奉納棚」或帶回家，等願望實現後再畫上另一眼。", isHighlight: true },
              { title: "必買紀念品", content: "「達摩籤 (Daruma Mikuji)」：籤詩藏在迷你達摩裡，不僅能占卜運勢，小達摩還能帶回家當擺飾。" },
              { title: "隱藏樂趣", content: "在石燈籠、樹幹夾縫、磚牆上尋找前人留下的迷你達摩，景色非常療癒。" }
            ]
          },
          { 
            time: "11:30", title: "返回市區 (中津)", tag: "TRANSPORT", from: "勝尾寺", to: "中津站 (大阪地鐵)", 
            description: "【移動】搭乘巴士回箕面萱野/千里中央，轉御堂筋線直達「中津站」。",
            details: [
                { title: "路線", content: "勝尾寺 (巴士) → 箕面萱野 (御堂筋線) → 中津站。下車後步行前往拉麵店。" }
            ]
          },
          { 
            time: "13:00", title: "麦と麺助 新梅田中津店", tag: "FOOD", address: "大阪府大阪市北区豊崎3-4-12",
            description: "【大阪拉麵頂點】Tabelog 百名店常客。極致的湯頭與自家製麵。位置於御堂筋線「中津站」步行約 4 分鐘。",
            vocab: [
               { cn: "中華蕎麥", jp: "中華そば" },
               { cn: "伊利子(小魚乾)", jp: "イリコ" },
               { cn: "特製", jp: "特製 (Tokusei)" }
            ],
            details: [
              { title: "必吃", content: "特製伊利子蕎麥麵 (特製イリコそば)。湯頭鮮甜回甘，擺盤如藝術品。", isHighlight: true },
              { title: "排隊注意", content: "人氣極高，請做好排隊心理準備。建議預留充裕時間。" }
            ]
          },
          { 
            time: "14:30", title: "大阪城公園 & 天守閣", tag: "SIGHTSEEING", address: "大阪市中央區大阪城1-1", phone: "06-6941-3044",
            description: "【歷史散策】從中津/梅田移動至大阪城。豐臣秀吉的榮耀，大阪的地標。",
            details: [
              { title: "交通", content: "中津/梅田搭乘地鐵至「谷町四丁目」或「森之宮」下車。" },
              { title: "散步路線", content: "由「大手門」進入，參觀天守閣後，請往北走，從「青屋門」離開。過橋後直走即達 JR 大阪城公園站，這是前往天滿最順的路。", isHighlight: true }
            ]
          },
          { 
            time: "16:00", title: "移動至天滿 (JR環狀線)", tag: "TRANSPORT", from: "JR 大阪城公園站", to: "JR 天滿站", 
            description: "【直達不用轉車】搭乘 JR 大阪環狀線（外回・京橋/大阪方向），只要 2 站就到天滿。",
            details: [
              { title: "搭乘路線", content: "JR 大阪城公園站 → (京橋) → 櫻之宮 → 天滿站。車程約 4-5 分鐘。" },
              { title: "下車後", content: "天滿站只有一個出口。出站就是天神橋筋商店街與天滿市場，非常方便。", isHighlight: true }
            ]
          },
          { 
            time: "16:30", title: "ぷららてんま・天満市場", tag: "SHOPPING", address: "大阪市北区池田町3-1",
            description: "【大阪人的廚房】充滿活力的傳統市場，頭頂上的燈籠是標誌。這裡有最新鮮的海鮮與水果。",
            details: [
                 { title: "必吃天婦羅", content: "市場內隱藏著極品天婦羅店 (例如：七福神)，現點現炸，酥脆麵衣包裹著鮮蝦，搭配蘿蔔泥沾醬簡直絕配。", isHighlight: true }, 
                 { title: "逛街重點", content: "吃完天婦羅後，可沿著天神橋筋商店街一路逛逛，感受最道地的大阪日常。" }
            ]
          },
          { 
            time: "17:30", title: "スーパー玉出 天神橋店", tag: "SHOPPING", address: "大阪市北区天神橋4-8-9",
            description: "【日本第一便宜】大阪獨有的玉出超市，自稱「日本第一便宜超市」超狂妄，生鮮、熟食多又平價，在地人也超愛逛。",
            details: [
                 { title: "必買熟食", content: "一堆壽司、熟食、便當、炒麵等，都只要300~400日圓，吃3份都不心疼。", isHighlight: true },
                 { title: "省錢攻略", content: "傍晚開始打折還會更便宜，想節省旅費的小資族絕對不能錯過！招牌霓虹燈非常顯眼，充滿大阪特色。" }
            ]
          },
          { 
            time: "18:30", title: "お好み焼き 千草", tag: "FOOD", address: "大阪市北区天神橋4-11-18", phone: "06-6351-4072",
            description: "【晚餐雙重奏】巷弄內的傳奇老店，體驗正宗的大阪燒文化。",
            vocab: [
                { cn: "千草燒 (招牌)", jp: "千草焼き (Chigusa Yaki)" },
                { cn: "豬里肌", jp: "豚ロース (Buta Rosu)" },
                { cn: "美乃滋", jp: "マヨネーズ (Mayonezu)" },
                { cn: "柴魚片", jp: "かつお節 (Katsuobushi)" },
                { cn: "芥末", jp: "からし (Karashi)" }
            ],
            details: [
              { title: "必點名物", content: "「千草燒 (Chigusa Yaki)」。特厚豬肉夾在中間，口感層次分明，是老派大阪燒的巔峰。", isHighlight: true }
            ]
          },
          { 
            time: "20:00", title: "面交 LADY GAGA 門票", tag: "SHOPPING", address: "HOTEL THE FLAG Shinsaibashi", isImportant: true,
            description: "【⚠️ 重要任務】與賣家面交演唱會門票。請務必準時抵達約定地點。",
            details: [
               { title: "尾款金額", content: "TWD 4,000 (請準備好台幣現金或轉帳工具)。", isHighlight: true },
               { title: "面交地點", content: "HOTEL THE FLAG 大廳 (大阪市中央區東心齋橋1-18-30)。" }
            ]
          }
      ]
  },
  4: { 
      title: "GAGA: THE MAYHEM BALL 震撼之夜", 
      loc: "大阪 京瓷巨蛋",
      img: "https://media.gq.com.tw/photos/6847b4fcb9450492611f853f/master/w_1600,c_limit/485671990_1239939200834553_4634830752852304792_n.jpg",
      events: [
          { 
            time: "10:30", title: "壽喜燒 しゃぶ長", tag: "FOOD", address: "大阪府大阪市中央区東心斎橋1-15-25", phone: "06-6243-2941",
            description: "【和牛饗宴】低調實力派，專注於黑毛和牛的老牌壽喜燒店。",
            vocab: [
              { cn: "壽喜燒午餐", jp: "すき焼きランチ" },
              { cn: "生雞蛋", jp: "生卵" }
            ],
            details: [
              { title: "關西流派", content: "先煎肉、撒糖、淋醬油，最後才加湯與蔬菜，肉香更濃郁。", isHighlight: true },
              { title: "高CP值", content: "午間套餐價格親民，是補充體力迎接演唱會的最佳選擇。" }
            ]
          },
          { 
            time: "14:00", title: "前往京瓷巨蛋 (Kyocera Dome)", tag: "TRANSPORT", isTicket: true, from: "心齋橋", to: "巨蛋前千代崎",
            address: "大阪市西區千代崎3-中2-1",
            description: "【資深迷妹的生存戰略】第一次參戰別緊張！這裡是結合商場與球場的聖地。最重要的戰略是：「Aeon Mall 是你的生命線，但也是戰場。」",
            details: [
              { title: "交通指南", content: "搭乘長堀鶴見綠地線至「巨蛋前千代崎站」，出站即達。千萬記得先買好回程票或儲值ICOCA！" },
              { title: "生命線 Aeon Mall", content: "巨蛋旁邊就是超大 Aeon Mall。那是唯一的文明綠洲（冷氣、美食街、乾淨廁所）。建議在此先解決如廁問題，巨蛋內的廁所會排到天荒地老。", isHighlight: true },
              { title: "入場與周邊", content: "• 周邊商品(Merch)：通常在戶外 2F 平台。若不想排隊，可等開場後去場內買(風險是缺貨)。\n• 入場閘口：請看票上的「ゲート(Gate)」號碼。通常都在 2F 的 Deck 上。" },
              { title: "散場攻略 (規制退場)", content: "最痛苦的環節！日本演唱會結束會實施「規制退場」，由廣播叫號分區離開。請耐心等待，不要急著衝。若趕時間，請在安可曲最後一首時先溜到出口附近。" }
            ]
          },
          { 
            time: "19:00", title: "LADY GAGA: THE MAYHEM BALL", tag: "FUN", 
            isSpecial: true, 
            specialTheme: 'GAGA',
            address: "京瓷巨蛋 (Kyocera Dome)",
            description: "【SHOW TIME】Put your paws up! 這是屬於 Little Monsters 的神聖時刻。準備好迎接 Mother Monster 帶來的視覺與聽覺衝擊！(開場 17:00 / 開演 19:00)",
            details: [
              { title: "🎫 7-11 取票全攻略 (必看!)", content: "1. 找 Email：搜尋 members_info@pia.co.jp 「【ぴあ特別サイト】チケット購入確認」。\n2. 點連結：進入 Ticket Pia 網站。\n3. 登入：輸入購入ID (9碼) + 電話 (13碼)。\n4. 取號：點擊「引換票番号表示」，截圖 Barcode。\n5. 櫃台列印：給 7-11 店員掃描 Barcode 即可拿到實體票！", isHighlight: true },
              { title: "關於 Gaga", content: "Stefani Germanotta，不只是流行天后，更是 LGBTQ+ 與怪胎們的守護神。她的現場不只是演唱會，而是一場關於愛、包容與釋放的集體治療。" },
              
              // New Section for Abracadabra with custom Orange theme
              { 
                title: "✨ THE ANTHEM: Abracadabra", 
                content: "這次巡演的主場曲！節奏中毒性極強，副歌的手勢舞絕對要練起來。\n「I feel like I'm falling in love / Ab-ra-ca-da-bra!」\n當前奏響起，全場將會陷入瘋狂的魔法之中！", 
                accentColor: '#F97316', // Orange-500
                borderColor: '#FDBA74', // Orange-300
                bgColor: '#2a1b12' // Dark Orange tint for dark mode
              },
              
              { title: "🎶 預習歌單 (Setlist Prediction)", content: "根據 Chromatica Ball 改編，預計會有高強度的電子舞曲連發！\n• 開場：Bad Romance / Just Dance (經典連發)\n• 劇情篇章：Alice / Replay / 911 (Chromatica 宇宙)\n• 催淚時刻：Shallow / Always Remember Us This Way (A Star Is Born)\n• 高潮：Rain On Me / Stupid Love (全場蹦迪)\n• 安可：Hold My Hand (捍衛戰士)" },
              { title: "應援守則", content: "1. 只有 Gaga 說 Jump 時才跳 (安全考量)。\n2. 開手機燈海時請配合。錄影通常 OK 但請勿全程高舉擋人。" }
            ]
          },
          { 
            time: "21:30", title: "博多串焼き バッテンよかとぉ アメリカ村店", tag: "FOOD", 
            address: "大阪府大阪市中央区西心斎橋2-4-11", 
            phone: "06-6213-2900",
            description: "【演唱會後的熱血續攤】來自博多的正宗串燒！氣氛熱鬧喧騰，最適合在 GAGA 演唱會後一邊大口吃肉、大口喝酒，一邊激動地討論剛剛的舞台演出。",
            vocab: [
              { cn: "串燒拼盤", jp: "串焼き盛り合わせ" },
              { cn: "豬五花", jp: "豚バラ (Butabara)" },
              { cn: "烤玉米", jp: "焼きトウモロコシ" },
              { cn: "生啤酒", jp: "生ビール" }
            ],
            details: [
              { title: "必點", content: "博多名物「豚バラ」(豬五花串)，以及各式蔬菜肉捲串。醋雜碎 (酢モツ) 也是絕佳下酒菜。", isHighlight: true },
              { title: "位置", content: "位於美國村附近，距離心齋橋站很近。" }
            ]
          }
      ]
  },
  5: { 
      title: "滿載回憶的返程", 
      loc: "大阪 → 關西機場",
      img: "https://img.technews.tw/wp-content/uploads/2022/12/20100440/311678475_2094327070770648_5954801498040228044_n.jpg",
      events: [
          { 
            time: "07:00", title: "飯店辦理退房", tag: "TRANSPORT", address: "大阪市西區新町 1-5-10",
            description: "【早起行動】辦理退房手續。請再次檢查護照、機票與隨身重要物品是否帶齊。房卡交回櫃台即可。",
            details: [
               { title: "遺漏檢查", content: "充電器、轉接頭、浴室洗面乳、冰箱食物。", isHighlight: true }
            ]
          },
          { 
            time: "07:20", title: "抵達 日航酒店巴士站", tag: "TRANSPORT", isImportant: true, address: "大阪日航酒店 (Hotel Nikko Osaka)",
            description: "【⚠️ 極度重要】這班車非常重要！因為只有這一班，必須搭上！請務必準時抵達。",
            details: [
              { title: "位置指引", content: "位於飯店 1F 門口。請尋找利木津巴士 (Limousine Bus) 的站牌。", isHighlight: true },
              { title: "關鍵提醒", content: "錯過這班車會非常麻煩，請預留充足移動時間。" }
            ]
          },
          { 
            time: "07:40", title: "利木津巴士 (Limousine Bus)", tag: "TRANSPORT", isTicket: true, from: "大阪日航酒店", to: "關西機場 KIX T1",
            description: "【舒適直達】前往機場最輕鬆的方式。上車補眠，醒來就到機場了。",
            details: [
              { title: "車資", content: "可使用 ICOCA 刷卡或自動售票機購票。" },
              { title: "行李", content: "司機會協助將大行李放入車廂，記得領取行李號碼牌。" }
            ]
          },
          { 
            time: "08:41", title: "辦理登機手續 (Check-in)", tag: "TRANSPORT", address: "KIX Terminal 1 4F",
            description: "【IT285】前往台灣虎航櫃台辦理報到與行李託運。請留意行李重量限制。",
            details: [
              { title: "櫃台資訊", content: "請查看出發大廳電子看板確認櫃台代號 (通常為 F 或 G)。" }
            ]
          },
          { 
            time: "09:30", title: "安全檢查 & 最後採買", tag: "SHOPPING", address: "KIX 免稅店區",
            description: "【最後補貨衝刺】通過安檢後，就是最後的購物時間！把握機會將白色戀人、Royce 巧克力帶回家。",
            details: [
              { title: "打包注意", content: "布丁、果凍類必須託運，不能手提上飛機。生巧克力建議購買保冰袋。", isHighlight: true }
            ]
          },
          { 
            time: "11:30", title: "返程 (IT285)", tag: "TRANSPORT", isTicket: true, from: "大阪 KIX", to: "高雄 KHH",
            description: "【To Be Continued...】這趟旅程雖然暫告一段落，但冒險的心永遠在跳動。整理好戰利品與照片，期待下一次的飛行！",
            details: [
              { title: "Next Destination", content: "Where to go next?", isHighlight: true }
            ]
          }
      ]
  }
};
