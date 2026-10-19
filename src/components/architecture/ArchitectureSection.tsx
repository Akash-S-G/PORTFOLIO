import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  const principles = [
    {
      title: 'Fault-Tolerant Edge Resumption',
      project: 'PIHUB',
      projectId: 'pihub',
      tech: 'FastAPI • SQLite • Chunk Offsets',
      summary: 'Surviving flaky classroom Wi-Fi with byte-offset manifest synchronization and SHA-256 integrity checks, preventing corrupt pack states.',
      highlight: 'Offset Chunk Streaming'
    },
    {
      title: 'Real-Time Vision & State Sync',
      project: 'Smart Shopping Cart',
      projectId: 'smart-cart',
      tech: 'YOLO11n • WebSockets • PostgreSQL',
      summary: 'Bridging camera detection feeds to live customer cart state and atomic inventory decrements with sub-millisecond broadcast updates.',
      highlight: 'Dual-tier Inference & WS ConnectionManager'
    },
    {
      title: 'High-Throughput Time-Series Ingestion',
      project: 'Sol-Bridge',
      projectId: 'sol-bridge',
      tech: 'Node.js • TimescaleDB • MQTT',
      summary: 'Decoupling bursty IoT smart-meter telemetry via lightweight MQTT topics into hypertable time-series partitions for continuous energy accounting.',
      highlight: 'Hypertables & Redis Event Bus'
    },
    {
      title: 'Probabilistic Anomaly Scoring',
      project: 'FundShield',
      projectId: 'fundshield',
      tech: 'FastAPI • Scikit-learn • OpenCV',
      summary: 'Applying perceptual hashing and Isolation Forest to flag duplicate images and irregular transaction patterns without making unfounded binary fraud assertions.',
      highlight: 'Multi-signal Risk Engine'
    }
  ];

  return (
    <section id="architecture" className="py-20 bg-graphite-950/70 border-t border-graphite-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs font-mono font-semibold text-cyan uppercase tracking-widest">
              SYSTEMS_DESIGN_PHILOSOPHY // ARCHITECTURAL_PILLARS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory tracking-tight">
            How I Think About Systems Architecture
          </h2>
          <p className="mt-2 text-sm sm:text-base text-ivory-dim max-w-2xl">
            Across distributed hubs, IoT telemetry, and computer vision, my work follows core backend engineering patterns designed for resilience and predictable performance.
          </p>
        </div>

        {/* Interactive 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {principles.map((item, index) => {
            const isSelected = activePrinciple === index;
            return (
              <button
                key={index}
                onClick={() => setActivePrinciple(index)}
                className={`p-5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-graphite-850 border-lime ring-1 ring-lime/40 shadow-xl'
                    : 'bg-graphite-900 border-graphite-750 hover:border-graphite-600 hover:bg-graphite-850/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-lime font-bold uppercase tracking-wider">
                      PILLAR 0{index + 1}
                    </span>
                    <span className="text-[10px] font-mono text-ivory-muted px-2 py-0.5 rounded bg-graphite-900 border border-graphite-750">
                      {item.project}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-ivory mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-ivory-dim leading-relaxed mb-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-graphite-800 text-[11px] font-mono text-cyan flex items-center justify-between">
                  <span>{item.highlight}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Principle Deep Dive Banner */}
        <div className="p-6 rounded-2xl bg-graphite-900 border border-graphite-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-lime uppercase">
                Active Architecture Focus:
              </span>
              <span className="text-xs font-mono text-ivory font-semibold">
                {principles[activePrinciple].title}
              </span>
            </div>
            <p className="text-xs text-ivory-dim">
              Verified in <strong className="text-ivory">{principles[activePrinciple].project}</strong> using {principles[activePrinciple].tech}
            </p>
          </div>

          <a
            href={`#project-${principles[activePrinciple].projectId}`}
            className="px-4 py-2 rounded-xl bg-lime/10 hover:bg-lime hover:text-graphite-950 border border-lime/40 text-lime text-xs font-mono font-semibold transition-all shrink-0"
          >
            Jump to Case Study Flow →
          </a>
        </div>
      </div>
    </section>
  );
};
