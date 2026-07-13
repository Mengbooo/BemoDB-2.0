/**
 * Remark plugin: renders ```d2 and ```mermaid code blocks to inline SVG via Kroki API.
 */
import type { Root } from 'mdast';

const KROKI_BASE = 'https://kroki.io';

const ENDPOINT: Record<string, string> = {
  d2: 'd2/svg',
  mermaid: 'mermaid/svg',
};

// Kroki renders with default light theme.
// Dark mode: CSS invert(1) flips black↔white.
// Light mode: native rendering, no filter.
const STYLE = [
  '<style>',
  '  .kroki-diagram { margin: 1.5rem 0; padding: 1rem; overflow-x: auto; border: 1px solid #333; border-radius: 6px; background: #fff; display:flex; justify-content:center; }',
  '  .kroki-diagram svg { max-width: 100%; height: auto; filter: saturate(0); }',
  '  /* Dark mode: invert to black-box-white-text */',
  '  [data-theme="dark"] .kroki-diagram { background: #000; border-color: #555; }',
  '  [data-theme="dark"] .kroki-diagram svg { filter: saturate(0) invert(1); }',
  '  .dark .kroki-diagram { background: #000; border-color: #555; }',
  '  .dark .kroki-diagram svg { filter: saturate(0) invert(1); }',
  '</style>',
].join('\n');

export default function remarkD2() {
  let styleInjected = false;

  return async function transformer(tree: Root) {
    const jobs: { node: any; parent: any; lang: string }[] = [];

    function find(node: any, parent: any) {
      if (node.type === 'code' && ENDPOINT[node.lang || '']) {
        jobs.push({ node, parent, lang: node.lang! });
      }
      if (node.children) node.children.forEach((c: any) => find(c, node));
    }
    find(tree, null as any);

    if (jobs.length === 0) return;

    for (const { node, parent, lang } of jobs) {
      try {
        const resp = await fetch(`${KROKI_BASE}/${ENDPOINT[lang]}`, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: node.value as string,
        });
        if (!resp.ok) {
          console.warn(`[remark-d2] Kroki ${lang} returned ${resp.status}, keeping code block`);
          continue;
        }
        const svg = await resp.text();

        const html = (styleInjected ? '' : STYLE) +
          `<div class="kroki-diagram">${svg}</div>`;
        styleInjected = true;

        const htmlNode = { type: 'html' as const, value: html };
        const idx = parent.children.indexOf(node);
        if (idx !== -1) parent.children[idx] = htmlNode;
      } catch (e: any) {
        console.warn(`[remark-d2] ${lang} error: ${e.message}`);
      }
    }
  };
}
