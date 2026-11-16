import { generateStoryboard } from './aiService.js';
import { AiProviderError } from './aiErrors.js';
import { AI_FAILURE_MESSAGES, aiFailureMessage, PROVIDER_MODELS, type AiProvider, type AiGenerationTestResult } from '../shared/providers.js';
export async function testAiGeneration(input:{provider?:unknown;apiKey?:unknown}, options:{signal?:AbortSignal}={}):Promise<AiGenerationTestResult> {
  const start=Date.now();
  const provider:AiProvider = input.provider==='gemini'?'gemini':'openai';
  const base = () => ({ provider,model:PROVIDER_MODELS[provider],checkedAt:new Date().toISOString(),elapsedMs:Date.now()-start });
  if(input.provider!=='openai'&&input.provider!=='gemini')return {...base(),success:false,category:'invalid_request',message:AI_FAILURE_MESSAGES.invalid_request};
  if(typeof input.apiKey!=='string'||!input.apiKey.trim())return {...base(),success:false,category:'missing_key',message:AI_FAILURE_MESSAGES.missing_key};
  try {
    const reel=await generateStoryboard({
      reelTitle:'How do I choose the right college?',channel:'Trust',creativeDirection:'Informative',language:'English',duration:'20 sec',
      apiKey:input.apiKey.trim(),apiProvider:provider,
    },{signal:options.signal,maxRepairs:0,timeoutMs:45000,maxOutputTokens:2048});
    if(reel.generation?.source!==provider || !reel.shots.length)throw new AiProviderError('invalid_response');
    return {...base(),success:true,shotCount:reel.shots.length,message:'Live generation and storyboard checks passed. No offline template was used.'};
  } catch(error) {
    const category = error instanceof AiProviderError ? error.category : 'invalid_response';
    return {...base(),success:false,category,message:aiFailureMessage(category,provider)};
  }
}
