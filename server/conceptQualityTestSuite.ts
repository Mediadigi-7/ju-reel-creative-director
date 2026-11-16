import assert from 'node:assert/strict';
import { storySpineIssues } from '../shared/conceptQuality.js';
import { conceptBatchFixture } from './conceptPlannerTestFixtures.js';
import { clearConceptPlanningCache,selectReelConcept,groundConceptBatch } from './conceptPlanner.js';
import { reviewConceptBatch } from './conceptQualityReview.js';
import { recentFinishedStories,rememberFinishedStory,clearFinishedStoryMemory } from './finishedStoryMemory.js';
import { compareFinishedChannels } from './channelComparison.js';
import { generateOfflineStoryboard } from '../shared/offline/index.js';
const batch=conceptBatchFixture();
assert.ok(storySpineIssues(undefined).length);
assert.deepEqual(storySpineIssues(batch.candidates.Trust[0].storySpine),[]);
assert.ok(storySpineIssues({...batch.candidates.Trust[0].storySpine,visibleConsequence:'Student closes the notebook.'}).length);
const request={topic:'B.Com vs BBA',language:'English',treatment:'Auto',duration:'28 sec',accountKey:'concept-gate-test',provider:'gemini',recent:[],maxRepairs:1};
clearConceptPlanningCache();let plans=0,reviews=0;
const accepted=await selectReelConcept({...request,request:async()=>{plans++;return JSON.stringify(batch);},review:async()=>{reviews++;return reviews===1?['Connection: Categorising expenses does not support a question about auditing budgets.']:[];}});
assert.equal(plans,2);assert.equal(reviews,2);assert.ok(accepted.selected.storySpine);
clearConceptPlanningCache();
await assert.rejects(selectReelConcept({...request,maxRepairs:0,request:async()=>JSON.stringify(batch),review:async()=>['Payoff: A confident nod has no demonstrated consequence.']}),/output checks/);
const issues=await reviewConceptBatch(batch,async prompt=>{assert.ok(prompt.includes('rather than adding a sentence claiming they connect'));return JSON.stringify({issues:[{candidateId:'connection-a',quote:'A concrete question needs to be investigated.',category:'fidelity',evidence:'Connection observes classification but asks about auditing.',revision:'Ask about classifying the observed expense.'}]});});
assert.match(issues[0],/classification/);
const reel=generateOfflineStoryboard('AI will change these careers');reel.channel='Trust';
rememberFinishedStory('account-a','gemini',reel);
assert.equal(recentFinishedStories('account-b','gemini',reel.reelTitle).length,0,'No cross-account story context');
assert.equal(recentFinishedStories('account-a','openai',reel.reelTitle).length,0,'No cross-provider story context');
const copy=recentFinishedStories('account-a','gemini',reel.reelTitle);copy[0].shots[0].dialogue='mutated';
assert.notEqual(recentFinishedStories('account-a','gemini',reel.reelTitle)[0].shots[0].dialogue,'mutated');
const stories=(['Trust','Connection','Discovery'] as const).map(channel=>({...reel,channel}));
const result=await compareFinishedChannels(stories,async prompt=>{assert.ok(prompt.includes('FINISHED storyboards'));assert.ok(prompt.includes('Shared settings are allowed'));return JSON.stringify({issues:[{category:'channel',evidence:'All three actual stories repeat a lone narrator and identical payoff.',revision:'Develop the promised human dilemma and challenge in the relevant stories.'}]});});
assert.equal(result.issues.length,1);
await assert.rejects(compareFinishedChannels(stories.slice(0,2),async()=>''),/Three complete/);
clearConceptPlanningCache();clearFinishedStoryMemory();
console.log('PASS: required concept spine, bounded pre-writing semantic rejection, observable payoff, actual-story comparison and account isolation');

const custom=structuredClone(batch);custom.candidates.Trust[0].basisId='original_reasoned_method';
custom.candidates.Trust[0].hlni='An explanation can reveal an assumption that a final answer hides.';
assert.equal((groundConceptBatch(custom) as typeof batch).candidates.Trust[0].hlni,custom.candidates.Trust[0].hlni,'Original bounded reasoning is preserved for independent review');
const factual=structuredClone(batch);factual.candidates.Trust[0].basisId='verified_curriculum_example';
const grounded=(groundConceptBatch(factual) as typeof batch).candidates.Trust[0];
assert.equal(grounded.supportType,'fact');assert.deepEqual(grounded.sourceIds,['ju-bcom-af-2025-sem1','ju-bba-em-2025-sem1']);
assert.match(grounded.limitations!,/No universal/);
console.log('PASS: original supported methods survive grounding; verified curriculum examples retain exact source scope');

const flat={...batch,candidates:Object.entries(batch.candidates).flatMap(([channel,values])=>values.map(c=>({...c,channel})))};
assert.deepEqual((groundConceptBatch(flat) as typeof batch).candidates.Trust.map(c=>c.id),batch.candidates.Trust.map(c=>c.id));
assert.throws(()=>groundConceptBatch({...flat,candidates:flat.candidates.slice(1)}),/six concept/);
console.log('PASS: compact Gemini wire format retains local candidate cardinality checks');

rememberFinishedStory('account-topic','gemini',{...reel,reelTitle:'AI-selected creative title'},'B.Com vs BBA');
assert.equal(recentFinishedStories('account-topic','gemini','B.Com vs BBA').length,1,'Creative titles must not break requested-topic comparison');
clearFinishedStoryMemory();
console.log('PASS: finished-story comparison uses the requested topic even when the model changes the title');

const ungrounded=await reviewConceptBatch(batch,async()=>JSON.stringify({issues:[{candidateId:'connection-a',quote:'Invented budgeting and auditing dialogue never in this plan.',category:'fidelity',evidence:'The reviewer made up a defect.',revision:'Rewrite an unrelated example.'}]}));
assert.deepEqual(ungrounded,[],'A reviewer cannot reject a concept based on text absent from the selected concept');
console.log('PASS: concept-rejection evidence is bound to an actual selected candidate and verbatim quotation');

const {conceptDeliveryIssues}=await import('../shared/concepts.js');
const evidenceStory=structuredClone(reel);const evidenceConcept={...batch.candidates.Trust[0],basisId:'verified_curriculum_example'};
evidenceStory.conceptSelection={stage:'concept-before-story',deliveryPolicy:'evidence-and-action-v1',selected:evidenceConcept,comparedWith:[],contrast:'Single-channel evidence pilot, group comparison pending.'};
evidenceStory.shots[3].onscreenText='Business Organization & Management';
assert.deepEqual(conceptDeliveryIssues(evidenceStory,evidenceConcept),[],'Natural question wording need not reproduce a planning string');
evidenceStory.shots.forEach(s=>{s.dialogue='A different AI question.';s.onscreenText='';s.visual='A student at a desk.';});
assert.ok(conceptDeliveryIssues(evidenceStory,evidenceConcept).length,'Actual source evidence is still required');
console.log('PASS: scoped evidence policy permits paraphrases but rejects missing course-title evidence');

evidenceStory.shots[3].onscreenText='Business Organization and Management';
assert.deepEqual(conceptDeliveryIssues(evidenceStory,evidenceConcept),[],'The spoken word and is equivalent to the ampersand in the supplied course title');
evidenceStory.shots[3].onscreenText='A different course title';
assert.ok(conceptDeliveryIssues(evidenceStory,evidenceConcept).length,'A different course still fails the source-evidence check');
