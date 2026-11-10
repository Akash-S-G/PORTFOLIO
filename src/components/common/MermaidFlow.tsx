import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface MermaidFlowProps {
  chart: string;
  id: string;
}

type MermaidModule = typeof import('mermaid').default;

const mermaidConfig = (theme: string) => ({
  startOnLoad: false,
  securityLevel: 'loose' as const,
  theme: 'base' as const,
  fontFamily: '"IBM Plex Mono", ui-monospace, monospace',
  themeVariables: {
    darkMode: theme === 'dark',
    background: theme === 'dark' ? '#181715' : '#FAF7F1',
    primaryColor: theme === 'dark' ? '#262421' : '#F0EDE6',
    primaryTextColor: theme === 'dark' ? '#FAF7F1' : '#181715',
    primaryBorderColor: theme === 'dark' ? '#FAF7F1' : '#181715',
    lineColor: theme === 'dark' ? '#FAF7F1' : '#181715',
    secondaryColor: '#FF4D00',
    tertiaryColor: theme === 'dark' ? '#262421' : '#F0EDE6',
    clusterBkg: theme === 'dark' ? '#181715' : '#FAF7F1',
    clusterBorder: theme === 'dark' ? '#FAF7F1' : '#181715',
    edgeLabelBackground: theme === 'dark' ? '#181715' : '#FAF7F1',
    fontSize: '13px',
  },
  flowchart: { curve: 'linear' as const, htmlLabels: true, padding: 8 },
});

/* Serialize initialize+render as one atomic unit — concurrent calls on the shared
   mermaid instance can wedge each other. A timeout keeps the queue drainable. */
let queue: Promise<unknown> = Promise.resolve();
let initializedTheme: string | null = null;

const renderChart = (mermaid: MermaidModule, id: string, chart: string, theme: string) => {
  const run = queue.then(async () => {
    if (initializedTheme !== theme) {
      mermaid.initialize(mermaidConfig(theme));
      initializedTheme = theme;
    }
    return mermaid.render(`mermaid-${id}`, chart);
  });
  queue = run.catch(() => {});
  return run;
};

const withTimeout = <T,>(p: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    p,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('mermaid render timeout')), ms)),
  ]);

/**
 * Renders a flowchart definition as SVG, fitted to the card width with
 * horizontal scrolling for wide diagrams. Mermaid is dynamically imported so
 * its heavy deps stay lazy-loaded chunks.
 */
export const MermaidFlow: React.FC<MermaidFlowProps> = ({ chart, id }) => {
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string>('');
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        const { svg: rendered } = await withTimeout(renderChart(mermaid, id, chart, theme), 10000);
        if (!cancelled) setSvg(rendered);
      } catch (e) {
        console.warn(`Diagram render failed for "${id}":`, e);
        if (!cancelled) setFailed(true);
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, theme]);

  if (failed) return null;

  return (
    <div className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black p-4 transition-colors duration-150">
      <div className="text-[10px] font-mono text-black dark:text-white uppercase tracking-wider mb-3 font-bold flex items-center gap-2">
        <span className="w-2 h-2 rounded-none bg-signal inline-block" />
        Architecture Diagram
      </div>
      <div
        className="mermaid-host flex justify-center overflow-x-auto [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
};
