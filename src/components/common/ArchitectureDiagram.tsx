import React, { useState } from 'react';
import { ArchitectureNode, ArchitectureConnection } from '../../types/portfolio';
import { Cpu, Server, Database, Smartphone, RefreshCw, Info } from 'lucide-react';

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
  title?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  nodes,
  connections,
  title = 'Interactive System Architecture Flow'
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || '');
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const getCategoryIcon = (cat: ArchitectureNode['category']) => {
    switch (cat) {
      case 'client':
        return Smartphone;
      case 'gateway':
        return Server;
      case 'ai-inference':
        return Cpu;
      case 'storage':
        return Database;
      case 'edge-sync':
        return RefreshCw;
      default:
        return Server;
    }
  };

  const getCategoryColor = (cat: ArchitectureNode['category']) => {
    switch (cat) {
      case 'client':
        return '#38BDF8';
      case 'gateway':
        return '#38C7D2';
      case 'ai-inference':
        return '#C5F36B';
      case 'storage':
        return '#FBBF24';
      case 'edge-sync':
        return '#A78BFA';
      default:
        return '#C5F36B';
    }
  };

  return (
    <div className="w-full rounded-xl bg-graphite-950/80 border border-graphite-700/80 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 border-b border-graphite-700/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-ivory">
            {title}
          </h4>
        </div>
        <span className="text-[10px] font-mono text-ivory-dim">Click any node to inspect role</span>
      </div>

      {/* Nodes Grid / Flow Representation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
        {nodes.map((node, index) => {
          const isSelected = selectedNodeId === node.id;
          const Icon = getCategoryIcon(node.category);
          const color = getCategoryColor(node.category);

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`text-left p-3.5 rounded-lg border transition-all duration-200 relative group flex flex-col justify-between min-h-[92px] ${
                isSelected
                  ? 'bg-graphite-850 border-lime ring-1 ring-lime/40 shadow-lg'
                  : 'bg-graphite-900/60 border-graphite-700/70 hover:border-graphite-600 hover:bg-graphite-850/80'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center border shrink-0"
                  style={{
                    backgroundColor: `${color}15`,
                    borderColor: `${color}40`,
                    color: color
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] font-mono text-ivory-muted">STEP 0{index + 1}</span>
              </div>

              <div>
                <div className="text-xs font-semibold text-ivory group-hover:text-lime transition-colors leading-tight">
                  {node.label}
                </div>
                <div className="text-[10px] font-mono text-ivory-muted truncate mt-0.5">
                  {node.sublabel}
                </div>
              </div>

              {isSelected && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-lime rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Connection Links Table */}
      {connections.length > 0 && (
        <div className="mb-4 bg-graphite-900/40 rounded-lg p-3 border border-graphite-700/50">
          <div className="text-[10px] font-mono text-ivory-muted uppercase tracking-wider mb-2">
            Inter-Service Data Conduits & Protocols:
          </div>
          <div className="flex flex-wrap gap-2">
            {connections.map((conn, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-graphite-850 border border-graphite-700/60 text-[11px] font-mono text-ivory-dim"
              >
                <span className="text-ivory font-medium">{conn.from}</span>
                <span className="text-lime">→</span>
                <span className="text-ivory font-medium">{conn.to}</span>
                <span className="text-[10px] text-ivory-muted px-1.5 py-0.2 rounded bg-graphite-950 border border-graphite-700/70 ml-1">
                  {conn.protocol}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inspector Details Card */}
      {selectedNode && (
        <div className="p-4 rounded-lg bg-graphite-900 border border-graphite-700/80 flex items-start gap-3">
          <div className="w-7 h-7 rounded-md bg-lime/10 border border-lime/30 flex items-center justify-center shrink-0 text-lime mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold text-ivory uppercase tracking-wide">
                {selectedNode.label}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-graphite-800 text-lime border border-lime/30">
                {selectedNode.sublabel}
              </span>
            </div>
            <p className="text-xs text-ivory leading-relaxed">{selectedNode.role}</p>
            <div className="mt-2 text-[11px] font-mono text-cyan flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan inline-block" />
              <span>Specification: {selectedNode.details}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
