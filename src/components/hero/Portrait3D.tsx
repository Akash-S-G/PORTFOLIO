import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

interface PortraitMeshProps {
  pointer: { x: number; y: number };
  isDark: boolean;
}

const PortraitMesh: React.FC<PortraitMeshProps> = ({ pointer, isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('/akash-portrait.jpg');

  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smooth tilt dampening towards pointer
    const targetRotX = -pointer.y * 0.35;
    const targetRotY = pointer.x * 0.45;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      4,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      4,
      delta
    );

    // Subtle counter-rotation on outer neon ring
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.35}>
      <group ref={groupRef}>
        {/* Outer Orbiting Accent Ring */}
        <mesh ref={ringRef} position={[0, 0, -0.04]}>
          <ringGeometry args={[1.88, 1.94, 64]} />
          <meshBasicMaterial
            color={isDark ? '#C5F36B' : '#4F46E5'}
            transparent
            opacity={isDark ? 0.6 : 0.45}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Border Ring */}
        <mesh position={[0, 0, 0.01]}>
          <ringGeometry args={[1.72, 1.76, 64]} />
          <meshBasicMaterial
            color={isDark ? '#C5F36B' : '#6366F1'}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 3D Circular Portrait Front */}
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[1.72, 64]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.2}
            metalness={0.15}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* True 3D Coin Edge: Cylinder rotated by 90deg on X so it faces front */}
        <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.75, 1.75, 0.08, 64]} />
          <meshStandardMaterial
            color={isDark ? '#1C221F' : '#E2E8F0'}
            roughness={0.3}
            metalness={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
};

// Fallback image while 3D texture is loading or on WebGL failure
const ImageFallback: React.FC = () => (
  <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-200 dark:border-graphite-700 shadow-2xl">
    <img
      src="/akash-portrait.jpg"
      alt="Akash Siddappa Goundi"
      className="w-full h-full object-cover object-top"
    />
  </div>
);

export const Portrait3D: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hasWebGLError, setHasWebGLError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  const handleMouseLeave = () => {
    setPointer({ x: 0, y: 0 });
  };

  if (hasWebGLError) {
    return (
      <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px]">
        <ImageFallback />
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[360px] lg:h-[360px] cursor-grab active:cursor-grabbing select-none"
    >
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onError={() => setHasWebGLError(true)}
        className="w-full h-full"
      >
        <ambientLight intensity={isDark ? 1.4 : 1.7} />
        <directionalLight
          position={[pointer.x * 3 + 2, pointer.y * 3 + 3, 4]}
          intensity={isDark ? 1.8 : 2.0}
          color="#FFFFFF"
        />
        <pointLight
          position={[-3, -2, 2]}
          intensity={0.8}
          color={isDark ? '#22D3EE' : '#6366F1'}
        />
        <pointLight
          position={[3, 2, 2]}
          intensity={0.8}
          color={isDark ? '#C5F36B' : '#10B981'}
        />

        <Suspense fallback={null}>
          <PortraitMesh pointer={pointer} isDark={isDark} />
        </Suspense>
      </Canvas>

      {/* Floating Interactive 3D Hint */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white dark:bg-graphite-850 border border-slate-200 dark:border-graphite-700 shadow-md text-[10px] font-mono text-slate-600 dark:text-ivory-dim flex items-center gap-1.5 pointer-events-none whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
        <span>INTERACTIVE 3D · MOVE CURSOR</span>
      </div>
    </div>
  );
};
