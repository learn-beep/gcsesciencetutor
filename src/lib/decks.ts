// Key-term decks for the current subject: boards/<subject>/decks/*.json, copied into src/data/decks by the build. Topic pages pick them up by slug.
const files = import.meta.glob('../data/decks/*.json', { eager: true });
export const decks: any[] = Object.values(files).map((m: any) => m.default ?? m).sort((a, b) => a.name.localeCompare(b.name));
export const deckFor = (slug: string) => decks.find((d) => d.topic === slug);
