import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeTransitionFx } from './components/common/ThemeTransitionFx';
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

const PortfolioContent: React.FC = () => {
  const handleSelectProjectFromSkill = (projectId: string) => {
    const el = document.getElementById(`project-${projectId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col font-sans selection:bg-signal selection:text-white dark:selection:bg-signal dark:selection:text-white transition-colors duration-150">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. First Page: Majestic 3D Asset spread entirely across the page */}
        <Hero />

        {/* 2. Scroll-Revealed Details & Engineering Overview */}
        <ScrollSection id="overview">
          <ProfileOverviewSection />
        </ScrollSection>

        {/* 3. Scroll-Revealed Projects Case Studies */}
        <ScrollSection id="projects" variant="scale">
          <ProjectsSection roleFilter={'all'} />
        </ScrollSection>

        {/* 4. Scroll-Revealed Architecture & Systems Pillars */}
        <ScrollSection id="architecture" variant="left">
          <ArchitectureSection />
        </ScrollSection>

        {/* 5. Scroll-Revealed Industry Experience */}
        <ScrollSection id="experience" variant="right">
          <ExperienceSection />
        </ScrollSection>

        {/* 6. Scroll-Revealed Technical Skills */}
        <ScrollSection id="skills" variant="scale">
          <SkillsSection onSelectProject={handleSelectProjectFromSkill} />
        </ScrollSection>

        {/* 7. Scroll-Revealed Academic Background & Achievements */}
        <ScrollSection id="education">
          <EducationSection />
        </ScrollSection>

        {/* 8. Scroll-Revealed Engineering Perspective / About */}
        <ScrollSection id="about" variant="left">
          <AboutSection />
        </ScrollSection>

        {/* 9. Scroll-Revealed Contact Channels */}
        <ScrollSection id="contact" variant="right">
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
      <ThemeTransitionFx />
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default App;
