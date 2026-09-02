import siteData from '../data/site.json';
import { asset } from '../utils/assets.js';

export default function InstagramFeed() {
  const ig = siteData.instagram;

  return (
    <section
      id="feed"
      className="py-24 md:py-40 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-darker"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 2000px' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Profile header — IG-native language, cinematic execution */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12 md:mb-16 reveal">
          <div className="ig-ring w-24 h-24 md:w-28 md:h-28 shrink-0">
            <img src={asset(ig.avatar)} alt={`${ig.handle} profile`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="section-number mb-3" style={{ color: '#dc2743' }}>06 / THE FEED</div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h2 className="font-display text-4xl md:text-6xl font-black ig-gradient-text">@{ig.handle}</h2>
              <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 border border-white/15 px-3 py-1">
                {ig.followers} FOLLOWERS
              </span>
            </div>
            <p className="font-mono text-sm text-white/60 mt-4 leading-relaxed">
              {ig.bio} — <span className="text-white/80 italic font-display text-base">"{ig.quote}"</span>
            </p>
            <p className="font-mono text-xs text-white/40 mt-1">{ig.sub}</p>
          </div>
          <a href={ig.url} target="_blank" rel="noopener noreferrer" className="follow-btn reveal" aria-label={`Follow @${ig.handle} on Instagram`}>
            FOLLOW →
          </a>
        </div>

        {/* Curated best-of grid — the six most sellable frames */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 reveal">
          {ig.tiles.map((tile) => (
            <a
              key={tile.label}
              href={ig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-tile aspect-square"
              aria-label={`${tile.label} — view on Instagram`}
            >
              <img src={asset(tile.img)} alt={tile.label} loading="lazy" decoding="async" />
              <div className="ig-tile-overlay">
                <div className="font-mono text-[10px] tracking-[0.2em] text-white/90">{tile.label}</div>
                <div className="font-mono text-[10px] text-white/50 mt-1">VIEW ON INSTAGRAM ↗</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center reveal">
          <p className="font-mono text-[10px] tracking-[0.3em] text-white/30">
            NEW WORK DROPS WEEKLY — BEHIND THE SCENES ON STORIES
          </p>
        </div>
      </div>
    </section>
  );
}
