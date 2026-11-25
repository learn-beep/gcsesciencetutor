# sciencegcsetutor.com

Free AQA GCSE science revision site (higher tier) with Sam as the tutor. Static Astro site on Netlify.

- `/` is the science home; `/biology/`, `/chemistry/` and `/physics/` are the subject sections. Each covers the separate GCSE (8461, 8462, 8463) and that subject's Combined Science: Trilogy (8464) papers.
- `src/` is shared by every section. `src/data/site.json` (sub `science`) builds the home and the shared pages (tutors, about, privacy, terms, report, 404, thank-you).
- `boards/<subject>/` holds each section's data (`data/` from `scripts/export.py`), `exams.json`, `boundaries.json`, `site.config.json` (its `site` block becomes that section's `site.json`) and `replace.json` (storage-key prefix; Biology and Chemistry delete the Physics equations page).
- Subject facts (paper split, required practicals, physics equations, papers AQA has withdrawn) are in `src/lib/subject.ts`.
- `public/img/` holds the WebP crops for all three banks; `public/tutors/sam.webp` is Sam's photo.

## Build

    npm install
    npm run build        # node scripts/build.mjs -> dist/

`scripts/build.mjs` builds the home first, then each subject in `.build/<subject>`, moving it under `dist/<subject>/` and prefixing its internal links, and writes one sitemap.

## Updating

When AQA publishes the June 2026 papers (after the secure period), rebuild the three banks, re-run `scripts/export.py` for each subject into `boards/<subject>/data`, convert the new crops with `scripts/webp_all.py`, and update `exams.json` and `boundaries.json` each year.

Question papers, mark schemes and examiner reports © AQA. Site © aleveltutors.online Limited (company 14401016).
