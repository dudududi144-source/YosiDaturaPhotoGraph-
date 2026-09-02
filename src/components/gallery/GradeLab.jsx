import { useRef, useCallback, useEffect } from 'react';
import galleryData from '../../data/gallery.json';
import { generatePlaceholder } from '../../utils/imageFallback.js';

export default function GradeLab() {
  const sliderRef = useRef(null);
  const handleRef = useRef(null);
  const afterRef = useRef(null);
  const dragging = useRef(false);
  const { title, desc, before, after } = galleryData.gradeLab;

  const setPos = useCallback((clientX) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const r = slider.getBoundingClientRect();
    const p = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    if (handleRef.current) handleRef.current.style.left = p + '%';
    if (afterRef.current) afterRef.current.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const r = slider.getBoundingClientRect();
      setPos(r.left + r.width / 2);
    }
  }, [setPos]);

  const onDown = (e) => {
    dragging.current = true;
    sliderRef.current?.setPointerCapture(e.pointerId);
    setPos(e.clientX);
  };
  const onMove = (e) => dragging.current && setPos(e.clientX);
  const onUp = () => { dragging.current = false; };

  const fallback = (label, accent) => (e) => {
    e.currentTarget.src = generatePlaceholder(label, accent);
    e.currentTarget.onerror = null;
  };

  return (
    <div className="mb-24 md:mb-40 reveal">
      <div className="flex items-end justify-between mb-6 md:mb-8 flex-wrap gap-4">
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] text-gold mb-3">GRADE LAB</div>
          <h3 className="font-display text-2xl md:text-4xl font-bold">
            {title[0]} → <span className="text-gold">{title[1]}</span>
          </h3>
        </div>
        <p className="font-mono text-xs text-white/40 max-w-md md:text-right leading-relaxed">{desc}</p>
      </div>
      <div
        ref={sliderRef}
        className="ba-slider aspect-[16/9] md:aspect-[21/9] border border-white/10"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="slider"
        aria-label="Compare raw and master grade"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        tabIndex={0}
      >
        <img src={before} alt="Ungraded raw frame" onError={fallback('RAW', '#888888')} loading="lazy" decoding="async" />
        <img ref={afterRef} className="ba-after" src={after} alt="Color graded master frame" onError={fallback('MASTER', '#D4AF37')} loading="lazy" decoding="async" />
        <span className="ba-label left-4 text-white/70">RAW</span>
        <span className="ba-label right-4 text-gold" style={{ borderColor: 'rgba(212,175,55,.5)' }}>MASTER</span>
        <div ref={handleRef} className="ba-handle" aria-hidden="true">
          <div className="ba-knob">⟨⟩</div>
        </div>
      </div>
    </div>
  );
}
