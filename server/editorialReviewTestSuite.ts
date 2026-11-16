import assert from 'node:assert/strict';
import { reviewStoryboard } from './editorialReview.js';
import { conceptBatchFixture } from './conceptPlannerTestFixtures.js';
import { generateOfflineStoryboard } from '../shared/offline/index.js';
import { withHlniTestProposal } from './hlniTestFixture.js';
import { generateStoryboard } from './aiService.js';
import { clearConceptPlanningCache } from './conceptPlanner.js';
import { AiProviderError } from './aiErrors.js';
const reel=withHlniTestProposal(generateOfflineStoryboard('AI will change these careers'));
const batch=conceptBatchFixture(),concept=batch.candidates.Trust[0];
assert.deepEqual(await reviewStoryboard(reel,concept,async()=>'{"issues":[]}'),[]);
const critique={issues:[{category:'payoff',evidence:'Shot 3 asks about the task although the unknown cell is the marking criterion.',revision:'Ask about the missing criterion and show which empty cell prompted that question.'}]};
assert.match((await reviewStoryboard(reel,concept,async()=>JSON.stringify(critique)))[0],/Shot 3/);
const conflicting={issues:[
 {category:'integrity',evidence:'Observed critic drift',revision:"Replace the specific degree labels with generic category labels like Field A vs Field B."},
 {category:'fidelity',evidence:'Observed invented degree association',revision:'Reference the different assessment styles typically associated with B.Com and BBA.'},
 critique.issues[0],
]};
assert.equal((await reviewStoryboard(reel,concept,async()=>JSON.stringify(conflicting))).length,1,'Reject conflicting critic requests while preserving useful advice');
await assert.rejects(reviewStoryboard(reel,concept,async()=>'{"approved":true}'));
await assert.rejects(reviewStoryboard(reel,concept,async()=>{throw new AiProviderError('billing_quota');}),e=>e instanceof AiProviderError&&e.category==='billing_quota');
const original=globalThis.fetch;clearConceptPlanningCache();
try {
 let writes=0,reviews=0;const stages:string[]=[];
 globalThis.fetch=async(_url,init)=>{
  const prompt=JSON.parse(String(init?.body)).contents[0].parts[0].text;
  if(prompt.startsWith('TASK: CONCEPT_REVIEW'))return new Response(JSON.stringify({candidates:[{content:{parts:[{text:'{"issues":[]}'}]}}]}));
  let content:unknown;
  if(prompt.startsWith('TASK: CONCEPT_SELECTION')){stages.push('plan');content=batch;}
  else if(prompt.startsWith('TASK: EDITORIAL_REVIEW')){stages.push('review');content=++reviews===1?critique:{issues:[]};}
  else{stages.push('write');writes++;if(writes===2)assert.match(prompt,/missing criterion/);content=reel;}
  return new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(content)}]}}]}));
 };
 const failures:any[]=[];
 const result=await generateStoryboard({reelTitle:reel.reelTitle,apiProvider:'gemini',apiKey:'test-only',channel:'Trust'},
  {maxRepairs:1,onQualityFailure:(_candidate,qa)=>failures.push(qa)});
 assert.deepEqual(stages,['plan','write','review','write']);
 assert.equal(failures[0].failedGate,'Editorial self-review');
 assert.equal(result.status,'Draft');assert.equal(result.editorialReview,undefined,'Model critique cannot grant editorial approval');
 clearConceptPlanningCache();reviews=0;writes=0;
 globalThis.fetch=async(_url,init)=>{
  const prompt=JSON.parse(String(init?.body)).contents[0].parts[0].text;
  if(prompt.startsWith('TASK: CONCEPT_REVIEW'))return new Response(JSON.stringify({candidates:[{content:{parts:[{text:'{"issues":[]}'}]}}]}));
  const content=prompt.startsWith('TASK: CONCEPT_SELECTION')?batch:prompt.startsWith('TASK: EDITORIAL_REVIEW')?(reviews++,critique):(writes++,reel);
  return new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(content)}]}}]}));
 };
 const bounded=await generateStoryboard({reelTitle:reel.reelTitle,apiProvider:'gemini',apiKey:'test-only',channel:'Trust'}, {maxRepairs:1});
 assert.equal(writes,2);assert.equal(reviews,1,'An advisory model cannot create an endless critique loop');
 assert.equal(bounded.status,'Draft');assert.equal(bounded.editorialReview,undefined);

}finally{globalThis.fetch=original;clearConceptPlanningCache();}
console.log('PASS: editorial critique repairs actual drafts, stays bounded, rejects malformed critique and never grants application approval');
