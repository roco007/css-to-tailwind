'use client';

import { useState } from 'react';
import { TailwindMapperConfig } from '@/utils/tailwindMapper';

interface ConfigCustomizerProps {
  config: TailwindMapperConfig;
  onChange: (newConfig: TailwindMapperConfig) => void;
}

export default function ConfigCustomizer({ config, onChange }: ConfigCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newColorKey, setNewColorKey] = useState('');
  const [newColorVal, setNewColorVal] = useState('');
  const [newSpacingKey, setNewSpacingKey] = useState('');
  const [newSpacingVal, setNewSpacingVal] = useState('');

  const updateConfigVal = <K extends keyof TailwindMapperConfig>(
    key: K,
    val: TailwindMapperConfig[K]
  ) => {
    onChange({
      ...config,
      [key]: val,
    });
  };

  const addCustomColor = () => {
    if (!newColorKey || !newColorVal) return;
    const colors = { ...config.customColors, [newColorVal.trim().toLowerCase()]: newColorKey.trim().toLowerCase() };
    onChange({ ...config, customColors: colors });
    setNewColorKey('');
    setNewColorVal('');
  };

  const removeCustomColor = (hexVal: string) => {
    if (!config.customColors) return;
    const colors = { ...config.customColors };
    delete colors[hexVal];
    onChange({ ...config, customColors: colors });
  };

  const addCustomSpacing = () => {
    if (!newSpacingKey || !newSpacingVal) return;
    const spacing = { ...config.customSpacing, [newSpacingVal.trim().toLowerCase()]: newSpacingKey.trim().toLowerCase() };
    onChange({ ...config, customSpacing: spacing });
    setNewSpacingKey('');
    setNewSpacingVal('');
  };

  const removeCustomSpacing = (cssVal: string) => {
    if (!config.customSpacing) return;
    const spacing = { ...config.customSpacing };
    delete spacing[cssVal];
    onChange({ ...config, customSpacing: spacing });
  };

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 shadow-sm transition-colors duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-bold text-xs text-[var(--foreground)] focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <svg className="h-4.5 w-4.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Smart Mapper Config Settings
        </span>
        <span className="text-blue-500 hover:underline">
          {isOpen ? 'Close Settings' : 'Expand Settings'}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 border-t border-[var(--border-color)] pt-4 space-y-4 text-xs">
          {/* Main Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-start gap-2.5 cursor-pointer text-[var(--text-muted)]">
              <input
                type="checkbox"
                checked={config.useArbitraryValues}
                onChange={(e) => updateConfigVal('useArbitraryValues', e.target.checked)}
                className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-[var(--foreground)]">Enable Arbitrary Values</span>
                <span className="text-[10px] text-slate-400">Falls back to bracket selectors (e.g., w-[17px]) instead of standard mapping rules.</span>
              </div>
            </label>
          </div>

          <hr className="border-[var(--border-color)]" />

          {/* Sizing & Color Tolerances */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between mb-1.5 font-semibold text-[var(--foreground)]">
                <span>Spacing Tolerance: {config.spacingTolerancePx}px</span>
                <span className="text-slate-400 font-normal">Max diff allowed for standard scale</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={config.spacingTolerancePx}
                onChange={(e) => updateConfigVal('spacingTolerancePx', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5 font-semibold text-[var(--foreground)]">
                <span>Color Match Threshold: {config.colorTolerance}</span>
                <span className="text-slate-400 font-normal">Euclidean similarity distance</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={config.colorTolerance}
                onChange={(e) => updateConfigVal('colorTolerance', parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <hr className="border-[var(--border-color)]" />

          {/* Custom Theme Mapping config */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Custom Colors */}
            <div className="space-y-3">
              <span className="font-bold text-[var(--foreground)] block">Custom Color Definitions</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="#0a56f2"
                  value={newColorVal}
                  onChange={(e) => setNewColorVal(e.target.value)}
                  className="w-1/2 rounded border border-[var(--border-color)] bg-[var(--background)] px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="brand-blue"
                  value={newColorKey}
                  onChange={(e) => setNewColorKey(e.target.value)}
                  className="w-1/2 rounded border border-[var(--border-color)] bg-[var(--background)] px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addCustomColor}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 font-semibold"
                >
                  Add
                </button>
              </div>

              {config.customColors && Object.keys(config.customColors).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-h-24 overflow-y-auto p-1 border border-[var(--border-color)] rounded bg-[var(--background)]">
                  {Object.entries(config.customColors).map(([hex, name]) => (
                    <span
                      key={hex}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium"
                    >
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: hex }}></span>
                      {hex} → {name}
                      <button
                        type="button"
                        onClick={() => removeCustomColor(hex)}
                        className="text-red-500 hover:text-red-700 ml-0.5 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Spacings */}
            <div className="space-y-3">
              <span className="font-bold text-[var(--foreground)] block">Custom Spacing scale definitions</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="13px"
                  value={newSpacingVal}
                  onChange={(e) => setNewSpacingVal(e.target.value)}
                  className="w-1/2 rounded border border-[var(--border-color)] bg-[var(--background)] px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="brand-13"
                  value={newSpacingKey}
                  onChange={(e) => setNewSpacingKey(e.target.value)}
                  className="w-1/2 rounded border border-[var(--border-color)] bg-[var(--background)] px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addCustomSpacing}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 font-semibold"
                >
                  Add
                </button>
              </div>

              {config.customSpacing && Object.keys(config.customSpacing).length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-h-24 overflow-y-auto p-1 border border-[var(--border-color)] rounded bg-[var(--background)]">
                  {Object.entries(config.customSpacing).map(([cssVal, name]) => (
                    <span
                      key={cssVal}
                      className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium"
                    >
                      {cssVal} → {name}
                      <button
                        type="button"
                        onClick={() => removeCustomSpacing(cssVal)}
                        className="text-red-500 hover:text-red-700 ml-0.5 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
