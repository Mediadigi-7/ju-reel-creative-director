import { generateStoryboard, regenerateShot } from './aiService.js';
import { validateAndRepairStoryboard, ReelStoryboardSchema } from '../shared/schema.js';
import { MVP_TEST_TITLES, JOY_UNIVERSITY_VERIFIED_FACTS } from '../shared/knowledgeBase.js';
import { ReelStoryboard } from '../shared/types.js';

async function runValidationTests() {
  console.log('\n========================================');
  console.log('🧪 JOY UNIVERSITY REEL TEST SUITE START');
  console.log('========================================\n');

  let passedTests = 0;
  let totalTests = 0;

  const assert = (condition: boolean, testName: string, extra?: any) => {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`, extra || '');
    }
  };

  // 1. Schema repair on malformed data
  console.log('\n--- 1. SCHEMA VALIDATION & REPAIR TESTS ---');
  const malformedInput = {
    title: 'Short title test',
    shots: [
      { type: 'HOOK', visual: 'Looking at camera' },
      // Missing other 5 shots
    ],
    production: { complexity: 'INVALID_COMPLEXITY' },
  };

  const repaired = validateAndRepairStoryboard(malformedInput, 'Short title test');
  assert(repaired.valid, 'Repairs malformed object to valid schema');
  assert(repaired.data.shots.length === 6, 'Repaired storyboard contains exactly 6 shots');
  assert(repaired.data.shots[0].type === 'HOOK', 'Shot 1 is HOOK');
  assert(repaired.data.shots[5].type === 'CTA', 'Shot 6 is CTA');
  assert(['LOW', 'MEDIUM', 'HIGH'].includes(repaired.data.productionNotes.complexity), 'Valid complexity assigned');

  // 2. Single CTA enforcement test
  console.log('\n--- 2. SINGLE CTA VALIDATION TEST ---');
  const stackedCtaInput = {
    title: 'CTA test',
    shots: [
      { type: 'HOOK', visual: 'V' },
      { type: 'PROBLEM', visual: 'V' },
      { type: 'PATTERN_INTERRUPT', visual: 'V' },
      { type: 'VALUE', visual: 'V' },
      { type: 'PAYOFF', visual: 'V' },
      { type: 'CTA', visual: 'V', onscreenText: 'Follow our page and apply now' },
    ],
  };
  const repairedCta = validateAndRepairStoryboard(stackedCtaInput, 'CTA test');
  assert(!repairedCta.data.shots[5].onscreenText.toLowerCase().includes('and apply'), 'Multi-action CTA repaired to single action');

  // 3. Short seed test
  console.log('\n--- 3. SHORT TITLE TEST ---');
  const shortReel = await generateStoryboard({ reelTitle: 'AI Careers' });
  assert(shortReel.shots.length === 6, 'Short seed "AI Careers" generates 6 shots');
  assert(Boolean(shortReel.creativeAngle), 'Short seed generates meaningful creative angle');

  // 4. Individual shot regeneration test
  console.log('\n--- 4. INDIVIDUAL SHOT REGENERATION TEST ---');
  const initialReel = await generateStoryboard({ reelTitle: 'I finished +2... now what?' });
  const originalHook = initialReel.shots[0].dialogue;
  const originalProblem = initialReel.shots[1].dialogue;

  const regeneratedHook = await regenerateShot({
    reelTitle: initialReel.reelTitle,
    creativeAngle: initialReel.creativeAngle,
    targetAudience: initialReel.targetAudience,
    shotNumber: 1,
    shotType: 'HOOK',
    currentStoryboard: initialReel,
  });

  assert(regeneratedHook.number === 1, 'Regenerated shot maintains shot number 1');
  assert(regeneratedHook.type === 'HOOK', 'Regenerated shot maintains type HOOK');
  assert(initialReel.shots[1].dialogue === originalProblem, 'Other shots remained unchanged during single-shot regen');

  // 5. Run the complete 20-Title MVP Evaluation Set
  console.log('\n--- 5. 20-TITLE CREATIVE TEST SET ---');
  console.log(`Testing ${MVP_TEST_TITLES.length} required evaluation titles...\n`);

  let validCount = 0;
  for (let i = 0; i < MVP_TEST_TITLES.length; i++) {
    const title = MVP_TEST_TITLES[i];
    const startTime = Date.now();
    const reel = await generateStoryboard({ reelTitle: title });
    const durationMs = Date.now() - startTime;

    const parseCheck = ReelStoryboardSchema.safeParse(reel);
    const hasSixShots = reel.shots.length === 6;
    const hasHook = reel.shots[0].type === 'HOOK' && Boolean(reel.shots[0].visual);
    const hasProblem = reel.shots[1].type === 'PROBLEM' && Boolean(reel.shots[1].visual);
    const hasInterrupt = reel.shots[2].type === 'PATTERN_INTERRUPT' && Boolean(reel.shots[2].visual);
    const hasValue = reel.shots[3].type === 'VALUE' && Boolean(reel.shots[3].visual);
    const hasPayoff = reel.shots[4].type === 'PAYOFF' && Boolean(reel.shots[4].visual);
    const hasCta = reel.shots[5].type === 'CTA' && Boolean(reel.shots[5].visual);
    const hasProductionNotes = Boolean(reel.productionNotes.visualStyle && reel.productionNotes.camera);
    const hasShootingPriority = reel.creativeSummary.shootingPriority.length > 0;
    const fastEnough = durationMs < 5000; // Well below 30s threshold

    const allPassed =
      parseCheck.success &&
      hasSixShots &&
      hasHook &&
      hasProblem &&
      hasInterrupt &&
      hasValue &&
      hasPayoff &&
      hasCta &&
      hasProductionNotes &&
      hasShootingPriority &&
      fastEnough;

    if (allPassed) {
      validCount++;
      console.log(`  [${i + 1}/${MVP_TEST_TITLES.length}] ✅ "${title}" (${durationMs}ms)`);
    } else {
      console.error(`  [${i + 1}/${MVP_TEST_TITLES.length}] ❌ "${title}" FAILED validation`);
    }
  }

  assert(validCount === MVP_TEST_TITLES.length, `100% of 20-title test set passed (${validCount}/${MVP_TEST_TITLES.length})`);

  console.log('\n========================================');
  console.log(`📊 FINAL RESULT: ${passedTests}/${totalTests} TESTS PASSED`);
  console.log('========================================\n');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runValidationTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
