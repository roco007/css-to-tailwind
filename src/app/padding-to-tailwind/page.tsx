import { Metadata } from 'next';
import ConverterGrid from '@/components/Converter/ConverterGrid';
import SEOContent from '@/components/SEO/SEOContent';
import EmailCapture from '@/components/Common/EmailCapture';

export const metadata: Metadata = {
  title: 'CSS Padding to Tailwind Converter - Spacing Class Builder',
  description: 'Convert CSS padding properties (padding, padding-top, vertical padding, logical paddings) into standard Tailwind utility classes online.',
  keywords: [
    'padding to tailwind',
    'CSS padding to tailwind',
    'convert padding to tailwind',
    'tailwind padding generator',
    'spacing converter'
  ],
  openGraph: {
    title: 'CSS Padding to Tailwind Converter',
    description: 'Instantly convert spacing declarations and inner paddings into clean, optimized Tailwind utility tokens.',
    type: 'website',
    url: 'https://css-to-tailwind.com/padding-to-tailwind'
  }
};

const defaultCss = `.card-content {
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
}`;

const defaultHtml = `<div class="card-content bg-white dark:bg-slate-900 shadow-sm rounded-xl border border-[var(--border-color)]">
  <h4 class="font-bold text-slate-800 dark:text-slate-100 text-sm">Interactive Content Block</h4>
  <p class="text-slate-500 dark:text-slate-400 text-xs mt-1">This card box has horizontal and vertical padding styles applied.</p>
</div>`;

export default function PaddingToTailwindPage() {
  return (
    <div className="relative w-full min-h-screen pb-16">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl bg-glow-blue"></div>
      <div className="absolute top-[25%] right-[5%] -z-10 h-80 w-80 rounded-full bg-purple-400/5 dark:bg-purple-500/5 blur-3xl bg-glow-purple"></div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
        
        {/* Hero Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            Inner Spacing Conversion
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            Padding to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tailwind Converter</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Convert CSS padding declarations (pixels, rems, ems, percentages) to standard, native Tailwind CSS padding classes instantly. Consolidate horizontal, vertical, and all-side spacing rules.
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
              Mapping Inner Padding to Tailwind Spacing Scale
            </h2>
            <p className="text-[var(--text-muted)]">
              Like margins, padding utility classes in Tailwind rely on a default scale where <strong>1 unit = 4px (0.25rem)</strong>. Horizontal paddings can be declared as separate axes or compiled compactly using the axis helpers:
            </p>

            <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] my-4">
              <table className="min-w-full divide-y divide-[var(--border-color)] text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/40 text-[var(--text-muted)] font-semibold uppercase">
                  <tr>
                    <th className="px-4 py-3">CSS Padding Property</th>
                    <th className="px-4 py-3">Tailwind Utility Prefix</th>
                    <th className="px-4 py-3">Example Class</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-muted)] font-mono">
                  <tr>
                    <td className="px-4 py-3">padding</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">p-</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">p-4 (16px on all sides)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">padding-top & padding-bottom</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">py-</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">py-4 (16px top and bottom)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">padding-left & padding-right</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">px-</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">px-6 (24px left and right)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">padding-top</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">pt-</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">pt-3 (12px)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">padding-bottom</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">pb-</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">pb-5 (20px)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-[var(--foreground)] mt-4">
              Consolidating Spacing Rules for Cleaner Code
            </h3>
            <p className="text-[var(--text-muted)]">
              Using composite classes like <code className="font-mono text-xs">px-6 py-4</code> rather than listing <code className="font-mono text-xs">pl-6 pr-6 pt-4 pb-4</code> keeps your HTML clean and easy to scan, leading to easier debugging and cleaner codebase migrations.
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
