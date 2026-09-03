import galleryData from '../data/gallery.json';
import { asset } from '../utils/assets.js';

const PORTAL_IMG = {
  runway: 'y/desert-1.jpg',
  darkroom: 'y/silent-1.jpg',
  casting: 'y/azure-2.jpg',
  studio: 'y/studio-1.jpg',
};

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
            <img src={asset(PORTAL_IMG[portal.id] || portal.img)} alt="" loading="lazy" decoding="async"
              className="portal-img absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-60 group-hover:opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10"></div>
            <div className="absolute top-6 right-6 font-display text-7xl md:text-8xl font-black text-white/10 group-hover:text-white/20 transition-colors duration-500 z-[1]" aria-hidden="true">
              {portal.num}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-[2]">
              <div className="font-mono text-[10px] tracking-[0.3em] mb-2" style={{ color: portal.accent }}>{portal.num}</div>
              <h3 className="font-display text-3xl md:text-5xl font-bold mb-2">{portal.title}</h3>
              <p className="font-mono text-xs text-white/60">{portal.desc}</p>
            </div>
            <div className="absolute top-6 left-6 font-mono text-xs text-white/40 group-hover:text-gold transition-colors duration-300 z-[2]" aria-hidden="true">→</div>
          </a>
        ))}
      </div>
    </section>
  );
}
