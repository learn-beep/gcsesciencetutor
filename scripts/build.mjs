// Builds sciencegcsetutor.com:
// 1. the science home and the shared pages (tutors, about, legal, forms) from src/ with src/data/site.json (sub "science") -> dist/
// 2. each subject (boards/<subject>/: data, exams, boundaries, site.config.json, replace.json) in a copy of the repo,
//    built and moved under dist/<subject>/ with its internal links prefixed. Shared pages come from step 1 only.
// 3. one sitemap for the whole site.
// Usage: node scripts/build.mjs   (Netlify runs it through `npm run build`)
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(root, 'dist');
const BUILD = path.join(root, '.build');
const DOMAIN = 'https://www.sciencegcsetutor.com';
const SUBJECTS = ['biology', 'chemistry', 'physics'];
const SHARED = ['404.html', 'tutors', 'about', 'privacy', 'terms', 'thank-you', 'report'];
const HOME_PAGES = ['index.astro', 'tutors', 'about.astro', 'privacy.astro', 'terms.astro', 'report.astro', '404.astro', 'thank-you.astro'];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit', env: process.env });

function workCopy(name, publicDir, outDir) {
  const work = path.join(BUILD, name);
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(work, { recursive: true });
  for (const f of ['src', 'package.json', 'tsconfig.json']) if (fs.existsSync(path.join(root, f))) fs.cpSync(path.join(root, f), path.join(work, f), { recursive: true });
  fs.symlinkSync(path.join(root, 'node_modules'), path.join(work, 'node_modules'), 'dir');
  fs.writeFileSync(path.join(work, 'astro.config.mjs'),
    `import { defineConfig } from 'astro/config';\nexport default defineConfig({ site: '${DOMAIN}', trailingSlash: 'always', publicDir: ${JSON.stringify(publicDir)}, outDir: ${JSON.stringify(outDir)} });\n`);
  return work;
}

fs.rmSync(DIST, { recursive: true, force: true });
run('node scripts/home_data.mjs', root);

// 1. The science home and the shared pages
{
  const work = workCopy('home', path.join(root, 'public'), DIST);
  const pages = path.join(work, 'src', 'pages');
  for (const e of fs.readdirSync(pages)) if (!HOME_PAGES.includes(e)) fs.rmSync(path.join(pages, e), { recursive: true, force: true });
  run('npx astro build', work);
  for (const f of ['content-assets.mjs', 'content-modules.mjs']) fs.rmSync(path.join(DIST, f), { force: true });
}

// 2. The subjects
for (const sub of SUBJECTS) {
  const B = path.join(root, 'boards', sub);
  const work = workCopy(sub, './public-empty', './out');
  fs.mkdirSync(path.join(work, 'public-empty'));
  const data = path.join(work, 'src', 'data');
  for (const f of fs.readdirSync(path.join(B, 'data'))) fs.copyFileSync(path.join(B, 'data', f), path.join(data, f));
  for (const f of ['exams.json', 'boundaries.json']) fs.copyFileSync(path.join(B, f), path.join(data, f));
  const cfg = JSON.parse(fs.readFileSync(path.join(B, 'site.config.json'), 'utf8'));
  fs.writeFileSync(path.join(data, 'site.json'), JSON.stringify(cfg.site, null, 2));
  const rep = JSON.parse(fs.readFileSync(path.join(B, 'replace.json'), 'utf8'));
  for (const f of walk(path.join(work, 'src'))) {
    if (f.startsWith(data + path.sep)) continue;
    if (!/\.(astro|ts|js|json|css)$/.test(f)) continue;
    let s = fs.readFileSync(f, 'utf8'), t = s;
    for (const [a, b] of rep.all) t = t.split(a).join(b);
    if (t !== s) fs.writeFileSync(f, t);
  }
  for (const rel of rep.delete || []) fs.rmSync(path.join(work, rel), { recursive: true, force: true });
  for (const rel of SHARED) for (const p of [rel.replace('.html', ''), rel.replace('.html', '') + '.astro']) fs.rmSync(path.join(work, 'src', 'pages', p), { recursive: true, force: true });
  const ov = path.join(B, 'overrides');
  if (fs.existsSync(ov)) fs.cpSync(ov, work, { recursive: true });
  run('npx astro build', work);
  // move under /<sub>/, prefixing internal links to this subject's routes
  const out = path.join(work, 'out');
  const routes = fs.readdirSync(out, { withFileTypes: true }).filter((e) => e.isDirectory() && !SHARED.includes(e.name)).map((e) => e.name);
  const alt = routes.map((r) => r.replace(/[-_]/g, (c) => '\\' + c)).join('|');
  const rx = new RegExp(`(["'\`(=]|${DOMAIN.replace(/[.:/]/g, (c) => '\\' + c)})/(${alt})(?=[/"'?#\`)])`, 'g');
  let n = 0;
  for (const f of walk(out)) {
    const rel = path.relative(out, f);
    if (SHARED.includes(rel.split(path.sep)[0])) continue;
    const dest = path.join(DIST, sub, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (/\.(html|js|json|css|xml)$/.test(f)) {
      let s = fs.readFileSync(f, 'utf8').replace(rx, (m, pre, r) => `${pre}/${sub}/${r}`);
      if (rel === 'index.html') s = s.replace(new RegExp(`(href|content)="${DOMAIN}/"`, 'g'), `$1="${DOMAIN}/${sub}/"`);
      if (f.endsWith('.html')) s = s.replace(/href="\/" data-home-board/g, `href="/${sub}/"`);
      fs.writeFileSync(dest, s);
    } else fs.copyFileSync(f, dest);
    n++;
  }
  console.log(`${sub}: ${routes.length} routes, ${n} files under /${sub}/`);
}

// 3. one sitemap for the whole site
const pages = walk(DIST).filter((f) => f.endsWith('index.html')).map((f) => '/' + path.relative(DIST, path.dirname(f)).split(path.sep).join('/'))
  .map((u) => (u === '/' ? '/' : u + '/')).filter((u) => !/\/(print|data|thank-you)\//.test(u)).sort();
for (const f of fs.readdirSync(DIST)) if (/^sitemap.*\.xml$/.test(f)) fs.rmSync(path.join(DIST, f));
fs.writeFileSync(path.join(DIST, 'sitemap-0.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((u) => `<url><loc>${DOMAIN}${u}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync(path.join(DIST, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${DOMAIN}/sitemap-0.xml</loc></sitemap></sitemapindex>`);
console.log(`sitemap: ${pages.length} pages`);
fs.rmSync(BUILD, { recursive: true, force: true });
