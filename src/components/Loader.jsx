import { useState, useEffect } from 'react';
import { initHeroAnimation } from '../utils/animations.js';

export default function Loader() {
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let finished = false;
    const tick = setInterval(() => {
      setPercent((prev) => {
        const next = Math.min(100, prev + 4 + Math.random() * 12);
        if (next >= 100 && !finished) {
          finished = true;
          clearInterval(tick);
          setTimeout(() => {
            setDone(true);
            initHeroAnimation();
            setTimeout(() => setRemoved(true), 900);
          }, 350);
        }
        return next;
      });
    }, 90);
    return () => clearInterval(tick);
  }, []);

  if (removed) return null;

  return (
    <div className={`loader ${done ? 'done' : ''}`} role="status" aria-label="Loading">
      <div className="font-mono text-xs tracking-[0.35em] text-white/50 mb-6">YOSI DATURA</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" style={{ width: `${percent}%` }}></div>
      </div>
      <div className="font-mono text-xs text-white/30 mt-4">{Math.floor(percent)}%</div>
    </div>
  );
}
