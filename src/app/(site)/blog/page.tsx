import Link from 'next/link';
import type { Metadata } from 'next';
import GradientText from '@/components/ui/GradientText';
import { getPublishedBlogPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog | Rushikesh Hulage',
  description: 'Notes on AI/ML, backend engineering, and cloud systems.',
};

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main style={{ minHeight: '100vh' }}>
      <div className="section-container">
        <span className="section-label">Blog</span>
        <h1 className="section-title">
          Notes &amp; <GradientText>writing</GradientText>
        </h1>
        <p className="section-subtitle" style={{ marginBottom: '48px' }}>
          Thoughts on AI/ML, backend systems, and cloud engineering.
        </p>

        <div style={{ display: 'grid', gap: '20px' }}>
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="glass-card"
              style={{ padding: '28px', textDecoration: 'none', display: 'block' }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {post.title}
              </h2>
              {post.excerpt && (
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '12px' }}>
                  {post.excerpt}
                </p>
              )}
              {post.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
          {posts.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No posts yet — check back soon.</p>}
        </div>
      </div>
    </main>
  );
}
