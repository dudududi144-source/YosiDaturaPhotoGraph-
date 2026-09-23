import siteData from '../data/site.json';

export default function Footer() {
  const { contact, navLinks } = siteData;

  return (
    <footer className="py-16 md:py-20 px-6 md:px-12 lg:px-20 border-t border-white/5 bg-darker">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="font-display text-4xl md:text-6xl font-black mb-4 leading-none">
            YOSI<br />DATURA
          </div>
          <div className="font-mono text-xs text-white/40 mt-4">
            Visual Architect — Fashion &amp; Conceptual Photography
          </div>
        </div>
        <nav aria-label="Footer navigation">
          <div className="font-mono text-[10px] tracking-[0.3em] text-gold mb-4">NAVIGATE</div>
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} className="block font-mono text-xs text-white/60 hover:text-white transition-colors duration-300">
                {link.label.charAt(0) + link.label.slice(1).toLowerCase()}
              </a>
            ))}
          </div>
        </nav>
        <nav aria-label="Contact links">
          <div className="font-mono text-[10px] tracking-[0.3em] text-gold mb-4">CONNECT</div>
          <div className="space-y-2">
            <a href={`tel:${contact.phoneIntl}`} className="block font-mono text-xs text-white/60 hover:text-white transition-colors duration-300">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="block font-mono text-xs text-white/60 hover:text-white transition-colors duration-300">
              {contact.email}
            </a>
            <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="block font-mono text-xs text-white/60 hover:text-white transition-colors duration-300">
              @{contact.instagram}
            </a>
          </div>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
        <div className="font-mono text-[10px] text-white/30">© 2026 YOSI DATURA. ALL RIGHTS RESERVED.</div>
        <div className="font-mono text-[10px] text-white/30">TEL AVIV — ISRAEL</div>
        <div className="font-mono text-[10px] text-white/30" data-build="2026-09-23-B">BUILD 2026-09-23·B</div>
      </div>
    </footer>
  );
}
