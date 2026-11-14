import { installConceptPlanningMocks } from './conceptPlannerTestFixtures.js';
import { withHlniTestProposal } from './hlniTestFixture.js';
import assert from 'node:assert/strict';
import { generateOfflineStoryboard } from '../shared/offline/index.js';
import { applyDialogueRepair, buildDialogueRepair, normalizeComparisonCaptions, speechUnits } from './outputRepair.js';
import { generateStoryboard, regenerateShot, checkLanguageCompliance } from './aiService.js';
import type { ReelStoryboard } from '../shared/types.js';

const fixture = withHlniTestProposal(generateOfflineStoryboard('How do I choose the right college?'));
const patch = { shots:fixture.shots.map(s => ({ number:s.number, dialogue:s.dialogue, onscreenText:s.onscreenText })) };
const snapshot = JSON.stringify(fixture);
const repaired = applyDialogueRepair(fixture, patch);
assert.equal(JSON.stringify(fixture), snapshot, 'Repair must not mutate the previous candidate');
assert.deepEqual(repaired.shots.map(s=>[s.visual,s.timestamp,s.type]), fixture.shots.map(s=>[s.visual,s.timestamp,s.type]));
assert.throws(()=>applyDialogueRepair(fixture,{shots:patch.shots.slice(0,5)}));
assert.throws(()=>applyDialogueRepair(fixture,{shots:patch.shots.map(s=>({...s,number:1}))}));
assert.equal(speechUnits('  ', 'English'),0);
assert.equal(speechUnits('One useful next step.', 'English'),4);
assert.ok(buildDialogueRepair({...fixture,channel:'Connection'},'Too long').includes('maximumDialogueUnits'));
assert.ok(buildDialogueRepair({...fixture,language:'Tamil'},'English caption').includes('Translate English words'));

for(const [language,line] of [['Tamil','பாடங்களை ஒப்பிடுங்கள்.'],['Telugu','పాఠ్యాంశాలను పోల్చండి.'],['Malayalam','പാഠ്യപദ്ധതികൾ താരതമ്യം ചെയ്യുക.'],['Hindi','पाठ्यक्रमों की तुलना करें।']] as const) {
 const native:ReelStoryboard = {...fixture,shots:fixture.shots.map(s=>({...s,dialogue:line,onscreenText:line}))};
 assert.equal(checkLanguageCompliance(native,language).pass,true);
 native.shots[0].onscreenText='B.Com vs BBA';
 assert.equal(checkLanguageCompliance(native,language).pass,false,'English connector must be translated');
 native.language=language;
 const normalized=normalizeComparisonCaptions(native);
 assert.equal(normalized.shots[0].onscreenText,'B.Com / BBA');
 assert.equal(checkLanguageCompliance(normalized,language).pass,true);
 assert.equal(native.shots[0].onscreenText,'B.Com vs BBA','Never mutate the original');
 native.shots[0].onscreenText='Save this: B.Com vs BBA';
 assert.equal(normalizeComparisonCaptions(native).shots[0].onscreenText,native.shots[0].onscreenText,'Never hide English prose');
}
assert.equal(normalizeComparisonCaptions(fixture),fixture,'English captions remain unchanged');

const originalFetch=globalThis.fetch;
const restorePlanningMocks=installConceptPlanningMocks();
try {
 let requests=0;
 const overlong=structuredClone(fixture);
 overlong.shots[0].dialogue+=' college '.repeat(100);
 globalThis.fetch=async(_url,init)=>{
  requests++;
  const body=JSON.parse(init!.body as string);
  if(requests===2) {
   assert.ok(body.contents[0].parts[0].text.includes('currentDialogueUnits'));
   assert.ok(body.contents[0].parts[0].text.includes('Original idea:'));
  }
  const content=requests===1?overlong:patch;
  return new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(content)}]}}]}));
 };
 const result=await generateStoryboard({reelTitle:fixture.reelTitle,apiKey:'test-only',apiProvider:'gemini'});
 assert.equal(requests,2,'Oversized speech must receive a targeted repair');
 assert.equal(result.generation?.source,'gemini');
 assert.deepEqual(result.shots.map(s=>s.dialogue),fixture.shots.map(s=>s.dialogue));
 requests=0;
 globalThis.fetch=async()=>{requests++;return new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(requests===1?overlong:{shots:patch.shots.map(s=>({...s,dialogue:'college '.repeat(100)}))})}]}}]}));};
 await assert.rejects(generateStoryboard({reelTitle:fixture.reelTitle,apiKey:'test-only',apiProvider:'gemini'},{maxRepairs:1}),/output checks/);
 assert.equal(requests,2,'Invalid repaired speech must be rejected, never returned as success');
 globalThis.fetch=async()=>new Response(JSON.stringify({candidates:[{content:{parts:[{text:'{}'}]}}]}));
 await assert.rejects(regenerateShot({reelTitle:fixture.reelTitle,creativeAngle:fixture.creativeAngle,
  targetAudience:fixture.targetAudience,currentStoryboard:fixture,shotNumber:1,shotType:'HOOK',apiKey:'test-only',apiProvider:'gemini'}),/existing shot was preserved/);
 assert.equal(JSON.stringify(fixture),snapshot,'An incomplete regeneration response must preserve the existing draft');
}finally{globalThis.fetch=originalFetch;restorePlanningMocks();}
console.log('PASS: bounded targeted repair, preserved scenes, rejected incomplete patches, all four native scripts, and complete QA after repair');
