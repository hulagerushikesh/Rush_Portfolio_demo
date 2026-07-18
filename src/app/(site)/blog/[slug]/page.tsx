import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ReadingProgress from '@/components/ui/ReadingProgress';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { getBlogPostBySlug } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  return {
    title: post ? `${post.title} | Rushikesh Hulage` : 'Blog | Rushikesh Hulage',
    description: post?.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <main style={{ minHeight: '100vh' }}>
      <ReadingProgress />
      <article className="section-container" style={{ maxWidth: '760px' }}>
        <Link
          href="/blog"
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
          Back to Blog
        </Link>

        <AnimatedSection delay={0.05} duration={0.5}>
          <div className="eyebrow" style={{ marginBottom: '14px' }}>
            {post.published_at
              ? `// ${new Date(post.published_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}`
              : '// NOTE'}
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 4.5vw, 2.8rem)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '24px',
              lineHeight: 1.1,
            }}
          >
            {post.title}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.15} duration={0.5}>
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '32px' }}>
              {post.tags.map((tag) => (
                <span key={tag} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="blog-content">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </AnimatedSection>
      </article>
    </main>
  );
}
