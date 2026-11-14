export type AiProvider = 'openai' | 'gemini';
// Stable Flash-Lite selected from the authenticated model list and verified with a successful low-latency generation request. Free-tier quota remains account-specific.
export const PROVIDER_MODELS: Record<AiProvider,string> = { openai:'gpt-4o-mini', gemini:'gemini-3.1-flash-lite' };
export type AiFailureCategory = 'cancelled' | 'missing_key' | 'invalid_request' | 'authentication' | 'billing_quota' | 'rate_limit' | 'model_access' | 'permission' | 'network' | 'timeout' | 'provider_unavailable' | 'invalid_response' | 'output_validation';
export const AI_FAILURE_MESSAGES: Record<AiFailureCategory,string> = {
  cancelled:'Generation was cancelled. Your existing reel was preserved.',
  missing_key:'Enter your API key before testing generation.',
  invalid_request:'Check the provider selection and request settings.',
  authentication:'The provider rejected this key. Check the key and selected provider.',
  billing_quota:'The provider reports a billing or quota problem. Check your API account credits and limits.',
  rate_limit:'The provider is rate limiting requests. Wait briefly and try again.',
  model_access:'The configured model is unavailable or not accessible to this account.',
  permission:'The provider denied this account access. Check project permissions and model access.',
  network:'The generation server could not reach the provider. Check its network access.',
  timeout:'The provider did not finish within the test time limit. Try again.',
  provider_unavailable:'The provider is temporarily unavailable. Try again later.',
  invalid_response:'The provider returned an unexpected response rather than usable generation data.',
  output_validation:'The provider responded, but its storyboard did not pass the output checks. No template was substituted.',
};
export interface AiGenerationTestResult {
  success:boolean;
  provider:AiProvider;
  model:string;
  checkedAt:string;
  elapsedMs:number;
  category?:AiFailureCategory;
  message:string;
  shotCount?:number;
}

export function aiFailureMessage(category:AiFailureCategory, provider:AiProvider):string {
  if(provider==='gemini'&&category==='billing_quota') return 'Gemini free-tier quota is unavailable or exhausted. Check AI Studio limits or wait for quota reset. No paid provider was used.';
  if(provider==='gemini'&&category==='model_access') return 'The configured Gemini model is unavailable to this key or project. Check free-tier model availability in AI Studio.';
  return AI_FAILURE_MESSAGES[category];
}
