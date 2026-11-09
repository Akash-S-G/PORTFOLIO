import React from 'react';
import { Cpu, Server, Eye, Radio, RefreshCw, Zap } from 'lucide-react';

interface SceneFallbackProps {
  activeNode?: string | null;
  onSelectNode?: (id: string) => void;
}

export const SceneFallback: React.FC<SceneFallbackProps> = ({ activeNode, onSelectNode }) => {
  const nodes = [
    { id: 'backend', label: 'Backend APIs & Gateway', tech: 'FastAPI / Express', icon: Server, color: '#38C7D2', angle: 0 },
    { id: 'edge-ai', label: 'Offline Edge AI (llama.cpp)', tech: 'GGUF / Quantized Weights', icon: Cpu, color: '#C5F36B', angle: 72 },
    { id: 'vision', label: 'Computer Vision Pipeline', tech: 'YOLO11n / OpenCV', icon: Eye, color: '#A78BFA', angle: 144 },
    { id: 'iot', label: 'IoT & Connected Devices', tech: 'MQTT / TimescaleDB', icon: Radio, color: '#FBBF24', angle: 216 },
    { id: 'sync', label: 'P2P Pack Sync & Edge Hubs', tech: 'Resumable Chunk Manifests', icon: RefreshCw, color: '#38BDF8', angle: 288 },
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[480px] rounded-2xl bg-graphite-850/80 border border-graphite-700/60 p-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />
      
      {/* Central SVG Schematic Diagram */}
      <svg className="w-full h-full max-w-[460px] max-h-[460px] overflow-visible" viewBox="-180 -180 360 360">
        <defs>
          <radialGradient id="fallbackGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C5F36B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C5F36B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Orbit Rings */}
        <circle cx="0" cy="0" r="130" fill="none" stroke="#232A27" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="0" cy="0" r="80" fill="none" stroke="#232A27" strokeWidth="1" strokeDasharray="2 4" />

        {/* Data conduits connecting core to satellite nodes */}
        {nodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * 130;
          const y = Math.sin(rad) * 130;
          const isSelected = activeNode === node.id;

          return (
            <g key={node.id} className="cursor-pointer" onClick={() => onSelectNode?.(node.id)}>
              <line
                x1="0"
                y1="0"
                x2={x}
                y2={y}
                stroke={isSelected ? '#C5F36B' : '#343E3A'}
                strokeWidth={isSelected ? '2.5' : '1.5'}
                strokeDasharray={isSelected ? 'none' : '3 3'}
                className="transition-all duration-300"
              />
              {/* Traveling packet representation */}
              <circle
                cx={x * 0.55}
                cy={y * 0.55}
                r={isSelected ? '4' : '2.5'}
                fill={node.color}
                className="animate-pulse"
              />
            </g>
          );
        })}

        {/* Central Core */}
        <circle cx="0" cy="0" r="44" fill="url(#fallbackGlow)" />
        <circle cx="0" cy="0" r="28" fill="#141816" stroke="#C5F36B" strokeWidth="2" />
        <circle cx="0" cy="0" r="16" fill="#C5F36B" fillOpacity="0.15" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fill="#C5F36B"
          fontSize="9"
          fontWeight="700"
          fontFamily="JetBrains Mono, monospace"
        >
          CORE
        </text>

        {/* Outer Nodes */}
        {nodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = Math.cos(rad) * 130;
          const y = Math.sin(rad) * 130;
          const isSelected = activeNode === node.id;

          return (
            <g
              key={`node-${node.id}`}
              className="cursor-pointer group"
              onClick={() => onSelectNode?.(node.id)}
            >
              <circle
                cx={x}
                cy={y}
                r={isSelected ? '22' : '18'}
                fill="#141816"
                stroke={isSelected ? node.color : '#343E3A'}
                strokeWidth={isSelected ? '2.5' : '1.5'}
                className="transition-all duration-300 group-hover:stroke-lime"
              />
              <circle
                cx={x}
                cy={y}
                r={isSelected ? '9' : '6'}
                fill={node.color}
                className="transition-all duration-300"
              />
            </g>
          );
        })}
      </svg>

      {/* Interactive Node Buttons / Labels at Bottom */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full max-w-xl z-10">
        {nodes.map((node) => {
          const isSelected = activeNode === node.id;
          const Icon = node.icon;
          return (
            <button
              key={node.id}
              onClick={() => onSelectNode?.(node.id)}
              className={`flex items-center gap-1.5 p-2 rounded-lg text-left text-xs transition-all border ${
                isSelected
                  ? 'bg-lime/10 border-lime/50 text-ivory'
                  : 'bg-graphite-900/60 border-graphite-700/50 text-ivory-dim hover:border-graphite-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: node.color }} />
              <div className="truncate">
                <div className="font-mono text-[10px] font-semibold truncate leading-tight">{node.label.split(' ')[0]}</div>
                <div className="text-[9px] text-ivory-muted truncate">{node.tech.split(' ')[0]}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-ivory-muted">
        <Zap className="w-3 h-3 text-lime animate-pulse" />
        <span>System Schematic Mode Active • Click any node to inspect subsystem telemetry</span>
      </div>
    </div>
  );
};

