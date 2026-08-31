/**
 * BigBikeShowroom.jsx
 *
 * Dependencies (install in your project):
 *   npm i three @react-three/fiber @react-three/drei framer-motion lucide-react
 *
 * Tailwind CSS must be configured in the host project.
 */
import React, { useState, useMemo, useCallback, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Zap, Timer, Tag, Globe, ChevronRight, RotateCw } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const BASE = import.meta.env.BASE_URL;
const SHOWROOM_BIKE_LENGTH = 3.05;
const BIKES = [
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

const STRINGS = {
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
    heroKicker: "รุ่นที่เลือก",
    specs: { engine: "เครื่องยนต์", power: "แรงม้า (hp)", topSpeed: "ความเร็วสูงสุด (km/h)", price: "ราคา" },
    cta: "ปรับแต่งและสอบถาม",
    modelsLabel: "รุ่นรถ",
    dragHint: "ลากเพื่อหมุน · เลื่อนเพื่อซูม",
    engineHint: "กดสวิตช์สตาร์ตบนตัวรถเพื่อฟังเสียงเครื่องยนต์",
    playSound: "สตาร์ตเครื่อง",
    stopSound: "ดับเครื่อง",
  },
};

const HOME_COPY = {
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

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ------------------------------------------------------------------ */
/*  2D ABSTRACT MARK — used only for the thumbnail rail (lightweight)  */
/* ------------------------------------------------------------------ */

function BikeMark({ color }) {
  return (
    <svg viewBox="0 0 820 380" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="bodyFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="55%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <ellipse cx="410" cy="330" rx="300" ry="18" fill="#000" opacity="0.35" />
      <circle cx="180" cy="280" r="78" fill="none" stroke="#1a1a1a" strokeWidth="14" />
      <circle cx="180" cy="280" r="78" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="180" cy="280" r="30" fill="#1a1a1a" />
      <circle cx="650" cy="280" r="78" fill="none" stroke="#1a1a1a" strokeWidth="14" />
      <circle cx="650" cy="280" r="78" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="650" cy="280" r="30" fill="#1a1a1a" />
      <path d="M180 280 L300 240 L360 245 L420 285 L520 285" fill="none" stroke="#2a2a2a" strokeWidth="10" strokeLinecap="round" />
      <path
        d="M120 230 C 170 150, 260 120, 330 128 C 390 134, 400 160, 440 150 C 500 136, 560 128, 610 150 C 645 165, 655 195, 650 220 C 610 205, 560 210, 520 235 C 470 265, 430 270, 390 260 C 340 248, 300 250, 260 258 C 210 268, 170 258, 120 230 Z"
        fill="url(#bodyFade)"
        stroke={color}
        strokeWidth="2"
      />
      <path d="M600 150 L650 118 L668 160 L620 172 Z" fill="#0d0d0d" stroke={color} strokeWidth="1.5" opacity="0.9" />
      <path d="M120 230 C 95 214, 90 195, 108 182 L 150 195 L 140 226 Z" fill="#161616" stroke={color} strokeWidth="1.5" />
      <rect x="330" y="278" width="120" height="20" rx="10" fill="#1c1c1c" stroke={color} strokeWidth="1.5" />
      <path d="M610 155 L650 250" stroke="#2a2a2a" strokeWidth="10" strokeLinecap="round" />
      <path d="M600 145 L630 118" stroke="#2a2a2a" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  3D PROCEDURAL BIKE MODEL                                            */
/*  Stylised low-poly sportbike built from primitives so the scene      */
/*  renders instantly with zero external assets. Swap <BikeModel3D>    */
/*  for a <primitive object={gltf.scene} /> if you have real .glb      */
/*  models — the group's props (color, position) stay the same.        */
/* ------------------------------------------------------------------ */

function Wheel({ position, color }) {
  const rotorRef = useRef(null);
  useFrame((_, delta) => {
    if (rotorRef.current) rotorRef.current.rotation.z += delta * 1.4;
  });
  return (
    <group position={position}>
      {/* tire */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.62, 0.2, 20, 36]} />
        <meshStandardMaterial color="#111214" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* rim accent */}
      <mesh rotation={[Math.PI / 2, 0, 0]} ref={rotorRef}>
        <torusGeometry args={[0.42, 0.035, 12, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} emissive={color} emissiveIntensity={0.35} />
      </mesh>
      {/* hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.22, 20]} />
        <meshStandardMaterial color="#26282c" roughness={0.4} metalness={0.8} />
      </mesh>
    </group>
  );
}

function BikeModel3D({ color }) {
  const groupRef = useRef(null);
  const scaleRef = useRef(0);

  useFrame((_, delta) => {
    // gentle spring-in when the model mounts / bike changes
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, 1, delta * 5);
    if (groupRef.current) groupRef.current.scale.setScalar(scaleRef.current);
  });

  const chassisMat = useMemo(
    () => ({ color: "#1b1c1f", roughness: 0.35, metalness: 0.6 }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.35, 0]} rotation={[0, Math.PI * 0.15, 0]}>
      <Wheel position={[-1.55, -0.05, 0]} color={color} />
      <Wheel position={[1.55, -0.05, 0]} color={color} />

      {/* swingarm */}
      <mesh position={[-0.85, 0.05, 0]} rotation={[0, 0, 0.12]} castShadow>
        <boxGeometry args={[1.5, 0.12, 0.14]} />
        <meshStandardMaterial {...chassisMat} />
      </mesh>

      {/* main frame / belly pan */}
      <mesh position={[0.15, 0.35, 0]} castShadow>
        <boxGeometry args={[1.9, 0.55, 0.62]} />
        <meshStandardMaterial {...chassisMat} />
      </mesh>

      {/* fuel tank — accent color */}
      <mesh position={[0.35, 0.72, 0]} rotation={[0, 0, -0.08]} castShadow>
        <sphereGeometry args={[0.46, 24, 18]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.5} />
      </mesh>

      {/* seat / tail */}
      <mesh position={[-0.75, 0.68, 0]} rotation={[0, 0, 0.05]} castShadow>
        <boxGeometry args={[0.85, 0.16, 0.5]} />
        <meshStandardMaterial color="#0d0d0e" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* tail hump accent stripe */}
      <mesh position={[-1.05, 0.74, 0]}>
        <boxGeometry args={[0.22, 0.06, 0.46]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} emissive={color} emissiveIntensity={0.25} />
      </mesh>

      {/* front fairing / nose */}
      <mesh position={[1.35, 0.42, 0]} rotation={[0, 0, -0.35]} castShadow>
        <coneGeometry args={[0.42, 0.9, 4]} />
        <meshStandardMaterial color="#101113" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[1.5, 0.5, 0]} rotation={[0, 0, -0.35]}>
        <coneGeometry args={[0.3, 0.5, 4]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.5} />
      </mesh>

      {/* windscreen */}
      <mesh position={[1.62, 0.78, 0]} rotation={[0.3, 0, -0.3]}>
        <planeGeometry args={[0.4, 0.32]} />
        <meshPhysicalMaterial color="#0a0a0a" transparent opacity={0.55} roughness={0.1} metalness={0.1} />
      </mesh>

      {/* handlebar / clip-ons */}
      <mesh position={[1.15, 0.78, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.55, 10]} />
        <meshStandardMaterial color="#2a2b2e" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* forks */}
      <mesh position={[1.5, 0.15, 0.16]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.045, 0.045, 0.85, 10]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[1.5, 0.15, -0.16]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.045, 0.045, 0.85, 10]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* exhaust */}
      <mesh position={[-0.55, 0.05, 0.28]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.1, 0.13, 0.9, 16]} />
        <meshStandardMaterial color="#c9c9c9" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* engine block */}
      <mesh position={[0.2, 0.1, 0]} castShadow>
        <boxGeometry args={[0.7, 0.42, 0.5]} />
        <meshStandardMaterial color="#3a3b3e" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
}

function RealBikeModel({ bike }) {
  const { scene } = useGLTF(bike.model);

  const { clonedScene, modelSize } = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((obj) => {
      if (!obj.isMesh) return;

      obj.castShadow = true;
      obj.receiveShadow = true;

      if (obj.material) {
        obj.material = obj.material.clone();

        const materialName =
          obj.material.name?.toLowerCase() || "";

        // ยาง BMW
        if (
          bike.id === "bmw-s1000rr" &&
          (
            materialName.includes("tyre") ||
            materialName.includes("tire") ||
            obj.name === "Object_154" ||
            obj.name === "Object_157"
          )
        ) {
          obj.material = new THREE.MeshStandardMaterial({
            color: "#181818",
            roughness: 0.94,
            metalness: 0.01,
            side: THREE.DoubleSide,
          });
        }

        // แม็ก BMW
        if (
          bike.id === "bmw-s1000rr" &&
          (
            materialName.includes("wheel") ||
            obj.name === "Object_153" ||
            obj.name === "Object_156"
          )
        ) {
          obj.material = new THREE.MeshStandardMaterial({
            color: "#454950",
            roughness: 0.45,
            metalness: 0.7,
            side: THREE.DoubleSide,
          });
        }
      }
    });

    // จัดโมเดลให้อยู่กลาง
    const box = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();

    box.getCenter(center);

    clone.position.x -= center.x;
    clone.position.y -= center.y;
    clone.position.z -= center.z;

    return { clonedScene: clone, modelSize: box.getSize(new THREE.Vector3()) };
  }, [scene, bike.id]);

  // โมเดลแต่ละไฟล์ใช้หน่วยไม่เหมือนกัน จึงปรับความยาวให้เท่ากันก่อนวางบนแท่น
  const targetModelLength = SHOWROOM_BIKE_LENGTH;
  const sourceModelLength = Math.max(modelSize.x, modelSize.z);
  const normalizedScale = targetModelLength / sourceModelLength;

  // วางจุดต่ำสุดของโมเดลไว้เหนือผิวแท่น โดยใช้สเกลที่ปรับแล้ว
  const stageY = -0.585;
  const modelY = stageY + (modelSize.y * normalizedScale) / 2;

  return (
    <group
      position={[bike.modelPosition[0], modelY, bike.modelPosition[2]]}
      rotation={bike.modelRotation}
      scale={normalizedScale}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

function SceneLights({ accent }) {
  return (
    <>
      <ambientLight intensity={0.34} />
      <hemisphereLight args={["#dce8ff", "#08090d", 0.55]} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[1, 5, 3.5]} target-position={[0.5, -0.1, 0]} angle={0.42} penumbra={0.75} intensity={3.2} color="#ffffff" castShadow />
      <spotLight position={[-2.5, 2.5, -3]} target-position={[0.5, 0, 0]} angle={0.55} penumbra={0.9} intensity={18} color={accent} />
      <pointLight position={[2.5, 0.2, -2]} intensity={7} distance={6} color={accent} />
    </>
  );
}

function ShowroomStage({ accent }) {
  return (
    <group position={[0.5, 0, 0]}>
      <mesh position={[0, -0.77, 0]} receiveShadow>
        <cylinderGeometry args={[2.08, 2.25, 0.28, 96]} />
        <meshStandardMaterial color="#111318" roughness={0.3} metalness={0.72} />
      </mesh>
      <mesh position={[0, -0.622, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 2.02, 96]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.45} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.616, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.69, 96]} />
        <meshPhysicalMaterial color="#171a20" roughness={0.2} metalness={0.7} clearcoat={0.75} clearcoatRoughness={0.25} />
      </mesh>
      <mesh position={[0, -0.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.15, 2.22, 96]} />
        <meshBasicMaterial color={accent} transparent opacity={0.42} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CanvasLoader() {
  return (
    <Html center>
      <div className="flex items-center gap-2 text-black/50 text-xs tracking-wide whitespace-nowrap">
        <RotateCw size={14} className="animate-spin" />
        Loading model…
      </div>
    </Html>
  );
}

function KawasakiIgnition({ accent, isPlaying, onToggle }) {
  return (
    <group position={[0.5, 0.7, -0.64]}>
      <mesh
        onClick={(event) => {
          event.stopPropagation();
          onToggle();
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.055, 24, 24]} />
        <meshStandardMaterial
          color={isPlaying ? accent : "#171a18"}
          emissive={accent}
          emissiveIntensity={isPlaying ? 1.8 : 0.28}
          roughness={0.38}
          metalness={0.62}
        />
      </mesh>
      <pointLight color={accent} intensity={isPlaying ? 1.1 : 0} distance={0.45} />
    </group>
  );
}

function BikeCanvas({ bike, isPlaying, onToggleEngine }) {
  const accent = bike.themeColor;
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [4.5, 1.2, 0], fov: 34 }}
      className="!absolute !inset-0"
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <SceneLights accent={accent} />
        <ShowroomStage accent={accent} />
        {bike.model ? (
  <RealBikeModel key={bike.id} bike={bike} />
) : (
  <BikeModel3D key={bike.id} color={accent} />
)}
        {bike.audio && (
          <KawasakiIgnition
            accent={accent}
            isPlaying={isPlaying}
            onToggle={onToggleEngine}
          />
        )}
        <ContactShadows position={[0.5, -0.61, 0]} opacity={0.72} scale={4.45} blur={2.2} far={2} />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        makeDefault
        target={[0.5, -0.1, 0]}
        enablePan={false}
        minDistance={2.4}
        maxDistance={6}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2.05}
        autoRotate
        autoRotateSpeed={-0.8}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}

/* ------------------------------------------------------------------ */
/*  HEADER                                                              */
/* ------------------------------------------------------------------ */

function Header({ lang, setLang, accent, t, onHome }) {
  return (
    <header className="grid grid-cols-2 md:grid-cols-3 items-center px-5 sm:px-8 py-4 border-b border-black/[0.08] bg-[#f4f4f1]/85 backdrop-blur-xl shrink-0 relative z-20">
      <button type="button" onClick={onHome} className="flex items-center gap-2.5 text-left">
        <span
          className="w-2.5 h-2.5 rounded-full transition-colors duration-700"
          style={{ backgroundColor: accent, boxShadow: `0 0 14px ${accent}` }}
        />
        <span
          className={`text-black/70 ${
            lang === "th"
              ? "text-[13px] font-medium tracking-[0.015em]"
              : "text-[11px] sm:text-xs tracking-[0.28em] font-semibold"
          }`}
        >
          {t.brandLine}
        </span>
      </button>

      <div className="hidden md:flex items-center justify-center gap-2">
        <span className="rounded-full border border-black/10 bg-black/[0.035] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/55">
          Models · 01—04
        </span>
      </div>

      <button
        onClick={() => setLang(lang === "en" ? "th" : "en")}
        className="justify-self-end flex items-center gap-2 rounded-full border border-black/15 bg-white/55 px-3.5 py-2 text-xs font-medium text-black/70 hover:text-black hover:border-black/35 transition-colors active:scale-95"
        style={{ transition: "all 0.3s" }}
      >
        <Globe size={14} strokeWidth={2} />
        <span className="tracking-wide">{lang === "en" ? "TH" : "EN"}</span>
      </button>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  THUMBNAIL RAIL (vertical on desktop, horizontal on mobile)          */
/* ------------------------------------------------------------------ */

function ThumbRail({ bikes, activeId, onSelect, lang, t }) {
  return (
    <nav
      className="
        flex md:flex-col gap-3 md:gap-4
        overflow-x-auto md:overflow-x-visible
        px-4 md:px-3 py-3 md:py-6
        md:w-20 lg:w-24 shrink-0
        border-t md:border-t-0 md:border-r border-black/10 bg-[#f4f4f1]/90
        order-3 md:order-1 relative z-20
      "
      aria-label={t.modelsLabel}
    >
      {bikes.map((bike) => {
        const active = bike.id === activeId;
        return (
          <button
            key={bike.id}
            onClick={() => onSelect(bike.id)}
            className="relative shrink-0 md:shrink flex flex-col items-center gap-2 group focus:outline-none"
          >
            <motion.div
              className="relative w-16 h-16 md:w-full md:h-14 lg:h-16 rounded-xl overflow-hidden bg-black/[0.035] border"
              animate={{
                borderColor: active ? bike.themeColor : "rgba(0,0,0,0.12)",
                scale: active ? 1 : 0.92,
              }}
              whileHover={{ scale: active ? 1 : 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-3">
              <img
                src={bike.logo}
                alt={`${bike.brand} logo`}
                className={`
                  w-full h-full object-contain
                  transition-all duration-300
                  ${active ? "opacity-100 scale-100" : "opacity-40 scale-90 group-hover:opacity-80"}
                  `}
                />
              </div>
              {active && (
                <motion.span
                  layoutId="thumb-glow"
                  className="absolute inset-0"
                  style={{ boxShadow: `inset 0 0 22px ${hexToRgba(bike.themeColor, 0.55)}` }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.div>
            <span
              className={`text-[9px] md:text-[10px] tracking-wide leading-tight text-center max-w-[64px] md:max-w-none transition-colors duration-300 ${
                active ? "text-black" : "text-black/40 group-hover:text-black/70"
              }`}
            >
              {bike.name[lang]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  SPEC READOUT                                                        */
/* ------------------------------------------------------------------ */

function SpecItem({ icon: Icon, label, value, accent, unitless }) {
  return (
    <div className="flex flex-col gap-1.5 min-w-[92px]">
      <div className="flex items-center gap-1.5 text-black/45">
        <Icon size={13} strokeWidth={2} style={{ color: accent }} />
        <span className="text-[10px] uppercase tracking-[0.14em]">{label}</span>
      </div>
      <span className="text-xl sm:text-2xl font-semibold text-[#111214] tabular-nums leading-none">
        {value}
        {!unitless && <span className="text-xs text-black/40 ml-1 font-normal" />}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN VIEWER — 3D canvas background + pointer-events-safe overlay   */
/* ------------------------------------------------------------------ */

function BikeViewer({ bike, lang, t }) {
  const accent = bike.themeColor;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  }, [bike.id]);

  const toggleEngineSound = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [isPlaying]);

  return (
    <div className="relative flex-1 overflow-hidden bg-[#f4f4f1] order-1 md:order-2">
      {bike.audio && (
        <audio
          ref={audioRef}
          src={bike.audio}
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 30) {
              event.currentTarget.pause();
              event.currentTarget.currentTime = 0;
              setIsPlaying(false);
            }
          }}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 78%)",
        }}
      />
      <div className="pointer-events-none absolute left-[57%] top-0 z-0 h-[72%] w-px bg-gradient-to-b from-transparent via-black/10 to-transparent" />
      {/* ambient color wash, tied to theme color, sits above the canvas but below text */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] transition-all duration-700"
        style={{
          background: `radial-gradient(60% 55% at 60% 40%, ${hexToRgba(accent, 0.11)} 0%, rgba(255,255,255,0) 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-0 right-0 h-64 blur-3xl opacity-25 z-[5] transition-colors duration-700"
        style={{ backgroundColor: accent }}
      />

      {/* 3D canvas — fills the whole viewer, receives drag/scroll for OrbitControls */}
      <div className="absolute inset-0 z-0">
        <BikeCanvas
          bike={bike}
          isPlaying={isPlaying}
          onToggleEngine={toggleEngineSound}
        />
      </div>

      {/* text + specs overlay — pointer-events-none so drags pass through to the canvas,
          re-enabled only on the CTA button */}
      <div className="relative z-10 h-full flex flex-col justify-between pointer-events-none">
        <div className="px-5 sm:px-10 pt-6 sm:pt-8">
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.24em] text-black/45 uppercase">
            <span className="w-6 h-px transition-colors duration-500" style={{ backgroundColor: accent }} />
            {t.heroKicker}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={bike.id + "-title"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className="mt-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-black/50">{bike.brand}</p>
              <h1 className="mt-1 text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] text-[#111214] leading-[1.02]">
                {bike.name[lang]}
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-semibold tracking-wide" style={{ color: accent }}>
                {bike.tag[lang]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* drag hint, floats mid-right, ignored by pointer events */}
        <div className="flex items-center justify-end gap-4 px-5 sm:px-10">
          <div className="hidden sm:flex flex-col items-end gap-1 text-[10px] tracking-wide uppercase">
            <span className="text-black/35">{t.dragHint}</span>
            <span style={{ color: hexToRgba(accent, 0.72) }}>{t.engineHint}</span>
          </div>
        </div>

        <div className="mx-5 sm:mx-10 mb-5 sm:mb-8 rounded-2xl border border-black/10 bg-white/65 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={bike.id + "-desc"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-xs sm:text-sm text-black/60 max-w-xl leading-relaxed mb-4"
            >
              {bike.desc[lang]}
            </motion.p>
          </AnimatePresence>

          <div className="flex flex-wrap items-end justify-between gap-5 border-t border-black/[0.08] pt-4">
            <div className="flex flex-wrap gap-x-7 gap-y-4">
              <SpecItem icon={Gauge} label={t.specs.engine} value={bike.specs.engine} accent={accent} unitless />
              <SpecItem icon={Zap} label={t.specs.power} value={bike.specs.power} accent={accent} />
              <SpecItem icon={Timer} label={t.specs.topSpeed} value={bike.specs.topSpeed} accent={accent} />
              <SpecItem icon={Tag} label={t.specs.price} value={bike.specs.price} accent={accent} unitless />
            </div>

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="pointer-events-auto flex items-center gap-2 rounded-full border px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-black shrink-0 transition-all duration-500"
              style={{ backgroundColor: accent, borderColor: hexToRgba(accent, 0.75), boxShadow: `0 8px 30px ${hexToRgba(accent, 0.18)}` }}
            >
              {t.cta}
              <ChevronRight size={16} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */

function HomePage({ lang, setLang, onEnter }) {
  const copy = HOME_COPY[lang];
  const [selectedBikeId, setSelectedBikeId] = useState(BIKES[0].id);
  const selectedBike = BIKES.find((bike) => bike.id === selectedBikeId) ?? BIKES[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSelectedBikeId((currentId) => {
        const currentIndex = BIKES.findIndex((bike) => bike.id === currentId);
        return BIKES[(currentIndex + 1) % BIKES.length].id;
      });
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-[#f4f4f1] text-[#111214]"
      style={{ fontFamily: lang === "th" ? '"IBM Plex Sans Thai", "Leelawadee UI", sans-serif' : undefined }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.985, filter: "blur(7px)" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute -right-32 top-14 h-[620px] w-[620px] rounded-full bg-red-500/10 blur-[110px]" />

      <header className="relative z-20 flex items-center justify-between border-b border-black/[0.08] px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#C8102E] shadow-[0_0_16px_rgba(200,16,46,0.6)]" />
          <span className="text-[11px] font-bold tracking-[0.28em]">BIGBIKE SHOWROOM</span>
        </div>
        <button
          type="button"
          onClick={() => setLang(lang === "en" ? "th" : "en")}
          className="flex items-center gap-2 rounded-full border border-black/15 bg-white/55 px-3.5 py-2 text-xs font-semibold text-black/70 backdrop-blur-md transition hover:border-black/35 hover:text-black"
        >
          <Globe size={14} />
          {lang === "en" ? "TH" : "EN"}
        </button>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-69px)] max-w-[1500px] grid-cols-1 items-center gap-8 px-5 py-10 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-16">
        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-black/40">
            <span className="h-px w-8 bg-[#C8102E]" />
            {copy.eyebrow}
          </div>
          <h1
            className={`mt-6 text-5xl sm:text-6xl xl:text-7xl ${
              lang === "th"
                ? "font-medium leading-[1.14] tracking-[-0.025em]"
                : "font-semibold leading-[0.98] tracking-[-0.055em]"
            }`}
          >
            {copy.titleTop}
            <span className="mt-2 block text-[#C8102E]">{copy.titleAccent}</span>
          </h1>
          <p className={`mt-7 max-w-xl text-sm text-black/58 sm:text-base ${lang === "th" ? "font-light leading-8" : "leading-7"}`}>
            {copy.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {copy.features.map((feature) => (
              <span key={feature} className="rounded-full border border-black/10 bg-white/55 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-black/55 backdrop-blur">
                {feature}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <motion.button
              type="button"
              onClick={onEnter}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 rounded-full bg-[#111214] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-xl"
            >
              {copy.enter}
              <ChevronRight size={17} />
            </motion.button>
            <span className="text-[9px] uppercase tracking-[0.13em] text-black/35">{copy.hint}</span>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
          className="relative min-h-[380px] lg:min-h-[600px]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-black/[0.08] bg-[#111214] shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(200,16,46,0.32),transparent_48%)]" />
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:58px_58px]" />
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedBike.id}
                src={selectedBike.homeImage}
                alt={`${selectedBike.brand} superbike studio render`}
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">{copy.collection}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                {BIKES.map((bike) => (
                  <button
                    type="button"
                    key={bike.id}
                    onClick={() => setSelectedBikeId(bike.id)}
                    className="flex h-12 flex-1 items-center justify-center rounded-xl border bg-white/[0.04] p-2.5 transition-all duration-300 hover:bg-white/[0.08]"
                    style={{
                      borderColor: selectedBike.id === bike.id ? bike.themeColor : "rgba(255,255,255,0.1)",
                      boxShadow: selectedBike.id === bike.id ? `inset 0 0 18px ${hexToRgba(bike.themeColor, 0.24)}` : "none",
                    }}
                    aria-label={`Show ${bike.brand}`}
                  >
                    <img src={bike.logo} alt={bike.brand} className="h-full w-full object-contain opacity-75" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}

export default function BigBikeShowroom() {
  const [lang, setLang] = useState("en");
  const [activeId, setActiveId] = useState(BIKES[0].id);
  const [screen, setScreen] = useState("home");

  const activeBike = useMemo(() => BIKES.find((b) => b.id === activeId) ?? BIKES[0], [activeId]);
  const t = STRINGS[lang];

  const handleSelect = useCallback((id) => setActiveId(id), []);

  return (
    <AnimatePresence mode="wait">
      {screen === "home" ? (
        <HomePage key="home" lang={lang} setLang={setLang} onEnter={() => setScreen("showroom")} />
      ) : (
        <motion.div
          key="showroom"
          className="w-full h-screen min-h-[640px] bg-[#f4f4f1] text-[#111214] flex flex-col font-sans overflow-hidden"
          style={{ fontFamily: lang === "th" ? '"IBM Plex Sans Thai", "Leelawadee UI", sans-serif' : undefined }}
          initial={{ opacity: 0, scale: 1.012, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.008, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Header lang={lang} setLang={setLang} accent={activeBike.themeColor} t={t} onHome={() => setScreen("home")} />

          <div className="flex-1 flex flex-col md:flex-row min-h-0">
            <ThumbRail bikes={BIKES} activeId={activeId} onSelect={handleSelect} lang={lang} t={t} />
            <BikeViewer bike={activeBike} lang={lang} t={t} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
