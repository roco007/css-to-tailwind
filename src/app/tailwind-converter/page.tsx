import { Metadata } from 'next';
import ConverterGrid from '@/components/Converter/ConverterGrid';
import SEOContent from '@/components/SEO/SEOContent';
import EmailCapture from '@/components/Common/EmailCapture';

export const metadata: Metadata = {
  title: 'Tailwind Converter Tool - Translate CSS Styles into Tailwind CSS',
  description: 'Convert custom CSS styles, stylesheets, and elements to Tailwind CSS classes online. High performance, zero logging, complete browser safety.',
  keywords: [
    'Tailwind converter tool',
    'Tailwind CSS converter',
    'convert to Tailwind CSS',
    'CSS stylesheet to Tailwind',
    'Tailwind styling utility'
  ],
  openGraph: {
    title: 'Tailwind Converter Tool',
    description: 'Paste standard styles and instantly translate them into responsive, modern Tailwind CSS classes.',
    type: 'website',
    url: 'https://css-to-tailwind.com/tailwind-converter'
  }
};

const defaultCss = `.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #0369a1;
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 9999px;
}`;

const defaultHtml = `<span class="status-badge">
  <span class="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
  System Active
</span>`;

export default function TailwindConverterPage() {
  return (
    <div className="relative w-full min-h-screen pb-16">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl bg-glow-blue"></div>
      <div className="absolute top-[25%] right-[5%] -z-10 h-80 w-80 rounded-full bg-purple-400/5 dark:bg-purple-500/5 blur-3xl bg-glow-purple"></div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
        
        {/* Hero Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            Professional Developer Suite
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            Tailwind <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Converter Tool</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Eliminate traditional CSS files and transition safely to utility-first styling. Get instant utility class suggestions with absolute precision, complete with spacing thresholds and color calculations.
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
              Convert Your Entire Component Layout to Tailwind CSS
            </h2>
            <p className="text-[var(--text-muted)]">
              Using Tailwind CSS provides standardized layouts, theme configurations, and unified developer environments. Rather than hand-rolling each CSS rule conversion, our engine processes complex multi-rule classes, mapping border radius, margins, box shadows, and inline layouts to Tailwind v4 structures.
            </p>
            
            <h3 className="text-lg font-semibold text-[var(--foreground)] mt-4">
              Configurable Match Tolerances
            </h3>
            <p className="text-[var(--text-muted)]">
              Under our custom settings customizer, you can tune color similarity indexes, spacing scales, and pixel conversions to perfectly snap to your pre-existing tailwind theme or custom variables.
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
