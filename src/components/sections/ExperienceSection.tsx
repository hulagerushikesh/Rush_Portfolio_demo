'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import { getResumeData } from '@/utils/data';

export default function ExperienceSection() {
  const resume = getResumeData();

  return (
    <section id="experience" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <AnimatedSection>
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            Where I&apos;ve <GradientText>worked</GradientText>
          </h2>
          <p className="section-subtitle">
            Professional experience building scalable platforms and intelligent systems.
          </p>
        </AnimatedSection>

        {/* Experience Timeline */}
        <div
          style={{
            position: 'relative',
            marginTop: '48px',
            paddingLeft: '32px',
          }}
        >
          {/* Timeline line */}
          <div
            style={{
              position: 'absolute',
              left: '7px',
              top: 0,
              bottom: 0,
              width: '2px',
              background:
                'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), transparent)',
              borderRadius: '2px',
            }}
          />

          {resume.experience.map((exp, i) => (
            <AnimatedSection key={i} delay={0.15 * i} variant="fadeLeft">
              <div
                style={{
                  position: 'relative',
                  marginBottom: '40px',
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position: 'absolute',
                    left: '-32px',
                    top: '6px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    border: '3px solid var(--bg-secondary)',
                    boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
                  }}
                />

                <div
                  className="glass-card"
                  style={{ padding: '28px 32px' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          marginBottom: '4px',
                        }}
                      >
                        {exp.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '1rem',
                          color: 'var(--accent-tertiary)',
                          fontWeight: 500,
                        }}
                      >
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        padding: '4px 12px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-subtle)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>

                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '20px',
                      listStyleType: 'none',
                    }}
                  >
                    {exp.description.map((bullet, j) => (
                      <li
                        key={j}
                        style={{
                          position: 'relative',
                          paddingLeft: '16px',
                          marginBottom: '10px',
                          fontSize: '0.95rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.7,
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '10px',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'var(--accent-primary)',
                            opacity: 0.6,
                          }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Education */}
        <AnimatedSection delay={0.3}>
          <div style={{ marginTop: '64px' }}>
            <span className="section-label">Education</span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginTop: '24px',
              }}
            >
              {resume.education.map((edu, i) => (
                <div key={i} className="glass-card" style={{ padding: '28px' }}>
                  <div
                    style={{
                      fontSize: '1.5rem',
                      marginBottom: '12px',
                    }}
                  >
                    🎓
                  </div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--accent-tertiary)',
                      marginBottom: '8px',
                    }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {edu.startDate} — {edu.endDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
