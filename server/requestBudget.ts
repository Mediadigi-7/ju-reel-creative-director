import { AiProviderError } from './aiErrors.js';

// Reserve real writing time, not a token-sized timeout for optional work.
export const FINALISATION_MS=1500;
export const MIN_WRITER_MS=12000;
export const ADVISORY_CRITIQUE_MS=8000;
export const ADVISORY_REWRITE_MS=20000;
export type GenerationStage='concept'|'story'|'repair'|'critique'|'advisory_rewrite';
export interface GenerationTrace {
 stage:GenerationStage|'advisory'|'validation';
 outcome:string; elapsedMs:number; remainingMs:number; category?:string;
}
export function ensureActive(signal?:AbortSignal) {
 if(signal?.aborted)throw new AiProviderError('cancelled');
}
export function requestSignal(parent:AbortSignal|undefined,timeoutMs:number) {
 const controller=new AbortController();
 const abort=()=>controller.abort(parent?.reason);
 parent?.addEventListener('abort',abort,{once:true});
 if(parent?.aborted)abort();
 const timer=setTimeout(()=>controller.abort(new DOMException('Request deadline reached','TimeoutError')),Math.max(1,timeoutMs));
 return {signal:controller.signal,dispose(){clearTimeout(timer);parent?.removeEventListener('abort',abort);}};
}
export function advisoryReserve(writerMs:number) {
 return ADVISORY_CRITIQUE_MS+Math.max(ADVISORY_REWRITE_MS,Math.ceil(writerMs*1.5))+FINALISATION_MS+500;
}
