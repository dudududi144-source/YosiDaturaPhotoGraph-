import { useState, useEffect } from 'react';
import siteData from '../data/site.json';

export default function Fab() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { contact } = siteData;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  const wa = `https://wa.me/${contact.phoneIntl.replace('+', '')}?text=${encodeURIComponent('Hi Yosi, I saw your portfolio and would love to book a shoot.')}`;

  return (
    <div className={`fabv2-wrap ${visible ? 'fabv2-show' : ''}`}>
      {open && (
        <div className="fabv2-panel" role="menu" aria-label="Contact channels">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="fabv2-opt fabv2-wa" role="menuitem">
            <span className="fabv2-ico" aria-hidden="true">✦</span> WHATSAPP — fastest
          </a>
          <a href={`tel:${contact.phoneIntl}`} className="fabv2-opt" role="menuitem">
            <span className="fabv2-ico" aria-hidden="true">✆</span> CALL {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="fabv2-opt" role="menuitem">
            <span className="fabv2-ico" aria-hidden="true">✉</span> EMAIL
          </a>
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="fabv2-opt" role="menuitem">
            <span className="fabv2-ico" aria-hidden="true">◎</span> INSTAGRAM
          </a>
        </div>
      )}
      <button
        className={`fabv2-pill ${open ? 'fabv2-open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Contact Yosi - book a shoot"
      >
        <span className="fabv2-spark" aria-hidden="true">✦</span>
        <span className="fabv2-label">{open ? 'CLOSE' : 'BOOK A SHOOT'}</span>
      </button>
    </div>
  );
}
