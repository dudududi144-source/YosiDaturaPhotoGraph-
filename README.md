# YOSI DATURA - Digital Flagship

Fashion and Conceptual Photography, Tel Aviv.
Stack: React 18, Vite 5, Tailwind 3, GSAP 3.
CI/CD: GitHub Actions to GitHub Pages.
All photography on this site is the work of Yosi Cohen Datura (@yosidatura).
No stock. No AI. No third-party imagery.

Live: https://dudududi144-source.github.io/YosiDaturaPhotoGraph-/

## Architecture

src/components/gallery - WingSection, SeriesBlock, GalleryFrame, layouts registry, GradeLab, Lightbox
src/components - Fab, QuickConnectHub, InstagramFeed, Hero, Portals, Casting, Artist, Footer
src/context - LightboxContext (collection-wide prev/next)
src/data - site.json, gallery.json, models.json (content lives here, edit JSON not code)
src/styles - base (a11y/motion), components (cinematic CSS), features (IG/FAB/sharpness)
src/utils - assets resolver, animations, imageFallback, formHandler
public/assets/y - Yosi's own imagery, repo-hosted and permanent

## Branches

main - production
archive/v1-full-history - full backup with original screenshots and every prior state
backup-pre-content-injection - pre-injection snapshot

## Content Ops (zero code)

Add a series: append to gallery.json series[] using a layout from the registry
(triptych-staggered, hero-side-duo, duo-side-hero, diptych-staggered, full-bleed).
Add a model: append to models.json models[].
Replace a photo: drop a file in public/assets/y/ with the same filename.
Connect the form: set FORM_ENDPOINT in src/utils/formHandler.js.

## Image Quality Protocol

Sources: portfolio page captures preserved in archive/v1-full-history.
Pipeline: crop by connected components, classify by color signature,
Lanczos upscale, UnsharpMask 170, progressive JPEG.
Sharpness discipline: frames render at native-resolution budgets.
Path to 100 percent: export each series from the original Canva or camera
files at full resolution into public/assets/y/ with the same filenames.
The site upgrades instantly with zero code changes.

## Performance Budget

GPU-only motion (transform and opacity).
content-visibility auto on heavy sections.
lazy and async below the fold, hero cover preloaded with fetchpriority high.
Zero CLS via explicit aspect ratios.

## Accessibility

Keyboard lightbox (Esc and arrows), focus-visible outlines, aria labels,
prefers-reduced-motion support, custom cursor disabled on touch,
rel noopener on external links.

## Deploy

Push to main, Actions builds, Pages deploys.
Repo Settings, Pages, Source: GitHub Actions.

(c) 2025 Yosi Datura. All rights reserved.

## Bring Your Originals (auto-ingestion)

Drop your real folders into `public/inbox/<series>/` (azure, desert, gilded, eternity,
silent, crimson, urban, wild, artist, studio, cover) and commit.
The `Ingest & Optimize Assets` workflow runs sharp: EXIF rotate, width cap 1600,
progressive JPEG q86, metadata strip - then writes `public/assets/y/<series>-<n>.jpg`,
clears the inbox and commits back. The site upgrades instantly.
Full guide: docs/UPLOAD_GUIDE.md
