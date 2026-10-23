'use client';

import { GraduationCap, Award } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getResumeData } from '@/utils/data';

export default function AchievementsSection() {
  const resume = getResumeData();
  const hasSignals = resume.achievements.length > 0;

  return (
    <section id="achievements" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <AnimatedSection>
          <div className="section-head">
            <span className="section-label">Foundations</span>
            <h2 className="section-title">
              Certifications &amp; <em>continuous learning</em>
            </h2>
            <p className="section-subtitle">
              The coursework the applied-AI work is built on — plus recognition outside the day job.
            </p>
          </div>
        </AnimatedSection>

        <div className="section-body wide">
          {hasSignals && (
            <AnimatedSection delay={0.1}>
              <div className="signals" style={{ marginBottom: '48px' }}>
                {resume.achievements.map((achievement, i) => (
                  <div className="signal" key={i}>
                    <span className="s-idx">{String(i + 1).padStart(2, '0')}</span>
                    <div className="s-title">{achievement.title}</div>
                    <p>{achievement.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection delay={0.15}>
            <div className="cert-grid">
              {resume.certifications.map((cert, i) => (
                <div key={i} className="cert-card">
                  <span className="cert-badge" aria-hidden="true">
                    {i === 0 ? <GraduationCap size={20} /> : <Award size={20} />}
                  </span>
                  <div>
                    <div className="cert-name">{cert.name}</div>
                    <div className="cert-issuer">{cert.issuer}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
