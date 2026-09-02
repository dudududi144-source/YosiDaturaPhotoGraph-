import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import galleryData from './data/gallery.json';
import { LightboxProvider } from './context/LightboxContext.jsx';
import Loader from './components/Loader.jsx';
import Cursor from './components/Cursor.jsx';
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Portals from './components/Portals.jsx';
import WingSection from './components/gallery/WingSection.jsx';
import Casting from './components/Casting.jsx';
import Artist from './components/Artist.jsx';
import Studio from './components/Studio.jsx';
import Footer from './components/Footer.jsx';
import Lightbox from './components/gallery/Lightbox.jsx';
import { initReveals, initSmoothScroll, initParallax } from './utils/animations.js';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    initReveals();
    initSmoothScroll();
    initParallax();
  }, []);

  return (
    <LightboxProvider>
      <Loader />
      <Cursor />
      <div className="grain" aria-hidden="true"></div>
      <div id="scrollProgress" aria-hidden="true"></div>
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Portals />
        {galleryData.wings.map((wing) => (
          <WingSection key={wing.id} wing={wing} />
        ))}
        <Casting />
        <Artist />
        <Studio />
      </main>
      <Footer />
      <Lightbox />
    </LightboxProvider>
  );
}
