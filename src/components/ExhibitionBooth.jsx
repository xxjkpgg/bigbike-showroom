import React from "react";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const BOOTH_THEMES = {
  "ducati-panigale-v4": { shell: "#4a080f", wall: "#181012", metal: "#2a2a2d", secondary: "#f4f0e8" },
  "bmw-s1000rr": { shell: "#06284b", wall: "#e9edf0", metal: "#23282f", secondary: "#42a5d8" },
  "kawasaki-ninja-h2": { shell: "#111510", wall: "#171b18", metal: "#292d2b", secondary: "#d8dfd2" },
  "honda-cbr1000rrr": { shell: "#7e0719", wall: "#151725", metal: "#292a30", secondary: "#f2f0ea" },
};

function BrandLogoPanel({ bike, theme }) {
  const logoTexture = useTexture(bike.logo);
  logoTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[-2.18, 0.65, -1.3]}>
      <mesh castShadow>
        <boxGeometry args={[0.08, 1.18, 1.72]} />
        <meshPhysicalMaterial color={theme.secondary} roughness={0.28} metalness={0.08} clearcoat={0.35} />
      </mesh>
      <mesh position={[0.046, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.14, 0.68]} />
        <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0.052, -0.49, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.42, 0.025]} />
        <meshBasicMaterial color={bike.themeColor} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function ExhibitionBooth({ bike }) {
  const accent = bike.themeColor;
  const theme = BOOTH_THEMES[bike.id] ?? BOOTH_THEMES["ducati-panigale-v4"];
  const compact = useThree((state) => state.size.width < 720);

  return (
    <group position={compact ? [0.15, -0.08, 0] : [0.35, 0, 0]} scale={compact ? 0.82 : 1}>
      <mesh position={[-0.15, -0.94, 0]} receiveShadow>
        <boxGeometry args={[5.5, 0.13, 5.6]} />
        <meshStandardMaterial color="#24262b" roughness={0.62} metalness={0.24} />
      </mesh>
      <mesh position={[0.15, -0.865, 0]} receiveShadow>
        <boxGeometry args={[4.45, 0.025, 4.55]} />
        <meshStandardMaterial color={theme.wall} roughness={0.52} metalness={0.18} />
      </mesh>
      <mesh position={[0.2, -0.848, 0]}>
        <boxGeometry args={[3.9, 0.015, 0.055]} />
        <meshBasicMaterial color={accent} transparent opacity={0.82} toneMapped={false} />
      </mesh>

      <mesh position={[-2.42, 0.76, 0]} receiveShadow>
        <boxGeometry args={[0.15, 3.35, 5.55]} />
        <meshStandardMaterial color={theme.wall} roughness={0.48} metalness={0.22} />
      </mesh>
      <mesh position={[-2.33, 1.48, 0.92]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.7, 0.055]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <mesh position={[-2.32, 0.25, 1.24]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.05, 1.45]} />
        <meshStandardMaterial color="#0d0f13" roughness={0.3} metalness={0.42} emissive={accent} emissiveIntensity={0.08} />
      </mesh>
      {[0.72, 1.06, 1.4, 1.74].map((z, index) => (
        <mesh key={z} position={[-2.265, 0.25, z]} rotation={[0, Math.PI / 2, index % 2 ? -0.09 : 0.09]}>
          <planeGeometry args={[1.2, 0.035]} />
          <meshBasicMaterial color={index === 1 ? theme.secondary : accent} transparent opacity={0.65} toneMapped={false} />
        </mesh>
      ))}
      <BrandLogoPanel bike={bike} theme={theme} />

      {[-2.56, 2.56].map((z) => (
        <group key={z}>
          <mesh position={[-0.2, 0.72, z]} castShadow>
            <boxGeometry args={[0.34, 3.35, 0.22]} />
            <meshStandardMaterial color={theme.shell} roughness={0.3} metalness={0.42} />
          </mesh>
          <mesh position={[-0.02, 0.72, z]}>
            <boxGeometry args={[0.025, 2.8, 0.235]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
        </group>
      ))}
      <mesh position={[-0.2, 2.34, 0]} castShadow>
        <boxGeometry args={[0.34, 0.24, 5.34]} />
        <meshStandardMaterial color={theme.shell} roughness={0.3} metalness={0.42} />
      </mesh>
      <mesh position={[-0.01, 2.2, 0]}>
        <boxGeometry args={[0.025, 0.035, 4.85]} />
        <meshBasicMaterial color={theme.secondary} toneMapped={false} />
      </mesh>

      <mesh position={[0.18, 2.02, 0]}>
        <boxGeometry args={[0.12, 0.1, 4.15]} />
        <meshStandardMaterial color={theme.metal} roughness={0.28} metalness={0.85} />
      </mesh>
      {[-1.65, -0.55, 0.55, 1.65].map((z) => (
        <group key={z} position={[0.25, 1.88, z]} rotation={[0, 0, -0.28]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.14, 0.25, 12]} />
            <meshStandardMaterial color="#17181c" roughness={0.32} metalness={0.8} />
          </mesh>
          <spotLight position={[0.12, -0.08, 0]} target-position={[0.45, -0.45, z * 0.32]} angle={0.34} penumbra={0.8} intensity={1.15} distance={5} color={z > 0.8 ? accent : "#ffffff"} />
        </group>
      ))}

      <group position={[1.35, -0.28, -2.05]} rotation={[0, -0.24, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.62, 1.14, 0.45]} />
          <meshStandardMaterial color={theme.metal} roughness={0.3} metalness={0.68} />
        </mesh>
        <mesh position={[0.03, 0.5, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.58, 0.08, 0.42]} />
          <meshPhysicalMaterial color="#11151b" emissive={accent} emissiveIntensity={0.16} roughness={0.18} metalness={0.5} clearcoat={0.8} />
        </mesh>
        <mesh position={[0.322, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.3, 0.65]} />
          <meshBasicMaterial color={accent} transparent opacity={0.72} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
