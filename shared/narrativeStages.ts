import type { ReelStoryboard } from './types.js';
export const SIX_STAGE_CONTRACT='six-stage-v2' as const;
export const SIX_STAGE_ORDER=['HOOK','PROBLEM','PATTERN_INTERRUPT','VALUE','PAYOFF','CTA'] as const;
export const STAGE_LABELS={HOOK:'Hook',PROBLEM:'Problem',PATTERN_INTERRUPT:'Pattern interrupt',VALUE:'Value',PAYOFF:'Payoff',CTA:'Call to action'} as const;
export const SIX_STAGE_WRITING_CONTRACT=`CURRENT SIX-STAGE CONTRACT — required for every new storyboard:
Show Hook → Problem → Pattern Interrupt → Value → Payoff → one CTA in this order, as six clearly separate primary stage groups. Start with six production shots, one per stage; add shots inside a stage only if the story needs them. Never collapse six functions into three shots. No fixed maximum shot count and no equal-time requirement.
Every shot needs a primary type from HOOK, PROBLEM, PATTERN_INTERRUPT, VALUE, PAYOFF, CTA; its name should describe the scene, and functions must include that primary type. Keep primary stage groups in order. Use one final CTA shot with one purposeful action, not several engagement requests.
Hook attracts the specific student. Problem establishes one concrete tension. Pattern Interrupt changes attention or understanding meaningfully. Value delivers at least one credible, non-obvious HLNI through an example. Payoff SHOWS what that information changes in the same story. CTA follows naturally from that outcome, without inventing a link, guide or institutional service.
A question-forming method can end with an unanswered question, but show why the new question or next action is better than the original approach. Labels alone do not establish value or payoff. All six stages must fit the requested duration and natural speech budget; shorten dialogue, never pad the running time.
This contract supersedes older optional-stage guidance for NEW generation. Existing saved stories keep their actual scenes and can still be edited.`;
export function sixStageIssues(reel:Pick<ReelStoryboard,'shots'>):string[]{
 const issues:string[]=[];const types=reel.shots.map(s=>s.type);
 if(types.length<6)issues.push('New storyboards need at least six shots so all six stages are separate.');
 for(const type of SIX_STAGE_ORDER)if(!types.includes(type))issues.push(`Missing required stage: ${STAGE_LABELS[type]}.`);
 let previous=-1;
 for(const shot of reel.shots){
  const index=SIX_STAGE_ORDER.indexOf(shot.type as typeof SIX_STAGE_ORDER[number]);
  if(index<0){issues.push(`Shot ${shot.number} needs a primary storytelling stage; SCENE is only for legacy content.`);continue;}
  if(index<previous)issues.push('Primary stages must progress from Hook through CTA in order.');
  previous=index;
  if(shot.functions?.length&&!shot.functions.includes(shot.type as typeof SIX_STAGE_ORDER[number]))issues.push(`Shot ${shot.number}: function tags must include its primary stage.`);
 }
 if(types.filter(t=>t==='CTA').length!==1||types.at(-1)!=='CTA')issues.push('Use exactly one final CTA shot.');
 const cta=reel.shots.at(-1);
 if(cta?.type==='CTA'&&!`${cta.dialogue} ${cta.onscreenText}`.trim())issues.push('The CTA needs an actual spoken or visible next action.');
 return [...new Set(issues)];
}
