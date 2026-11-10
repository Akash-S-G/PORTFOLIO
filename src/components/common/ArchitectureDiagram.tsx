import React, { useState } from 'react';
import { ArchitectureNode, ArchitectureConnection } from '../../types/portfolio';
import { Cpu, Server, Database, Smartphone, RefreshCw, Info } from 'lucide-react';
import { MermaidFlow } from './MermaidFlow';

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

  return (
    <div className="w-full rounded-none bg-white dark:bg-black border-2 border-black dark:border-white p-5 transition-colors duration-150">
      <div className="flex items-center justify-between mb-4 border-b-2 border-black dark:border-white pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-none bg-signal inline-block" />
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
            {title}
          </h4>
        </div>
        <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-bold">
          [Click any step to inspect its workflow]
        </span>
      </div>

      {/* Nodes Grid / Flow Representation */}
      <div
        className={`grid grid-cols-2 gap-3 mb-5 ${
          nodes.length >= 6 ? 'sm:grid-cols-3 lg:grid-cols-6' : 'sm:grid-cols-3 lg:grid-cols-5'
        }`}
      >
        {nodes.map((node, index) => {
          const isSelected = selectedNodeId === node.id;
          const Icon = getCategoryIcon(node.category);

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              type="button"
              className={`text-left p-3.5 rounded-none border-2 transition-colors duration-150 relative flex flex-col justify-between min-h-[96px] cursor-pointer ${
                isSelected
                  ? 'bg-signal text-white border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
                  : 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className={`w-7 h-7 rounded-none flex items-center justify-center border shrink-0 ${
                    isSelected
                      ? 'border-white dark:border-black bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black'
                      : 'border-black dark:border-white bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className={`text-[9px] font-mono font-bold uppercase ${isSelected ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-500'}`}>
                  STEP 0{index + 1}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wide leading-tight">
                  {node.label}
                </div>
                <div className={`text-[10px] font-mono truncate mt-0.5 ${isSelected ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-600 dark:text-neutral-400'}`}>
                  {node.sublabel}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Step-Specific Connections */}
      {selectedNode && (
        <div className="mb-4 bg-neutral-50 dark:bg-neutral-900 rounded-none p-3 border-2 border-black dark:border-white">
          <div className="text-[10px] font-mono text-black dark:text-white uppercase tracking-wider mb-2 font-bold">
            Data Flow In &amp; Out of {selectedNode.label}:
          </div>
          {(() => {
            const inbound = connections.filter((c) => c.to === selectedNode.id);
            const outbound = connections.filter((c) => c.from === selectedNode.id);
            const renderConn = (conn: ArchitectureConnection, dir: 'in' | 'out') => (
              <div
                key={`${dir}-${conn.from}-${conn.to}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-white dark:bg-black border border-black dark:border-white text-xs font-mono text-black dark:text-white"
              >
                {dir === 'in' && (
                  <>
                    <span className="font-bold">{conn.from}</span>
                    <span className="font-extrabold text-signal">→</span>
                    <span className="font-bold text-signal">{selectedNode.label.split(' ')[0]}</span>
                  </>
                )}
                {dir === 'out' && (
                  <>
                    <span className="font-bold text-signal">{selectedNode.label.split(' ')[0]}</span>
                    <span className="font-extrabold text-signal">→</span>
                    <span className="font-bold">{conn.to}</span>
                  </>
                )}
                <span className="text-[10px] font-bold text-white bg-signal px-1.5 py-0.2 ml-1">
                  {conn.protocol}
                </span>
              </div>
            );
            if (inbound.length === 0 && outbound.length === 0) {
              return (
                <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                  Origin / sink step — no internal conduits.
                </div>
              );
            }
            return (
              <div className="space-y-1.5">
                {inbound.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[9px] font-mono font-bold text-cyan-dark dark:text-cyan uppercase">In ↓</span>
                    {inbound.map((c) => renderConn(c, 'in'))}
                  </div>
                )}
                {outbound.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[9px] font-mono font-bold text-cyan-dark dark:text-cyan uppercase">Out ↑</span>
                    {outbound.map((c) => renderConn(c, 'out'))}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Inspector Details Card */}
      {selectedNode && (
        <div className="p-4 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] flex items-start gap-3">
          <div className="w-7 h-7 rounded-none bg-signal text-white border border-black dark:border-white flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold text-black dark:text-white uppercase tracking-wide">
                {selectedNode.label}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-signal text-white font-bold uppercase">
                {selectedNode.sublabel}
              </span>
            </div>
            <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">{selectedNode.role}</p>
            {selectedNode.workflow && selectedNode.workflow.length > 0 && (
              <ol className="mt-3 space-y-1.5 border-l-2 border-black dark:border-white pl-3">
                {selectedNode.workflow.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] leading-snug text-neutral-800 dark:text-neutral-200 font-medium">
                    <span className="shrink-0 mt-0.5 w-4 h-4 flex items-center justify-center bg-signal text-white font-mono text-[9px] font-bold border border-black dark:border-white">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}
            <div className="mt-2 text-[11px] font-mono text-black dark:text-white font-bold flex items-center gap-1.5 uppercase">
              <span className="w-1.5 h-1.5 rounded-none bg-black dark:bg-white inline-block" />
              <span>Specification: {selectedNode.details}</span>
            </div>
            {selectedNode.stepDiagram && (
              <div className="mt-3">
                <MermaidFlow chart={selectedNode.stepDiagram} id={`step-${selectedNode.id}`} scrollableY />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
