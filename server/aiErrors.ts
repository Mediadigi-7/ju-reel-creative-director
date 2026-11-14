import { AI_FAILURE_MESSAGES, aiFailureMessage, type AiProvider, type AiFailureCategory } from '../shared/providers.js';
export class AiProviderError extends Error {
  constructor(public category:AiFailureCategory, provider?:AiProvider){super(provider?aiFailureMessage(category,provider):AI_FAILURE_MESSAGES[category]);this.name='AiProviderError';}
}
export async function providerResponseError(response: Response, provider?:AiProvider): Promise<AiProviderError> {
  const data = await response.json().catch(()=>({}));
  // Inspect only to classify; never return or log raw provider error content.
  const code = String(data?.error?.code || data?.error?.status || '');
  const message = String(data?.error?.message || '');
  if(response.status===401) return new AiProviderError('authentication',provider);
  if(response.status===429) return new AiProviderError(/quota|billing|credit|resource_exhausted/i.test(code+' '+message)?'billing_quota':'rate_limit',provider);
  if(response.status===404 || /model_not_found|model.*not.*found/i.test(code+' '+message)) return new AiProviderError('model_access',provider);
  if(response.status===403) return new AiProviderError('permission',provider);
  if(response.status===408 || response.status===504) return new AiProviderError('timeout',provider);
  if(response.status>=500) return new AiProviderError('provider_unavailable',provider);
  return new AiProviderError('invalid_request',provider);
}
export function transportError(error:unknown): AiProviderError {
  if(error instanceof AiProviderError)return error;
  const name = error instanceof Error ? error.name : '';
  return new AiProviderError(name==='AbortError'||name==='TimeoutError'?'timeout':'network');
}
