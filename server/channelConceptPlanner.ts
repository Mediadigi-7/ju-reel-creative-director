import { CreativeConceptSchema, type CreativeConcept, type ConceptSelection } from '../shared/concepts.js';
import { channelPrompt, type ContentChannel } from '../shared/channels.js';
import { storySpineIssues, CONCEPT_QUALITY_CONTRACT } from '../shared/conceptQuality.js';
import { creativeEvidenceContext } from '../shared/verifiedCreativeEvidence.js';
import { REASONING_TOOLS } from '../shared/reasoningTools.js';
import { approvedBenchmarkPrompt } from '../shared/editorialBenchmarks.js';
import { groundConceptBatch,selectedConceptIssues } from './conceptPlanner.js';
import { AiProviderError } from './aiErrors.js';
import { ensureActive } from './requestBudget.js';

export function channelConceptPrompt(input:{topic:string;channel:ContentChannel;language:string;duration:string;treatment:string;recent:string[]}):string {
 const pilot=input.channel==='Trust'&&/b\.?\s*com/i.test(input.topic)&&/\bbba\b/i.test(input.topic)?"For this B.Com vs BBA Trust pilot, use a coherent human starting point: a student who wants to study management has excluded B.Com because they assume it contains only accounting. The supplied Business Organization & Management row corrects that exclusion, so B.Com returns to a PROVISIONAL shortlist while actual teaching/assessment remain unknown. Invent an original execution around that supported belief/action correction; the evidence does not select a degree, promise a career or establish identical courses. Keep the motive, excluded option and restored option consistent. This brief sets the informational and human logic, not prescribed dialogue, scene names or equal timings. A new generic research question or an unspecified act of mapping modules is not enough.":'';
 return `TASK: CONCEPT_SELECTION
SCOPE: SINGLE_CHANNEL ${input.channel}. Generate exactly TWO alternative concepts for this channel only; do not plan or judge another channel.
Topic: ${input.topic}. Audience: +2 students. Language: ${input.language}. Treatment: ${input.treatment}. Duration: ${input.duration}.
Do not generate a storyboard, timecodes or scores. Keep each planning field to a concise specific clause.
${channelPrompt(input.channel)}
${CONCEPT_QUALITY_CONTRACT}
${approvedBenchmarkPrompt(input.channel)}
${creativeEvidenceContext(input.topic)}
Choose the concept with the strongest supported insight and observable consequence. A question-forming method is valid when a precise observation leads to a matching question AND the student visibly uses it to change their next action. Do not substitute a different academic concept. A known hypothetical marking criterion may demonstrate a preparation change without claiming it is a university rubric.
For Trust on B.Com vs BBA, prefer the supplied official course-title evidence when it offers the strongest insight. Shared titles disprove complete title separation; they do not prove identical teaching, depth, assessment, or exclusive membership. Keep the exact programme and document version visible, then show a bounded comparison action that corrects the opening assumption. This is evidence guidance, not a mandatory plot.
ACTION-BASED PILOT REQUIREMENT: The starting belief must be driving a concrete mistaken action, not merely a vague feeling of confusion. Show how the verified observation corrects THAT action. For example, an option excluded solely because of its degree title can return to a provisional shortlist after the real shared row is seen; mark teaching/assessment as unknown rather than claiming equality. Or visibly correct a specific false statement in the student's comparison notes. These are possible consequences, not compulsory scripts.
${pilot}
Use only known values when showing a comparison table: the exact named course row and programme/document scope. Leave unsupported fields explicitly unknown. No counts of remaining subjects, invented unique/core modules, assumed equivalent depth or admissions promises. A restored option is provisional; the evidence does not select a degree for the student.
Only these supplied facts may be presented as institutional facts; other exercises are clearly hypothetical. No aptitude diagnoses, degree guarantees, invented subjects or fabricated citations.
Available reasoning foundations: ${JSON.stringify(REASONING_TOOLS)}
For original_reasoned_method supply your own hlni, support, methodSteps, interpretationRule, visibleProof and limitations. They must follow from the visible demonstration; do not invent empirical evidence. Other foundations are supplied by the application. Do not use verified_curriculum_example outside the supplied B.Com vs BBA context.
Return {"candidates":[CONCEPT,CONCEPT],"selected":"one candidate id"}. Each candidate includes the full requested JSON schema: id, basisId, title, audienceGap, viewerChange, concept, mechanismKey, device, payoff, hlni, support, methodSteps, interpretationRule, visibleProof, limitations, treatment, storySpine and demonstration.
StorySpine: {startingBelief,studentSituation,observation,focus,whyQuestionFollows,changedAction,visibleConsequence,channelExperience}.
Demonstration: {input,visibleInput,observation,nextQuestion}. Write the concise visibleInput and nextQuestion in ${input.language==='English'?'English':input.language==='Tanglish'?'natural Tanglish':`native-script ${input.language}`}; the concrete example must be visible; for the scoped verified-course Trust pilot a question may be phrased naturally rather than recited verbatim. Canonical degree identifiers may remain in Latin script. For a fact-based example visibleInput can be the exact course-title row. No other channel's invalid concept should affect this selection.
Recent actual outcomes to avoid repeating: ${JSON.stringify(input.recent)}
Return JSON only.`;
}
function nativeIssues(c:CreativeConcept,language:string){
 const script:Record<string,RegExp>={Tamil:/[\u0B80-\u0BFF]/,Telugu:/[\u0C00-\u0C7F]/,Malayalam:/[\u0D00-\u0D7F]/,Hindi:/[\u0900-\u097F]/};
 if(!script[language])return [];
 const d=c.demonstration!,strip=(s:string)=>s.replace(/\b(?:B\.?\s*Com|BBA|B\.?\s*Tech|B\.?\s*Sc|BCA|MBA|AI|ML|CSE|VLSI|Joy University)\b/gi,'');
 return !script[language].test(d.nextQuestion)||/[A-Za-z]/.test(strip(d.nextQuestion+' '+d.visibleInput))?[`Use native ${language} in the visible example and question.`]:[];
}
export async function selectChannelConcept(input:{topic:string;channel:ContentChannel;language:string;duration:string;treatment:string;recent:string[];maxRepairs:number;signal?:AbortSignal;request:(prompt:string)=>Promise<string>;review:(concept:CreativeConcept)=>Promise<string[]|{blocking:string[];advice:string[]}>;onRejected?:(plan:unknown,issues:string[])=>void}):Promise<ConceptSelection>{
 const prompt=channelConceptPrompt(input);let instruction=prompt;
 for(let attempt=0;attempt<=Math.min(1,input.maxRepairs);attempt++){
  ensureActive(input.signal);const raw=await input.request(instruction);ensureActive(input.signal);
  let plan:any,selected:CreativeConcept|undefined,issues:string[]=[];
  try{
   plan=JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g,'').trim());
   // Older plan records/mocked providers can contain all channels; inspect only the requested one.
   const candidates=Array.isArray(plan.candidates)?plan.candidates:plan.candidates?.[input.channel];
   if(!Array.isArray(candidates)||candidates.length!==2)throw new Error('Two candidates are required.');
   const grounded=groundConceptBatch({candidates:{[input.channel]:candidates}},input.language) as any;
   const parsed=grounded.candidates[input.channel].map((c:unknown)=>CreativeConceptSchema.safeParse(c));
   const nominated=typeof plan.selected==='string'?plan.selected:plan.selected?.[input.channel];
   const valid=parsed.flatMap((r:any)=>r.success?[r.data as CreativeConcept]:[]).filter((c:CreativeConcept)=>{
    if(c.basisId==='verified_curriculum_example'&&(!/b\.?\s*com/i.test(input.topic)||!/\bbba\b/i.test(input.topic)))return false;
    return !selectedConceptIssues(c,input.channel).length&&!nativeIssues(c,input.language).length;
   });
   if(new Set(candidates.map(c=>c.id)).size!==2)throw new Error('Use unique candidate ids.');
   selected=valid.find((c:CreativeConcept)=>c.id===nominated)||valid[0];
   if(!selected)issues=['Neither requested-channel candidate has a complete valid insight, story spine, demonstration and limitations.'];
  }catch{issues=['Return exactly two complete requested-channel candidates and one selected id.'];}
  if(selected&&!issues.length){const reviewed=await input.review(selected);if(Array.isArray(reviewed))issues=reviewed;else{issues=reviewed.blocking;if(reviewed.advice.length)selected={...selected,reviewNotes:reviewed.advice.slice(0,6)};}}
  if(selected&&!issues.length)return {...(input.channel==='Trust'&&input.language==='English'&&selected.basisId==='verified_curriculum_example'?{deliveryPolicy:'evidence-and-action-v1' as const}:{}),stage:'concept-before-story',selected,comparedWith:[],contrast:`Only ${input.channel} was planned and reviewed. Finished-story channel comparison is separate; this is not editorial approval.`};
  input.onRejected?.(plan||{invalidJson:true},issues);
  if(attempt===Math.min(1,input.maxRepairs))throw new AiProviderError('output_validation',undefined,issues.some(i=>i.includes('| integrity:'))?'evidence':'concept');
  instruction=prompt+'\nREQUESTED-CHANNEL CONCEPT REPAIR REQUIRED:\n'+issues.join('\n')+'\nPREVIOUS REQUESTED PLAN:\n'+JSON.stringify(plan||{});
 }
 throw new AiProviderError('output_validation',undefined,'concept');
}
