import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Magnetic from '@/components/ui/Magnetic';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

const EMAIL = 'hulagerushikesh@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Let's build something",
)}`;

const channels = [
  { Icon: Mail, label: 'Email', value: EMAIL, href: MAILTO },
  { Icon: LinkedinIcon, label: 'LinkedIn', value: 'in/rushikesh-hulage', href: 'https://www.linkedin.com/in/rushikesh-hulage-46018522b/' },
  { Icon: GithubIcon, label: 'GitHub', value: 'hulagerushikesh', href: 'https://github.com/hulagerushikesh' },
  { Icon: MapPin, label: 'Location', value: 'Pune, India', href: null },
];

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="section-container">
        <AnimatedSection>
          <div className="section-head">
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let&apos;s build something</h2>
            <p className="section-subtitle">
              Have a platform to design, a system to secure, or a role in mind? The fastest
              way to reach me is email.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12}>
          <div className="section-body" style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <Magnetic>
              <a href={MAILTO} className="btn-primary">
                Email me <ArrowUpRight size={18} />
              </a>
            </Magnetic>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div
            className="section-body wide"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
            }}
          >
            {channels.map(({ Icon, label, value, href }) => {
              const inner = (
                <>
                  <div className="channel-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="channel-label">{label}</div>
                    <div className="channel-value">{value}</div>
                  </div>
                </>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="channel-card glow-hover"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="channel-card">
                  {inner}
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
