import { spawnSync } from 'node:child_process';
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

const search = (...args) => spawnSync(process.execPath, ['search.js', ...args], {
  cwd: new URL('.', import.meta.url),
  encoding: 'utf8',
});

test('finds titles and summaries without regard to case', () => {
  const title = search('AUTOMATIONS');
  assert.equal(title.status, 0);
  assert.match(title.stdout, /Copilot automations/);
  assert.doesNotMatch(title.stdout, /Security review/);

  const summary = search('screenshots');
  assert.equal(summary.status, 0);
  assert.match(summary.stdout, /Media in issues from the CLI/);
});

test('reports invalid input and prints nothing for no matches', () => {
  const missing = search();
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /Usage:/);
  assert.notEqual(search('  ').status, 0);
  assert.notEqual(search('one', 'two').status, 0);

  const absent = search('not-a-highlight');
  assert.equal(absent.status, 0);
  assert.equal(absent.stdout, '');
});
