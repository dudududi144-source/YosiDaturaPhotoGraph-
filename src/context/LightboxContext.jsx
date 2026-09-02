import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import galleryData from '../data/gallery.json';

const LightboxContext = createContext(null);

export function LightboxProvider({ children }) {
  const [index, setIndex] = useState(-1);

  // Flat, memoized collection of EVERY frame in the site.
  // Prev/next navigation spans all wings and series — scales to 1000+ frames.
  const frames = useMemo(
    () =>
      galleryData.series.flatMap((s) =>
        s.frames.map((f) => ({
          ...f,
          seriesTitle: `${s.title} ${s.titleAccent || ''}`,
          accent: s.accent,
        }))
      ),
    []
  );

  const open = useCallback(
    (frameId) => {
      const i = frames.findIndex((f) => f.id === frameId);
      setIndex(i >= 0 ? i : 0);
    },
    [frames]
  );

  const close = useCallback(() => setIndex(-1), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % frames.length), [frames.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + frames.length) % frames.length), [frames.length]);

  useEffect(() => {
    const isOpen = index >= 0;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, close, next, prev]);

  const value = useMemo(
    () => ({
      isOpen: index >= 0,
      frame: index >= 0 ? frames[index] : null,
      index,
      total: frames.length,
      open,
      close,
      next,
      prev,
    }),
    [index, frames, open, close, next, prev]
  );

  return <LightboxContext.Provider value={value}>{children}</LightboxContext.Provider>;
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error('useLightbox must be used within LightboxProvider');
  return ctx;
}
