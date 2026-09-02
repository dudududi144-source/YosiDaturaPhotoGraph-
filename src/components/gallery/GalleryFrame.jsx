import { useCallback } from 'react';
import { generatePlaceholder } from '../../utils/imageFallback.js';
import { useLightbox } from '../../context/LightboxContext.jsx';

export default function GalleryFrame({ frame, series, accent, accentClass, className = '' }) {
  const { open } = useLightbox();

  const handleError = useCallback(
    (e) => {
      const img = e.currentTarget;
      if (img.dataset.phDone) return;
      img.dataset.phDone = '1';
      img.src = generatePlaceholder(frame.alt, accent);
      img.onerror = null;
    },
    [frame.alt, accent]
  );

  const handleOpen = useCallback(() => open(frame.id), [open, frame.id]);
  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(frame.id);
      }
    },
    [open, frame.id]
  );

  const total = String(series.frames.length).padStart(2, '0');

  return (
    <figure
      className={`gallery-item group cursor-pointer ${frame.aspect || 'aspect-[3/4]'} ${frame.offset || ''} ${className}`}
      onClick={handleOpen}
      onKeyDown={handleKey}
      tabIndex={0}
      role="button"
      aria-label={`Open ${frame.caption}`}
    >
      <img src={frame.img} alt={frame.caption} onError={handleError} loading="lazy" decoding="async" />
      <figcaption className="gallery-overlay">
        <div>
          <div className={`font-mono text-[10px] tracking-[0.2em] ${accentClass}`}>
            {frame.id} / {total}
          </div>
          <div className="font-display text-lg md:text-xl mt-1">{frame.alt}</div>
        </div>
      </figcaption>
      <div className="absolute top-4 right-4 z-[2] font-mono text-base text-transparent group-hover:text-white/60 transition-colors duration-300" aria-hidden="true">
        +
      </div>
    </figure>
  );
}
