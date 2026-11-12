import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { CREATIVE_RUBRIC, evaluateCreativeRatings } from '../shared/creativeEvaluation.js';
import { sceneSeconds, speechUnits } from '../server/outputRepair.js';
import { validateAndRepairStoryboard } from '../shared/schema.js';
import type { ReelStoryboard } from '../shared/types.js';

const dir=process.argv[2];
if(!dir)throw new Error('Pass the immutable generation-run directory.');
const manifest=JSON.parse(await fs.readFile(path.join(dir,'manifest.json'),'utf8'));
const input=JSON.parse(await fs.readFile(path.join(dir,'ratings.json'),'utf8'));
const results=[];
for(const assessment of input.assessments) {
 const generated=manifest.results.find((r:any)=>r.channel===assessment.channel&&r.status==='GENERATED');
 if(!generated)throw new Error('Refusing to score an unavailable or ungenerated channel.');
 const bytes=await fs.readFile(path.join(dir,generated.file));
 const reel:ReelStoryboard=JSON.parse(bytes.toString());
 if(reel.generation?.source!=='gemini'||reel.channel!==assessment.channel||!validateAndRepairStoryboard(reel,reel.reelTitle).valid)
  throw new Error('The score must reference a complete real Gemini storyboard.');
 const decision=evaluateCreativeRatings(assessment.ratings,assessment.triggers);
 results.push({...assessment,...decision,sourceFile:generated.file,sourceSha256:createHash('sha256').update(bytes).digest('hex'),
  productionMetrics:{shotCount:reel.shots.length,chosenTreatment:reel.creativeDirection,totalSpokenWords:speechUnits(reel.shots.map(s=>s.dialogue).join(' '),'English'),
   shots:reel.shots.map(s=>({number:s.number,functions:s.functions,timecode:s.timestamp,seconds:sceneSeconds(s.timestamp),spokenWords:speechUnits(s.dialogue,'English')}))}});
}
const evaluation={evaluatedAt:new Date().toISOString(),assessor:input.assessor,ratingScale:input.ratingScale,thresholds:manifest.thresholds,
 complete:manifest.complete && results.length===3,decision:results.length===3&&results.every(r=>r.decision==='PASS')?'PASS':'REVISE',
 note:'Editorial judgement, not generator self-score, verified source certification or application approval.',results,stagingDeployed:false,productionChanged:false};
await fs.writeFile(path.join(dir,'evaluation.json'),JSON.stringify(evaluation,null,2)+'\n');
const localTime=new Intl.DateTimeFormat('en-IN',{dateStyle:'long',timeStyle:'short',timeZone:'Asia/Kolkata'}).format(new Date(manifest.startedAt));
let md=`# Phase 3 — creative-quality evaluation\n\n**Decision: ${evaluation.decision}. This run does not authorize deployment.**\n\nFresh run started ${localTime} IST. Provider/model: Gemini / ${manifest.request.model}. Topic: B.Com vs BBA. Auto (Let AI Choose), English, 28-second target per channel.\n\n`;
md+=`[Approved canonical references](../../creative-references/BCOM_VS_BBA_APPROVED.md) · [Reference status and rubric](../../creative-references/README.md) · [Manifest](manifest.json) · [Machine-readable evaluation](evaluation.json)\n\n`;
md+=input.methodology ? input.methodology+'\n\n' : 'Generation context included the non-mandatory benchmark summaries and rubric weights; the full reference scripts were read for editorial evaluation. Source hashes identify the exact engine/reference versions. These are fresh complete provider outputs, not rewritten references or offline samples. No manual revisions were inserted into the generated scripts.\n\n';
md+='## Results\n\n| Channel | Complete output | HLNI /5 | Differentiation /5 | Total /100 | Decision |\n| --- | --- | ---: | ---: | ---: | --- |\n';
for(const r of results)md+=`| ${r.channel} | [Storyboard](${r.channel.toLowerCase()}.md) · [JSON](${r.sourceFile}) | ${r.ratings.hlni} | ${r.ratings.differentiation} | ${r.total} | ${r.decision} |\n`;
md+=input.runSummary ? '\n'+input.runSummary+'\n\n' : '\nAll three outputs have three shots, AI-supplied narrative-function tags, complete production fields and an AI-selected Informative treatment. Those choices are valid. The weakness is the repeated concept/device and insufficiently specific insight, not shared shot counts, function ordering or treatment labels.\n\n';
for(const entry of manifest.results.filter((r:any)=>r.status!=='GENERATED'))md+=`**${entry.channel}: not scored.** No validated storyboard was delivered (${entry.category}). Rejected candidates, where recorded, are in the run's quality-failure artifact; they are not approved outputs.\n\n`;
md+='## Scoring method and hard gates\n\nEach editorial rating is 0–5: 0 missing, 1 poor, 2 weak, 3 partial, 4 strong, 5 exceptional. Weighted total = Σ(weight × rating / 5). Apply the user\'s proposed thresholds: total ≥85, HLNI ≥4 and differentiation ≥4. Material factual errors, missing meaningful insight and unworkable production instructions independently trigger revision. These are reasoned editorial judgements, not an objective measurement of creativity.\n\nNo external curriculum source audit was performed. An unsupported claim is not labelled proven false: material-factual-error triggers are therefore not asserted. References still require verification before using apparent document evidence.\n\n';
for(const r of results) {
 md+=`## ${r.channel} — ${r.total}/100: ${r.decision}\n\n| Criterion | Weight | Rating /5 | Weighted points | Evidence in actual output |\n| --- | ---: | ---: | ---: | --- |\n`;
 for(const c of CREATIVE_RUBRIC)md+=`| ${c.label} | ${c.weight}% | ${r.ratings[c.key]} | ${c.weight*r.ratings[c.key]/5} | ${r.evidence[c.key].replaceAll('|','\\|')} |\n`;
 md+=`\n**Hard-trigger assessment:** ${r.automaticTriggerExplanation}\n\n**Decision reasons:** ${r.reasons.join(' ')}\n\n**Specific revisions:**\n\n${r.revisions.map((text:string,i:number)=>`${i+1}. ${text}`).join('\n\n')}\n\n`;
 md+=`**Production evidence:** ${r.productionMetrics.shotCount} shots; ${r.productionMetrics.totalSpokenWords} spoken words; ${r.productionMetrics.chosenTreatment}.\n\n| Shot | Timecode | AI-supplied function tags | Words | Seconds |\n| --- | --- | --- | ---: | ---: |\n`;
 for(const s of r.productionMetrics.shots)md+=`| ${s.number} | ${s.timecode} | ${s.functions?.join(', ')||'[]'} | ${s.spokenWords} | ${s.seconds} |\n`;
 md+='\nTime budgets are text estimates, not a recorded natural read-aloud or proof of legible evidence footage.\n\n';
}
if(input.crossChannelFinding){md+='## Cross-channel finding and next step\n\n'+input.crossChannelFinding+'\n\n'+input.nextStep+'\n\n## Status\n\n- References: user-approved.\n- Validated fresh storyboards: '+results.length+'/3.\n- Editorial decision: '+evaluation.decision+'.\n- Staging not deployed; production unchanged.\n';}else {
md+='## Cross-channel finding and highest-leverage revision\n\nAll three open with “Everyone says”, inspect papers/module lists, highlight overlap and end with confident advice. Connection adds an actor but no meaningful interaction; Discovery supplies a function tag without a genuinely surprising educational reveal. Surface variation does not satisfy channel differentiation.\n\nThe current engine locks the comparison\'s intended takeaway to comparing modules/assessment tasks before the creative concept is selected; changing the audience or adding benchmark summaries has not overcome that narrowing. The generation logs also report territory collisions, yet the returned concepts remain alike. This is a concrete engine-level revision target, not evidence that the flexible framework should be made rigid again.\n\nNext revise concept/HLNI selection so the topic and entities stay locked while the insight, human tension and storytelling opportunity can differ. Ground factual insights in actual supplied sources; otherwise demonstrate a specific reasoned method. Compare the actual chosen concepts across channels before writing production shots, then evaluate a new separately archived run using this same rubric. Keep these failed outputs as the baseline; do not overwrite them or treat passing metadata checks as creative approval.\n\n## Status\n\n- Three creative references: user-approved.\n- Three fresh Gemini storyboards: generated and available in full.\n- Actual scripts: scored with evidence and targeted revisions.\n- Editorial decision: all three require revision.\n- Staging: not deployed; this evaluation does not meet its prerequisite.\n- Production: unchanged.\n';
}
await fs.writeFile(path.join(dir,'EVALUATION.md'),md);
manifest.editorialDecision=evaluation.decision;
manifest.evaluatedAt=evaluation.evaluatedAt;
manifest.evaluationFile='evaluation.json';
manifest.evaluationSha256=createHash('sha256').update(await fs.readFile(path.join(dir,'evaluation.json'))).digest('hex');
await fs.writeFile(path.join(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const readme=await fs.readFile(path.join(dir,'README.md'),'utf8');
await fs.writeFile(path.join(dir,'README.md'),readme.replace('Editorial scores and specific revisions belong in EVALUATION.md after the full scripts are read.','[Editorial scores, evidence and specific revisions](EVALUATION.md) are complete. Review the per-channel decisions and unavailable cases.'));
console.log(JSON.stringify(results.map(r=>({channel:r.channel,total:r.total,decision:r.decision})),null,2));
