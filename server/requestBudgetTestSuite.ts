import assert from 'node:assert/strict';
import { generateStoryboard } from './aiService.js';
import { generateOfflineStoryboard } from '../shared/offline/index.js';
import { withHlniTestProposal } from './hlniTestFixture.js';
import { conceptBatchFixture } from './conceptPlannerTestFixtures.js';
import { clearConceptPlanningCache } from './conceptPlanner.js';
import { AiProviderError } from './aiErrors.js';
import { validateAndRepairStoryboard } from '../shared/schema.js';
import { encodeStoryboardForUrl,decodeStoryboardFromUrl } from '../src/services/shareUtils.js';
const originalFetch=globalThis.fetch,originalNow=Date.now;
const fixture=withHlniTestProposal(generateOfflineStoryboard('AI will change these careers'));
const request={reelTitle:fixture.reelTitle,apiProvider:'gemini' as const,apiKey:'test-only',channel:'Trust' as const};
const batch=conceptBatchFixture();
const critique={issues:[{category:'payoff',evidence:'Shot 3 has no demonstrated consequence.',revision:'Show the concrete next question changing the action.'}]};
let clock=originalNow(),calls:string[]=[],traces:any[]=[],writes=0;
function setup(handler:(stage:string,init:RequestInit)=>unknown|Promise<unknown>) {
 clearConceptPlanningCache();clock=originalNow();calls=[];traces=[];writes=0;Date.now=()=>clock;
 globalThis.fetch=async(url,init)=>{
  assert.match(String(url),/generativelanguage.googleapis.com/,'No paid-provider fallback');assert.ok(init?.signal);
  const prompt=JSON.parse(String(init?.body)).contents[0].parts[0].text;
  const stage=prompt.startsWith('TASK: CONCEPT_SELECTION')?'concept':prompt.startsWith('TASK: EDITORIAL_REVIEW')?'critique':++writes===1?'story':'rewrite';
  calls.push(stage);const value=await handler(stage,init!);
  return new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(value)}]}}]}));
 };
}
const options=()=>({onStage:(event:any)=>traces.push(event)});
const before=JSON.stringify(fixture);
try {
 setup(stage=>{clock+=stage==='story'?22000:1000;return stage==='concept'?batch:fixture;});
 let result=await generateStoryboard(request,options());
 assert.deepEqual(calls,['concept','story']);assert.ok(traces.some(t=>t.outcome==='skipped_insufficient_budget'));assert.match(result.generation!.warnings![0],/skipped/);
 for(const category of ['network','billing_quota','timeout'] as const) {
  setup(stage=>{clock+=500; if(stage==='critique')throw new AiProviderError(category);return stage==='concept'?batch:fixture;});
  result=await generateStoryboard(request,options());assert.deepEqual(calls,['concept','story','critique']);assert.deepEqual(result.shots,fixture.shots);assert.match(result.generation!.warnings![0],new RegExp(category));
 }
 setup(stage=>{clock+=500;if(stage==='critique')return {approved:true};return stage==='concept'?batch:fixture;});
 result=await generateStoryboard(request,options());assert.match(result.generation!.warnings![0],/invalid_response/);assert.equal(calls.length,3);
 setup(stage=>{clock+=500;if(stage==='rewrite'){clock+=18000;throw new DOMException('budget','TimeoutError');}return stage==='concept'?batch:stage==='critique'?critique:fixture;});
 result=await generateStoryboard(request,options());assert.deepEqual(result.shots,fixture.shots);assert.match(result.generation!.warnings![0],/timeout/);assert.ok(clock-originalNow()<50000);assert.equal(calls.filter(s=>s==='critique').length,1);
 setup((stage,init)=>{clock+=500;if(stage==='rewrite'){const prompt=JSON.parse(String(init.body)).contents[0].parts[0].text;assert.match(prompt,/original topic, selected method, factual limits and production contract override/);}return stage==='concept'?batch:stage==='critique'?critique:fixture;});
 result=await generateStoryboard(request,options());assert.deepEqual(calls,['concept','story','critique','rewrite']);assert.equal(result.status,'Draft');assert.equal(result.editorialReview,undefined);
 const broken=structuredClone(fixture);for(const shot of broken.shots){shot.onscreenText='';shot.dialogue='This AI example needs a more specific question.';shot.visual='An illustrative AI task.';}
 setup(stage=>{clock+=stage==='story'?38000:1000;return stage==='concept'?batch:broken;});
 await assert.rejects(generateStoryboard(request,options()),e=>e instanceof AiProviderError&&e.category==='timeout');assert.deepEqual(calls,['concept','story'],'No insufficient-budget ordinary repair');
 setup(stage=>{clock+=100;return stage==='concept'?batch:broken;});
 await assert.rejects(generateStoryboard(request,{maxRepairs:0}),e=>e instanceof AiProviderError&&e.category==='output_validation');
 setup(()=>{throw new AiProviderError('authentication');});await assert.rejects(generateStoryboard(request),e=>e instanceof AiProviderError&&e.category==='authentication');assert.equal(calls.length,1);
 let controller=new AbortController();controller.abort();setup(()=>fixture);
 await assert.rejects(generateStoryboard(request,{signal:controller.signal}),e=>e instanceof AiProviderError&&e.category==='cancelled');assert.equal(calls.length,0);
 controller=new AbortController();setup(stage=>{if(stage==='story')controller.abort();return stage==='concept'?batch:fixture;});
 await assert.rejects(generateStoryboard(request,{signal:controller.signal}),e=>e instanceof AiProviderError&&e.category==='cancelled');assert.deepEqual(calls,['concept','story']);
 // An invalid advisory rewrite must not replace the valid story or its boundaries.
 setup(stage=>{clock+=100;return stage==='concept'?batch:stage==='critique'?critique:stage==='rewrite'?broken:fixture;});
 result=await generateStoryboard(request,options());assert.deepEqual(result.shots,fixture.shots);assert.equal(result.generation?.source,'gemini');assert.equal(result.status,'Draft');
 assert.equal(validateAndRepairStoryboard(result,result.reelTitle).data.shots.length,fixture.shots.length);
 assert.equal(decodeStoryboardFromUrl(encodeStoryboardForUrl(result))!.shots.length,fixture.shots.length);
 assert.equal(JSON.stringify(fixture),before,'Input stories and saved edits are never mutated');
 console.log('PASS: budget skip, optional critique errors, malformed critique, rewrite timeout, initial errors, single critique, repair reservation, cancellation, Draft preservation, scenes/sharing and no fallback');
}finally{Date.now=originalNow;globalThis.fetch=originalFetch;clearConceptPlanningCache();}
