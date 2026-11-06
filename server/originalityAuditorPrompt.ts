import { ReelStoryboard } from '../shared/types.js';
import { ContentCore } from './aiService.js';
import { CreativeDNA } from './creativeMemory.js';

export interface OriginalityAuditReport {
  overallSimilarityScore: number; // 0.0 to 1.0
  isTemplateLike: boolean;
  isCollision: boolean; // true if score >= 0.75
  failedDimensions: string[];
  mostSimilarPrevious?: {
    topic: string;
    angle: string;
    similarityReason: string;
  };
  verdict: 'PASS' | 'SOFT_WARNING' | 'FAIL';
  repairInstruction: string;
}

export const ORIGINALITY_AUDITOR_SYSTEM_PROMPT = `
You are a strict Creative Originality Auditor for short-form video storyboards.

Your only job is to compare a NEW storyboard against PREVIOUS creative work and decide how similar or template-like it is.

==================================================
EVALUATION CRITERIA (Score each 0–10)
==================================================

1. Angle & Perspective Similarity
   - Same core insight, viewpoint, or narrative device?

2. Structural / Pattern Similarity
   - Same 6-beat emotional flow, sentence rhythms, or storytelling formula?

3. Hook Similarity
   - Does the opening use the same type of pattern interrupt, question style, or visual device?

4. Language & Phrasing Similarity
   - Repeated phrases, cliché constructions, or generic transitions?

5. Overall Template Feel
   - Does this feel like a lightly re-skinned version of a previous reel?

==================================================
OUTPUT FORMAT (JSON only)
==================================================

{
  "overallSimilarityScore": 0.0,
  "isTemplateLike": false,
  "isCollision": false,
  "failedDimensions": ["Angle", "Hook"],
  "mostSimilarPrevious": {
    "topic": "Previous Topic Name",
    "angle": "Previous Angle Description",
    "similarityReason": "Reason for similarity score"
  },
  "verdict": "PASS",
  "repairInstruction": "Clear, specific instruction on how to make this storyboard uniquely different while staying true to the locked core and selected territory."
}

==================================================
DECISION RULES
==================================================
- Score >= 0.85 -> FAIL (hard collision)
- Score 0.70–0.84 -> SOFT_WARNING (force noticeable shift)
- Score < 0.70 -> PASS

Be extremely strict. Generic educational or motivational patterns that could apply to many topics should be heavily penalized.
`;

export function buildOriginalityAuditorPrompt(
  storyboard: ReelStoryboard,
  lockedCore: ContentCore,
  previousDNA: CreativeDNA[]
): string {
  const shotsPayload = storyboard.shots.map(s => ({
    number: s.number,
    type: s.type,
    visual: s.visual,
    dialogue: s.dialogue,
    onscreenText: s.onscreenText
  }));

  const historyPayload = previousDNA.map(d => ({
    topic: d.topic,
    coreIdea: d.coreIdea,
    angle: d.angle,
    perspective: d.perspective,
    hookType: d.hookType,
    narrativeStructure: d.narrativeStructure,
    visualDevice: d.visualDevice,
    openingPattern: d.openingPattern
  }));

  return `
### NEW STORYBOARD
Title: ${storyboard.reelTitle}
Creative Angle: ${storyboard.creativeAngle}
Locked Core: ${JSON.stringify(lockedCore)}
Shots:
${JSON.stringify(shotsPayload, null, 2)}

### PREVIOUS CREATIVE DNA / HISTORY
${historyPayload.length > 0 ? JSON.stringify(historyPayload, null, 2) : "No previous history. Evaluate purely for internal template-like cliché patterns."}

Evaluate strictly according to the system prompt and return ONLY valid JSON.
`;
}
