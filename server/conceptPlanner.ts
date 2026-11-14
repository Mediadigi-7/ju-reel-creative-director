import { ensureActive } from './requestBudget.js';
import { createHash } from 'node:crypto';
import { CHANNEL_NAMES, channelPrompt, type ContentChannel } from '../shared/channels.js';
import { ConceptBatchSchema, type ConceptBatch, type ConceptSelection } from '../shared/concepts.js';
import { HLNI_CREATIVE_CONTRACT } from '../shared/hlni.js';
import { approvedBenchmarkPrompt } from '../shared/editorialBenchmarks.js';
import { AiProviderError } from './aiErrors.js';
import { REASONING_TOOLS, type ReasoningToolId } from '../shared/reasoningTools.js';

const stop=new Set('the a an of to and or for in on with this that from your you by as at is are be its student students course courses degree degrees programme programmes bcom bba'.split(' '));
const normalize=(s:string)=>s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const words=(s:string)=>new Set(normalize(s).split(/\s+/).filter(w=>w.length>2&&!stop.has(w)));
export function conceptSimilarity(a:string,b:string):number {
 const x=words(a),y=words(b);const union=new Set([...x,...y]);return union.size?[...x].filter(w=>y.has(w)).length/union.size:1;
}
export function conceptBatchIssues(batch:ConceptBatch):string[] {
 const issues:string[]=[];
 const chosen=CHANNEL_NAMES.map(channel=>({channel,concept:batch.candidates[channel].find(c=>c.id===batch.selected[channel])}));
 for(const {channel,concept:c} of chosen) {
  if(!c){issues.push(`${channel}: selected id must name a candidate.`);continue;}
  if(!c.basisId||!(c.basisId in REASONING_TOOLS))issues.push(`${channel}: choose a supplied reasoning basis instead of inventing evidence.`);
  if(new Set(batch.candidates[channel].map(c=>c.id)).size!==batch.candidates[channel].length)issues.push(`${channel}: candidate ids must be unique.`);
  if(c.supportType==='fact'||c.evidenceNeeded.length)issues.push(`${channel}: selected concept depends on evidence not supplied. Choose a reasoned method/perspective; do not fabricate factual proof.`);
  if(c.supportType==='method'&&(c.methodSteps.length<2||c.methodSteps.some(s=>s.trim().length<6)||c.interpretationRule.trim().length<12))issues.push(`${channel}: provide usable method steps and how their result changes a decision.`);
  if(!c.limitations?.trim())issues.push(`${channel}: state what this method/perspective does NOT establish.`);
  if(!c.demonstration)issues.push(`${channel}: choose a concrete illustrative input, recorded observation and specific next question before writing scenes.`);
  if(!c.demonstration?.visibleInput)issues.push(`${channel}: write the actual short sample task/card text the viewer will see, not just 'a case study'.`);
  if(c.basisId==='aggregate_counterexample' && /\bcredits?\b/i.test([c.concept,c.device,c.demonstration?.input,c.demonstration?.observation].join(' ')))
   issues.push(`${channel}: use a clearly illustrative arithmetic example, not invented programme credits or degree-specific numerical breakdowns.`);
  if(c.basisId==='insufficient_information' && /hint:\s*(?:it is )?neither|answer:\s*neither|(?:it|this) (?:is|belongs to) neither/i.test([c.concept,c.device,c.demonstration?.visibleInput,c.demonstration?.observation].join(' ')))
   issues.push(`${channel}: insufficient information does not mean neither category. The supported result is not enough information, not a negative classification.`);
  const claimText=[c.hlni,c.support,c.interpretationRule,c.payoff,c.concept,c.device].join(' ');
  if(/is a reliable indicator|(?:will|directly|reliably) predict|guarantees? (?:success|employment|admission)|based on (?:a |their |your )?learning[- ]style|concepts are universal|topics are universal|degrees are defined by|higher group.work density.*indicates|success depends/i.test(claimText))
   issues.push(`${channel}: unsupported diagnostic, universal or degree-classification claim hidden inside a method/perspective. Reframe as a bounded reasoning tool, not an evidence-free predictor.`);
  if(/^(?:read|check|compare) (?:the )?(?:syllabus|syllabi|modules|module lists)[.!]?$/i.test(c.hlni.trim()))issues.push(`${channel}: generic curriculum advice is not an HLNI.`);
 }
 for(let i=0;i<chosen.length;i++)for(let j=i+1;j<chosen.length;j++) {
  const a=chosen[i].concept,b=chosen[j].concept;if(!a||!b)continue;
  if(a.basisId===b.basisId||normalize(a.mechanismKey)===normalize(b.mechanismKey)||conceptSimilarity(a.hlni,b.hlni)>.6||conceptSimilarity(a.concept+' '+a.device,b.concept+' '+b.device)>.68)
   issues.push(`${chosen[i].channel}/${chosen[j].channel}: concepts collide in insight or core storytelling mechanism; renaming props, actors or the CTA is insufficient.`);
 }
 return issues;
}
function languageIssues(batch:ConceptBatch,language:string):string[] {
 const scripts:Record<string,RegExp>={Tamil:/[\u0B80-\u0BFF]/,Telugu:/[\u0C00-\u0C7F]/,Malayalam:/[\u0D00-\u0D7F]/,Hindi:/[\u0900-\u097F]/};
 const script=scripts[language];if(!script)return [];
 const issues:string[]=[];
 for(const channel of CHANNEL_NAMES){const d=batch.candidates[channel].find(c=>c.id===batch.selected[channel])?.demonstration;
  const strip=(s:string)=>s.replace(/\b(?:B\.?\s*Com|BBA|B\.?\s*Tech|B\.?\s*Sc|BCA|MBA|AI|ML|CSE|VLSI|Joy University)\b/gi,'');
  if(!d||!script.test(d.nextQuestion)||/[A-Za-z]/.test(strip(d.nextQuestion))||/[A-Za-z]/.test(strip(d.visibleInput||'')))issues.push(`${channel}: write the question and visible sample in native ${language}.`);
 }
 return issues;
}
// Examine all candidate combinations rather than trusting the model's selected
// IDs. A valid alternative can replace a colliding nomination without another call.
// This is feasibility/clarity selection, never a creative-quality approval score.
export function chooseCompatibleConcepts(batch:ConceptBatch,language='English'):ConceptBatch|undefined {
 let best:ConceptBatch|undefined,bestScore=-Infinity;
 for(const trust of batch.candidates.Trust)for(const connection of batch.candidates.Connection)for(const discovery of batch.candidates.Discovery){
  const chosen=[trust,connection,discovery];
  const candidate={...batch,selected:{Trust:trust.id,Connection:connection.id,Discovery:discovery.id}};
  if(conceptBatchIssues(candidate).length||languageIssues(candidate,language).length)continue;
  let score=0;
  for(let i=0;i<chosen.length;i++){
   const c=chosen[i],d=c.demonstration!;
   if(d.visibleInput!.split(/\s+/).length<=14)score+=2;
   if(d.nextQuestion.split(/\s+/).length<=12)score+=2;
   if(!/quantif|resource allocation|resource model|psychometric|peak productivity/i.test(d.visibleInput+' '+d.nextQuestion))score++;
   if(c.id===batch.selected[CHANNEL_NAMES[i]])score+=.25;
  }
  if(score>bestScore){bestScore=score;best=candidate;}
 }
 if(best)best={...best,contrast:'Pre-story comparison selected different grounded insights and mechanisms: '+CHANNEL_NAMES.map(ch=>{
  const c=best!.candidates[ch].find(c=>c.id===best!.selected[ch])!;return ch+' = '+c.basisId+' / '+c.mechanismKey;}).join('; ')+'. Each has an illustrative input, observable result and next question. This is not editorial approval.'};
 return best;
}
export function conceptPlanningPrompt(input:{topic:string;language:string;treatment:string;duration:string;recent:string[]}):string {
 return `TASK: CONCEPT_SELECTION
Plan ideas and HLNI BEFORE writing any production shots. Return JSON only. Do not generate a storyboard, timestamps, shot counts, stage order or scores.
LOCKED TOPIC/QUESTION: ${input.topic}
Audience: +2 students. Language: ${input.language}. Treatment preference: ${input.treatment}. Time budget: ${input.duration}.
Write demonstration.visibleInput and demonstration.nextQuestion in ${input.language==='Tanglish'?'natural Tanglish':input.language==='English'?'English':`native-script ${input.language}, without romanized prose`}; both will appear verbatim in the production story. Other planning explanations may use English.
${CHANNEL_NAMES.map(channelPrompt).join('\n')}
${HLNI_CREATIVE_CONTRACT}
${approvedBenchmarkPrompt()}
Create exactly two genuinely different candidate concepts for EACH channel. Select one candidate per channel only after comparing all three selected insights, mechanisms and decision consequences. Channel identities guide purpose, not mandatory devices. Auto chooses the treatment that serves the concept.
Select a concrete demonstration for each candidate: an illustrative input, what is actually observed/recorded, and the specific resulting question. Do not say merely 'the student records a question'. Write the actual question, short enough to appear in the finished story. It must follow from the recorded observation, not diagnose a degree preference.
Use plain language for a +2 student. A vague 'resource allocation case study' or 'resource-model constraints' is not a concrete accessible example. visibleInput must be the actual short sample instruction, card or arithmetic the viewer sees (aim under 14 English words), not a description of paperwork. nextQuestion should be a short natural question (aim under 12 English words) about a precise unknown. For example, a clearly illustrative shop-poster task can expose an unknown about how explanations are assessed; it says nothing about which degree owns the task.
Compare candidate concepts for human specificity too. Connection can be educational, but recognition should emerge through a credible human exchange or specific personal situation, not a generic worried student who becomes confident. Do not force the approved reference's exact dialogue or format.
CONCEPT FIDELITY AND HUMAN CONSEQUENCE:
Establish the actual student situation, central conflict, HLNI and observable consequence within concept/device/demonstration. Do not simply rename one checklist three times. Planning differences must become different audience experiences.
The visibleInput, observation and nextQuestion must form a single logical chain: ask about a genuinely missing piece, not a field already known in the sample. For assessment methods, explain what the answer changes about preparation or comparison. For Connection, the method must change a specific person's action in a believable student decision. For Discovery, the challenge/reveal must retain both original comparison subjects and teach why a tempting inference fails. Do not claim particular subjects overlap without supplied academic sources.

Establish one central conflict, one specific useful insight, and the visible change that resolves that conflict. The example, observed result and resulting question must all use the SAME academic concept. Do not switch between admission prerequisites, compulsory subjects, elective availability and assessment criteria as though they were equivalent.
For academic comparisons, use a simple school-level example a +2 student can understand immediately. Avoid financial-variance, technical-resource or specialist business jargon. Keep illustrative task details short; reserve screen space and time for the actual discovery.
A question is only a satisfying payoff when the story demonstrates why this particular question is better than the student's original approach. Give the student a concrete initial intention or mistake, then an observable correction. Connection needs a believable personal dilemma, rather than a generic narrator reciting a checklist. Discovery's surprise must change how the viewer approaches the ORIGINAL named comparison; abstract arithmetic detached from the degree decision is insufficient.
For B.Com vs BBA specifically, possible accessible illustrations include: a shop poster whose task is known but marking criterion is unknown (assessment audit); a student following a friend's degree choice who records the one step of an illustrative shop-budget task where help was needed, then asks what teaching support is available (task journal); or an unlabeled business task that cannot be assigned to either degree without a named official course source (insufficient-information challenge). These illustrate a logical chain, not prescribed plots or channel-exclusive tools. Invent original executions; do not copy these as mandatory scripts.
These are craft standards, not prescribed plots, scene counts or channel-exclusive methods.
AVAILABLE REASONED HLNI FOUNDATIONS:
${JSON.stringify(REASONING_TOOLS)}
Choose a basisId from these tools for each candidate. These are knowledge/reasoning foundations, not scripts or channel templates. Any tool can serve any channel. Selected channels must use different bases and different original concepts. The application supplies the tool's insight, steps, reasoning, interpretation, proof requirement and limitations; you cannot replace those with invented academic facts or psychological claims. Invent the audience-specific human situation, storytelling device and original execution around the selected foundation. Do not copy the approved scripts.
Do not start by deciding every channel must compare module lists. First find distinct audience gaps, useful decision tools and human situations relevant to the topic. The default student-at-desk highlighting two lists is not a concept-selection strategy. A smile is not proof that a method worked.
No actual syllabi, institutional research or verified external documents are supplied. Select reasoned methods/perspectives that need no invented academic facts, module screens, figures, quotations or citations. Clearly illustrative exercises or question cards may explain reasoning but must not masquerade as real syllabus evidence. Claims such as marketing/accounting belonging to particular degrees require external evidence and cannot be selected here. A short activity is exploratory, not a validated aptitude or learning-style test.
Do not infer that exams are B.Com and projects are BBA, that one degree audits numbers while the other pivots strategy, or that task enjoyment/energy predicts achievement or long-term engagement. Never choose a degree from a brief energy rating. Form a narrower question to investigate rather than claiming an assessment of academic fit. Every selected concept needs explicit limitations.
${/b\.?\s*com/i.test(input.topic)&&/\bbba\b/i.test(input.topic)?`Possible reasoning tools for this comparison, NOT mandatory channel templates:
- Assessment-question audit: on a blank worksheet list what a task asks you to produce, what is graded, and what feedback is offered. The useful result is a precise question to ask about a real course, not a diagnosis from exams-versus-projects.
- Task-question journal: try or inspect a clearly illustrative task; record where help was needed and what to investigate next. Two friends can discover different questions without assigning activities to degrees or predicting ability. Show their recorded observations and resulting questions, not merely a mood change.
- Insufficient-information challenge: a single unlabeled activity cannot prove it belongs to B.Com or BBA. A valid reveal is 'not enough information', followed by the exact missing evidence. Do not answer 'both' without real curricula. Demonstrate why the same example cannot support a degree-specific conclusion.
You may choose different, stronger credible concepts. These are examples of bounded usefulness, not a script, treatment, scene count or required device.`:''}
For an operational method specify what the viewer does, records/compares and how to interpret the result. visibleProof must explain the observable demonstration; payoff must show what changes. Preserve qualifications. Generic 'read the syllabus' alone is not enough.
Recent actual concepts to avoid repeating: ${JSON.stringify(input.recent)}
Return {"candidates":{"Trust":[CONCEPT,CONCEPT],"Connection":[CONCEPT,CONCEPT],"Discovery":[CONCEPT,CONCEPT]},"selected":{"Trust":"id","Connection":"id","Discovery":"id"},"contrast":"Why the selected insights and mechanisms differ meaningfully"}.
Each CONCEPT must have exactly these fields:
{"id":"unique candidate id","basisId":"one supplied tool id","title":"original concept name","audienceGap":"specific belief/confusion","viewerChange":"bounded useful decision/understanding change","concept":"original connected human/visual concept","mechanismKey":"short descriptive identifier for the actual core tool/device; same tools must use the same key across channels","device":"how this particular concept unfolds","treatment":"Informative, Funny or Trendy; choose one"}.
Also include "demonstration":{"input":"description of the clearly illustrative example, never invented institutional evidence","visibleInput":"the actual concise sample task/card text or arithmetic to display","observation":"the specific recorded result or missing information shown","nextQuestion":"the actual bounded question this result produces; not which degree suits me"}.
Do not include shots or scores. Do not assign accounting/costs/exams to B.Com or strategy/people/projects to BBA. A financial question and a people question are not degree-specific lenses. The task journal ends in a question, never a degree choice or an energy-based diagnosis.
Use concise, concrete descriptions. Different names for the same compare-two-lists idea are not different concepts. Do not copy approved references or make their formats compulsory.`;
}
type Cached={batch:ConceptBatch;used:Set<ContentChannel>;expires:number};
const cache=new Map<string,Cached>();
const outcomes=new Map<string,string[]>();
const contextKey=(accountKey:string,provider:string,topic:string)=>createHash('sha256').update(JSON.stringify([accountKey,provider,normalize(topic)])).digest('hex');
export function recentConceptOutcomes(accountKey:string,provider:string,topic:string):string[]{return [...(outcomes.get(contextKey(accountKey,provider,topic))||[])];}
export function rememberConceptOutcome(accountKey:string,provider:string,topic:string,outcome:string){
 const key=contextKey(accountKey,provider,topic);outcomes.set(key,[...(outcomes.get(key)||[]),outcome.slice(0,1500)].slice(-6));
 while(outcomes.size>32)outcomes.delete(outcomes.keys().next().value!);
}
export function clearConceptPlanningCache(){cache.clear();outcomes.clear();}
export function groundConceptBatch(raw:any,language='English'):unknown {
 if(!raw?.candidates)return raw;
 return {...raw,candidates:Object.fromEntries(CHANNEL_NAMES.map(channel=>[channel,Array.isArray(raw.candidates[channel])?raw.candidates[channel].map((c:any)=>{
  const tool=REASONING_TOOLS[c?.basisId as ReasoningToolId];
  if(!tool)return c;
  const conclusion:Record<string,string>={English:'Not enough information',Tamil:'போதுமான தகவல் இல்லை',Telugu:'తగిన సమాచారం లేదు',Malayalam:'മതിയായ വിവരമില്ല',Hindi:'पर्याप्त जानकारी नहीं है',Tanglish:'Not enough information'};
  const input=c.demonstration?.visibleInput;
  const example:Record<string,string>={English:'Example',Tamil:'எடுத்துக்காட்டு',Telugu:'ఉదాహరణ',Malayalam:'ഉദാഹരണം',Hindi:'उदाहरण',Tanglish:'Example'};
  const visibleInput=typeof input==='string'&&!/example|sample|illustrative|எடுத்துக்காட்டு|ఉదాహరణ|ഉദാഹരണം|उदाहरण/i.test(input)?(example[language]||'Example')+': '+input:input;
  return {...c,hlni:tool.insight,supportType:'method',support:tool.support,evidenceNeeded:[],methodSteps:[...tool.steps],interpretationRule:tool.rule,visibleProof:tool.proof,payoff:tool.rule,limitations:tool.limit,
   ...(c.demonstration?{demonstration:{...c.demonstration,visibleInput,...(c.basisId==='insufficient_information'?{observation:'No supplied source connects this example to either category; the supported result is insufficient information.'}:{})}}:{}),
   ...(c.basisId==='insufficient_information'?{requiredConclusion:conclusion[language]||conclusion.English}:{}),};
 }):raw.candidates[channel]]))};
}
export async function selectReelConcept(input:{topic:string;language:string;treatment:string;duration:string;channel?:ContentChannel;accountKey:string;provider:string;recent:string[];maxRepairs:number;signal?:AbortSignal;request:(prompt:string)=>Promise<string>}):Promise<ConceptSelection> {
 // Account identity is hashed only for an in-memory namespace; never returned or logged.
 const key=createHash('sha256').update(JSON.stringify([input.accountKey,input.provider,input.topic,input.language,input.treatment,input.duration])).digest('hex');
 ensureActive(input.signal);
 const channel=input.channel||'Connection';
 const create=async():Promise<Cached>=>{
  const prompt=conceptPlanningPrompt(input);let instruction=prompt;
  for(let attempt=0;attempt<=Math.min(1,input.maxRepairs);attempt++) {
   ensureActive(input.signal);
   const raw=await input.request(instruction);
   ensureActive(input.signal);let issues:string[]=[];let batch:ConceptBatch|undefined;
   try{const parsed=ConceptBatchSchema.parse(groundConceptBatch(JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g,'').trim()),input.language));
    batch=chooseCompatibleConcepts(parsed,input.language);
    issues=batch?[]:[...conceptBatchIssues(parsed),...languageIssues(parsed,input.language),'No feasible, distinct candidate combination; revise the alternatives rather than relabel the same tool.'];
   }catch{issues=['Return a complete valid concept-batch JSON object using supplied basisIds.'];}
   if(batch&&!issues.length){const entry={batch,used:new Set<ContentChannel>(),expires:Date.now()+120000};cache.set(key,entry);while(cache.size>16)cache.delete(cache.keys().next().value!);return entry;}
   console.warn('[Concept Planner] Rejected plan:',issues.join(' '));
   if(attempt===Math.min(1,input.maxRepairs))throw new AiProviderError('output_validation');
   instruction=prompt+'\nCONCEPT REPAIR REQUIRED:\n'+issues.join('\n')+'\nPREVIOUS PLAN:\n'+raw;
  }
  throw new AiProviderError('output_validation');
 };
 let entry=cache.get(key);
 if(!entry||entry.expires<Date.now()||entry.used.has(channel)) {
  entry=await create();
 }
 entry.used.add(channel);
 return {stage:'concept-before-story',selected:entry.batch.candidates[channel].find(c=>c.id===entry!.batch.selected[channel])!,
  comparedWith:CHANNEL_NAMES.map(ch=>{const c=entry!.batch.candidates[ch].find(c=>c.id===entry!.batch.selected[ch])!;return {channel:ch,id:c.id,hlni:c.hlni,mechanismKey:c.mechanismKey,device:c.device};}),contrast:entry.batch.contrast};
}
