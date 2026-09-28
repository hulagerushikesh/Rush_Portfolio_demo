import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import CountUp from '@/components/ui/CountUp';
import { getResumeData, getYearsOfExperience } from '@/utils/data';
import { getPublishedProjects } from '@/lib/content';

export default async function AboutSection() {
  const resume = getResumeData();
  const projects = await getPublishedProjects();

  const stats = [
    { value: `${getYearsOfExperience(resume.experience[0].startDate)}+`, label: 'Years' },
    { value: `${projects.length}`, label: 'Shipped' },
    { value: '15+', label: 'Apps migrated' },
    { value: `${resume.certifications.length}`, label: 'Certifications' },
  ];

  return (
    <section id="about">
      <div className="section-container">
        <AnimatedSection>
          <div className="section-head">
            <span className="section-label">About</span>
            <h2 className="section-title">Production identity at Telstra, <em>AI systems</em> on the side</h2>
          </div>
        </AnimatedSection>

        <div className="section-body">
          <AnimatedSection delay={0.15}>
            <div style={{ maxWidth: '68ch', margin: 0 }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>At Telstra</strong>, I own the
                registration, authentication and authorization services behind customer digital
                channels — <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Java &amp; Spring
                Boot</strong> backends implementing OAuth 2.0 and OpenID Connect, JWT/JWKS
                validation, MFA and RBAC, with the security primitives beneath them: PKI, X.509
                lifecycle, mTLS, and TLS termination at the edge.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>
                That&apos;s meant migrating{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>15+ enterprise apps</strong>{' '}
                from PCF to OpenShift with zero authentication downtime, moving edge security to{' '}
                <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>AWS CloudFront &amp;
                WAFv2</strong> across 10+ downstream apps, and automating X.509 issuance and
                rotation so manual cert renewal stopped being an outage risk.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Outside the day job — separately from my Telstra work — I build{' '}
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
