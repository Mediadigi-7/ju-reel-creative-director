import fs from 'node:fs/promises';
import path from 'node:path';
const dirs=process.argv.slice(2);
if(!dirs.length)throw new Error('Pass archived run directories.');
const runs=[];
for(const dir of dirs){
 const manifest=JSON.parse(await fs.readFile(path.join(dir,'manifest.json'),'utf8'));
 let evaluation:any;try{evaluation=JSON.parse(await fs.readFile(path.join(dir,'evaluation.json'),'utf8'));}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
 runs.push({directory:dir,manifest,evaluation});
}
const reference=runs[0].manifest;
for(const run of runs){
 if(JSON.stringify(run.manifest.request)!==JSON.stringify(reference.request))throw new Error('Requests differ; do not label these comparable repetitions.');
 if(JSON.stringify(run.manifest.sourceSha256)!==JSON.stringify(reference.sourceSha256))throw new Error('Source hashes differ; separate implementation revisions before aggregating.');
}
const channels=reference.request.channels||['Trust','Connection','Discovery'];
const stats=channels.map(channel=>{
 const cases=runs.map(run=>({run:run.directory,generation:run.manifest.results.find((r:any)=>r.channel===channel),assessment:run.evaluation?.results.find((r:any)=>r.channel===channel)}));
 const scores=cases.flatMap(c=>c.assessment?[c.assessment.total]:[]).sort((a,b)=>a-b);
 return {channel,planned:cases.length,generated:cases.filter(c=>c.generation?.status==='GENERATED').length,scored:scores.length,
  editorialPass:cases.filter(c=>c.assessment?.decision==='PASS').length,above90:scores.filter(n=>n>90).length,
  mean:scores.length?Number((scores.reduce((a,b)=>a+b,0)/scores.length).toFixed(2)):null,
  min:scores[0]??null,max:scores.at(-1)??null,cases};
});
const result={sourceSha256:reference.sourceSha256,request:reference.request,runs:dirs,stats,note:'Scores are assistant editorial judgements. Unavailable outputs are unscored, not assigned zero. Means cover scored outputs only and can be biased by generation failures. Repetitions test the combined implementation, not causal contribution of each change. No independent blinded human panel or audience test.',stagingDeployed:false,productionChanged:false};
const root=process.env.CREATIVE_SUMMARY_DIR||path.join('docs','creative-quality','evaluation-2026-11-16');await fs.mkdir(root,{recursive:true});
await fs.writeFile(path.join(root,'summary.json'),JSON.stringify(result,null,2)+'\n');
let md='# Repeated creative evaluation — 16 November 2026\n\nSame source hashes, topic, provider/model, language, duration, Auto treatment and rubric across these runs. Each started in a separate process; no cross-run concept history was reused.\n\n';
md+='| Channel | Generated / planned | Scored | Editorial passes | Above 90 | Mean of scored | Range |\n| --- | ---: | ---: | ---: | ---: | ---: | --- |\n';
for(const s of stats)md+=`| ${s.channel} | ${s.generated}/${s.planned} | ${s.scored} | ${s.editorialPass} | ${s.above90} | ${s.mean??'—'} | ${s.scored?s.min+'–'+s.max:'—'} |\n`;
md+='\n'+result.note+'\n\nRun reports:\n\n'+dirs.map(dir=>`- [${path.basename(dir)}](../../phase3-evaluation/${path.basename(dir)}/${runs.find(r=>r.directory===dir)?.evaluation?'EVALUATION.md':'REPORT.md'})`).join('\n')+'\n\nStructural success and model critique do not grant editorial approval. The acceptance floor remains 85 overall, HLNI and differentiation each at least 4/5, with critical triggers overriding totals. The improvement target is above 90. Staging and production remain unchanged.\n';
await fs.writeFile(path.join(root,'SUMMARY.md'),md);console.log(JSON.stringify(stats.map(({channel,generated,planned,scored,mean,editorialPass,above90})=>({channel,generated,planned,scored,mean,editorialPass,above90})),null,2));
