import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Phone, MapPin, Github, Linkedin, Download, ArrowUpRight } from 'lucide-react';
import { CopyEmailButton } from '../common/CopyEmailButton';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-graphite-950/70 border-t border-graphite-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-graphite-850 border border-graphite-700 text-xs font-mono text-lime mb-3">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span>COMMUNICATION_CHANNELS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ivory tracking-tight">
              Let’s Connect & Build Together
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ivory-dim max-w-xl mx-auto">
              Have an engineering opportunity, internship inquiry, or technically interesting problem? I welcome conversations with engineering managers and technical recruiters.
            </p>
          </div>

          {/* Main Contact Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-graphite-900 border border-graphite-700/80 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Column: Direct Action */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-lime font-bold uppercase tracking-wider">
                    Primary Recruiter Contact
                  </span>
                  <h3 className="font-display text-2xl font-bold text-ivory mt-1">
                    Direct Email & Discussion
                  </h3>
                  <p className="text-xs sm:text-sm text-ivory-dim mt-2 leading-relaxed">
                    Always available via direct email. I reply promptly to software engineering opportunities and technical inquiries.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Engineering%20Opportunity%20Discussion`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-lime hover:bg-lime-hover text-graphite-950 font-mono text-xs font-bold tracking-wide shadow-lg transition-all"
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
                    className="inline-flex items-center gap-2 text-xs font-mono text-ivory hover:text-lime underline underline-offset-4 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-lime" />
                    <span>Download latest verified resume (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Verified Coordinates & Profiles */}
              <div className="space-y-3 bg-graphite-850/80 p-6 rounded-xl border border-graphite-750">
                {/* Email Item */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-graphite-900 border border-graphite-750">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-lime" />
                    <div>
                      <div className="text-[10px] font-mono text-ivory-muted uppercase">Email</div>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-mono text-ivory hover:text-lime">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <CopyEmailButton email={PERSONAL_INFO.email} variant="subtle" />
                </div>

                {/* Phone Item */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-graphite-900 border border-graphite-750">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-cyan" />
                    <div>
                      <div className="text-[10px] font-mono text-ivory-muted uppercase">Phone</div>
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs font-mono text-ivory hover:text-cyan">
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-ivory-muted">IST (+5:30)</span>
                </div>

                {/* GitHub Item */}
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-graphite-900 border border-graphite-750 hover:border-lime/50 group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-ivory group-hover:text-lime" />
                    <div>
                      <div className="text-[10px] font-mono text-ivory-muted uppercase">GitHub Profile</div>
                      <span className="text-xs font-mono text-ivory group-hover:text-lime">
                        github.com/Akash-S-G
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ivory-muted group-hover:text-lime" />
                </a>

                {/* LinkedIn Item */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-graphite-900 border border-graphite-750 hover:border-cyan/50 group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-cyan" />
                    <div>
                      <div className="text-[10px] font-mono text-ivory-muted uppercase">LinkedIn Profile</div>
                      <span className="text-xs font-mono text-ivory group-hover:text-cyan">
                        linkedin.com/in/akash-goundi-27320b303
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-ivory-muted group-hover:text-cyan" />
                </a>

                {/* Location Item */}
                <div className="flex items-center gap-2.5 p-2 text-xs font-mono text-ivory-muted">
                  <MapPin className="w-3.5 h-3.5 text-lime" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
