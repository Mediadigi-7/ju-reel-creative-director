import { ReelStoryboard, Shot } from '../../shared/types.js';

export function formatStoryboardForWhatsApp(reel: ReelStoryboard): string {
  let text = `🎬 *JOY UNIVERSITY REEL STORYBOARD*\n`;
  text += `📌 *Title:* ${reel.reelTitle}\n`;
  text += `🎯 *Angle:* ${reel.creativeAngle}\n`;
  text += `⏱️ *Duration:* ${reel.duration} | 👥 *Audience:* ${reel.targetAudience}\n\n`;
  text += `────────────────────\n`;
  text += `*6-SHOT BREAKDOWN*\n`;
  text += `────────────────────\n\n`;

  reel.shots.forEach((shot) => {
    text += `*Shot ${shot.number}: ${shot.name.toUpperCase()}* (${shot.timestamp})\n`;
    text += `👁️ *Visual:* ${shot.visual}\n`;
    if (shot.dialogue) text += `🗣️ *VO/Dialogue:* ${shot.dialogue}\n`;
    if (shot.onscreenText) text += `💬 *On-Screen Text:* [${shot.onscreenText}]\n`;
    text += `🎥 *Camera:* ${shot.cameraPerformance}\n\n`;
  });

  text += `────────────────────\n`;
  text += `📋 *PRODUCTION BRIEF*\n`;
  text += `• *Style:* ${reel.productionNotes.visualStyle}\n`;
  text += `• *Locations:* ${reel.productionNotes.locations.join(', ')}\n`;
  text += `• *Props:* ${reel.productionNotes.props.join(', ')}\n`;
  text += `• *Complexity:* ${reel.productionNotes.complexity}\n`;
  text += `• *CTA:* ${reel.shots[5]?.onscreenText || reel.shots[5]?.dialogue}\n`;

  return text;
}

export function formatProductionBriefing(reel: ReelStoryboard): string {
  let text = `====================================================\n`;
  text += `JOY UNIVERSITY — PRODUCTION CALL SHEET & STORYBOARD\n`;
  text += `====================================================\n\n`;
  text += `PROJECT TITLE:   ${reel.reelTitle}\n`;
  text += `CREATIVE ANGLE:  ${reel.creativeAngle}\n`;
  text += `OBJECTIVE:       ${reel.objective}\n`;
  text += `TARGET AUDIENCE: ${reel.targetAudience}\n`;
  text += `FORMAT:          ${reel.format} (${reel.duration})\n`;
  text += `CREATIVE TONE:   ${reel.creativeDirection} (${reel.language})\n`;
  text += `DATE:            ${new Date(reel.updatedAt).toLocaleDateString()}\n\n`;

  text += `----------------------------------------------------\n`;
  text += `SHOT LIST (6 SEQUENTIAL SHOTS)\n`;
  text += `----------------------------------------------------\n\n`;

  reel.shots.forEach((shot) => {
    text += `[SHOT 0${shot.number} - ${shot.name.toUpperCase()}]  TIME: ${shot.timestamp}\n`;
    text += `VISUAL:              ${shot.visual}\n`;
    text += `DIALOGUE / VO:       ${shot.dialogue}\n`;
    text += `ON-SCREEN TEXT:      ${shot.onscreenText}\n`;
    text += `CAMERA & DIRECTING:  ${shot.cameraPerformance}\n\n`;
  });

  text += `----------------------------------------------------\n`;
  text += `PRODUCTION DIRECTION\n`;
  text += `----------------------------------------------------\n`;
  text += `Visual Style:  ${reel.productionNotes.visualStyle}\n`;
  text += `Performance:   ${reel.productionNotes.performance}\n`;
  text += `Camera Notes:  ${reel.productionNotes.camera}\n`;
  text += `Editing Notes: ${reel.productionNotes.editing}\n`;
  text += `Sound Design:  ${reel.productionNotes.sound}\n`;
  text += `Props:         ${reel.productionNotes.props.join(', ')}\n`;
  text += `Locations:     ${reel.productionNotes.locations.join(', ')}\n`;
  text += `Casting:       ${reel.productionNotes.casting}\n`;
  text += `Complexity:    ${reel.productionNotes.complexity}\n\n`;

  text += `----------------------------------------------------\n`;
  text += `SHOOTING PRIORITIES\n`;
  text += `----------------------------------------------------\n`;
  reel.creativeSummary.shootingPriority.forEach((p, idx) => {
    text += `${idx + 1}. ${p}\n`;
  });

  return text;
}

export function formatSingleShot(shot: Shot, reelTitle: string): string {
  let text = `🎬 [${reelTitle}] Shot 0${shot.number} - ${shot.name} (${shot.timestamp})\n\n`;
  text += `Visual: ${shot.visual}\n`;
  text += `Dialogue: ${shot.dialogue}\n`;
  text += `On-Screen Text: ${shot.onscreenText}\n`;
  text += `Camera: ${shot.cameraPerformance}\n`;
  return text;
}
