import React, { useState } from 'react';
import { RevealStagger, RevealItem } from '../common/Reveal';
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
      title: 'High-Integrity Verification & Audit Pipelines',
      project: 'STON Technology',
      projectId: 'experience',
      tech: 'Express.js • MongoDB • QR Streams',
      summary: 'Engineering sub-second QR ticket authentication at venue gates with atomic check-in state, offline retry queuing, and automated multi-drive audit reporting.',
      highlight: 'Atomic Gate Verification'
    }
  ];

  return (
    <section className="py-20 bg-neutral-50 dark:bg-black relative transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-none bg-signal inline-block" />
            <span className="text-xs font-mono font-bold text-cyan-dark dark:text-cyan uppercase tracking-widest">
              SYSTEMS_DESIGN_PHILOSOPHY // ARCHITECTURAL_PILLARS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
            How I Think About Systems Architecture
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-2xl font-medium">
            Across distributed hubs, IoT telemetry, and computer vision, my work follows core backend engineering patterns designed for resilience and predictable performance.
          </p>
        </div>

        {/* Interactive 4 Pillars Grid */}
        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {principles.map((item, index) => {
            const isSelected = activePrinciple === index;
            return (
              <RevealItem key={index} variant="scale">
                <button
                  onClick={() => setActivePrinciple(index)}
                  type="button"
                  className={`p-5 rounded-none text-left border-2 transition-colors duration-150 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-signal text-white border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                      : 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-neutral-100 dark:hover:bg-neutral-900'
                  }`}
                >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      PILLAR 0{index + 1}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-none border font-bold uppercase ${
                      isSelected
                        ? 'bg-white dark:bg-black text-black dark:text-white border-white dark:border-black'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white border-black dark:border-white'
                    }`}>
                      {item.project}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold mb-2">
                    {item.title}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-3 font-medium ${
                    isSelected ? 'text-neutral-300 dark:text-neutral-700' : 'text-neutral-700 dark:text-neutral-300'
                  }`}>
                    {item.summary}
                  </p>
                </div>

                <div className={`pt-3 border-t text-[11px] font-mono font-bold uppercase flex items-center justify-between ${
                  isSelected ? 'border-neutral-700 dark:border-neutral-300' : 'border-neutral-200 dark:border-neutral-800'
                }`}>
                  <span>{item.highlight}</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </button>
            </RevealItem>
          );
        })}
      </RevealStagger>

        {/* Selected Principle Deep Dive Banner */}
        <div className="p-6 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-black dark:text-white uppercase">
                Active Architecture Focus:
              </span>
              <span className="text-xs font-mono text-black dark:text-white font-bold uppercase">
                [{principles[activePrinciple].title}]
              </span>
            </div>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
              Applied in <strong className="text-signal font-bold">{principles[activePrinciple].project}</strong> using {principles[activePrinciple].tech}
            </p>
          </div>

          <a
            href={principles[activePrinciple].projectId === 'experience' ? '#experience' : `#project-${principles[activePrinciple].projectId}`}
            className="px-4 py-2 rounded-none bg-signal hover:bg-signal-deep text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shrink-0 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            Jump to Case Study Flow →
          </a>
        </div>
      </div>
    </section>
  );
};
