import { useState, useEffect, useRef } from 'react';
import siteData from '../data/site.json';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    // rAF-throttled scroll — max one calc per frame, no jank
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 80);
        const bar = document.getElementById('scrollProgress');
        if (bar) {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
        }
        ticking.current = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const handleEsc = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header>
      <nav
        id="siteNav"
        className={`fixed top-0 left-0 right-0 z-[1000] px-6 md:px-12 py-5 md:py-6 flex justify-between items-center ${scrolled ? 'scrolled' : ''}`}
        aria-label="Primary"
      >
        <a href="#home" className="font-mono text-sm tracking-[0.25em] text-white hover:text-gold transition-colors duration-300">
          YD<span className="text-gold">.</span>
        </a>
        <div className="hidden md:flex gap-10 items-center">
          {siteData.navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-link font-mono text-xs tracking-[0.18em] text-white/80 hover:text-white transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 z-[1001] p-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="w-6 h-[1px] bg-white transition-transform duration-300 block"
            style={menuOpen ? { transform: 'rotate(45deg) translate(3px, 3px)' } : undefined}></span>
          <span className="w-6 h-[1px] bg-white transition-transform duration-300 block"
            style={menuOpen ? { transform: 'rotate(-45deg)' } : undefined}></span>
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        {siteData.navLinks.map((link) => (
          <a key={link.id} href={`#${link.id}`}
            className="font-display text-4xl text-white hover:text-gold transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}>
            {link.label}
          </a>
        ))}
        <div className="font-mono text-xs text-white/40 mt-8 tracking-[0.3em]">{siteData.years}</div>
      </div>
    </header>
  );
}
