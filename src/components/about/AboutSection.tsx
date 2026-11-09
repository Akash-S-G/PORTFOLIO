import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden bg-white dark:bg-black transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Technical Portrait Viewfinder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Main Image Container */}
              <div className="relative rounded-none overflow-hidden bg-white dark:bg-black border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                <img
                  src="./akash-portrait.jpg"
                  alt="Akash Siddappa Goundi"
                  className="w-full h-auto aspect-square object-cover object-top"
                  loading="lazy"
                />

                {/* Technical HUD Overlay at bottom of photo */}
                <div className="p-4 bg-black text-white border-t-2 border-black dark:border-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Akash Siddappa Goundi
                    </span>
                    <span className="w-2 h-2 rounded-none bg-emerald-400 dark:bg-lime inline-block" />
                  </div>
                  <div className="text-[10px] font-mono text-neutral-300 flex items-center justify-between font-bold">
                    <span>RVCE // B.E. ISE 2023–2027</span>
                    <span>BENGALURU, IN</span>
                  </div>
                </div>
              </div>

              {/* Viewfinder Coordinates */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-black dark:text-white uppercase font-bold">
                <span>COORD: 12.9716° N, 77.5946° E</span>
                <span>STATUS: VERIFIED_ENGINEER</span>
              </div>
            </div>
          </div>

          {/* Right: Authentic Engineering Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-none bg-emerald-600 dark:bg-lime inline-block" />
              <span className="text-xs font-mono font-bold text-black dark:text-white uppercase tracking-widest">
                ENGINEERING_PERSPECTIVE // PROFILE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight">
              Engineering Practical Systems Beyond the Happy Path
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
              <p>
                I am a software engineering student at <strong className="text-black dark:text-white font-bold">R V College of Engineering (RVCE)</strong> in Bengaluru, focused on building software systems where backend architectures intersect with artificial intelligence and distributed edge devices.
              </p>

              <p>
                Rather than treating AI as an isolated cloud API or speculative research concept, I focus on how machine learning models run within real-world constraints—quantizing models with <code className="text-black dark:text-white font-mono text-xs px-1.5 py-0.5 rounded-none bg-neutral-100 dark:bg-neutral-900 border border-black dark:border-white font-bold">llama.cpp</code> to execute offline on edge hubs, structuring resumable chunk manifests to survive intermittent classroom networks, and connecting camera vision directly to real-time checkout state.
              </p>

              <p>
                My work during my software development internship at <strong className="text-black dark:text-white font-bold">STON Technology</strong> reinforced the importance of operational reliability: architecting QR-based verification pipelines, multi-factor auth with TOTP and Google OAuth, and robust automated reporting that handles edge cases cleanly.
              </p>

              <p>
                I prioritize deep computer science fundamentals, data structures, and algorithmic rigor—having solved over 300 competitive problems across LeetCode and Codeforces. I learn most effectively by designing architectures, writing backend code, profiling bottlenecks, and debugging until systems work predictably under pressure.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t-2 border-black dark:border-white">
              <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <div className="font-mono text-xs font-bold text-black dark:text-white uppercase mb-1">01. Grounded Design</div>
                <div className="text-xs text-neutral-700 dark:text-neutral-300 leading-snug font-medium">
                  Favoring explicit data flow, clear failure states, and predictable latency over opaque abstractions.
                </div>
              </div>

              <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <div className="font-mono text-xs font-bold text-black dark:text-white uppercase mb-1">02. Edge Awareness</div>
                <div className="text-xs text-neutral-700 dark:text-neutral-300 leading-snug font-medium">
                  Designing offline-first capabilities so critical functionality survives network drops.
                </div>
              </div>

              <div className="p-4 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <div className="font-mono text-xs font-bold text-black dark:text-white uppercase mb-1">03. Code Honesty</div>
                <div className="text-xs text-neutral-700 dark:text-neutral-300 leading-snug font-medium">
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
