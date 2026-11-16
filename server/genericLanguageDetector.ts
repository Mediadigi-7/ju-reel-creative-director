import { ReelStoryboard } from '../shared/types.js';

export interface LanguageAuditResult {
  generic: boolean;
  flaggedPhrases: string[];
  interchangeable: boolean;
  reason?: string;
}

export const GENERIC_AI_PHRASES = [
  "in today's rapidly evolving world",
  "in today's fast-paced world",
  "the future is here",
  "unlock your potential",
  "are you ready to",
  "take the next step",
  "embark on your journey",
  "game-changing",
  "revolutionize",
  "don't miss this opportunity",
  "the world is changing",
  "3 things you need to know",
  "here's what nobody tells you",
  "stop scrolling",
  "did you know",
  "here's the secret",
  "this will change everything",
  "your journey starts here",
  "most people don't know"
];

export function normalizeScriptText(text: string): string {
  return text.normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'").replace(/[‐‑–—]/g, '-').replace(/\s+/g, ' ');
}

export function detectGenericLanguage(storyboard: ReelStoryboard): LanguageAuditResult {
  const flaggedPhrases: string[] = [];
  const fullScript = normalizeScriptText(storyboard.shots.map(s => s.dialogue + ' ' + s.onscreenText).join(' '));

  for (const phrase of GENERIC_AI_PHRASES) {
    if (fullScript.includes(phrase)) {
      flaggedPhrases.push(phrase);
    }
  }

  // Check competitor interchangeability test:
  // If we remove "Joy University" or specific degree names, does the script contain ONLY generic educational filler like "top faculty", "great placements", "modern campus"?
  const strippedScript = fullScript
    .replace(/joy university/g, '')
    .replace(/joy/g, '');

  const genericEduBuzzwords = ['world-class education', 'top placements', 'bright future', 'holistic development', 'state of the art campus'];
  let buzzwordHits = 0;
  for (const word of genericEduBuzzwords) {
    if (strippedScript.includes(word)) buzzwordHits++;
  }

  const interchangeable = buzzwordHits >= 2 || (flaggedPhrases.length >= 2);

  return {
    generic: flaggedPhrases.length > 0,
    flaggedPhrases,
    interchangeable,
    reason: interchangeable
      ? `Script contains generic AI or interchangeable university marketing phrasing: ${[...flaggedPhrases].join(', ')}`
      : undefined
  };
}
