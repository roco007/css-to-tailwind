'use client';

import { SelectorConversionResult } from '@/utils/tailwindMapper';

interface ExplanationModeProps {
  results: SelectorConversionResult[];
}

export default function ExplanationMode({ results }: ExplanationModeProps) {
  // If no classes converted yet
  const totalDeclarations = results.reduce((acc, curr) => acc + curr.explanations.length, 0);

  if (totalDeclarations === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 text-center text-xs text-[var(--text-muted)] transition-colors duration-300">
        <p>Enter CSS on the left to see property-by-property conversion details and learn Tailwind mappings.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col">
        <h3 className="text-sm font-bold text-[var(--foreground)]">
          Smart Mapping Explanations
        </h3>
        <p className="text-[10px] text-[var(--text-muted)]">
          Analyze how the translation engine mapped your CSS values to Tailwind v4 equivalents.
        </p>
      </div>

      <div className="space-y-4">
        {results.map((result) => {
          if (result.explanations.length === 0) return null;
          return (
            <div
              key={result.selector}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm overflow-hidden transition-colors duration-300"
            >
              {/* Selector Header */}
              <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/30 border-b border-[var(--border-color)] flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-blue-500">
                  {result.selector}
                </span>
                <span className="text-[9px] text-[var(--text-muted)]">
                  {result.explanations.length} declarations
                </span>
              </div>

              {/* Explanations List */}
              <div className="divide-y divide-[var(--border-color)] max-h-80 overflow-y-auto">
                {result.explanations.map((exp, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-start gap-3 text-xs">
                    {/* Left: CSS Decl */}
                    <div className="sm:w-1/3 flex flex-col gap-1 shrink-0">
                      <span className="font-mono text-slate-400 font-medium">CSS Code</span>
                      <code className="font-mono bg-slate-100 dark:bg-slate-800/80 px-2 py-1 rounded text-red-500 font-semibold self-start text-[11px]">
                        {exp.property}: {exp.cssValue};
                      </code>
                    </div>

                    {/* Middle: Tailwind Class */}
                    <div className="sm:w-1/3 flex flex-col gap-1 shrink-0">
                      <span className="font-mono text-slate-400 font-medium">Tailwind Utility</span>
                      {exp.tailwindClass ? (
                        <div className="flex items-center gap-2">
                          <code className="font-mono bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded font-bold text-[11px] self-start">
                            {exp.tailwindClass}
                          </code>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                              exp.isArbitrary
                                ? 'bg-purple-100 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400'
                                : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                            }`}
                          >
                            {exp.isArbitrary ? 'Arbitrary' : 'Standard'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-red-400 italic">Skipped</span>
                      )}
                    </div>

                    {/* Right: Reason */}
                    <div className="sm:w-1/3 flex flex-col gap-1">
                      <span className="font-mono text-slate-400 font-medium">Conversion Explanation</span>
                      <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">
                        {exp.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
