import type { ConceptBatch, CreativeConcept } from '../shared/concepts.js';
import { clearConceptPlanningCache } from './conceptPlanner.js';

// Explicit mocked planning stage for storyboard-focused regressions. Dedicated
// planner tests below exercise real planning requests, failure paths and caching.
export function conceptBatchFixture():ConceptBatch {
 const make=(id:string,hlni:string,mechanismKey:string,device:string):CreativeConcept=>({
  id,title:id,audienceGap:'The target student needs an overlooked decision question.',hlni,
  viewerChange:'Use the demonstrated result to choose a concrete next question.',concept:device,mechanismKey,device,
  supportType:'method',support:'A test-only reasoned method, not verified academic evidence.',evidenceNeeded:[],
  methodSteps:['Record the observable result.','Compare the result with the stated criterion.'],
  interpretationRule:'Use the comparison to choose the next question, not to guarantee an outcome.',
  visibleProof:'Show the recorded result changing the next question.',payoff:'The initial uncertainty resolves through the demonstrated result.',treatment:'Informative',
  limitations:'Exploratory reasoning only; no degree-specific facts, aptitude prediction or guaranteed outcome.',
  demonstration:{input:'A clearly labelled test-only example task.',visibleInput:'Test example',observation:'A concrete question needs to be investigated.',nextQuestion:'What will I practise?'},
 });
 const trust={...make('trust-a','A source checklist separates a factual claim from the evidence needed to support it.','claim_scope_audit','An evidence request is narrowed with a claim-and-source checklist.'),basisId:'assessment_questions'};
 const connection={...make('connection-a','An exploratory activity journal records engagement and confusion before repeating a friend’s decision.','engagement_journal','Two people compare their trial notes and negotiate different next steps.'),basisId:'task_question_journal'};
 const discovery={...make('discovery-a','A prediction can fail when a hidden classification rule is revealed and explained.','hidden_rule_prediction','A physical sorting challenge reveals an overlooked condition through a counterexample.'),basisId:'insufficient_information'};
 return {candidates:{Trust:[trust,{...trust,id:'trust-b'}],Connection:[connection,{...connection,id:'connection-b'}],Discovery:[discovery,{...discovery,id:'discovery-b'}]},
  selected:{Trust:trust.id,Connection:connection.id,Discovery:discovery.id},contrast:'Claim scope auditing, personal trial journaling and hidden-rule prediction have different insights and mechanisms.'};
}
export function installConceptPlanningMocks():()=>void {
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'fetch')!;
 let delegate=globalThis.fetch;
 clearConceptPlanningCache();
 const wrapper:typeof fetch=async(input,init)=>{
  let body:any;try{body=JSON.parse(String(init?.body||'{}'));}catch{}
  const prompt=body?.contents?.[0]?.parts?.[0]?.text||body?.messages?.at(-1)?.content||'';
  if(prompt.startsWith('TASK: EDITORIAL_REVIEW')) {
   const content=JSON.stringify({issues:[]});
   return new Response(JSON.stringify(body.contents?{candidates:[{content:{parts:[{text:content}]}}]}:{choices:[{message:{content}}]}));
  }
  if(prompt.startsWith('TASK: CONCEPT_SELECTION')) {
   const content=JSON.stringify(conceptBatchFixture());
   return new Response(JSON.stringify(body.contents?{candidates:[{content:{parts:[{text:content}]}}]}:{choices:[{message:{content}}]}));
  }
  return delegate(input,init);
 };
 Object.defineProperty(globalThis,'fetch',{configurable:true,get:()=>wrapper,set:(value:typeof fetch)=>{delegate=value;}});
 return ()=>{Object.defineProperty(globalThis,'fetch',descriptor);clearConceptPlanningCache();};
}
