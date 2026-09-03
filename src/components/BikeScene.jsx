import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useGLTF } from "@react-three/drei";
import { RotateCw } from "lucide-react";
import * as THREE from "three";
import { SHOWROOM_BIKE_LENGTH } from "../data/showroom";
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
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.05} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.616, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.69, 96]} />
        <meshPhysicalMaterial color="#171a20" roughness={0.2} metalness={0.7} clearcoat={0.75} clearcoatRoughness={0.25} />
      </mesh>
      <mesh position={[0, -0.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.15, 2.22, 96]} />
        <meshBasicMaterial color={accent} transparent opacity={0.28} toneMapped={false} />
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

export function BikeCanvas({ bike, isPlaying, onToggleEngine }) {
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
