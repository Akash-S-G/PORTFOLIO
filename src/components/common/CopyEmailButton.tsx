import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyEmailButtonProps {
  email: string;
  className?: string;
  variant?: 'primary' | 'subtle';
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({
  email,
  className = '',
  variant = 'subtle'
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

  if (variant === 'primary') {
    return (
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wide transition-all duration-200 border ${
          copied
            ? 'bg-lime text-graphite-950 border-lime shadow-[0_0_16px_rgba(197,243,107,0.3)]'
            : 'bg-graphite-850 hover:bg-graphite-800 text-ivory border-graphite-700 hover:border-lime/60'
        } ${className}`}
        title="Copy email to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-graphite-950 stroke-[2.5]" />
            <span>EMAIL COPIED</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-lime" />
            <span>COPY EMAIL</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] text-ivory-dim hover:text-ivory bg-graphite-850/80 hover:bg-graphite-800 border border-graphite-700/60 hover:border-graphite-600 transition-all ${className}`}
      title="Copy email to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-lime" />
          <span className="text-lime font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-ivory-muted" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};
