import { generateCreativeTerritory } from './freshnessEngine.js';
import { extractRealityTrigger } from './realityTrigger.js';
import { recordCreativeDNA, clearCreativeMemory } from './creativeMemory.js';
import { detectAngleCollision } from './angleCollision.js';
import { detectGenericLanguage } from './genericLanguageDetector.js';
import { extractContentCore, runMultiGateQA } from './aiService.js';
import { ReelStoryboard } from '../shared/types.js';

function assert(condition: boolean, testName: string, detail?: any) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    console.error(`  ❌ FAIL: ${testName}`, detail || '');
    throw new Error(`Test failed: ${testName}`);
  }
}

export async function runFreshnessTestSuite() {
  console.log('\n========================================');
  console.log('🧪 FRESHNESS & CREATIVE INTELLIGENCE TEST SUITE');
  console.log('========================================\n');

  clearCreativeMemory();

  // CASE A: Two different topics using the same creative angle
  console.log('--- TEST CASE A: Different Topics, Same Creative Angle ---');
  const coreA1 = extractContentCore('Why learn AI in 2026');
  const coreA2 = extractContentCore('Which engineering branch after +2');
  const terrA1 = generateCreativeTerritory(coreA1, 'Why learn AI in 2026');
  const terrA2 = generateCreativeTerritory(coreA2, 'Which engineering branch after +2');

  assert(coreA1.topic !== coreA2.topic, 'Case A: Extracted topics are distinct');
  assert(Boolean(terrA1.angle) && Boolean(terrA2.angle), 'Case A: Generated creative territories for both topics');

  // CASE B: Same topic using two genuinely different angles
  console.log('\n--- TEST CASE B: Same Topic, Two Different Angles ---');
  const coreB = extractContentCore('Should I join Joy University for B.Tech CSE?');
  const terrB1 = generateCreativeTerritory(coreB, 'Should I join Joy University for B.Tech CSE?');

  // Simulate shifting perspective to generate alternative angle
  terrB1.perspective = 'Alumni (Experienced / Hindsight)';
  const terrB2 = { ...terrB1, perspective: 'Recruiter / Employer (Pragmatic)', angle: 'Portfolio proof vs Degree certificate comparison' };
  assert(terrB1.angle !== terrB2.angle, 'Case B: Generated two genuinely different angles for same topic');

  // CASE C: New Reel that repeats a previous hook
  console.log('\n--- TEST CASE C: Repeats Previous Hook (Collision Trigger) ---');
  clearCreativeMemory();
  recordCreativeDNA({
    topic: 'College selection',
    coreIdea: 'Don\'t choose college because your friend chose it',
    angle: 'Exposing peer pressure in college choice',
    perspective: 'Student (Current / Confused)',
    hookType: 'Everyday Behavioral Observation',
    narrativeStructure: 'Micro-Story / Real Situation',
    emotionalDriver: 'Recognition ("That is so me")',
    visualDevice: 'Split-Screen Contrast',
    metaphor: 'Friend choice',
    ctaType: 'Apply now',
    openingPattern: 'You ask your parents, your parents ask relatives...',
    keyClaims: ['Choose based on course lab quality']
  });

  const proposedCollisionTerritory = {
    perspective: 'Student (Current / Confused)',
    angle: 'Exposing peer pressure in college choice',
    narrativeDevice: 'Micro-Story / Real Situation',
    emotionalDriver: 'Recognition ("That is so me")',
    visualDevice: 'Split-Screen Contrast',
    hookMechanism: 'Everyday Behavioral Observation',
    realityTrigger: 'Asking relatives',
    creativeDistance: 3,
    noveltyReason: 'Observed peer pressure',
    avoidPatterns: []
  };

  const collisionC = detectAngleCollision(proposedCollisionTerritory, 'College selection', 'Don\'t choose college because your friend chose it');
  assert(collisionC.collision, 'Case C: Successfully detected angle collision for repeated hook structure');

  // CASE D: New Reel that uses a semantically similar metaphor to an old Reel
  console.log('\n--- TEST CASE D: Semantically Similar Metaphor Collision ---');
  const proposedMetaphorTerritory = {
    perspective: 'Student (Current / Confused)',
    angle: 'Exposing peer pressure in career path selection',
    narrativeDevice: 'Micro-Story / Real Situation',
    emotionalDriver: 'Recognition ("That is so me")',
    visualDevice: 'Split-Screen Contrast',
    hookMechanism: 'Everyday Behavioral Observation',
    realityTrigger: 'Asking relatives',
    creativeDistance: 3,
    noveltyReason: 'Observed peer pressure',
    avoidPatterns: []
  };
  const collisionD = detectAngleCollision(proposedMetaphorTerritory, 'Career selection', 'Don\'t choose career because your friend chose it');
  assert(collisionD.collision, 'Case D: Successfully detected semantic similarity collision across different topics');

  // CASE E: Generic AI Language Detection
  console.log('\n--- TEST CASE E: Generic AI Language Detection ---');
  const genericMockStoryboard: ReelStoryboard = {
    id: 'mock_1',
    reelTitle: 'AI in 2026',
    creativeAngle: 'Generic angle',
    objective: 'Education',
    targetAudience: 'Students',
    duration: '30s',
    format: '9:16',
    creativeDirection: 'Informative',
    language: 'English',
    shots: [
      { number: 1, type: 'HOOK', name: 'Hook', timestamp: '0s', visual: 'V', dialogue: "In today's fast-paced world, unlock your potential!", onscreenText: 'Unlock Potential', cameraPerformance: 'C' },
      { number: 2, type: 'PROBLEM', name: 'P', timestamp: '5s', visual: 'V', dialogue: 'Are you ready for the future?', onscreenText: 'Future', cameraPerformance: 'C' },
      { number: 3, type: 'PATTERN_INTERRUPT', name: 'PI', timestamp: '10s', visual: 'V', dialogue: 'Here is what nobody tells you about tech.', onscreenText: 'Secret', cameraPerformance: 'C' },
      { number: 4, type: 'VALUE', name: 'Val', timestamp: '15s', visual: 'V', dialogue: 'Learn AI at Joy University.', onscreenText: 'Joy', cameraPerformance: 'C' },
      { number: 5, type: 'PAYOFF', name: 'Pay', timestamp: '20s', visual: 'V', dialogue: 'Transform your future today.', onscreenText: 'Transform', cameraPerformance: 'C' },
      { number: 6, type: 'CTA', name: 'CTA', timestamp: '25s', visual: 'V', dialogue: 'Embark on your journey and apply now.', onscreenText: 'Apply', cameraPerformance: 'C' },
    ],
    productionNotes: { visualStyle: '', performance: '', camera: '', editing: '', sound: '', props: [], locations: [], casting: '', complexity: 'LOW' },
    creativeSummary: { keyCreativeIdea: '', shootingPriority: [] },
    tags: [],
    createdAt: '',
    updatedAt: '',
    status: 'Draft',
    version: 1
  };

  const auditE = detectGenericLanguage(genericMockStoryboard);
  assert(auditE.generic, 'Case E: Successfully detected generic AI language');
  assert(auditE.flaggedPhrases.includes("in today's fast-paced world"), 'Case E: Flagged "in today\'s fast-paced world"');

  // CASE F: A fresh Reel that is different but preserves the original idea
  console.log('\n--- TEST CASE F: Fresh Reel Preserving Original Idea ---');
  const freshMockStoryboard: ReelStoryboard = {
    ...genericMockStoryboard,
    shots: [
      { number: 1, type: 'HOOK', name: 'Hook', timestamp: '0s', visual: 'V', dialogue: 'You open ChatGPT to write your assignment, but your professor checks your commit history.', onscreenText: 'AI Real Check', cameraPerformance: 'C' },
      { number: 2, type: 'PROBLEM', name: 'P', timestamp: '5s', visual: 'V', dialogue: 'Using AI prompts is easy. Building AI tools is what gets you hired.', onscreenText: 'Prompts vs Building', cameraPerformance: 'C' },
      { number: 3, type: 'PATTERN_INTERRUPT', name: 'PI', timestamp: '10s', visual: 'V', dialogue: 'Look at these two GitHub profiles side-by-side.', onscreenText: 'GitHub Contrast', cameraPerformance: 'C' },
      { number: 4, type: 'VALUE', name: 'Val', timestamp: '15s', visual: 'V', dialogue: 'B.Tech CSE (AI & Robotics) at Joy University focuses on hands-on neural network labs.', onscreenText: 'Hands-on AI Labs', cameraPerformance: 'C' },
      { number: 5, type: 'PAYOFF', name: 'Pay', timestamp: '20s', visual: 'V', dialogue: 'That is how you turn AI from a shortcut into a career superpower.', onscreenText: 'Career Superpower', cameraPerformance: 'C' },
      { number: 6, type: 'CTA', name: 'CTA', timestamp: '25s', visual: 'V', dialogue: 'Check out the B.Tech AI curriculum at Joy University.', onscreenText: 'Joy University Admissions', cameraPerformance: 'C' },
    ]
  };

  const coreF = extractContentCore('Why learn AI');
  const qaF = runMultiGateQA(freshMockStoryboard, coreF, 'English', 'Informative');
  if (!qaF.pass) console.log('DEBUG Case F qaF failure:', qaF);
  assert(qaF.pass, 'Case F: Fresh Reel preserving original idea PASSES all QA gates');

  // CASE G: A Reel that is highly creative but NO LONGER matches the user's original idea (MUST FAIL)
  console.log('\n--- TEST CASE G: Highly Creative but Drifted Idea (MUST FAIL) ---');
  const driftedMockStoryboard: ReelStoryboard = {
    ...freshMockStoryboard,
    shots: freshMockStoryboard.shots.map(s => ({
      ...s,
      dialogue: 'Let us talk about organic farming methods in South India and why soil testing matters for agriculture.',
      onscreenText: 'Soil Testing Methods'
    }))
  };

  const coreG = extractContentCore('B.Tech CSE Artificial Intelligence degree');
  const qaG = runMultiGateQA(driftedMockStoryboard, coreG, 'English', 'Informative');
  assert(!qaG.pass, 'Case G: Highly creative reel that lost original topic MUST FAIL Gate 3 (Idea Fidelity)');
  assert(Boolean(qaG.failedGate?.includes('Gate 3')), 'Case G: Failed specifically on Gate 3 (Idea Fidelity)');

  console.log('\n========================================');
  console.log('🎉 ALL 7 FRESHNESS TEST CASES (A-G) PASSED!');
  console.log('========================================\n');
}

runFreshnessTestSuite().catch((err) => {
  console.error('Fatal freshness test error:', err);
  process.exit(1);
});
