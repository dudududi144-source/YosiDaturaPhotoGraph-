import siteData from '../data/site.json';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div id="heroBg" className="parallax-bg absolute inset-0 hero-atmosphere"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-darker via-transparent to-darker"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-darker via-transparent to-darker"></div>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-32">
        <div className="hero-anim font-mono text-[10px] md:text-xs tracking-[0.35em] text-gold mb-6 md:mb-8">
          PHOTOGRAPHY ARTIST // 2015—2025
        </div>
        <h1 className="hero-title font-display font-black text-white mb-6 md:mb-8">
          <span className="hero-anim block">YOSI</span>
          <span className="hero-anim block text-stroke glitch" data-text="DATURA">DATURA</span>
        </h1>
        <p className="hero-anim font-mono text-sm md:text-base text-white/60 max-w-xl leading-relaxed">
          Fashion &amp; Conceptual Photography. Exploring the thin line between the aesthetic
          and the provocative. The harmony of light, form, and raw emotion.
        </p>
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
