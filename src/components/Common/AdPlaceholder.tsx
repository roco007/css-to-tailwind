interface AdPlaceholderProps {
  position: 'top' | 'sidebar';
}

export default function AdPlaceholder({ position }: AdPlaceholderProps) {
  if (position === 'top') {
    return (
      <div className="w-full py-4 flex justify-center bg-slate-50 dark:bg-slate-900/40 border-y border-[var(--border-color)] transition-colors duration-300">
        <div className="w-full max-w-[728px] h-[90px] rounded border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center bg-[var(--card-bg)] text-xs text-[var(--text-muted)] relative overflow-hidden">
          <span className="absolute top-1 left-1 bg-slate-100 dark:bg-slate-800 px-1 rounded text-[9px] uppercase tracking-wide">
            Advertisement
          </span>
          <span className="font-semibold text-slate-400 dark:text-slate-500">
            Monetization Space (728x90)
          </span>
          <p className="text-[10px] text-slate-400/80 dark:text-slate-500/80">
            Ad space ready for Google AdSense, Carbon Ads, or BuySellAds.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[250px] rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-4 flex flex-col items-center justify-center bg-[var(--card-bg)] text-center text-xs text-[var(--text-muted)] relative overflow-hidden transition-colors duration-300">
      <span className="absolute top-1 left-1 bg-slate-100 dark:bg-slate-800 px-1 rounded text-[9px] uppercase tracking-wide">
        Advertisement
      </span>
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <span className="font-semibold text-slate-400 dark:text-slate-500">
          Affiliate & Sponsor Ad (300x250)
        </span>
        <p className="text-[10px] text-slate-400/80 dark:text-slate-500/80 max-w-[200px]">
          Target web developers with developer tools, hosting services, or design kits.
        </p>
      </div>
    </div>
  );
}
