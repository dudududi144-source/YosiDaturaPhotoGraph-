import { useState, useMemo } from 'react';
import modelsData from '../data/models.json';
import SectionHeader from './ui/SectionHeader.jsx';
import { generatePlaceholder } from '../utils/imageFallback.js';
import { asset } from '../utils/assets.js';

export default function Casting() {
  const [filter, setFilter] = useState('ALL');
  const [query, setQuery] = useState('');

  // Hardened filter pipeline — tolerates missing/undefined fields on any model.
  // Adding a model with incomplete data will never crash the directory.
  const visible = useMemo(() => {
    const f = filter.toLowerCase();
    const q = query.trim().toLowerCase();
    return modelsData.models.filter((m) => {
      const matchFilter = f === 'all' || (m.category || []).includes(f);
      const matchQuery =
        !q ||
        (m.name || '').toLowerCase().includes(q) ||
        (m.featured || '').toLowerCase().includes(q) ||
        (m.tags || []).some((t) => (t || '').toLowerCase().includes(q));
      return matchFilter && matchQuery;
    });
  }, [filter, query]);

  const handleError = (accent, name) => (e) => {
    e.currentTarget.src = generatePlaceholder(name, accent);
    e.currentTarget.onerror = null;
  };

  return (
    <section
      id="casting"
      className="py-24 md:py-40 px-6 md:px-12 lg:px-20 border-t border-white/5"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 3000px' }}
    >
      <SectionHeader
        number="04"
        name="CASTING WING"
        heading={['MODEL', 'DATABASE']}
        headingAccent="text-ice"
        numberColor="#00FFFF"
        intro="Visual talent directory. Filter by style, location, and aesthetic. Each card contains polaroids, measurements, and featured series."
      />

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-10 reveal">
        <div className="flex flex-wrap gap-3" role="group" aria-label="Filter models">
          {modelsData.filters.map((flt) => (
            <button
              key={flt}
              className={`filter-btn ${filter === flt ? 'active' : ''}`}
              onClick={() => setFilter(flt)}
              aria-pressed={filter === flt}
            >
              {flt}
            </button>
          ))}
        </div>
        <div className="md:ml-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH NAME / TAG / SERIES..."
            className="form-input !py-2 md:w-64 text-xs"
            aria-label="Search models"
          />
        </div>
      </div>

      <div className="font-mono text-[10px] tracking-[0.25em] text-white/30 mb-6" role="status">
        SHOWING {visible.length} / {modelsData.models.length}
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((model) => (
            <article key={model.id} className="model-card bg-dark border border-white/5 p-6">
              <div className="aspect-[3/4] mb-6 overflow-hidden">
                <img
                  src={asset(model.img)}
                  alt={`Model — ${model.name}`}
                  onError={handleError(model.accent, model.name)}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-mono text-[10px] text-gold mb-2">{model.id}</div>
              <h3 className="font-display text-xl font-bold mb-3">{model.name}</h3>
              <div className="font-mono text-xs text-white/40 mb-4 space-y-1">
                <div>Height: {model.height || '—'}</div>
                <div>Hair: {model.hair || '—'}</div>
                <div>Eyes: {model.eyes || '—'}</div>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {(model.tags || []).map((tag) => (
                  <span key={tag} className="series-tag">{tag}</span>
                ))}
              </div>
              <div className="font-mono text-[10px] text-white/30">Featured: {model.featured || '—'}</div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center font-mono text-sm text-white/30">
          NO MODELS MATCH — TRY A DIFFERENT FILTER
        </div>
      )}
    </section>
  );
}
