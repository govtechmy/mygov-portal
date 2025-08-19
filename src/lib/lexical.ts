export function lexicalToPlainText(value: unknown): string {
  if (!value || typeof value !== 'object') return '';

  const parts: string[] = [];

  const visit = (node: unknown) => {
    if (!node) return;
    if (Array.isArray(node)) {
      for (const child of node) visit(child);
      return;
    }
    if (typeof node !== 'object') return;

    const obj = node as Record<string, unknown>;

    // Push text nodes
    if (typeof obj.text === 'string') {
      parts.push(obj.text);
    }

    // Handle explicit line breaks
    if (obj.type === 'linebreak') {
      parts.push('\n');
    }

    // Recurse into children if present
    if (obj.children) {
      visit(obj.children);
    }

    // Add paragraph/heading/list boundaries as newlines for readability
    if (
      obj.type === 'paragraph' ||
      (typeof obj.type === 'string' && obj.type.startsWith('heading')) ||
      obj.type === 'list' ||
      obj.type === 'listitem'
    ) {
      parts.push('\n');
    }
  };

  // Lexical payload commonly nests under `root`
  const root = (value as Record<string, unknown>).root ?? value;
  visit(root);

  // Normalize whitespace and trim
  const text = parts
    .join('')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return text;
}
