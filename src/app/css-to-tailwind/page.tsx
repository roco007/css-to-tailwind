import { Metadata } from 'next';
import ConverterGrid from '@/components/Converter/ConverterGrid';
import SEOContent from '@/components/SEO/SEOContent';
import EmailCapture from '@/components/Common/EmailCapture';

export const metadata: Metadata = {
  title: 'CSS to Tailwind Online Converter - Convert CSS stylesheets instantly',
  description: 'Convert CSS stylesheets and selectors into standard Tailwind CSS classes online. Free, safe client-side processing. Simplify your Tailwind CSS migration.',
  keywords: [
    'CSS to Tailwind online',
    'CSS to Tailwind converter',
    'convert CSS to Tailwind CSS',
    'stylesheet to Tailwind',
    'free CSS to Tailwind converter'
  ],
  openGraph: {
    title: 'CSS to Tailwind Online Converter',
    description: 'Transform traditional CSS stylesheets or custom responsive classes to Tailwind v4 equivalents immediately.',
    type: 'website',
    url: 'https://css-to-tailwind.com/css-to-tailwind'
  }
};

const defaultCss = `.profile-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}`;

const defaultHtml = `<div class="profile-card">
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
  <div>
    <h3 class="font-bold text-slate-800 text-base">Sarah Connor</h3>
    <p class="text-slate-500 text-xs">Software Engineer</p>
  </div>
</div>`;

export default function CssToTailwindPage() {
  return (
    <div className="relative w-full min-h-screen pb-16">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-[10%] left-[5%] -z-10 h-72 w-72 rounded-full bg-blue-400/5 dark:bg-blue-500/5 blur-3xl bg-glow-blue"></div>
      <div className="absolute top-[25%] right-[5%] -z-10 h-80 w-80 rounded-full bg-purple-400/5 dark:bg-purple-500/5 blur-3xl bg-glow-purple"></div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10">
        
        {/* Hero Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            SEO Programmatic Alternate Page
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            CSS to Tailwind <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Online Converter</span>
          </h1>
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
            Convert standard CSS files and rule structures into Tailwind CSS utility classes. Simply paste your classes, nested elements, or inline styles below to generate perfect utility markup instantly.
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
              Transform Your Stylesheets to Tailwind CSS Utility Classes
            </h2>
            <p className="text-[var(--text-muted)]">
              Migrating traditional cascading stylesheets into dynamic utility files can be a tedious chore. Our online parser parses standard W3C stylesheet definitions, inline declarations, or pseudo-classes, and maps them to their optimal, closest-matching Tailwind v4 tokens.
            </p>
            
            <h3 className="text-lg font-semibold text-[var(--foreground)] mt-4">
              How the Online Converter Simplifies Development
            </h3>
            <p className="text-[var(--text-muted)]">
              Traditional CSS stylesheets suffer from global scope pollution, name collisions, and endless payload inflation. Utility classes completely bypass these scaling limits. By applying pre-defined styling patterns directly in your JSX or HTML, you guarantee consistent layouts while pruning unused stylesheets.
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
