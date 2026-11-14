import type { ConceptSelection } from './concepts.js';
import type { ContentChannel } from './channels.js';
import type { HlniCandidate, EditorialReview } from './hlni.js';
export type NarrativeFunction =
  | 'HOOK'
  | 'PROBLEM'
  | 'PATTERN_INTERRUPT'
  | 'VALUE'
  | 'PAYOFF'
  | 'CTA';
export type ShotType = NarrativeFunction | 'SCENE';

export interface Shot {
  number: number; // Sequential production shot number
  type: ShotType;
  functions?: NarrativeFunction[]; // Optional diagnostic tags; a scene can combine functions
  name: string;
  timestamp: string; // e.g. "00:00 – 00:04"
  visual: string;
  dialogue: string;
  onscreenText: string;
  cameraPerformance: string;
  userEdited?: boolean;
}

export interface ProductionNotes {
  visualStyle: string;
  performance: string;
  camera: string;
  editing: string;
  sound: string;
  props: string[];
  locations: string[];
  casting: string;
  complexity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface CreativeSummary {
  keyCreativeIdea: string;
  shootingPriority: string[];
}

export type CreativeDirection =
  | 'Informative'
  | 'Funny'
  | 'Trendy';

export type CreativeTreatment = CreativeDirection | 'Auto';

export type LanguageOption = 'English' | 'Tamil' | 'Telugu' | 'Malayalam' | 'Hindi' | 'Tanglish';

export type ProjectStatus =
  | 'Draft'
  | 'Ready for Production'
  | 'Shot'
  | 'Edited'
  | 'Published'
  | 'Archived';

export interface ViralBlueprint {
  viralScore: number;
  obviousAngleAvoided: string;
  humanTruth: string;
  hiddenProblem: string;
  centralInformationGap: string;
  contentTension: string;
  progressiveRevelation: string[];
  contentSurprise: string;
  practicalValue: string;
  payoff: string;
  shareTrigger: string;
  saveTrigger: string;
  commentTrigger: string;
  joyUniversityConnection: string;
  directorInstruction: string;
}

export interface FrameworkMetadata {
  creativeType: 'Informative' | 'Funny' | 'Trendy';
  // User-facing Reel Blueprint — the 6 actual content elements
  hookStatement?: string;       // Optional diagnostic notes; functions may combine or be omitted
  problemStatement?: string;
  patternInterruptStatement?: string;
  valueStatement?: string;
  payoffStatement?: string;
  ctaStatement?: string;
  // Internal (kept for AI knowledge engine fallback compatibility)
  hookText?: string;
  ctaText?: string;
}

export interface GenerationSource {
  source: 'openai' | 'gemini' | 'offline';
  warnings?:string[];
  templateId?: string;
  catalogueVersion?: string;
  model?: string;
  generatedAt: string;
}

export interface ReelStoryboard {
  conceptSelection?:ConceptSelection;
  hlni?:HlniCandidate[];
  editorialReview?:EditorialReview;
  channel?: ContentChannel;
  generation?: GenerationSource;
  id: string;
  reelTitle: string;
  creativeAngle: string;
  objective: string;
  targetAudience: string;
  duration: string;
  format: string; // "9:16 Vertical Reel"
  creativeDirection: string;
  language: LanguageOption;
  shots: Shot[]; // Story-led shot count and pacing
  productionNotes: ProductionNotes;
  creativeSummary: CreativeSummary;
  viralBlueprint?: ViralBlueprint;
  frameworkMetadata?: FrameworkMetadata;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  status: ProjectStatus;
  version: number;
}

export interface ReelProject {
  id: string;
  title: string;
  currentVersionId: string;
  createdAt: string;
  updatedAt: string;
  status: ProjectStatus;
  tags: string[];
  versions: ReelStoryboard[];
}

export interface GenerateReelRequest {
  channel?: ContentChannel;
  reelTitle: string;
  creativeDirection?: CreativeTreatment;
  language?: LanguageOption;
  duration?: string;
  toneShift?: string;
  apiKey?: string;
  apiProvider?: 'gemini' | 'openai';
}

export interface RegenerateShotRequest {
  reelTitle: string;
  creativeAngle: string;
  targetAudience: string;
  shotNumber: number;
  shotType: ShotType;
  currentStoryboard: ReelStoryboard;
  instruction?: string;
  apiKey?: string;
  apiProvider?: 'gemini' | 'openai';
}

// ─── QUALITY TEST ENGINE & EVIDENCE AUDIT TYPES ───

export type ClaimSeverity =
  | 'P0_CRITICAL' // Misleading/statutory (UGC, accreditation, placements, salary, ranking, fees, scholarships, official dates)
  | 'P1_HIGH'     // Specific institutional metric (104+ acres, student count, labs, partnerships)
  | 'P2_MEDIUM'   // Non-material claims ("largest", "leading", "industry-ready", "award-winning")
  | 'P3_CREATIVE'; // Emotional/rhetorical language (no factual verification needed)

export type QAStatus =
  | 'PASS'
  | 'PASS — VERIFICATION REQUIRED'
  | 'FAIL'
  | 'PIPELINE ERROR';

export interface ClaimAuditItem {
  claim: string;
  severity: ClaimSeverity;
  sourceType: 'USER_SUPPLIED' | 'KB_VERIFIED' | 'GENERAL_KNOWLEDGE' | 'EMOTIONAL_RHETORICAL' | 'UNVERIFIED_UNIVERSITY_CLAIM';
  status: 'VERIFIED' | 'VERIFICATION_REQUIRED' | 'UNSUPPORTED' | 'ACCEPTABLE_CREATIVE';
  notes?: string;
}

export interface QAScorecard {
  hook: number;
  humanTruth: number;
  audience: number;
  story: number;
  value: number; // Disaggregated: Emotional vs Practical
  valueType: 'PRACTICAL_EDUCATIONAL' | 'EMOTIONAL_RESONANT';
  visual: number;
  originality: number;
  factualAccuracy: number;
  brandIntegration: number;
  productionReadiness: number;
}

export interface QAEvaluationReport {
  status: QAStatus;
  overallScore: number | 'NOT SCORED';
  scorecard?: QAScorecard;
  evidenceAudit: ClaimAuditItem[];
  failures: string[];
  warnings: string[];
  whatWorked: string[];
  requiredFixes: string[];
  regressionRisk: 'LOW' | 'MEDIUM' | 'HIGH';
}
