export const BASE = import.meta.env.BASE_URL;
export const SHOWROOM_BIKE_LENGTH = 3.05;
export const BIKES = [
{
  id: "ducati-panigale-v4",
  themeColor: "#C8102E",
  logo: `${BASE}logos/ducati.svg`,
  homeImage: `${BASE}images/home-superbike-render.png`,
  
  name: { en: "Panigale V4", th: "Panigale V4" },
  brand: "Ducati",
  modelYear: "2025",
  market: { en: "EU specification · Thailand price", th: "สเปกยุโรป · ราคาไทย" },

  model: `${BASE}models/ducati/scene.gltf`,
 modelScale: 0.04,
 modelPosition: [0.5, -0.1, 0],
 modelRotation: [0, -Math.PI / 2, 0],

  tag: { en: "Track Bred", th: "สายพันธุ์สนามแข่ง" },
  desc: {
    en: "A Desmosedici Stradale heart wrapped in aerodynamics born on the MotoGP grid.",
    th: "หัวใจ Desmosedici Stradale ห่อหุ้มด้วยอากาศพลศาสตร์ที่ถือกำเนิดจากสนาม MotoGP",
  },
  specs: {
    engine: "1,103cc V4",
    power: "216",
    torque: "120.9 Nm",
    topSpeed: "—",
    weight: "191 kg*",
    seatHeight: "850 mm",
    fuelCapacity: "17 L",
    price: "฿1,199,000",
  },
  highlights: {
    en: ["Race eCBS braking", "DQS 2.0 up/down", "6.9-inch TFT display"],
    th: ["เบรก Race eCBS", "ควิกชิฟเตอร์ DQS 2.0", "จอ TFT 6.9 นิ้ว"],
  },
  weightNote: { en: "*Wet weight without fuel", th: "*น้ำหนักพร้อมของเหลว ไม่รวมน้ำมันเชื้อเพลิง" },
  sourceUrl: "https://media.ducati.com/dam/MY25_Panigale_V4_EU_UC662332.pdf",
  priceSourceUrl: "https://www.ducati.com/th/th/bikes/pricelist",
},
{
  id: "bmw-s1000rr",
  themeColor: "#003D7D",
  logo: `${BASE}logos/bmw.svg`,
  homeImage: `${BASE}images/wp4655431.jpg`,

  model: `${BASE}models/bmw/bmw_s1000rr_fixed.glb`,
  modelScale: 1,
  modelPosition: [0.5, -0.1, 0],
  modelRotation: [0, -Math.PI / 2, 0],

  name: { en: "S1000 RR", th: "S1000 RR" },
  brand: "BMW Motorrad",
  modelYear: "2025",
  market: { en: "EU specification · Thailand starting price", th: "สเปกยุโรป · ราคาเริ่มต้นไทย" },
  tag: { en: "Precision Engineered", th: "วิศวกรรมแม่นยำ" },
  desc: {
    en: "ShiftCam technology and race-derived electronics for razor-sharp control.",
    th: "เทคโนโลยี ShiftCam และระบบอิเล็กทรอนิกส์จากสนามแข่งเพื่อการควบคุมที่แม่นยำดุจมีดโกน",
  },
  specs: {
    engine: "999cc Inline-4",
    power: "210",
    torque: "113 Nm",
    topSpeed: "303",
    weight: "198 kg",
    seatHeight: "832 mm",
    fuelCapacity: "16.5 L",
    price: "฿1,029,000",
  },
  highlights: {
    en: ["BMW ShiftCam", "Race ABS Pro", "Shift Assistant Pro"],
    th: ["ระบบ BMW ShiftCam", "Race ABS Pro", "Shift Assistant Pro"],
  },
  weightNote: { en: "Road-ready, at least 90% fuel", th: "น้ำหนักพร้อมขี่ เติมน้ำมันอย่างน้อย 90%" },
  sourceUrl: "https://www.bmw-motorrad.co.uk/en/models/sport/s1000rr/technicaldata.html",
  priceSourceUrl: "https://www.bmw-motorrad.co.th/th/models/modeloverview.html",
},
{
  id: "kawasaki-ninja-h2",
  themeColor: "#78BE21",
  logo: `${BASE}logos/kawasaki-1.svg`,
  homeImage: `${BASE}images/OIP.jpg`,

  model: `${BASE}models/kawasaki/scene.gltf`,
  audio: `${BASE}audio/kawasaki-ninja-h2.mp3`,
  modelScale: 1.0,
  modelPosition: [0.5, -0.1, 0],
  modelRotation: [0, -Math.PI / 2, 0],

  name: { en: "Ninja H2", th: "Ninja H2" },
  brand: "Kawasaki",
  modelYear: "2025",
  market: { en: "US specification · Thailand price", th: "สเปกสหรัฐฯ · ราคาไทย" },
  tag: { en: "Supercharged Fury", th: "พลังซูเปอร์ชาร์จ" },
  desc: {
    en: "A supercharged inline-four that redefines what a production hyperbike can do.",
    th: "เครื่องยนต์ 4 สูบเรียงพร้อมซูเปอร์ชาร์จ นิยามใหม่ของไฮเปอร์ไบค์รุ่นผลิตจริง",
  },
  specs: {
    engine: "998cc S/C Inline-4",
    power: "240",
    torque: "142.2 Nm",
    topSpeed: "—",
    weight: "238 kg",
    seatHeight: "825 mm",
    fuelCapacity: "17 L",
    price: "฿1,690,000",
  },
  highlights: {
    en: ["Kawasaki supercharger", "Öhlins TTX36 rear shock", "KIBS cornering ABS"],
    th: ["ซูเปอร์ชาร์จเจอร์ Kawasaki", "โช้กหลัง Öhlins TTX36", "เบรกโค้ง KIBS"],
  },
  weightNote: { en: "Curb weight with operating fluids", th: "น้ำหนักพร้อมของเหลวและเชื้อเพลิง" },
  sourceUrl: "https://www.kawasaki.com/en-us/products/ProductSpecSheetPDF/2025-ninja-h2-abs",
  priceSourceUrl: "https://www.kawasaki.co.th/index.php/th/motorcycle/NinjaH2",
},
{
  id: "honda-cbr1000rrr",
  themeColor: "#E4002B",
  logo: `${BASE}logos/honda-racing.png`,
  homeImage: `${BASE}images/Screenshot 2026-09-18 170253.jpg`,

  model: `${BASE}models/honda/scene.gltf`,
  modelScale: 1,
  modelPosition: [0.5, -0.1, 0],
  modelRotation: [0, -Math.PI / 2, 0],

  name: { en: "CBR1000RR-R", th: "CBR1000RR-R" },
  brand: "Honda",
  modelYear: "2024",
  market: { en: "UK specification · price varies by market", th: "สเปกสหราชอาณาจักร · ราคาขึ้นอยู่กับตลาด" },
  tag: { en: "Fireblade SP", th: "Fireblade SP" },
  desc: {
    en: "MotoGP-derived aero and a titanium-conrod engine built purely to win.",
    th: "อากาศพลศาสตร์จาก MotoGP และเครื่องยนต์ก้านสูบไทเทเนียมที่สร้างมาเพื่อชัยชนะ",
  },
  specs: {
    engine: "999.9cc Inline-4",
    power: "215",
    torque: "113 Nm",
    topSpeed: "—",
    weight: "201 kg",
    seatHeight: "830 mm",
    fuelCapacity: "16.5 L",
    price: "สอบถามผู้จำหน่าย",
  },
  highlights: {
    en: ["Öhlins electronic suspension", "Brembo Stylema R", "6-axis IMU"],
    th: ["ช่วงล่างไฟฟ้า Öhlins", "คาลิเปอร์ Brembo Stylema R", "IMU แบบ 6 แกน"],
  },
  weightNote: { en: "Kerb weight", th: "น้ำหนักพร้อมขี่" },
  sourceUrl: "https://www.honda.co.uk/motorcycles/range/super-sport/cbr1000rr-r-fireblade/specifications-and-price.html",
},
];

export const STRINGS = {
  en: {
    brandLine: "BIGBIKE SHOWROOM",
    heroKicker: "SELECTED MODEL",
    specs: { engine: "Engine", power: "Power (hp)", torque: "Torque", topSpeed: "Top speed (km/h)", weight: "Weight", seatHeight: "Seat height", fuelCapacity: "Fuel tank", price: "Thailand price" },
    modelYear: "Model year",
    source: "Official specification",
    priceSource: "Thailand price source",
    moreDetails: "More specifications",
    lessDetails: "Hide specifications",
    cta: "Configure & Enquire",
    modelsLabel: "Models",
    dragHint: "Drag to rotate · Scroll to zoom",
    engineHint: "Click the start switch on the bike to hear the engine",
    playSound: "Start engine",
    stopSound: "Stop engine",
  },
  th: {
    brandLine: "โชว์รูมบิ๊กไบค์",
    heroKicker: "Select",
    specs: { engine: "เครื่องยนต์", power: "แรงม้า (hp)", torque: "แรงบิด", topSpeed: "ความเร็วสูงสุด (km/h)", weight: "น้ำหนัก", seatHeight: "ความสูงเบาะ", fuelCapacity: "ถังน้ำมัน", price: "ราคาไทย" },
    modelYear: "ปีรุ่น",
    source: "ข้อมูลจากผู้ผลิต",
    priceSource: "ที่มาราคาไทย",
    moreDetails: "ข้อมูลเพิ่มเติม",
    lessDetails: "ย่อข้อมูล",
    cta: "ปรับแต่งและสอบถาม",
    modelsLabel: "รุ่นรถ",
    dragHint: "ลากเพื่อหมุน · เลื่อนเพื่อซูม",
    engineHint: "กดสวิตช์สตาร์ตบนตัวรถเพื่อฟังเสียงเครื่องยนต์",
    playSound: "สตาร์ตเครื่อง",
    stopSound: "ดับเครื่อง",
  },
};

export const HOME_COPY = {
  en: {
    eyebrow: "DIGITAL MOTORCYCLE EXPERIENCE",
    titleTop: "Explore performance.",
    titleAccent: "Beyond the showroom.",
    description:
      "BigBike Showroom is an interactive 3D experience built for riders to discover iconic superbikes, inspect every angle, compare essential specifications, and feel each machine before the first ride.",
    enter: "Enter showroom",
    hint: "No download required · Best experienced with sound",
    features: ["Interactive 3D", "Detailed specifications", "Thai & English"],
    collection: "Featured collection",
  },
  th: {
    eyebrow: "ประสบการณ์มอเตอร์ไซค์ดิจิทัล",
    titleTop: "สัมผัสสมรรถนะ",
    titleAccent: "เหนือกว่าการชมในโชว์รูม",
    description:
      "BigBike Showroom คือประสบการณ์โชว์รูมสามมิติที่ให้ผู้ขับขี่สำรวจซูเปอร์ไบค์ระดับไอคอน หมุนดูได้ทุกมุม เปรียบเทียบข้อมูลสำคัญ และสัมผัสเอกลักษณ์ของรถแต่ละคันก่อนออกเดินทางจริง",
    enter: "เข้าสู่โชว์รูม",
    hint: "ไม่ต้องดาวน์โหลด · แนะนำให้เปิดเสียง",
    features: ["โมเดลสามมิติ", "ข้อมูลรถครบถ้วน", "ไทยและอังกฤษ"],
    collection: "รถเด่นในโชว์รูม",
  },
};

/* ------------------------------------------------------------------ */
/*  HELPERS                                                             */
/* ------------------------------------------------------------------ */
