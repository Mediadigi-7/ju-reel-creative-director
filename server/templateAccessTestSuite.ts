import assert from 'node:assert/strict';
import { OFFLINE_IDEAS,OFFLINE_SAMPLE_CHANNELS,OFFLINE_LANGUAGES } from '../shared/offline/index.js';
import { apiGenerateReel } from '../src/services/api.js';
import { generateStoryboard } from './aiService.js';
import { AiProviderError } from './aiErrors.js';
import { outputValidationMessage,outputIssueForGate,AI_FAILURE_MESSAGES } from '../shared/providers.js';
const originalFetch=globalThis.fetch;
const oldGemini=process.env.GEMINI_API_KEY,oldOpenai=process.env.OPENAI_API_KEY;
let calls=0;
globalThis.fetch=async()=>{calls++;throw new Error('Network deliberately unavailable');};
try {
 for(const apiKey of [undefined,'saved-browser-test-key'])for(const idea of OFFLINE_IDEAS)for(const language of OFFLINE_LANGUAGES){
  const reel=await apiGenerateReel({generationMode:'template',reelTitle:idea.title,channel:OFFLINE_SAMPLE_CHANNELS[idea.id],language,creativeDirection:'Auto',apiKey,apiProvider:'gemini'});
  assert.equal(reel.generation?.source,'offline');assert.ok(reel.generation?.templateId);assert.equal(reel.shots.length,6);assert.equal(reel.language,language);assert.equal(reel.status,'Draft');
 }
 assert.equal(calls,0,'All six templates in all five languages open without a request, even with a saved key');
 process.env.GEMINI_API_KEY='server-side-test-key';process.env.OPENAI_API_KEY='another-server-test-key';
 for(const idea of OFFLINE_IDEAS){
  const reel=await generateStoryboard({generationMode:'template',reelTitle:idea.title,channel:OFFLINE_SAMPLE_CHANNELS[idea.id],apiKey:'saved-key',apiProvider:'gemini'});
  assert.equal(reel.generation?.source,'offline');
 }
 assert.equal(calls,0,'Explicit template mode must bypass browser and server credentials');
 await assert.rejects(apiGenerateReel({generationMode:'template',reelTitle:'A completely new custom topic'}),/needs live AI/);
 await assert.rejects(apiGenerateReel({generationMode:'ai',reelTitle:OFFLINE_IDEAS[0].title,apiKey:'saved-key',apiProvider:'gemini'}),/Cannot reach/);
 assert.equal(calls,1,'An explicit fresh AI version uses the live path and never silently returns a template');
 globalThis.fetch=async()=>new Response(JSON.stringify({success:false,code:'output_validation',validationIssue:'timing',error:'untrusted provider content'}),{status:502});
 await assert.rejects(apiGenerateReel({generationMode:'ai',reelTitle:'B.Com vs BBA',apiKey:'saved-key'}),/dialogue.*scene timings/);
 globalThis.fetch=async()=>new Response(JSON.stringify({success:false,code:'output_validation',validationIssue:'unknown',error:'untrusted provider content'}),{status:502});
 await assert.rejects(apiGenerateReel({generationMode:'ai',reelTitle:'B.Com vs BBA',apiKey:'saved-key'}),/AI draft/);
 assert.equal(outputValidationMessage('unknown'),AI_FAILURE_MESSAGES.output_validation);
 assert.equal(outputIssueForGate('Delivery (Scene pacing)'),'timing');assert.equal(outputIssueForGate('Six-stage contract'),'structure');assert.equal(outputIssueForGate('Information integrity'),'evidence');
 const error=new AiProviderError('output_validation',undefined,'timing');assert.match(error.message,/scene timings/);assert.equal(error.validationIssue,'timing');
 console.log('PASS: six templates × five languages × saved/no-key access without networking, server-key bypass, explicit AI failure without fallback, safe actionable validation errors');
}finally{
 globalThis.fetch=originalFetch;
 if(oldGemini===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=oldGemini;
 if(oldOpenai===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=oldOpenai;
}
