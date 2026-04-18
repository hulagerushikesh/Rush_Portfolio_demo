'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import GradientText from '@/components/ui/GradientText';
import { getAllProjects } from '@/utils/data';

export default function ProjectsSection() {
  const projects = getAllProjects();

  return (
    <section id="projects">
      <div className="section-container">
        <AnimatedSection>
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            What I&apos;ve <GradientText>built</GradientText>
          </h2>
          <p className="section-subtitle">
            A showcase of projects spanning AI/ML, cloud platforms, and full-stack engineering.
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
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: '#fbbf24',
                      background: 'rgba(251, 191, 36, 0.1)',
                      border: '1px solid rgba(251, 191, 36, 0.2)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
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
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--accent-tertiary)',
                      background: 'rgba(99, 102, 241, 0.1)',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    ⭐ Featured
                  </div>
                )}

                {/* Project icon */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background:
                      'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
                    border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '20px',
                    marginTop: project.featured || project.status === 'coming-soon' ? '20px' : '0',
                  }}
                >
                  🚀
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
                  {project.title}
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
                    marginTop: 'auto',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    >
                      ⌨️ Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    >
                      <span>🔗 Live Demo</span>
                    </a>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
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
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
