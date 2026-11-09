import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { ProfileOverviewSection } from './components/profile/ProfileOverviewSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ArchitectureSection } from './components/architecture/ArchitectureSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { EducationSection } from './components/education/EducationSection';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { ScrollSection } from './components/common/ScrollSection';
import { RoleFilter } from './types/portfolio';

const PortfolioContent: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');

  const handleSelectProjectFromSkill = (projectId: string) => {
    const el = document.getElementById(`project-${projectId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-150">
      {/* Navigation Header */}
      <Navbar
        activeRole={roleFilter}
        onSelectRole={setRoleFilter}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. First Page: Majestic 3D Asset spread entirely across the page */}
        <Hero />

        {/* 2. Scroll-Revealed Details & Engineering Overview */}
        <ScrollSection id="overview">
          <ProfileOverviewSection />
        </ScrollSection>

        {/* 3. Scroll-Revealed Projects Case Studies */}
        <ScrollSection id="projects">
          <ProjectsSection roleFilter={roleFilter} />
        </ScrollSection>

        {/* 4. Scroll-Revealed Architecture & Systems Pillars */}
        <ScrollSection id="architecture">
          <ArchitectureSection />
        </ScrollSection>

        {/* 5. Scroll-Revealed Industry Experience */}
        <ScrollSection id="experience">
          <ExperienceSection />
        </ScrollSection>

        {/* 6. Scroll-Revealed Technical Skills */}
        <ScrollSection id="skills">
          <SkillsSection onSelectProject={handleSelectProjectFromSkill} />
        </ScrollSection>

        {/* 7. Scroll-Revealed Academic Background & Achievements */}
        <ScrollSection id="education">
          <EducationSection />
        </ScrollSection>

        {/* 8. Scroll-Revealed Engineering Perspective / About */}
        <ScrollSection id="about">
          <AboutSection />
        </ScrollSection>

        {/* 9. Scroll-Revealed Contact Channels */}
        <ScrollSection id="contact">
          <ContactSection />
        </ScrollSection>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default App;
