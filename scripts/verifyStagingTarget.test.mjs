import assert from 'node:assert/strict';
import {verifyStagingTarget,EXPECTED_PRODUCTION_HOST} from './verifyStagingTarget.mjs';
const selectors={token:'test-only-token',projectId:'prj_test',orgId:'team_test'};
const mock=(domains,owner='team_test')=>async(url,options)=>{
 assert.equal(new URL(url).hostname,'api.vercel.com');assert.equal(options.headers.Authorization,'Bearer '+selectors.token);
 return new Response(JSON.stringify(String(url).includes('/domains')?{domains}:{id:'prj_test',accountId:owner}));
};
assert.equal((await verifyStagingTarget({...selectors,request:mock([{name:EXPECTED_PRODUCTION_HOST}])})).productionHost,EXPECTED_PRODUCTION_HOST);
await assert.rejects(verifyStagingTarget({...selectors,request:mock([{name:'another-project.vercel.app'}])}),/does not prove ownership/);
await assert.rejects(verifyStagingTarget({...selectors,request:mock([{name:EXPECTED_PRODUCTION_HOST}],'team_other')}),/does not match/);
await assert.rejects(verifyStagingTarget({...selectors,request:async()=>new Response('{}',{status:401})}),/HTTP 401/);
await assert.rejects(verifyStagingTarget({...selectors,request:async()=>{throw new Error(selectors.token);}}),e=>!e.message.includes(selectors.token)&&e.message.includes('network'));
console.log('PASS: staging target requires the exact existing project, owner, and production domain; wrong or inaccessible targets are blocked');
