import siteData from '../data/site.json';

export default function Marquee() {
  const items = siteData.marqueeItems;

  return (
    <div className="marquee py-6 md:py-8 border-y border-white/5 overflow-hidden" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8 md:gap-12 px-6 whitespace-nowrap">
            {items.map((item, i) => (
              <span key={i} className="flex items-center gap-8 md:gap-12">
                <span className={`font-display text-5xl md:text-8xl font-black ${i % 2 === 0 ? 'text-stroke' : 'text-white/10'}`}>
                  {item}
                </span>
                <span className="text-gold text-2xl md:text-4xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
