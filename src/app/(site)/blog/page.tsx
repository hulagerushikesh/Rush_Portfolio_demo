import Link from 'next/link';
import type { Metadata } from 'next';
import { getPublishedBlogPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog | Rushikesh Hulage',
  description: 'Notes on AI/ML, backend engineering, and cloud systems.',
};

// Content edits call revalidatePath, but a build-time Firestore timeout would
// otherwise bake an empty page in until the next deploy. This lets it self-heal.
export const revalidate = 300;

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <main style={{ minHeight: '100vh' }}>
      <div className="section-container" style={{ maxWidth: '860px' }}>
        <span className="section-label">Blog</span>
        <h1 className="section-title">Notes &amp; writing</h1>
        <p className="section-subtitle" style={{ marginBottom: '44px' }}>
          Thoughts on AI/ML, backend systems, and cloud engineering.
        </p>

        <div>
          {posts.map((post, i) => (
            <article className="work-item" key={post.id}>
              <div className="wi-idx">N-{String(i + 1).padStart(2, '0')}</div>
              <div>
                <h2 className="wi-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                {post.excerpt && <p className="wi-desc">{post.excerpt}</p>}
                {post.tags.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {post.tags.map((tag) => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="wi-meta">
                {post.published_at && (
                  <span>
                    {new Date(post.published_at).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                  </span>
                )}
                <Link href={`/blog/${post.slug}`} style={{ color: 'var(--accent-primary)', marginTop: '2px' }}>
                  READ →
                </Link>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-geist-mono)', fontSize: '0.9rem' }}>
              {'// No posts yet — check back soon.'}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
