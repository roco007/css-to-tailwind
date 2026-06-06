import { CSSDeclaration } from './cssParser';

// Types for Conversion Explanation
export interface ConversionExplanation {
  property: string;
  cssValue: string;
  tailwindClass: string;
  reason: string;
  isArbitrary: boolean;
}

export interface TailwindMapperConfig {
  useArbitraryValues: boolean; // If false, map to nearest standard Tailwind class
  spacingTolerancePx: number;   // Difference in pixels to allow mapping to standard spacing before using arbitrary e.g. 1px
  colorTolerance: number;       // Euclidean distance threshold in RGB space for standard color mapping (default 30)
  customColors?: Record<string, string>; // User defined custom colors: { "brand-blue": "#0a56f2" }
  customSpacing?: Record<string, string>; // User defined custom spacing: { "13": "3.25rem" }
}

export const defaultConfig: TailwindMapperConfig = {
  useArbitraryValues: true,
  spacingTolerancePx: 1.5,
  colorTolerance: 35,
};

// --- Tailwind standard colors (HEX values) ---
const TAILWIND_COLORS: Record<string, Record<string, string>> = {
  slate: { '50': '#f8fafc', '100': '#f1f5f9', '200': '#e2e8f0', '300': '#cbd5e1', '400': '#94a3b8', '500': '#64748b', '600': '#475569', '700': '#334155', '800': '#1e293b', '900': '#0f172a', '950': '#020617' },
  gray: { '50': '#f9fafb', '100': '#f3f4f6', '200': '#e5e7eb', '300': '#d1d5db', '400': '#9ca3af', '500': '#6b7280', '600': '#4b5563', '700': '#374151', '800': '#1f2937', '900': '#111827', '950': '#030712' },
  zinc: { '50': '#fafafa', '100': '#f4f4f5', '200': '#e4e4e7', '300': '#d4d4d8', '400': '#a1a1aa', '500': '#71717a', '600': '#52525b', '700': '#3f3f46', '800': '#27272a', '900': '#18181b', '950': '#09090b' },
  neutral: { '50': '#fafafa', '100': '#f5f5f5', '200': '#e5e5e5', '300': '#d4d4d4', '400': '#a3a3a3', '500': '#737373', '600': '#525252', '700': '#404040', '800': '#262626', '900': '#171717', '950': '#0a0a0a' },
  stone: { '50': '#fafaf9', '100': '#f5f5f4', '200': '#e7e5e4', '300': '#d6d3d1', '400': '#a8a29e', '500': '#78716c', '600': '#57534e', '700': '#44403c', '800': '#292524', '900': '#1c1917', '950': '#0c0a09' },
  red: { '50': '#fef2f2', '100': '#fee2e2', '200': '#fecaca', '300': '#fca5a5', '400': '#f87171', '500': '#ef4444', '600': '#dc2626', '700': '#b91c1c', '800': '#991b1b', '900': '#7f1d1d', '950': '#450a0a' },
  orange: { '50': '#fff7ed', '100': '#ffedd5', '200': '#fed7aa', '300': '#fdba74', '400': '#fb923c', '500': '#f97316', '600': '#ea580c', '700': '#c2410c', '800': '#9a3412', '900': '#7c2d12', '950': '#431407' },
  amber: { '50': '#fffbeb', '100': '#fef3c7', '200': '#fde68a', '300': '#fcd34d', '400': '#fbbf24', '500': '#f59e0b', '600': '#d97706', '700': '#b45309', '800': '#92400e', '900': '#78350f', '950': '#451a03' },
  yellow: { '50': '#fefce8', '100': '#fef9c3', '200': '#fef08a', '300': '#fde047', '400': '#facc15', '500': '#eab308', '600': '#ca8a04', '700': '#a16207', '800': '#854d0e', '900': '#713f12', '950': '#422006' },
  lime: { '50': '#f7fee7', '100': '#ecfccb', '200': '#d9f99d', '300': '#bef264', '400': '#a3e635', '500': '#84cc16', '600': '#65a30d', '700': '#4d7c0f', '800': '#3f6212', '900': '#365314', '950': '#1a2e05' },
  green: { '50': '#f0fdf4', '100': '#dcfce7', '200': '#bbf7d0', '300': '#86efac', '400': '#4ade80', '500': '#22c55e', '600': '#16a34a', '700': '#15803d', '800': '#166534', '900': '#14532d', '950': '#052e16' },
  emerald: { '50': '#ecfdf5', '100': '#d1fae5', '200': '#a7f3d0', '300': '#6ee7b7', '400': '#34d399', '500': '#10b981', '600': '#059669', '700': '#047857', '800': '#065f46', '900': '#064e3b', '950': '#022c22' },
  teal: { '50': '#f0fdfa', '100': '#ccfbf1', '200': '#99f6e4', '300': '#5eead4', '400': '#2dd4bf', '500': '#14b8a6', '600': '#0d9488', '700': '#0f766e', '800': '#115e59', '900': '#134e4a', '950': '#042f2e' },
  cyan: { '50': '#ecfeff', '100': '#cffafe', '200': '#a5f3fc', '300': '#67e8f9', '400': '#22d3ee', '500': '#06b6d4', '600': '#0891b2', '700': '#0e7490', '800': '#155e75', '900': '#164e63', '950': '#083344' },
  sky: { '50': '#f0f9ff', '100': '#e0f2fe', '200': '#bae6fd', '300': '#7dd3fc', '400': '#38bdf8', '500': '#0ea5e9', '600': '#0284c7', '700': '#0369a1', '800': '#075985', '900': '#0c4a6e', '950': '#082f49' },
  blue: { '50': '#eff6ff', '100': '#dbeafe', '200': '#bfdbfe', '300': '#93c5fd', '400': '#60a5fa', '500': '#3b82f6', '600': '#2563eb', '700': '#1d4ed8', '800': '#1e40af', '900': '#1e3a8a', '950': '#172554' },
  indigo: { '50': '#eef2ff', '100': '#e0e7ff', '200': '#c7d2fe', '300': '#a5b4fc', '400': '#818cf8', '500': '#6366f1', '600': '#4f46e5', '700': '#4338ca', '800': '#3730a3', '900': '#312e81', '950': '#1e1b4b' },
  violet: { '50': '#f5f3ff', '100': '#ede9fe', '200': '#ddd6fe', '300': '#c4b5fd', '400': '#a78bfa', '500': '#8b5cf6', '600': '#7c3aed', '700': '#6d28d9', '800': '#5b21b6', '900': '#4c1d95', '950': '#2e1065' },
  purple: { '50': '#faf5ff', '100': '#f3e8ff', '200': '#e9d5ff', '300': '#d8b4fe', '400': '#c084fc', '500': '#a855f7', '600': '#9333ea', '700': '#7e22ce', '800': '#6b21a8', '900': '#581c87', '950': '#3b0764' },
  fuchsia: { '50': '#fdf4ff', '100': '#fae8ff', '200': '#f5d0fe', '300': '#f0abfc', '400': '#e879f9', '500': '#d946ef', '600': '#c026d3', '700': '#a21caf', '800': '#86198f', '900': '#701a75', '950': '#4a044e' },
  pink: { '50': '#fdf2f8', '100': '#fce7f3', '200': '#fbcfe8', '300': '#f472b6', '400': '#f43f5e', '500': '#ec4899', '600': '#db2777', '700': '#be185d', '800': '#9d174d', '900': '#831843', '950': '#500724' },
  rose: { '50': '#fff1f2', '100': '#ffe4e6', '200': '#fecdd3', '300': '#fda4af', '400': '#fb7185', '500': '#f43f5e', '600': '#e11d48', '700': '#be123c', '800': '#9f1239', '900': '#881337', '950': '#4c051e' }
};

// Named CSS Colors mapping to Hex
const NAMED_COLORS: Record<string, string> = {
  aliceblue: '#f0f8ff', antiquewhite: '#faebd7', aqua: '#00ffff', aquamarine: '#7fffd4', azure: '#f0ffff',
  beige: '#f5f5dc', bisque: '#ffe4c4', black: '#000000', blanchedalmond: '#ffebcd', blue: '#0000ff',
  blueviolet: '#8a2be2', brown: '#a52a2a', burlywood: '#deb887', cadetblue: '#5f9ea0', chartreuse: '#7fff00',
  chocolate: '#d2691e', coral: '#ff7f50', cornflowerblue: '#6495ed', cornsilk: '#fff8dc', crimson: '#dc143c',
  cyan: '#00ffff', darkblue: '#00008b', darkcyan: '#008b8b', darkgoldenrod: '#b8860b', darkgray: '#a9a9a9',
  darkgreen: '#006400', darkgrey: '#a9a9a9', darkkhaki: '#bdb76b', darkmagenta: '#8b008b', darkolivegreen: '#556b2f',
  darkorange: '#ff8c00', darkorchid: '#9932cc', darkred: '#8b0000', darksalmon: '#e9967a', darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b', darkslateimpl: '#2f4f4f', darkslategrey: '#2f4f4f', darkturquoise: '#00ced1',
  darkviolet: '#9400d3', deeppink: '#ff1493', deepskyblue: '#00bfff', dimgray: '#696969', dimgrey: '#696969',
  dodgerblue: '#1e90ff', firebrick: '#b22222', floralwhite: '#fffaf0', forestgreen: '#228b22', fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc', ghostwhite: '#f8f8ff', gold: '#ffd700', goldenrod: '#daa520', gray: '#808080',
  green: '#008000', greenyellow: '#adff2f', grey: '#808080', honeydew: '#f0fff0', hotpink: '#ff69b4',
  indianred: '#cd5c5c', indigo: '#4b0082', ivory: '#fffff0', khaki: '#f0e68c', lavender: '#e6e6fa',
  lavenderblush: '#fff0f5', lawngreen: '#7cfc00', lemonchiffon: '#fffacd', lightblue: '#add8e6', lightcoral: '#f08080',
  lightcyan: '#e0ffff', lightgoldenrodyellow: '#fafad2', lightgray: '#d3d3d3', lightgreen: '#90ee90',
  lightgrey: '#d3d3d3', lightpink: '#ffb6c1', lightsalmon: '#ffa07a', lightseagreen: '#20b2aa', lightskyblue: '#87cefa',
  lightslateblue: '#7844ff', lightslategrey: '#778899', lightsteelblue: '#b0c4de', lightyellow: '#ffffe0',
  lime: '#00ff00', limegreen: '#32cd32', linen: '#faf0e6', magenta: '#ff00ff', maroon: '#800000',
  mediumaquamarine: '#66cdaa', mediumblue: '#0000cd', mediumorchid: '#ba55d3', mediumpurple: '#9370db',
  mediumseagreen: '#3cb371', mediumslateblue: '#7b68ee', mediumspringgreen: '#00fa9a', mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585', midnightblue: '#191970', mintcream: '#f5fffa', mistyrose: '#ffe4e1', moccasin: '#ffe4b5',
  navajowhite: '#ffdead', navy: '#000080', oldlace: '#fdf5e6', olive: '#808000', olivedrab: '#6b8e23',
  orange: '#ffa500', orangered: '#ff4500', orchid: '#da70d6', palegoldenrod: '#eee8aa', palegreen: '#98fb98',
  paleturquoise: '#afeeee', palevioletred: '#db7093', papayawhip: '#ffefd5', peachpuff: '#ffdab9', peru: '#cd853f',
  pink: '#ffc0cb', plum: '#dda0dd', powderblue: '#b0e0e6', purple: '#800080', rebeccapurple: '#663399',
  red: '#ff0000', rosybrown: '#bc8f8f', royalblue: '#4169e1', saddlebrown: '#8b4513', salmon: '#fa8072',
  sandybrown: '#f4a460', seagreen: '#2e8b57', seashell: '#fff5ee', sienna: '#a0522d', silver: '#c0c0c0',
  skyblue: '#87ceeb', slateblue: '#6a5acd', slategray: '#708090', snow: '#fffafa', springgreen: '#00ff7f',
  steelblue: '#4682b4', tan: '#d2b48c', teal: '#008080', thistle: '#d8bfd8', tomato: '#ff6347',
  turquoise: '#40e0d0', violet: '#ee82ee', wheat: '#f5deb3', white: '#ffffff', whitesmoke: '#f5f5f5',
  yellow: '#ffff00', yellowgreen: '#9acd32'
};

// Spacing scale: Tailwind values mapped to rems
const SPACING_SCALE: Record<string, number> = {
  '0': 0, '0.5': 0.125, '1': 0.25, '1.5': 0.375, '2': 0.5, '2.5': 0.625, '3': 0.75, '3.5': 0.875,
  '4': 1, '5': 1.25, '6': 1.5, '7': 1.75, '8': 2, '9': 2.25, '10': 2.5, '11': 2.75, '12': 3,
  '14': 3.5, '16': 4, '20': 5, '24': 6, '28': 7, '32': 8, '36': 9, '40': 10, '44': 11, '48': 12,
  '52': 13, '56': 14, '60': 15, '64': 16, '72': 18, '80': 20, '96': 24
};

// Font-size mapping in pixels (rems * 16)
const FONT_SIZE_MAP: Record<string, number> = {
  'xs': 12, 'sm': 14, 'base': 16, 'lg': 18, 'xl': 20, '2xl': 24, '3xl': 30, '4xl': 36,
  '5xl': 48, '6xl': 60, '7xl': 72, '8xl': 96
};

// Border radius mapping in pixels
const BORDER_RADIUS_MAP: Record<string, number> = {
  'none': 0, 'sm': 2, 'default': 4, 'md': 6, 'lg': 8, 'xl': 12, '2xl': 16, '3xl': 24, 'full': 9999
};

// Box shadow mappings
const SHADOW_MAP: Record<string, string> = {
  'none': 'none',
  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'default': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)'
};

// Static layouts and flags mappings
const STATIC_MAPS: Record<string, Record<string, string>> = {
  'display': {
    'block': 'block', 'inline-block': 'inline-block', 'inline': 'inline', 'flex': 'flex',
    'inline-flex': 'inline-flex', 'grid': 'grid', 'inline-grid': 'inline-grid', 'contents': 'contents',
    'table': 'table', 'inline-table': 'inline-table', 'table-row': 'table-row', 'table-cell': 'table-cell',
    'none': 'hidden', 'flow-root': 'flow-root'
  },
  'flex-direction': {
    'row': 'flex-row', 'row-reverse': 'flex-row-reverse', 'column': 'flex-col', 'column-reverse': 'flex-col-reverse'
  },
  'flex-wrap': {
    'wrap': 'flex-wrap', 'wrap-reverse': 'flex-wrap-reverse', 'nowrap': 'flex-nowrap'
  },
  'justify-content': {
    'flex-start': 'justify-start', 'start': 'justify-start', 'flex-end': 'justify-end', 'end': 'justify-end',
    'center': 'justify-center', 'space-between': 'justify-between', 'space-around': 'justify-around',
    'space-evenly': 'justify-evenly', 'stretch': 'justify-stretch'
  },
  'align-items': {
    'flex-start': 'items-start', 'start': 'items-start', 'flex-end': 'items-end', 'end': 'items-end',
    'center': 'items-center', 'baseline': 'items-baseline', 'stretch': 'items-stretch'
  },
  'align-content': {
    'flex-start': 'content-start', 'start': 'content-start', 'flex-end': 'content-end', 'end': 'content-end',
    'center': 'content-center', 'space-between': 'content-between', 'space-around': 'content-around',
    'space-evenly': 'content-evenly', 'stretch': 'content-stretch'
  },
  'align-self': {
    'auto': 'self-auto', 'flex-start': 'self-start', 'start': 'self-start', 'flex-end': 'self-end', 'end': 'self-end',
    'center': 'self-center', 'baseline': 'self-baseline', 'stretch': 'self-stretch'
  },
  'justify-items': {
    'start': 'justify-items-start', 'end': 'justify-items-end', 'center': 'justify-items-center', 'stretch': 'justify-items-stretch'
  },
  'justify-self': {
    'auto': 'justify-self-auto', 'start': 'justify-self-start', 'end': 'justify-self-end', 'center': 'justify-self-center', 'stretch': 'justify-self-stretch'
  },
  'position': {
    'static': 'static', 'fixed': 'fixed', 'absolute': 'absolute', 'relative': 'relative', 'sticky': 'sticky'
  },
  'font-style': {
    'italic': 'italic', 'normal': 'not-italic'
  },
  'text-transform': {
    'uppercase': 'uppercase', 'lowercase': 'lowercase', 'capitalize': 'capitalize', 'none': 'normal-case'
  },
  'text-align': {
    'left': 'text-left', 'center': 'text-center', 'right': 'text-right', 'justify': 'text-justify',
    'start': 'text-start', 'end': 'text-end'
  },
  'text-decoration-line': {
    'underline': 'underline', 'line-through': 'line-through', 'none': 'no-underline'
  },
  'white-space': {
    'normal': 'whitespace-normal', 'nowrap': 'whitespace-nowrap', 'pre': 'whitespace-pre',
    'pre-line': 'whitespace-pre-line', 'pre-wrap': 'whitespace-pre-wrap', 'break-spaces': 'whitespace-break-spaces'
  },
  'box-sizing': {
    'border-box': 'box-border', 'content-box': 'box-content'
  },
  'overflow': {
    'auto': 'overflow-auto', 'hidden': 'overflow-hidden', 'clip': 'overflow-clip', 'visible': 'overflow-visible', 'scroll': 'overflow-scroll'
  },
  'overflow-x': {
    'auto': 'overflow-x-auto', 'hidden': 'overflow-x-hidden', 'clip': 'overflow-x-clip', 'visible': 'overflow-x-visible', 'scroll': 'overflow-x-scroll'
  },
  'overflow-y': {
    'auto': 'overflow-y-auto', 'hidden': 'overflow-y-hidden', 'clip': 'overflow-y-clip', 'visible': 'overflow-y-visible', 'scroll': 'overflow-y-scroll'
  },
  'visibility': {
    'visible': 'visible', 'hidden': 'invisible'
  },
  'cursor': {
    'auto': 'cursor-auto', 'default': 'cursor-default', 'pointer': 'cursor-pointer', 'wait': 'cursor-wait',
    'text': 'cursor-text', 'move': 'cursor-move', 'help': 'cursor-help', 'not-allowed': 'cursor-not-allowed'
  },
  'user-select': {
    'none': 'select-none', 'text': 'select-text', 'all': 'select-all', 'auto': 'select-auto'
  },
  'pointer-events': {
    'none': 'pointer-events-none', 'auto': 'pointer-events-auto'
  }
};

// --- Color Helpers ---
interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

/**
 * Parses HSL string into RGB
 */
function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4))
  };
}

/**
 * Parses any CSS color string (Hex, rgb, rgba, hsl, hsla, named) into RGB values
 */
export function parseColor(colorStr: string): RGB | null {
  const clean = colorStr.trim().toLowerCase();
  if (clean === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  
  // Named Colors
  if (NAMED_COLORS[clean]) {
    return parseColor(NAMED_COLORS[clean]);
  }

  // Hex Colors
  if (clean.startsWith('#')) {
    const hex = clean.substring(1);
    if (hex.length === 3 || hex.length === 4) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      const a = hex.length === 4 ? parseInt(hex[3] + hex[3], 16) / 255 : 1;
      return { r, g, b, a };
    } else if (hex.length === 6 || hex.length === 8) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;
      return { r, g, b, a };
    }
  }

  // RGB / RGBA
  const rgbMatch = clean.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]),
      g: parseInt(rgbMatch[2]),
      b: parseInt(rgbMatch[3]),
      a: rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1
    };
  }

  // HSL / HSLA
  const hslMatch = clean.match(/^hsla?\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)$/);
  if (hslMatch) {
    const h = parseInt(hslMatch[1]);
    const s = parseFloat(hslMatch[2]);
    const l = parseFloat(hslMatch[3]);
    const a = hslMatch[4] !== undefined ? parseFloat(hslMatch[4]) : 1;
    const rgb = hslToRgb(h, s, l);
    rgb.a = a;
    return rgb;
  }

  return null;
}

/**
 * Calculates Euclidean distance between two colors in RGB space
 */
function colorDistance(c1: RGB, c2: RGB): number {
  const dr = c1.r - c2.r;
  const dg = c1.g - c2.g;
  const db = c1.b - c2.b;
  // Standard approximation of human eye perception weighting
  return Math.sqrt(dr * dr * 0.299 + dg * dg * 0.587 + db * db * 0.114);
}

/**
 * Translates spacing value to pixels (assuming 1rem = 16px)
 */
export function parseLengthToPx(valueStr: string): number | null {
  const clean = valueStr.trim().toLowerCase();
  if (clean === '0') return 0;
  
  const match = clean.match(/^([+-]?[\d.]+)(px|rem|em|ex|ch|vw|vh|%|pt|pc|in|cm|mm)?$/);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const unit = match[2] || 'px';

  switch (unit) {
    case 'px': return value;
    case 'rem':
    case 'em': return value * 16;
    case 'pt': return value * 1.333; // rough approx
    default: return null; // Unhandled unit for mapping, fallback to arbitrary
  }
}

/**
 * Smart Mapping function: Matches a color to the closest standard Tailwind color
 */
function getClosestTailwindColor(colorVal: string, prefix: string, config: TailwindMapperConfig): { className: string, explanation: string, isArbitrary: boolean } {
  const parsed = parseColor(colorVal);
  if (!parsed) {
    // Custom color config lookup or fallback to arbitrary
    if (config.customColors && config.customColors[colorVal]) {
      return {
        className: `${prefix}-${config.customColors[colorVal]}`,
        explanation: `Mapped to custom config color: "${config.customColors[colorVal]}"`,
        isArbitrary: false
      };
    }
    const safeVal = colorVal.replace(/\s+/g, '');
    return {
      className: `${prefix}-[${safeVal}]`,
      explanation: `Could not parse color "${colorVal}", using arbitrary value syntax`,
      isArbitrary: true
    };
  }

  // Transparent/white/black checks
  if (parsed.a === 0) {
    return { className: `${prefix}-transparent`, explanation: 'Alpha opacity is 0, mapped to transparent', isArbitrary: false };
  }
  if (parsed.r === 255 && parsed.g === 255 && parsed.b === 255) {
    return { className: `${prefix}-white`, explanation: 'Pure white color (#ffffff) mapped to white', isArbitrary: false };
  }
  if (parsed.r === 0 && parsed.g === 0 && parsed.b === 0) {
    return { className: `${prefix}-black`, explanation: 'Pure black color (#000000) mapped to black', isArbitrary: false };
  }

  // Iterate over Tailwind color map to find closest Euclidean distance
  let minDistance = Infinity;
  let bestColor = 'blue-500';
  
  for (const [colorName, weights] of Object.entries(TAILWIND_COLORS)) {
    for (const [weight, hex] of Object.entries(weights)) {
      const tcRgb = parseColor(hex)!;
      const dist = colorDistance(parsed, tcRgb);
      if (dist < minDistance) {
        minDistance = dist;
        bestColor = `${colorName}-${weight}`;
      }
    }
  }

  // Check if distance is small enough to consider it a standard match
  if (minDistance <= config.colorTolerance) {
    const parts = bestColor.split('-');
    const colorFamily = TAILWIND_COLORS[parts[0] as keyof typeof TAILWIND_COLORS];
    const standardHex = colorFamily ? (colorFamily as Record<string, string>)[parts[1]] || '' : '';
    const hasAlpha = parsed.a !== undefined && parsed.a < 1;
    const opacitySuffix = hasAlpha ? `/${Math.round(parsed.a! * 100)}` : '';
    
    return {
      className: `${prefix}-${bestColor}${opacitySuffix}`,
      explanation: `Closest Tailwind color match: "${bestColor}" (distance ${minDistance.toFixed(1)}). Hex: ${standardHex}`,
      isArbitrary: false
    };
  }

  // Otherwise fallback to arbitrary
  const rgbString = parsed.a !== undefined && parsed.a < 1 
    ? `rgba(${parsed.r},${parsed.g},${parsed.b},${parsed.a})` 
    : `rgb(${parsed.r},${parsed.g},${parsed.b})`;

  if (config.useArbitraryValues) {
    const hexRep = parsed.a !== undefined && parsed.a < 1 
      ? `[${rgbString}]` 
      : `[#${parsed.r.toString(16).padStart(2, '0')}${parsed.g.toString(16).padStart(2, '0')}${parsed.b.toString(16).padStart(2, '0')}]`;
    return {
      className: `${prefix}-${hexRep}`,
      explanation: `Color is custom (nearest match is ${bestColor} with distance ${minDistance.toFixed(1)}). Mapped using arbitrary brackets.`,
      isArbitrary: true
    };
  }

  return {
    className: `${prefix}-${bestColor}`,
    explanation: `Map to closest Tailwind standard color: ${bestColor} (distance ${minDistance.toFixed(1)}). Arbitrary fallback disabled.`,
    isArbitrary: false
  };
}

/**
 * Smart Mapping function: Matches a spacing length (px, rem, em) to Tailwind spacing units
 */
function getClosestSpacing(valStr: string, prefix: string, config: TailwindMapperConfig): { className: string, explanation: string, isArbitrary: boolean } {
  // Check custom spacing configurations first
  if (config.customSpacing && config.customSpacing[valStr]) {
    return {
      className: `${prefix}-${config.customSpacing[valStr]}`,
      explanation: `Mapped to custom config spacing: "${config.customSpacing[valStr]}"`,
      isArbitrary: false
    };
  }

  const pxValue = parseLengthToPx(valStr);
  if (pxValue === null) {
    // Cannot convert to pixels (like "auto", "inherit", "100%", calc, etc.)
    if (valStr === 'auto') {
      return { className: `${prefix}-auto`, explanation: 'Auto spacing matches standard scale', isArbitrary: false };
    }
    const cleanVal = valStr.replace(/\s+/g, '');
    return {
      className: `${prefix}-[${cleanVal}]`,
      explanation: `Could not translate spacing unit "${valStr}" to pixels. Using arbitrary brackets.`,
      isArbitrary: true
    };
  }

  const remValue = pxValue / 16;
  
  // Find nearest Tailwind spacing value
  let minDiff = Infinity;
  let bestScale = '0';

  for (const [scale, scaleRem] of Object.entries(SPACING_SCALE)) {
    const diff = Math.abs(scaleRem - remValue);
    if (diff < minDiff) {
      minDiff = diff;
      bestScale = scale;
    }
  }

  const diffPx = minDiff * 16;
  const isClose = diffPx <= config.spacingTolerancePx;

  if (isClose) {
    const scalePx = SPACING_SCALE[bestScale] * 16;
    return {
      className: `${prefix}-${bestScale}`,
      explanation: `Mapped to nearest Tailwind spacing "${bestScale}" (${scalePx}px) which is within ${diffPx.toFixed(1)}px tolerance of ${pxValue}px.`,
      isArbitrary: false
    };
  }

  if (config.useArbitraryValues) {
    const cleanVal = valStr.replace(/\s+/g, '');
    return {
      className: `${prefix}-[${cleanVal}]`,
      explanation: `${pxValue}px (${remValue.toFixed(3)}rem) has no close standard Tailwind spacing. Closest was "${bestScale}" (${SPACING_SCALE[bestScale] * 16}px). Mapped using arbitrary brackets.`,
      isArbitrary: true
    };
  }

  return {
    className: `${prefix}-${bestScale}`,
    explanation: `Mapped to closest standard Tailwind spacing "${bestScale}" (${SPACING_SCALE[bestScale] * 16}px) with diff of ${diffPx.toFixed(1)}px. Arbitrary disabled.`,
    isArbitrary: false
  };
}

/**
 * Smart Mapping function: Matches border-radius value to closest Tailwind standard
 */
function getClosestBorderRadius(valStr: string, config: TailwindMapperConfig): { className: string, explanation: string, isArbitrary: boolean } {
  if (valStr === '50%' || valStr === '9999px' || valStr === '100%') {
    return { className: 'rounded-full', explanation: 'Rounded-full provides circular bounds', isArbitrary: false };
  }

  const pxValue = parseLengthToPx(valStr);
  if (pxValue === null) {
    return { className: `rounded-[${valStr}]`, explanation: `Using arbitrary border-radius value [${valStr}]`, isArbitrary: true };
  }

  let minDiff = Infinity;
  let bestKey = 'default';

  for (const [key, mapPx] of Object.entries(BORDER_RADIUS_MAP)) {
    const diff = Math.abs(mapPx - pxValue);
    if (diff < minDiff) {
      minDiff = diff;
      bestKey = key;
    }
  }

  const isClose = minDiff <= 1.5;
  if (isClose) {
    const suffix = bestKey === 'default' ? '' : `-${bestKey}`;
    return {
      className: `rounded${suffix}`,
      explanation: `Mapped to standard border radius "rounded${suffix}" (${BORDER_RADIUS_MAP[bestKey]}px) for input ${pxValue}px.`,
      isArbitrary: false
    };
  }

  if (config.useArbitraryValues) {
    return { className: `rounded-[${valStr}]`, explanation: `Radius ${pxValue}px has no close standard mapping. Using arbitrary brackets.`, isArbitrary: true };
  }

  const suffix = bestKey === 'default' ? '' : `-${bestKey}`;
  return { className: `rounded${suffix}`, explanation: `Closest standard radius is "rounded${suffix}". Arbitrary disabled.`, isArbitrary: false };
}

/**
 * Smart Mapping function: Matches font-size value to closest Tailwind standard
 */
function getClosestFontSize(valStr: string, config: TailwindMapperConfig): { className: string, explanation: string, isArbitrary: boolean } {
  const pxValue = parseLengthToPx(valStr);
  if (pxValue === null) {
    return { className: `text-[${valStr}]`, explanation: `Using arbitrary font-size value [${valStr}]`, isArbitrary: true };
  }

  let minDiff = Infinity;
  let bestKey = 'base';

  for (const [key, mapPx] of Object.entries(FONT_SIZE_MAP)) {
    const diff = Math.abs(mapPx - pxValue);
    if (diff < minDiff) {
      minDiff = diff;
      bestKey = key;
    }
  }

  const isClose = minDiff <= 1.5;
  if (isClose) {
    return {
      className: `text-${bestKey}`,
      explanation: `Mapped to standard font size "text-${bestKey}" (${FONT_SIZE_MAP[bestKey]}px) for input ${pxValue}px.`,
      isArbitrary: false
    };
  }

  if (config.useArbitraryValues) {
    return { className: `text-[${valStr}]`, explanation: `Font size ${pxValue}px is not standard. Using arbitrary brackets.`, isArbitrary: true };
  }

  return { className: `text-${bestKey}`, explanation: `Mapped to closest standard font size "text-${bestKey}". Arbitrary disabled.`, isArbitrary: false };
}

/**
 * Main function: Maps a single CSS declaration to its Tailwind equivalent
 */
export function mapDeclaration(decl: CSSDeclaration, config: TailwindMapperConfig = defaultConfig): { className: string; explanation: string; isArbitrary: boolean } | null {
  const prop = decl.property;
  const val = decl.value.trim();
  const importantSuffix = decl.important ? '!' : '';

  // 1. Static Mappings (Check if there is an exact layout mapping)
  if (STATIC_MAPS[prop] && STATIC_MAPS[prop][val]) {
    const mappedClass = STATIC_MAPS[prop][val];
    return {
      className: mappedClass + importantSuffix,
      explanation: `Static mapping found: "${prop}: ${val}" -> "${mappedClass}"`,
      isArbitrary: false
    };
  }

  // 2. Specific Property Translators
  
  // -- Margins --
  if (prop === 'margin') {
    // Handle shorthand margin (e.g. 10px, 10px 20px, etc.)
    const parts = val.split(/\s+/);
    if (parts.length === 1) {
      const spacing = getClosestSpacing(parts[0], 'm', config);
      return { className: spacing.className + importantSuffix, explanation: spacing.explanation, isArbitrary: spacing.isArbitrary };
    } else if (parts.length === 2) {
      const my = getClosestSpacing(parts[0], 'my', config);
      const mx = getClosestSpacing(parts[1], 'mx', config);
      return {
        className: `${my.className} ${mx.className}`.split(' ').map(c => c + importantSuffix).join(' '),
        explanation: `Split shorthand "margin: ${val}" into vertical: ${my.explanation} and horizontal: ${mx.explanation}`,
        isArbitrary: my.isArbitrary || mx.isArbitrary
      };
    } else if (parts.length === 4) {
      const mt = getClosestSpacing(parts[0], 'mt', config);
      const mr = getClosestSpacing(parts[1], 'mr', config);
      const mb = getClosestSpacing(parts[2], 'mb', config);
      const ml = getClosestSpacing(parts[3], 'ml', config);
      return {
        className: `${mt.className} ${mr.className} ${mb.className} ${ml.className}`.split(' ').map(c => c + importantSuffix).join(' '),
        explanation: `Split shorthand "margin: ${val}" into top, right, bottom, left directions.`,
        isArbitrary: mt.isArbitrary || mr.isArbitrary || mb.isArbitrary || ml.isArbitrary
      };
    }
  }

  if (prop === 'margin-top') return getClosestSpacing(val, 'mt', config);
  if (prop === 'margin-bottom') return getClosestSpacing(val, 'mb', config);
  if (prop === 'margin-left') return getClosestSpacing(val, 'ml', config);
  if (prop === 'margin-right') return getClosestSpacing(val, 'mr', config);

  // -- Paddings --
  if (prop === 'padding') {
    const parts = val.split(/\s+/);
    if (parts.length === 1) {
      const spacing = getClosestSpacing(parts[0], 'p', config);
      return { className: spacing.className + importantSuffix, explanation: spacing.explanation, isArbitrary: spacing.isArbitrary };
    } else if (parts.length === 2) {
      const py = getClosestSpacing(parts[0], 'py', config);
      const px = getClosestSpacing(parts[1], 'px', config);
      return {
        className: `${py.className} ${px.className}`.split(' ').map(c => c + importantSuffix).join(' '),
        explanation: `Split shorthand "padding: ${val}" into vertical: ${py.explanation} and horizontal: ${px.explanation}`,
        isArbitrary: py.isArbitrary || px.isArbitrary
      };
    } else if (parts.length === 4) {
      const pt = getClosestSpacing(parts[0], 'pt', config);
      const pr = getClosestSpacing(parts[1], 'pr', config);
      const pb = getClosestSpacing(parts[2], 'pb', config);
      const pl = getClosestSpacing(parts[3], 'pl', config);
      return {
        className: `${pt.className} ${pr.className} ${pb.className} ${pl.className}`.split(' ').map(c => c + importantSuffix).join(' '),
        explanation: `Split shorthand "padding: ${val}" into top, right, bottom, left directions.`,
        isArbitrary: pt.isArbitrary || pr.isArbitrary || pb.isArbitrary || pl.isArbitrary
      };
    }
  }

  if (prop === 'padding-top') return getClosestSpacing(val, 'pt', config);
  if (prop === 'padding-bottom') return getClosestSpacing(val, 'pb', config);
  if (prop === 'padding-left') return getClosestSpacing(val, 'pl', config);
  if (prop === 'padding-right') return getClosestSpacing(val, 'pr', config);

  // -- Gap, Width, Height --
  if (prop === 'gap') return getClosestSpacing(val, 'gap', config);
  if (prop === 'row-gap') return getClosestSpacing(val, 'gap-y', config);
  if (prop === 'column-gap') return getClosestSpacing(val, 'gap-x', config);

  if (prop === 'width') {
    if (val === '100%') return { className: 'w-full' + importantSuffix, explanation: 'width: 100% maps to w-full', isArbitrary: false };
    if (val === '100vw') return { className: 'w-screen' + importantSuffix, explanation: 'width: 100vw maps to w-screen', isArbitrary: false };
    if (val === 'fit-content' || val === '-webkit-fit-content') return { className: 'w-fit' + importantSuffix, explanation: 'width: fit-content maps to w-fit', isArbitrary: false };
    if (val === 'max-content') return { className: 'w-max' + importantSuffix, explanation: 'width: max-content maps to w-max', isArbitrary: false };
    if (val === 'min-content') return { className: 'w-min' + importantSuffix, explanation: 'width: min-content maps to w-min', isArbitrary: false };
    if (val === 'auto') return { className: 'w-auto' + importantSuffix, explanation: 'width: auto maps to w-auto', isArbitrary: false };
    return getClosestSpacing(val, 'w', config);
  }

  if (prop === 'height') {
    if (val === '100%') return { className: 'h-full' + importantSuffix, explanation: 'height: 100% maps to h-full', isArbitrary: false };
    if (val === '100vh') return { className: 'h-screen' + importantSuffix, explanation: 'height: 100vh maps to h-screen', isArbitrary: false };
    if (val === 'fit-content') return { className: 'h-fit' + importantSuffix, explanation: 'height: fit-content maps to h-fit', isArbitrary: false };
    if (val === 'max-content') return { className: 'h-max' + importantSuffix, explanation: 'height: max-content maps to h-max', isArbitrary: false };
    if (val === 'min-content') return { className: 'h-min' + importantSuffix, explanation: 'height: min-content maps to h-min', isArbitrary: false };
    if (val === 'auto') return { className: 'h-auto' + importantSuffix, explanation: 'height: auto maps to h-auto', isArbitrary: false };
    return getClosestSpacing(val, 'h', config);
  }

  // -- Absolute positioning offsets --
  if (prop === 'top') return getClosestSpacing(val, 'top', config);
  if (prop === 'bottom') return getClosestSpacing(val, 'bottom', config);
  if (prop === 'left') return getClosestSpacing(val, 'left', config);
  if (prop === 'right') return getClosestSpacing(val, 'right', config);

  // -- Colors --
  if (prop === 'background-color') return getClosestTailwindColor(val, 'bg', config);
  if (prop === 'color') return getClosestTailwindColor(val, 'text', config);
  if (prop === 'border-color') return getClosestTailwindColor(val, 'border', config);
  if (prop === 'outline-color') return getClosestTailwindColor(val, 'outline', config);

  // -- Typography size and weight --
  if (prop === 'font-size') return getClosestFontSize(val, config);
  if (prop === 'font-weight') {
    const weights: Record<string, string> = {
      '100': 'font-thin', '200': 'font-extralight', '300': 'font-light', '400': 'font-normal',
      '500': 'font-medium', '600': 'font-semibold', '700': 'font-bold', '800': 'font-extrabold',
      '900': 'font-black', 'normal': 'font-normal', 'bold': 'font-bold', 'lighter': 'font-light',
      'bolder': 'font-extrabold'
    };
    if (weights[val]) {
      return { className: weights[val] + importantSuffix, explanation: `Mapped weight ${val} to "${weights[val]}"`, isArbitrary: false };
    }
    return { className: `font-[${val}]` + importantSuffix, explanation: `Using arbitrary font-weight [${val}]`, isArbitrary: true };
  }

  // -- Border Radius --
  if (prop === 'border-radius') return getClosestBorderRadius(val, config);

  // -- Border Width and Style --
  if (prop === 'border-width') {
    if (val === '0px' || val === '0') return { className: 'border-0', explanation: 'border-width 0 mapped to border-0', isArbitrary: false };
    return getClosestSpacing(val, 'border', config);
  }
  if (prop === 'border-style') {
    const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'none'];
    if (borderStyles.includes(val)) {
      const mapped = val === 'none' ? 'border-none' : `border-${val}`;
      return { className: mapped + importantSuffix, explanation: `Border style mapped: "${val}" -> "${mapped}"`, isArbitrary: false };
    }
  }

  // Combined border shorthand (e.g. "1px solid rgb(229, 231, 235)")
  if (prop === 'border') {
    const parts = val.split(/\s+/);
    if (parts.length === 3) {
      const width = getClosestSpacing(parts[0], 'border', config);
      const style = parts[1] === 'solid' ? '' : ` border-${parts[1]}`;
      const color = getClosestTailwindColor(parts[2], 'border', config);
      return {
        className: `${width.className}${style} ${color.className}`.split(' ').map(c => c + importantSuffix).join(' '),
        explanation: `Parsed border shorthand "${val}" into: width (${width.explanation}), style (${parts[1]}), and color (${color.explanation})`,
        isArbitrary: width.isArbitrary || color.isArbitrary
      };
    } else if (parts.length === 1 && parts[0] === 'none') {
      return { className: 'border-none' + importantSuffix, explanation: 'border: none maps to border-none', isArbitrary: false };
    }
  }

  // -- Line Height --
  if (prop === 'line-height') {
    const lhMap: Record<string, string> = {
      '1': 'leading-none', '1.25': 'leading-tight', '1.375': 'leading-snug',
      '1.5': 'leading-normal', '1.625': 'leading-relaxed', '2': 'leading-loose'
    };
    if (lhMap[val]) {
      return { className: lhMap[val] + importantSuffix, explanation: `Mapped line-height ratio ${val} to "${lhMap[val]}"`, isArbitrary: false };
    }
    const pxVal = parseLengthToPx(val);
    if (pxVal !== null) {
      return getClosestSpacing(val, 'leading', config);
    }
    return { className: `leading-[${val}]` + importantSuffix, explanation: `Arbitrary line-height [${val}]`, isArbitrary: true };
  }

  // -- Opacity --
  if (prop === 'opacity') {
    const floatVal = parseFloat(val);
    if (!isNaN(floatVal)) {
      const pct = Math.round(floatVal * 100);
      return { className: `opacity-${pct}` + importantSuffix, explanation: `Opacity mapped to opacity-${pct}`, isArbitrary: false };
    }
  }

  // -- Box Shadow --
  if (prop === 'box-shadow') {
    // Attempt parsing as arbitrary unless it maps closely to standard values
    for (const [key, shadowVal] of Object.entries(SHADOW_MAP)) {
      // Direct string comparison check
      if (val.replace(/\s+/g, '') === shadowVal.replace(/\s+/g, '')) {
        const suffix = key === 'default' ? '' : `-${key}`;
        return { className: `shadow${suffix}` + importantSuffix, explanation: `Exact match for shadow style: "${key}"`, isArbitrary: false };
      }
    }
    
    // Cleanup spacing for arbitrary brackets
    const cleanVal = val.replace(/\s+/g, '_'); // Tailwind allows underscores instead of spaces in brackets
    return { className: `shadow-[${cleanVal}]` + importantSuffix, explanation: `Custom box shadow. Mapped using arbitrary brackets (spaces replaced with underscores).`, isArbitrary: true };
  }

  // -- Flex Basis, Grow, Shrink --
  if (prop === 'flex-grow') return { className: (val === '0' ? 'flex-grow-0' : 'flex-grow') + importantSuffix, explanation: `flex-grow: ${val}`, isArbitrary: false };
  if (prop === 'flex-shrink') return { className: (val === '0' ? 'flex-shrink-0' : 'flex-shrink') + importantSuffix, explanation: `flex-shrink: ${val}`, isArbitrary: false };
  if (prop === 'flex-basis') {
    if (val === 'auto') return { className: 'basis-auto' + importantSuffix, explanation: 'basis-auto', isArbitrary: false };
    if (val === '0') return { className: 'basis-0' + importantSuffix, explanation: 'basis-0', isArbitrary: false };
    return getClosestSpacing(val, 'basis', config);
  }

  // -- Grid Columns and Rows --
  if (prop === 'grid-template-columns') {
    const colMatch = val.match(/^repeat\((\d+)\s*,\s*minmax\(0\s*,\s*1fr\)\)$/);
    if (colMatch) {
      return { className: `grid-cols-${colMatch[1]}` + importantSuffix, explanation: `Mapped Grid grid-template-columns repeat count to "grid-cols-${colMatch[1]}"`, isArbitrary: false };
    }
  }
  if (prop === 'grid-template-rows') {
    const rowMatch = val.match(/^repeat\((\d+)\s*,\s*minmax\(0\s*,\s*1fr\)\)$/);
    if (rowMatch) {
      return { className: `grid-rows-${rowMatch[1]}` + importantSuffix, explanation: `Mapped Grid grid-template-rows repeat count to "grid-rows-${rowMatch[1]}"`, isArbitrary: false };
    }
  }

  // 3. Fallback for unmapped properties: use arbitrary value syntax if enabled
  if (config.useArbitraryValues) {
    // Check if property is a standard CSS property to avoid garbage output
    const cleanVal = val.replace(/\s+/g, '_');
    return {
      className: `[${prop}:${cleanVal}]` + importantSuffix,
      explanation: `No direct Tailwind utility matches "${prop}". Mapped as raw arbitrary CSS: "[${prop}:${val}]"`,
      isArbitrary: true
    };
  }

  return null;
}

/**
 * Main module converter. Takes parsed CSS rules and maps them to selectors and classes.
 */
export interface SelectorConversionResult {
  selector: string;
  tailwindClasses: string;
  explanations: ConversionExplanation[];
}

export function convertCssToTailwind(
  rules: { selector: string; declarations: CSSDeclaration[] }[],
  config: TailwindMapperConfig = defaultConfig
): SelectorConversionResult[] {
  const results: SelectorConversionResult[] = [];

  for (const rule of rules) {
    const classes: string[] = [];
    const explanations: ConversionExplanation[] = [];

    for (const decl of rule.declarations) {
      const mapped = mapDeclaration(decl, config);
      if (mapped) {
        classes.push(mapped.className);
        explanations.push({
          property: decl.property,
          cssValue: decl.value,
          tailwindClass: mapped.className,
          reason: mapped.explanation,
          isArbitrary: mapped.isArbitrary
        });
      } else {
        explanations.push({
          property: decl.property,
          cssValue: decl.value,
          tailwindClass: '',
          reason: `Could not translate CSS property. Arbitrary fallback disabled.`,
          isArbitrary: false
        });
      }
    }

    results.push({
      selector: rule.selector,
      tailwindClasses: classes.join(' '),
      explanations
    });
  }

  return results;
}
