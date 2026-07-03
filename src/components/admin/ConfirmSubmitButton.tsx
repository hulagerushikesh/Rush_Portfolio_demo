'use client';

import type { ButtonHTMLAttributes } from 'react';

export default function ConfirmSubmitButton({
  children,
  confirmMessage,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { confirmMessage: string }) {
  return (
    <button
      {...rest}
      type="submit"
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
