import { installConceptPlanningMocks } from './conceptPlannerTestFixtures.js';
import { withHlniTestProposal } from './hlniTestFixture.js';
import assert from 'node:assert/strict';
import { CHANNEL_NAMES, channelPrompt, CHANNEL_STRATEGIES } from '../shared/channels.js';
import { generateStoryboard, regenerateShot } from './aiService.js';
import { generateOfflineStoryboard, OFFLINE_CHANNEL_UNSUPPORTED } from '../shared/offline/index.js';
import { encodeStoryboardForUrl, decodeStoryboardFromUrl } from '../src/services/shareUtils.js';
import { formatProductionBriefing, formatStoryboardForWhatsApp } from '../src/services/copyUtils.js';
import { saveProjectToLibrary, loadSavedProjects, saveCurrentStoryboard, loadCurrentStoryboard } from '../src/services/storage.js';
const originalFetch=globalThis.fetch;
const restorePlanningMocks=installConceptPlanningMocks();
const title='AI will change these careers';
const fixture=withHlniTestProposal(generateOfflineStoryboard(title));
const memory = new Map<string,string>();
const originalStorage=globalThis.localStorage;
Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(k:string)=>memory.get(k)??null,setItem:(k:string,v:string)=>memory.set(k,v),removeItem:(k:string)=>memory.delete(k)}});
try {
 for(const channel of CHANNEL_NAMES)for(const direction of ['Informative','Funny','Trendy'] as const){
  let requests=0;
  globalThis.fetch=async(_input,init)=>{
   const body=JSON.parse(init!.body as string);const prompt=body.messages[1].content;
   assert.ok(prompt.includes('CHANNEL GOAL: '+channel));assert.ok(prompt.includes(CHANNEL_STRATEGIES[channel].audience));
   assert.ok(prompt.includes('Channel is independent of treatment'));assert.ok(prompt.includes('Selected Creative Type: "'+direction+'"'));
   requests++;
   const candidate=structuredClone(fixture);candidate.channel='Discovery';
   if(requests===1) candidate.shots[0].dialogue='Stop scrolling! AI careers.';
   return new Response(JSON.stringify({choices:[{message:{content:JSON.stringify(candidate)}}]}));
  };
  const reel=await generateStoryboard({reelTitle:title,channel,creativeDirection:direction,apiKey:'test-only-key',apiProvider:'openai'});
  assert.equal(requests,2);assert.equal(reel.channel,channel);assert.equal(reel.creativeDirection,direction);
  assert.equal(reel.targetAudience,CHANNEL_STRATEGIES[channel].audience);
  assert.equal(decodeStoryboardFromUrl(encodeStoryboardForUrl(reel))?.channel,channel);
  assert.ok(formatProductionBriefing(reel).includes('CHANNEL GOAL:    '+channel));
  assert.ok(formatStoryboardForWhatsApp(reel).includes('Channel: '+channel));
  saveCurrentStoryboard(reel);assert.equal(loadCurrentStoryboard()?.channel,channel);
  saveProjectToLibrary(reel);
  let regenPrompt='';
  globalThis.fetch=async(_input,init)=>{regenPrompt=JSON.parse(init!.body as string).messages[0].content;return new Response(JSON.stringify({choices:[{message:{content:JSON.stringify(reel.shots[0])}}]}));};
  const snapshot=JSON.stringify(reel);
  await regenerateShot({reelTitle:title,creativeAngle:reel.creativeAngle,targetAudience:reel.targetAudience,shotNumber:1,shotType:'HOOK',currentStoryboard:reel,apiKey:'test-only-key',apiProvider:'openai'});
  assert.ok(regenPrompt.includes('CHANNEL GOAL: '+channel));assert.equal(JSON.stringify(reel),snapshot);
 }
 assert.equal(loadSavedProjects().length,3,'Same-title reels for different channel goals must not overwrite each other');
 assert.ok(loadSavedProjects().every(p=>p.versions.length===3),'Different drafts are preserved even if a version counter starts at one');
 assert.equal(generateOfflineStoryboard(title).channel,'Discovery');
 assert.throws(()=>generateOfflineStoryboard(title,'Informative','English','28 sec','Trust'),e=>e instanceof Error&&e.message===OFFLINE_CHANNEL_UNSUPPORTED);
 assert.equal(generateOfflineStoryboard(title,'Funny','English','28 sec','Discovery').channel,'Discovery');
 await assert.rejects(generateStoryboard({reelTitle:title,channel:'Other' as any}),/INVALID_CHANNEL/);
 const legacy=structuredClone(fixture);delete legacy.channel;
 assert.equal(decodeStoryboardFromUrl(encodeStoryboardForUrl(legacy))?.channel,undefined);
 assert.ok(channelPrompt('Connection').includes('university-managed'));
 console.log('PASS: all three channels × three treatments; repair and regeneration prompts; metadata, audience, storage, sharing, exports, legacy compatibility and honest offline scope');
} finally {
 globalThis.fetch=originalFetch;restorePlanningMocks();
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:originalStorage});
}
