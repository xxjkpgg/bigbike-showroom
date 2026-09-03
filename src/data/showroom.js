export const BASE = import.meta.env.BASE_URL;
export const SHOWROOM_BIKE_LENGTH = 3.05;
export const BIKES = [
{
  id: "ducati-panigale-v4",
  themeColor: "#C8102E",
  logo: `${BASE}logos/ducati.svg`,
  homeImage: `${BASE}images/home-superbike-render.png`,
  
  name: { en: "Panigale V4s", th: "Panigale V4" },
  brand: "Ducati",

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
    power: "214",
    topSpeed: "299",
    price: "฿1,199,000",
  },
},
{
  id: "bmw-s1000rr",
  themeColor: "#003D7D",
  logo: `${BASE}logos/bmw.svg`,
  homeImage: `${BASE}images/home-bmw-render-v2.png`,

  model: `${BASE}models/bmw/bmw_s1000rr_fixed.glb`,
  modelScale: 1,
  modelPosition: [0.5, -0.1, 0],
  modelRotation: [0, -Math.PI / 2, 0],

  name: { en: "S1000 RR", th: "S1000 RR" },
  brand: "BMW Motorrad",
  tag: { en: "Precision Engineered", th: "วิศวกรรมแม่นยำ" },
  desc: {
    en: "ShiftCam technology and race-derived electronics for razor-sharp control.",
    th: "เทคโนโลยี ShiftCam และระบบอิเล็กทรอนิกส์จากสนามแข่งเพื่อการควบคุมที่แม่นยำดุจมีดโกน",
  },
  specs: {
    engine: "999cc Inline-4",
    power: "205",
    topSpeed: "303",
    price: "฿1,099,000",
  },
},
{
  id: "kawasaki-ninja-h2",
  themeColor: "#78BE21",
  logo: `${BASE}logos/kawasaki-1.svg`,
  homeImage: `${BASE}images/home-kawasaki-render.png`,

  model: `${BASE}models/kawasaki/scene.gltf`,
  audio: `${BASE}audio/kawasaki-ninja-h2.mp3`,
  modelScale: 1.0,
  modelPosition: [0.5, -0.1, 0],
  modelRotation: [0, -Math.PI / 2, 0],

  name: { en: "Ninja H2", th: "Ninja H2" },
  brand: "Kawasaki",
  tag: { en: "Supercharged Fury", th: "พลังซูเปอร์ชาร์จ" },
  desc: {
    en: "A supercharged inline-four that redefines what a production hyperbike can do.",
    th: "เครื่องยนต์ 4 สูบเรียงพร้อมซูเปอร์ชาร์จ นิยามใหม่ของไฮเปอร์ไบค์รุ่นผลิตจริง",
  },
  specs: {
    engine: "998cc S/C Inline-4",
    power: "231",
    topSpeed: "337",
    price: "฿1,650,000",
  },
},
{
  id: "honda-cbr1000rrr",
  themeColor: "#E4002B",
  logo: `${BASE}logos/honda-racing.png`,
  homeImage: `${BASE}images/home-honda-render-v2.png`,

  model: `${BASE}models/honda/scene.gltf`,
  modelScale: 1,
  modelPosition: [0.5, -0.1, 0],
  modelRotation: [0, -Math.PI / 2, 0],

  name: { en: "CBR1000RR-R", th: "CBR1000RR-R" },
  brand: "Honda",
  tag: { en: "Fireblade SP", th: "Fireblade SP" },
  desc: {
    en: "MotoGP-derived aero and a titanium-conrod engine built purely to win.",
    th: "อากาศพลศาสตร์จาก MotoGP และเครื่องยนต์ก้านสูบไทเทเนียมที่สร้างมาเพื่อชัยชนะ",
  },
  specs: {
    engine: "999.9cc Inline-4",
    power: "217",
    topSpeed: "299",
    price: "฿999,000",
  },
},
];

export const STRINGS = {
  en: {
    brandLine: "BIGBIKE SHOWROOM",
    heroKicker: "SELECTED MODEL",
    specs: { engine: "Engine", power: "Power (hp)", topSpeed: "Top Speed (km/h)", price: "Price" },
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
    specs: { engine: "เครื่องยนต์", power: "แรงม้า (hp)", topSpeed: "ความเร็วสูงสุด (km/h)", price: "ราคา" },
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
