'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { getResumeData } from '@/utils/data';

export default function AchievementsSection() {
  const resume = getResumeData();

  return (
    <section id="achievements" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <AnimatedSection>
          <div className="section-head">
            <span className="section-label">Signals</span>
            <h2 className="section-title">Recognition &amp; <em>contribution</em></h2>
            <p className="section-subtitle">
              Work and standing outside the day job.
            </p>
          </div>
        </AnimatedSection>

        <div className="section-body wide">
          <AnimatedSection delay={0.1}>
            <div className="signals">
              {resume.achievements.map((achievement, i) => (
                <div className="signal" key={i}>
                  <span className="s-idx">{String(i + 1).padStart(2, '0')}</span>
                  <div className="s-title">{achievement.title}</div>
                  <p>{achievement.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Certifications */}
          <AnimatedSection delay={0.2}>
            <div style={{ marginTop: '64px' }}>
              <span className="section-label">Certifications</span>
              <div style={{ marginTop: '20px' }}>
                {resume.certifications.map((cert, i) => (
                  <div key={i} className="spec-row">
                    <div className="spec-k">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: '1.05rem',
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
