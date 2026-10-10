# Braddock Roofing & Restoration: website demo

Demo website for Braddock Roofing & Restoration, 7522 Campbell Rd, Ste 113-117, Dallas, TX 75248.

- Single static page: `index.html` + `images/`
- English / Spanish toggle (`?lang=es`), light / dark mode, before/after slider
- Contact form is a demo and isn't connected to a backend yet

## Run locally

```
python -m http.server 5520
```

Then open http://localhost:5520

## Stack
- **Next.js** (static export) + **TypeScript** + **Tailwind CSS v4**
- **Magic UI** (Marquee, MagicCard, BorderBeam), **Motion**, **GSAP**, **Lenis** smooth scroll, **Phosphor** icons
- Strings live in `src/content/strings.json` (English plus each translation); the page is `src/app/page.tsx`

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```
Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).
