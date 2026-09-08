import { ReelStoryboard, ReelProject } from '../../shared/types.js';
import { validateAndRepairStoryboard } from '../../shared/schema.js';

export function encodeStoryboardForUrl(storyboard: ReelStoryboard): string {
  try {
    const minified = {
      t: storyboard.reelTitle,
      a: storyboard.creativeAngle,
      o: storyboard.objective,
      aud: storyboard.targetAudience,
      d: storyboard.duration,
      cd: storyboard.creativeDirection,
      lang: storyboard.language,
      s: storyboard.shots.map((shot) => ({
        n: shot.number,
        ty: shot.type,
        nm: shot.name,
        tm: shot.timestamp,
        v: shot.visual,
        d: shot.dialogue,
        tx: shot.onscreenText,
        c: shot.cameraPerformance,
      })),
      pn: storyboard.productionNotes,
      cs: storyboard.creativeSummary,
      vnum: storyboard.version,
    };

    const json = JSON.stringify(minified);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    return encodeURIComponent(base64);
  } catch (err) {
    console.error('Failed to encode storyboard for sharing:', err);
    const json = JSON.stringify(storyboard);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(json))));
  }
}

export function decodeStoryboardFromUrl(shareParam: string): ReelStoryboard | null {
  try {
    const rawBase64 = decodeURIComponent(shareParam);
    const jsonStr = decodeURIComponent(escape(atob(rawBase64)));
    const parsed = JSON.parse(jsonStr);

    if (parsed.t && parsed.s) {
      const full: any = {
        id: `shared_${Date.now()}`,
        reelTitle: parsed.t,
        creativeAngle: parsed.a,
        objective: parsed.o,
        targetAudience: parsed.aud,
        duration: parsed.d || '28 sec',
        format: '9:16 Vertical Reel',
        creativeDirection: parsed.cd || 'Student Relatable',
        language: parsed.lang || 'English',
        shots: parsed.s.map((shot: any) => ({
          number: shot.n,
          type: shot.ty,
          name: shot.nm,
          timestamp: shot.tm,
          visual: shot.v,
          dialogue: shot.d || '',
          onscreenText: shot.tx || '',
          cameraPerformance: shot.c,
        })),
        productionNotes: parsed.pn,
        creativeSummary: parsed.cs,
        status: 'Ready for Production',
        version: parsed.vnum || 1,
        tags: ['+2', 'shared', 'joy-university'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = validateAndRepairStoryboard(full, parsed.t);
      return result.data;
    }

    const result = validateAndRepairStoryboard(parsed, parsed.reelTitle || 'Shared Reel');
    return result.data;
  } catch (err) {
    console.error('Failed to decode shared storyboard from URL:', err);
    return null;
  }
}

export function getShareableUrl(storyboard: ReelStoryboard): string {
  const encoded = encodeStoryboardForUrl(storyboard);
  const origin = window.location.origin;
  return `${origin}/?share=${encoded}`;
}

export function encodeLibraryForUrl(projects: ReelProject[]): string {
  try {
    const cleanProjects = projects.map((p) => ({
      id: p.id,
      title: p.title,
      status: p.status,
      updatedAt: p.updatedAt,
      tags: p.tags,
      versions: p.versions,
    }));
    const json = JSON.stringify(cleanProjects);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    return encodeURIComponent(base64);
  } catch (err) {
    console.error('Failed to encode library:', err);
    return '';
  }
}

export function decodeLibraryFromUrl(libraryParam: string): ReelProject[] | null {
  try {
    const rawBase64 = decodeURIComponent(libraryParam);
    const jsonStr = decodeURIComponent(escape(atob(rawBase64)));
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return null;
  } catch (err) {
    console.error('Failed to decode shared library:', err);
    return null;
  }
}

export function getShareableLibraryUrl(projects?: ReelProject[]): string {
  const origin = window.location.origin;
  if (!projects || projects.length === 0) {
    return `${origin}/library`;
  }
  const encoded = encodeLibraryForUrl(projects);
  return `${origin}/library?data=${encoded}`;
}
