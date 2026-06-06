'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SelectorConversionResult } from '@/utils/tailwindMapper';

interface PreviewPanelProps {
  htmlInput: string;
  onHtmlChange: (val: string) => void;
  conversionResults: SelectorConversionResult[];
  isTailwindToCssMode: boolean; // Reverse conversion indicator
  tailwindClassesInput?: string; // The Tailwind class list if in reverse mode
}

export default function PreviewPanel({
  htmlInput,
  onHtmlChange,
  conversionResults,
  isTailwindToCssMode,
  tailwindClassesInput = ''
}: PreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
  const [isDark, setIsDark] = useState(false);

  // Sync dark mode state with document.documentElement
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const syncTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    // Defer initial setup to prevent synchronous cascading renders during React effect mount phase
    const animFrameId = requestAnimationFrame(syncTheme);

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => {
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
    };
  }, []);

  // Generate the processed HTML string that swaps CSS selectors for Tailwind classes
  const getProcessedHtml = useCallback((): string => {
    if (!htmlInput) return '<div className="text-slate-400 text-xs">No HTML provided</div>';

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, 'text/html');

      if (isTailwindToCssMode) {
        // Reverse mode: apply tailwindClassesInput directly to the root element in the HTML
        const root = doc.body.firstElementChild;
        if (root) {
          // Merge existing classes with the input Tailwind classes
          const existing = root.getAttribute('class') || '';
          root.setAttribute('class', `${existing} ${tailwindClassesInput}`.trim());
        }
      } else {
        // Forward mode: Apply converted classes for each selector
        for (const result of conversionResults) {
          const selector = result.selector.trim();
          if (!selector) continue;

          // Simple check for class selector (e.g. .btn-primary)
          if (selector.startsWith('.')) {
            const className = selector.substring(1);
            const elements = doc.querySelectorAll(selector);
            elements.forEach((el) => {
              // Get current classes, remove the old CSS class to avoid name collision, and append Tailwind classes
              const currentClasses = (el.getAttribute('class') || '')
                .split(/\s+/)
                .filter(c => c !== className && c !== '');
              
              const tailwindClasses = result.tailwindClasses.split(/\s+/);
              const merged = Array.from(new Set([...currentClasses, ...tailwindClasses])).join(' ');
              
              el.setAttribute('class', merged);
            });
          } else {
            // Tag selectors or other selectors (e.g. "button", "div")
            try {
              const elements = doc.querySelectorAll(selector);
              elements.forEach((el) => {
                const currentClasses = (el.getAttribute('class') || '').split(/\s+/).filter(Boolean);
                const tailwindClasses = result.tailwindClasses.split(/\s+/);
                const merged = Array.from(new Set([...currentClasses, ...tailwindClasses])).join(' ');
                el.setAttribute('class', merged);
              });
            } catch {
              // Ignore invalid query selectors
            }
          }
        }
      }

      return doc.body.innerHTML;
    } catch {
      return htmlInput;
    }
  }, [htmlInput, isTailwindToCssMode, tailwindClassesInput, conversionResults]);

  const processedHtml = getProcessedHtml();

  // Memoize iframe document string to avoid re-renders and cascading render loops
  const srcDoc = useMemo(() => {
    if (activeTab !== 'preview') return '';

    const bgThemeColor = isDark ? '#0f172a' : '#f8fafc';
    const textThemeColor = isDark ? '#f8fafc' : '#0f172a';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.5">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            margin: 0;
            padding: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 64px);
            background-color: ${bgThemeColor};
            color: ${textThemeColor};
            font-family: system-ui, -apple-system, sans-serif;
            transition: background-color 0.2s ease, color 0.2s ease;
          }
        </style>
        <script>
          tailwind.config = {
            darkMode: 'class'
          }
        </script>
      </head>
      <body class="${isDark ? 'dark' : ''}">
        <div id="preview-root">${processedHtml}</div>
      </body>
      </html>
    `;
  }, [processedHtml, activeTab, isDark]);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm overflow-hidden transition-colors duration-300">
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-4 border-b border-[var(--border-color)] bg-slate-50 dark:bg-slate-900/30 h-12">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-tight transition-colors ${
              activeTab === 'preview'
                ? 'bg-blue-500 text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
            }`}
          >
            UI Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-tight transition-colors ${
              activeTab === 'html'
                ? 'bg-blue-500 text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
            }`}
          >
            HTML Skeleton
          </button>
        </div>

        <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">
          {activeTab === 'preview' ? 'Live Preview' : 'Interactive Sandbox'}
        </span>
      </div>

      {/* Workspace Area */}
      <div className="flex-1 min-h-[300px] relative">
        {activeTab === 'html' ? (
          <div className="absolute inset-0 p-4">
            <textarea
              value={htmlInput}
              onChange={(e) => onHtmlChange(e.target.value)}
              placeholder="<!-- Paste your HTML skeleton here -->&#10;<button class=&quot;btn-primary&quot;>Click me</button>"
              className="w-full h-full p-4 code-textarea text-xs bg-[var(--background)] border border-[var(--border-color)] rounded-xl focus:border-blue-500 focus:outline-none resize-none text-[var(--foreground)] placeholder-slate-400 leading-relaxed font-mono"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center p-4">
            <iframe
              sandbox="allow-scripts allow-same-origin"
              srcDoc={srcDoc}
              className="w-full h-full rounded-xl border border-[var(--border-color)] bg-[var(--background)] shadow-inner transition-colors duration-300"
              title="Tailwind Render Sandbox"
            />
          </div>
        )}
      </div>
    </div>
  );
}
