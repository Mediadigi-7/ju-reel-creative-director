import { findCtaShot } from '../shared/creativeFramework.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { generateStoryboard, regenerateShot, checkLanguageCompliance } from '../server/aiService.js';
import { testAiGeneration } from '../server/testAiGeneration.js';
import { AiProviderError } from '../server/aiErrors.js';
import { CHANNEL_NAMES } from '../shared/channels.js';
import type { ReelStoryboard } from '../shared/types.js';

async function main() {
 const apiKey=process.env.REEL_GEMINI_API_KEY;
 if(!apiKey?.trim()) { console.error('Live validation not run: configure REEL_GEMINI_API_KEY securely in environment settings. Never paste it into chat.');process.exitCode=2;return; }
 const output=process.env.REEL_VALIDATION_OUTPUT || 'scratch/live-channel-validation.json';
 // Use an AI Studio free-tier project with billing disabled. Never fall back to another provider.
 const report:any={checkedAt:new Date().toISOString(),provider:'gemini',idea:'B.Com vs BBA',humanEditorialReviewRequired:true,outputs:[],nativeOutputs:[],qualityFailures:[],issues:[]};
 const save=async()=>{await fs.mkdir(path.dirname(output),{recursive:true});await fs.writeFile(output,JSON.stringify(report,null,2));};
 const connection=await testAiGeneration({provider:'gemini',apiKey});report.generationTest=connection;
 if(!connection.success){report.issues.push(connection.message);await save();console.error(`Live validation blocked: ${connection.category}. Details saved to ${output}.`);process.exitCode=1;return;}
 const diagnostics = { onQualityFailure:(candidate:any,qa:any)=>{report.qualityFailures.push({candidate,qa});} };
 const reels:ReelStoryboard[]=[];
 for(const channel of CHANNEL_NAMES){
  try {
   const reel=await generateStoryboard({reelTitle:report.idea,channel,creativeDirection:'Informative',language:'English',apiProvider:'gemini',apiKey},diagnostics);
   assert.equal(reel.channel,channel);assert.equal(reel.generation?.source,'gemini');
   const text=reel.shots.map(s=>s.dialogue+' '+s.onscreenText).join(' ');
   if(!/b\.?\s*com/i.test(text)||!/\bbba\b/i.test(text))report.issues.push(`${channel}: named comparison subjects require review.`);
   const ctaShot=findCtaShot(reel);
   const cta=ctaShot ? ctaShot.dialogue+' '+ctaShot.onscreenText : '';
   const actions=[/\bsave\b/i,/\b(share|send)\b/i,/\bcomment\b/i,/\b(follow|subscribe)\b/i,/\bapply\b/i,/\b(explore|visit)\b/i,/\btag\b/i,/\bdm\b/i].filter(re=>re.test(cta)).length;
   if(actions>1)report.issues.push(`${channel}: CTA needs manual review (${actions} recognised action groups).`);
   report.outputs.push(reel);reels.push(reel);await save();
  }catch(error){report.issues.push(`${channel}: ${error instanceof Error?error.message:'generation failed'}`);await save();if(error instanceof AiProviderError&&error.category!=='output_validation'){process.exitCode=1;return;}}
 }
 for (const language of ['Tamil','Telugu','Malayalam','Hindi'] as const) {
  try {
   const native=await generateStoryboard({reelTitle:report.idea,channel:'Trust',creativeDirection:'Informative',language,apiProvider:'gemini',apiKey},diagnostics);
   report.nativeOutputs.push(native);const compliance=checkLanguageCompliance(native,language);if(!compliance.pass)report.issues.push(language+': '+compliance.reason);
   await save();
  }catch(error){report.issues.push(language+': '+(error instanceof Error?error.message:'generation failed'));await save();if(error instanceof AiProviderError&&error.category!=='output_validation'){process.exitCode=1;return;}}
 }
 const reel=reels.find(r=>r.channel==='Trust');
 if(reel) try {
  const before=JSON.stringify(reel);const shot=await regenerateShot({reelTitle:reel.reelTitle,creativeAngle:reel.creativeAngle,targetAudience:reel.targetAudience,currentStoryboard:reel,shotNumber:1,shotType:'HOOK',apiProvider:'gemini',apiKey});assert.equal(JSON.stringify(reel),before);report.regeneratedHook=shot;
 } catch(error){report.issues.push(error instanceof Error?error.message:'Regeneration check failed');}
 report.automatedChecksPassed=report.issues.length===0&&reels.length===3&&report.nativeOutputs.length===4&&!!report.regeneratedHook;
 await save();console.log(`Live validation report: ${output}. Automated checks ${report.automatedChecksPassed?'passed':'need attention'}; human content review is still required.`);
 if(!report.automatedChecksPassed)process.exitCode=1;
}
await main();
