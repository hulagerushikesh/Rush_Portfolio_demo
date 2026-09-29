import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import CountUp from '@/components/ui/CountUp';
import { getResumeData, getYearsOfExperience } from '@/utils/data';
import { getPublishedProjects } from '@/lib/content';

export default async function AboutSection() {
  const resume = getResumeData();
  const projects = await getPublishedProjects();

  const liveCount = projects.filter((p) => p.live_url).length;

  const stats = [
    { value: `${getYearsOfExperience(resume.experience[0].startDate)}+`, label: 'Years' },
    { value: `${projects.length}`, label: 'Shipped' },
    { value: `${liveCount}`, label: 'Live' },
  ];

  return (
    <section id="about">
      <div className="section-container">
        <AnimatedSection>
          <div className="section-head">
            <span className="section-label">About</span>
            <h2 className="section-title">Customer identity at Telstra. <em>Applied AI</em> in production.</h2>
          </div>
        </AnimatedSection>

        <div className="section-body">
          <AnimatedSection delay={0.15}>
            <div style={{ maxWidth: '68ch', margin: 0 }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>At Telstra</strong> I&apos;m a
                backend engineer on the customer identity (CIAM) platform —{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Java &amp; Spring
                Boot</strong> services for login, registration, MFA and recovery, built on OAuth 2.0/OIDC,
                JWT/JWKS and RBAC, with PKI, mTLS and TLS termination underneath.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                I was part of the{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>15+ app PCF→OpenShift
                migration</strong> with zero authentication downtime, and worked on the{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>AWS CloudFront &amp;
                WAFv2</strong> edge migration across 10+ downstream apps and on automated X.509
                certificate rotation that took manual cert renewal off the outage risk list.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Outside work, I build{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>applied-AI systems</strong>:
                agentic RAG (Atlas), real-time computer vision (VisionTrack), and quantitative
                backtesting (Finertia). A B.Tech graduate from{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>VJTI Mumbai</strong>, I
                contribute to{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                  Hugging Face Transformers
                </strong>{' '}
                and placed Top 10 at the Google APAC Challenge 2025.
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
