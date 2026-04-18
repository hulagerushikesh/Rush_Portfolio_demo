'use client';

export default function ParticleBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* Large gradient orbs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'floatSlow 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'floatSlow 10s ease-in-out infinite',
          animationDelay: '-3s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '40%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'floatSlow 12s ease-in-out infinite',
          animationDelay: '-6s',
        }}
      />

      {/* Small floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${4 + i * 2}px`,
            height: `${4 + i * 2}px`,
            borderRadius: '50%',
            background: `rgba(${99 + i * 10}, ${102 + i * 5}, 241, ${0.3 - i * 0.03})`,
            top: `${15 + i * 14}%`,
            left: `${10 + i * 15}%`,
            animation: `float ${5 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * -1.2}s`,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />
    </div>
  );
}
