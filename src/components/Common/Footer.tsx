import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--foreground)] py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md">
                <span className="font-mono text-sm font-bold text-white">#t</span>
              </div>
              <span className="text-md font-bold tracking-tight text-[var(--foreground)]">
                CSS to Tailwind
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              The fastest, most intelligent converter designed to help developers migrate styling logic to Tailwind CSS utility classes.
            </p>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              🔒 100% Client-side processing
            </div>
          </div>

          {/* Quick Tools Links (Programmatic SEO) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Conversion Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/css-to-tailwind" className="hover:text-blue-500 transition-colors">
                  CSS to Tailwind Online
                </a>
              </li>
              <li>
                <a href="/tailwind-converter" className="hover:text-blue-500 transition-colors">
                  Tailwind Converter Tool
                </a>
              </li>
              <li>
                <a href="/tailwind-class-generator" className="hover:text-blue-500 transition-colors">
                  Tailwind Class Generator
                </a>
              </li>
            </ul>
          </div>

          {/* Property Specifics (Programmatic SEO) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              CSS Translations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/margin-to-tailwind" className="hover:text-blue-500 transition-colors">
                  Margin to Tailwind
                </a>
              </li>
              <li>
                <a href="/padding-to-tailwind" className="hover:text-blue-500 transition-colors">
                  Padding to Tailwind
                </a>
              </li>
              <li>
                <a href="/flexbox-to-tailwind" className="hover:text-blue-500 transition-colors">
                  Flexbox to Tailwind
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Affiliates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Dev Resources
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)]">
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors text-[var(--foreground)]"
                >
                  Official Tailwind Docs
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase font-bold text-blue-500 block mt-2 mb-1">
                  Sponsor
                </span>
                <a
                  href="https://tailwindui.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors text-[var(--foreground)] font-medium"
                >
                  Tailwind UI Component Kits ↗
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 transition-colors text-[var(--foreground)] font-medium"
                >
                  Fast Next.js Hosting ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-color)] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} CSS to Tailwind Converter. No logs, no signup, 100% free.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <span>•</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
