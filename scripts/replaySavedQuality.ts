import fs from 'node:fs/promises';
import { normalizeComparisonCaptions } from '../server/outputRepair.js';
import { runMultiGateQA, extractContentCore } from '../server/aiService.js';
import type { ReelStoryboard } from '../shared/types.js';

// Recheck genuine saved candidates without spending quota or calling a provider.
// This is replay evidence, never evidence of a new live generation.
const input=process.argv[2] || 'scratch/live-channel-validation.json';
const report=JSON.parse(await fs.readFile(input,'utf8'));
const checks=[];
for(const language of ['Tamil','Telugu','Malayalam','Hindi']) {
 const candidate:ReelStoryboard|undefined=report.qualityFailures?.filter((f:any)=>f.candidate?.language===language).at(-1)?.candidate;
 if(!candidate){checks.push({language,status:'not available'});continue;}
 const normalized=normalizeComparisonCaptions(candidate);
 const qa=runMultiGateQA(normalized,extractContentCore(report.idea),candidate.language,candidate.creativeDirection!);
 checks.push({language,status:qa.pass?'passed automated replay':'failed automated replay',qa,
  dialogueUnchanged:normalized.shots.every((s,i)=>s.dialogue===candidate.shots[i].dialogue),
  captionChanges:normalized.shots.filter((s,i)=>s.onscreenText!==candidate.shots[i].onscreenText).map(s=>({number:s.number,caption:s.onscreenText})),
  editorialApproval:false});
}
const result={checkedAt:new Date().toISOString(),sourceReport:input,sourceCheckedAt:report.checkedAt,mode:'local replay; no provider requests',checks};
await fs.writeFile('scratch/native-quality-replay.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
