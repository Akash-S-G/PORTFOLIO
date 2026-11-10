import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Phone, MapPin, Github, Linkedin, Download, ArrowUpRight } from 'lucide-react';
import { CopyEmailButton } from '../common/CopyEmailButton';
import { Reveal } from '../common/Reveal';
import { TextReveal } from '../common/Reveal';

export const ContactSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-black relative transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-neutral-100 dark:bg-neutral-900 border-2 border-black dark:border-white text-xs font-mono text-black dark:text-white mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] uppercase font-bold">
              <span className="w-2 h-2 rounded-none bg-signal inline-block" />
              <span>COMMUNICATION_CHANNELS</span>
            </div>
            <TextReveal
              as="h2"
              text="Let’s Connect & Build Together"
              className="font-display text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight"
            />
            <p className="mt-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-xl mx-auto font-medium">
              Have an engineering opportunity, internship inquiry, or technically interesting problem? I welcome conversations with engineering managers and technical recruiters.
            </p>
          </div>

          {/* Main Contact Card */}
          <Reveal variant="up" className="p-8 sm:p-10 rounded-none bg-white dark:bg-black border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Column: Direct Action */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-black dark:text-white font-bold uppercase tracking-wider">
                    Primary Recruiter Contact
                  </span>
                  <h3 className="font-display text-2xl font-bold text-black dark:text-white mt-1">
                    Direct Email &amp; Discussion
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-2 leading-relaxed font-medium">
                    Always available via direct email. I reply promptly to software engineering opportunities and technical inquiries.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Engineering%20Opportunity%20Discussion`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-signal text-white hover:bg-cyan hover:text-black hover:border-cyan font-mono text-xs font-bold uppercase tracking-wide border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-transform duration-100 hover:-translate-y-0.5"
                  >
                    <Mail className="w-4 h-4 stroke-[2.5]" />
                    <span>SEND EMAIL</span>
                  </a>

                  <CopyEmailButton email={PERSONAL_INFO.email} variant="primary" />
                </div>

                <div className="pt-2">
                  <a
                    href={`./${PERSONAL_INFO.resumeFilename}`}
                    download={PERSONAL_INFO.resumeFilename}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-black dark:text-white hover:text-cyan-dark dark:hover:text-cyan underline-offset-4 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download latest resume (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Coordinates & Profiles */}
              <div className="space-y-3 bg-neutral-50 dark:bg-neutral-900 p-6 rounded-none border-2 border-black dark:border-white">
                {/* Email Item */}
                <div className="flex items-center justify-between p-3 rounded-none bg-white dark:bg-black border border-black dark:border-white shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4" />
                    <div>
                      <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-bold">Email</div>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-mono font-bold text-black dark:text-white hover:text-cyan-dark dark:hover:text-cyan break-all">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <CopyEmailButton email={PERSONAL_INFO.email} variant="subtle" />
                </div>

                {/* Phone Item */}
                <div className="flex items-center justify-between p-3 rounded-none bg-white dark:bg-black border border-black dark:border-white shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4" />
                    <div>
                      <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-bold">Phone</div>
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs font-mono font-bold text-black dark:text-white hover:text-cyan-dark dark:hover:text-cyan">
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-bold">IST (+5:30)</span>
                </div>

                {/* GitHub Item */}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-none bg-white dark:bg-black border border-black dark:border-white hover:bg-cyan hover:text-black hover:border-cyan transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-cyan-dark dark:text-cyan" />
                    <div>
                      <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-bold">GitHub Profile</div>
                      <span className="text-xs font-mono font-bold text-black dark:text-white">
                        github.com/Akash-S-G
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-cyan-dark dark:text-cyan" />
                </a>

                {/* LinkedIn Item */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-none bg-white dark:bg-black border border-black dark:border-white hover:bg-cyan hover:text-black hover:border-cyan transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-cyan-dark dark:text-cyan" />
                    <div>
                      <div className="text-[10px] font-mono text-neutral-600 dark:text-neutral-400 uppercase font-bold">LinkedIn Profile</div>
                      <span className="text-xs font-mono font-bold text-black dark:text-white">
                        linkedin.com/in/akash-goundi-27320b303
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-cyan-dark dark:text-cyan" />
                </a>

                {/* Location Item */}
                <div className="flex items-center gap-2.5 p-2 text-xs font-mono text-neutral-700 dark:text-neutral-300 font-bold uppercase">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
