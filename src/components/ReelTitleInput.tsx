import React,{useEffect,useRef,useState} from 'react';
import {ArrowRight,Check,AlertCircle} from 'lucide-react';
import {CHANNEL_NAMES,type ContentChannel} from '../../shared/channels.js';
import {OFFLINE_IDEAS,OFFLINE_SAMPLE_CHANNELS,matchOfflineIdea,supportsOffline,OFFLINE_CHANNEL_UNSUPPORTED} from '../../shared/offline/index.js';
import {CREATIVE_DIRECTIONS} from '../../shared/knowledgeBase.js';
import type {CreativeTreatment,LanguageOption} from '../../shared/types.js';
export interface IdeaSelection {title:string;direction:CreativeTreatment;channel?:ContentChannel;language?:LanguageOption;}
interface Props {
 onGenerate:(title:string,direction:CreativeTreatment,language:LanguageOption,channel?:ContentChannel)=>void;
 isLoading:boolean;hasApiKey?:boolean;onOpenSettings?:()=>void;initialIdea?:IdeaSelection;onDraftChange?:(draft:IdeaSelection)=>void;
}
const goals:Record<ContentChannel,string>={Trust:'Explain clearly and build confidence',Connection:'Make students feel understood',Discovery:'Spark curiosity and share an insight'};
const languages=[['English','English'],['Tamil','தமிழ் · Tamil'],['Telugu','తెలుగు · Telugu'],['Malayalam','മലയാളം · Malayalam'],['Hindi','हिन्दी · Hindi']] as const;
export const ReelTitleInput:React.FC<Props>=({onGenerate,isLoading,hasApiKey=false,onOpenSettings,initialIdea,onDraftChange})=>{
 const [title,setTitle]=useState(initialIdea?.title || '');
 const [channel,setChannel]=useState<ContentChannel>(initialIdea?.channel || 'Connection');
 const [direction,setDirection]=useState<CreativeTreatment>(initialIdea?.direction || 'Auto');
 const [language,setLanguage]=useState<LanguageOption>(initialIdea?.language || 'English');
 const [error,setError]=useState<string|null>(null);const input=useRef<HTMLInputElement>(null);
 const topicField=useRef<HTMLDivElement>(null);
 const [suggestionsOpen,setSuggestionsOpen]=useState(false);
 const [activeSuggestion,setActiveSuggestion]=useState(-1);
 const suggestions=OFFLINE_IDEAS.filter(idea=>idea.title.toLocaleLowerCase().includes(title.trim().toLocaleLowerCase()));
 const showSuggestions=suggestionsOpen&&suggestions.length>0&&!isLoading;
 useEffect(()=>{
  const dismiss=(event:PointerEvent)=>{if(!topicField.current?.contains(event.target as Node))setSuggestionsOpen(false);};
  document.addEventListener('pointerdown',dismiss);
  return()=>document.removeEventListener('pointerdown',dismiss);
 },[]);
 useEffect(()=>{if(showSuggestions&&activeSuggestion>=0)document.getElementById(`reel-topic-option-${activeSuggestion}`)?.scrollIntoView({block:'nearest'});},[showSuggestions,activeSuggestion]);
 const updateDraft=(fields:Partial<IdeaSelection>)=>onDraftChange?.({title,direction,language,channel,...fields});
 const sample=matchOfflineIdea(title),canOpenSample=!hasApiKey&&supportsOffline(title,language);
 const chooseSuggestion=(idea:typeof OFFLINE_IDEAS[number])=>{
  setTitle(idea.title);setChannel(OFFLINE_SAMPLE_CHANNELS[idea.id]);
  updateDraft({title:idea.title,channel:OFFLINE_SAMPLE_CHANNELS[idea.id]});setError(null);
  input.current?.focus();setSuggestionsOpen(false);setActiveSuggestion(-1);
 };
 const handleSuggestionKey=(event:React.KeyboardEvent<HTMLInputElement>)=>{
  if((event.key==='ArrowDown'||event.key==='ArrowUp')&&suggestions.length){
   event.preventDefault();setSuggestionsOpen(true);
   setActiveSuggestion(current=>event.key==='ArrowDown'?(current+1)%suggestions.length:(current<0?suggestions.length-1:(current-1+suggestions.length)%suggestions.length));
  }else if(event.key==='Escape'&&suggestionsOpen){event.preventDefault();setSuggestionsOpen(false);setActiveSuggestion(-1);}
  else if(event.key==='Enter'&&showSuggestions&&activeSuggestion>=0&&activeSuggestion<suggestions.length){event.preventDefault();chooseSuggestion(suggestions[activeSuggestion]);}
 };
 const submit=(e:React.FormEvent)=>{
  e.preventDefault();if(isLoading)return;setSuggestionsOpen(false);
  if(!title.trim()){setError('Enter a topic or focus the topic field to choose a suggestion.');input.current?.focus();return;}
  if(!hasApiKey&&!supportsOffline(title,language)){setError('Your own topic needs an AI connection. Connect AI, or choose a sample topic to try the editor first.');return;}
  if(!hasApiKey&&sample&&OFFLINE_SAMPLE_CHANNELS[sample.id]!==channel){setError(OFFLINE_CHANNEL_UNSUPPORTED);return;}
  setError(null);onGenerate(title.trim(),direction,language,channel);
 };
 return <div className="max-w-3xl mx-auto py-6 sm:py-10">
  <div className="mb-7">
   <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-950">Create a reel storyboard</h1>
   <p className="mt-3 text-base leading-relaxed text-stone-600 max-w-xl">Turn a student-focused idea into a shooting plan with scenes, dialogue and camera directions.</p>
   <p className="mt-2 text-sm text-stone-600">{hasApiKey?'A provider key is saved. Review your choices, then create your draft.':'New here? Try a sample first. No API key is needed.'}</p>
  </div>
  <form onSubmit={submit} noValidate className="space-y-6 bg-white border border-stone-200 rounded-2xl p-5 sm:p-7">
   <div>
    <label htmlFor="reel-title-input" className="block text-base font-semibold text-stone-900 mb-2">What is your reel about?</label>
    <div ref={topicField} className="relative" onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node))setSuggestionsOpen(false);}}>
     <input id="reel-title-input" ref={input} role="combobox" aria-autocomplete="list" aria-haspopup="listbox" aria-expanded={showSuggestions} aria-controls={showSuggestions?'reel-topic-suggestions':undefined} aria-activedescendant={showSuggestions&&activeSuggestion>=0?`reel-topic-option-${activeSuggestion}`:undefined} autoComplete="off" value={title} onFocus={()=>{setSuggestionsOpen(true);setActiveSuggestion(-1);}} onClick={()=>setSuggestionsOpen(true)} onKeyDown={handleSuggestionKey} onChange={e=>{setTitle(e.target.value);updateDraft({title:e.target.value});setError(null);setSuggestionsOpen(true);setActiveSuggestion(-1);}} disabled={isLoading} aria-invalid={Boolean(error&&!title.trim())} aria-describedby={`topic-help${error?' topic-error':''}`} placeholder="For example: How do I choose the right college?" className="w-full rounded-lg border border-[#8b8680] px-4 py-3 text-base placeholder:text-stone-500"/>
     {showSuggestions&&<div className="absolute top-full left-0 right-0 z-20 mt-2 rounded-xl border border-stone-300 bg-white shadow-lg overflow-hidden">
      <p id="topic-suggestion-label" className="px-4 py-3 text-xs font-semibold text-stone-600 border-b border-stone-100">Suggested topics</p>
      <div id="reel-topic-suggestions" role="listbox" aria-labelledby="topic-suggestion-label" className="max-h-64 overflow-y-auto overscroll-contain p-1">
       {suggestions.map((idea,index)=><button key={idea.id} id={`reel-topic-option-${index}`} role="option" aria-selected={activeSuggestion===index} tabIndex={-1} type="button" onMouseDown={event=>event.preventDefault()} onClick={()=>chooseSuggestion(idea)} className={`w-full min-h-11 flex items-center justify-between gap-3 px-3 py-3 text-left text-sm rounded-lg ${activeSuggestion===index?'bg-stone-100 text-stone-950':'text-stone-700 hover:bg-stone-50'}`}><span>{idea.title}</span>{sample?.id===idea.id&&<Check aria-hidden="true" className="w-4 h-4 shrink-0"/>}</button>)}
      </div>
     </div>}
    </div>
    <p id="topic-help" className="mt-2 text-sm text-stone-600">{hasApiKey?'Enter your own idea or choose a suggested topic.':'Click the field to choose a sample, or connect AI to use your own topic.'}</p>
   </div>
   <fieldset disabled={isLoading}>
    <legend className="text-base font-semibold text-stone-900 mb-3">What should this reel do?</legend>
    <div className="grid sm:grid-cols-3 gap-2">{CHANNEL_NAMES.map(name=><label key={name} className={`flex items-start gap-2 p-3 rounded-lg border cursor-pointer ${channel===name?'border-stone-700 bg-stone-50':'border-stone-200 hover:border-stone-400'}`}><input type="radio" name="channel" value={name} checked={channel===name} onChange={()=>{setChannel(name);updateDraft({channel:name});setError(null);}} className="mt-1 accent-[#AF1E2A]"/><span><span className="block text-sm font-semibold text-stone-950">{name}</span><span className="block mt-1 text-sm leading-snug text-stone-600">{goals[name]}</span></span></label>)}</div>
   </fieldset>
   <div className="grid sm:grid-cols-2 gap-4">
    <label className="block text-sm font-semibold text-stone-800">Spoken language<select value={language} onChange={e=>{setLanguage(e.target.value as LanguageOption);updateDraft({language:e.target.value as LanguageOption});setError(null);}} disabled={isLoading} className="mt-2 w-full rounded-lg border border-[#8b8680] bg-white px-3 py-3 font-normal">{languages.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
    <label className="block text-sm font-semibold text-stone-800">Storytelling style<select value={direction} onChange={e=>{setDirection(e.target.value as CreativeTreatment);updateDraft({direction:e.target.value as CreativeTreatment});}} disabled={isLoading} className="mt-2 w-full rounded-lg border border-[#8b8680] bg-white px-3 py-3 font-normal"><option value="Auto">Auto — let AI choose</option>{CREATIVE_DIRECTIONS.map(tone=><option key={tone} value={tone}>{tone}</option>)}</select></label>
   </div>
   {error&&<div id="topic-error" role="alert" className="rounded-lg p-4 bg-amber-50 border border-amber-300 text-amber-950 text-sm"><div className="flex gap-2"><AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0"/><p>{error}</p></div>{!hasApiKey&&onOpenSettings&&<button type="button" onClick={onOpenSettings} className="mt-3 font-semibold underline underline-offset-4 min-h-8">Connect AI in settings</button>}</div>}
   <div className="border-t border-stone-200 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <p className="text-sm text-stone-600 max-w-sm">{canOpenSample?'You can edit this example storyboard after it opens. Auto uses the informative style for offline samples.':'You can edit every scene before saving or exporting.'}</p>
    <button type="submit" disabled={isLoading} className="min-h-12 shrink-0 px-5 py-3 bg-[#AF1E2A] hover:bg-[#8c1823] text-white rounded-lg font-semibold flex items-center justify-center gap-2">{isLoading?'Creating your storyboard…':canOpenSample?'Open sample storyboard':'Create storyboard'}<ArrowRight aria-hidden="true" className="w-4 h-4"/></button>
   </div>
  </form>
  {!hasApiKey&&onOpenSettings&&<p className="mt-5 text-sm text-stone-600">Ready to use your own ideas? <button onClick={onOpenSettings} className="font-semibold text-[#8c1618] underline underline-offset-4 min-h-9">Connect an AI provider</button></p>}
 </div>;
};
