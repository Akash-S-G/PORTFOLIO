import React, { useRef, useState, useMemo, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SceneFallback } from './SceneFallback';
import { Cpu, Server, Eye, Radio, RefreshCw } from 'lucide-react';

export interface SubsystemNode {
  id: string;
  name: string;
  subtitle: string;
  projectId: string;
  color: string;
  icon: React.ElementType;
  position: [number, number, number];
  telemetry: string;
}

export const SUBSYSTEM_NODES: SubsystemNode[] = [
  {
    id: 'gateway',
    name: 'Backend APIs & Gateway',
    subtitle: 'FastAPI • REST • WebSockets',
    projectId: 'pihub',
    color: '#38C7D2',
    icon: Server,
    position: [2.6, 1.2, 0.4],
    telemetry: 'HEALTHY // 2.4k req/s // 12ms avg'
  },
  {
    id: 'edge-ai',
    name: 'Offline Edge AI',
    subtitle: 'llama.cpp • GGUF • Qdrant',
    projectId: 'pihub',
    color: '#C5F36B',
    icon: Cpu,
    position: [-2.4, 1.6, -0.6],
    telemetry: 'INFERENCE_ONLINE // 4-bit Q4_K_M // 18 tok/s'
  },
  {
    id: 'vision',
    name: 'Computer Vision',
    subtitle: 'YOLO11n • OpenCV • Modal',
    projectId: 'smart-cart',
    color: '#C084FC',
    icon: Eye,
    position: [2.8, -1.3, -0.3],
    telemetry: 'FRAME_RATE: 30fps // YOLO CONF: 0.35'
  },
  {
    id: 'iot',
    name: 'IoT Telemetry & Sensors',
    subtitle: 'MQTT • TimescaleDB • Redis',
    projectId: 'sol-bridge',
    color: '#FBBF24',
    icon: Radio,
    position: [-2.7, -1.2, 0.5],
    telemetry: 'INGESTION: 1883/TCP // TS_CHUNKS: ACTIVE'
  },
  {
    id: 'sync',
    name: 'Distributed P2P Sync',
    subtitle: 'UDP Beacon • 405+ Packs',
    projectId: 'pihub',
    color: '#38BDF8',
    icon: RefreshCw,
    position: [0, -2.5, 0.8],
    telemetry: 'UDP:47890 // CHUNK RESUME: READY'
  }
];

// Inner animated conduit line with travelling data packet
const EnergyConduit: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  isActive: boolean;
  speedMultiplier?: number;
}> = ({ start, end, color, isActive, speedMultiplier = 1 }) => {
  const packetRef = useRef<THREE.Mesh>(null);
  
  // Curve points between core [0,0,0] and destination
  const curve = useMemo(() => {
    const p0 = new THREE.Vector3(...start);
    const p2 = new THREE.Vector3(...end);
    // Midpoint with subtle curvature
    const mid = new THREE.Vector3().addVectors(p0, p2).multiplyScalar(0.5);
    mid.z += 0.3;
    return new THREE.QuadraticBezierCurve3(p0, mid, p2);
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    const points = curve.getPoints(24);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve]);

  useFrame((state) => {
    if (packetRef.current) {
      const t = ((state.clock.elapsedTime * 0.45 * speedMultiplier) % 1.0);
      const pos = curve.getPoint(t);
      packetRef.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Conduit Path */}
      <primitive object={new THREE.Line(
        lineGeometry,
        new THREE.LineDashedMaterial({
          color: isActive ? '#C5F36B' : color,
          dashSize: 0.2,
          gapSize: 0.1,
          linewidth: isActive ? 2 : 1,
          transparent: true,
          opacity: isActive ? 0.9 : 0.35
        })
      )} />
      
      {/* Travelling Data Packet Pulse */}
      <mesh ref={packetRef}>
        <sphereGeometry args={[isActive ? 0.08 : 0.05, 12, 12]} />
        <meshBasicMaterial color={isActive ? '#C5F36B' : color} />
      </mesh>
    </group>
  );
};

// Subsystem Satellite Node
const SubsystemSatellite: React.FC<{
  node: SubsystemNode;
  isActive: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  prefersReducedMotion: boolean;
}> = ({ node, isActive, onHover, onSelect, prefersReducedMotion }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && !prefersReducedMotion) {
      // Subtle hovering breathing motion
      meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime * 1.5 + node.position[0]) * 0.08;
    }
  });

  const Icon = node.icon;

  return (
    <group
      ref={meshRef}
      position={node.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(node.id);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
    >
      {/* Outer Housing Ring */}
      <mesh>
        <torusGeometry args={[0.38, 0.02, 12, 32]} />
        <meshStandardMaterial
          color={isActive || hovered ? '#C5F36B' : node.color}
          emissive={isActive || hovered ? '#C5F36B' : node.color}
          emissiveIntensity={isActive ? 0.6 : 0.2}
          wireframe
        />
      </mesh>

      {/* Core Node Sphere */}
      <mesh scale={isActive || hovered ? 1.25 : 1}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color="#141816"
          emissive={node.color}
          emissiveIntensity={isActive ? 0.8 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Pulsing Aura */}
      {(isActive || hovered) && (
        <mesh scale={1.6}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.25} wireframe />
        </mesh>
      )}

      {/* HTML Overlay Label */}
      <Html
        position={[0, -0.55, 0]}
        center
        distanceFactor={8}
        className="pointer-events-auto select-none"
      >
        <button
          onClick={() => onSelect(node.id)}
          className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap border transition-all duration-200 flex items-center gap-1.5 backdrop-blur-md shadow-lg ${
            isActive || hovered
              ? 'bg-graphite-900/90 text-lime border-lime scale-105'
              : 'bg-graphite-900/75 text-ivory-dim border-graphite-700/80 hover:border-ivory-muted'
          }`}
        >
          <Icon className="w-3 h-3 shrink-0" style={{ color: node.color }} />
          <span>{node.name.split(' ')[0]}</span>
        </button>
      </Html>
    </group>
  );
};

// Systems Central Core
const CentralSystemsCore: React.FC<{ prefersReducedMotion: boolean }> = ({ prefersReducedMotion }) => {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current && !prefersReducedMotion) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (ring1Ref.current && !prefersReducedMotion) {
      ring1Ref.current.rotation.z += delta * 0.3;
      ring1Ref.current.rotation.x += delta * 0.1;
    }
    if (ring2Ref.current && !prefersReducedMotion) {
      ring2Ref.current.rotation.z -= delta * 0.25;
      ring2Ref.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Central Solid Core */}
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshStandardMaterial
          color="#0B0D0C"
          emissive="#C5F36B"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Geometric Outer Geodesic Cage */}
      <mesh scale={1.2}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial
          color="#C5F36B"
          wireframe
          transparent
          opacity={0.4}
          emissive="#C5F36B"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[1.0, 1.04, 48]} />
        <meshBasicMaterial color="#38C7D2" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <ringGeometry args={[1.3, 1.33, 48]} />
        <meshBasicMaterial color="#C5F36B" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* Core Systems Tag */}
      <Html position={[0, 0, 0]} center distanceFactor={8} className="pointer-events-none select-none">
        <div className="text-[10px] font-mono tracking-widest text-lime font-bold uppercase drop-shadow-[0_0_8px_rgba(197,243,107,0.8)]">
          SYS_CORE
        </div>
      </Html>
    </group>
  );
};

// Main Scene Component with Pointer Parallax
const SceneContent: React.FC<{
  activeNode: string | null;
  onHoverNode: (id: string | null) => void;
  onSelectNode: (id: string) => void;
  prefersReducedMotion: boolean;
}> = ({ activeNode, onHoverNode, onSelectNode, prefersReducedMotion }) => {
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sceneGroupRef.current && !prefersReducedMotion) {
      // Gentle restrained mouse parallax (capped within safe range)
      const targetRotationY = state.pointer.x * 0.25;
      const targetRotationX = -state.pointer.y * 0.18;
      
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        targetRotationY,
        0.05
      );
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  return (
    <group ref={sceneGroupRef}>
      {/* Central Core */}
      <CentralSystemsCore prefersReducedMotion={prefersReducedMotion} />

      {/* Satellites & Conduits */}
      {SUBSYSTEM_NODES.map((node) => {
        const isCurrentActive = activeNode === node.id;
        return (
          <React.Fragment key={node.id}>
            <EnergyConduit
              start={[0, 0, 0]}
              end={node.position}
              color={node.color}
              isActive={isCurrentActive}
              speedMultiplier={prefersReducedMotion ? 0 : 1}
            />
            <SubsystemSatellite
              node={node}
              isActive={isCurrentActive}
              onHover={onHoverNode}
              onSelect={onSelectNode}
              prefersReducedMotion={prefersReducedMotion}
            />
          </React.Fragment>
        );
      })}
    </group>
  );
};

// Error Boundary for WebGL Support
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('WebGL context failed, rendering 2D technical schematic fallback:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Exported Root 3D Component
interface SystemCoreSceneProps {
  activeNode: string | null;
  onSelectNode: (id: string) => void;
}

export const SystemCoreScene: React.FC<SystemCoreSceneProps> = ({ activeNode, onSelectNode }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [force2DFallback, setForce2DFallback] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Determine active subsystem to display telemetry for
  const currentActiveId = hoveredNode || activeNode || 'gateway';
  const currentSubsystem = SUBSYSTEM_NODES.find((n) => n.id === currentActiveId) || SUBSYSTEM_NODES[0];

  if (force2DFallback) {
    return (
      <div className="relative w-full">
        <SceneFallback activeNode={activeNode} onSelectNode={onSelectNode} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[440px] md:h-[520px] rounded-2xl bg-graphite-950/70 border border-graphite-700/60 overflow-hidden shadow-2xl backdrop-blur-sm group">
      {/* Background radial gradient & technical grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-lime/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Telemetry Header Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-graphite-900/90 border border-graphite-700/80 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="text-[11px] font-mono font-semibold text-ivory tracking-wide uppercase">
            DISTRIBUTED_CORE // {currentSubsystem.name}
          </span>
        </div>

        {/* Fallback Toggle Switch */}
        <button
          onClick={() => setForce2DFallback(true)}
          className="pointer-events-auto text-[10px] font-mono text-ivory-dim hover:text-lime px-2 py-1 rounded bg-graphite-900/80 border border-graphite-700/70 hover:border-lime/50 transition-colors"
          title="Switch to lightweight 2D schematic"
        >
          2D Schematic
        </button>
      </div>

      {/* 3D Canvas */}
      <WebGLErrorBoundary fallback={<SceneFallback activeNode={activeNode} onSelectNode={onSelectNode} />}>
        <Suspense fallback={<SceneFallback activeNode={activeNode} onSelectNode={onSelectNode} />}>
          <Canvas
            camera={{ position: [0, 0, 6.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 0, 2]} intensity={1.5} color="#C5F36B" distance={8} />
            <pointLight position={[4, 4, 3]} intensity={0.8} color="#38C7D2" distance={10} />
            <pointLight position={[-4, -3, 2]} intensity={0.6} color="#A78BFA" distance={10} />
            <directionalLight position={[0, 6, 4]} intensity={0.5} />

            <SceneContent
              activeNode={hoveredNode || activeNode}
              onHoverNode={setHoveredNode}
              onSelectNode={onSelectNode}
              prefersReducedMotion={prefersReducedMotion}
            />
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>

      {/* Bottom Subsystem Telemetry Card */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
        <div className="p-3.5 rounded-xl bg-graphite-900/90 border border-graphite-700/80 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: `${currentSubsystem.color}15`,
                borderColor: `${currentSubsystem.color}40`,
                color: currentSubsystem.color
              }}
            >
              <currentSubsystem.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-ivory">{currentSubsystem.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-graphite-800 text-ivory-dim border border-graphite-700">
                  {currentSubsystem.subtitle}
                </span>
              </div>
              <div className="text-[11px] font-mono text-lime/90 mt-0.5">
                {currentSubsystem.telemetry}
              </div>
            </div>
          </div>

          <a
            href={`#project-${currentSubsystem.projectId}`}
            className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-lime/10 border border-lime/40 text-lime hover:bg-lime hover:text-graphite-950 text-xs font-mono font-medium transition-all duration-200 shrink-0"
          >
            Explore Project →
          </a>
        </div>
      </div>
    </div>
  );
};
