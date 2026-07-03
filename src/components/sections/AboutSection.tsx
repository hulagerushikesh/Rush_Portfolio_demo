import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import { getResumeData, getYearsOfExperience, getTechnologyCount } from '@/utils/data';
import { getPublishedProjects } from '@/lib/content';

export default async function AboutSection() {
  const resume = getResumeData();
  const projects = await getPublishedProjects();

  const stats = [
    { value: `${getYearsOfExperience(resume.experience[0].startDate)}+`, label: 'Years Experience' },
    { value: `${projects.length}`, label: 'Projects Shipped' },
    { value: `${getTechnologyCount(resume.skills)}+`, label: 'Technologies' },
    { value: `${resume.certifications.length}`, label: 'Certifications' },
  ];

  return (
    <section id="about">
      <div className="section-container">
        <AnimatedSection>
          <span className="section-label">About Me</span>
          <h2 className="section-title">
            Building <GradientText>intelligent systems</GradientText> at scale
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
                I&apos;m a Software Engineer at <strong style={{ color: 'var(--text-primary)' }}>Telstra</strong>, where I own
                platform engineering initiatives spanning secure backend services, cloud
                infrastructure, and applied AI/ML — taking systems from design through
                production, not just the parts that are interesting.
              </p>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                }}
              >
                That&apos;s meant designing secure authentication systems with{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Java &amp; Spring Boot</strong>, leading a
                critical security migration end-to-end, and building enterprise AI
                platforms on <strong style={{ color: 'var(--text-primary)' }}>RAG, LLMs, and cloud-native ML
                pipelines</strong> — the kind of ownership that comes with a few years of
                shipping systems other teams depend on.
              </p>
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                }}
              >
                A B.Tech graduate from <strong style={{ color: 'var(--text-primary)' }}>VJTI Mumbai</strong>, I stay
                sharp outside work too — contributing to <strong style={{ color: 'var(--text-primary)' }}>Hugging Face
                Transformers</strong> and placing Top 10 at the Google APAC Challenge 2025.
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
