import assert from 'node:assert/strict';
import { generateOfflineStoryboard, OFFLINE_IDEAS, OFFLINE_LANGUAGES, supportsOffline } from '../shared/offline/index.js';
import { validateOfflineStoryboard } from '../shared/offline/validate.js';
import { generateKnowledgeEngineStoryboard } from './knowledgeEngine.js';
const directions = ['Informative','Funny','Trendy'] as const;
let count=0;
const budgets: {id:string;language:string;seconds:number;words:number}[]=[];
for (const idea of OFFLINE_IDEAS) for (const language of OFFLINE_LANGUAGES) {
  const narratives = new Set<string>();
  for (const direction of directions) {
    const reel = generateOfflineStoryboard(idea.title,direction,language);
    validateOfflineStoryboard(reel);
    assert.equal(reel.reelTitle,idea.title);
    assert.equal(reel.language,language);
    assert.equal(reel.generation?.templateId,`${idea.id}-${direction}`);
    assert.equal(reel.generation?.catalogueVersion,'1.0');
    assert.ok(parseInt(reel.duration)<=45,'Authored script must fit the maximum 45-second planning window');
    narratives.add(reel.shots.map(s=>s.dialogue).join('|'));
    const repeated = generateKnowledgeEngineStoryboard(idea.title,direction,language,reel.duration,999);
    assert.deepEqual(repeated.shots,reel.shots,'Seeds must not splice unrelated scenes into fixed authored stories');
    assert.notEqual(repeated.id,reel.id,'Each draft has its own id');
    budgets.push({id:reel.generation!.templateId!,language,seconds:parseInt(reel.duration),words:reel.shots.map(s=>s.dialogue).join(' ').split(/\s+/).length});
    for (const duration of ['20 sec','45 sec']) validateOfflineStoryboard(generateOfflineStoryboard(idea.title,direction,language,duration));
    count++;
  }
  assert.equal(narratives.size,3,`${idea.id}/${language} must have three distinct narratives`);
}
for(const unsupported of ['B.Com vs BBA','B.Tech vs B.Sc','AI Careers','AI in agriculture','college sports', 'I finished +2 now what about law']) {
  assert.equal(supportsOffline(unsupported),false);
  assert.throws(()=>generateOfflineStoryboard(unsupported),/needs live AI/);
}
assert.throws(()=>generateOfflineStoryboard(OFFLINE_IDEAS[0].title,'Informative','Tanglish'),/needs live AI/);
const altered=generateOfflineStoryboard(OFFLINE_IDEAS[0].title);
altered.shots[5].dialogue='Save this and share it.';
assert.throws(()=>validateOfflineStoryboard(altered),/CTA/);
const corrupted=generateOfflineStoryboard(OFFLINE_IDEAS[0].title);
corrupted.shots[5].timestamp='00:25 – 00:29';assert.throws(()=>validateOfflineStoryboard(corrupted),/timing|duration/i);
console.log(`PASS: ${count} authored offline scripts, 3 distinct treatments per idea/language, 180 duration variants, exact scope, stable narratives and runtime quality guards`);
console.log('Planning duration range:',Math.min(...budgets.map(x=>x.seconds)),Math.max(...budgets.map(x=>x.seconds)));

const nativeBroken=generateOfflineStoryboard(OFFLINE_IDEAS[0].title,'Informative','Tamil');
nativeBroken.shots[0].onscreenText='English placeholder';
assert.throws(()=>validateOfflineStoryboard(nativeBroken),/native-script/);
const unsupportedStyle = 'Cinematic' as typeof directions[number];
assert.throws(()=>generateOfflineStoryboard(OFFLINE_IDEAS[0].title,unsupportedStyle),/needs live AI/);
assert.equal(supportsOffline('  I FINISHED +2… NOW WHAT?  '),true);
