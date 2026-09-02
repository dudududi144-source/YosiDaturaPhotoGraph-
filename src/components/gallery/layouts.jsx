import GalleryFrame from './GalleryFrame.jsx';

function F({ frame, series, accent, accentClass, className = '' }) {
  return (
    <GalleryFrame frame={frame} series={series} accent={accent} accentClass={accentClass} className={className} />
  );
}

/**
 * LAYOUT REGISTRY — pure map: layout id → grid JSX.
 * New layout? Add one entry here. New series? Edit gallery.json only.
 * Zero coupling, infinite scale.
 */
export const LAYOUTS = {
  'triptych-staggered': (s, accent, accentClass) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {s.frames.map((f) => (
        <F key={f.id} frame={f} series={s} accent={accent} accentClass={accentClass} />
      ))}
    </div>
  ),

  'triptych-staggered-inv': (s, accent, accentClass) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {s.frames.map((f) => (
        <F key={f.id} frame={f} series={s} accent={accent} accentClass={accentClass} />
      ))}
    </div>
  ),

  'hero-side-duo': (s, accent, accentClass) => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <F frame={s.frames[0]} series={s} accent={accent} accentClass={accentClass} className="md:col-span-3 md:min-h-[620px]" />
      <div className="md:col-span-2 grid grid-cols-1 gap-4">
        <F frame={s.frames[1]} series={s} accent={accent} accentClass={accentClass} className="md:min-h-[300px]" />
        <F frame={s.frames[2]} series={s} accent={accent} accentClass={accentClass} className="md:min-h-[300px]" />
      </div>
    </div>
  ),

  'duo-side-hero': (s, accent, accentClass) => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="md:col-span-2 grid grid-cols-1 gap-4">
        <F frame={s.frames[0]} series={s} accent={accent} accentClass={accentClass} className="md:min-h-[300px]" />
        <F frame={s.frames[1]} series={s} accent={accent} accentClass={accentClass} className="md:min-h-[300px]" />
      </div>
      <F frame={s.frames[2]} series={s} accent={accent} accentClass={accentClass} className="md:col-span-3 md:min-h-[620px]" />
    </div>
  ),

  'diptych-staggered': (s, accent, accentClass) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl">
      {s.frames.map((f) => (
        <F key={f.id} frame={f} series={s} accent={accent} accentClass={accentClass} />
      ))}
    </div>
  ),

  'full-bleed': (s, accent, accentClass) => (
    <F frame={s.frames[0]} series={s} accent={accent} accentClass={accentClass} />
  ),
};

export function renderLayout(series, accent, accentClass) {
  const layout = LAYOUTS[series.layout] || LAYOUTS['triptych-staggered'];
  return layout(series, accent, accentClass);
}
