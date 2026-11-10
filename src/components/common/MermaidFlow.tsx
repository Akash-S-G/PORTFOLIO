import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, X } from 'lucide-react';
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

const mermaidConfig = (theme: string, isSequence: boolean) => ({
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
  /* Flowcharts scale to fit the host; sequence diagrams render at natural pixel
     size (pan instead of squeeze) — width-fitting wide sequences shrinks text. */
  sequence: { useMaxWidth: !isSequence },
});

/* Serialize initialize+render as one atomic unit — concurrent calls on the shared
   mermaid instance can wedge each other. A timeout keeps the queue drainable. */
let queue: Promise<unknown> = Promise.resolve();
let initializedKey: string | null = null;

const renderChart = (mermaid: MermaidModule, id: string, chart: string, theme: string, isSequence: boolean) => {
  const run = queue.then(async () => {
    const key = `${theme}:${isSequence}`;
    if (initializedKey !== key) {
      mermaid.initialize(mermaidConfig(theme, isSequence));
      initializedKey = key;
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
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const activeChart = tabs && tabs.length > 0 ? tabs[Math.min(activeTab, tabs.length - 1)].chart : chart;
  const renderId = tabs && tabs.length > 0 ? `${id}-${activeTab}` : id;
  const isSequence = !!activeChart && activeChart.trimStart().startsWith('sequenceDiagram');

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
        const { svg: rendered } = await withTimeout(renderChart(mermaid, renderId, activeChart, theme, isSequence), 10000);
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
  }, [activeChart, renderId, theme, isSequence]);

  /* Fullscreen lock + Escape handling while the expanded viewer is open */
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [fullscreen]);

  if (failed || !activeChart) return null;

  const tabButtonClass = (active: boolean) =>
    `px-2.5 py-1 rounded-none text-[9px] font-bold uppercase border-2 transition-colors cursor-pointer ${
      active
        ? 'bg-signal text-white border-signal'
        : 'bg-white dark:bg-black text-black dark:text-white border-black dark:border-white hover:bg-cyan hover:text-black hover:border-cyan'
    }`;

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
                  className={tabButtonClass(activeTab === i)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            aria-label="View diagram fullscreen"
            className="sm:hidden inline-flex items-center gap-1 px-2 py-1.5 rounded-none text-[9px] font-bold uppercase border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-cyan hover:text-black hover:border-cyan cursor-pointer"
          >
            <Maximize2 className="w-3 h-3 stroke-[3]" />
            Full
          </button>
          <span className="sm:hidden text-neutral-500 dark:text-neutral-400 normal-case tracking-normal font-medium">
            swipe →
          </span>
        </div>
      </div>
      <div
        className={`mermaid-host overflow-x-auto ${scrollableY ? 'max-h-[460px] overflow-y-auto' : ''}`}
      >
        {isSequence ? (
          <div className="w-max mx-auto p-2">
            <div
              className="[&_svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        ) : (
          <div className="min-w-[720px] sm:min-w-0">
            <div
              className="flex justify-center [&_svg]:w-full [&_svg]:max-w-none [&_svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        )}
      </div>
      {fullscreen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex flex-col bg-white dark:bg-black transition-colors duration-150"
          >
            <div className="shrink-0 border-b-2 border-black dark:border-white px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[10px] font-mono text-black dark:text-white uppercase tracking-wider font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-none bg-signal inline-block" />
                  Architecture Diagram
                </div>
                <button
                  type="button"
                  onClick={() => setFullscreen(false)}
                  aria-label="Close fullscreen diagram"
                  className="inline-flex items-center justify-center w-11 h-11 -mr-1 rounded-none border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-cyan hover:text-black hover:border-cyan cursor-pointer"
                >
                  <X className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
              {tabs && tabs.length > 1 && (
                <div className="flex items-center gap-1 mt-2 flex-wrap">
                  {tabs.map((tab, i) => (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => setActiveTab(i)}
                      aria-pressed={activeTab === i}
                      className={tabButtonClass(activeTab === i)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div
              className="flex-1 overflow-auto"
              style={{ touchAction: 'pan-x pan-y pinch-zoom' }}
            >
              {isSequence ? (
                <div className="w-max mx-auto p-4">
                  <div
                    className="[&_svg]:h-auto"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                </div>
              ) : (
                <div className="min-w-[900px] min-h-full p-4">
                  <div
                    className="flex justify-center [&_svg]:w-full [&_svg]:max-w-none [&_svg]:h-auto"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
