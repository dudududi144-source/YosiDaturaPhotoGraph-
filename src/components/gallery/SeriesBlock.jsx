import { renderLayout } from './layouts.js';

export default function SeriesBlock({ series, isLast = false }) {
  const accentClass = series.accentClass || 'text-gold';

  return (
    <article className={isLast ? '' : 'mb-24 md:mb-40'} aria-label={`Series ${series.num}: ${series.title} ${series.titleAccent || ''}`}>
      <div className="flex items-end justify-between mb-8 md:mb-12 flex-wrap gap-4">
        <div>
          <div className={`font-mono text-[10px] tracking-[0.3em] mb-3 reveal ${accentClass}`}>
            SERIES {series.num}
          </div>
          <h3 className="font-display text-4xl md:text-6xl font-bold reveal">
            {series.title} <span className={accentClass}>{series.titleAccent}</span>
            {series.titleTail || ''}
          </h3>
        </div>
        <p className="font-mono text-xs text-white/40 max-w-md md:text-right leading-relaxed reveal">
          {series.desc}
        </p>
      </div>
      <div className="reveal">{renderLayout(series, series.accent, accentClass)}</div>
    </article>
  );
}
