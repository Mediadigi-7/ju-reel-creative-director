import type { ReelStoryboard } from '../../shared/types.js';
import { SIX_STAGE_CONTRACT, SIX_STAGE_ORDER, STAGE_LABELS } from '../../shared/narrativeStages.js';

/** Navigate actual production shots; never invent or pad missing saved scenes. */
export function NarrativeStages({reel}:{reel:ReelStoryboard}) {
  if(reel.narrativeContract!==SIX_STAGE_CONTRACT)return null;
  return <nav aria-label="Storytelling stages" className="my-5 border-y border-stone-200 py-3">
    <p className="mb-2 text-sm font-medium text-stone-800">Your story in six stages</p>
    <ol className="grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-6">
      {SIX_STAGE_ORDER.map((stage,index)=>{
        const shot=reel.shots.find(s=>s.type===stage);
        return <li key={stage}>{shot ? <a href={`#shot-${shot.number}`} className="flex min-h-11 items-center gap-2 rounded-md px-2 text-sm text-stone-700 hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-joy-red">
          <span className="text-stone-500 tabular-nums">{index+1}.</span>{' '}{STAGE_LABELS[stage]}
        </a> : <span className="block px-2 py-3 text-sm text-stone-600">{index+1}. {STAGE_LABELS[stage]} — missing</span>}</li>;
      })}
    </ol>
  </nav>;
}
