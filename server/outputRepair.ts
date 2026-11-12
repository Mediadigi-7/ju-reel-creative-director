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

// A repair edits language, not story identity, visuals, or scene boundaries.
export function buildDialogueRepair(reel: ReelStoryboard, reason: string): string {
  const rate = reel.language === 'English' ? 2 : 9;
  const unit = reel.language === 'English' ? 'words' : 'graphemes';
  return `Repair the speech and captions of this reel. Return JSON only.
Original idea: ${reel.reelTitle}
${channelPrompt(reel.channel)}
Treatment: ${reel.creativeDirection}. Language: ${reel.language}. Duration: ${reel.duration}.
Problem: ${reason}
Selected concept: ${JSON.stringify(reel.conceptSelection?.selected || null)}
Existing HLNI proposal: ${JSON.stringify(reel.hlni || [])}
Preserve the actual high-leverage information, its qualifications and the way its payoff changes the viewer's understanding/action. Do not replace it with generic reassurance or familiar advice. Metadata alone is not delivery. Keep all references aligned with these unchanged scene numbers. Editorial approval will still require human verification.
Keep the same continuous story, factual qualifications, student situation, reveal, and any purposeful next action. Keep a CTA optional; never add one to a story that ends without it. Do not add career guarantees, institutional claims or a link/guide/DM service. Do not cut words mechanically; rewrite naturally for speech.
If comparing degrees without actual syllabuses, describe a practical comparison method. Do not assert that one degree is always narrow/deep and the other broad/strategic, or that either guarantees a particular career.
${reel.language === 'English' ? 'Use English.' : reel.language === 'Tanglish' ? 'Tanglish is allowed.' : `EVERY dialogue and caption must use native ${reel.language} script. Translate English words such as "vs", "Save", "Share", "syllabus" and "career". Only degree identifiers (B.Com, BBA, B.Tech, B.Sc, BCA, MBA), AI, ML, CSE, VLSI and Joy University may remain in Latin letters.`}
Scene budgets are deliberately below the hard delivery limit to leave room for pauses. Count before responding.
${JSON.stringify(reel.shots.map(s => ({ number: s.number, type: s.type, visual: s.visual, timestamp: s.timestamp,
  maximumDialogueUnits: Math.max(1, Math.floor((sceneSeconds(s.timestamp) || parseInt(reel.duration,10) / reel.shots.length) * rate)), unit,
  currentDialogueUnits: speechUnits(s.dialogue, reel.language), dialogue: s.dialogue, onscreenText: s.onscreenText })), null, 2)}
Return exactly {"shots":[{"number":1,"dialogue":"...","onscreenText":"..."}, ...all original numbered scenes...]}. Do not return any other fields.`;
}

export function applyDialogueRepair(reel: ReelStoryboard, patch: unknown): ReelStoryboard {
  const shots = (patch as { shots?: unknown[] })?.shots;
  if (!Array.isArray(shots) || shots.length !== reel.shots.length) throw new Error('Incomplete dialogue repair');
  return { ...reel, shots: reel.shots.map((shot, i) => {
    const edit = shots[i] as Record<string, unknown>;
    if (!edit || edit.number !== shot.number || typeof edit.dialogue !== 'string' || typeof edit.onscreenText !== 'string'
     ) throw new Error('Invalid dialogue repair');
    return { ...shot, dialogue: edit.dialogue, onscreenText: edit.onscreenText };
  }) };
}
