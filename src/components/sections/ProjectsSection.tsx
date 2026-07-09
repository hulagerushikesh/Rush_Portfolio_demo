import Link from 'next/link';
import { Star, Clock, Rocket, ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import TiltCard from '@/components/ui/TiltCard';
import { getPublishedProjects } from '@/lib/content';

export default async function ProjectsSection() {
  const projects = await getPublishedProjects();

  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <AnimatedSection>
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            What I&apos;ve <GradientText>built</GradientText>
          </h2>
          <p className="section-subtitle">
            Selected work across AI/ML, cloud infrastructure, and full-stack engineering.
          </p>
        </AnimatedSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            marginTop: '48px',
          }}
        >
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={0.15 * i} variant="scaleIn">
              <TiltCard>
              <div
                className="glass-card gradient-border"
                style={{
                  padding: '32px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Status badge */}
                {project.status === 'coming-soon' && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '4px 12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--accent-secondary)',
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    <Clock size={12} strokeWidth={2} />
                    Coming Soon
                  </div>
                )}

                {project.featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '4px 12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--accent-tertiary)',
                      background: 'rgba(217, 119, 6, 0.1)',
                      border: '1px solid rgba(217, 119, 6, 0.2)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    <Star size={12} strokeWidth={2} />
                    Featured
                  </div>
                )}

                {/* Project icon */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background:
                      'linear-gradient(135deg, rgba(217,119,6,0.15), rgba(245,158,11,0.15))',
                    border: '1px solid rgba(217,119,6,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    marginBottom: '20px',
                    marginTop: project.featured || project.status === 'coming-soon' ? '20px' : '0',
                  }}
                >
                  <Rocket size={24} strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {project.title}
                  </Link>
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                {/* Technologies */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px',
                  }}
                >
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    >
                      <GithubIcon size={16} />
                      Code
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    >
                      <ExternalLink size={16} strokeWidth={1.75} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {!project.github_url && !project.live_url && (
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        fontStyle: 'italic',
                      }}
                    >
                      Links coming soon...
                    </span>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginLeft: 'auto',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                    }}
                  >
                    Details
                    <ArrowRight size={14} strokeWidth={1.75} />
                  </Link>
                </div>
              </div>
              </TiltCard>
            </AnimatedSection>
          ))}
          {projects.length === 0 && (
            <p style={{ color: 'var(--text-muted)' }}>No projects published yet — check back soon.</p>
          )}
        </div>
      </div>
    </section>
  );
}
