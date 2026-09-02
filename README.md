# YOSI DATURA — Photography Portfolio

Fashion & Conceptual Photography | Visual Architect
React 18 + Vite 5 + Tailwind CSS 3 + GSAP 3 | GitHub Pages CI/CD

## Architecture Principles

1. Anticipate Scale — all content lives in src/data/*.json. Adding 50 series or 200 models = zero component changes.
2. Performance is a feature — GPU-only animations, content-visibility: auto, lazy images, explicit aspect ratios (zero CLS).
3. Micro-interactions — cinematic easing cubic-bezier(0.16, 1, 0.3, 1) with 80-120ms hover-in delays.
4. Zero broken images — every img has a sanitized SVG placeholder fallback.

## Structure

- src/components/ — UI components
- src/components/gallery/ — WingSection, SeriesBlock, GalleryFrame, layouts, GradeLab, Lightbox
- src/components/ui/ — SectionHeader
- src/context/ — LightboxContext (global viewer + prev/next)
- src/data/ — site.json, gallery.json, models.json (EDIT CONTENT HERE)
- src/styles/ — Tailwind + cinematic CSS
- src/utils/ — animations, imageFallback, formHandler

## Content Workflows

Add a photo series: edit src/data/gallery.json — append to series[] with id, wing, num, title, titleAccent, accent, accentClass, desc, layout, frames[].
Available layouts: triptych-staggered, triptych-staggered-inv, hero-side-duo, duo-side-hero, diptych-staggered, full-bleed.
Add new layouts: src/components/gallery/layouts.js (registry pattern).

Add a model: edit src/data/models.json — append to models[].
Add images: drop files in public/assets/, reference as /assets/name.jpg.
Connect the brief form: set FORM_ENDPOINT in src/utils/formHandler.js (Formspree or any JSON endpoint).

## Development

    npm install
    npm run dev
    npm run build
    npm run preview

## Deployment

Push to main -> GitHub Actions builds and deploys to:
https://dudududi144-source.github.io/YosiDaturaPhotoGraph-/

Enable once: repo Settings -> Pages -> Source: GitHub Actions.

## Accessibility

Semantic landmarks, focus-visible outlines, keyboard lightbox (Esc / arrows),
aria labels, prefers-reduced-motion support, custom cursor disabled on touch,
rel=noopener noreferrer on external links.

## Content provenance

100% of the photography on this site is the work of Yosi Cohen Datura (@yosidatura).
No stock imagery. No third-party content. Original assets only.
