import {SIX_STAGE_CONTRACT,SIX_STAGE_WRITING_CONTRACT} from '../shared/narrativeStages.js';
import type { ReelStoryboard } from '../shared/types.js';
import { channelPrompt } from '../shared/channels.js';

// Only normalize a complete degree-comparison label. A slash preserves the
// comparison without inventing a translation or changing any spoken prose.
export function normalizeComparisonCaptions(reel: ReelStoryboard): ReelStoryboard {
  if (!['Tamil','Telugu','Malayalam','Hindi'].includes(reel.language)) return reel;
  const degree = '(?:B\\.?\\s*Com|BBA|B\\.?\\s*Tech|B\\.?\\s*Sc|BCA|MBA)';
  const label = new RegExp(`^\\s*(${degree})\\s+(?:vs\\.?|versus)\\s+(${degree})([?!]?)\\s*$`,'i');
  return { ...reel, shots:reel.shots.map(shot=>({ ...shot, onscreenText:shot.onscreenText.replace(label,'$1 / $2$3') })) };
}

export function speechUnits(text: string, language: string): number {
  if (!text.trim()) return 0;
  return language === 'English' ? text.trim().split(/\s+/).length
    : [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)].length;
}

export function sceneSeconds(timestamp: string): number {
  const times = [...timestamp.matchAll(/(\d+):(\d{2})/g)].map(m => +m[1] * 60 + +m[2]);
  return times.length === 2 ? Math.max(0, times[1] - times[0]) : 0;
}

// These are conservative text proxies, not measured audio durations. Keep the
// writer and repair prompts aligned with the validator's existing hard limits.
export function dialogueBudget(language: string, seconds: number) {
  const duration = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const english = language === 'English';
  return { unit: english ? 'words' : 'graphemes',
    target: Math.floor(duration * (english ? 2 : 9)),
    totalMaximum: Math.floor(duration * (english ? 2.5 : 12)),
    sceneMaximum: Math.floor(duration * (english ? 3 : 12)) };
}

export function dialogueTimingInstruction(language: string, duration: string): string {
  const budget = dialogueBudget(language, parseInt(duration, 10) || 28);
  return `For ${language}, aim for at most ${budget.target} spoken ${budget.unit} total; the hard total maximum is ${budget.totalMaximum} ${budget.unit}. Before drafting each scene, reserve time for actions, reactions and pauses and budget its dialogue at ${language === 'English' ? 'two words' : 'nine graphemes'} per second or less. Count native-script grapheme clusters, not English words or Unicode code points. These counts are approximate speaking-time checks, not proof of natural delivery. Do not read the whole graphic aloud. Shorten dialogue rather than extending the requested duration or deleting the insight, qualifications, payoff or required stages.`;
}

// A repair edits language, not story identity, visuals, or scene boundaries.
export function buildDialogueRepair(reel: ReelStoryboard, reason: string): string {
  const totalBudget = dialogueBudget(reel.language, parseInt(reel.duration,10));
  return `Repair the speech and captions of this reel. Return JSON only.
Original idea: ${reel.reelTitle}
${channelPrompt(reel.channel)}
Treatment: ${reel.creativeDirection}. Language: ${reel.language}. Duration: ${reel.duration}.
Problem: ${reason}
Selected concept: ${JSON.stringify(reel.conceptSelection?.selected || null)}
Existing HLNI proposal: ${JSON.stringify(reel.hlni || [])}
Preserve the actual high-leverage information, its qualifications and the way its payoff changes the viewer's understanding/action. Do not replace it with generic reassurance or familiar advice. Metadata alone is not delivery. Keep all references aligned with these unchanged scene numbers. Editorial approval will still require human verification.
Keep the same continuous story, factual qualifications, student situation, reveal, and any purposeful next action. ${reel.narrativeContract===SIX_STAGE_CONTRACT?'Preserve all six ordered stages and the one final CTA.': 'Keep a CTA optional; never add one to a story that ends without it.'} Do not add career guarantees, institutional claims or a link/guide/DM service. Do not cut words mechanically; rewrite naturally for speech.
If comparing degrees without actual syllabuses, describe a practical comparison method. Do not assert that one degree is always narrow/deep and the other broad/strategic, or that either guarantees a particular career.
${reel.language === 'English' ? 'Use English.' : reel.language === 'Tanglish' ? 'Tanglish is allowed.' : `EVERY dialogue and caption must use native ${reel.language} script. Translate English words such as "vs", "Save", "Share", "syllabus" and "career". Only degree identifiers (B.Com, BBA, B.Tech, B.Sc, BCA, MBA), AI, ML, CSE, VLSI and Joy University may remain in Latin letters.`}
${reel.conceptSelection?.deliveryPolicy==='evidence-and-action-v1'?'Preserve the exact supplied course-title evidence and the student’s action correction. Paraphrase research questions naturally for speech; planning wording is not mandatory.':'Preserve the selected visibleInput and nextQuestion verbatim in their existing on-screen graphics when they are already there; shorten speech instead of shortening these protected examples/questions.'}
${dialogueTimingInstruction(reel.language,reel.duration)}
The repair must fit BOTH each scene's maximumDialogueUnits AND a total of at most ${totalBudget.target} ${totalBudget.unit} across all scenes. A short scene cannot borrow time from a later scene. Preserve lines already within budget when possible. Rewrite overlong lines naturally; never truncate words. Count before responding.
${JSON.stringify(reel.shots.map(s => ({ number: s.number, type: s.type, visual: s.visual, timestamp: s.timestamp,
  maximumDialogueUnits: dialogueBudget(reel.language, sceneSeconds(s.timestamp) || parseInt(reel.duration,10) / reel.shots.length).target, unit:totalBudget.unit,
  currentDialogueUnits: speechUnits(s.dialogue, reel.language), dialogue: s.dialogue, onscreenText: s.onscreenText })), null, 2)}
Return exactly {"shots":[{"number":1,"dialogue":"...","onscreenText":"..."}, ...all original numbered scenes...]}. Do not return any other fields.`;
}

export function applyDialogueRepair(reel: ReelStoryboard, patch: unknown): ReelStoryboard {
  const shots = (patch as { shots?: unknown[] })?.shots;
  if (!Array.isArray(shots) || shots.length !== reel.shots.length) throw new Error('Incomplete dialogue repair');
  const repaired = { ...reel, shots: reel.shots.map((shot, i) => {
    const edit = shots[i] as Record<string, unknown>;
    if (!edit || edit.number !== shot.number || typeof edit.dialogue !== 'string' || typeof edit.onscreenText !== 'string'
     ) throw new Error('Invalid dialogue repair');
    return { ...shot, dialogue: edit.dialogue, onscreenText: edit.onscreenText };
  }) };
  // Speech compression must not erase already-visible concept evidence. Restore
  // only original graphics, never invent a new claim or add words to speech.
  if(reel.language==='English'){
    const normalize=(text:string)=>text.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    const demo=reel.conceptSelection?.selected.demonstration;
    for(const anchor of [demo?.visibleInput,...(reel.conceptSelection?.deliveryPolicy==='evidence-and-action-v1'?[]:[demo?.nextQuestion])]){
      if(!anchor)continue;
      const target=normalize(anchor);
      const actual=normalize(repaired.shots.map(s=>s.dialogue+' '+s.onscreenText+' '+s.visual).join(' '));
      if(actual.includes(target))continue;
      const sourceIndex=reel.shots.findIndex(s=>normalize(s.onscreenText).includes(target));
      if(sourceIndex>=0)repaired.shots[sourceIndex].onscreenText=reel.shots[sourceIndex].onscreenText;
    }
  }
  return repaired;
}
