// Writes src/data/home.json: per-subject counts and exam dates for the science home page.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const out = {};
for (const sub of ['biology', 'chemistry', 'physics']) {
  const B = path.join(root, 'boards', sub);
  const q = JSON.parse(fs.readFileSync(path.join(B, 'data', 'questions.json'), 'utf8'));
  const p = JSON.parse(fs.readFileSync(path.join(B, 'data', 'papers.json'), 'utf8'));
  const t = JSON.parse(fs.readFileSync(path.join(B, 'data', 'topics.json'), 'utf8'));
  const ex = JSON.parse(fs.readFileSync(path.join(B, 'exams.json'), 'utf8'));
  out[sub] = { parts: q.length, papers: p.length, topics: t.length, sepOnly: t.filter((x) => !(x.asStatements || []).length).length,
    latest: p.map((x) => x.year).sort().pop(), exams: [...ex.sep, ...ex.tri] };
}
fs.writeFileSync(path.join(root, 'src', 'data', 'home.json'), JSON.stringify(out, null, 1));
console.log('home.json', Object.entries(out).map(([k, v]) => `${k} ${v.parts}`).join(', '));
