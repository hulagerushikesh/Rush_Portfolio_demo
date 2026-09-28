import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import CountUp from '@/components/ui/CountUp';
import { getResumeData, getYearsOfExperience, getTechnologyCount } from '@/utils/data';
import { getPublishedProjects } from '@/lib/content';

export default async function AboutSection() {
  const resume = getResumeData();
  const projects = await getPublishedProjects();

  const stats = [
    { value: `${getYearsOfExperience(resume.experience[0].startDate)}+`, label: 'Years' },
    { value: `${projects.length}`, label: 'Shipped' },
    { value: `${getTechnologyCount(resume.skills)}+`, label: 'Technologies' },
    { value: `${resume.certifications.length}`, label: 'Certifications' },
  ];

  return (
    <section id="about">
      <div className="section-container">
        <AnimatedSection>
          <div className="section-head">
            <span className="section-label">About</span>
            <h2 className="section-title">Building intelligent systems <em>at scale</em></h2>
          </div>
        </AnimatedSection>

        <div className="section-body">
          <AnimatedSection delay={0.15}>
            <div style={{ maxWidth: '68ch', margin: 0 }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                I&apos;m a Software Engineer at{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Telstra</strong>, where I own
                platform engineering initiatives spanning secure backend services, cloud
                infrastructure, and applied AI/ML — taking systems from design through
                production, not just the parts that are interesting.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                That&apos;s meant designing secure authentication systems with{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Java &amp; Spring Boot</strong>,
                leading a critical security migration end-to-end, and building enterprise AI
                platforms on{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  RAG, LLMs, and cloud-native ML pipelines
                </strong>{' '}
                — the kind of ownership that comes with a few years of shipping systems other
                teams depend on.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                A B.Tech graduate from{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>VJTI Mumbai</strong>, I stay
                sharp outside work too — contributing to{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  Hugging Face Transformers
                </strong>{' '}
                and placing Top 10 at the Google APAC Challenge 2025.
              </p>
            </div>
          </AnimatedSection>

          {/* Stats — editorial figure strip */}
          <AnimatedSection delay={0.3}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
                marginTop: '56px',
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="glass-card"
                  style={{ padding: '28px 20px', textAlign: 'center' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.6rem',
                      fontWeight: 500,
                      letterSpacing: '-0.02em',
                      marginBottom: '6px',
                      lineHeight: 1,
                    }}
                  >
                    <GradientText>
                      <CountUp value={stat.value} />
                    </GradientText>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-geist-sans)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
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
