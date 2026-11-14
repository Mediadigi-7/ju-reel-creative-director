import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {generateOfflineStoryboard,OFFLINE_IDEAS,OFFLINE_LANGUAGES} from '../shared/offline/index.js';
import {validateOfflineStoryboard} from '../shared/offline/validate.js';
import {JOY_UNIVERSITY_VERIFIED_FACTS,JOY_UNIVERSITY_COURSES} from '../shared/knowledgeBase.js';
import {PROPOSED_UG_PROGRAMMES_2027_28} from '../shared/proposedProgrammes.js';
import {isEditoriallyApproved} from '../shared/hlni.js';
import {sceneSeconds,speechUnits} from '../server/outputRepair.js';
const dir=process.argv[2];if(!dir)throw new Error('Provide a new audit directory.');
await fs.mkdir(dir,{recursive:true});
try{await fs.access(path.join(dir,'manifest.json'));throw new Error('Refusing to overwrite an existing audit.');}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;}
const sources=['shared/offline/catalogue.ts','shared/offline/index.ts','shared/offline/validate.ts','shared/offline/ta.ts','shared/offline/te.ts','shared/offline/ml.ts','shared/offline/hi.ts','shared/knowledgeBase.ts','shared/proposedProgrammes.ts','src/components/CreativeSummaryCard.tsx','src/App.tsx'];
const rows:any[]=[];
for(const language of OFFLINE_LANGUAGES){
 let packet=`# ${language} — offline editorial review packet\n\n18 authored versions. Technical checks are separate from creative, factual and native-speaker approval. No saved user content is read or modified. Time budgets are estimates, not recorded speech.\n\nReviewer: ______  Date: ______\n\n`;
 for(const idea of OFFLINE_IDEAS)for(const treatment of ['Informative','Funny','Trendy'] as const){
  const reel=generateOfflineStoryboard(idea.title,treatment,language,'28 sec');validateOfflineStoryboard(reel);
  const english=generateOfflineStoryboard(idea.title,treatment,'English','28 sec');
  const duration=parseInt(reel.duration,10);
  const row={id:reel.generation!.templateId,language,channel:reel.channel,treatment,actualDurationSec:duration,requestedDurationSec:28,
   extendedForSpeech:duration>28,technical:'PASS',hlniMetadata:reel.hlni?.length || 0,editoriallyApproved:isEditoriallyApproved(reel),humanLanguageReview:'PENDING',creativeQualityReview:'PENDING',
   scenes:reel.shots.map(s=>({number:s.number,seconds:sceneSeconds(s.timestamp),speechUnits:speechUnits(s.dialogue,language)}))};
  rows.push(row);
  packet+=`## ${row.id} — ${idea.title}\n\nChannel: ${reel.channel}. Planned duration: ${reel.duration} (requested 28 sec). Technical check: PASS. Editorial approval: absent.\n\n`;
  for(const [i,s] of reel.shots.entries())packet+=`### ${s.number}. ${s.name} · ${s.timestamp}\n\n**Dialogue:** ${s.dialogue}\n\n**Graphic:** ${s.onscreenText}\n\n**Visual:** ${s.visual}\n\n**Camera:** ${s.cameraPerformance}\n\n${language==='English'?'':`**English dialogue source:** ${english.shots[i].dialogue}\n\n**English graphic source:** ${english.shots[i].onscreenText}\n\n`}`;
  packet+='**Editorial review:** Identify the specific HLNI and its consequence; check channel voice, terminology, factual qualification, native fluency, speakability and graphic legibility. A short task is a question-forming aid, never a validated aptitude test.\n\nHLNI delivered: ______\n\nSpecific weakness / revision: ______\n\nFactual evidence or bounded-method reasoning: ______\n\nTimed read-aloud: ______\n\nDecision: PENDING\n\n';
 }
 await fs.writeFile(path.join(dir,language.toLowerCase()+'.md'),packet);
}
const claims=Object.entries(JOY_UNIVERSITY_VERIFIED_FACTS).filter(([key])=>key!=='strictFactRules').map(([key,value])=>({key,legacyAssertion:value,status:'VERIFICATION_REQUIRED',sourceOfTruth:'https://joyuniversity.edu.in/',officialPage:null,programme:null,academicYear:null,supportedClaim:null}));
const programmes=Object.entries(JOY_UNIVERSITY_COURSES).map(([group,items])=>({group,entries:items.map(item=>({label:typeof item==='string'?item:item.name,status:typeof item==='string'&&item.includes('Proposed for')?'USER_PROVIDED_PROPOSAL':'LEGACY_UNVERIFIED'}))}));
const proposal={source:PROPOSED_UG_PROGRAMMES_2027_28.source,status:'proposed',academicYear:PROPOSED_UG_PROGRAMMES_2027_28.academicYear,schools:PROPOSED_UG_PROGRAMMES_2027_28.schools.length,programmes:PROPOSED_UG_PROGRAMMES_2027_28.schools.flatMap(s=>s.programmes).length};
await fs.writeFile(path.join(dir,'results.json'),JSON.stringify({generatedAt:new Date().toISOString(),rows,claims,programmes,proposal},null,2)+'\n');
const sha=Object.fromEntries(await Promise.all(sources.map(async file=>[file,createHash('sha256').update(await fs.readFile(file)).digest('hex')])));
await fs.writeFile(path.join(dir,'manifest.json'),JSON.stringify({generatedAt:new Date().toISOString(),sourceSha256:sha,totalVersions:rows.length,technicalPassed:rows.filter(r=>r.technical==='PASS').length,editoriallyApproved:rows.filter(r=>r.editoriallyApproved).length,sourceWebsite:'https://joyuniversity.edu.in/',sourceAccess:'Blocked: managed proxy CONNECT 403; no website claims certified',productionChanged:false,stagingChanged:false},null,2)+'\n');
console.log(JSON.stringify({total:rows.length,technicalPassed:rows.length,editoriallyApproved:rows.filter(r=>r.editoriallyApproved).length,byLanguage:OFFLINE_LANGUAGES.map(language=>({language,count:rows.filter(r=>r.language===language).length,minDuration:Math.min(...rows.filter(r=>r.language===language).map(r=>r.actualDurationSec)),maxDuration:Math.max(...rows.filter(r=>r.language===language).map(r=>r.actualDurationSec)),extended:rows.filter(r=>r.language===language&&r.extendedForSpeech).length})),proposal},null,2));
