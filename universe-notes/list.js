import { readFileSync } from 'node:fs';

const notes = JSON.parse(readFileSync(new URL('./notes/keynote-highlights.json', import.meta.url), 'utf8'));
const topics = new Map();

for (const { topic, title } of notes.highlights) {
  if (!topics.has(topic)) topics.set(topic, []);
  topics.get(topic).push(title);
}

for (const [topic, titles] of topics) {
  console.log(`${topic}\n${titles.map((title) => `- ${title}`).join('\n')}`);
}
