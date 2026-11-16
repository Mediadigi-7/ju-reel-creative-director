import assert from 'node:assert/strict';
import { LIBRARY_IDEAS, CONTENT_CHANNELS, CHANNEL_IDEA_COUNTS } from '../shared/ideaLibrary.js';
assert.equal(LIBRARY_IDEAS.length,180);
assert.equal(new Set(LIBRARY_IDEAS.map(i=>i.id)).size,180);
assert.equal(new Set(LIBRARY_IDEAS.map(i=>i.title)).size,179);
assert.deepEqual(CONTENT_CHANNELS.map(c=>c.id),['Trust','Connection','Discovery']);
assert.deepEqual(CHANNEL_IDEA_COUNTS,{Trust:52,Connection:86,Discovery:42});
for(const idea of LIBRARY_IDEAS){
  assert.ok(idea.title.trim());assert.ok(idea.topicGroup.trim());assert.ok(idea.reason.trim());
  assert.ok(CONTENT_CHANNELS.some(c=>c.id===idea.channel));
}
assert.deepEqual(['Informative','Funny','Trendy'].map(t=>LIBRARY_IDEAS.filter(i=>i.direction===t).length),[85,40,55]);
const find=(title:string)=>{const idea=LIBRARY_IDEAS.find(i=>i.title===title);assert.ok(idea,title);return idea;};
assert.equal(find('B.Tech vs B.Sc — which fits me?').channel,'Trust');
assert.equal(find('Marks are not the only factor in choosing a career.').channel,'Connection');
assert.equal(find('AI is not just coding — here are 4 roles.').channel,'Discovery');
assert.equal(find('What does your first month at university actually look like?').channel,'Connection');
assert.equal(find('Ask a Joy faculty member anything about this course.').channel,'Trust');
assert.equal(find('Ask a Joy faculty member anything about this course.').direction,'Trendy');
assert.equal(find('Can you guess the course from these 3 clues?').channel,'Discovery');
const duplicates=LIBRARY_IDEAS.filter(i=>i.title==='A faculty member answers a parent’s biggest question.');
assert.equal(duplicates.length,2);
assert.ok(duplicates.every(i=>i.channel==='Trust'));
assert.notEqual(duplicates[0].direction,duplicates[1].direction);
console.log('PASS: 180 original entries, full classification, stable unique IDs, preserved treatments, cross-style editorial decisions, and duplicate preservation');
