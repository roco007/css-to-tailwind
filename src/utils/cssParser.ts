export interface CSSDeclaration {
  property: string;
  value: string;
  important: boolean;
}

export interface CSSRule {
  selector: string;
  declarations: CSSDeclaration[];
}

/**
 * Strips CSS comments (/* ... * /) from code
 */
function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Parses a single declaration line (e.g., "margin: 10px !important")
 */
export function parseDeclaration(declStr: string): CSSDeclaration | null {
  const parts = declStr.split(':');
  if (parts.length < 2) return null;

  const property = parts[0].trim().toLowerCase();
  // Join the rest in case values contain colons (e.g., urls, rgb, data-uris)
  let value = parts.slice(1).join(':').trim();

  if (!property || !value) return null;

  const important = value.endsWith('!important');
  if (important) {
    value = value.substring(0, value.length - 10).trim();
  }

  // Remove trailing semicolon if present
  if (value.endsWith(';')) {
    value = value.substring(0, value.length - 1).trim();
  }

  return { property, value, important };
}

/**
 * Parses inline CSS declarations (e.g., "margin: 10px; color: red;")
 */
export function parseInlineCSS(css: string): CSSDeclaration[] {
  const cleanCss = stripComments(css);
  const declarations: CSSDeclaration[] = [];

  const lines = cleanCss.split(';');
  for (const line of lines) {
    const cleanLine = line.trim();
    if (!cleanLine) continue;

    const decl = parseDeclaration(cleanLine);
    if (decl) {
      declarations.push(decl);
    }
  }

  return declarations;
}

/**
 * Main parser entry point. Detects if input contains selectors or is purely inline styles.
 */
export function parseCSS(css: string): CSSRule[] {
  const cleanCss = stripComments(css).trim();
  if (!cleanCss) return [];

  // Check if the input contains selector blocks
  if (!cleanCss.includes('{')) {
    // Treat as pure inline styles
    const declarations = parseInlineCSS(cleanCss);
    return [{ selector: 'element', declarations }];
  }

  const rules: CSSRule[] = [];
  
  // A simple regex-free stateful bracket parser for robust block matching
  let index = 0;
  while (index < cleanCss.length) {
    const openBrace = cleanCss.indexOf('{', index);
    if (openBrace === -1) break;

    const selector = cleanCss.substring(index, openBrace).trim();
    const closeBrace = cleanCss.indexOf('}', openBrace);
    if (closeBrace === -1) {
      // Unclosed brace, parse the rest as declarations for this selector
      const body = cleanCss.substring(openBrace + 1).trim();
      const declarations = parseInlineCSS(body);
      rules.push({ selector: selector || 'element', declarations });
      break;
    }

    const body = cleanCss.substring(openBrace + 1, closeBrace).trim();
    const declarations = parseInlineCSS(body);
    rules.push({ selector: selector || 'element', declarations });

    index = closeBrace + 1;
  }

  return rules;
}
