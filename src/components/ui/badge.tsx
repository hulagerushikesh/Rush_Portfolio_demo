import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// shadcn-style Badge, themed via Engineering Log tokens.
const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--radius-sm)] border px-2.5 py-0.5 text-xs font-mono font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]',
        accent:
          'border-[var(--border-accent)] bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] text-[var(--accent-primary)]',
        outline: 'border-[var(--border-strong)] text-[var(--text-secondary)]',
        muted: 'border-transparent bg-[var(--bg-tertiary)] text-[var(--text-muted)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
