import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** IntersectionObserver reveals — cheap, no GSAP cost for basic fades */
export function initReveals() {
  const els = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    els.forEach((el) => el.classList.add('active'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('active');
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
  );
  els.forEach((el) => io.observe(el));
}

/** Smooth anchor scroll with reduced-motion respect */
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });
}

/** Hero entrance — runs once after loader completes */
export function initHeroAnimation() {
  if (reduceMotion) return;
  gsap.fromTo(
    '.hero-anim',
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power4.out', delay: 0.1 }
  );
}

/** Subtle hero parallax — transform-only, scrubbed, no layout work */
export function initParallax() {
  if (reduceMotion) return;
  gsap.to('#heroBg', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true },
  });
}
