/** Generates an elegant SVG placeholder — the site NEVER shows a broken image.
 *  Input is sanitized so no label/accent can inject markup. */
export function generatePlaceholder(label, accent = '#D4AF37') {
  const safeLabel = String(label || 'YOSI DATURA')
    .slice(0, 22)
    .toUpperCase()
    .replace(/[<>&"']/g, '');
  const safeAccent = /^#[0-9A-Fa-f]{3,8}$/.test(accent) ? accent : '#D4AF37';
  const svg =
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'>" +
    "<rect width='800' height='1000' fill='#0a0a0a'/>" +
    "<circle cx='400' cy='420' r='300' fill='" + safeAccent + "' opacity='0.08'/>" +
    "<text x='400' y='480' font-family='monospace' font-size='34' fill='" + safeAccent + "' text-anchor='middle' letter-spacing='6'>" + safeLabel + "</text>" +
    "<text x='400' y='540' font-family='monospace' font-size='16' fill='#555' text-anchor='middle' letter-spacing='4'>YOSI DATURA</text>" +
    "</svg>";
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
