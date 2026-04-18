'use client';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
}

export default function GradientText({
  children,
  className = '',
  as: Tag = 'span',
}: GradientTextProps) {
  return <Tag className={`gradient-text ${className}`}>{children}</Tag>;
}
