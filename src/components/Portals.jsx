import galleryData from '../data/gallery.json';
import { asset } from '../utils/assets.js';

export default function Portals() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 lg:px-20" aria-label="Portals">
      <div className="mb-12 md:mb-16">
        <div className="section-number reveal">01 / PORTALS</div>
        <h2 className="font-display text-4xl md:text-6xl font-bold mt-4 md:mt-6 reveal">
          ENTER THE<br /><span className="text-gold">ATELIER</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {galleryData.portals.map((portal) => (
          <a key={portal.id} href={`#${portal.id}`} className="portal group block aspect-[4/3] bg-dark"
            aria-label={`Enter ${portal.title} — ${portal.desc}`}>
            {portal.img && (
              <img src={asset(portal.img)} alt="" loading="lazy" decoding="async"
                className="portal-img absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-[2]">
              <div className="font-mono text-[10px] tracking-[0.3em] text-gold mb-2">{portal.num}</div>
              <h3 className="font-display text-3xl md:text-5xl font-bold mb-2">{portal.title}</h3>
              <p className="font-mono text-xs text-white/50">{portal.desc}</p>
            </div>
            <div className="absolute top-6 right-6 font-mono text-xs text-white/30 group-hover:text-gold transition-colors duration-300 z-[2]" aria-hidden="true">→</div>
          </a>
        ))}
      </div>
    </section>
  );
}
