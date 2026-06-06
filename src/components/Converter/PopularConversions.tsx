'use client';

import { examples } from '@/utils/examples';

interface PopularConversionsProps {
  onSelect: (css: string, html: string) => void;
  selectedId?: string;
}

export default function PopularConversions({ onSelect, selectedId }: PopularConversionsProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col">
        <h3 className="text-sm font-bold text-[var(--foreground)]">
          Popular Component Templates
        </h3>
        <p className="text-[10px] text-[var(--text-muted)]">
          Click any card to load pre-built CSS layout snippets into the workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {examples.map((ex) => {
          const isSelected = selectedId === ex.id;
          return (
            <button
              key={ex.id}
              onClick={() => onSelect(ex.css, ex.html)}
              type="button"
              className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group cursor-pointer bg-[var(--card-bg)] hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 ring-1 ring-blue-500'
                  : 'border-[var(--border-color)] hover:border-blue-500/50'
              }`}
            >
              {/* Top Accent glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <span className="text-xs font-bold text-[var(--foreground)] mb-1">
                {ex.name}
              </span>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
                {ex.description}
              </p>
              
              <span className="text-[9px] font-semibold text-blue-500 uppercase tracking-wider mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Load Template →
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
