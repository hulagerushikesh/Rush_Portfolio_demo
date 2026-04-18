'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';

const stats = [
  { value: '2+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Built' },
  { value: '15+', label: 'Technologies' },
  { value: '3+', label: 'Certifications' },
];

export default function AboutSection() {
  return (
    <section id="about" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <AnimatedSection>
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Passionate about building <GradientText>intelligent systems</GradientText>
          </h2>
        </AnimatedSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            marginTop: '48px',
          }}
        >
          {/* About text */}
          <AnimatedSection delay={0.2}>
            <div style={{ maxWidth: '720px' }}>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                }}
              >
                I&apos;m a Software Engineer at <strong style={{ color: 'var(--text-primary)' }}>Telstra</strong>, specializing in
                platform engineering with a deep passion for AI/ML. I architect and
                build scalable backend services, lead critical cloud infrastructure
                migrations, and develop intelligent systems that solve real-world
                problems.
              </p>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                }}
              >
                My expertise spans across the full stack of modern engineering — from
                designing secure authentication systems with <strong style={{ color: 'var(--text-primary)' }}>Java &amp; Spring Boot</strong> to
                building enterprise AI platforms with <strong style={{ color: 'var(--text-primary)' }}>RAG, LLMs, and cloud-native ML
                pipelines</strong>. I thrive at the intersection of software engineering and
                artificial intelligence.
              </p>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                }}
              >
                A proud B.Tech graduate from <strong style={{ color: 'var(--text-primary)' }}>VJTI Mumbai</strong>, I&apos;m also an active
                open-source contributor to <strong style={{ color: 'var(--text-primary)' }}>Hugging Face Transformers</strong> and a
                competitive programmer with a Top 10 rank at Google APAC Challenge 2025.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats grid */}
          <AnimatedSection delay={0.4}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{
                    padding: '28px 20px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '2.25rem',
                      fontWeight: 800,
                      marginBottom: '4px',
                    }}
                  >
                    <GradientText>{stat.value}</GradientText>
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
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
