import { Metadata } from 'next';
import ConverterGrid from '@/components/Converter/ConverterGrid';
import SEOContent from '@/components/SEO/SEOContent';
import EmailCapture from '@/components/Common/EmailCapture';

export const metadata: Metadata = {
  title: 'CSS Margin to Tailwind Converter - Spacing Utility Generator',
  description: 'Convert CSS margin properties (margin, margin-top, margin-inline, auto margin) into standard Tailwind spacing utility classes instantly.',
  keywords: [
    'margin to tailwind',
    'CSS margin to tailwind',
    'spacing to tailwind',
    'convert margin to tailwind',
    'tailwind margin generator'
  ],
  openGraph: {
    title: 'CSS Margin to Tailwind Converter',
    description: 'Instantly convert margin values, auto parameters, and negative spacings into clean Tailwind CSS classes.',
    type: 'website',
    url: 'https://css-to-tailwind.com/margin-to-tailwind'
  }
};

const defaultCss = `.spacing-container {
  margin-top: 24px;
  margin-bottom: 32px;
  margin-left: auto;
  margin-right: auto;
}`;

const defaultHtml = `<div class="spacing-container bg-slate-100 dark:bg-slate-800 p-6 rounded-xl border border-[var(--border-color)]">
  <p class="text-center text-slate-500 dark:text-slate-400 text-sm font-medium">Centered layout block with vertical margin spaces.</p>
</div>`;

export default function MarginToTailwindPage() {
  return (
    <div className="relative w-full min-h-screen pb-16">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl bg-glow-blue"></div>
      <div className="absolute top-[25%] right-[5%] -z-10 h-80 w-80 rounded-full bg-purple-400/5 dark:bg-purple-500/5 blur-3xl bg-glow-purple"></div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
        
        {/* Hero Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            Spacing Translation Guide
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            Margin to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Tailwind Converter</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Convert standard W3C CSS margin values (pixels, rems, ems, percentages, auto) to standard Tailwind CSS margin utility classes instantly. Negative margins, axial combinations, and responsive spacings are fully supported.
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
              How Margin Spacing Maps in Tailwind CSS
            </h2>
            <p className="text-[var(--text-muted)]">
              Tailwind CSS spacing runs on a default scale where <strong>1 spacing unit equals 0.25rem (which translates to 4px in default browsers)</strong>. 
              Converting margins involves evaluating the target size, matching it to the closest scale step, and declaring the appropriate prefix:
            </p>

            <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] my-4">
              <table className="min-w-full divide-y divide-[var(--border-color)] text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/40 text-[var(--text-muted)] font-semibold uppercase">
                  <tr>
                    <th className="px-4 py-3">CSS Margin Property</th>
                    <th className="px-4 py-3">Tailwind Utility Prefix</th>
                    <th className="px-4 py-3">Example Class</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-muted)] font-mono">
                  <tr>
                    <td className="px-4 py-3">margin</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">m-</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">m-4 (16px)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">margin-top</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">mt-</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">mt-6 (24px)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">margin-bottom</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">mb-</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">mb-8 (32px)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">margin-left</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">ms- (or ml-)</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">ms-4 / ml-4</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">margin-right</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">me- (or mr-)</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">me-4 / mr-4</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">margin: top bottom left right</td>
                    <td className="px-4 py-3 text-blue-500 font-bold">mt- mb- mx-</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-semibold">mt-2 mr-4 mb-2 ml-4</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-[var(--foreground)] mt-4">
              Handling Negative and Centered Spacings
            </h3>
            <p className="text-[var(--text-muted)]">
              Negative margins in Tailwind are built by prefixing a dash before the property key, such as <code className="font-mono text-xs">-mt-4</code> (translates to <code className="font-mono text-xs">margin-top: -16px</code>). Horizontal centering via <code className="font-mono text-xs">margin-left: auto; margin-right: auto;</code> is translated compactly into <code className="font-mono text-xs">mx-auto</code>.
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
