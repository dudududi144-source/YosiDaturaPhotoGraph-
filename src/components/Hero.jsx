import siteData from '../data/site.json';
import galleryData from '../data/gallery.json';
import { asset } from '../utils/assets.js';

export default function Hero() {
  const cover = galleryData.hero?.cover;

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {cover && <img src={asset(cover)} alt="" className="hero-cover" loading="eager" decoding="async" />}
        <div className="absolute inset-0 bg-gradient-to-b from-darker/80 via-darker/30 to-darker"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-darker/70 via-transparent to-darker/70"></div>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-32">
        <div className="hero-anim font-mono text-[10px] md:text-xs tracking-[0.35em] text-gold mb-6 md:mb-8">
          PHOTOGRAPHY ARTIST // 2015—2025
        </div>
        <h1 className="hero-title font-display font-black text-white mb-6 md:mb-8">
          <span className="hero-anim block">YOSI</span>
          <span className="hero-anim block text-stroke glitch" data-text="DATURA">DATURA</span>
        </h1>
        <p className="hero-anim font-mono text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
          <span className="text-white/90 font-display italic text-base md:text-lg">"{siteData.quote}"</span>
          <br />
          Fashion &amp; Conceptual Photography — exploring the thin line between the aesthetic
          and the provocative. The harmony of light, form, and raw emotion.
        </p>
        <div className="hero-anim flex flex-wrap gap-4 mt-8 md:mt-10">
          <a href="#studio" className="follow-btn" style={{ borderColor: 'rgba(212,175,55,.7)' }}>BOOK A SHOOT →</a>
          <a href={siteData.contact.instagramUrl} target="_blank" rel="noopener noreferrer"
             className="follow-btn" style={{ borderColor: 'rgba(255,255,255,.25)', background: 'transparent' }}>
            @{siteData.contact.instagram}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" aria-hidden="true">
        <span className="font-mono text-[10px] tracking-[0.35em] text-white/40">SCROLL</span>
        <div className="scroll-line"></div>
      </div>
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 hidden md:block" aria-hidden="true">
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/30" style={{ writingMode: 'vertical-rl' }}>
          {siteData.location.toUpperCase()}
        </span>
      </div>
    </section>
  );
}
