import React from 'react';
import { Gamepad2, BookOpen, Compass } from 'lucide-react';
import { RevealStagger, RevealItem } from '../common/Reveal';
import { TextReveal } from '../common/Reveal';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Casual Portrait Viewfinder */}
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

                {/* Friendly HUD Overlay at bottom of photo */}
                <div className="p-4 bg-black text-white border-t-2 border-black dark:border-white">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Akash Siddappa Goundi
                    </span>
                    <span className="w-2 h-2 rounded-none bg-emerald-400 dark:bg-lime inline-block" />
                  </div>
                  <div className="text-[10px] font-mono text-neutral-300 flex items-center justify-between font-bold uppercase">
                    <span>BUILDER · GAMER · READER</span>
                    <span>BENGALURU, IN</span>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-black dark:text-white uppercase font-bold">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-signal" />
                  <span>PASSION: CREATING &amp; EXPLORING</span>
                </span>
                <span className="text-signal">STATUS: ALWAYS CURIOUS</span>
              </div>
            </div>
          </div>

          {/* Right: Personal, Authentic Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-none bg-signal inline-block" />
              <span className="text-xs font-mono font-bold text-cyan-dark dark:text-cyan uppercase tracking-widest">
                ABOUT ME
              </span>
            </div>

            <TextReveal
              as="h2"
              text="Figuring out how things work, and building things of my own."
              className="font-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight"
            />

            <div className="space-y-4 text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
              <p>
                I&rsquo;ve always enjoyed figuring out how things work and finding ways to build things of my own. What started as an interest in technology slowly turned into something I genuinely love. I enjoy taking an idea, experimenting with it, making mistakes, fixing things, and eventually turning it into something that works. For me, the fun is not just in the final result but in the whole process of getting there.
              </p>

              <p>
                In my free time, I love experimenting with new technologies, building small things, trying out ideas, and sometimes breaking things just to understand how they work (and then figuring out how to fix them!). I&rsquo;m also curious about new AI tools and enjoy exploring how they can make building and learning a little easier. I guess I just enjoy trying things out and seeing what I can create.
              </p>

              <p>
                When I&rsquo;m not coding or experimenting with new ideas, you&rsquo;ll usually find me unwinding with my two favorite escapes:
              </p>
            </div>

            {/* The Two Favorite Escapes */}
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t-2 border-black dark:border-white">
              {/* Escape 1: Playing Games */}
              <RevealItem
                variant="up"
                className="p-5 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:bg-cyan hover:text-black hover:border-cyan dark:hover:bg-cyan dark:hover:text-black dark:hover:border-cyan transition-colors group cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider group-hover:text-black">
                    Playing Games
                  </span>
                  <Gamepad2 className="w-5 h-5 text-signal group-hover:text-black" />
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-black leading-relaxed font-medium">
                  Big fan of video games—whether getting lost in rich story-driven adventures, competing with friends, or appreciating clever world design and mechanics.
                </p>
              </RevealItem>

              {/* Escape 2: Reading Books */}
              <RevealItem
                variant="up"
                className="p-5 rounded-none bg-neutral-50 dark:bg-neutral-900 border-2 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:bg-cyan hover:text-black hover:border-cyan dark:hover:bg-cyan dark:hover:text-black dark:hover:border-cyan transition-colors group cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider group-hover:text-black">
                    Reading Books
                  </span>
                  <BookOpen className="w-5 h-5 text-signal group-hover:text-black" />
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 group-hover:text-black leading-relaxed font-medium">
                  Love sitting down with a great book. Absorbing different ideas, unique perspectives, and compelling stories keeps my curiosity fueled and fresh.
                </p>
              </RevealItem>
            </RevealStagger>
          </div>
        </div>
      </div>
    </section>
  );
};
