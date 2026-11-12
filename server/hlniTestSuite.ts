import { installConceptPlanningMocks } from './conceptPlannerTestFixtures.js';
import assert from 'node:assert/strict';
import { generateOfflineStoryboard } from '../shared/offline/index.js';
import { approveEditorialReview, enforceEditorialStatus, hlniIssues, isEditoriallyApproved, editorialLabel,
  type HlniChecks } from '../shared/hlni.js';
import { validateAndRepairStoryboard } from '../shared/schema.js';
import { encodeStoryboardForUrl, decodeStoryboardFromUrl, encodeLibraryForUrl, decodeLibraryFromUrl } from '../src/services/shareUtils.js';
import { formatProductionBriefing } from '../src/services/copyUtils.js';
import { generateStoryboard, SYSTEM_PROMPT } from './aiService.js';
import { withHlniTestProposal } from './hlniTestFixture.js';

const old=generateOfflineStoryboard('AI will change these careers');
const proposed=withHlniTestProposal(old);
const checks:HlniChecks={newInformation:true,highLeverage:true,supported:true,integrated:true,paysOff:true};
assert.equal(isEditoriallyApproved(old),false,'Legacy/offline scripts must not be grandfathered into approval');
assert.equal(isEditoriallyApproved(proposed),false,'AI metadata alone is never approval');
assert.throws(()=>approveEditorialReview(old,checks),/HLNI/);
assert.throws(()=>approveEditorialReview({...proposed,hlni:[{...proposed.hlni![0],insight:'Follow your passion.'}]},checks),/HLNI/,'Known generic advice cannot be approved by filling metadata');
assert.throws(()=>approveEditorialReview(proposed,{...checks,newInformation:false}),/five/,'Familiar reassurance fails the novelty check');
assert.throws(()=>approveEditorialReview(proposed,{...checks,highLeverage:false}),/five/,'Emotion without changed understanding/action is insufficient');
assert.throws(()=>approveEditorialReview(proposed,{...checks,supported:false}),/five/);
assert.throws(()=>approveEditorialReview(proposed,{...checks,integrated:false}),/five/);
assert.throws(()=>approveEditorialReview(proposed,{...checks,paysOff:false}),/five/);
const candidate=proposed.hlni![0];
assert.ok(hlniIssues({...candidate,supportType:'fact',references:[]},proposed).length);
assert.ok(hlniIssues({...candidate,shotNumbers:[999]},proposed).length);
assert.ok(hlniIssues({...candidate,payoffShotNumbers:[]},proposed).length);
assert.equal(hlniIssues({...candidate,shotNumbers:[1],payoffShotNumbers:[1]},proposed).length,0,'Insight and payoff may combine in one scene');
const approved=approveEditorialReview(proposed,checks);
assert.equal(isEditoriallyApproved(approved),true);
assert.equal(approved.status,'Ready for Production');
assert.equal(isEditoriallyApproved(validateAndRepairStoryboard(approved,approved.reelTitle).data),true,'Local normalization must preserve a valid content-bound review');
for(const changed of [
 {...approved,channel:'Connection' as const}, {...approved,duration:'45 sec'},
 {...approved,hlni:[{...candidate,insight:'Another proposed insight'}]},
 ...['visual','dialogue','onscreenText','cameraPerformance','timestamp'].map(field=>({...approved,shots:approved.shots.map((s,i)=>i? s:{...s,[field]:'Changed content'})})),
]) {
 assert.equal(isEditoriallyApproved(changed),false,'Content changes invalidate review');
 assert.equal(enforceEditorialStatus(changed).status,'Draft');
}
assert.ok(formatProductionBriefing(proposed).includes('HLNI editorial review required'));
assert.ok(formatProductionBriefing(approved).includes('HLNI editorial review approved'));
const shared=decodeStoryboardFromUrl(encodeStoryboardForUrl(approved))!;
assert.deepEqual(shared.hlni,approved.hlni);
assert.equal(shared.status,'Draft');assert.equal(isEditoriallyApproved(shared),false,'A shared draft does not inherit a trusted local review');
const library=decodeLibraryFromUrl(encodeLibraryForUrl([{id:approved.id,title:approved.reelTitle,currentVersionId:approved.id,createdAt:approved.createdAt,updatedAt:approved.updatedAt,status:approved.status,tags:[],versions:[approved]}]))!;
assert.equal(isEditoriallyApproved(library[0].versions[0]),false);
assert.ok(SYSTEM_PROMPT.includes('HLNI is not a seventh stage'));
assert.ok(SYSTEM_PROMPT.includes('Metadata does not count as information delivered'));

const original=globalThis.fetch;
const restorePlanningMocks=installConceptPlanningMocks();
try {
 let calls=0;
 globalThis.fetch=async(_url,init)=>{
  calls++;const prompt=JSON.parse(init!.body as string).contents[0].parts[0].text;
  if(calls===2)assert.ok(prompt.includes('HLNI proposal'));
  return new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(calls===1?old:proposed)}]}}]}));
 };
 const reel=await generateStoryboard({reelTitle:old.reelTitle,apiProvider:'gemini',apiKey:'test-only'});
 assert.equal(calls,2,'Missing HLNI must trigger a repair rather than count a polished draft as complete');
 assert.equal(reel.shots.length,old.shots.length,'HLNI adds no mandatory scene');
 assert.equal(reel.editorialReview,undefined);assert.equal(reel.status,'Draft');
 globalThis.fetch=async()=>new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(approved)}]}}]}));
 const selfApproved=await generateStoryboard({reelTitle:old.reelTitle,apiProvider:'gemini',apiKey:'test-only'});
 assert.equal(isEditoriallyApproved(selfApproved),false,'Provider-generated approval is discarded');
 globalThis.fetch=async()=>new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(old)}]}}]}));
 await assert.rejects(generateStoryboard({reelTitle:old.reelTitle,apiProvider:'gemini',apiKey:'test-only'},{maxRepairs:1}),/output checks/);
}finally{globalThis.fetch=original;restorePlanningMocks();}
console.log('PASS: mandatory HLNI proposal; all five editorial checks; facts/references and scene links; no self-approval; content-bound review invalidation; optional/combined narrative functions; legacy drafts and sharing');
