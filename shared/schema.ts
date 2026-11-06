
export function generateDynamicProductionNotes(title: string, direction: string = 'Informative') {
  const lower = (title || '').toLowerCase();

  let locations = ['Joy University Central Boulevard', 'Campus Amphitheatre'];
  let props = ['Notebook', 'Smartphone with course portal', 'Course Booklet'];
  let visualStyle = 'Warm, naturalistic, authentic South Indian student-first aesthetic. Avoid corporate promotional stiffness.';
  let camera = 'Lightweight mirrorless camera or smartphone with f/1.8 prime lens for crisp subject isolation.';
  let sound = 'Warm acoustic lofi guitar or subtle upbeat percussion beat with music ducked during dialogue.';
  let priorities = [
    'Nail the opening Hook facial expression within the first 1.5 seconds.',
    'Execute the Pattern Interrupt cut with perfect audio-video synchronization.',
    'Ensure the Value shot clearly highlights the 3-point framework in readable typography.',
    'Keep branding subtle until the final payoff and CTA.'
  ];

  if (lower.includes('b.com') || lower.includes('commerce') || lower.includes('fintech') || lower.includes('account') || lower.includes('finance')) {
    locations = ['Joy University FinTech Analytics Hub', 'Entrepreneurship Suite', 'Central Boulevard'];
    props = ['Tablet displaying real-time FinTech analytics', 'Corporate Finance Case Study', 'Smartphone with trading app'];
    visualStyle = 'Sharp, high-clarity corporate-creative aesthetic with vibrant screen data overlays.';
    sound = 'Upbeat modern electronic rhythm with subtle trading floor ambience in background.';
    priorities = [
      'Focus camera on the FinTech tablet screen contrast in Shot 3 Pattern Interrupt.',
      'Highlight the 3 corporate career pathways in kinetic typography during Shot 4 Value.',
      'Capture student collaboration in the Entrepreneurship Hub for Shot 5 Payoff.',
      'End with clear single CTA pointing to B.Com FinTech course exploration.'
    ];
  } else if (lower.includes('design') || lower.includes('b.design') || lower.includes('ui') || lower.includes('ux') || lower.includes('creative')) {
    locations = ['Joy University Design & Prototyping Studio', 'Media & Animation Suite', 'Outdoor Study Pod'];
    props = ['Wacom drawing tablet', 'Figma wireframe sketchpad', 'Color palette swatches', 'Smartphone'];
    visualStyle = 'Vibrant, stylized creative-first aesthetic with dynamic lighting and clean color grading.';
    sound = 'Lofi chillhop beats with subtle stylus tap foley on pattern interrupt.';
    priorities = [
      'Establish direct eye contact and candid expression in the opening Hook shot.',
      'Make the camera transition to the outdoor studio instant and energetic for Pattern Interrupt.',
      'Display the 3 design evaluation filters clearly in Shot 4 Value.',
      'Show authentic student teamwork around the outdoor study pod in Shot 5 Payoff.'
    ];
  } else if (lower.includes('robot') || lower.includes('mech') || lower.includes('automation') || lower.includes('hardware')) {
    locations = ['Joy University Robotics & Automation Bay', 'Mechatronics Prototyping Lab', 'Central Quadrangle'];
    props = ['3D-printed robotic arm component', 'Circuit board', 'Microcontroller', 'Safety glasses'];
    visualStyle = 'High-tech, dynamic engineering focus with shallow depth of field on hardware details.';
    sound = 'Energetic synth beats with crisp mechanical servo foley sound effects.';
    priorities = [
      'Emphasize the hardware vs software contrast in the opening Hook.',
      'Ensure the robotic arm movement syncs with the Pattern Interrupt cut.',
      'Detail the 2 distinct B.Tech pathways clearly in Shot 4 typography.',
      'Frame the lab environment to highlight Joy University advanced equipment.'
    ];
  } else if (lower.includes('ai') || lower.includes('tech') || lower.includes('code') || lower.includes('cse') || lower.includes('comput')) {
    locations = ['Joy University Computational Intelligence Lab', 'High-Performance GPU Cluster Suite', 'Student Innovation Pod'];
    props = ['IDE code editor terminal', 'GitHub commit history screen', 'Laptop with AI model logs'];
    visualStyle = 'Modern tech aesthetic with high-contrast ambient lighting and screen glows.';
    sound = 'Pulsing ambient electronic soundtrack with keyboard click sound design.';
    priorities = [
      'Hook the viewer with the prompt-user vs builder contrast immediately.',
      'Show clean screen recording overlay during Pattern Interrupt.',
      'Highlight neural network lab access during the Value beat.',
      'Keep the CTA focused on actionable course exploration.'
    ];
  }

  return {
    productionNotes: {
      visualStyle,
      performance: 'Relatable, energetic, conversational acting without forced presentation.',
      camera,
      editing: 'Snappy rhythmic cuts (1.5–3.5s per shot), match cuts on action, kinetic typography for key takeaway phrases.',
      sound,
      props,
      locations,
      casting: '1 protagonist (18–19 yrs old, approachable look) + 2 background student collaborators',
      complexity: 'LOW' as const
    },
    shootingPriority: priorities
  };
}

import { z } from 'zod';

export const ShotTypeEnum = z.enum([
  'HOOK',
  'PROBLEM',
  'PATTERN_INTERRUPT',
  'VALUE',
  'PAYOFF',
  'CTA',
]);

export const ShotSchema = z.object({
  number: z.number().int().min(1).max(6),
  type: ShotTypeEnum,
  name: z.string().min(1),
  timestamp: z.string().min(1),
  visual: z.string().min(3),
  dialogue: z.string(),
  onscreenText: z.string(),
  cameraPerformance: z.string().min(3),
  userEdited: z.boolean().optional(),
});

export const ProductionNotesSchema = z.object({
  visualStyle: z.string().min(1),
  performance: z.string().min(1),
  camera: z.string().min(1),
  editing: z.string().min(1),
  sound: z.string().min(1),
  props: z.array(z.string()).default([]),
  locations: z.array(z.string()).default([]),
  casting: z.string().min(1),
  complexity: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('LOW'),
});

export const CreativeSummarySchema = z.object({
  keyCreativeIdea: z.string().min(1),
  shootingPriority: z.array(z.string()).default([]),
});

export const ViralBlueprintSchema = z.object({
  viralScore: z.number().min(0).max(100).default(85),
  obviousAngleAvoided: z.string().default(''),
  humanTruth: z.string().default(''),
  hiddenProblem: z.string().default(''),
  centralInformationGap: z.string().default(''),
  contentTension: z.string().default(''),
  progressiveRevelation: z.array(z.string()).default([]),
  contentSurprise: z.string().default(''),
  practicalValue: z.string().default(''),
  payoff: z.string().default(''),
  shareTrigger: z.string().default(''),
  saveTrigger: z.string().default(''),
  commentTrigger: z.string().default(''),
  joyUniversityConnection: z.string().default(''),
  directorInstruction: z.string().default(''),
});

export const FrameworkMetadataSchema = z.object({
  creativeType: z.enum(['Informative', 'Funny', 'Trendy']).default('Informative'),
  hookMechanism: z.string().default('Curiosity & Bold Claim'),
  hookText: z.string().default(''),
  hookVisual: z.string().default(''),
  problemType: z.string().default('Knowledge Gap & Decision Tension'),
  patternInterrupt: z.string().default('Hard Cut & Visual Reframer'),
  valueMechanism: z.string().default('3-Point Decision Checklist'),
  payoffType: z.string().default('Clear Answer & Strategic Framework'),
  ctaType: z.string().default('Discovery & Consideration'),
  ctaText: z.string().default(''),
  secondaryTechniques: z.array(z.string()).default(['Storytelling', 'Student Relatable']),
  evidenceRequired: z.boolean().default(false),
  audience: z.string().default('+2 Completed Students'),
});

export const ReelStoryboardSchema = z.object({
  id: z.string(),
  reelTitle: z.string().min(1),
  creativeAngle: z.string().min(1),
  objective: z.string().min(1),
  targetAudience: z.string().min(1),
  duration: z.string().min(1),
  format: z.string().default('9:16 Vertical Reel'),
  creativeDirection: z.enum(['Informative', 'Funny', 'Trendy']).default('Informative'),
  language: z.enum(['English', 'Tamil', 'Telugu', 'Malayalam', 'Hindi', 'Tanglish']).default('English'),
  shots: z.array(ShotSchema).length(6),
  productionNotes: ProductionNotesSchema,
  creativeSummary: CreativeSummarySchema,
  viralBlueprint: ViralBlueprintSchema.optional(),
  frameworkMetadata: FrameworkMetadataSchema.optional(),
  tags: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.enum(['Draft', 'Ready for Production', 'Shot', 'Edited', 'Published', 'Archived']).default('Draft'),
  version: z.number().int().default(1),
});

// Helper validation & repair functions
export function validateAndRepairStoryboard(raw: any, fallbackTitle: string): { valid: boolean; data: any; errors: string[] } {
  const errors: string[] = [];
  
  if (!raw || typeof raw !== 'object') {
    return { valid: false, data: null, errors: ['Raw output is not an object'] };
  }

  const repaired: any = { ...raw };

  // Repair IDs and metadata
  repaired.id = repaired.id || `reel_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  repaired.reelTitle = repaired.reelTitle || repaired.title || fallbackTitle;
  repaired.creativeAngle = repaired.creativeAngle || 'Rethinking career and course selection from a student perspective';
  repaired.objective = repaired.objective || 'Empower +2 students with actionable clarity';
  repaired.targetAudience = repaired.targetAudience || '+2 Completed Students';
  repaired.duration = repaired.duration || '28 sec';
  repaired.format = '9:16 Vertical Reel';
  repaired.creativeDirection = (['Informative', 'Funny', 'Trendy'].includes(repaired.creativeDirection)) ? repaired.creativeDirection : 'Informative';
  repaired.language = (['English', 'Tamil', 'Telugu', 'Malayalam', 'Hindi', 'Tanglish'].includes(repaired.language)) ? repaired.language : 'English';
  repaired.createdAt = repaired.createdAt || new Date().toISOString();
  repaired.updatedAt = new Date().toISOString();
  repaired.status = repaired.status || 'Draft';
  repaired.version = repaired.version || 1;
  repaired.tags = Array.isArray(repaired.tags) && repaired.tags.length > 0 ? repaired.tags : ['+2', 'careers', 'joy-university', 'course-choice'];

  // Repair viralBlueprint if present
  if (repaired.viralBlueprint && typeof repaired.viralBlueprint === 'object') {
    const rawVb = repaired.viralBlueprint;
    repaired.viralBlueprint = {
      viralScore: typeof rawVb.viralScore === 'number' ? Math.min(100, Math.max(0, Math.round(rawVb.viralScore))) : 92,
      obviousAngleAvoided: rawVb.obviousAngleAvoided || rawVb.obvious_angle_avoided || 'Generic promotional or superficial advice',
      humanTruth: rawVb.humanTruth || rawVb.human_truth || repaired.creativeAngle,
      hiddenProblem: rawVb.hiddenProblem || rawVb.hidden_problem || 'Students picking courses without knowing true industry workflows',
      centralInformationGap: rawVb.centralInformationGap || rawVb.central_information_gap || 'What separates an obsolete degree from one with compounding leverage?',
      contentTension: rawVb.contentTension || rawVb.content_tension || 'Safe expectation vs emerging reality',
      progressiveRevelation: Array.isArray(rawVb.progressiveRevelation) && rawVb.progressiveRevelation.length > 0
        ? rawVb.progressiveRevelation
        : [
            'Reveal 1: The familiar assumption students make',
            'Reveal 2: The unexpected complication nobody mentions',
            'Reveal 3: The deeper industry truth and distinction',
            'Reveal 4: The actionable payoff and decision test'
          ],
      contentSurprise: rawVb.contentSurprise || rawVb.content_surprise || 'What sounds safe often carries the highest risk of stagnation',
      practicalValue: rawVb.practicalValue || rawVb.practical_value || 'Concrete framework for evaluating career pathways',
      payoff: rawVb.payoff || 'Clarity and confidence in making the right educational choice',
      shareTrigger: rawVb.shareTrigger || rawVb.share_trigger || 'Relevant to every +2 student navigating this dilemma',
      saveTrigger: rawVb.saveTrigger || rawVb.save_trigger || 'Actionable decision checklist worth re-reading',
      commentTrigger: rawVb.commentTrigger || rawVb.comment_trigger || 'Which option would you choose? Share below.',
      joyUniversityConnection: rawVb.joyUniversityConnection || rawVb.joy_university_connection || 'Practical hands-on ecosystem at Joy University',
      directorInstruction: rawVb.directorInstruction || rawVb.director_instruction || 'Lead with genuine student empathy before introducing solutions',
    };
  }

  // Validate or convert shots
  const shotSequence: Array<{ type: z.infer<typeof ShotTypeEnum>; name: string; time: string }> = [
    { type: 'HOOK', name: 'Hook', time: '00:00 – 00:04' },
    { type: 'PROBLEM', name: 'Problem', time: '00:04 – 00:08' },
    { type: 'PATTERN_INTERRUPT', name: 'Pattern Interrupt', time: '00:08 – 00:12' },
    { type: 'VALUE', name: 'Value', time: '00:12 – 00:22' },
    { type: 'PAYOFF', name: 'Payoff', time: '00:22 – 00:26' },
    { type: 'CTA', name: 'Call to Action', time: '00:26 – 00:30' },
  ];

  let rawShots = repaired.shots;
  // Support storyboard object format: { hook: {...}, problem: {...}, ... }
  if (!Array.isArray(rawShots) && repaired.storyboard && typeof repaired.storyboard === 'object') {
    const sb = repaired.storyboard;
    rawShots = [
      sb.hook,
      sb.problem,
      sb.patternInterrupt || sb.pattern_interrupt,
      sb.value,
      sb.payoff,
      sb.cta,
    ];
  }

  if (!Array.isArray(rawShots)) {
    rawShots = [];
  }

  const normalizedShots = shotSequence.map((req, index) => {
    const rawShot = rawShots[index] || {};
    return {
      number: index + 1,
      type: req.type,
      name: req.name,
      timestamp: rawShot.timestamp || rawShot.time || req.time,
      visual: rawShot.visual || `Close-up shot demonstrating the ${req.name.toLowerCase()} moment.`,
      dialogue: rawShot.dialogue || rawShot.dialogueVO || rawShot.vo || '',
      onscreenText: rawShot.onscreenText || rawShot.text || '',
      cameraPerformance: rawShot.cameraPerformance || rawShot.camera || 'Eye-level medium shot with natural student performance.',
      userEdited: Boolean(rawShot.userEdited),
    };
  });

  repaired.shots = normalizedShots;

  // Ensure Framework Metadata
  const rawFm = repaired.frameworkMetadata || raw.framework_metadata || raw.frameworkMetadata || {};
  const cType: 'Informative' | 'Funny' | 'Trendy' = (['Informative', 'Funny', 'Trendy'].includes(rawFm.creativeType || repaired.creativeDirection))
    ? (rawFm.creativeType || repaired.creativeDirection)
    : 'Informative';

  const defaultHooks: Record<string, string> = {
    Informative: 'Curiosity & Bold Claim',
    Funny: 'POV & Relatable Social Situation',
    Trendy: 'Visual Reveal & Interactive Challenge',
  };
  const defaultProblems: Record<string, string> = {
    Informative: 'Knowledge Gap & Decision Tension',
    Funny: 'Relatable Social Pressure & Relatives Reaction',
    Trendy: 'Timed Campus Task & Curiosity Gap',
  };
  const defaultValues: Record<string, string> = {
    Informative: '3-Point Decision Checklist & Industry Framework',
    Funny: 'Comedic Escalation & Relatable Recognition',
    Trendy: 'Interactive Demonstration & Campus Discovery',
  };
  const defaultPayoffs: Record<string, string> = {
    Informative: 'Strategic Career Insight & Answer Clarity',
    Funny: 'Comedic Reversal & Satisfying Punchline',
    Trendy: 'Challenge Result & Visual Transformation',
  };
  const defaultCtas: Record<string, string> = {
    Informative: 'Save & Share Guidance',
    Funny: 'Tag Friends & Comment Real Reaction',
    Trendy: 'Answer Challenge & Participate',
  };

  repaired.frameworkMetadata = {
    creativeType: cType,
    hookMechanism: rawFm.hookMechanism || rawFm.hook_mechanism || defaultHooks[cType],
    hookText: rawFm.hookText || rawFm.hook_text || (repaired.shots[0]?.dialogue || repaired.shots[0]?.onscreenText || ''),
    hookVisual: rawFm.hookVisual || rawFm.hook_visual || (repaired.shots[0]?.visual || ''),
    problemType: rawFm.problemType || rawFm.problem_type || defaultProblems[cType],
    patternInterrupt: rawFm.patternInterrupt || rawFm.pattern_interrupt || 'Narrative Attention Reset & Visual Cut',
    valueMechanism: rawFm.valueMechanism || rawFm.value_mechanism || defaultValues[cType],
    payoffType: rawFm.payoffType || rawFm.payoff_type || defaultPayoffs[cType],
    ctaType: rawFm.ctaType || rawFm.cta_type || defaultCtas[cType],
    ctaText: rawFm.ctaText || rawFm.cta_text || (repaired.shots[5]?.onscreenText || repaired.shots[5]?.dialogue || ''),
    secondaryTechniques: Array.isArray(rawFm.secondaryTechniques) && rawFm.secondaryTechniques.length > 0
      ? rawFm.secondaryTechniques
      : ['Storytelling', 'Student Relatable', 'Cinematic Visuals'],
    evidenceRequired: typeof rawFm.evidenceRequired === 'boolean' ? rawFm.evidenceRequired : false,
    audience: rawFm.audience || repaired.targetAudience || '+2 Completed Students',
  };

  // Single CTA check: Clean up CTA text if it packs multiple actions
  const ctaShot = repaired.shots[5];
  if (ctaShot) {
    let text = ctaShot.onscreenText || ctaShot.dialogue || '';
    if (text.includes('and') && (text.includes('follow') || text.includes('comment') || text.includes('apply'))) {
      ctaShot.onscreenText = ctaShot.onscreenText.split(/and|\&/i)[0].trim() || 'Save this for later.';
    }
  }

  // Dynamic Production Notes & Shooting Priorities
  const dynamicProd = generateDynamicProductionNotes(repaired.reelTitle, repaired.creativeDirection);
  const rawProd = repaired.productionNotes || repaired.production || {};
  repaired.productionNotes = {
    visualStyle: rawProd.visualStyle || rawProd.style || dynamicProd.productionNotes.visualStyle,
    performance: rawProd.performance || dynamicProd.productionNotes.performance,
    camera: rawProd.camera || rawProd.cameraGrip || dynamicProd.productionNotes.camera,
    editing: rawProd.editing || dynamicProd.productionNotes.editing,
    sound: rawProd.sound || dynamicProd.productionNotes.sound,
    props: Array.isArray(rawProd.props) && rawProd.props.length > 0 ? rawProd.props : dynamicProd.productionNotes.props,
    locations: Array.isArray(rawProd.locations) && rawProd.locations.length > 0 ? rawProd.locations : dynamicProd.productionNotes.locations,
    casting: rawProd.casting || dynamicProd.productionNotes.casting,
    complexity: ['LOW', 'MEDIUM', 'HIGH'].includes(rawProd.complexity) ? rawProd.complexity : 'LOW',
  };

  // Ensure Creative Summary
  const rawSum = repaired.creativeSummary || {};
  repaired.creativeSummary = {
    keyCreativeIdea: rawSum.keyCreativeIdea || repaired.keyCreativeIdea || 'Shift from anxiety to strategic curiosity about future courses.',
    shootingPriority: Array.isArray(rawSum.shootingPriority) && rawSum.shootingPriority.length > 0
      ? rawSum.shootingPriority
      : dynamicProd.shootingPriority,
  };

  // Final zod parse check
  const parseResult = ReelStoryboardSchema.safeParse(repaired);
  if (!parseResult.success) {
    const zodIssues = parseResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
    return { valid: false, data: repaired, errors: zodIssues };
  }

  return { valid: true, data: parseResult.data, errors: [] };
}
