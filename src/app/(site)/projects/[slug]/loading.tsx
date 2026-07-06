import Skeleton from '@/components/ui/Skeleton';

export default function ProjectDetailLoading() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <article className="section-container" style={{ maxWidth: '760px' }}>
        <Skeleton width="140px" height="34px" radius="var(--radius-full)" style={{ marginBottom: '32px' }} />
        <Skeleton width="90px" height="13px" style={{ marginBottom: '16px' }} />
        <Skeleton width="80%" height="38px" style={{ marginBottom: '12px' }} />
        <Skeleton width="55%" height="38px" style={{ marginBottom: '24px' }} />
        <Skeleton width="100%" height="15px" style={{ marginBottom: '10px' }} />
        <Skeleton width="92%" height="15px" style={{ marginBottom: '28px' }} />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {[72, 56, 88, 64].map((w, i) => (
            <Skeleton key={i} width={`${w}px`} height="24px" radius="var(--radius-full)" />
          ))}
        </div>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} width={i === 4 ? '60%' : '100%'} height="14px" style={{ marginBottom: '12px' }} />
        ))}
      </article>
    </main>
  );
}
