import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getPublishedProjects } from '@/lib/content';

export default async function ProjectsSection() {
  const projects = await getPublishedProjects();

  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container section-grid">
        <aside className="section-rail">
          <span className="rail-idx">01</span>
          <span className="rail-k">Selected</span>
          <span className="rail-k">Work</span>
        </aside>

        <div>
          <AnimatedSection>
            <span className="section-label">Selected Work</span>
            <h2 className="section-title">A catalog of systems</h2>
            <p className="section-subtitle">
              Taken from design through production — search platforms, recommendation
              engines, and the security infrastructure that keeps them online.
            </p>
          </AnimatedSection>

          <div style={{ marginTop: '44px' }}>
            {projects.map((project, i) => {
              const year = project.project_date
                ? new Date(project.project_date).getFullYear()
                : null;
              return (
                <AnimatedSection key={project.id} delay={0.06 * i}>
                  <article className="work-item">
                    <div className="wi-idx">
                      W-{String(i + 1).padStart(2, '0')}
                    </div>

                    <div>
                      <h3 className="wi-title">
                        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                      </h3>
                      <p className="wi-desc">{project.description}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                        {project.technologies.map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="wi-meta">
                      {project.featured && <span className="flag">FEATURED</span>}
                      {project.status === 'coming-soon' && (
                        <span className="flag">IN PROGRESS</span>
                      )}
                      {year && <span>{year}</span>}
                      <div style={{ display: 'flex', gap: '12px', marginTop: '2px' }}>
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            GH ↗
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            LIVE ↗
                          </a>
                        )}
                        <Link href={`/projects/${project.slug}`} style={{ color: 'var(--accent-primary)' }}>
                          READ →
                        </Link>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
            {projects.length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.9rem' }}>
                {'// No projects published yet — check back soon.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
