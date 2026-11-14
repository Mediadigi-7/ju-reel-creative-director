export const CREATIVE_RUBRIC = [
  {key:'hlni',label:'High-Leverage New Information',weight:25},
  {key:'differentiation',label:'Channel differentiation',weight:20},
  {key:'coherence',label:'Narrative coherence',weight:20},
  {key:'payoff',label:'Payoff',weight:15},
  {key:'production',label:'Production readiness',weight:15},
  {key:'originality',label:'Originality',weight:5},
] as const;
export type CreativeRatings = Record<typeof CREATIVE_RUBRIC[number]['key'],number>;
export interface AutomaticRevisionTriggers {
  materialFactualError:boolean;
  missingMeaningfulInsight:boolean;
  unworkableProduction:boolean;
}
export function evaluateCreativeRatings(ratings:CreativeRatings,triggers:AutomaticRevisionTriggers) {
  for(const criterion of CREATIVE_RUBRIC)if(!Number.isFinite(ratings[criterion.key])||ratings[criterion.key]<0||ratings[criterion.key]>5)
    throw new Error('Each editorial rating must be between 0 and 5.');
  const total=Number(CREATIVE_RUBRIC.reduce((sum,c)=>sum+c.weight*ratings[c.key]/5,0).toFixed(2));
  const reasons:string[]=[];
  if(total<85)reasons.push('Overall score is below 85/100.');
  if(ratings.hlni<4)reasons.push('HLNI is below 4/5.');
  if(ratings.differentiation<4)reasons.push('Channel differentiation is below 4/5.');
  if(triggers.materialFactualError)reasons.push('Automatic revision: material factual error.');
  if(triggers.missingMeaningfulInsight)reasons.push('Automatic revision: missing meaningful insight.');
  if(triggers.unworkableProduction)reasons.push('Automatic revision: unworkable production instructions.');
  return {total,decision:reasons.length?'REVISE' as const:'PASS' as const,reasons};
}
