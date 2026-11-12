import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { generateStoryboard } from '../server/aiService.js';
import { AiProviderError } from '../server/aiErrors.js';
import { CHANNEL_NAMES } from '../shared/channels.js';
import { CREATIVE_RUBRIC } from '../shared/creativeEvaluation.js';
import { isEditoriallyApproved } from '../shared/hlni.js';
import { PROVIDER_MODELS } from '../shared/providers.js';
import type { ReelStoryboard } from '../shared/types.js';

const apiKey=process.env.REEL_GEMINI_API_KEY;
if(!apiKey?.trim())throw new Error('Configure REEL_GEMINI_API_KEY securely in environment settings.');
const startedAt=new Date().toISOString();
const dir=process.env.PHASE3_RUN_DIR || path.join('docs/phase3-evaluation',startedAt.replace(/[:.]/g,'-'));
await fs.mkdir(dir,{recursive:true});
try {await fs.access(path.join(dir,'manifest.json'));throw new Error('Refusing to overwrite an existing evaluation run.');}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;}
const sources=['server/aiService.ts','server/conceptPlanner.ts','server/providerClient.ts','server/generationSchemas.ts','server/editorialReview.ts','server/requestBudget.ts','server/requestCancellation.ts','server/aiErrors.ts','server/index.ts','api/index.ts','src/services/api.ts','shared/providers.ts','shared/concepts.ts','shared/reasoningTools.ts','server/freshnessEngine.ts','server/realityTrigger.ts','shared/creativeFramework.ts','shared/hlni.ts','shared/editorialBenchmarks.ts','shared/channels.ts','shared/knowledgeBase.ts','shared/schema.ts','docs/creative-references/BCOM_VS_BBA_APPROVED.md'];
const hashes=Object.fromEntries(await Promise.all(sources.map(async p=>[p,createHash('sha256').update(await fs.readFile(p)).digest('hex')])));
const manifest:any={startedAt,gitHead:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),workingTree:'Uncommitted changes identified by sourceSha256; HEAD alone is not the source revision.',request:{topic:'B.Com vs BBA',treatment:'Auto',language:'English',duration:'28 sec',provider:'gemini',model:PROVIDER_MODELS.gemini,diagnosticFunctionTags:true,totalTimeoutMs:50000},
  planning:'Separate joint concept selection precedes production shots; distinct selections are compared across all channels.',referenceApproval:'User-approved non-mandatory creative benchmarks; academic claims are not independently verified by this approval.',
  sourceSha256:hashes,rubric:CREATIVE_RUBRIC,thresholds:{overall:85,hlni:4,differentiation:4,scaleMaximum:5},results:[],editorialDecision:'PENDING',productionChanged:false};
const save=()=>fs.writeFile(path.join(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
await save();
function render(reel:ReelStoryboard):string {
 let md=`# ${reel.channel} — ${reel.reelTitle}\n\nFresh real Gemini output. Generated: ${reel.generation?.generatedAt}. Model: ${reel.generation?.model}. Requested treatment: Auto; chosen treatment: ${reel.creativeDirection}. Target duration: ${reel.duration}. Status: Draft; editorial evaluation pending.\n\n`;
 md+=`**Creative angle:** ${reel.creativeAngle}\n\n**Objective:** ${reel.objective}\n\n**Audience:** ${reel.targetAudience}\n\n`;
 for(const s of reel.shots)md+=`## Shot ${String(s.number).padStart(2,'0')} — ${s.name}\n\n- **Timecode:** ${s.timestamp}\n- **Narrative-function tags (AI-supplied):** ${s.functions?.join(', ')||'[]'}\n- **Visual action:** ${s.visual}\n- **Dialogue / voiceover:** ${s.dialogue||'(silent)'}\n- **Camera direction:** ${s.cameraPerformance}\n- **On-screen graphic:** ${s.onscreenText||'(none)'}\n\n`;
 md+=`## Selected concept — planned before shots\n\n\`\`\`json\n${JSON.stringify(reel.conceptSelection,null,2)}\n\`\`\`\n\n`;
 md+=`## Proposed HLNI — unverified editorial notes\n\n\`\`\`json\n${JSON.stringify(reel.hlni,null,2)}\n\`\`\`\n\n## Production notes\n\n\`\`\`json\n${JSON.stringify(reel.productionNotes,null,2)}\n\`\`\`\n\n## Creative summary\n\n\`\`\`json\n${JSON.stringify(reel.creativeSummary,null,2)}\n\`\`\`\n`;
 return md;
}
for(const channel of CHANNEL_NAMES) {
 const caseStarted=Date.now();const failures:any[]=[];const stages:any[]=[];
 try {
  const reel=await generateStoryboard({reelTitle:'B.Com vs BBA',channel,creativeDirection:'Auto',language:'English',duration:'28 sec',apiProvider:'gemini',apiKey},
   {totalTimeoutMs:50000,includeDiagnosticTags:true,onStage:event=>stages.push({...event,at:new Date().toISOString()}),onQualityFailure:(candidate,qa)=>failures.push({candidate,qa})});
  assert.equal(reel.generation?.source,'gemini');assert.equal(isEditoriallyApproved(reel),false);
  assert.ok(reel.shots.every(s=>Array.isArray(s.functions)));
  const stem=channel.toLowerCase();
  await fs.writeFile(path.join(dir,stem+'.json'),JSON.stringify(reel,null,2)+'\n');
  await fs.writeFile(path.join(dir,stem+'.md'),render(reel));
  manifest.results.push({channel,status:'GENERATED',file:stem+'.json',readableFile:stem+'.md',shotCount:reel.shots.length,elapsedMs:Date.now()-caseStarted,qualityRepairCount:failures.length,finalStatus:reel.status,warnings:reel.generation?.warnings || [],stages});
  console.log(`${channel}: complete fresh storyboard saved (${reel.shots.length} shots); editorial scoring pending.`);
 }catch(error){
  const category=error instanceof AiProviderError?error.category:'validation';
  manifest.results.push({channel,status:'FAILED',category,message:error instanceof AiProviderError?error.message:'Could not produce a complete validated storyboard.',elapsedMs:Date.now()-caseStarted,finalStatus:'error',stages});
  console.log(`${channel}: ${category}; no storyboard substituted.`);
  if(category!=='output_validation')break; // Stop on quota, authentication, network or provider failure.
 }finally{
  await fs.writeFile(path.join(dir,channel.toLowerCase()+'-stages.json'),JSON.stringify(stages,null,2)+'\n');
  if(failures.length)await fs.writeFile(path.join(dir,channel.toLowerCase()+'-quality-failures.json'),JSON.stringify(failures,null,2)+'\n');
  await save();
 }
}
for(const channel of CHANNEL_NAMES)if(!manifest.results.some((r:any)=>r.channel===channel))manifest.results.push({channel,status:'NOT_ATTEMPTED',reason:'Stopped after non-quality provider/transport failure; no unchanged retry or substitution.'});
manifest.completedAt=new Date().toISOString();
manifest.complete=manifest.results.filter((r:any)=>r.status==='GENERATED').length===3;
await save();
const index=`# Phase 3 — fresh generation run\n\nStarted ${startedAt}. Topic: B.Com vs BBA. Auto treatment, English, 28 seconds per channel. Actual production function tags are AI-supplied diagnostic annotations, not required stage coverage.\n\n${manifest.results.map((r:any)=>r.status==='GENERATED'?`- [${r.channel}: complete storyboard](${r.readableFile}) · [JSON](${r.file})`:`- ${r.channel}: unavailable (${r.category}); no score assigned.`).join('\n')}\n\n[Run manifest and source hashes](manifest.json). Editorial scores and specific revisions belong in EVALUATION.md after the full scripts are read. Generated drafts are not approved references. No deployment was made.\n`;
await fs.writeFile(path.join(dir,'README.md'),index);
console.log(`Run artifacts: ${dir}`);
if(!manifest.complete)process.exitCode=1;
