import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getPublishedProjects } from '@/lib/content';

// Every card reads in the same order: problem, what I built, one measured
// result, one honest trade-off, then links to the proof.
const factRows = [
  { key: 'problem', label: 'Problem' },
  { key: 'built', label: 'What I built' },
  { key: 'result', label: 'Result' },
  { key: 'tradeoff', label: 'Trade-off' },
] as const;

export default async function ProjectsSection() {
  const projects = await getPublishedProjects();

  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="section-container">
        <AnimatedSection>
          <div className="section-head">
            <span className="section-label">Work</span>
            <h2 className="section-title">Selected <em>work</em></h2>
            <p className="section-subtitle">
              Four systems I designed, built and run on my own. Each one is live or published,
              with its results in the open.
            </p>
          </div>
        </AnimatedSection>

        <div className="section-body wide">
          {projects.map((project, i) => {
            const name = project.title.split(' — ')[0];
            return (
              <AnimatedSection key={project.id} delay={0.06 * i}>
                <article className="work-item">
                  <span className="wi-idx">{String(i + 1).padStart(2, '0')}</span>

                  <h3 className="wi-title">
                    <Link href={`/projects/${project.slug}`}>{name}</Link>
                  </h3>
                  <p className="wi-desc">{project.card?.oneLine ?? project.description}</p>

                  {project.card && (
                    <dl className="wi-facts">
                      {factRows.map(({ key, label }) => (
                        <div key={key} className={`wi-fact wi-fact-${key}`}>
                          <dt>{label}</dt>
                          <dd>{project.card![key]}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="wi-meta">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        Live ↗
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        Code ↗
                      </a>
                    )}
                    {project.package_url && (
                      <a href={project.package_url} target="_blank" rel="noopener noreferrer">
                        PyPI ↗
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      style={{ color: 'var(--accent-text)', fontWeight: 600 }}
                    >
                      Case study →
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
