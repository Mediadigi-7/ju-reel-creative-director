import { GenerateReelRequest, RegenerateShotRequest, ReelStoryboard, Shot } from '../../shared/types.js';
import { generateKnowledgeEngineStoryboard } from '../../server/knowledgeEngine.js';

export async function apiGenerateReel(req: GenerateReelRequest): Promise<ReelStoryboard> {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[Frontend API] Express server fetch failed, using local Creative Knowledge Engine fallback:', err);
  }

  // Seamless client-side fallback if server is offline
  return generateKnowledgeEngineStoryboard(
    req.reelTitle,
    req.creativeDirection || 'Student Relatable',
    req.language || 'English',
    req.duration || '28 sec',
    1
  );
}

export async function apiRegenerateShot(req: RegenerateShotRequest): Promise<Shot> {
  try {
    const res = await fetch('/api/regenerate-shot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn('[Frontend API] Express server fetch failed for shot regeneration:', err);
  }

  // Client-side shot variation fallback
  const freshReel = generateKnowledgeEngineStoryboard(
    req.reelTitle,
    req.currentStoryboard.creativeDirection as any,
    req.currentStoryboard.language,
    req.currentStoryboard.duration,
    Math.floor(Math.random() * 1000)
  );
  const shot = freshReel.shots.find((s) => s.number === req.shotNumber);
  if (shot) {
    const existing = req.currentStoryboard.shots.find((s) => s.number === req.shotNumber);
    shot.timestamp = existing?.timestamp || shot.timestamp;
    return shot;
  }

  return {
    number: req.shotNumber,
    type: req.shotType,
    name: req.shotType,
    timestamp: '00:00 – 00:04',
    visual: `Fresh shot angle highlighting the ${req.shotType.toLowerCase()} beat on Joy University campus.`,
    dialogue: `Refreshed line for "${req.reelTitle}".`,
    onscreenText: 'FRESH INSIGHT',
    cameraPerformance: 'Handheld medium close-up, dynamic eye-level framing.',
    userEdited: false,
  };
}
