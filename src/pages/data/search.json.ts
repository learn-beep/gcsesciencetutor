import { allTopics, allPapers } from '../../lib/data';
import spec from '../../data/spec.json';
import { SUB, S as SUBJ_NAME } from '../../lib/subject';
const tools = [{"t": "Practice player", "u": "/practice/", "kind": "Tool"}, {"t": "Mini-mock builder", "u": "/mock/", "kind": "Tool"}, {"t": "Question of the day", "u": "/today/", "kind": "Tool"}, {"t": "Spec checklist", "u": "/specification/", "kind": "Tool"}, {"t": "Grade boundaries and calculator", "u": "/grade-boundaries/", "kind": "Tool"}, {"t": "Exam dates", "u": "/exam-dates/", "kind": "Tool"}, {"t": "Revision planner", "u": "/planner/", "kind": "Tool"}, {"t": "What comes up (analysis)", "u": "/analysis/", "kind": "Tool"}, {"t": "What came up last summer", "u": "/what-came-up/", "kind": "Tool"}, {"t": "Every paper as a timeline", "u": "/timeline/", "kind": "Tool"}, {"t": "Hardest questions", "u": "/hardest-questions/", "kind": "Tool"}, {"t": "Tutor", "u": "/tutors/", "kind": "Tool"}, {"t": "Flashcards (key terms)", "u": "/flashcards/", "kind": "Tool"}, {"t": "Define it drill", "u": "/practice/define/", "kind": "Tool"}, {"t": "Six-mark extended response questions", "u": "/six-mark-questions/", "kind": "Tool"}, {"t": "Maths skills", "u": "/maths-skills/", "kind": "Tool"}, {"t": "Required practicals", "u": "/required-practicals/", "kind": "Tool"}, {"t": "Multiple-choice questions", "u": "/questions/type/multiple-choice/", "kind": "Tool"}, {"t": "Calculation questions", "u": "/questions/type/calculations/", "kind": "Tool"}, {"t": "Practical and data questions", "u": "/questions/type/practical-questions/", "kind": "Tool"}];
if (SUB !== 'physics') tools.push({ t: `${SUBJ_NAME} calculations`, u: '/calculations/', kind: 'Tool' });
if (SUB === 'physics') tools.push({ t: 'Physics equations (equation sheet and the ones to learn)', u: '/equations/', kind: 'Tool' });
export function GET() {
  const items = [
    ...allTopics.map((t) => ({ t: t.name, k: t.group, u: `/questions/${t.slug}/`, kind: 'Topic' })),
    ...allPapers.map((p) => ({ t: `${p.series} ${p.qual === 'Trilogy' ? 'Combined Science ' : ''}${p.paper.replace('Trilogy ', '')}`, k: p.spec, u: `/past-papers/${p.slug}/`, kind: 'Paper' })),
  ...spec.flatMap((s) => s.statements.map((st) => ({ t: `${st.id} ${st.text.slice(0, 80)}`, k: s.title, u: `/questions/${s.topic}/`, kind: 'Spec statement' }))),
    ...tools,
  ];
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
