'use client';

import { Trophy, Award } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import { getResumeData } from '@/utils/data';

export default function AchievementsSection() {
  const resume = getResumeData();

  return (
    <section id="achievements" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <AnimatedSection>
          <span className="section-label">Achievements</span>
          <h2 className="section-title">
            Milestones & <GradientText>Recognition</GradientText>
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginTop: '48px',
          }}
        >
          {resume.achievements.map((achievement, i) => (
            <AnimatedSection key={i} delay={0.1 * i} variant="scaleIn">
              <div
                className="glass-card"
                style={{
                  padding: '28px',
                  textAlign: 'center',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-award)',
                    margin: '0 auto 16px',
                  }}
                >
                  <Trophy size={22} strokeWidth={1.75} />
                </div>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {achievement.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {achievement.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Certifications */}
        <AnimatedSection delay={0.3}>
          <div style={{ marginTop: '64px' }}>
            <span className="section-label">Certifications</span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginTop: '24px',
              }}
            >
              {resume.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: '28px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-secondary)',
                      flexShrink: 0,
                    }}
                  >
                    <Award size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                      }}
                    >
                      {cert.name}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
