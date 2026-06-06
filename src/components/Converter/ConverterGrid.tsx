/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect } from 'react';
import { parseCSS } from '@/utils/cssParser';
import { convertCssToTailwind, SelectorConversionResult, defaultConfig, TailwindMapperConfig } from '@/utils/tailwindMapper';
import { convertTailwindToCss, formatCssBlocks } from '@/utils/tailwindToCss';
import { examples } from '@/utils/examples';
import ConfigCustomizer from './ConfigCustomizer';
import PopularConversions from './PopularConversions';
import PreviewPanel from './PreviewPanel';
import ExplanationMode from './ExplanationMode';
import AdPlaceholder from '../Common/AdPlaceholder';

// Base64 encoding/decoding utilities that handle Unicode characters safely
function encodeBase64(str: string): string {
  try {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  } catch {
    return btoa(str);
  }
}

function decodeBase64(str: string): string {
  try {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch {
    return btobFallback(str);
  }
}

// Fallback helper to btoa/atob for basic ascii decoding
function btobFallback(str: string): string {
  try {
    return atob(str);
  } catch {
    return '';
  }
}

interface ConverterGridProps {
  initialCss?: string;
  initialTailwind?: string;
  initialHtml?: string;
  initialMode?: 'css-to-tailwind' | 'tailwind-to-css';
  initialExampleId?: string;
}

export default function ConverterGrid({
  initialCss,
  initialTailwind,
  initialHtml,
  initialMode = 'css-to-tailwind',
  initialExampleId
}: ConverterGridProps = {}) {
  // Converter States
  const [mode, setMode] = useState<'css-to-tailwind' | 'tailwind-to-css'>(initialMode);
  const [cssInput, setCssInput] = useState(initialCss ?? '');
  const [tailwindInput, setTailwindInput] = useState(initialTailwind ?? '');
  const [htmlInput, setHtmlInput] = useState(initialHtml ?? '');
  const [mapperConfig, setMapperConfig] = useState<TailwindMapperConfig>(defaultConfig);
  const [selectedExampleId, setSelectedExampleId] = useState<string | undefined>(initialExampleId);
  
  // UI States
  const [showShareToast, setShowShareToast] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [activeResults, setActiveResults] = useState<SelectorConversionResult[]>([]);
  const [cssOutputFromTailwind, setCssOutputFromTailwind] = useState('');

  // Initial load: parse default example or parse query params
  useEffect(() => {
    // Check url search params first
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code');
    const modeParam = params.get('mode');
    const htmlParam = params.get('html');

    if (codeParam) {
      try {
        const decodedCode = decodeBase64(codeParam);
        const decodedHtml = htmlParam ? decodeBase64(htmlParam) : '';
        
        if (modeParam === 'tailwind-to-css') {
          setMode('tailwind-to-css');
          setTailwindInput(decodedCode);
          setCssInput('');
        } else {
          setMode('css-to-tailwind');
          setCssInput(decodedCode);
          setTailwindInput('');
        }
        
        setHtmlInput(decodedHtml);
        setSelectedExampleId(undefined); // user custom code
        return;
      } catch {
        // ignore decoding errors, fall back to default example or props
      }
    }

    if (initialCss !== undefined || initialTailwind !== undefined || initialHtml !== undefined) {
      setMode(initialMode);
      setCssInput(initialCss ?? '');
      setTailwindInput(initialTailwind ?? '');
      setHtmlInput(initialHtml ?? '');
      setSelectedExampleId(initialExampleId);
      return;
    }

    // Default to the first example (Modern Button)
    const defaultExample = examples[0];
    setCssInput(defaultExample.css);
    setHtmlInput(defaultExample.html);
    setSelectedExampleId(defaultExample.id);
  }, [initialCss, initialTailwind, initialHtml, initialMode, initialExampleId]);

  // Run CSS -> Tailwind mapping dynamically
  useEffect(() => {
    if (mode !== 'css-to-tailwind') return;
    
    if (!cssInput.trim()) {
      if (activeResults.length > 0) {
        setActiveResults([]);
      }
      return;
    }

    try {
      const parsedRules = parseCSS(cssInput);
      const results = convertCssToTailwind(parsedRules, mapperConfig);
      setActiveResults(results);
    } catch {
      // recovery on malformed CSS input
    }
  }, [cssInput, mapperConfig, mode, activeResults.length]);

  // Run Tailwind -> CSS reverse mapping dynamically
  useEffect(() => {
    if (mode !== 'tailwind-to-css') return;

    if (!tailwindInput.trim()) {
      if (cssOutputFromTailwind !== '') {
        setCssOutputFromTailwind('');
      }
      return;
    }

    try {
      const blocks = convertTailwindToCss(tailwindInput);
      const formattedCss = formatCssBlocks(blocks);
      setCssOutputFromTailwind(formattedCss);
    } catch {
      // recovery on malformed classes
    }
  }, [tailwindInput, mode, cssOutputFromTailwind]);

  // Handle template selection
  const handleExampleSelect = (css: string, html: string) => {
    const ex = examples.find(e => e.css === css && e.html === html);
    setSelectedExampleId(ex?.id);
    
    if (mode === 'css-to-tailwind') {
      setCssInput(css);
      setTailwindInput('');
    } else {
      // For reverse mode, convert the CSS of the example into tailwind to test it
      const parsed = parseCSS(css);
      const converted = convertCssToTailwind(parsed, mapperConfig);
      const allClassString = converted.map(c => c.tailwindClasses).join(' ');
      setTailwindInput(allClassString);
      setCssInput('');
    }
    setHtmlInput(html);
  };

  // Switch conversion direction
  const handleModeToggle = (targetMode: 'css-to-tailwind' | 'tailwind-to-css') => {
    if (targetMode === mode) return;
    setMode(targetMode);
    setSelectedExampleId(undefined); // clear active templates

    if (targetMode === 'tailwind-to-css') {
      // Map current active classes to tailwind input
      const classesString = activeResults.map(r => r.tailwindClasses).join(' ').trim();
      setTailwindInput(classesString || 'flex flex-col items-center p-6 bg-white rounded-lg');
      setCssInput('');
    } else {
      // Map current CSS output back to CSS input
      setCssInput(cssOutputFromTailwind || `.element {\n  display: flex;\n  flex-direction: column;\n}`);
      setTailwindInput('');
    }
  };

  // Copy output to clipboard
  const handleCopyToClipboard = () => {
    let copyText = '';
    if (mode === 'css-to-tailwind') {
      // If there's only one default 'element' selector, copy classes directly
      if (activeResults.length === 1 && activeResults[0].selector === 'element') {
        copyText = activeResults[0].tailwindClasses;
      } else {
        // Otherwise format as selector classes
        copyText = activeResults
          .map(r => `/* ${r.selector} */\nclass="${r.tailwindClasses}"`)
          .join('\n\n');
      }
    } else {
      copyText = cssOutputFromTailwind;
    }

    if (!copyText) return;

    navigator.clipboard.writeText(copyText).then(() => {
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    });
  };

  // Generate shareable URL
  const handleShareConversion = () => {
    const code = mode === 'css-to-tailwind' ? cssInput : tailwindInput;
    const encodedCode = encodeBase64(code);
    const encodedHtml = encodeBase64(htmlInput);

    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encodedCode}&mode=${mode}&html=${encodedHtml}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    });
  };

  // Export files
  const handleExportFile = () => {
    const code = mode === 'css-to-tailwind' 
      ? (activeResults.length === 1 && activeResults[0].selector === 'element' 
          ? activeResults[0].tailwindClasses 
          : JSON.stringify(activeResults, null, 2))
      : cssOutputFromTailwind;

    const extension = mode === 'css-to-tailwind' ? 'txt' : 'css';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `tailwind-conversion.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Clear workspace
  const handleClearWorkspace = () => {
    setCssInput('');
    setTailwindInput('');
    setHtmlInput('');
    setSelectedExampleId(undefined);
    setActiveResults([]);
    setCssOutputFromTailwind('');
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Conversion Direction Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-900/60 p-1 border border-[var(--border-color)]">
          <button
            onClick={() => handleModeToggle('css-to-tailwind')}
            type="button"
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              mode === 'css-to-tailwind'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
            }`}
          >
            CSS → Tailwind CSS
          </button>
          <button
            onClick={() => handleModeToggle('tailwind-to-css')}
            type="button"
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              mode === 'tailwind-to-css'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--foreground)]'
            }`}
          >
            Tailwind CSS → CSS (Reverse Mode)
          </button>
        </div>
      </div>

      {/* Main Grid workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Inputs */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm overflow-hidden transition-colors duration-300">
            {/* Input Header */}
            <div className="flex items-center justify-between px-4 border-b border-[var(--border-color)] bg-slate-50 dark:bg-slate-900/30 h-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                {mode === 'css-to-tailwind' ? 'Input Raw CSS' : 'Input Tailwind Classes'}
              </span>
              <button
                onClick={handleClearWorkspace}
                type="button"
                className="text-[10px] text-red-500 hover:underline font-semibold"
              >
                Clear Workspace
              </button>
            </div>

            {/* Input Text Area */}
            <div className="p-4 h-[320px] relative">
              {mode === 'css-to-tailwind' ? (
                <textarea
                  value={cssInput}
                  onChange={(e) => {
                    setCssInput(e.target.value);
                    setSelectedExampleId(undefined);
                  }}
                  placeholder="/* Paste your CSS here */&#10;.card {&#10;  padding: 16px;&#10;  background-color: rgb(59, 130, 246);&#10;  border-radius: 8px;&#10;}"
                  className="w-full h-full p-4 code-textarea text-xs bg-[var(--background)] border border-[var(--border-color)] rounded-xl focus:border-blue-500 focus:outline-none resize-none font-mono text-[var(--foreground)] placeholder-slate-400 leading-relaxed"
                />
              ) : (
                <textarea
                  value={tailwindInput}
                  onChange={(e) => {
                    setTailwindInput(e.target.value);
                    setSelectedExampleId(undefined);
                  }}
                  placeholder="<!-- Paste your Tailwind utility class list here -->&#10;flex flex-col p-4 bg-blue-500 rounded-lg hover:bg-blue-600 md:flex-row shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                  className="w-full h-full p-4 code-textarea text-xs bg-[var(--background)] border border-[var(--border-color)] rounded-xl focus:border-blue-500 focus:outline-none resize-none font-mono text-[var(--foreground)] placeholder-slate-400 leading-relaxed"
                />
              )}
            </div>
          </div>
          
          {/* Settings Customizer */}
          <ConfigCustomizer config={mapperConfig} onChange={setMapperConfig} />
        </div>

        {/* Right Side: Outputs */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm overflow-hidden transition-colors duration-300">
            {/* Output Header */}
            <div className="flex items-center justify-between px-4 border-b border-[var(--border-color)] bg-slate-50 dark:bg-slate-900/30 h-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                {mode === 'css-to-tailwind' ? 'Converted Tailwind Output' : 'Converted CSS Output'}
              </span>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleCopyToClipboard}
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-2.5 py-1 text-[10px] font-semibold tracking-tight transition-colors"
                >
                  Copy Code
                </button>
                <button
                  onClick={handleExportFile}
                  type="button"
                  className="border border-[var(--border-color)] hover:bg-slate-100 dark:hover:bg-slate-800 text-[var(--foreground)] rounded-lg px-2.5 py-1 text-[10px] font-semibold tracking-tight transition-colors"
                >
                  Export
                </button>
              </div>
            </div>

            {/* Output Display box */}
            <div className="p-4 h-[320px] relative">
              <div className="w-full h-full p-4 overflow-y-auto bg-[var(--background)] border border-[var(--border-color)] rounded-xl font-mono text-xs text-[var(--foreground)]">
                {mode === 'css-to-tailwind' ? (
                  activeResults.length > 0 ? (
                    activeResults.length === 1 && activeResults[0].selector === 'element' ? (
                      // Display inline class list directly
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 block border-b border-[var(--border-color)] pb-1 mb-2 font-sans font-semibold uppercase">
                          Inline Utilities Class String:
                        </span>
                        <div className="p-2.5 rounded bg-blue-500/5 border border-blue-500/10 font-bold text-blue-600 dark:text-blue-400 select-all leading-normal break-all">
                          {activeResults[0].tailwindClasses}
                        </div>
                      </div>
                    ) : (
                      // Display selector mappings
                      <div className="space-y-4">
                        <span className="text-[10px] text-slate-400 block border-b border-[var(--border-color)] pb-1 font-sans font-semibold uppercase">
                          Stylesheet Classes Translations:
                        </span>
                        {activeResults.map((res) => (
                          <div key={res.selector} className="space-y-1">
                            <div className="text-[var(--foreground)] font-bold text-[11px]">{res.selector} {'{'}</div>
                            <div className="pl-4 text-blue-600 dark:text-blue-400 font-bold break-words animate-fade-in">
                              <span className="text-[var(--text-muted)] font-medium mr-1.5 opacity-80">Equivalent:</span>
                              <span className="select-all">{res.tailwindClasses}</span>
                            </div>
                            <div className="text-[var(--foreground)]">{'}'}</div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    <span className="text-[var(--text-muted)] italic">Awaiting CSS input...</span>
                  )
                ) : (
                  cssOutputFromTailwind ? (
                    <pre className="whitespace-pre-wrap select-all">{cssOutputFromTailwind}</pre>
                  ) : (
                    <span className="text-[var(--text-muted)] italic">Awaiting Tailwind classes...</span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="flex gap-2">
            <button
              onClick={handleShareConversion}
              type="button"
              className="flex-1 bg-slate-50 dark:bg-slate-900/30 border border-[var(--border-color)] hover:border-blue-500 hover:text-blue-500 rounded-xl py-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.63-2.316a3 3 0 113.682 3.682l-4.63 2.316M8.684 13.258l4.63 2.316a3 3 0 11-3.681-3.682l4.63-2.316M8.684 10.742a3 3 0 110 2.516" />
              </svg>
              Share Live Workspace URL
            </button>
          </div>
        </div>

      </div>

      {/* Popular Conversions cards */}
      <PopularConversions
        onSelect={handleExampleSelect}
        selectedId={selectedExampleId}
      />

      {/* Main Split Preview & Explanation blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-8">
        
        {/* Preview Panel (Left) */}
        <div className="lg:col-span-6 h-full flex flex-col">
          <PreviewPanel
            htmlInput={htmlInput}
            onHtmlChange={setHtmlInput}
            conversionResults={activeResults}
            isTailwindToCssMode={mode === 'tailwind-to-css'}
            tailwindClassesInput={tailwindInput}
          />
        </div>

        {/* Explanations (Right) */}
        <div className="lg:col-span-6">
          {mode === 'css-to-tailwind' ? (
            <ExplanationMode results={activeResults} />
          ) : (
            <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm text-xs transition-colors duration-300">
              <span className="font-bold text-[var(--foreground)] text-sm block mb-2">Reverse Conversion Explanations</span>
              <p className="text-[var(--text-muted)] leading-relaxed">
                Reverse Mode translates Tailwind utility tokens back to standard, clean W3C CSS properties. 
                Responsive tokens prepended with <code className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">md:</code> or <code className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">lg:</code> are compiled into nested media query declarations, while interactive states like <code className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">hover:</code> are exported as pseudo-selectors (<code className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">:hover</code>).
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Side-by-Side Ad placements placeholders */}
      <div className="mt-8">
        <AdPlaceholder position="top" />
      </div>

      {/* Toast notifications */}
      {showShareToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white rounded-lg px-4 py-2 text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5">
          <span>🔗 Workspace Link Copied to Clipboard!</span>
        </div>
      )}
      {showCopyToast && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white rounded-lg px-4 py-2 text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5">
          <span>📋 Code Copied to Clipboard!</span>
        </div>
      )}

    </div>
  );
}
