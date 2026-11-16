import fs from 'node:fs/promises';
import { generateStoryboard } from '../server/aiService.js';
import { CHANNEL_NAMES } from '../shared/channels.js';
import { AiProviderError } from '../server/aiErrors.js';

const apiKey=process.env.REEL_GEMINI_API_KEY;
if(!apiKey?.trim()) throw new Error('Configure REEL_GEMINI_API_KEY in environment settings, never in chat.');
const output=process.env.REEL_VALIDATION_OUTPUT || 'scratch/live-flexible-validation.json';
const report:any={checkedAt:new Date().toISOString(),mode:'real Gemini generation; Auto treatment; no paid-provider fallback',outputs:[],issues:[],editorialApproval:false};
await fs.mkdir('scratch',{recursive:true});
for(const channel of CHANNEL_NAMES) {
 try {
  const reel=await generateStoryboard({reelTitle:'B.Com vs BBA',channel,creativeDirection:'Auto',language:'English',apiProvider:'gemini',apiKey});
  if(reel.generation?.source!=='gemini') throw new Error('Unconfirmed generation source');
  report.outputs.push(reel);
  console.log(`${channel}: ${reel.shots.length} shots; chosen treatment ${reel.creativeDirection}; automated checks passed.`);
 }catch(error){
  report.issues.push({channel,category:error instanceof AiProviderError?error.category:'validation',message:error instanceof Error?error.message:'failed'});
  console.log(`${channel}: validation stopped; see local report.`);
  break; // No unchanged provider retries, hidden template, or paid-provider fallback.
 }finally{await fs.writeFile(output,JSON.stringify(report,null,2));}
}
if(report.issues.length || report.outputs.length!==3)process.exitCode=1;
