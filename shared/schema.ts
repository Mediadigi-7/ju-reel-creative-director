import { ConceptSelectionSchema } from './concepts.js';

// Neutral metadata for older/incomplete records. Never invent a stage plan,
// fixed camera style, institutional facility or cast to fill missing fields.
export function generateDynamicProductionNotes(_title: string, _direction: string = 'Informative') {
  return {
    productionNotes: {
      visualStyle: 'Choose an approach that serves the actual story and audience.',
      performance: 'Natural delivery with room for pauses and visual storytelling.',
      camera: 'Frame the actions and details specified in the production shots.',
      editing: 'Follow the story-led shot sequence and pacing.',
      sound: 'Use sound or silence when it supports the story.',
      props: [] as string[], locations: [] as string[],
      casting: 'Use the cast required by the chosen concept.', complexity: 'LOW' as const,
    },
    shootingPriority: ['Check factual references, practical shot needs and natural delivery timing.'],
  };
}

import { z } from 'zod';
import { NARRATIVE_FUNCTIONS } from './creativeFramework.js';
import { enforceEditorialStatus } from './hlni.js';

export const HlniSchema = z.object({
  insight:z.string(),audienceGap:z.string(),viewerChange:z.string(),
  supportType:z.enum(['fact','method','perspective']),support:z.string(),references:z.array(z.string()).optional(),
  shotNumbers:z.array(z.number().int().positive()),payoffShotNumbers:z.array(z.number().int().positive()),payoff:z.string(),
});
export const EditorialReviewSchema=z.object({
  standard:z.literal('HLNI-v1'),approvedAt:z.string(),contentSnapshot:z.string(),
  checks:z.object({newInformation:z.boolean(),highLeverage:z.boolean(),supported:z.boolean(),integrated:z.boolean(),paysOff:z.boolean()}),
});

export const ShotTypeEnum = z.enum([
  'HOOK',
  'PROBLEM',
  'PATTERN_INTERRUPT',
  'VALUE',
  'PAYOFF',
  'CTA',
  'SCENE',
]);

export const ShotSchema = z.object({
  number: z.number().int().min(1),
  type: ShotTypeEnum,
  functions: z.array(z.enum(NARRATIVE_FUNCTIONS)).optional(),
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
  hookStatement: z.string().optional(), problemStatement: z.string().optional(),
  patternInterruptStatement: z.string().optional(), valueStatement: z.string().optional(),
  payoffStatement: z.string().optional(), ctaStatement: z.string().optional(),
  hookMechanism: z.string().default(''),
  hookText: z.string().default(''),
  hookVisual: z.string().default(''),
  problemType: z.string().default(''),
  patternInterrupt: z.string().default(''),
  valueMechanism: z.string().default(''),
  payoffType: z.string().default(''),
  ctaType: z.string().default(''),
  ctaText: z.string().default(''),
  secondaryTechniques: z.array(z.string()).default(['Storytelling', 'Student Relatable']),
  evidenceRequired: z.boolean().default(false),
  audience: z.string().default('+2 Completed Students'),
});

export const ReelStoryboardSchema = z.object({
  conceptSelection:ConceptSelectionSchema.optional(),
  hlni:z.array(HlniSchema).optional(),
  editorialReview:EditorialReviewSchema.optional(),
  channel: z.enum(['Trust','Connection','Discovery']).optional(),
  generation: z.object({
    source: z.enum(['openai', 'gemini', 'offline']),
    warnings:z.array(z.string()).optional(),
    model: z.string().optional(), generatedAt: z.string(),
    templateId: z.string().optional(), catalogueVersion: z.string().optional(),
  }).optional(),
  id: z.string(),
  reelTitle: z.string().min(1),
  creativeAngle: z.string().min(1),
  objective: z.string().min(1),
  targetAudience: z.string().min(1),
  duration: z.string().min(1),
  format: z.string().default('9:16 Vertical Reel'),
  creativeDirection: z.enum(['Informative', 'Funny', 'Trendy']).default('Informative'),
  language: z.enum(['English', 'Tamil', 'Telugu', 'Malayalam', 'Hindi', 'Tanglish']).default('English'),
  shots: z.array(ShotSchema).min(1),
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

  // Preserve the actual production sequence; never pad, truncate, or impose narrative beats.
  let rawShots = repaired.shots;
  if (!Array.isArray(rawShots) && repaired.storyboard && typeof repaired.storyboard === 'object') {
    const sb = repaired.storyboard;
    rawShots = [sb.hook,sb.problem,sb.patternInterrupt || sb.pattern_interrupt,sb.value,sb.payoff,sb.cta].filter(Boolean);
  }
  if (!Array.isArray(rawShots)) rawShots = [];
  repaired.shots = rawShots.map((rawShot: any, index: number) => {
    const shot = rawShot || {};
    const type = ShotTypeEnum.options.includes(shot.type) ? shot.type : 'SCENE';
    return {
      number: index + 1, type,
      ...(shot.functions !== undefined ? {functions:shot.functions} : {}),
      name: shot.name || (type === 'SCENE' ? `Scene ${index + 1}` : type.replaceAll('_',' ')),
      timestamp: shot.timestamp || shot.time || '',
      visual: shot.visual || '',
      dialogue: shot.dialogue ?? shot.dialogueVO ?? shot.vo ?? '',
      onscreenText: shot.onscreenText ?? shot.text ?? '',
      cameraPerformance: shot.cameraPerformance || shot.camera || '',
      userEdited: Boolean(shot.userEdited),
    };
  });

  // Metadata is optional diagnostic context, never a fabricated six-beat checklist.
  const rawFm = repaired.frameworkMetadata || raw.framework_metadata;
  if (rawFm && typeof rawFm === 'object') repaired.frameworkMetadata = rawFm;
  else delete repaired.frameworkMetadata;

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
    keyCreativeIdea: rawSum.keyCreativeIdea || repaired.keyCreativeIdea || 'Review the story-specific useful insight and resolution.',
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

  return { valid: true, data: enforceEditorialStatus(parseResult.data), errors: [] };
}
