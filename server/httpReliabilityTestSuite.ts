import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../api/index.js';
import { conceptBatchFixture } from './conceptPlannerTestFixtures.js';
import { clearConceptPlanningCache } from './conceptPlanner.js';
const original=globalThis.fetch;
const server=http.createServer(app);await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
const address=server.address() as import('node:net').AddressInfo;
const endpoint=`http://127.0.0.1:${address.port}/api/generate`;
const body={reelTitle:'AI tasks',channel:'Trust',apiProvider:'gemini',apiKey:'test-only'};
try {
 clearConceptPlanningCache();
 globalThis.fetch=async(url,init)=>{
  if(String(url).startsWith('http://127.0.0.1'))return original(url,init);
  return new Response(JSON.stringify({error:{status:'RESOURCE_EXHAUSTED'}}),{status:429});
 };
 let response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 assert.equal(response.status,502);const failure=await response.json();assert.equal(failure.code,'billing_quota');assert.equal(failure.data,undefined);
 clearConceptPlanningCache();const controller=new AbortController();let providerCalls=0,providerAborted=false;
 let aborted!:()=>void;const observed=new Promise<void>(resolve=>aborted=resolve);
 globalThis.fetch=async(url,init)=>{
  if(String(url).startsWith('http://127.0.0.1'))return original(url,init);
  providerCalls++;
  if(providerCalls===1)return new Response(JSON.stringify({candidates:[{content:{parts:[{text:JSON.stringify(conceptBatchFixture())}]}}]}));
  assert.ok(init?.signal);
  return new Promise<Response>((_resolve,reject)=>{
   init!.signal!.addEventListener('abort',()=>{providerAborted=true;aborted();reject(new DOMException('aborted','AbortError'));},{once:true});
   controller.abort();
  });
 };
 await assert.rejects(fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal}));
 const timer=AbortSignal.timeout(1000);
 await Promise.race([observed,new Promise((_,reject)=>timer.addEventListener('abort',()=>reject(new Error('Server did not propagate client disconnect')),{once:true}))]);
 assert.equal(providerCalls,2);assert.equal(providerAborted,true);
 console.log('PASS: actual HTTP quota errors remain visible and client disconnect aborts the in-flight provider with no further model calls');
}finally{globalThis.fetch=original;clearConceptPlanningCache();server.closeAllConnections();await new Promise<void>(resolve=>server.close(()=>resolve()));}
