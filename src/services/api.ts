import { OFFLINE_UNSUPPORTED, OFFLINE_CHANNEL_UNSUPPORTED } from '../../shared/offline/index.js';
import { GenerateReelRequest, RegenerateShotRequest, ReelStoryboard, Shot } from '../../shared/types.js';
import { AI_FAILURE_MESSAGES, type AiFailureCategory } from '../../shared/providers.js';

async function post<T>(path: string, body: unknown, signal?:AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),signal });
  } catch {
    if(signal?.aborted)throw new Error(AI_FAILURE_MESSAGES.cancelled);
    throw new Error('Cannot reach the generation server. No offline template was substituted. Please retry.');
  }
  let json;
  try { json = await res.json(); } catch {
    throw new Error('The generation server returned an invalid response. Please retry.');
  }
  if (json.code === 'INVALID_CHANNEL') throw new Error('Choose Trust, Connection, or Discovery.');
  if (json.code === 'OFFLINE_CHANNEL_UNSUPPORTED') throw new Error(OFFLINE_CHANNEL_UNSUPPORTED);
  if (json.code === 'OFFLINE_UNSUPPORTED') throw new Error(OFFLINE_UNSUPPORTED);
  if (json.code === 'AI_REQUIRED') throw new Error('Offline samples are fixed. Edit directly or connect AI to regenerate.');
  if(typeof json.code==='string' && Object.prototype.hasOwnProperty.call(AI_FAILURE_MESSAGES,json.code))throw new Error(AI_FAILURE_MESSAGES[json.code as AiFailureCategory]);
  if (!res.ok || !json.success || !json.data) {
    throw new Error('Generation failed. Check provider access, billing or quota, and retry. Your existing reel was preserved.');
  }
  return json.data;
}

export async function apiGenerateReel(req: GenerateReelRequest, signal?:AbortSignal): Promise<ReelStoryboard> {
  // Without a browser key the server may still have a provider credential.
  try {
    const reel = await post<ReelStoryboard>('/api/generate', req, signal);
    if (req.apiKey?.trim() && (!reel.generation || reel.generation.source === 'offline')) {
      throw new Error('Live generation was requested but the server did not confirm an AI source. Check the server deployment and retry.');
    }
    return reel;
  } catch (error) {
    throw error; // The server alone chooses explicit no-key offline mode; never mask a live failure.
  }
}

export async function apiRegenerateShot(req: RegenerateShotRequest, signal?:AbortSignal): Promise<Shot> {
  // Never replace a failed live edit with a template shot.
  return post<Shot>('/api/regenerate-shot', req,signal);
}

// This deliberately bypasses offline fallback and exercises the real server generation path.
export async function apiTestAiGeneration(provider: import('../../shared/providers.js').AiProvider, apiKey: string, signal?: AbortSignal): Promise<import('../../shared/providers.js').AiGenerationTestResult> {
  const { AI_FAILURE_MESSAGES, aiFailureMessage, PROVIDER_MODELS } = await import('../../shared/providers.js');
  const base = { provider, model:PROVIDER_MODELS[provider], checkedAt:new Date().toISOString(), elapsedMs:0 };
  if (!apiKey.trim()) return {...base,success:false,category:'missing_key',message:AI_FAILURE_MESSAGES.missing_key};
  try {
    const res = await fetch('/api/test-generation',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({provider,apiKey:apiKey.trim()}),signal:signal || AbortSignal.timeout(55000)});
    const json = await res.json();
    if (!json || typeof json !== 'object') throw new Error('Invalid generation-test response');
    if (json.provider !== provider || json.model !== PROVIDER_MODELS[provider] || typeof json.checkedAt !== 'string' || !Number.isFinite(json.elapsedMs)) throw new Error('Invalid generation-test response');
    if (res.ok && json.success === true && Number.isInteger(json.shotCount) && json.shotCount > 0) return {...base,success:true,shotCount:json.shotCount,checkedAt:json.checkedAt,elapsedMs:json.elapsedMs,message:'Live generation and storyboard checks passed. No offline template was used.'};
    const category = typeof json.category === 'string' && Object.prototype.hasOwnProperty.call(AI_FAILURE_MESSAGES,json.category) ? json.category as import('../../shared/providers.js').AiFailureCategory : 'invalid_response';
    return {...base,success:false,category,message:aiFailureMessage(category,provider),checkedAt:json.checkedAt,elapsedMs:json.elapsedMs};
  } catch(error) {
    const category = error instanceof SyntaxError ? 'invalid_response' : error instanceof Error && ['AbortError','TimeoutError'].includes(error.name) ? 'timeout' : error instanceof TypeError ? 'network' : 'invalid_response';
    return {...base,success:false,category,message:aiFailureMessage(category,provider)};
  }
}
