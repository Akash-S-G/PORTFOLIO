import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Technical Portrait Viewfinder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Decorative Corner Reticles */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-lime z-20 pointer-events-none" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-lime z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-lime z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-lime z-20 pointer-events-none" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden bg-graphite-950 border border-graphite-700/80 shadow-2xl group">
                <img
                  src="./akash-portrait.jpg"
                  alt="Akash Siddappa Goundi"
                  className="w-full h-auto aspect-square object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />

                {/* Technical HUD Overlay at bottom of photo */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-graphite-950 via-graphite-950/85 to-transparent backdrop-blur-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-ivory uppercase tracking-wider">
                      Akash Siddappa Goundi
                    </span>
                    <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                  </div>
                  <div className="text-[10px] font-mono text-lime/90 flex items-center justify-between">
                    <span>RVCE // B.E. ISE 2023–2027</span>
                    <span>BENGALURU, IN</span>
                  </div>
                </div>
              </div>

              {/* Viewfinder Coordinates */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-ivory-muted">
                <span>COORD: 12.9716° N, 77.5946° E</span>
                <span>STATUS: VERIFIED_ENGINEER</span>
              </div>
            </div>
          </div>

          {/* Right: Authentic Engineering Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
              <span className="text-xs font-mono font-semibold text-lime uppercase tracking-widest">
                ENGINEERING_PERSPECTIVE // PROFILE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory tracking-tight">
              Engineering Practical Systems Beyond the Happy Path
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-ivory-dim leading-relaxed">
              <p>
                I am a software engineering student at <strong className="text-ivory font-semibold">R V College of Engineering (RVCE)</strong> in Bengaluru, focused on building software systems where backend architectures intersect with artificial intelligence and distributed edge devices.
              </p>

              <p>
                Rather than treating AI as an isolated cloud API or speculative research concept, I focus on how machine learning models run within real-world constraints—quantizing models with <code className="text-lime font-mono text-xs px-1.5 py-0.5 rounded bg-graphite-850">llama.cpp</code> to execute offline on edge hubs, structuring resumable chunk manifests to survive intermittent classroom networks, and connecting camera vision directly to real-time checkout state.
              </p>

              <p>
                My work during my software development internship at <strong className="text-ivory font-semibold">STON Technology</strong> reinforced the importance of operational reliability: architecting QR-based verification pipelines, multi-factor auth with TOTP and Google OAuth, and robust automated reporting that handles edge cases cleanly.
              </p>

              <p>
                I prioritize deep computer science fundamentals, data structures, and algorithmic rigor—having solved over 300 competitive problems across LeetCode and Codeforces. I learn most effectively by designing architectures, writing backend code, profiling bottlenecks, and debugging until systems work predictably under pressure.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-graphite-800">
              <div className="p-3 rounded-xl bg-graphite-900 border border-graphite-750">
                <div className="font-mono text-xs font-bold text-lime mb-1">01. Grounded Design</div>
                <div className="text-[11px] text-ivory-muted leading-snug">
                  Favoring explicit data flow, clear failure states, and predictable latency over opaque abstractions.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-graphite-900 border border-graphite-750">
                <div className="font-mono text-xs font-bold text-cyan mb-1">02. Edge Awareness</div>
                <div className="text-[11px] text-ivory-muted leading-snug">
                  Designing offline-first capabilities so critical functionality survives network drops.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-graphite-900 border border-graphite-750">
                <div className="font-mono text-xs font-bold text-ivory mb-1">03. Code Honesty</div>
                <div className="text-[11px] text-ivory-muted leading-snug">
                  Transparently documenting hardware constraints, benchmark conditions, and operational limits.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
