import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getPublishedProjects } from '@/lib/content';

export default async function ProjectsSection() {
  const projects = await getPublishedProjects();

  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <AnimatedSection>
          <div className="section-head">
            <span className="section-label">Selected Work</span>
            <h2 className="section-title">A catalog of <em>systems</em></h2>
            <p className="section-subtitle">
              Taken from design through production — search platforms, recommendation
              engines, and the security infrastructure that keeps them online.
            </p>
          </div>
        </AnimatedSection>

        <div className="section-body">
          {projects.map((project, i) => {
            const year = project.project_date
              ? new Date(project.project_date).getFullYear()
              : null;
            return (
              <AnimatedSection key={project.id} delay={0.06 * i}>
                <article className="work-item">
                  <span className="wi-idx">{String(i + 1).padStart(2, '0')}</span>

                  <h3 className="wi-title">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="wi-desc">{project.description}</p>

                  <div className="wi-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="wi-meta">
                    {project.featured && <span className="flag">FEATURED</span>}
                    {project.status === 'coming-soon' && (
                      <span className="flag">IN PROGRESS</span>
                    )}
                    {year && <span>{year}</span>}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        GitHub ↗
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        Live ↗
                      </a>
                    )}
                    <Link href={`/projects/${project.slug}`} style={{ color: 'var(--accent-text)', fontWeight: 600 }}>
                      Read →
                    </Link>
                  </div>
                </article>
              </AnimatedSection>
            );
          })}
          {projects.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', textAlign: 'center' }}>
              No projects published yet — check back soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
