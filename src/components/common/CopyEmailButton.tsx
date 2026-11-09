import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyEmailButtonProps {
  email: string;
  className?: string;
  variant?: 'primary' | 'subtle' | 'light';
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({
  email,
  className = '',
  variant = 'primary'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  if (variant === 'primary' || variant === 'light') {
    return (
      <button
        onClick={handleCopy}
        type="button"
        className={`inline-flex items-center gap-2 px-5 py-3 rounded-none font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-150 border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${
          copied
            ? 'bg-emerald-600 text-white border-black dark:border-white'
            : 'bg-white dark:bg-black hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white border-black dark:border-white'
        } ${className}`}
        title="Copy email to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>EMAIL COPIED!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 stroke-[2.5]" />
            <span>COPY EMAIL</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-none font-mono text-xs uppercase font-bold text-black dark:text-white bg-white dark:bg-black hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-black dark:border-white transition-colors ${className}`}
      title="Copy email to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600 dark:text-lime" />
          <span>COPIED</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>COPY</span>
        </>
      )}
    </button>
  );
};
