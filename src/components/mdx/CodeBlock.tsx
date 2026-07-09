'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { DURATION, SPRING } from '@/lib/motion';

/**
 * Replaces `pre` in rendered MDX: same code block, plus a copy button with
 * a spring checkmark confirmation.
 */
export default function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions/insecure context) — do nothing.
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <pre ref={preRef} {...props} />
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="code-copy-btn"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="check"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={SPRING.snappy}
              style={{ display: 'inline-flex', color: 'var(--accent-success)' }}
            >
              <Check size={14} strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: DURATION.fast }}
              style={{ display: 'inline-flex' }}
            >
              <Copy size={14} strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
