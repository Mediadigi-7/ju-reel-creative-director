import { installConceptPlanningMocks } from './conceptPlannerTestFixtures.js';
import { withHlniTestProposal } from './hlniTestFixture.js';
import assert from 'node:assert/strict';
import http from 'node:http';
import { testAiGeneration } from './testAiGeneration.js';
import { generateOfflineStoryboard } from '../shared/offline/index.js';
import { PROVIDER_MODELS } from '../shared/providers.js';
import { apiTestAiGeneration } from '../src/services/api.js';
const original=globalThis.fetch;
const restorePlanningMocks=installConceptPlanningMocks();
const fixture=withHlniTestProposal(generateOfflineStoryboard('How do I choose the right college?'));
const key='test-only-do-not-echo';
const response=(provider:string,content=JSON.stringify(fixture))=>new Response(JSON.stringify(provider==='gemini'?{candidates:[{content:{parts:[{text:content}]}}]}:{choices:[{message:{content}}]}));
let requests=0;
try {
 globalThis.fetch=async()=>{requests++;throw new Error('must not be called');};
 assert.equal((await testAiGeneration({provider:'openai'})).category,'missing_key');
 assert.equal((await testAiGeneration({provider:'other',apiKey:key})).category,'invalid_request');
 assert.equal(requests,0,'missing key must never use an environment key or offline sample');
 for(const provider of ['openai','gemini'] as const){
  requests=0;
  globalThis.fetch=async(_url,init)=>{requests++;const body=JSON.parse(init!.body as string);assert.ok(init!.signal);
   if(provider==='gemini'){assert.equal((init!.headers as Record<string,string>)['x-goog-api-key'],key);assert.ok(!String(_url).includes(key));}
   assert.equal(provider==='openai'?body.max_tokens:body.generationConfig.maxOutputTokens,2048);return response(provider);};
  const result=await testAiGeneration({provider,apiKey:key});
  assert.equal(result.success,true);assert.equal(result.shotCount,6);assert.equal(result.model,PROVIDER_MODELS[provider]);assert.equal(requests,1);
  assert.ok(!JSON.stringify(result).includes(key));
 }
 const failures = [
  [401,{code:'invalid_api_key',message:key},'authentication'],
  [429,{code:'insufficient_quota',message:'billing '+key},'billing_quota'],
  [429,{code:'rate_limit',message:key},'rate_limit'],
  [404,{code:'model_not_found',message:key},'model_access'],
  [403,{code:'permission_denied',message:key},'permission'],
  [503,{code:'unavailable',message:key},'provider_unavailable'],
 ] as const;
 for(const [status,error,category] of failures){
  globalThis.fetch=async()=>new Response(JSON.stringify({error}),{status});
  const result=await testAiGeneration({provider:'openai',apiKey:key});
  assert.equal(result.success,false);assert.equal(result.category,category);assert.ok(!JSON.stringify(result).includes(key));
 }
 globalThis.fetch=async()=>new Response(JSON.stringify({error:{status:'RESOURCE_EXHAUSTED',message:'quota exhausted'}}),{status:429});
 const freeQuota=await testAiGeneration({provider:'gemini',apiKey:key});assert.equal(freeQuota.category,'billing_quota');assert.ok(freeQuota.message.includes('No paid provider'));assert.ok(!freeQuota.message.includes('credits'));
 globalThis.fetch=async()=>{throw new TypeError(key);};assert.equal((await testAiGeneration({provider:'openai',apiKey:key})).category,'network');
 globalThis.fetch=async()=>{throw Object.assign(new Error(key),{name:'TimeoutError'});};assert.equal((await testAiGeneration({provider:'openai',apiKey:key})).category,'timeout');
 globalThis.fetch=async()=>new Response('invalid json');assert.equal((await testAiGeneration({provider:'openai',apiKey:key})).category,'invalid_response');
 requests=0;globalThis.fetch=async()=>{requests++;return response('openai','not a storyboard');};
 assert.equal((await testAiGeneration({provider:'openai',apiKey:key})).category,'output_validation');assert.equal(requests,1,'test must not silently repair or perform extra billable generations');
 const wrong=structuredClone(fixture);wrong.shots[0].dialogue='Stop scrolling! Pick a college.';
 globalThis.fetch=async()=>response('openai',JSON.stringify(wrong));assert.equal((await testAiGeneration({provider:'openai',apiKey:key})).category,'output_validation');
 // Browser helper handles actual route shapes, not provider responses or offline fallbacks.
 globalThis.fetch=async()=>new Response(JSON.stringify({success:false,provider:'openai',model:PROVIDER_MODELS.openai,checkedAt:new Date().toISOString(),elapsedMs:10,category:'billing_quota',message:key}),{status:502});
 const client=await apiTestAiGeneration('openai',key);assert.equal(client.category,'billing_quota');assert.ok(!client.message.includes(key));
 globalThis.fetch=async()=>new Response('<html>no API</html>');assert.equal((await apiTestAiGeneration('openai',key)).category,'invalid_response');
 const {default:app}=await import('../api/index.js');
 const server=http.createServer(app);await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
 const address=server.address() as {port:number};
 const post=(body:object)=>new Promise<{status:number;body:any}>((resolve,reject)=>{
  const req=http.request({host:'127.0.0.1',port:address.port,path:'/api/test-generation',method:'POST',headers:{'Content-Type':'application/json'}},res=>{let data='';res.on('data',chunk=>data+=chunk);res.on('end',()=>resolve({status:res.statusCode!,body:JSON.parse(data)}));});req.on('error',reject);req.end(JSON.stringify(body));
 });
 try {
  const missing=await post({provider:'openai'});assert.equal(missing.status,400);assert.equal(missing.body.category,'missing_key');
  globalThis.fetch=async()=>response('openai');const live=await post({provider:'openai',apiKey:key});assert.equal(live.status,200);assert.equal(live.body.shotCount,6);
  globalThis.fetch=async()=>new Response(JSON.stringify({error:{message:key,code:'invalid_api_key'}}),{status:401});
  const denied=await post({provider:'openai',apiKey:key});assert.equal(denied.status,502);assert.equal(denied.body.category,'authentication');assert.ok(!JSON.stringify(denied).includes(key));
 } finally {await new Promise<void>(resolve=>server.close(()=>resolve()));}
 console.log('PASS: single live-generation path for both providers, no missing-key fallback, safe failure categories, no credential echoes, browser helper, and real HTTP route success/failure');
} finally {globalThis.fetch=original;restorePlanningMocks();}
