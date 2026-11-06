import { ContentCore } from './aiService.js';

export interface CreativeTerritory {
  perspective: string;
  angle: string;
  narrativeDevice: string;
  emotionalDriver: string;
  visualDevice: string;
  hookMechanism: string;
  realityTrigger: string;
  creativeDistance: number; // 1 to 5, default 3
  noveltyReason: string;
  avoidPatterns: string[];
}

export const PERSPECTIVES = [
  'Student (Current / Confused)',
  'Parent (Anxious / Well-meaning)',
  'Teacher / Mentor (Observant)',
  'Alumni (Experienced / Hindsight)',
  'Recruiter / Employer (Pragmatic)',
  'Peer / Friend (Relatable)',
  'Future Self (5 years ahead)',
  'Independent Observer (Unbiased)'
];

export const NARRATIVE_DEVICES = [
  'Micro-Story / Real Situation',
  'Investigation / Reality Check',
  'Comparison / A vs B',
  'Demonstration / Experiment',
  'Confession / Hidden Truth',
  'Debate / Myth Busting',
  'Reverse Expectation / Reframe',
  'Micro-Documentary Observation'
];

export const EMOTIONAL_DRIVERS = [
  'Curiosity / Knowledge Gap',
  'Recognition ("That is so me")',
  'Surprise / Counter-intuitive',
  'Relief / Clarity',
  'Doubt / Critical Thinking',
  'Ambition / Practical Growth',
  'Fear of making a wrong choice'
];

export const VISUAL_DEVICES = [
  'Physical Demonstration / Prop',
  'Real-World Location Transition',
  'Split-Screen Contrast',
  'Text Message / Chat Screen Simulation',
  'Object Metaphor',
  'Freeze Frame / Voiceover Focus',
  'On-Camera Direct Conversation'
];

export const HOOK_MECHANISMS = [
  'Unexpected Statement',
  'Everyday Behavioral Observation',
  'Direct Contradiction',
  'Challenge / Experiment',
  'Specific Scenario Setup',
  'Pattern Interrupt Action'
];

/**
 * Generates candidate creative territories for an idea and selects the most distinct,
 * high-relevance territory with Creative Distance = 3 (Fresh & Unexpected, without being absurd).
 */
export function generateCreativeTerritory(contentCore: ContentCore, title: string): CreativeTerritory {
  const topicLower = (contentCore.topic + ' ' + title).toLowerCase();

  // Determine appropriate distance and combinations based on core topic
  let selectedPerspective = PERSPECTIVES[0];
  let selectedNarrative = NARRATIVE_DEVICES[0];
  let selectedEmotion = EMOTIONAL_DRIVERS[0];
  let selectedVisual = VISUAL_DEVICES[0];
  let selectedHook = HOOK_MECHANISMS[0];
  let angle = `Fresh observational take on "${contentCore.topic}"`;
  let realityTrigger = `Common student situation involving ${contentCore.problem || contentCore.question}`;
  let distance = 3;
  let noveltyReason = "Moves away from standard generic marketing language to a concrete human situation.";

  if (topicLower.includes('ai') || topicLower.includes('technology') || topicLower.includes('future') || topicLower.includes('career')) {
    selectedPerspective = 'Recruiter / Employer (Pragmatic)';
    selectedNarrative = 'Demonstration / Experiment';
    selectedEmotion = 'Surprise / Counter-intuitive';
    selectedVisual = 'Split-Screen Contrast';
    selectedHook = 'Everyday Behavioral Observation';
    angle = `Focus on practical human application and decision-making in ${contentCore.topic} rather than generic hype.`;
    realityTrigger = `A student realizing that ${contentCore.topic} is already influencing their everyday decisions or assignment reviews.`;
    distance = 3;
    noveltyReason = "Replaces abstract 'the future of AI' speech with concrete recruiter vs student workflow contrast.";
  } else if (topicLower.includes('mistake') || topicLower.includes('confus') || topicLower.includes('after +2') || topicLower.includes('branch')) {
    selectedPerspective = 'Alumni (Experienced / Hindsight)';
    selectedNarrative = 'Confession / Hidden Truth';
    selectedEmotion = 'Recognition ("That is so me")';
    selectedVisual = 'Text Message / Chat Screen Simulation';
    selectedHook = 'Direct Contradiction';
    angle = `Exposing the hidden social pressure and friend-influence when picking ${contentCore.topic}.`;
    realityTrigger = "You ask your parents, your parents ask relatives, and then someone says 'My friend's son did this'.";
    distance = 3;
    noveltyReason = "Grounded in exact family/peer dialogue rather than generic guidance counselor advice.";
  } else if (topicLower.includes('skill') || topicLower.includes('placement') || topicLower.includes('salary') || topicLower.includes('job')) {
    selectedPerspective = 'Teacher / Mentor (Observant)';
    selectedNarrative = 'Reverse Expectation / Reframe';
    selectedEmotion = 'Doubt / Critical Thinking';
    selectedVisual = 'Object Metaphor';
    selectedHook = 'Unexpected Statement';
    angle = `Reframing ${contentCore.topic} from a degree certificate metric to an actionable skill stack.`;
    realityTrigger = "Looking at two identical resumes where one candidate built 3 real projects and the other only memorized definitions.";
    distance = 3;
    noveltyReason = "Focuses on portfolio proof instead of generic placement promise claims.";
  }

  return {
    perspective: selectedPerspective,
    angle: angle,
    narrativeDevice: selectedNarrative,
    emotionalDriver: selectedEmotion,
    visualDevice: selectedVisual,
    hookMechanism: selectedHook,
    realityTrigger: realityTrigger,
    creativeDistance: distance,
    noveltyReason: noveltyReason,
    avoidPatterns: [
      "Generic 'In today's fast-paced world' opening",
      "Abstract marketing promises",
      "Artificial hype or fake excitement",
      "Overly broad career advice without specific degree/action context"
    ]
  };
}
