import React,{useEffect,useRef} from 'react';
import {Loader2,Check,AlertCircle} from 'lucide-react';
export interface GenerationLoaderProps {title?:string;direction?:string;language?:string;isComplete?:boolean;error?:string|null;onCompleteAnimation?:()=>void;onRetry?:()=>void;}
export const GenerationLoader:React.FC<GenerationLoaderProps>=({title,language,isComplete,error,onCompleteAnimation,onRetry})=>{
 const complete=useRef(onCompleteAnimation);complete.current=onCompleteAnimation;
 useEffect(()=>{if(!isComplete||error)return;const timer=setTimeout(()=>complete.current?.(),250);return()=>clearTimeout(timer);},[isComplete,error]);
 return <section aria-busy={!isComplete&&!error} className="max-w-2xl mx-auto py-16 sm:py-24">
  <div role={error?'alert':'status'} className="flex gap-4 items-start">
   {error?<AlertCircle aria-hidden="true" className="w-7 h-7 text-red-700 shrink-0"/>:isComplete?<Check aria-hidden="true" className="w-7 h-7 text-emerald-700 shrink-0"/>:<Loader2 aria-hidden="true" className="w-7 h-7 text-[#AF1E2A] animate-spin shrink-0"/>}
   <div><h1 className="text-2xl sm:text-3xl font-bold text-stone-950">{error?'Your storyboard couldn’t be created':isComplete?'Your draft is ready':'Preparing your storyboard'}</h1>
    <p className="mt-3 text-base leading-relaxed text-stone-600">{error||'We’re preparing a connected story with dialogue, visuals and camera directions. You can review and edit it before filming.'}</p>
   </div>
  </div>
  <p className="mt-7 border-t border-stone-200 pt-5 text-sm text-stone-700 break-words">{title}{language?` · ${language}`:''}</p>
  {error&&onRetry&&<button onClick={onRetry} className="mt-6 px-5 py-3 rounded-lg bg-[#AF1E2A] text-white font-semibold">Try again</button>}
 </section>;
};
