import { parseColor } from './tailwindMapper';

export interface CSSDecl {
  property: string;
  value: string;
}

export interface SelectorBlock {
  selector: string; // e.g. "element", "element:hover", "@media (min-width: 768px) -> element"
  declarations: CSSDecl[];
}

// Mirroring the Tailwind colors and spacing from tailwindMapper
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

const SPACING_SCALE: Record<string, number> = {
  '0': 0, '0.5': 0.125, '1': 0.25, '1.5': 0.375, '2': 0.5, '2.5': 0.625, '3': 0.75, '3.5': 0.875,
  '4': 1, '5': 1.25, '6': 1.5, '7': 1.75, '8': 2, '9': 2.25, '10': 2.5, '11': 2.75, '12': 3,
  '14': 3.5, '16': 4, '20': 5, '24': 6, '28': 7, '32': 8, '36': 9, '40': 10, '44': 11, '48': 12,
  '52': 13, '56': 14, '60': 15, '64': 16, '72': 18, '80': 20, '96': 24
};

const BORDER_RADIUS_MAP: Record<string, string> = {
  'none': '0px', 'sm': '0.125rem', '': '0.25rem', 'md': '0.375rem', 'lg': '0.5rem',
  'xl': '0.75rem', '2xl': '1rem', '3xl': '1.5rem', 'full': '9999px'
};

const FONT_SIZE_MAP: Record<string, { size: string, lh: string }> = {
  'xs': { size: '0.75rem', lh: '1rem' },
  'sm': { size: '0.875rem', lh: '1.25rem' },
  'base': { size: '1rem', lh: '1.5rem' },
  'lg': { size: '1.125rem', lh: '1.75rem' },
  'xl': { size: '1.25rem', lh: '1.75rem' },
  '2xl': { size: '1.5rem', lh: '2rem' },
  '3xl': { size: '1.875rem', lh: '2.25rem' },
  '4xl': { size: '2.25rem', lh: '2.5rem' },
  '5xl': { size: '3rem', lh: '1' },
  '6xl': { size: '3.75rem', lh: '1' },
  '7xl': { size: '4.5rem', lh: '1' },
  '8xl': { size: '6rem', lh: '1' },
  '9xl': { size: '8rem', lh: '1' }
};

const FONT_WEIGHT_MAP: Record<string, string> = {
  'thin': '100', 'extralight': '200', 'light': '300', 'normal': '400',
  'medium': '500', 'semibold': '600', 'bold': '700', 'extrabold': '800', 'black': '900'
};

const SHADOW_MAP: Record<string, string> = {
  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  'none': 'none'
};

// Static mappings back to CSS
const REVERSE_STATIC_MAPS: Record<string, CSSDecl[]> = {
  // display
  'block': [{ property: 'display', value: 'block' }],
  'inline-block': [{ property: 'display', value: 'inline-block' }],
  'inline': [{ property: 'display', value: 'inline' }],
  'flex': [{ property: 'display', value: 'flex' }],
  'inline-flex': [{ property: 'display', value: 'inline-flex' }],
  'grid': [{ property: 'display', value: 'grid' }],
  'inline-grid': [{ property: 'display', value: 'inline-grid' }],
  'hidden': [{ property: 'display', value: 'none' }],
  'contents': [{ property: 'display', value: 'contents' }],
  'flow-root': [{ property: 'display', value: 'flow-root' }],
  // position
  'static': [{ property: 'position', value: 'static' }],
  'fixed': [{ property: 'position', value: 'fixed' }],
  'absolute': [{ property: 'position', value: 'absolute' }],
  'relative': [{ property: 'position', value: 'relative' }],
  'sticky': [{ property: 'position', value: 'sticky' }],
  // text alignment
  'text-left': [{ property: 'text-align', value: 'left' }],
  'text-center': [{ property: 'text-align', value: 'center' }],
  'text-right': [{ property: 'text-align', value: 'right' }],
  'text-justify': [{ property: 'text-align', value: 'justify' }],
  'text-start': [{ property: 'text-align', value: 'start' }],
  'text-end': [{ property: 'text-align', value: 'end' }],
  // font style
  'italic': [{ property: 'font-style', value: 'italic' }],
  'not-italic': [{ property: 'font-style', value: 'normal' }],
  // text decoration
  'underline': [{ property: 'text-decoration-line', value: 'underline' }],
  'line-through': [{ property: 'text-decoration-line', value: 'line-through' }],
  'no-underline': [{ property: 'text-decoration-line', value: 'none' }],
  // text transform
  'uppercase': [{ property: 'text-transform', value: 'uppercase' }],
  'lowercase': [{ property: 'text-transform', value: 'lowercase' }],
  'capitalize': [{ property: 'text-transform', value: 'capitalize' }],
  'normal-case': [{ property: 'text-transform', value: 'none' }],
  // cursor
  'cursor-auto': [{ property: 'cursor', value: 'auto' }],
  'cursor-default': [{ property: 'cursor', value: 'default' }],
  'cursor-pointer': [{ property: 'cursor', value: 'pointer' }],
  'cursor-wait': [{ property: 'cursor', value: 'wait' }],
  'cursor-text': [{ property: 'cursor', value: 'text' }],
  'cursor-move': [{ property: 'cursor', value: 'move' }],
  'cursor-help': [{ property: 'cursor', value: 'help' }],
  'cursor-not-allowed': [{ property: 'cursor', value: 'not-allowed' }],
  // user-select
  'select-none': [{ property: 'user-select', value: 'none' }],
  'select-text': [{ property: 'user-select', value: 'text' }],
  'select-all': [{ property: 'user-select', value: 'all' }],
  'select-auto': [{ property: 'user-select', value: 'auto' }],
  // box-sizing
  'box-border': [{ property: 'box-sizing', value: 'border-box' }],
  'box-content': [{ property: 'box-sizing', value: 'content-box' }],
  // pointer-events
  'pointer-events-none': [{ property: 'pointer-events', value: 'none' }],
  'pointer-events-auto': [{ property: 'pointer-events', value: 'auto' }]
};

const BREAKPOINTS: Record<string, string> = {
  'sm': '648px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px'
};

const PSEUDO_CLASSES: Record<string, string> = {
  'hover': ':hover',
  'focus': ':focus',
  'active': ':active',
  'disabled': ':disabled',
  'visited': ':visited',
  'first': ':first-child',
  'last': ':last-child',
  'odd': ':nth-child(odd)',
  'even': ':nth-child(even)',
  'focus-within': ':focus-within',
  'focus-visible': ':focus-visible'
};

/**
 * Resolves spacing scale key (standard or arbitrary) into pixel/rem/percent values
 */
function resolveSpacingValue(key: string): string {
  // Arbitrary check e.g. [17px], [calc(100%-10px)]
  if (key.startsWith('[') && key.endsWith(']')) {
    return key.substring(1, key.length - 1).replace(/_/g, ' ');
  }

  if (SPACING_SCALE[key] !== undefined) {
    const val = SPACING_SCALE[key];
    if (val === 0) return '0';
    return `${val}rem`;
  }

  // Percentage or fractions
  if (key.includes('/')) {
    const parts = key.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den)) {
        return `${((num / den) * 100).toFixed(4)}%`;
      }
    }
  }

  return key;
}

/**
 * Resolves color scale key (standard or arbitrary) into hex/rgb/standard CSS values
 */
function resolveColorValue(colorKey: string): string {
  if (colorKey.startsWith('[') && colorKey.endsWith(']')) {
    return colorKey.substring(1, colorKey.length - 1).replace(/_/g, ' ');
  }

  // Format can be "blue-500", "slate-200", etc.
  const parts = colorKey.split('-');
  if (parts.length >= 2) {
    const weight = parts[parts.length - 1];
    const name = parts.slice(0, parts.length - 1).join('-');
    if (TAILWIND_COLORS[name] && TAILWIND_COLORS[name][weight]) {
      return TAILWIND_COLORS[name][weight];
    }
  }

  if (colorKey === 'white') return '#ffffff';
  if (colorKey === 'black') return '#000000';
  if (colorKey === 'transparent') return 'transparent';

  return colorKey;
}

/**
 * Converts a single Tailwind utility class to CSS declarations
 */
export function convertSingleTailwindClass(twClass: string): CSSDecl[] {
  let isImportant = false;
  let cleanClass = twClass;
  
  if (twClass.endsWith('!')) {
    isImportant = true;
    cleanClass = twClass.substring(0, twClass.length - 1);
  } else if (twClass.startsWith('!')) {
    isImportant = true;
    cleanClass = twClass.substring(1);
  }

  const formatDecl = (prop: string, val: string): CSSDecl => {
    return { property: prop, value: val + (isImportant ? ' !important' : '') };
  };

  // 1. Raw Arbitrary CSS Injection `[clip-path:circle(50%)]` -> `clip-path: circle(50%)`
  if (cleanClass.startsWith('[') && cleanClass.endsWith(']') && cleanClass.includes(':')) {
    const rawInner = cleanClass.substring(1, cleanClass.length - 1);
    const colIdx = rawInner.indexOf(':');
    const property = rawInner.substring(0, colIdx).trim();
    const value = rawInner.substring(colIdx + 1).trim().replace(/_/g, ' ');
    if (property && value) {
      return [formatDecl(property, value)];
    }
  }

  // 2. Static Mappings Check
  if (REVERSE_STATIC_MAPS[cleanClass]) {
    return REVERSE_STATIC_MAPS[cleanClass].map(d => formatDecl(d.property, d.value));
  }

  // 3. Spacing patterns (m, p, gap, w, h, offset)
  // Margins
  let match = cleanClass.match(/^m([xytrbl])?-(.*)$/);
  if (match) {
    const dir = match[1];
    const val = resolveSpacingValue(match[2]);
    if (!dir) return [formatDecl('margin', val)];
    if (dir === 'x') return [formatDecl('margin-left', val), formatDecl('margin-right', val)];
    if (dir === 'y') return [formatDecl('margin-top', val), formatDecl('margin-bottom', val)];
    if (dir === 't') return [formatDecl('margin-top', val)];
    if (dir === 'b') return [formatDecl('margin-bottom', val)];
    if (dir === 'l') return [formatDecl('margin-left', val)];
    if (dir === 'r') return [formatDecl('margin-right', val)];
  }

  // Paddings
  match = cleanClass.match(/^p([xytrbl])?-(.*)$/);
  if (match) {
    const dir = match[1];
    const val = resolveSpacingValue(match[2]);
    if (!dir) return [formatDecl('padding', val)];
    if (dir === 'x') return [formatDecl('padding-left', val), formatDecl('padding-right', val)];
    if (dir === 'y') return [formatDecl('padding-top', val), formatDecl('padding-bottom', val)];
    if (dir === 't') return [formatDecl('padding-top', val)];
    if (dir === 'b') return [formatDecl('padding-bottom', val)];
    if (dir === 'l') return [formatDecl('padding-left', val)];
    if (dir === 'r') return [formatDecl('padding-right', val)];
  }

  // Width & Height
  match = cleanClass.match(/^w-(.*)$/);
  if (match) {
    const val = resolveSpacingValue(match[1]);
    if (val === 'screen') return [formatDecl('width', '100vw')];
    if (val === 'auto') return [formatDecl('width', 'auto')];
    return [formatDecl('width', val)];
  }
  match = cleanClass.match(/^h-(.*)$/);
  if (match) {
    const val = resolveSpacingValue(match[1]);
    if (val === 'screen') return [formatDecl('height', '100vh')];
    if (val === 'auto') return [formatDecl('height', 'auto')];
    return [formatDecl('height', val)];
  }

  // Position offsets
  match = cleanClass.match(/^(top|bottom|left|right)-(.*)$/);
  if (match) {
    const dir = match[1];
    const val = resolveSpacingValue(match[2]);
    return [formatDecl(dir, val)];
  }

  // Gaps
  match = cleanClass.match(/^gap-(.*)$/);
  if (match) return [formatDecl('gap', resolveSpacingValue(match[1]))];
  match = cleanClass.match(/^gap-x-(.*)$/);
  if (match) return [formatDecl('column-gap', resolveSpacingValue(match[1]))];
  match = cleanClass.match(/^gap-y-(.*)$/);
  if (match) return [formatDecl('row-gap', resolveSpacingValue(match[1]))];

  // 4. Color pattern mappings (bg, text, border, outline)
  // Opacity helper checker for bg-blue-500/20
  const parseColorAndOpacity = (colorStr: string): { color: string, opacity?: string } => {
    const opacityMatch = colorStr.split('/');
    if (opacityMatch.length === 2) {
      const colorVal = resolveColorValue(opacityMatch[0]);
      const opacityVal = opacityMatch[1];
      let cleanOpacity = opacityVal;
      if (opacityVal.startsWith('[') && opacityVal.endsWith(']')) {
        cleanOpacity = opacityVal.substring(1, opacityVal.length - 1);
      } else {
        // standard percentage
        const parsedOpacity = parseFloat(opacityVal);
        if (!isNaN(parsedOpacity)) {
          cleanOpacity = (parsedOpacity / 100).toString();
        }
      }
      return { color: colorVal, opacity: cleanOpacity };
    }
    return { color: resolveColorValue(colorStr) };
  };

  match = cleanClass.match(/^bg-(.*)$/);
  if (match) {
    const { color, opacity } = parseColorAndOpacity(match[1]);
    if (opacity) {
      const parsed = parseColor(color);
      if (parsed) {
        return [formatDecl('background-color', `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${opacity})`)];
      }
    }
    return [formatDecl('background-color', color)];
  }

  match = cleanClass.match(/^text-(.*)$/);
  if (match) {
    const val = match[1];
    // Size check first: "text-sm", "text-xl", etc.
    if (FONT_SIZE_MAP[val]) {
      return [
        formatDecl('font-size', FONT_SIZE_MAP[val].size),
        formatDecl('line-height', FONT_SIZE_MAP[val].lh)
      ];
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      const sizeVal = val.substring(1, val.length - 1);
      if (sizeVal.includes('px') || sizeVal.includes('rem') || sizeVal.includes('em')) {
        return [formatDecl('font-size', sizeVal)];
      }
    }
    // Color mapping
    const { color, opacity } = parseColorAndOpacity(val);
    if (opacity) {
      const parsed = parseColor(color);
      if (parsed) {
        return [formatDecl('color', `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${opacity})`)];
      }
    }
    return [formatDecl('color', color)];
  }

  match = cleanClass.match(/^border-(.*)$/);
  if (match) {
    const val = match[1];
    // Border style
    if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(val)) {
      return [formatDecl('border-style', val)];
    }
    // Border width: check if spacing key
    if (SPACING_SCALE[val] !== undefined || val.startsWith('[')) {
      return [formatDecl('border-width', resolveSpacingValue(val))];
    }
    // Border color
    const { color, opacity } = parseColorAndOpacity(val);
    if (opacity) {
      const parsed = parseColor(color);
      if (parsed) {
        return [formatDecl('border-color', `rgba(${parsed.r}, ${parsed.g}, ${parsed.b}, ${opacity})`)];
      }
    }
    return [formatDecl('border-color', color)];
  }
  // Border base check `border`
  if (cleanClass === 'border') {
    return [formatDecl('border-width', '1px')];
  }

  // Outline
  match = cleanClass.match(/^outline-(.*)$/);
  if (match) {
    const val = match[1];
    if (['solid', 'dashed', 'dotted', 'double', 'none'].includes(val)) {
      return [formatDecl('outline-style', val)];
    }
    if (SPACING_SCALE[val] !== undefined || val.startsWith('[')) {
      return [formatDecl('outline-width', resolveSpacingValue(val))];
    }
    const { color } = parseColorAndOpacity(val);
    return [formatDecl('outline-color', color)];
  }

  // 5. Border Radius
  match = cleanClass.match(/^rounded-(.*)$/);
  if (match) {
    const val = match[1];
    if (BORDER_RADIUS_MAP[val]) {
      return [formatDecl('border-radius', BORDER_RADIUS_MAP[val])];
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      return [formatDecl('border-radius', val.substring(1, val.length - 1))];
    }
  }
  if (cleanClass === 'rounded') {
    return [formatDecl('border-radius', '0.25rem')];
  }

  // 6. Typography helpers (weight, line height, styles)
  match = cleanClass.match(/^font-(.*)$/);
  if (match) {
    const val = match[1];
    if (FONT_WEIGHT_MAP[val]) {
      return [formatDecl('font-weight', FONT_WEIGHT_MAP[val])];
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      return [formatDecl('font-weight', val.substring(1, val.length - 1))];
    }
  }

  match = cleanClass.match(/^leading-(.*)$/);
  if (match) {
    const val = match[1];
    const lhMap: Record<string, string> = {
      'none': '1', 'tight': '1.25', 'snug': '1.375', 'normal': '1.5', 'relaxed': '1.625', 'loose': '2'
    };
    if (lhMap[val]) {
      return [formatDecl('line-height', lhMap[val])];
    }
    return [formatDecl('line-height', resolveSpacingValue(val))];
  }

  // 7. Box Shadow
  match = cleanClass.match(/^shadow-(.*)$/);
  if (match) {
    const val = match[1];
    if (SHADOW_MAP[val]) {
      return [formatDecl('box-shadow', SHADOW_MAP[val])];
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      return [formatDecl('box-shadow', val.substring(1, val.length - 1).replace(/_/g, ' '))];
    }
  }
  if (cleanClass === 'shadow') {
    return [formatDecl('box-shadow', SHADOW_MAP[''])];
  }

  // 8. Opacity
  match = cleanClass.match(/^opacity-(.*)$/);
  if (match) {
    const val = match[1];
    let opacityVal = val;
    if (val.startsWith('[') && val.endsWith(']')) {
      opacityVal = val.substring(1, val.length - 1);
    } else {
      const parsed = parseFloat(val);
      if (!isNaN(parsed)) {
        opacityVal = (parsed / 100).toString();
      }
    }
    return [formatDecl('opacity', opacityVal)];
  }

  // 9. Flexbox specific
  if (cleanClass === 'flex-grow') return [formatDecl('flex-grow', '1')];
  if (cleanClass === 'flex-grow-0') return [formatDecl('flex-grow', '0')];
  if (cleanClass === 'flex-shrink') return [formatDecl('flex-shrink', '1')];
  if (cleanClass === 'flex-shrink-0') return [formatDecl('flex-shrink', '0')];
  match = cleanClass.match(/^basis-(.*)$/);
  if (match) return [formatDecl('flex-basis', resolveSpacingValue(match[1]))];

  // Grid Template
  match = cleanClass.match(/^grid-cols-(\d+)$/);
  if (match) return [formatDecl('grid-template-columns', `repeat(${match[1]}, minmax(0, 1fr))`)];
  match = cleanClass.match(/^grid-rows-(\d+)$/);
  if (match) return [formatDecl('grid-template-rows', `repeat(${match[1]}, minmax(0, 1fr))`)];

  return [];
}

/**
 * Main reverse conversion logic. Parses classes, extracts hover states, screen width breakpoints,
 * and compiles them into CSS rule blocks.
 */
export function convertTailwindToCss(tailwindClassesString: string): SelectorBlock[] {
  const tokens = tailwindClassesString.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  // Group declarations by their exact modifier stack
  // e.g. "base" -> list of decls
  // "hover" -> list of decls
  // "media:md" -> list of decls
  // "media:md:hover" -> list of decls
  const baseDecls: CSSDecl[] = [];
  const modifierGroups: Record<string, { breakpoint?: string, pseudo?: string, decls: CSSDecl[] }> = {};

  for (const token of tokens) {
    // Split modifiers
    const parts = token.split(':');
    const coreClass = parts[parts.length - 1];
    const modifiers = parts.slice(0, parts.length - 1);

    const decls = convertSingleTailwindClass(coreClass + (token.endsWith('!') ? '!' : ''));
    if (decls.length === 0) continue;

    if (modifiers.length === 0) {
      baseDecls.push(...decls);
    } else {
      // Analyze modifiers
      let breakpoint: string | undefined;
      let pseudo: string | undefined;
      const otherModifiers: string[] = [];

      for (const mod of modifiers) {
        if (BREAKPOINTS[mod]) {
          breakpoint = mod;
        } else if (PSEUDO_CLASSES[mod]) {
          pseudo = PSEUDO_CLASSES[mod];
        } else {
          otherModifiers.push(mod);
        }
      }

      // Create a key identifier for this modifier combination
      const keyParts = [];
      if (breakpoint) keyParts.push(`media-${breakpoint}`);
      if (pseudo) keyParts.push(`pseudo-${pseudo}`);
      if (otherModifiers.length > 0) keyParts.push(`other-${otherModifiers.join('-')}`);
      
      const groupKey = keyParts.join(':') || 'base';

      if (groupKey === 'base') {
        baseDecls.push(...decls);
      } else {
        if (!modifierGroups[groupKey]) {
          modifierGroups[groupKey] = {
            breakpoint: breakpoint ? BREAKPOINTS[breakpoint] : undefined,
            pseudo: pseudo,
            decls: []
          };
        }
        modifierGroups[groupKey].decls.push(...decls);
      }
    }
  }

  // Compile grouped declarations into structured blocks
  const blocks: SelectorBlock[] = [];

  // Add base selector block if there are base styles
  if (baseDecls.length > 0) {
    blocks.push({
      selector: '.element',
      declarations: baseDecls
    });
  }

  // Sort groups so selectors are compiled in logical order (non-responsive before responsive)
  const sortedGroupKeys = Object.keys(modifierGroups).sort((a, b) => {
    const aHasMedia = a.includes('media-');
    const bHasMedia = b.includes('media-');
    if (aHasMedia && !bHasMedia) return 1;
    if (!aHasMedia && bHasMedia) return -1;
    return a.localeCompare(b);
  });

  for (const key of sortedGroupKeys) {
    const group = modifierGroups[key];
    let selector = '.element';
    
    if (group.pseudo) {
      selector += group.pseudo;
    }

    if (group.breakpoint) {
      // Nested format representation for display
      selector = `@media (min-width: ${group.breakpoint}) {\n  ${selector}`;
    }

    blocks.push({
      selector,
      declarations: group.decls
    });
  }

  return blocks;
}

/**
 * Formats SelectorBlock array into a pretty CSS string
 */
export function formatCssBlocks(blocks: SelectorBlock[]): string {
  let css = '';
  for (const block of blocks) {
    const isMedia = block.selector.startsWith('@media');
    const indent = isMedia ? '    ' : '  ';
    
    const declsStr = block.declarations
      .map(d => `${indent}${d.property}: ${d.value};`)
      .join('\n');

    if (isMedia) {
      css += `${block.selector} {\n${declsStr}\n  }\n}\n\n`;
    } else {
      css += `${block.selector} {\n${declsStr}\n}\n\n`;
    }
  }
  return css.trim();
}
