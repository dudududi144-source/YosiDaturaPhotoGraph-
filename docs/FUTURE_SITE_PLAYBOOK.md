# Future Site Playbook - reuse this architecture

When you need the next site (video, studio, shop), reuse this repo's DNA.

## 1. Bootstrap
- Create new repo from this one (template) or copy:
  vite.config.js, tailwind.config.js, postcss.config.js, package.json,
  src/styles/*, src/utils/*, .github/workflows/*.
- Change `base` in vite.config.js to the new repo name.

## 2. Keep the contracts
- Content lives in src/data/*.json - never hardcode content in components.
- Images live in public/assets/<set>/ and are referenced by relative keys.
- public/inbox/ + scripts/ingest.mjs = the media pipeline (dedup, quality gate, EXIF).

## 3. Design language (do not break)
- Dark #050505 base, gold #D4AF37 accent, mono labels, display serif headlines.
- Easing cubic-bezier(0.16,1,0.3,1); hover delays 80-120ms; GPU-only motion.
- Zero CLS: explicit aspect ratios; preload the hero; lazy everything else.

## 4. Launch checklist
- [ ] LICENSE + humans.txt + 404.html branded
- [ ] OG/Twitter/JSON-LD with real data only
- [ ] Accessibility pass (keyboard, reduced-motion, contrast)
- [ ] Performance pass (CLS 0, hero preload, lazy below fold)
- [ ] Pages source = GitHub Actions; dependabot on
- [ ] Backup branch before big content swaps

## 5. Agent handoff
Give the agent: repo + one-line goal. It will audit, fix, ingest media,
and deploy. See AGENT_CAPABILITIES.md.
