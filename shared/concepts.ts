import { z } from 'zod';
import type { ReelStoryboard } from './types.js';

export const CreativeConceptSchema=z.object({
  id:z.string().min(1),title:z.string().min(3),audienceGap:z.string().min(8),
  basisId:z.string().optional(),
  requiredConclusion:z.string().optional(),
  hlni:z.string().min(12),viewerChange:z.string().min(10),
  concept:z.string().min(12),mechanismKey:z.string().min(3),device:z.string().min(8),
  supportType:z.enum(['fact','method','perspective']),support:z.string().min(12),
  evidenceNeeded:z.array(z.string()),methodSteps:z.array(z.string()),interpretationRule:z.string(),
  visibleProof:z.string().min(12),payoff:z.string().min(12),
  limitations:z.string().min(12).optional(),
  demonstration:z.object({input:z.string().min(10),visibleInput:z.string().min(6).optional(),observation:z.string().min(10),nextQuestion:z.string().min(10)}).optional(),
  treatment:z.enum(['Informative','Funny','Trendy']),
});
export const ConceptBatchSchema=z.object({
  candidates:z.object({Trust:z.array(CreativeConceptSchema).min(2).max(3),Connection:z.array(CreativeConceptSchema).min(2).max(3),Discovery:z.array(CreativeConceptSchema).min(2).max(3)}),
  selected:z.object({Trust:z.string(),Connection:z.string(),Discovery:z.string()}),
  contrast:z.string().min(15),
});
export type CreativeConcept=z.infer<typeof CreativeConceptSchema>;
export type ConceptBatch=z.infer<typeof ConceptBatchSchema>;
export const ConceptSelectionSchema=z.object({
  stage:z.literal('concept-before-story'),selected:CreativeConceptSchema,
  comparedWith:z.array(z.object({channel:z.enum(['Trust','Connection','Discovery']),id:z.string(),hlni:z.string(),mechanismKey:z.string(),device:z.string()})),
  contrast:z.string(),
});
export type ConceptSelection=z.infer<typeof ConceptSelectionSchema>;

export function conceptDeliveryIssues(reel:ReelStoryboard,concept:CreativeConcept):string[] {
  const normalize=(text:string)=>text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
  const actual=normalize(reel.shots.map(s=>s.dialogue+' '+s.onscreenText+' '+s.visual).join(' '));
  const issues:string[]=[];
  for(const [label,text] of [['sample input',concept.demonstration?.visibleInput],['resulting question',concept.demonstration?.nextQuestion]])
    if(text&&text.split(/[.!?]\s+|[\n|]+/u).some(part=>normalize(part)&&!actual.includes(normalize(part))))
      issues.push(`The actual dialogue, graphics or visible action must include the selected ${label}: ${text}`);
  const equivalentEnglish=reel.language==='English'&&/not enough (?:information|info|evidence)|insufficient (?:information|info|evidence)|cannot (?:tell|decide|determine|confirm)|can t (?:tell|decide|determine|confirm)/.test(actual);
  if(concept.requiredConclusion&&!actual.includes(normalize(concept.requiredConclusion))&&!equivalentEnglish)issues.push(`The actual story must state the supported conclusion: ${concept.requiredConclusion}`);
  return issues;
}
