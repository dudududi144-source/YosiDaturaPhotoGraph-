import { useState, useEffect } from 'react';
import siteData from '../data/site.json';

export default function Fab() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { contact } = siteData;

  // Show FAB after scrolling past the hero
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  const waLink = `https://wa.me/${contact.phoneIntl.replace('+', '')}?text=${encodeURIComponent('Hi Yosi, I saw your portfolio and would love to discuss a project.')}`;

  return (
    <div className={`fab-wrapper ${visible ? 'fab-visible' : ''}`}>
      {/* Expanded channel panel */}
      {open && (
        <div className="fab-panel" role="menu" aria-label="Quick contact options">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="fab-option" role="menuitem">
            <span className="fab-option-icon" aria-hidden="true">✦</span>
            <span>WhatsApp</span>
          </a>
          <a href={`tel:${contact.phoneIntl}`} className="fab-option" role="menuitem">
            <span className="fab-option-icon" aria-hidden="true">✆</span>
            <span>Call</span>
          </a>
          <a href={`mailto:${contact.email}`} className="fab-option" role="menuitem">
            <span className="fab-option-icon" aria-hidden="true">✉</span>
            <span>Email</span>
          </a>
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="fab-option" role="menuitem">
            <span className="fab-option-icon" aria-hidden="true">◎</span>
            <span>Instagram</span>
          </a>
        </div>
      )}

      {/* Main FAB trigger */}
      <button
        className={`fab-trigger ${open ? 'fab-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Close quick contact' : 'Open quick contact'}
      >
        <span className="fab-icon" aria-hidden="true">{open ? '✕' : '✦'}</span>
      </button>
    </div>
  );
}
