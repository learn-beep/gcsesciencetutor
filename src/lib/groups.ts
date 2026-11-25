// Topic groups for the current subject: one per specification section (4.1, 4.2 ...), derived from the topics.
import { allTopics } from './data';
import { SUBJ, paperOf } from './subject';
export type Group = { key: string; sec: string; n: number; heading: string; where: string; as: boolean; motif: string };
const MOTIFS = ['stats', 'orbital', 'trig', 'mech', 'circuit', 'curve', 'field', 'spectrum', 'energy', 'flask'];
const secOf = (t: { code: string }) => t.code.split(',')[0].trim().split('.').slice(0, 2).join('.');
const seen = new Map<string, Group>();
allTopics.forEach((t: any) => {
  if (seen.has(t.group)) return;
  const sec = secOf(t); const n = seen.size + 1; const p = paperOf(sec);
  const tri = allTopics.filter((x: any) => x.group === t.group).some((x: any) => (x.asStatements || []).length);
  seen.set(t.group, { key: t.group, sec, n: ((n - 1) % 9) + 1, heading: `${sec} ${t.group}`, where: `${SUBJ.name} Paper ${p}${tri ? ` and Combined Science ${SUBJ.name} Paper ${p}` : ' (separate ' + SUBJ.name + ' only)'}`, as: tri, motif: MOTIFS[(n - 1) % MOTIFS.length] });
});
export const GROUPS: Group[] = [...seen.values()];
export const groupOf = (key: string): Group => GROUPS.find((g) => g.key === key) || GROUPS[0];
export const badgeText = (key: string) => groupOf(key).sec;
export const badgeClass = (key: string) => `badge badge-${groupOf(key).n}`;
export function whereExamined(t: { slug: string; group: string; asStatements?: string[] }): string {
  const g = groupOf(t.group); const p = paperOf(g.sec);
  return (t.asStatements || []).length ? `GCSE ${SUBJ.name} Paper ${p} and Combined Science: Trilogy ${SUBJ.name} Paper ${p}` : `GCSE ${SUBJ.name} Paper ${p} only (not in Combined Science)`;
}
export const motifFor = (t: { slug: string; group: string }) => groupOf(t.group).motif;
