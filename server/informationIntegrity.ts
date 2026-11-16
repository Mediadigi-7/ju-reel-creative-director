import type { ReelStoryboard } from '../shared/types.js';
// Targeted regression guard, not a general factual or semantic verifier.
export function informationIntegrityIssues(reel:ReelStoryboard):string[]{
 if(reel.language!=='English')return [];
 const text=reel.shots.map(s=>[s.dialogue,s.onscreenText,s.visual].join(' ')).join(' ').replace(/B\.\s*Com/gi,'BCom');
 const sentences=text.split(/(?<=[.!?])\s+/);
 const degree='(?:BCom|BBA|engineering|B\\.?Tech)';
 const fit=new RegExp(`\\b(?:lean(?:s|ing)?\\s+(?:towards?|to)|suited\\s+(?:to|for)|(?:natural|perfect|better)\\s+fit\\s+for|meant\\s+for|should\\s+(?:choose|pick))\\s+${degree}\\b`,'i');
 for(const sentence of sentences){
  const match=fit.exec(sentence);if(!match)continue;
  const preceding=sentence.slice(Math.max(0,match.index-85),match.index);
  if(/\b(?:not|never|cannot|can't|doesn't|don't|does not|do not|isn't|is not)\b/i.test(preceding)||sentence.trim().endsWith('?'))continue;
  return ['Unsupported degree-fit inference: a brief task or preference must not recommend or classify a student into a degree. Show a recorded observation and a relevant investigation step instead.'];
 }
 return [];
}
