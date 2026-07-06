import Skeleton from '@/components/ui/Skeleton';

export default function BlogPostLoading() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <article className="section-container" style={{ maxWidth: '760px' }}>
        <Skeleton width="120px" height="34px" radius="var(--radius-full)" style={{ marginBottom: '32px' }} />
        <Skeleton width="110px" height="13px" style={{ marginBottom: '16px' }} />
        <Skeleton width="85%" height="38px" style={{ marginBottom: '12px' }} />
        <Skeleton width="50%" height="38px" style={{ marginBottom: '28px' }} />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {[64, 80].map((w, i) => (
            <Skeleton key={i} width={`${w}px`} height="24px" radius="var(--radius-full)" />
          ))}
        </div>
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} width={i % 3 === 2 ? '75%' : '100%'} height="14px" style={{ marginBottom: '12px' }} />
        ))}
      </article>
    </main>
  );
}
