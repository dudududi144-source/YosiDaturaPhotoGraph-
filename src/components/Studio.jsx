import { useState } from 'react';
import siteData from '../data/site.json';
import { handleBriefSubmit } from '../utils/formHandler.js';

const PROJECT_TYPES = ['Campaign', 'Lookbook', 'Editorial', 'Portrait', 'Conceptual'];
const LOCATIONS = ['Studio', 'Outdoor', 'Beach', 'Desert'];
const BUDGETS = [
  { value: 'basic', label: 'Basic' },
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
];

export default function Studio() {
  const [sent, setSent] = useState(false);
  const { contact, availableFor } = siteData;

  const onSuccess = () => {
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section
      id="studio"
      className="py-24 md:py-40 px-6 md:px-12 lg:px-20 border-t border-white/5"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 2500px' }}
    >
      <div className="mb-16 md:mb-24">
        <div className="section-number reveal">06 / STUDIO</div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-8xl font-black mt-4 md:mt-6 reveal">
          LET'S CREATE<br />THE NEXT <span className="text-gold">STORY</span>
        </h2>
        <p className="font-mono text-sm text-white/50 mt-6 md:mt-8 max-w-2xl leading-relaxed reveal">
          Every frame is a story waiting to be told. I don't just capture images; I capture moments
          that resonate. Let's bring your vision to life.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
        <div className="reveal space-y-10">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-gold mb-3">DIRECT LINE</div>
            <a href={`tel:${contact.phoneIntl}`} className="font-display text-3xl md:text-4xl font-bold hover:text-gold transition-colors duration-300">
              {contact.phone}
            </a>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-gold mb-3">EMAIL</div>
            <a href={`mailto:${contact.email}`} className="font-display text-xl md:text-2xl font-bold hover:text-gold transition-colors duration-300 break-all">
              {contact.email}
            </a>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-gold mb-3">INSTAGRAM</div>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-display text-xl md:text-2xl font-bold hover:text-gold transition-colors duration-300">
              @{contact.instagram}
            </a>
          </div>
          <div className="pt-8 border-t border-white/10">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-4">AVAILABLE FOR</div>
            <div className="flex flex-wrap gap-2">
              {availableFor.map((item) => (
                <span key={item} className="series-tag">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal">
          <div className="font-mono text-[10px] tracking-[0.3em] text-gold mb-6">PROJECT BRIEF</div>
          <form className="space-y-8" onSubmit={(e) => handleBriefSubmit(e, onSuccess)}>
            <div>
              <label htmlFor="bfName" className="font-mono text-xs text-white/40 block mb-2">NAME *</label>
              <input id="bfName" name="name" type="text" className="form-input" placeholder="Your name" required autoComplete="name" />
            </div>
            <div>
              <label htmlFor="bfEmail" className="font-mono text-xs text-white/40 block mb-2">EMAIL *</label>
              <input id="bfEmail" name="email" type="email" className="form-input" placeholder="your@email.com" required autoComplete="email" />
            </div>
            <fieldset>
              <legend className="font-mono text-xs text-white/40 block mb-3">PROJECT TYPE</legend>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {PROJECT_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="type" value={type.toLowerCase()} />
                    <span className="font-mono text-xs text-white/60">{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="font-mono text-xs text-white/40 block mb-3">LOCATION</legend>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {LOCATIONS.map((loc) => (
                  <label key={loc} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="location" value={loc.toLowerCase()} />
                    <span className="font-mono text-xs text-white/60">{loc}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="bfBudget" className="font-mono text-xs text-white/40 block mb-2">BUDGET RANGE</label>
              <select id="bfBudget" name="budget" className="form-input" defaultValue="">
                <option value="" disabled>Select range</option>
                {BUDGETS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bfMsg" className="font-mono text-xs text-white/40 block mb-2">MESSAGE</label>
              <textarea id="bfMsg" name="message" className="form-input" rows="4" placeholder="Tell me about your vision..."></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-gold text-black font-mono text-sm tracking-[0.25em] hover:bg-white transition-colors duration-300">
              SEND BRIEF →
            </button>
          </form>
          {sent && (
            <div className="mt-6 p-6 border border-gold/30 bg-gold/5" role="status">
              <div className="font-mono text-sm text-gold">✓ BRIEF SENT SUCCESSFULLY</div>
              <div className="font-mono text-xs text-white/40 mt-2">Yosi will respond within 24 hours.</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
