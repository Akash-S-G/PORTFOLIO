import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface MermaidDiagramTab {
  label: string;
  chart: string;
}

interface MermaidFlowProps {
  chart?: string;
  id: string;
  /** Toggleable diagrams — renders label tabs above the graph when provided */
  tabs?: MermaidDiagramTab[];
  /** Clamps height with vertical scrolling (for diagrams embedded in compact panels) */
  scrollableY?: boolean;
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
/* While the theme View Transition is running, the main thread must stay free —
   defer mermaid re-renders (heavy JS) until the crossfade/reveal completes. */
const waitForThemeTransition = async () => {
  const root = document.documentElement;
  if (!root.classList.contains('vt-active')) return;
  await new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        observer.disconnect();
        clearTimeout(timer);
        resolve();
      }
    };
    const observer = new MutationObserver(() => {
      if (!root.classList.contains('vt-active')) finish();
    });
    const timer = setTimeout(finish, 1600);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
  });
};

export const MermaidFlow: React.FC<MermaidFlowProps> = ({ chart, id, tabs, scrollableY }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [svg, setSvg] = useState<string>('');
  const [failed, setFailed] = useState<boolean>(false);
  const activeChart = tabs && tabs.length > 0 ? tabs[Math.min(activeTab, tabs.length - 1)].chart : chart;
  const renderId = tabs && tabs.length > 0 ? `${id}-${activeTab}` : id;

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      if (!activeChart) {
        if (!cancelled) setFailed(true);
        return;
      }
      try {
        await waitForThemeTransition();
        if (cancelled) return;
        const mermaid = (await import('mermaid')).default;
        const { svg: rendered } = await withTimeout(renderChart(mermaid, renderId, activeChart, theme), 10000);
        if (!cancelled) setSvg(rendered);
      } catch (e) {
        console.warn(`Diagram render failed for "${renderId}":`, e);
        if (!cancelled) setFailed(true);
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [activeChart, renderId, theme]);

  if (failed || !activeChart) return null;

  return (
    <div className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black p-4 transition-colors duration-150">
      <div className="text-[10px] font-mono text-black dark:text-white uppercase tracking-wider mb-3 font-bold flex items-center justify-between gap-2 flex-wrap">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-none bg-signal inline-block" />
          Architecture Diagram
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {tabs && tabs.length > 1 && (
            <div className="flex items-center gap-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  aria-pressed={activeTab === i}
                  className={`px-2.5 py-1 rounded-none text-[9px] font-bold uppercase border-2 transition-colors cursor-pointer ${
                    activeTab === i
                      ? 'bg-signal text-white border-signal'
                      : 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-signal hover:text-white hover:border-signal'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
          <span className="sm:hidden text-neutral-500 dark:text-neutral-400 normal-case tracking-normal font-medium">
            swipe →
          </span>
        </div>
      </div>
      <div
        className={`mermaid-host overflow-x-auto ${scrollableY ? 'max-h-[460px] overflow-y-auto' : ''}`}
      >
        <div className="min-w-[720px] sm:min-w-0">
          <div
            className="flex justify-center [&_svg]:w-full [&_svg]:max-w-none [&_svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      </div>
    </div>
  );
};
