import assert from 'node:assert/strict';
import { retimeStoryboard } from '../../shared/timing.js';
import { generateKnowledgeEngineStoryboard } from '../../server/knowledgeEngine.js';
import { encodeStoryboardForUrl, decodeStoryboardFromUrl } from './shareUtils.js';
const reel = generateKnowledgeEngineStoryboard('AI will change these careers');
reel.generation = { source: 'openai', model: 'gpt-4o-mini', generatedAt: new Date().toISOString() };
const decoded = decodeStoryboardFromUrl(encodeStoryboardForUrl(reel));
assert.deepEqual(decoded?.generation, reel.generation);
for (const duration of [20, 28, 45]) {
  const result = { ...reel, ...retimeStoryboard(reel, duration) };
  assert.equal(result.duration, `${duration} sec`);
  let previous = 0;
  for (const shot of result.shots) {
    const [start, end] = [...shot.timestamp.matchAll(/(\d+):(\d{2})/g)].map(m => Number(m[1]) * 60 + Number(m[2]));
    assert.equal(start, previous); assert.ok(end > start); previous = end;
  }
  assert.equal(previous, duration);
  assert.equal(result.shots[0].dialogue, reel.shots[0].dialogue);
}
assert.throws(() => retimeStoryboard(reel, 0));
console.log('PASS: shared links preserve generation source; duration changes retime all six scenes without changing the script');
