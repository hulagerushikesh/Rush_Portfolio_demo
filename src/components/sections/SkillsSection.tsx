'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import { getResumeData } from '@/utils/data';

const skillIcons: Record<string, string> = {
  languages: '💻',
  aiMl: '🧠',
  frameworks: '⚙️',
  cloud: '☁️',
};

const skillLabels: Record<string, string> = {
  languages: 'Languages',
  aiMl: 'AI / ML',
  frameworks: 'Frameworks & Tools',
  cloud: 'Cloud & DevOps',
};

const skillColors: Record<string, string> = {
  languages: 'rgba(99, 102, 241, 0.15)',
  aiMl: 'rgba(139, 92, 246, 0.15)',
  frameworks: 'rgba(34, 211, 238, 0.15)',
  cloud: 'rgba(16, 185, 129, 0.15)',
};

const skillBorderColors: Record<string, string> = {
  languages: 'rgba(99, 102, 241, 0.3)',
  aiMl: 'rgba(139, 92, 246, 0.3)',
  frameworks: 'rgba(34, 211, 238, 0.3)',
  cloud: 'rgba(16, 185, 129, 0.3)',
};

export default function SkillsSection() {
  const resume = getResumeData();
  const skillCategories = Object.entries(resume.skills);

  return (
    <section id="skills">
      <div className="section-container">
        <AnimatedSection>
          <span className="section-label">Skills</span>
          <h2 className="section-title">
            Technologies I <GradientText>work with</GradientText>
          </h2>
          <p className="section-subtitle">
            A curated toolkit forged through real-world projects and continuous learning.
          </p>
        </AnimatedSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '48px',
          }}
        >
          {skillCategories.map(([key, skills], catIndex) => (
            <AnimatedSection key={key} delay={0.1 * catIndex} variant="scaleIn">
              <div
                className="glass-card"
                style={{
                  padding: '32px',
                  height: '100%',
                }}
              >
                {/* Category header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: skillColors[key],
                      border: `1px solid ${skillBorderColors[key]}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                    }}
                  >
                    {skillIcons[key]}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {skillLabels[key]}
                  </h3>
                </div>

                {/* Skill tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  {skills.map((skill) => (
                    <span key={skill} className="tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
