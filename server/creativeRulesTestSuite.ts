import { installConceptPlanningMocks } from './conceptPlannerTestFixtures.js';
import { withHlniTestProposal } from './hlniTestFixture.js';
import assert from 'node:assert/strict';
import { generateStoryboard, extractContentCore, runMultiGateQA, SYSTEM_PROMPT } from './aiService.js';
import { generateKnowledgeEngineStoryboard } from './knowledgeEngine.js';
import { detectGenericLanguage } from './genericLanguageDetector.js';

const originalFetch = globalThis.fetch;
const restorePlanningMocks=installConceptPlanningMocks();
const seed = withHlniTestProposal(generateKnowledgeEngineStoryboard('AI will change these careers'));
const core = extractContentCore('AI will change these careers');
assert.equal(runMultiGateQA(seed, core, 'English', 'Informative').pass, true);
const broken = structuredClone(seed);
broken.shots[0].visual = '';
assert.match(runMultiGateQA(broken, core, 'English', 'Informative').failedGate!, /1 & 2/);
assert.deepEqual(extractContentCore('B.Com vs BBA').entities, ['B.Com', 'BBA']);
const cliche = structuredClone(seed);
cliche.shots[0].dialogue = 'Here’s the secret... AI careers.';
assert.equal(detectGenericLanguage(cliche).generic, true);
assert.match(runMultiGateQA(cliche, core, 'English', 'Informative').failedGate!, /Gate 6/);
assert.ok(SYSTEM_PROMPT.includes('Narrative functions are not individual shots'));
assert.ok(SYSTEM_PROMPT.includes('CTA is not a failure'));
assert.ok(SYSTEM_PROMPT.includes('Value and payoff are conceptually distinct'));

try {
  for (const apiProvider of ['openai', 'gemini'] as const) {
    let requests = 0;
    globalThis.fetch = async (_input, init) => {
      requests++;
      const body = JSON.parse(init!.body as string);
      const prompt = apiProvider === 'gemini' ? body.contents[0].parts[0].text : body.messages[1].content;
      if (requests > 1) {
        assert.match(prompt, /FAILED GATE/);
        assert.match(prompt, /PREVIOUS CANDIDATE/);
      }
      const content = JSON.stringify(requests === 1 ? cliche : seed);
      return new Response(JSON.stringify(apiProvider === 'gemini'
        ? { candidates: [{ content: { parts: [{ text: content }] } }] }
        : { choices: [{ message: { content } }] }), { status: 200 });
    };
    const result = await generateStoryboard({ reelTitle: 'AI will change these careers', apiProvider, apiKey: 'test-only-key' });
    assert.equal(requests, 2, `${apiProvider} must repair failed QA`);
    assert.equal(detectGenericLanguage(result).generic, false);
    assert.equal(result.shots.length, 6);
    assert.equal(result.generation?.source, apiProvider);
    assert.ok(result.generation?.generatedAt);
    console.log(`PASS: ${apiProvider} repairs and rechecks rejected output`);
  }
  let requests = 0;
  globalThis.fetch = async () => {
    requests++;
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(cliche) } }] }));
  };
  await assert.rejects(generateStoryboard({ reelTitle: 'AI will change these careers', apiProvider: 'openai', apiKey: 'test-only-key' }), /did not pass the output checks/);
  assert.equal(requests, 3, 'initial generation plus at most two repairs');
  console.log('PASS: persistent QA failure rejects without template substitution');
} finally {
  globalThis.fetch = originalFetch;restorePlanningMocks();
}
console.log('PASS: flexible narrative functions, production fields, comparison entities, typographic cliché detection');
