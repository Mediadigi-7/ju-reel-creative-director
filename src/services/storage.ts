import { ReelProject, ReelStoryboard } from '../../shared/types.js';

const STORAGE_KEY_CURRENT = 'joy_reel_current_storyboard';
const STORAGE_KEY_PROJECTS = 'joy_reel_saved_projects';
const STORAGE_KEY_API_SETTINGS = 'joy_reel_api_settings';

export interface ApiSettings {
  apiKey?: string;
  apiProvider?: 'gemini' | 'openai';
  isVerified?: boolean;
  lastTestedProvider?: 'gemini' | 'openai';
}

// Autosave current storyboard
export function saveCurrentStoryboard(storyboard: ReelStoryboard | null): void {
  if (!storyboard) {
    localStorage.removeItem(STORAGE_KEY_CURRENT);
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(storyboard));
  } catch (err) {
    console.error('Failed to autosave storyboard:', err);
  }
}

export function loadCurrentStoryboard(): ReelStoryboard | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load current storyboard:', err);
    return null;
  }
}

// Projects Library
export function loadSavedProjects(): ReelProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load saved projects:', err);
    return [];
  }
}

export function saveProjectToLibrary(storyboard: ReelStoryboard): ReelProject[] {
  const projects = loadSavedProjects();
  const existingProjectIndex = projects.findIndex(
    (p) => p.title.toLowerCase() === storyboard.reelTitle.toLowerCase() || p.id === storyboard.id
  );

  const now = new Date().toISOString();

  if (existingProjectIndex >= 0) {
    const project = projects[existingProjectIndex];
    // Check if this version already exists
    const versionIdx = project.versions.findIndex((v) => v.version === storyboard.version);
    if (versionIdx >= 0) {
      project.versions[versionIdx] = storyboard;
    } else {
      project.versions.push(storyboard);
    }
    project.currentVersionId = storyboard.id;
    project.updatedAt = now;
    project.status = storyboard.status;
    projects[existingProjectIndex] = project;
  } else {
    const newProject: ReelProject = {
      id: storyboard.id,
      title: storyboard.reelTitle,
      currentVersionId: storyboard.id,
      createdAt: now,
      updatedAt: now,
      status: storyboard.status,
      tags: storyboard.tags,
      versions: [storyboard],
    };
    projects.unshift(newProject);
  }

  try {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save project:', err);
  }

  return projects;
}

export function deleteProjectFromLibrary(projectId: string): ReelProject[] {
  const projects = loadSavedProjects().filter((p) => p.id !== projectId);
  try {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to delete project:', err);
  }
  return projects;
}

// API Settings
export function loadApiSettings(): ApiSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_API_SETTINGS);
    if (!raw) return { apiProvider: 'gemini', isVerified: false };
    const parsed = JSON.parse(raw);
    return {
      apiProvider: parsed.apiProvider || 'gemini',
      apiKey: parsed.apiKey || '',
      isVerified: parsed.isVerified ?? false,
      lastTestedProvider: parsed.lastTestedProvider,
    };
  } catch {
    return { apiProvider: 'gemini', isVerified: false };
  }
}

export function saveApiSettings(settings: ApiSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY_API_SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save API settings:', err);
  }
}
