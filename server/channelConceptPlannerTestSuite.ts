import assert from 'node:assert/strict';
import { selectChannelConcept,channelConceptPrompt } from './channelConceptPlanner.js';
import { conceptBatchFixture } from './conceptPlannerTestFixtures.js';
const fixture=conceptBatchFixture();
const input={topic:'B.Com vs BBA',channel:'Trust' as const,language:'English',treatment:'Auto',duration:'28 sec',recent:[],maxRepairs:1};
const damaged:any=structuredClone(fixture);damaged.candidates.Discovery=[{unusable:true}];damaged.selected.Discovery='missing';damaged.candidates.Connection=[];
let reviewed:string[]=[];
const result=await selectChannelConcept({...input,request:async()=>JSON.stringify(damaged),review:async c=>{reviewed.push(c.id);return [];}});
assert.equal(result.selected.id,'trust-a');assert.deepEqual(reviewed,['trust-a']);assert.deepEqual(result.comparedWith,[],'Do not imply a completed group comparison');
assert.ok(channelConceptPrompt(input).includes('SCOPE: SINGLE_CHANNEL Trust'));
let attempts=0;
await assert.rejects(selectChannelConcept({...input,maxRepairs:0,request:async()=>JSON.stringify({candidates:[{bad:true}],selected:'bad'}),review:async()=>[]}),/output checks/);
const rebuilt=await selectChannelConcept({...input,request:async()=>{attempts++;return JSON.stringify({candidates:fixture.candidates.Trust,selected:'trust-a'});},review:async()=>attempts===1?['The consequence does not address the observation.']:[]});
assert.equal(attempts,2);assert.equal(rebuilt.selected.id,'trust-a');
const alternative=structuredClone(fixture.candidates.Trust);alternative[0].storySpine=undefined;
const changed=await selectChannelConcept({...input,request:async()=>JSON.stringify({candidates:alternative,selected:'trust-a'}),review:async()=>[]});
assert.equal(changed.selected.id,'trust-b','Use the valid requested-channel alternative without evaluating other channels');
console.log('PASS: requested-channel isolation, malformed other channels ignored, bounded repair, valid local alternative and honest provenance');

assert.ok(!channelConceptPrompt({...input,channel:'Connection'}).includes('For this B.Com vs BBA Trust pilot'));
assert.ok(!channelConceptPrompt({...input,topic:'Choosing physics electives'}).includes('For this B.Com vs BBA Trust pilot'));
console.log('PASS: the focused Trust pilot brief does not leak into other channels or topics');

const advisory=await selectChannelConcept({...input,request:async()=>JSON.stringify({candidates:fixture.candidates.Trust,selected:'trust-a'}),review:async()=>({blocking:[],advice:['A reviewer preference, not proof that the action is invalid.']})});
assert.equal(advisory.selected.reviewNotes?.length,1,'Creative advice is retained transparently without blocking a valid requested-channel draft');
await assert.rejects(selectChannelConcept({...input,maxRepairs:0,request:async()=>JSON.stringify({candidates:fixture.candidates.Trust,selected:'trust-a'}),review:async()=>({blocking:['An unsupported institutional claim conflicts with the source.'],advice:[]})}),/output checks/);
console.log('PASS: calibrated draft policy retains creative advice and blocks grounded integrity concerns without granting approval');
