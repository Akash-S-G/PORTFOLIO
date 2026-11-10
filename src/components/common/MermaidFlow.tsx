import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface MermaidFlowProps {
  chart: string;
  id: string;
}

/**
 * Renders a Mermaid flowchart definition as SVG.
 * Mermaid is dynamically imported so it lives in its own lazy chunk.
 * Re-renders whenever the site theme flips (dark/light tokens).
 */
export const MermaidFlow: React.FC<MermaidFlowProps> = ({ chart, id }) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [failed, setFailed] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'base',
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
          flowchart: { curve: 'linear', htmlLabels: true, padding: 8 },
        });
        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, chart);
        if (!cancelled) setSvg(rendered);
      } catch (e) {
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
    <div className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black p-4 overflow-x-auto transition-colors duration-150">
      <div className="text-[10px] font-mono text-black dark:text-white uppercase tracking-wider mb-3 font-bold flex items-center gap-2">
        <span className="w-2 h-2 rounded-none bg-signal inline-block" />
        Mermaid Architecture Graph
      </div>
      <div
        ref={containerRef}
        className="mermaid-host flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
};
