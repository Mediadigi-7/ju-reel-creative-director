import { installConceptPlanningMocks } from './conceptPlannerTestFixtures.js';
import { withHlniTestProposal } from './hlniTestFixture.js';
import assert from 'node:assert/strict';
import { generateOfflineStoryboard } from '../shared/offline/index.js';
import { validateAndRepairStoryboard } from '../shared/schema.js';
import { generateStoryboard, extractContentCore, runMultiGateQA, regenerateShot } from './aiService.js';
import { applyDialogueRepair, buildDialogueRepair } from './outputRepair.js';
import { retimeStoryboard } from '../shared/timing.js';
import { findCtaShot } from '../shared/creativeFramework.js';
import { encodeStoryboardForUrl, decodeStoryboardFromUrl } from '../src/services/shareUtils.js';
import { formatProductionBriefing, formatStoryboardForWhatsApp } from '../src/services/copyUtils.js';
import { testAiGeneration } from './testAiGeneration.js';
import { apiTestAiGeneration } from '../src/services/api.js';
import type { ReelStoryboard } from '../shared/types.js';

const seed=generateOfflineStoryboard('AI will change these careers');
const time=(n:number)=>`00:${String(n).padStart(2,'0')}`;
function makeReel(count:number):ReelStoryboard {
 return withHlniTestProposal({...seed, duration:`${count*4} sec`, shots:Array.from({length:count},(_,i)=>({
  ...seed.shots[i%seed.shots.length], number:i+1, type:'SCENE', name:`Production scene ${i+1}`,
  timestamp:`${time(i*4)} – ${time((i+1)*4)}`,
  dialogue:'AI tools change tasks; compare the actual work.', onscreenText:'Compare actual tasks',
  functions:i===0?['HOOK','PROBLEM']:i===count-1?['VALUE','PAYOFF']:undefined,
 }))});
}
const core=extractContentCore(seed.reelTitle);
for(const count of [1,3,4,7,10]) {
 const reel=makeReel(count);
 const validated=validateAndRepairStoryboard(reel,reel.reelTitle);
 assert.equal(validated.valid,true);
 assert.equal(validated.data.shots.length,count,'Never pad or truncate the production list');
 assert.deepEqual(validated.data.shots,JSON.parse(JSON.stringify(reel.shots.map(s=>({...s,userEdited:Boolean(s.userEdited)})))));
 assert.equal(runMultiGateQA(reel,core,'English','Informative').pass,true,'No mandatory stage sequence or CTA');
 const decoded=decodeStoryboardFromUrl(encodeStoryboardForUrl(reel));
 assert.deepEqual(decoded?.shots,validated.data.shots,'Sharing preserves count, names, order and combined function tags');
 assert.equal(findCtaShot(reel),undefined);
 assert.ok(!formatStoryboardForWhatsApp(reel).includes('*Next action:*'),'No fabricated CTA in exported brief');
 assert.ok(formatProductionBriefing(reel).includes(`${count} PRODUCTION SHOTS`));
 const changed={...reel,...retimeStoryboard(reel,count*3)};
 assert.equal(changed.shots.length,count);
 assert.equal(changed.shots.at(-1)?.timestamp.split(' – ')[1],time(count*3));
 assert.deepEqual(changed.shots.map(s=>s.dialogue),reel.shots.map(s=>s.dialogue));
 const patch={shots:reel.shots.map(s=>({number:s.number,dialogue:s.dialogue,onscreenText:s.onscreenText}))};
 assert.equal(applyDialogueRepair(reel,patch).shots.length,count);
 assert.ok(buildDialogueRepair(reel,'Too long').includes('CTA optional'));
 assert.throws(()=>applyDialogueRepair(reel,{shots:[]}));
}
const silent=makeReel(3);silent.shots[1].dialogue='';silent.shots[1].onscreenText='';
assert.equal(runMultiGateQA(silent,core,'English','Informative').pass,true,'A visual-only shot is legitimate');
const reordered=makeReel(4);reordered.shots[0].type='VALUE';reordered.shots[1].type='PATTERN_INTERRUPT';
assert.equal(runMultiGateQA(reordered,core,'English','Informative').pass,true,'Value may precede a perspective shift');
const stacked=makeReel(3);stacked.shots[2].dialogue='Save this and share this.';
assert.equal(runMultiGateQA(stacked,core,'English','Informative').failedGate,'Delivery (CTA)','Optional does not permit stacked actions');
stacked.shots[2].dialogue='Save this.';stacked.shots[2].onscreenText='Save this';
assert.equal(runMultiGateQA(stacked,core,'English','Informative').pass,true,'The same action in speech and graphics is one CTA');
assert.equal(validateAndRepairStoryboard({...seed,shots:[]},seed.reelTitle).valid,false);
assert.deepEqual(validateAndRepairStoryboard(seed,seed.reelTitle).data.shots,seed.shots,'Legacy six-shot samples survive unchanged');

const original=globalThis.fetch;
const restorePlanningMocks=installConceptPlanningMocks();
try {
 for(const provider of ['gemini','openai'] as const) for(const count of [3,8]) {
  const reel={...makeReel(count),creativeDirection:'Funny'};
  globalThis.fetch=async(_url,init)=>{
   const body=JSON.parse(init!.body as string);
   const prompt=provider==='gemini'?body.contents[0].parts[0].text:body.messages[1].content;
   assert.ok(prompt.includes('Choose the strongest treatment'));
   return new Response(JSON.stringify(provider==='gemini'?{candidates:[{content:{parts:[{text:JSON.stringify(reel)}]}}]}:{choices:[{message:{content:JSON.stringify(reel)}}]}));
  };
  const result=await generateStoryboard({reelTitle:seed.reelTitle,creativeDirection:'Auto',apiProvider:provider,apiKey:'test-only'});
  assert.equal(result.shots.length,count);
  assert.equal(result.creativeDirection,'Funny','Auto retains the AI-selected treatment');
 }
 const connectionFixture=generateOfflineStoryboard('How do I choose the right college?');
 connectionFixture.shots=connectionFixture.shots.slice(0,3);
 Object.assign(connectionFixture,withHlniTestProposal(connectionFixture));
 globalThis.fetch=async()=>new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(connectionFixture)}]}}]}));
 assert.equal((await testAiGeneration({provider:'gemini',apiKey:'test-only'})).shotCount,3,'Live test does not demand six scenes');
 const result={provider:'gemini',model:(await import('../shared/providers.js')).PROVIDER_MODELS.gemini,checkedAt:new Date().toISOString(),elapsedMs:10,success:true,shotCount:3};
 globalThis.fetch=async()=>new Response(JSON.stringify(result));
 assert.equal((await apiTestAiGeneration('gemini','test-only')).shotCount,3,'Browser test helper accepts variable shot counts');
 const reel=makeReel(8);const before=JSON.stringify(reel);
 globalThis.fetch=async()=>new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(reel.shots[6])}]}}]}));
 const shot=await regenerateShot({reelTitle:reel.reelTitle,creativeAngle:reel.creativeAngle,targetAudience:reel.targetAudience,
  currentStoryboard:reel,shotNumber:7,shotType:'SCENE',apiKey:'test-only',apiProvider:'gemini'});
 assert.equal(shot.number,7);assert.equal(JSON.stringify(reel),before);
 const visualOnly={...reel.shots[0],dialogue:'',onscreenText:''};
 globalThis.fetch=async()=>new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(visualOnly)}]}}]}));
 const silentShot=await regenerateShot({reelTitle:reel.reelTitle,creativeAngle:reel.creativeAngle,targetAudience:reel.targetAudience,
  currentStoryboard:reel,shotNumber:1,shotType:'SCENE',apiKey:'test-only',apiProvider:'gemini'});
 assert.equal(silentShot.dialogue,'');assert.equal(silentShot.onscreenText,'');
}finally{globalThis.fetch=original;restorePlanningMocks();}
console.log('PASS: variable shot counts, combined/reordered functions, optional interrupt/CTA, silent shots, Auto treatment, repairs, sharing, timing, exports, legacy samples, generation tests and shot 7 regeneration');
