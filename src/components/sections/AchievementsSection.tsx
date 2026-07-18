'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { getResumeData } from '@/utils/data';

export default function AchievementsSection() {
  const resume = getResumeData();

  return (
    <section id="achievements" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container section-grid">
        <aside className="section-rail">
          <span className="rail-idx">05</span>
          <span className="rail-k">External</span>
          <span className="rail-k">Signals</span>
        </aside>

        <div>
          <AnimatedSection>
            <span className="section-label">Signals</span>
            <h2 className="section-title">Recognition &amp; contribution</h2>
            <p className="section-subtitle">
              Work and standing outside the day job.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="signals" style={{ marginTop: '40px' }}>
              {resume.achievements.map((achievement, i) => (
                <div className="signal" key={i}>
                  <span className="s-idx">S-{String(i + 1).padStart(2, '0')}</span>
                  <div className="s-title">{achievement.title}</div>
                  <p>{achievement.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Certifications */}
          <AnimatedSection delay={0.2}>
            <div style={{ marginTop: '56px' }}>
              <span className="section-label">Certifications</span>
              <div style={{ marginTop: '20px' }}>
                {resume.certifications.map((cert, i) => (
                  <div key={i} className="spec-row">
                    <div className="spec-k">
                      CERT
                      <span>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: '4px',
                        }}
                      >
                        {cert.name}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        {cert.issuer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
