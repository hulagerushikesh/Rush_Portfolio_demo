import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { getPublishedProjectBySlug } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  return {
    title: project ? `${project.title} | Rushikesh Hulage` : 'Project | Rushikesh Hulage',
    description: project?.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main style={{ minHeight: '100vh' }}>
      <article className="section-container" style={{ maxWidth: '760px' }}>
        <Link
          href="/#projects"
          className="btn-secondary"
          style={{
            padding: '8px 16px',
            fontSize: '0.85rem',
            marginBottom: '32px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.75} />
          Back to Projects
        </Link>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          {project.project_date}
        </div>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: '24px',
          }}
        >
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '32px' }}>
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {(project.github_url || project.live_url) && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
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
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              >
                <ExternalLink size={16} strokeWidth={1.75} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}

        {project.content && (
          <div className="blog-content">
            <MDXRemote source={project.content} />
          </div>
        )}
      </article>
    </main>
  );
}
