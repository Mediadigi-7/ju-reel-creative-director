import type { ReelStoryboard } from './types.js';

export const HLNI_STANDARD = 'HLNI-v1' as const;
export const HLNI_CHECKS = {
  newInformation:'New: an identifiable, non-obvious insight for this audience',
  highLeverage:'High-leverage: meaningfully changes understanding or action',
  supported:'Credible: accurate, appropriately qualified and supported',
  integrated:'Integrated: advances the same connected story',
  paysOff:'Payoff: the viewer understands why the insight matters',
} as const;
export type HlniChecks = Record<keyof typeof HLNI_CHECKS, boolean>;
export interface HlniCandidate {
  insight:string;
  audienceGap:string;
  viewerChange:string;
  supportType:'fact'|'method'|'perspective';
  support:string;
  references?:string[];
  shotNumbers:number[];
  payoffShotNumbers:number[];
  payoff:string;
}
export interface EditorialReview {
  standard:typeof HLNI_STANDARD;
  checks:HlniChecks;
  approvedAt:string;
  contentSnapshot:string;
}

export const HLNI_CREATIVE_CONTRACT = `
MANDATORY EDITORIAL STANDARD — HIGH-LEVERAGE NEW INFORMATION (HLNI)
Every Trust, Connection and Discovery Reel must deliver at least one audience-relevant HLNI:
NEW: challenge an assumption, reveal an overlooked fact, introduce an unfamiliar perspective or a useful method the target audience is unlikely to know.
HIGH-LEVERAGE: change a decision, prevent a mistake, improve understanding or provide something practical to apply.
CREDIBLE: factual claims must be verifiable and appropriately qualified; personal insights and perspectives must be believable and logically supported.
Test: can the viewer say "I didn't know that. Now I understand differently, or know what to do next"?
Identify the audience's existing belief/confusion; embed the insight in the connected story; demonstrate how it changes the question, decision or outcome.
HLNI is not a seventh stage, a required standalone scene, or extra spoken exposition. It can emerge early or late through dialogue, visual evidence, comparison, a reveal or action. Keep the story-led shot count, optional pattern interrupt and optional purposeful CTA.
Before returning, propose the specific insight, audience gap, practical change, support/qualifications, actual shot references and meaningful payoff in hlni metadata. Metadata does not count as information delivered to the viewer: the shots themselves must communicate it.
Generic advice ("follow your passion", "check the syllabus"), familiar reassurance, emotion, attractive visuals or engagement alone do not qualify. In Connection, reassurance about choosing differently from a friend needs an actionable method, such as comparing actual assignment tasks the students would enjoy and identifying what each wants to practise.
When the HLNI is a method, make its steps usable: what should the viewer examine or try, what should they record/compare, and how does that result change the next decision? Show this in the scenes; merely saying "compare assignments", "read the syllabus" or "choose what fits" is insufficient.
The primary supportType is not an exemption for embedded factual claims. Verify or qualify every factual claim, including claims inside a method or perspective. Avoid unsupported absolutes such as "the only reliable way". With no actual curricula supplied, do not claim high overlap in particular subjects or show invented real syllabus screens; a clearly labelled question worksheet can explain a method without pretending to be institutional evidence.
For B.Com/BBA examples: shared Financial Accounting or Marketing modules are possibilities, not universal or verified institutional facts. Never invent syllabus extracts or claim every programme contains them. Verify actual curricula, qualify factual examples, or teach a concrete comparison method without inventing subject lists. Do not fabricate sources to make an insight look credible.
Creative contract: Concept first → Connected story → At least one HLNI → Meaningful payoff → Editorial verification.
Every new output is a draft pending human editorial review of NEW, HIGH-LEVERAGE, SUPPORTED, INTEGRATED, and PAYOFF. Never self-approve or report factual verification merely because you filled the metadata.
`;

export function hlniIssues(candidate:HlniCandidate, reel:ReelStoryboard):string[] {
  if(!candidate || typeof candidate!=='object')return ['Identify at least one HLNI.'];
  const issues:string[]=[];
  for(const key of ['insight','audienceGap','viewerChange','support','payoff'] as const)
    if(typeof candidate[key]!=='string'||!candidate[key].trim())issues.push(`Complete ${key}.`);
  const familiar = new Set(['follow your passion','follow your interests','read the syllabus','check the syllabus','choose what you enjoy','do what you love']);
  if(typeof candidate.insight==='string' && familiar.has(candidate.insight.toLowerCase().trim().replace(/[.!?]+$/,'')))issues.push('Familiar advice alone is not an HLNI. Identify the non-obvious information or a usable decision method.');
  if(!['fact','method','perspective'].includes(candidate.supportType))issues.push('Choose the support type.');
  for(const field of ['shotNumbers','payoffShotNumbers'] as const)
    if(!Array.isArray(candidate[field])||!candidate[field].length||candidate[field].some(n=>!Number.isInteger(n)||!reel.shots.some(s=>s.number===n)))
      issues.push(`Identify existing ${field==='shotNumbers'?'insight':'payoff'} shots.`);
  if(candidate.supportType==='fact' && !candidate.references?.some(r=>typeof r==='string'&&r.trim()))issues.push('Give a verifiable reference for the factual claim.');
  return issues;
}

// Exact content binding, not a quality score or a security/authentication claim.
export function editorialSnapshot(reel:ReelStoryboard):string {
  return JSON.stringify({title:reel.reelTitle,channel:reel.channel,angle:reel.creativeAngle,objective:reel.objective,
    audience:reel.targetAudience,language:reel.language,treatment:reel.creativeDirection,duration:reel.duration,
    shots:reel.shots,hlni:reel.hlni,conceptSelection:reel.conceptSelection,productionNotes:reel.productionNotes,creativeSummary:reel.creativeSummary},(_key,value)=>
      value && typeof value==='object' && !Array.isArray(value)?Object.fromEntries(Object.keys(value).sort().map(key=>[key,value[key]])):value);
}
export function isEditoriallyApproved(reel:ReelStoryboard):boolean {
  const review=reel.editorialReview;
  return !!review && review.standard===HLNI_STANDARD && !!review.approvedAt &&
    Object.keys(HLNI_CHECKS).every(key=>review.checks?.[key as keyof HlniChecks]===true) &&
    !!reel.hlni?.some(candidate=>hlniIssues(candidate,reel).length===0) && review.contentSnapshot===editorialSnapshot(reel);
}
export function editorialLabel(reel:ReelStoryboard):string {
  return isEditoriallyApproved(reel)?'HLNI editorial review approved':'HLNI editorial review required';
}
export function enforceEditorialStatus(reel:ReelStoryboard):ReelStoryboard {
  if(isEditoriallyApproved(reel))return reel;
  const {editorialReview:_,...rest}=reel;
  return {...rest,status:reel.status==='Ready for Production'?'Draft':reel.status};
}
export function approveEditorialReview(reel:ReelStoryboard, checks:HlniChecks):ReelStoryboard {
  if(!reel.hlni?.some(candidate=>hlniIssues(candidate,reel).length===0))throw new Error('Identify a complete, supported HLNI in the actual shots before approval.');
  if(!Object.keys(HLNI_CHECKS).every(key=>checks[key as keyof HlniChecks]===true))throw new Error('All five editorial checks must pass.');
  const now=new Date().toISOString();
  return {...reel,status:'Ready for Production',updatedAt:now,
    editorialReview:{standard:HLNI_STANDARD,checks:{...checks},approvedAt:now,contentSnapshot:editorialSnapshot(reel)}};
}
