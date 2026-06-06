import { Metadata } from 'next';
import ConverterGrid from '@/components/Converter/ConverterGrid';
import SEOContent from '@/components/SEO/SEOContent';
import EmailCapture from '@/components/Common/EmailCapture';

export const metadata: Metadata = {
  title: 'CSS Flexbox & Grid to Tailwind Converter - Layout Builder',
  description: 'Convert CSS Flexbox and Grid layouts (flex-direction, align-items, justify-content, grid-columns, gaps) into Tailwind CSS classes instantly.',
  keywords: [
    'flexbox to tailwind',
    'CSS flexbox to tailwind',
    'convert flex to tailwind',
    'CSS grid to tailwind',
    'layout converter'
  ],
  openGraph: {
    title: 'CSS Flexbox & Grid to Tailwind Converter',
    description: 'Instantly map display flex, grid columns, aligns, wraps, and gaps into clean Tailwind layout utilities.',
    type: 'website',
    url: 'https://css-to-tailwind.com/flexbox-to-tailwind'
  }
};

const defaultCss = `.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}`;

const defaultHtml = `<div class="flex-container bg-slate-50 dark:bg-slate-900/40 p-6 rounded-xl border border-[var(--border-color)]">
  <div class="p-4 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm">Card Element 1</div>
  <div class="p-4 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-sm">Card Element 2</div>
  <div class="p-4 bg-purple-600 text-white rounded-lg text-xs font-bold shadow-sm">Card Element 3</div>
</div>`;

export default function FlexboxToTailwindPage() {
  return (
    <div className="relative w-full min-h-screen pb-16">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl bg-glow-blue"></div>
      <div className="absolute top-[25%] right-[5%] -z-10 h-80 w-80 rounded-full bg-purple-400/5 dark:bg-purple-500/5 blur-3xl bg-glow-purple"></div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
        
        {/* Hero Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            Layout Blueprinting
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            Flexbox & Grid to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tailwind Converter</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Instantly map CSS Flexbox alignments, grid template layouts, directions, alignments, wraps, and item gap spans to their equivalent modern Tailwind CSS utility structures.
          </p>
        </div>

        {/* Master Converter Workspace Grid */}
        <ConverterGrid 
          initialCss={defaultCss} 
          initialHtml={defaultHtml} 
          initialMode="css-to-tailwind"
        />

        {/* Informative Article Block */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 mt-12 space-y-8 text-[var(--foreground)]">
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Modern Flexbox and Grid Structures in Tailwind CSS
            </h2>
            <p className="text-[var(--text-muted)]">
              Tailwind CSS makes designing fluid, responsive grid rows and flex alignments extremely fast and intuitive. 
              Instead of hand-rolling complex layouts with media breakpoints and flex-grows in separate files, you combine single words like <code className="font-mono text-xs">flex</code>, <code className="font-mono text-xs">grid</code>, <code className="font-mono text-xs">items-center</code>, or <code className="font-mono text-xs">gap-4</code>:
            </p>

            <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] my-4">
              <table className="min-w-full divide-y divide-[var(--border-color)] text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/40 text-[var(--text-muted)] font-semibold uppercase">
                  <tr>
                    <th className="px-4 py-3">CSS Flex/Grid Rule</th>
                    <th className="px-4 py-3">Tailwind Utility Class</th>
                    <th className="px-4 py-3">Layout Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-muted)] font-mono">
                  <tr>
                    <td className="px-4 py-3">display: flex;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">flex</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Defines a Flex container.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">flex-direction: column;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">flex-col</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Stacks flex items vertically.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">align-items: center;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">items-center</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Aligns items centrally along cross axis.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">justify-content: space-between;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">justify-between</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Distributes items with equal spaces.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">display: grid;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">grid</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Defines a Grid container.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">grid-template-columns: repeat(3, 1fr);</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">grid-cols-3</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Creates three equal grid columns.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">gap: 24px;</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">gap-6</td>
                    <td className="px-4 py-3 text-[var(--text-muted)]">Creates a 24px (1.5rem) gap between items.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-[var(--foreground)] mt-4">
              Building Complex Responsive Cards and Grids
            </h3>
            <p className="text-[var(--text-muted)]">
              Using Tailwind&apos;s breakpoint prefixes (like <code className="font-mono text-xs">md:grid-cols-2 lg:grid-cols-4</code>) directly alongside your display classes allows you to build completely fluid grid columns that shift shapes automatically based on user viewport sizes, removing the need for custom CSS media queries.
            </p>
          </div>
        </div>

        {/* Email Lead Capture Sheet */}
        <div className="mt-8">
          <EmailCapture />
        </div>

        {/* Dynamic SEO Informative Section */}
        <SEOContent />

      </main>
    </div>
  );
}
