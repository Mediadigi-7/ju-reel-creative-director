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

export const ReelStoryboardSchema = z.object({
  id: z.string(),
  reelTitle: z.string().min(1),
  creativeAngle: z.string().min(1),
  objective: z.string().min(1),
  targetAudience: z.string().min(1),
  duration: z.string().min(1),
  format: z.string().default('9:16 Vertical Reel'),
  creativeDirection: z.string().default('Student Relatable'),
  language: z.enum(['English', 'Tamil', 'Telugu', 'Malayalam', 'Hindi', 'Tanglish']).default('English'),
  shots: z.array(ShotSchema).length(6),
  productionNotes: ProductionNotesSchema,
  creativeSummary: CreativeSummarySchema,
  viralBlueprint: ViralBlueprintSchema.optional(),
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
  repaired.creativeDirection = repaired.creativeDirection || 'Student Relatable';
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

  // Single CTA check: Clean up CTA text if it packs multiple actions
  const ctaShot = repaired.shots[5];
  if (ctaShot) {
    let text = ctaShot.onscreenText || ctaShot.dialogue || '';
    if (text.includes('and') && (text.includes('follow') || text.includes('comment') || text.includes('apply'))) {
      ctaShot.onscreenText = ctaShot.onscreenText.split(/and|\&/i)[0].trim() || 'Save this for later.';
    }
  }

  // Ensure Production Notes
  const rawProd = repaired.productionNotes || repaired.production || {};
  repaired.productionNotes = {
    visualStyle: rawProd.visualStyle || rawProd.style || 'Warm, authentic student-first cinematic aesthetic with natural campus daylight.',
    performance: rawProd.performance || 'Relatable, energetic, conversational acting without forced presentation.',
    camera: rawProd.camera || 'Smartphone or lightweight mirrorless camera on prime lens (35mm equivalent).',
    editing: rawProd.editing || 'Snappy pacing with match cuts and clean kinetic typography highlights.',
    sound: rawProd.sound || 'Lofi upbeat instrumental track with ducking under voiceover and punchy foley.',
    props: Array.isArray(rawProd.props) ? rawProd.props : ['Notebook', 'Smartphone', 'Course Brochure'],
    locations: Array.isArray(rawProd.locations) ? rawProd.locations : ['Campus courtyard', 'Library study desk'],
    casting: rawProd.casting || '1–2 authentic college-age students (18–20 yrs)',
    complexity: ['LOW', 'MEDIUM', 'HIGH'].includes(rawProd.complexity) ? rawProd.complexity : 'LOW',
  };

  // Ensure Creative Summary
  const rawSum = repaired.creativeSummary || {};
  repaired.creativeSummary = {
    keyCreativeIdea: rawSum.keyCreativeIdea || repaired.keyCreativeIdea || 'Shift from anxiety to strategic curiosity about future courses.',
    shootingPriority: Array.isArray(rawSum.shootingPriority) && rawSum.shootingPriority.length > 0
      ? rawSum.shootingPriority
      : [
          'Capture high-energy hook reaction in natural daylight.',
          'Execute tight timing on the pattern interrupt shot.',
          'Ensure crystal clear dialogue recording with lavalier mic.',
        ],
  };

  // Final zod parse check
  const parseResult = ReelStoryboardSchema.safeParse(repaired);
  if (!parseResult.success) {
    const zodIssues = parseResult.error.issues.map(i => `${i.path.join('.')}: ${i.message}`);
    return { valid: false, data: repaired, errors: zodIssues };
  }

  return { valid: true, data: parseResult.data, errors: [] };
}
