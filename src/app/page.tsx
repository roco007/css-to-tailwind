import { Metadata } from 'next';
import ConverterGrid from '@/components/Converter/ConverterGrid';
import SEOContent from '@/components/SEO/SEOContent';
import EmailCapture from '@/components/Common/EmailCapture';

export const metadata: Metadata = {
  title: 'Free CSS to Tailwind Converter (Instant Tailwind Class Generator)',
  description: 'Convert standard CSS or inline styles to Tailwind CSS utility classes online instantly. Free tool, no login required, 100% secure client-side processing. Includes reverse Tailwind-to-CSS conversion.',
  keywords: [
    'CSS to Tailwind converter',
    'convert CSS to Tailwind',
    'Tailwind class generator',
    'CSS to Tailwind online',
    'Tailwind converter tool',
    'Tailwind CSS v4 converter'
  ],
  openGraph: {
    title: 'Free CSS to Tailwind Converter',
    description: 'Instant Tailwind CSS utility class generator. Parse CSS stylesheets or inline rules back-and-forth locally in your browser.',
    type: 'website',
    url: 'https://css-to-tailwind.com'
  }
};

export default function Home() {
  return (
    <div className="relative w-full min-h-screen pb-16">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl bg-glow-blue"></div>
      <div className="absolute top-[25%] right-[5%] -z-10 h-80 w-80 rounded-full bg-purple-400/5 dark:bg-purple-500/5 blur-3xl bg-glow-purple"></div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
        
        {/* Hero Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            Free CSS to Tailwind <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Converter</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Migrating your codebase to Tailwind CSS? Paste your traditional stylesheet rules or inline declarations below. Get clean utility classes, custom spacing scales, and step-by-step explanations instantly.
          </p>
        </div>

        {/* Master Converter Workspace Grid */}
        <ConverterGrid />

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
