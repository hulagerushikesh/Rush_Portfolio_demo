'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { getResumeData } from '@/utils/data';

export default function ExperienceSection() {
  const resume = getResumeData();

  return (
    <section id="experience">
      <div className="section-container section-grid">
        <aside className="section-rail">
          <span className="rail-idx">02</span>
          <span className="rail-k">Career</span>
          <span className="rail-k">Log</span>
        </aside>

        <div>
          <AnimatedSection>
            <span className="section-label">Experience</span>
            <h2 className="section-title">Where I&apos;ve worked</h2>
            <p className="section-subtitle">
              A typed record of roles building and securing scalable platforms —
              most recent first.
            </p>
          </AnimatedSection>

          <div style={{ marginTop: '44px', display: 'grid', gap: '44px' }}>
            {resume.experience.map((exp, i) => (
              <AnimatedSection key={i} delay={0.1 * i} variant="fadeLeft">
                <div className="xp">
                  <div className="xp-head">
                    <div>
                      <h3 className="xp-title">{exp.title}</h3>
                      <span className="xp-co">
                        {exp.company} · {exp.location}
                      </span>
                    </div>
                    <span className="xp-when">
                      {exp.startDate.toUpperCase()} — {exp.endDate.toUpperCase()}
                    </span>
                  </div>
                  <ul>
                    {exp.description.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Education */}
          <AnimatedSection delay={0.2}>
            <div style={{ marginTop: '60px' }}>
              <span className="section-label">Education</span>
              <div style={{ marginTop: '20px' }}>
                {resume.education.map((edu, i) => (
                  <div key={i} className="spec-row">
                    <div className="spec-k">
                      {edu.startDate} — {edu.endDate}
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
                        {edu.degree}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                        {edu.institution}
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
