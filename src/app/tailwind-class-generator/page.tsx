import { Metadata } from 'next';
import ConverterGrid from '@/components/Converter/ConverterGrid';
import SEOContent from '@/components/SEO/SEOContent';
import EmailCapture from '@/components/Common/EmailCapture';

export const metadata: Metadata = {
  title: 'Tailwind Class Generator - Build Tailwind Utilities from Custom CSS',
  description: 'Instantly generate Tailwind CSS class sheets from traditional CSS declarations. Fast, lightweight utility class builder for components.',
  keywords: [
    'Tailwind class generator',
    'Tailwind CSS class builder',
    'CSS to Tailwind generator',
    'Tailwind code generator',
    'generate Tailwind classes'
  ],
  openGraph: {
    title: 'Tailwind Class Generator',
    description: 'Enter your custom selector styles and watch standard Tailwind class sequences build themselves dynamically in real-time.',
    type: 'website',
    url: 'https://css-to-tailwind.com/tailwind-class-generator'
  }
};

const defaultCss = `.action-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-image: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: #ffffff;
  font-weight: 500;
  border-radius: 9999px;
  box-shadow: 0 4px 14px 0 rgba(79, 70, 229, 0.4);
}`;

const defaultHtml = `<button class="action-btn">
  <span>Explore Features</span>
  <svg class="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</button>`;

export default function TailwindClassGeneratorPage() {
  return (
    <div className="relative w-full min-h-screen pb-16">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl bg-glow-blue"></div>
      <div className="absolute top-[25%] right-[5%] -z-10 h-80 w-80 rounded-full bg-purple-400/5 dark:bg-purple-500/5 blur-3xl bg-glow-purple"></div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
        
        {/* Hero Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            Speedy Markup Builder
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            Tailwind <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Class Generator</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Quickly compile standard CSS selector sheets into elegant strings of utility classes. Map intricate rules like CSS gradients, custom flex directions, transparent borders, and box shadows with ease.
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
              Build Perfect Tailwind CSS Utility Combinations
            </h2>
            <p className="text-[var(--text-muted)]">
              Tailwind CSS speeds up stylesheet iteration by providing standard utility classes for display types, paddings, margin spans, font sizes, weights, background images, and border modifications. This generator parses raw elements in your stylesheet and aggregates them into short utility class phrases to use immediately in your React, Vue, Next.js, or HTML files.
            </p>
            
            <h3 className="text-lg font-semibold text-[var(--foreground)] mt-4">
              Advanced Linear Gradient and Shadow Translation
            </h3>
            <p className="text-[var(--text-muted)]">
              Traditional gradient rules are tedious to map. Our utility class mapper translates linear backgrounds and custom rgb/rgba box-shadow specifications into their native, standard Tailwind equivalents or maps them cleanly to custom arbitrary parameters (like <code className="font-mono text-xs">bg-[linear-gradient(...)]</code>) to optimize layout accuracy.
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
