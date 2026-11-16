export type AiProvider = 'openai' | 'gemini' | 'groq';
// Stable Flash-Lite selected from the authenticated model list and verified with a successful low-latency generation request. Free-tier quota remains account-specific.
export const PROVIDER_MODELS: Record<AiProvider,string> = { openai:'gpt-4o-mini', gemini:'gemini-3.1-flash-lite', groq:'openai/gpt-oss-120b' };
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
  output_validation:'The AI draft could not be completed safely. Try again, or open a ready-made template. Your saved reels are unchanged.',
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
  validationIssue?:OutputValidationIssue;
}

export function aiFailureMessage(category:AiFailureCategory, provider:AiProvider):string {
  if(provider==='groq'&&(category==='rate_limit'||category==='billing_quota'))return 'Groq reports a free-tier rate or quota limit. Wait for the limit to reset and try again. Check Groq Console limits; no other provider was used.';
  if(provider==='gemini'&&category==='billing_quota') return 'Gemini free-tier quota is unavailable or exhausted. Check AI Studio limits or wait for quota reset. No paid provider was used.';
  if(provider==='gemini'&&category==='model_access') return 'The configured Gemini model is unavailable to this key or project. Check free-tier model availability in AI Studio.';
  return AI_FAILURE_MESSAGES[category];
}

export const OUTPUT_VALIDATION_MESSAGES={
 concept:'The AI draft could not form a complete story for this idea. Try a more specific topic, or open a ready-made template.',
 evidence:'The AI draft included a claim that could not be supported. Try again, or open a ready-made template.',
 structure:'The AI draft was missing required scenes or production details. Try again, or open a ready-made template.',
 topic:'The AI draft drifted away from your topic. Try again with a more specific idea, or open a ready-made template.',
 language:'The AI draft did not follow the selected language. Try again, or open a ready-made template.',
 timing:'The AI draft had dialogue that did not fit the scene timings. Try again, or open a ready-made template.',
 insight:'The AI draft did not deliver the planned insight clearly. Try again, or open a ready-made template.',
} as const;
export type OutputValidationIssue=keyof typeof OUTPUT_VALIDATION_MESSAGES;
export function outputValidationMessage(issue:unknown):string {
 return typeof issue==='string'&&Object.prototype.hasOwnProperty.call(OUTPUT_VALIDATION_MESSAGES,issue)?OUTPUT_VALIDATION_MESSAGES[issue as OutputValidationIssue]:AI_FAILURE_MESSAGES.output_validation;
}
export function outputIssueForGate(gate=''):OutputValidationIssue {
 if(/integrity|credibility/i.test(gate))return 'evidence';
 if(/pacing|timing/i.test(gate))return 'timing';
 if(/language/i.test(gate))return 'language';
 if(/fidelity|topic drift|entity persistence/i.test(gate))return 'topic';
 if(/insight|HLNI|concept delivery/i.test(gate))return 'insight';
 if(/production|structure|six.stage|schema|diagnostic/i.test(gate))return 'structure';
 return 'concept';
}

export const PROVIDER_NAMES: Record<AiProvider,string> = {gemini:'Google Gemini',openai:'OpenAI',groq:'Groq'};
export function inferProvider(key:string):AiProvider {
 return key.startsWith('gsk_')?'groq':key.startsWith('AIza')||key.startsWith('AQ.')?'gemini':'openai';
}
