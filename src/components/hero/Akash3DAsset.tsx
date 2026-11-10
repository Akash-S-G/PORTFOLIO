import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Float, RoundedBox, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { RotateCcw } from 'lucide-react';

interface MonolithProps {
  pointer: { x: number; y: number };
  isDark: boolean;
}

const SpatialPortraitCard: React.FC<MonolithProps> = ({ pointer, isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Load high-resolution portrait texture
  const texture = useTexture('/akash-portrait.png');
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((_, delta) => {
    // Parallax tilt towards pointer
    if (groupRef.current) {
      const targetRotY = pointer.x * 0.45;
      const targetRotX = -pointer.y * 0.35;
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);
    }

    // Slow orbital ring spin
    if (ring1Ref.current) ring1Ref.current.rotation.z += 0.004;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= 0.003;
  });

  return (
    <group ref={groupRef}>
      {/* 3D Physical Beveled Monolith Casing */}
      <RoundedBox
        args={[2.7, 2.7, 0.12]}
        radius={0.16}
        smoothness={8}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color={isDark ? '#1C221F' : '#F1F5F9'}
          metalness={isDark ? 0.75 : 0.4}
          roughness={isDark ? 0.25 : 0.35}
        />
      </RoundedBox>

      {/* Front Photographic Face (Full High-Resolution, ZERO DOTS) */}
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[2.54, 2.54]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>

      {/* Beveled Front Rim Frame */}
      <mesh position={[0, 0, 0.063]}>
        <ringGeometry args={[1.78, 1.82, 64]} />
        <meshBasicMaterial
          color={isDark ? '#C5F36B' : '#4F46E5'}
          transparent
          opacity={isDark ? 0.6 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rear Tech Backing Plate (Visible when spun 180 degrees) */}
      <mesh position={[0, 0, -0.062]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[2.54, 2.54]} />
        <meshStandardMaterial
          color={isDark ? '#111413' : '#E2E8F0'}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Orbiting Spatial Tech Rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[2.15, 2.18, 64]} />
        <meshBasicMaterial
          color={isDark ? '#C5F36B' : '#4F46E5'}
          transparent
          opacity={isDark ? 0.45 : 0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 3.5, Math.PI / 5, 0]}>
        <ringGeometry args={[2.28, 2.30, 64]} />
        <meshBasicMaterial
          color={isDark ? '#22D3EE' : '#10B981'}
          transparent
          opacity={isDark ? 0.35 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// High-resolution fallback
const FallbackImage: React.FC = () => (
  <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-200 dark:border-graphite-700">
    <img
      src="./akash-portrait.png"
      alt="Akash Siddappa Goundi"
      className="w-full h-full object-cover"
    />
  </div>
);

export const Akash3DAsset: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hasError, setHasError] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  if (hasError) {
    return <FallbackImage />;
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className="w-full h-[440px] sm:h-[480px] lg:h-[520px] select-none cursor-grab active:cursor-grabbing relative flex items-center justify-center"
    >
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 44 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onError={() => setHasError(true)}
        className="w-full h-full"
      >
        <ambientLight intensity={isDark ? 1.8 : 2.4} />
        <directionalLight
          position={[pointer.x * 4 + 3, pointer.y * 4 + 4, 5]}
          intensity={isDark ? 2.2 : 2.6}
          color="#FFFFFF"
        />
        <pointLight position={[-4, -3, 3]} intensity={1.2} color={isDark ? '#22D3EE' : '#6366F1'} />
        <pointLight position={[4, 3, 3]} intensity={1.2} color={isDark ? '#C5F36B' : '#10B981'} />

        <Suspense fallback={null}>
          <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.3}>
            <SpatialPortraitCard pointer={pointer} isDark={isDark} />
          </Float>
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 1.8}
          rotateSpeed={0.85}
          dampingFactor={0.06}
        />
      </Canvas>

      {/* Subtle floating interactive hint */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] font-mono text-slate-500 dark:text-ivory-muted pointer-events-none whitespace-nowrap bg-white/80 dark:bg-graphite-900/80 px-3 py-1 rounded-full border border-slate-200/80 dark:border-graphite-750/80 shadow-xs backdrop-blur-xs">
        <RotateCcw className="w-3 h-3 text-emerald-600 dark:text-lime" />
        <span>DRAG TO ROTATE IN 3D</span>
      </div>
    </div>
  );
};
