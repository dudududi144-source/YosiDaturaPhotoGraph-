import siteData from '../data/site.json';
import { generatePlaceholder } from '../utils/imageFallback.js';

export default function Artist() {
  const { stats } = siteData;
  const handleError = (e) => {
    e.currentTarget.src = generatePlaceholder('YOSI DATURA', '#D4AF37');
    e.currentTarget.onerror = null;
  };

  return (
    <section
      className="py-24 md:py-40 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-dark"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1500px' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center max-w-7xl mx-auto">
        <figure className="reveal">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src="/assets/artist.jpg"
              alt="Yosi Datura — photographer portrait"
              onError={handleError}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </figure>
        <div className="reveal">
          <div className="section-number mb-4">05 / THE ARTIST</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8">
            YOSI<br /><span className="text-gold">DATURA</span>
          </h2>
          <div className="space-y-6 font-mono text-sm text-white/60 leading-relaxed">
            <p>
              With over a decade of experience behind the lens, I specialize in Fashion and Conceptual
              photography. My work explores the thin line between the aesthetic and the provocative,
              focusing on the harmony of light, form, and raw emotion.
            </p>
            <p>
              Over the last 10 years, I've refined a visual language that balances technical precision
              with an edgy, unapologetic narrative. From high fashion productions to artistic body studies,
              my mission is to capture not just a frame, but an atmosphere.
            </p>
            <p className="text-white/40 text-xs" dir="rtl" lang="he">
              עם למעלה מעשור של ניסיון מאחורי העדשה, אני מתמחה בצילום אופנה וקונספט.
              העבודות שלי חוקרות את ההרמוניה בין אור, גוף האדם ורגש גולמי.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6">
            <div>
              <div className="font-display text-3xl font-bold text-gold">{stats.years}</div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-1">YEARS</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-gold">{stats.series}</div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-1">SERIES</div>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-gold">{stats.visions}</div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-1">VISIONS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
