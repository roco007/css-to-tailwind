import React from 'react';

export default function SEOContent() {
  return (
    <section className="w-full mt-16 border-t border-[var(--border-color)] pt-12 text-[var(--foreground)] transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Core Articles */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-3">
              What is Tailwind CSS?
            </h2>
            <p className="text-[var(--text-muted)]">
              Tailwind CSS is a utility-first CSS framework packed with classes like <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">flex</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">pt-4</code>, <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">text-center</code>, and <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-xs">rotate-90</code> that can be composed to build any design, directly in your markup. Instead of writing custom CSS stylesheet rules, you apply pre-defined utility classes directly to HTML elements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-3">
              Why Convert Traditional CSS to Tailwind Utility Classes?
            </h2>
            <p className="text-[var(--text-muted)] mb-4">
              Developers and companies are migrating from stylesheet files to Tailwind CSS to solve common scaling, styling, and design consistency problems:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-[var(--text-muted)]">
              <li>
                <strong>Drastically Smaller Bundles:</strong> Tailwind CSS scans your template files and only bundles the classes you actually use. In production, style payloads are typically under 10KB.
              </li>
              <li>
                <strong>No More CSS File Bloat:</strong> With traditional CSS, stylesheets grow with every new feature. In Tailwind, styling is added in HTML, meaning the CSS bundle size remains flat.
              </li>
              <li>
                <strong>Design System Enforcement:</strong> Spacing scales, color palettes, and breakpoints are restricted to your Tailwind configuration, preventing rogue values (e.g. random <code className="font-mono text-xs">margin: 17px</code>).
              </li>
              <li>
                <strong>No Naming Decisions:</strong> Stop wasting time inventing arbitrary class names like <code className="font-mono text-xs">.wrapper-inner-container-v2</code>.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-3">
              Tailwind CSS vs. Traditional CSS Comparison
            </h2>
            <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
              <table className="min-w-full divide-y divide-[var(--border-color)] text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/40 text-[var(--text-muted)] font-semibold uppercase">
                  <tr>
                    <th className="px-4 py-3">Feature</th>
                    <th className="px-4 py-3">Traditional CSS</th>
                    <th className="px-4 py-3">Tailwind CSS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-muted)]">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)]">File Size</td>
                    <td className="px-4 py-3">Grows continuously with new features and elements.</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Remains flat and optimized (usually under 15KB).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)]">Maintenance</td>
                    <td className="px-4 py-3">Deleting styles is risky due to cascading side-effects.</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Safe to remove; deleting HTML elements deletes their styles.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-[var(--foreground)]">Design Consistency</td>
                    <td className="px-4 py-3">Values are arbitrary and easily drift over time.</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Enforced color schemes, spacing, and sizing scales.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-3">
              Common CSS → Tailwind Mappings Reference
            </h2>
            <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
              <table className="min-w-full divide-y divide-[var(--border-color)] text-xs text-left font-mono">
                <thead className="bg-slate-50 dark:bg-slate-900/40 text-[var(--text-muted)] font-semibold uppercase">
                  <tr>
                    <th className="px-4 py-3">CSS Style</th>
                    <th className="px-4 py-3">Tailwind Utility Class</th>
                    <th className="px-4 py-3">Reason / Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-muted)]">
                  <tr>
                    <td className="px-4 py-3 text-[var(--foreground)]">margin: 16px;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">m-4</td>
                    <td className="px-4 py-3">1 unit = 0.25rem = 4px. So 16px is 4 units.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[var(--foreground)]">display: flex;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">flex</td>
                    <td className="px-4 py-3">Declares a flexbox container layout.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[var(--foreground)]">border-radius: 8px;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">rounded-lg</td>
                    <td className="px-4 py-3">Standard Tailwind scale (rounded-lg = 0.5rem = 8px).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[var(--foreground)]">font-weight: 700;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">font-bold</td>
                    <td className="px-4 py-3">Weights match font-bold, medium, thin.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-3">
              Step-by-Step CSS to Tailwind Migration Guide
            </h2>
            <ol className="list-decimal pl-5 space-y-3 text-[var(--text-muted)]">
              <li>
                <strong>Analyze your HTML blocks:</strong> Identify recurring layout structures (buttons, headers, navigation drawers).
              </li>
              <li>
                <strong>Translate style-by-style:</strong> Paste your CSS declarations into our free online converter to extract equivalent utility classes.
              </li>
              <li>
                <strong>Embed utility classes:</strong> Replace the CSS <code className="font-mono text-xs">class=&quot;...&quot;</code> names in your templates with the converted Tailwind values.
              </li>
              <li>
                <strong>Verify breakpoints and hover state modifiers:</strong> Prepend <code className="font-mono text-xs">hover:</code> or responsive labels like <code className="font-mono text-xs">md:</code> and <code className="font-mono text-xs">lg:</code> to handle dynamic component behavior.
              </li>
              <li>
                <strong>Audit and remove custom CSS:</strong> Delete the old stylesheets to decrease page load times.
              </li>
            </ol>
          </div>

          {/* FAQ Section */}
          <div className="border-t border-[var(--border-color)] pt-8">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-6">
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-4">
              <details className="group rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-xs font-semibold text-[var(--foreground)] focus:outline-none">
                  <span>Is this CSS to Tailwind converter free?</span>
                  <span className="shrink-0 rounded-full bg-blue-50 p-1 text-blue-500 transition duration-300 group-open:-rotate-180 dark:bg-slate-800">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
                  Yes, this tool is 100% free with no login required. You can paste your CSS, inspect the explanations, custom configure scales, and copy classes unlimited times.
                </p>
              </details>

              <details className="group rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-xs font-semibold text-[var(--foreground)] focus:outline-none">
                  <span>Does my code leave the browser?</span>
                  <span className="shrink-0 rounded-full bg-blue-50 p-1 text-blue-500 transition duration-300 group-open:-rotate-180 dark:bg-slate-800">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
                  Never. All parsing, mapping, and explanations happen completely client-side in your local browser using React and TypeScript. Your code and styles are never uploaded to any backend server.
                </p>
              </details>

              <details className="group rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-xs font-semibold text-[var(--foreground)] focus:outline-none">
                  <span>How does color mapping calculate closest colors?</span>
                  <span className="shrink-0 rounded-full bg-blue-50 p-1 text-blue-500 transition duration-300 group-open:-rotate-180 dark:bg-slate-800">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
                  The tool translates your input color (Hex, RGB, HSL, or name) into RGB format, then calculates the Euclidean distance against every default Tailwind hex color weight. If a match is within a small threshold, it uses the standard class. Otherwise, it generates an arbitrary value color rule (like <code className="font-mono text-xs">bg-[#xxxxxx]</code>) automatically.
                </p>
              </details>

              <details className="group rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-xs font-semibold text-[var(--foreground)] focus:outline-none">
                  <span>Does it support Tailwind CSS v4?</span>
                  <span className="shrink-0 rounded-full bg-blue-50 p-1 text-blue-500 transition duration-300 group-open:-rotate-180 dark:bg-slate-800">
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-[var(--text-muted)]">
                  Yes! The core output classes are fully compatible with Tailwind CSS v4 and v3. The converter also supports modern arbitrary syntax, which translates to the latest compile-time engine standards.
                </p>
              </details>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
