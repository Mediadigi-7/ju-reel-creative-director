import { CreativeTerritory } from './freshnessEngine.js';
import { getRecentCreativeMemory, CreativeDNA } from './creativeMemory.js';

export interface CollisionResult {
  collision: boolean;
  score: number; // 0 to 1
  collidedWith?: CreativeDNA;
  reason?: string;
}

export function detectAngleCollision(
  proposedTerritory: CreativeTerritory,
  topic: string,
  coreIdea: string
): CollisionResult {
  const memory = getRecentCreativeMemory();
  if (memory.length === 0) {
    return { collision: false, score: 0 };
  }

  const topicWords = extractKeyStemWords(topic);
  const angleWords = extractKeyStemWords(proposedTerritory.angle + ' ' + proposedTerritory.hookMechanism + ' ' + proposedTerritory.realityTrigger);

  for (const item of memory) {
    let similarityScore = 0;

    // Check angle similarity
    const memoryAngleWords = extractKeyStemWords(item.angle + ' ' + item.openingPattern);
    const angleOverlap = computeJaccardSimilarity(angleWords, memoryAngleWords);

    // Check structural similarity (same perspective + narrative + hook mechanism + visual device)
    let structuralMatch = 0;
    if (item.perspective.toLowerCase() === proposedTerritory.perspective.toLowerCase()) structuralMatch += 0.25;
    if (item.narrativeStructure.toLowerCase() === proposedTerritory.narrativeDevice.toLowerCase()) structuralMatch += 0.25;
    if (item.hookType.toLowerCase() === proposedTerritory.hookMechanism.toLowerCase()) structuralMatch += 0.25;
    if (item.visualDevice.toLowerCase() === proposedTerritory.visualDevice.toLowerCase()) structuralMatch += 0.25;

    // Weight structural identity higher: if structure + perspective + visual match identically, collision risk is high
    similarityScore = (angleOverlap * 0.4) + (structuralMatch * 0.6);

    if (similarityScore >= 0.65 || (structuralMatch >= 0.75 && angleOverlap > 0.25)) {
      return {
        collision: true,
        score: similarityScore,
        collidedWith: item,
        reason: `Creative territory collides substantially with previously generated Reel ID "${item.id}" (Topic: "${item.topic}"). Shared structure and angle pattern detected.`
      };
    }
  }

  return { collision: false, score: 0 };
}

function extractKeyStemWords(text: string): Set<string> {
  const stopWords = new Set(['the', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'of', 'and', 'or', 'is', 'are', 'was', 'were', 'your', 'you', 'how', 'what', 'why', 'with']);
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
  return new Set(words.filter(w => w.length > 2 && !stopWords.has(w)));
}

function computeJaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const elem of setA) {
    if (setB.has(elem)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}
