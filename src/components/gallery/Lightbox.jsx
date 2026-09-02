import { useCallback } from 'react';
import { useLightbox } from '../../context/LightboxContext.jsx';
import { generatePlaceholder } from '../../utils/imageFallback.js';

export default function Lightbox() {
  const { isOpen, frame, index, total, close, next, prev } = useLightbox();

  const handleError = useCallback(
    (e) => {
      if (!frame) return;
      e.currentTarget.src = generatePlaceholder(frame.alt, frame.accent);
      e.currentTarget.onerror = null;
    },
    [frame]
  );

  return (
    <div
      className={`lightbox ${isOpen ? 'active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      aria-hidden={!isOpen}
      onClick={close}
    >
      <div className="absolute top-4 md:top-6 left-6 font-mono text-[10px] tracking-[0.3em] text-white/40 z-10" aria-hidden="true">
        {String(index + 1).padStart(3, '0')} / {String(total).padStart(3, '0')}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); close(); }}
        className="absolute top-4 md:top-6 right-6 font-mono text-xs text-white/60 hover:text-white transition-colors duration-300 z-10 p-2"
        aria-label="Close viewer"
      >
        ✕ CLOSE
      </button>

      {frame && (
        <>
          <img key={frame.id} src={frame.img} alt={frame.caption} onError={handleError} onClick={(e) => e.stopPropagation()} />
          <div className="font-mono text-xs tracking-[0.25em] text-white/60 text-center px-6">
            {frame.caption.toUpperCase()}
          </div>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="lightbox-nav left-4 md:left-8" aria-label="Previous image">←</button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="lightbox-nav right-4 md:right-8" aria-label="Next image">→</button>
        </>
      )}
    </div>
  );
}
