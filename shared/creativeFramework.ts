import type { ReelStoryboard, Shot } from './types.js';
import { HLNI_CREATIVE_CONTRACT } from './hlni.js';

export const NARRATIVE_FUNCTIONS = ['HOOK','PROBLEM','PATTERN_INTERRUPT','VALUE','PAYOFF','CTA'] as const;
export const FLEXIBLE_CREATIVE_FRAMEWORK = `
FLEXIBLE 6 × 3 CREATIVE MATRIX — an ideation and diagnostic tool, not a checklist.
Narrative function | Trust | Connection | Discovery
Hook | Raise a question worth understanding | Introduce a relatable situation or emotion | Create curiosity, surprise or a challenge
Problem | Reveal a knowledge gap or misconception | Establish a personal dilemma or tension | Challenge an assumption or expectation
Pattern Interrupt | Introduce evidence that changes the perspective | Introduce a moment that shifts the conversation | Reveal an unexpected clue or contradiction
Value | Deliver verified facts, comparisons or methods | Offer a practical insight through human experience | Teach something through the challenge or reveal
Payoff | Help the viewer reach an informed conclusion | Resolve emotional or personal tension | Deliver a satisfying reveal with a meaningful takeaway
CTA | Encourage saving or exploring further | Encourage sharing or responding | Invite participation or a relevant next action

Story first, framework second: choose the strongest concept before arranging scenes.
Narrative functions are not individual shots. Combine functions, reorder them, repeat a useful function, and use as many shots as the story needs. No fixed shot count or equal timings.
A pattern interrupt is optional; use one only when it creates a meaningful change in attention or understanding.
Value and payoff are conceptually distinct: deliver both usefulness and resolution, even in the same exchange.
Use at most one purposeful next action when appropriate. Omit an engagement CTA if it weakens the ending. CTA suggestions in the matrix are possibilities, not required channel-specific actions.
Channel identity guides creativity, not style: Trust can entertain, Connection can educate, Discovery can be emotional. Treatment and sequence follow the topic, target student, channel objective, and strongest storytelling opportunity.
Success means narrative coherence, audience relevance, useful insight and a satisfying outcome. Do not measure success by the presence of six separate stages.
Production format stays: Shot / Timecode / Visual Action / Dialogue or Voiceover / Camera Direction / On-Screen Graphic.
${HLNI_CREATIVE_CONTRACT}
`;

export function hasFunction(shot: Shot, fn: typeof NARRATIVE_FUNCTIONS[number]): boolean {
  return shot.functions?.includes(fn) || shot.type === fn;
}
export function findCtaShot(reel: ReelStoryboard): Shot | undefined {
  return reel.shots.find(shot => hasFunction(shot,'CTA'));
}

// A conservative English check for explicit engagement requests. Absence is
// valid; this does not claim to establish CTA relevance or native-language intent.
export function ctaActionGroups(text: string): string[] {
  return [
    ['save',/\bsave\b/i], ['share',/\b(?:share|send)\b/i], ['comment',/\bcomment\b/i],
    ['follow',/\b(?:follow|subscribe)\b/i], ['apply',/\bapply\b/i],
    ['explore',/\b(?:explore|visit)\b/i], ['tag',/\btag\b/i], ['dm',/\bdm\b/i],
  ].filter(([,pattern])=>(pattern as RegExp).test(text)).map(([name])=>name as string);
}
