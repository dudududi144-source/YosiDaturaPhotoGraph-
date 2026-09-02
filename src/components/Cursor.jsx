import { useEffect, useRef } from 'react';

const HOVER_SELECTORS =
  'a, button, .portal, .gallery-item, .model-card, input, select, textarea, label, .ba-slider, [role="button"]';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Touch devices: zero cost
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    let rafId;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.16;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.16;
      if (ringRef.current) {
        const half = ringRef.current.classList.contains('hover') ? 32 : 20;
        ringRef.current.style.transform = `translate3d(${ring.current.x - half}px, ${ring.current.y - half}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    // Delegated hover detection — one listener, works for dynamic content
    const onOver = (e) => {
      const t = e.target.closest?.(HOVER_SELECTORS);
      ringRef.current?.classList.toggle('hover', !!t);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true"></div>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"></div>
    </>
  );
}
