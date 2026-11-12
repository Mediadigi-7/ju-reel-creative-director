import React, { useEffect, useState } from 'react';
import type { ReelStoryboard } from '../../shared/types.js';
import { HLNI_CHECKS, approveEditorialReview, editorialSnapshot, hlniIssues, isEditoriallyApproved,
  type HlniCandidate, type HlniChecks } from '../../shared/hlni.js';

const empty=():HlniCandidate=>({insight:'',audienceGap:'',viewerChange:'',supportType:'method',support:'',references:[],shotNumbers:[],payoffShotNumbers:[],payoff:''});
const unchecked=():HlniChecks=>({newInformation:false,highLeverage:false,supported:false,integrated:false,paysOff:false});
export function HlniReviewCard({reel,onUpdate}:{reel:ReelStoryboard;onUpdate:(fields:Partial<ReelStoryboard>)=>void}) {
  const [index,setIndex]=useState(0);
  const [draft,setDraft]=useState<HlniCandidate>(reel.hlni?.[0]||empty());
  const [shotInput,setShotInput]=useState((reel.hlni?.[0]?.shotNumbers||[]).join(', '));
  const [payoffInput,setPayoffInput]=useState((reel.hlni?.[0]?.payoffShotNumbers||[]).join(', '));
  const [checks,setChecks]=useState<HlniChecks>(unchecked);
  const [error,setError]=useState('');
  const snapshot=editorialSnapshot(reel);
  const approved=isEditoriallyApproved(reel);
  function loadDraft(candidate:HlniCandidate){setDraft(candidate);setShotInput(candidate.shotNumbers.join(', '));setPayoffInput(candidate.payoffShotNumbers.join(', '));}
  useEffect(()=>{setIndex(0);loadDraft(reel.hlni?.[0]||empty());setChecks(approved?{...reel.editorialReview!.checks}:unchecked());setError('');},[reel.id,snapshot,approved]);
  const dirty=JSON.stringify(draft)!==JSON.stringify(reel.hlni?.[index]||empty());
  const changed={...reel,hlni:[draft]};
  const issues=hlniIssues(draft,changed);
  const canApprove=issues.length===0 && Object.values(checks).every(Boolean);
  function update(fields:Partial<HlniCandidate>){setDraft({...draft,...fields});setChecks(unchecked());setError('');}
  const inputClass='mt-1 w-full rounded-lg border border-stone-300 bg-white p-2 text-sm text-stone-800';
  function approve(){try{onUpdate(approveEditorialReview(changed,checks));}catch(e){setError(e instanceof Error?e.message:'Complete the editorial review.');}}
  return <details className="mb-5 rounded-xl border border-stone-200 bg-white p-4" data-testid="hlni-review">
    <summary className="cursor-pointer text-sm font-semibold text-stone-800">{approved&&!dirty?'HLNI editorial review approved':'HLNI editorial review required'}
      <span className="ml-2 font-normal text-stone-500">What will the viewer learn or do differently?</span>
    </summary>
    <div className="mt-4 space-y-4">
      <p className="text-sm text-stone-600">Approve at least one credible, non-obvious insight delivered by the actual story. Generic advice or reassurance alone does not qualify. These are editorial notes, not another scene.</p>
      {reel.hlni && reel.hlni.length>1 && <label className="block text-sm">Proposed insight<select className={inputClass} value={index} onChange={e=>{const n=+e.target.value;setIndex(n);loadDraft(reel.hlni![n]);setChecks(unchecked());}}>{reel.hlni.map((h,i)=><option key={i} value={i}>{i+1}. {h.insight}</option>)}</select></label>}
      <label className="block text-sm">The high-leverage new information<textarea aria-label="HLNI insight" className={inputClass} value={draft.insight} onChange={e=>update({insight:e.target.value})}/></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">What does this audience not know or assume?<textarea className={inputClass} value={draft.audienceGap} onChange={e=>update({audienceGap:e.target.value})}/></label>
        <label className="block text-sm">What decision, understanding or action changes?<textarea className={inputClass} value={draft.viewerChange} onChange={e=>update({viewerChange:e.target.value})}/></label>
      </div>
      <label className="block text-sm">Type of support<select className={inputClass} value={draft.supportType} onChange={e=>update({supportType:e.target.value as HlniCandidate['supportType']})}><option value="method">Practical method</option><option value="fact">Verifiable fact</option><option value="perspective">Reasoned perspective</option></select></label>
      <label className="block text-sm">Why is it credible? Include reasoning, evidence and qualifications.<textarea className={inputClass} value={draft.support} onChange={e=>update({support:e.target.value})}/></label>
      <label className="block text-sm">References to check{draft.supportType==='fact'?' (required for factual claims)':' (if applicable)'}<textarea className={inputClass} value={(draft.references||[]).join('\n')} onChange={e=>update({references:e.target.value.split('\n').filter(Boolean)})}/></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">Insight appears in shot(s)<input aria-label="HLNI shot numbers" className={inputClass} placeholder="e.g. 1, 3" value={shotInput} onChange={e=>{setShotInput(e.target.value);update({shotNumbers:e.target.value.split(',').filter(x=>x.trim()).map(Number)});}}/></label>
        <label className="block text-sm">Payoff appears in shot(s)<input className={inputClass} placeholder="Can be the same shot" value={payoffInput} onChange={e=>{setPayoffInput(e.target.value);update({payoffShotNumbers:e.target.value.split(',').filter(x=>x.trim()).map(Number)});}}/></label>
      </div>
      <label className="block text-sm">How does the story show why the insight matters?<textarea className={inputClass} value={draft.payoff} onChange={e=>update({payoff:e.target.value})}/></label>
      <fieldset className="space-y-2 border-t border-stone-100 pt-3"><legend className="text-sm font-semibold">Editorial verification — confirm each check after reviewing the shots</legend>
        {Object.entries(HLNI_CHECKS).map(([key,label])=><label key={key} className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" checked={checks[key as keyof HlniChecks]} onChange={e=>{setChecks({...checks,[key]:e.target.checked});if(approved&&!e.target.checked)onUpdate({editorialReview:undefined,status:reel.status==='Ready for Production'?'Draft':reel.status});}}/>{label}</label>)}
      </fieldset>
      <p className="text-xs text-stone-500">AI proposals and supplied references are unverified until you check them. This records your editorial confirmation. Story or insight changes require a fresh review. You can save or export a draft without approving it.</p>
      {issues.length>0 && <p className="text-xs text-amber-800">Before approval: {issues.join(' ')}</p>}
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <div className="flex flex-wrap gap-3">
        <button type="button" className="rounded-lg border border-stone-300 px-3 py-2 text-sm" onClick={()=>onUpdate({hlni:[draft],editorialReview:undefined,status:reel.status==='Ready for Production'?'Draft':reel.status})}>Save insight notes</button>
        <button type="button" disabled={!canApprove} onClick={approve} className="rounded-lg bg-[#AF1E2A] px-3 py-2 text-sm font-semibold text-white disabled:opacity-40">Approve creative quality</button>
      </div>
    </div>
  </details>;
}
