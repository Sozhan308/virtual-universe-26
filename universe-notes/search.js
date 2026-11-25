import { readFileSync } from 'node:fs';

const query = process.argv[2]?.trim();
if (!query || process.argv.length !== 3) {
  console.error('Usage: npm run search -- <word>');
  process.exitCode = 1;
} else {
  const notes = JSON.parse(readFileSync(new URL('./notes/keynote-highlights.json', import.meta.url), 'utf8'));
  const term = query.toLowerCase();

  for (const { title, summary } of notes.highlights) {
    if (title.toLowerCase().includes(term) || summary.toLowerCase().includes(term)) {
      console.log(`${title}\n${summary}\n`);
    }
  }
}
