import { REASONING_TOOLS } from '../shared/reasoningTools.js';
const string=()=>({type:'STRING'});
const enumeration=(values:readonly string[])=>({type:'STRING',enum:[...values]});
const array=(items:object)=>({type:'ARRAY',items});
const object=(properties:Record<string,object>)=>({type:'OBJECT',properties,required:Object.keys(properties)});
const functions=['HOOK','PROBLEM','PATTERN_INTERRUPT','VALUE','PAYOFF','CTA'] as const;
const concept=object({id:string(),basisId:enumeration(Object.keys(REASONING_TOOLS)),title:string(),audienceGap:string(),viewerChange:string(),
  concept:string(),mechanismKey:string(),device:string(),treatment:enumeration(['Informative','Funny','Trendy']),
  demonstration:object({input:string(),visibleInput:string(),observation:string(),nextQuestion:string()})});
export const conceptResponseSchema=object({
  candidates:object(Object.fromEntries(['Trust','Connection','Discovery'].map(channel=>[channel,{...array(concept),minItems:2,maxItems:2}]))),
  selected:object({Trust:string(),Connection:string(),Discovery:string()}),contrast:string(),
});
export const storyResponseSchema=object({
  reelTitle:string(),creativeAngle:string(),objective:string(),targetAudience:string(),duration:string(),
  creativeDirection:enumeration(['Informative','Funny','Trendy']),language:enumeration(['English','Tamil','Telugu','Malayalam','Hindi','Tanglish']),
  shots:array(object({number:{type:'INTEGER'},type:enumeration([...functions,'SCENE']),functions:array(enumeration(functions)),
    name:string(),timestamp:string(),visual:string(),dialogue:string(),cameraPerformance:string(),onscreenText:string()})),
  productionNotes:object({visualStyle:string(),performance:string(),camera:string(),editing:string(),sound:string(),props:array(string()),locations:array(string()),casting:string(),complexity:enumeration(['LOW','MEDIUM','HIGH'])}),
  creativeSummary:object({keyCreativeIdea:string(),shootingPriority:array(string())}),
  hlni:array(object({insight:string(),audienceGap:string(),viewerChange:string(),supportType:enumeration(['fact','method','perspective']),support:string(),references:array(string()),shotNumbers:array({type:'INTEGER'}),payoffShotNumbers:array({type:'INTEGER'}),payoff:string()})),
});
export const dialogueResponseSchema=object({shots:array(object({number:{type:'INTEGER'},dialogue:string(),onscreenText:string()}))});

export const editorialResponseSchema=object({issues:array(object({category:enumeration(['fidelity','integrity','insight','payoff','channel','production']),evidence:string(),revision:string()}))});
