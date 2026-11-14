import { ensureActive, requestSignal, FINALISATION_MS, MIN_WRITER_MS, type GenerationStage, type GenerationTrace } from './requestBudget.js';
import { PROVIDER_MODELS, type AiProvider } from '../shared/providers.js';
import { AiProviderError, providerResponseError, transportError } from './aiErrors.js';
import { conceptResponseSchema, storyResponseSchema, dialogueResponseSchema, editorialResponseSchema } from './generationSchemas.js';

export function providerJsonClient(config:{provider:AiProvider;apiKey:string;deadline:number;timeoutMs:number;maxOutputTokens?:number;signal?:AbortSignal;onStage?:(event:GenerationTrace)=>void}) {
 return async (instruction:string,stage:'concept'|'story'|'editorial'='story',shape:'story'|'dialogue'='story',budget?:{stage:GenerationStage;deadline:number;timeoutMs:number}):Promise<string>=>{
  ensureActive(config.signal);
  const started=Date.now(),deadline=Math.min(config.deadline-FINALISATION_MS,budget?.deadline ?? Infinity);
  const reserve=stage==='concept'?MIN_WRITER_MS:0;
  const available=deadline-started-reserve;
  if(available<(stage==='editorial'?1000:stage==='concept'?5000:MIN_WRITER_MS))throw new AiProviderError('timeout');
  const scope=requestSignal(config.signal,Math.min(available,budget?.timeoutMs ?? (stage==='concept'?15000:config.timeoutMs)));
  let outcome='error',category:string|undefined;
  try {
  const gemini=config.provider==='gemini';
  const tokens=stage==='concept'?6000:stage==='editorial'?1800:config.maxOutputTokens;
  let res:Response;
  try{res=await fetch(gemini?`https://generativelanguage.googleapis.com/v1beta/models/${PROVIDER_MODELS.gemini}:generateContent`:'https://api.openai.com/v1/chat/completions',{
   method:'POST',signal:scope.signal,
   headers:{'Content-Type':'application/json',...(gemini?{'x-goog-api-key':config.apiKey}:{Authorization:'Bearer '+config.apiKey})},
   body:JSON.stringify(gemini?{contents:[{parts:[{text:instruction}]}],generationConfig:{temperature:.8,responseMimeType:'application/json',responseSchema:stage==='concept'?conceptResponseSchema:stage==='editorial'?editorialResponseSchema:shape==='dialogue'?dialogueResponseSchema:storyResponseSchema,...(tokens?{maxOutputTokens:tokens}:{})}}
    :{model:PROVIDER_MODELS.openai,messages:[{role:'system',content:stage==='concept'?'Plan credible, distinct concepts before storyboarding. Return JSON.':'Write the requested production storyboard. Return JSON.'},{role:'user',content:instruction}],response_format:{type:'json_object'},temperature:.8,...(tokens?{max_tokens:tokens}:{})}),
  });}catch(error){ensureActive(config.signal);throw transportError(error);}
  if(!res.ok)throw await providerResponseError(res,config.provider);
  const data=await res.json().catch(error=>{ensureActive(config.signal);if(scope.signal.aborted)throw transportError(error);throw new AiProviderError('invalid_response');});
  ensureActive(config.signal);
  if(scope.signal.aborted||Date.now()>=deadline)throw new AiProviderError('timeout');
  const text=gemini?data.candidates?.[0]?.content?.parts?.[0]?.text:data.choices?.[0]?.message?.content;
  if(typeof text!=='string'||!text.trim())throw new AiProviderError('invalid_response');
  outcome='complete';
  return text;
  } catch(error) { category=error instanceof AiProviderError?error.category:'invalid_response';throw error; }
  finally {scope.dispose();config.onStage?.({stage:budget?.stage ?? (stage==='editorial'?'critique':stage),outcome,category,elapsedMs:Date.now()-started,remainingMs:Math.max(0,config.deadline-Date.now())});}
 };
}
