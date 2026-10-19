import React, { useState } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { ArchitectureSection } from './components/architecture/ArchitectureSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { EducationSection } from './components/education/EducationSection';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/footer/Footer';
import { RoleFilter } from './types/portfolio';

export const App: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');
  const [selectedSubsystem, setSelectedSubsystem] = useState<string | null>('edge-ai');

  const handleSelectSubsystem = (id: string) => {
    setSelectedSubsystem(id);
    
    // Auto-align role filter if helpful
    if (id === 'edge-ai' || id === 'vision') {
      setRoleFilter('ai-edge');
    } else if (id === 'gateway') {
      setRoleFilter('backend');
    } else if (id === 'iot' || id === 'sync') {
      setRoleFilter('distributed');
    }
  };

  const handleSelectProjectFromSkill = (projectId: string) => {
    const el = document.getElementById(`project-${projectId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-graphite-900 text-ivory flex flex-col font-sans selection:bg-lime/20 selection:text-lime">
      {/* Navigation Header */}
      <Navbar
        activeRole={roleFilter}
        onSelectRole={setRoleFilter}
      />

      {/* Main Content Landmark */}
      <main className="flex-1">
        {/* 1. Hero Section with 3D Systems Scene */}
        <Hero
          activeSubsystem={selectedSubsystem}
          onSelectSubsystem={handleSelectSubsystem}
        />

        {/* 2. Flagship & Featured Projects Section */}
        <ProjectsSection
          roleFilter={roleFilter}
          selectedSubsystem={selectedSubsystem}
        />

        {/* 3. Architecture & Systems Pillars */}
        <ArchitectureSection />

        {/* 4. Experience Section */}
        <ExperienceSection />

        {/* 5. Skills Section with Interactive Cross-linking */}
        <SkillsSection
          onSelectProject={handleSelectProjectFromSkill}
        />

        {/* 6. Education & Achievements */}
        <EducationSection />

        {/* 7. About Section with Verified Portrait */}
        <AboutSection />

        {/* 8. Contact Section & Direct Recruiter Actions */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
