import { useState } from 'react';
import siteData from '../data/site.json';
import galleryData from '../data/gallery.json';
import { handleBriefSubmit } from '../utils/formHandler.js';
import { asset } from '../utils/assets.js';

const PROJECT_TYPES = ['Campaign', 'Lookbook', 'Editorial', 'Portrait', 'Conceptual'];
const LOCATIONS = ['Studio', 'Outdoor', 'Beach', 'Desert'];

export default function QuickConnectHub() {
  const [sent, setSent] = useState(false);
  const { contact, availableFor } = siteData;
  const studioBg = galleryData.studio?.base;

  const onSuccess = () => {
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const waLink = `https://wa.me/${contact.phoneIntl.replace('+', '')}?text=${encodeURIComponent('Hi Yosi, I saw your portfolio and would love to discuss a project.')}`;

  return (
    <section
      id="studio"
      className="quickconnect py-24 md:py-40 px-6 md:px-12 lg:px-20 border-t border-white/5 relative overflow-hidden"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 2500px' }}
    >
      {/* Atmospheric backdrop from real studio image */}
      {studioBg && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src={studioBg}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-darker via-darker/80 to-darker"></div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <div className="section-number reveal">07 / QUICKCONNECT HUB</div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl font-black mt-4 md:mt-6 reveal">
            LET'S CREATE<br />THE NEXT <span className="text-gold">STORY</span>
          </h2>
          <p className="font-mono text-sm text-white/50 mt-6 md:mt-8 max-w-2xl leading-relaxed reveal">
            Every frame is a story waiting to be told. Choose your channel — I respond within hours, not days.
          </p>
        </div>

        {/* Quick channel grid — the conversion engine */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 reveal">
          <a href={waLink} target="_blank" rel="noopener noreferrer"
             className="qc-channel qc-whatsapp" aria-label="Chat on WhatsApp">
            <span className="qc-icon" aria-hidden="true">✦</span>
            <span className="qc-label">WHATSAPP</span>
            <span className="qc-sub">Fastest response</span>
          </a>
          <a href={`tel:${contact.phoneIntl}`} className="qc-channel qc-phone" aria-label="Call now">
            <span className="qc-icon" aria-hidden="true">✆</span>
            <span className="qc-label">CALL</span>
            <span className="qc-sub">{contact.phone}</span>
          </a>
          <a href={`mailto:${contact.email}`} className="qc-channel qc-email" aria-label="Send email">
            <span className="qc-icon" aria-hidden="true">✉</span>
            <span className="qc-label">EMAIL</span>
            <span className="qc-sub">Briefs &amp; docs</span>
          </a>
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer"
             className="qc-channel qc-instagram" aria-label="Instagram">
            <span className="qc-icon" aria-hidden="true">◎</span>
            <span className="qc-label">INSTAGRAM</span>
            <span className="qc-sub">@{contact.instagram}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Availability + philosophy */}
          <div className="reveal space-y-10">
            <div className="pt-8 border-t border-white/10">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-4">AVAILABLE FOR</div>
              <div className="flex flex-wrap gap-2">
                {availableFor.map((item) => (
                  <span key={item} className="series-tag">{item}</span>
                ))}
              </div>
            </div>
            <blockquote className="border-l-2 border-gold pl-6">
              <p className="font-display text-xl md:text-2xl text-white/80 leading-relaxed italic">
                "I don't just capture images — I capture moments that resonate."
              </p>
              <cite className="font-mono text-xs text-white/40 mt-3 block not-italic">— YOSI DATURA</cite>
            </blockquote>
          </div>

          {/* Compact brief form */}
          <div className="reveal">
            <div className="font-mono text-[10px] tracking-[0.3em] text-gold mb-6">PROJECT BRIEF</div>
            <form className="space-y-6" onSubmit={(e) => handleBriefSubmit(e, onSuccess)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bfName" className="font-mono text-xs text-white/40 block mb-2">NAME *</label>
                  <input id="bfName" name="name" type="text" className="form-input" placeholder="Your name" required autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="bfEmail" className="font-mono text-xs text-white/40 block mb-2">EMAIL *</label>
                  <input id="bfEmail" name="email" type="email" className="form-input" placeholder="your@email.com" required autoComplete="email" />
                </div>
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
                <label htmlFor="bfMsg" className="font-mono text-xs text-white/40 block mb-2">YOUR VISION</label>
                <textarea id="bfMsg" name="message" className="form-input" rows="3" placeholder="Tell me about your project..."></textarea>
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
      </div>
    </section>
  );
}
