import { FLEXIBLE_CREATIVE_FRAMEWORK, findCtaShot, hasFunction, ctaActionGroups } from '../shared/creativeFramework.js';
import { hlniIssues, HLNI_CREATIVE_CONTRACT } from '../shared/hlni.js';
import { conceptDeliveryIssues } from '../shared/concepts.js';
import { approvedBenchmarkPrompt } from '../shared/editorialBenchmarks.js';
import { PROVIDER_MODELS } from '../shared/providers.js';
import { applyDialogueRepair, buildDialogueRepair, normalizeComparisonCaptions, speechUnits, sceneSeconds } from './outputRepair.js';
import { AiProviderError, providerResponseError, transportError } from './aiErrors.js';
import { channelPrompt, validateChannel, CHANNEL_STRATEGIES } from '../shared/channels.js';
import { proposedProgrammeContext } from '../shared/proposedProgrammes.js';
import { recordCreativeDNA } from './creativeMemory.js';
import { selectReelConcept, recentConceptOutcomes, rememberConceptOutcome } from './conceptPlanner.js';
import { ensureActive, requestSignal, advisoryReserve, ADVISORY_CRITIQUE_MS, FINALISATION_MS, MIN_WRITER_MS, type GenerationTrace } from './requestBudget.js';
import { reviewStoryboard } from './editorialReview.js';
import { providerJsonClient } from './providerClient.js';
import { normalizeScriptText, detectGenericLanguage } from './genericLanguageDetector.js';
import { GenerateReelRequest, RegenerateShotRequest, ReelStoryboard, Shot, LanguageOption, CreativeDirection } from '../shared/types.js';
import { validateAndRepairStoryboard } from '../shared/schema.js';
import { generateKnowledgeEngineStoryboard, analyzeTitle } from './knowledgeEngine.js';

export const SYSTEM_PROMPT = `
# JOY UNIVERSITY — REEL CREATIVE DIRECTOR
Turn the user's idea into a specific, natural, audience-relevant story. The original idea and required comparison subjects are the source of truth. Understand the question, student tension, useful insight and satisfying outcome before choosing the concept, treatment, sequence or shot count.

${FLEXIBLE_CREATIVE_FRAMEWORK}

AUTHENTICITY AND FRESHNESS
Write for the ear: short natural lines, human specificity, pauses where useful. Avoid brochure language, buzzwords, interchangeable marketing and unrelated jokes. Avoid the obvious version of the idea; create a fresh angle grounded in a real student question or situation.
Do not use these AI clichés: Are you ready?; Here's the secret; Did you know; Stop scrolling; In today's fast-paced world; Unlock your potential; Your journey starts here; 3 things you need to know; This will change everything; Most people don't know; Here's what nobody tells you.
Treatments guide delivery without fixing a sequence: Informative builds understanding; Funny finds humour in the actual situation; Trendy uses relevant contemporary formats. Do not invent currently trending audio or participation claims without a supplied reference. The selected treatment can be adapted to serve the strongest story.

FACTUAL ACCURACY AND LANGUAGE
Never invent syllabuses, facilities, testimonials, statistics, placements, salary outcomes, rankings, approval, admissions status, or external resources. Proposed programmes must remain explicitly proposed. Use specific degrees only when relevant and supported; brand integration is optional and natural, not a forced promotional ending.
Use the requested language for dialogue and on-screen text. For Tamil, Telugu, Malayalam and Hindi, use native script rather than romanized speech. Canonical degree identifiers may remain in Latin letters.
${proposedProgrammeContext()}

PRODUCTION OUTPUT CONTRACT
Return one JSON storyboard with the fields below. The shots array has one entry per actual production shot; the one entry shown is a field illustration, not a suggested shot count, order or story. Add as many entries as needed. Use original scene names. type may be SCENE or a legacy function label; optional functions can contain zero, one or several diagnostic labels from HOOK, PROBLEM, PATTERN_INTERRUPT, VALUE, PAYOFF, CTA. These tags never determine shot order or count and are not required for success.
{
  "reelTitle": "Original topic",
  "creativeAngle": "Chosen concept and perspective",
  "objective": "Useful outcome for this audience",
  "targetAudience": "Relevant target student",
  "duration": "Requested duration",
  "creativeDirection": "Requested treatment",
  "language": "Requested language",
  "shots": [{
    "number": 1,
    "type": "SCENE",
    "functions": [],
    "name": "Specific production scene name",
    "timestamp": "Actual start and end as MM:SS – MM:SS",
    "visual": "Concrete shootable action",
    "dialogue": "Natural spoken line or empty for a silent shot",
    "cameraPerformance": "Practical camera direction and performance",
    "onscreenText": "Brief graphic or empty when unnecessary"
  }],
  "productionNotes": {
    "visualStyle": "Concept-specific approach", "performance": "Natural delivery",
    "camera": "Practical choices", "editing": "Story-led rhythm", "sound": "Sound and silence",
    "props": [], "locations": [], "casting": "Realistic cast", "complexity": "LOW"
  },
  "creativeSummary": {"keyCreativeIdea": "Useful insight and how the story resolves", "shootingPriority": []},
  "hlni": [{
    "insight":"The specific non-obvious information delivered in the shots",
    "audienceGap":"What this target student currently assumes or does not know",
    "viewerChange":"Which decision, understanding or practical action changes and how",
    "supportType":"fact, method or perspective — choose one",
    "support":"Credible reasoning, factual qualification or method rationale; not a self-verification claim",
    "references":[],
    "shotNumbers":[1],
    "payoffShotNumbers":[1],
    "payoff":"How the actual story demonstrates why this insight matters"
  }]
}
HLNI references must identify the actual shots where the insight and payoff are communicated; they may be the same shot. For facts give real verifiable reference(s), never invented citations. For a method/perspective explain its reasoning and limitations. Propose at least one substantive HLNI, not generic reassurance or advice. Do not output editorial approval.
Timecodes must run consecutively from 00:00 to the requested duration with positive shot lengths. Use unequal lengths when appropriate. Keep spoken lines within natural delivery time, allowing pauses. Silent visual storytelling is valid. Return no fabricated scores or mandatory stage checklist.
Before returning, check coherence, audience relevance, useful insight, satisfying resolution, factual precision, natural language, fresh concept and production feasibility. A missing standalone stage or CTA is not a failure.
`;

// ——— PRODUCTION ARCHITECTURE ENGINES ———

export interface ContentCore {
  topic: string;
  viewer: string;
  question: string;
  problem: string;
  intent: string;
  takeaway: string;
  entities: string[];
}

export function extractContentCore(title: string): ContentCore {
  const analysis = analyzeTitle(title);
  
  // Extract key entities from title
  const entities: string[] = [];
  if (title.toLowerCase().includes('b.tech')) entities.push('B.Tech');
  if (title.toLowerCase().includes('b.sc')) entities.push('B.Sc');
  if (title.toLowerCase().includes('b.com')) entities.push('B.Com');
  if (/\bbba\b/i.test(title)) entities.push('BBA');
  if (/\bai\b/i.test(title)) entities.push('AI');
  if (title.toLowerCase().includes('math')) entities.push('Maths');
  if (title.toLowerCase().includes('code') || title.toLowerCase().includes('coding')) entities.push('Coding');
  if (title.toLowerCase().includes('robot')) entities.push('Robotics');

  const comparison = title.match(/^\s*(.+?)\s+(?:vs\.?|versus)\s+(.+?)\s*[?!]*$/i);
  if (comparison) return {
    topic: analysis.cleanTopic, viewer: '+2 students comparing higher-education choices',
    question: `How should a student compare ${comparison[1]} and ${comparison[2]}?`,
    problem: 'The student needs a useful subject comparison without stereotypes or assuming either degree guarantees a career.',
    intent: 'Answer the original comparison without stereotypes. Preserve both subjects; select the useful insight and creative concept before writing scenes.',
    takeaway: 'Not predetermined. The selected concept must deliver a credible, audience-relevant HLNI and demonstrate its consequence. Do not invent curriculum contents or guaranteed outcomes.',
    entities: entities.length ? entities : [comparison[1], comparison[2]],
  };

  return {
    topic: analysis.cleanTopic,
    viewer: "+2 completed student evaluating higher education choices (ages 17–19)",
    question: `What useful information or understanding should the target viewer gain about "${analysis.cleanTopic}"?`,
    problem: `The viewer needs a specific, credible answer to the original idea, not a generic category script.`,
    intent: `Help the student make a clear, empowered choice without superficial marketing fluff.`,
    takeaway: 'Not predetermined. Select a useful insight and satisfying outcome for this specific idea before storyboarding.',
    entities: entities.length > 0 ? entities : [analysis.cleanTopic],
  };
}

// ——— MULTI-GATE QA AUDITOR ———
export interface QAResult {
  pass: boolean;
  failedGate?: string;
  failureReason?: string;
  repairInstruction?: string;
}

const STOP_WORDS = new Set(['about', 'after', 'with', 'from', 'should', 'which', 'what', 'why', 'how', 'when', 'the', 'for', 'and', 'this', 'that', 'your', 'you', 'learn', 'is', 'are', 'in', 'on', 'at', 'to', 'of']);

export function runMultiGateQA(
  storyboard: ReelStoryboard,
  core: ContentCore,
  targetLanguage: LanguageOption,
  creativeDirection: CreativeDirection
): QAResult {
  // Production structure, independent of the narrative-function matrix.
  if (!storyboard.shots?.length) return {
    pass:false, failedGate:'Gate 1 & 2 (Production structure)', failureReason:'A storyboard needs at least one production shot.',
    repairInstruction:'Return the production shots the story needs; do not pad to a fixed count.',
  };
  if (storyboard.shots.some((shot,i)=>shot.number !== i+1 || !shot.visual?.trim() || !shot.cameraPerformance?.trim())) return {
    pass:false, failedGate:'Gate 1 & 2 (Production fields)', failureReason:'Shots need sequential numbers, visual action and camera direction.',
    repairInstruction:'Preserve the story-led shot count and sequence; complete the missing production fields. Silent shots are allowed.',
  };

  if (targetLanguage === 'English') {
    const endings=storyboard.shots.filter((shot,i)=>hasFunction(shot,'CTA') || i===storyboard.shots.length-1);
    const actions=new Set(endings.flatMap(shot=>ctaActionGroups(shot.dialogue+' '+shot.onscreenText)));
    if (actions.size>1) return {pass:false,failedGate:'Delivery (CTA)',failureReason:'The ending requests several different engagement actions.',
      repairInstruction:'Retain at most one relevant next action, or omit the CTA if the ending is stronger without it. Preserve the story and its resolution.'};
  }
  const fullText = storyboard.shots.map(s => `${s.dialogue} ${s.onscreenText}`).join(' ');
  const normalizedText = normalizeScriptText(fullText);
  for (const entity of core.entities) {
    const entityLower = entity.toLowerCase();
    const entityWords = entityLower.split(/\s+/).filter(w => w.length >= 2 && !STOP_WORDS.has(w));
    if (entityWords.length > 0) {
      const matchHits = entityWords.filter(w => normalizedText.includes(w));
      if (matchHits.length === 0) {
        return {
          pass: false,
          failedGate: "Gate 3 (Idea Fidelity & Entity Persistence)",
          failureReason: `Required core entity/topic "${entity}" disappeared from the generated script.`,
          repairInstruction: `Preserve the core topic "${entity}" throughout the script. Do NOT replace the user's idea with an unrelated topic.`
        };
      }
    }
  }

  
  const topicWords = core.topic.toLowerCase().split(/\s+/).filter(w => w.length >= 2 && !STOP_WORDS.has(w));
  if (topicWords.length > 0) {
    const topicHits = topicWords.filter(w => normalizedText.includes(w));
    if (topicHits.length === 0) {
      return {
        pass: false,
        failedGate: "Gate 3 (Idea Fidelity & Topic Drift)",
        failureReason: `Script drifted entirely away from original topic "${core.topic}".`,
        repairInstruction: `Restore the user's original topic "${core.topic}". The generated reel must remain 100% faithful to the user's idea.`
      };
    }
  }

  // Gate 5: Language & Script Compliance Check
  const langCheck = checkLanguageCompliance(storyboard, targetLanguage);
  if (!langCheck.pass) {
    return {
      pass: false,
      failedGate: "Gate 5 (Language & Script Compliance)",
      failureReason: langCheck.reason,
      repairInstruction: `Ensure dialogue and on-screen graphics strictly use the native script of ${targetLanguage}. Do not output generic English placeholders.`
    };
  }

  // Gate 6: Authenticity Engine & Cliché Ban Check
  const bannedPhrases = [
    "are you ready",
    "here's the secret",
    "did you know",
    "stop scrolling",
    "fast-paced world",
    "unlock your potential",
    "your journey starts here",
    "3 things you need to know",
    "this will change everything",
    "most people don't know",
    "here's what nobody tells you"
  ];

  for (const phrase of bannedPhrases) {
    if (normalizedText.includes(phrase)) {
      return {
        pass: false,
        failedGate: "Gate 6 (Authenticity Engine — AI Cliché Ban)",
        failureReason: `Banned AI cliché detected: "${phrase}"`,
        repairInstruction: `Remove the cliché phrase "${phrase}". Use authentic, conversational student dialogue written for speech.`
      };
    }
  }


  const seconds = parseInt(storyboard.duration,10);
  const speech = storyboard.shots.map(shot => shot.dialogue).join(' ');
  const units = speechUnits(speech, targetLanguage);
  const limit = seconds * (targetLanguage === 'English' ? 2.5 : 12);
  if (seconds > 0 && units > limit) return {
    pass:false, failedGate:'Delivery (Spoken pacing)', failureReason:`Dialogue has ${units} ${targetLanguage === 'English' ? 'words' : 'graphemes'}; maximum ${Math.floor(limit)} for ${seconds} seconds.`,
    repairInstruction:`Rewrite the scenes as one concise story. Use at most ${Math.floor(limit)} ${targetLanguage === 'English' ? 'English words' : 'graphemes'} of dialogue in total. Keep any purposeful CTA optional and match each spoken line to its scene duration.`,
  };
  if (targetLanguage === 'English') for (const shot of storyboard.shots) {
    const times = [...shot.timestamp.matchAll(/(\d+):(\d{2})/g)].map(m => Number(m[1])*60+Number(m[2]));
    if (times.length === 2 && times[1] > times[0] && shot.dialogue.trim().split(/\s+/).length > (times[1]-times[0])*3) return {
      pass:false,failedGate:'Delivery (Scene pacing)',failureReason:`Shot #${shot.number} has too much dialogue for its timestamp.`,
      repairInstruction:`Shorten shot #${shot.number} to at most ${Math.floor((times[1]-times[0])*3)} spoken words while preserving story coherence, useful insight and resolution; do not add a CTA.`,
    };
  }

  // Gate 8: Creative Originality & Freshness Check
  const langAudit = detectGenericLanguage(storyboard);
  if (langAudit.generic || langAudit.interchangeable) {
    return {
      pass: false,
      failedGate: "Gate 8 (Creative Originality & Freshness — AI Phrasing & Interchangeability)",
      failureReason: langAudit.reason || "Script contains generic AI or interchangeable university marketing phrasing.",
      repairInstruction: "Rewrite dialogue in natural spoken student language. Remove buzzwords like 'fast-paced world', 'unlock your potential', or 'world-class education'. Sound like a real person talking on camera."
    };
  }

  // Usefulness and resolution are reviewed from the whole story. Function tags
  // cannot establish creative quality, and missing standalone beats are valid.
  return { pass: true };
}




export async function generateStoryboard(req: GenerateReelRequest, options: { maxRepairs?:number; timeoutMs?:number; maxOutputTokens?:number; totalTimeoutMs?:number; includeDiagnosticTags?:boolean; signal?:AbortSignal; onStage?:(event:GenerationTrace)=>void; onQualityFailure?:(candidate:ReelStoryboard|undefined,qa:QAResult)=>void } = {}): Promise<ReelStoryboard> {
  const deadline = Date.now() + Math.min(options.totalTimeoutMs || 50000,50000);
  ensureActive(options.signal);
  const channel = validateChannel(req.channel);
  const title = (req.reelTitle || '').trim();
  const direction = req.creativeDirection || 'Auto';
  const language = req.language || 'English';
  const duration = req.duration || '28 sec';
  const apiKey = req.apiKey || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.log('[AI Service] No API Key provided, returning Knowledge Engine storyboard.');
    return generateKnowledgeEngineStoryboard(title, direction, language, duration, 1, channel);
  }

  // STEP 1: EXTRACT & LOCK CONTENT CORE
  const contentCore = extractContentCore(title);
  if (channel) contentCore.viewer = CHANNEL_STRATEGIES[channel].audience;
  console.log('[AI Service] 🔒 Content Core Locked:', contentCore);

  const isGemini = req.apiProvider ? req.apiProvider === 'gemini'
    : (apiKey.startsWith('AIza') || apiKey.startsWith('AQ.') || Boolean(process.env.GEMINI_API_KEY));
  const requestCandidate = providerJsonClient({provider:isGemini?'gemini':'openai',apiKey,deadline,
    timeoutMs:options.timeoutMs || 45000,maxOutputTokens:options.maxOutputTokens,signal:options.signal,onStage:options.onStage});
  // Select and compare insights/mechanisms before any production shot is requested.
  const conceptSelection = await selectReelConcept({topic:title,language,treatment:direction,duration,channel,
    accountKey:apiKey,provider:isGemini?PROVIDER_MODELS.gemini:PROVIDER_MODELS.openai,
    recent:recentConceptOutcomes(apiKey,isGemini?PROVIDER_MODELS.gemini:PROVIDER_MODELS.openai,title),
    maxRepairs:options.maxRepairs ?? 1,signal:options.signal,request:instruction=>requestCandidate(instruction,'concept')});
  const selectedConcept=conceptSelection.selected;

  // STEP 3: CREATIVE TRANSFORMATION (6x3 MATRIX & PROMPT BUILD)
  const writerPolicy=`You are Joy University's Reel Creative Director. Write only the selected concept for the original topic and target student.
Story first: narrative functions can combine, move or be omitted. No fixed shot count, equal timings, compulsory interrupt or compulsory CTA. Deliver useful information and a satisfying outcome. Use at most one purposeful next action if it strengthens the ending.
${HLNI_CREATIVE_CONTRACT}
Write natural speech and concrete shootable actions. Avoid brochure language and these clichés: Are you ready; Here's the secret; Did you know; Stop scrolling; fast-paced world; unlock your potential; your journey starts here; 3 things you need to know; this will change everything; most people don't know; here's what nobody tells you.
Do not invent curricula, degree-specific subjects, subject overlap, facilities, outcomes, statistics, proof screens or sources. Never assert that named degrees share subjects without actual supplied sources. The selected example is illustrative, not an institutional fact or aptitude test. Retain its limitations and supported conclusion. Dialogue and graphics use the requested native script, except canonical degree identifiers.\n`;
  const outputContract=SYSTEM_PROMPT.slice(SYSTEM_PROMPT.indexOf('PRODUCTION OUTPUT CONTRACT'));
  const academicContext=/2027|2028|propos|quantum|healthcare technology|semiconductor/i.test(title)?proposedProgrammeContext():'';
  const prompt = writerPolicy + academicContext + outputContract + `

${channelPrompt(channel)}
${approvedBenchmarkPrompt(channel)}
${options.includeDiagnosticTags?'For this evaluation artifact, include a functions array on EVERY shot. Use zero or more accurate diagnostic tags from HOOK, PROBLEM, PATTERN_INTERRUPT, VALUE, PAYOFF, CTA. Use [] when none applies. These tags describe the chosen story after concept selection; do not add, split, reorder or pad scenes to cover the labels.':''}

==================================================
🔒 LOCKED CONTENT CORE (PRIMARY DIRECTIVE — DO NOT DRIFT)
==================================================
- TOPIC: ${contentCore.topic}
- TARGET VIEWER: ${contentCore.viewer}
- CENTRAL QUESTION: ${contentCore.question}
- REAL STUDENT PROBLEM: ${contentCore.problem}
- INTENDED INTENT: ${contentCore.intent}
- FINAL TAKEAWAY: ${contentCore.takeaway}
- REQUIRED ENTITIES TO PRESERVE: ${contentCore.entities.join(', ')}

==================================================
SELECTED CONCEPT AND HLNI — chosen before shots
==================================================
${JSON.stringify(selectedConcept,null,2)}
This concept has already been compared with the other channels before drafting. Do not select a new concept while writing.
Deliver the selected insight in the actual story, not just metadata. Show the operational method, how its result is interpreted, and the observable payoff. Do not fall back to a student highlighting two module lists unless that is the selected concept's actual mechanism. Do not fabricate academic evidence or omit the selected concept's qualifications.
Show the selected method's recording/comparison step and the concrete next question or action that follows. Use readable graphics or action to carry steps within the speech budget. Do not replace a demonstrated result with a smile, a closed laptop, 'pick what fits', 'trust your energy' or a confident brochure choice. If the concept is exploratory, keep that limit in the spoken/visible story. Use fewer words rather than dropping the useful tool. Do not add diagnostic claims absent from the selected plan.
Demonstrate this selected concrete example and observation: ${JSON.stringify(selectedConcept.demonstration)}.
Display or speak the selected visibleInput verbatim so the viewer sees an actual sample, not merely an unspecified case-study page. The task/card and result can appear in any shot or combined exchange; they do not add a mandatory stage.
Include the selected nextQuestion verbatim in dialogue or on-screen text somewhere in the story, so the decision consequence is visible rather than buried in metadata. It is the method's concrete outcome, not a forced engagement CTA or an extra scene; it can appear early, late or within a combined exchange.
For an aggregate counterexample, use only clearly labelled illustrative numbers with neutral A/B labels. Never assign invented totals, credits or components to B.Com/BBA. Show the arithmetic so the result can be checked. Label the example as illustrative in the actual dialogue or graphic.
The selected concept does not prescribe shot count, order, pacing, mandatory functions or CTA. Translate its idea into the strongest connected production story for the time budget.

==================================================
CREATIVE TRANSFORMATION (6x3 MATRIX)
==================================================
- CREATIVE DIRECTION: "${direction.toUpperCase()}"
- TARGET LANGUAGE: "${language.toUpperCase()}"
- LANGUAGE CONTRACT: ${language === 'English' ? 'Use English dialogue and on-screen text.' : language === 'Tanglish' ? 'Tanglish may use romanized Tamil mixed with English.' : `Use native-script ${language} for every spoken line and on-screen phrase. Romanized ${language} or Tanglish is invalid. Only canonical degree identifiers such as B.Com and BBA may remain in Latin letters; translate surrounding prose and technical terms.`}
- SPOKEN WORD LIMIT: ${Math.floor((parseInt(duration,10) || 28) * 2.5)} total English words maximum. Keep each scene brief enough for its timestamp. In native languages use comparably concise speech.
- RESOURCE RULE: No link, guide, brochure, DM service or admissions destination was supplied. Do not invent one or say link in bio. Use at most one relevant next action if it strengthens the story; otherwise omit the CTA.
- DURATION: "${duration}"

User Idea: "${title}"
Selected Creative Type: "${direction}"
${direction === 'Auto' ? 'Choose the strongest treatment based on topic, target student, channel objective and storytelling opportunity. Set creativeDirection in the output to Informative, Funny or Trendy to describe the chosen execution.' : 'Use the selected treatment as guidance, not a rigid format.'}
Selected Language: "${language}"

Build the selected concept for the original user idea. Do not replace it with a random territory, a category-level takeaway or another channel's selected mechanism.
CHANNEL EXECUTION IS A PRIMARY REQUIREMENT:
${channelPrompt(channel)}
Let the selected channel's purpose influence the strongest storytelling opportunity. The matrix offers possibilities, not mandatory openings, devices, emotional tones or sequences. Trust may entertain, Connection may educate, Discovery may be emotional.
CRAFT DELIVERY STANDARD:
The named degree comparison must matter to the development and resolution, not appear only as an opening label. Show what the student knew/assumed BEFORE the method and what specifically changes AFTER it.
Trust: explain a simple academic example and the concrete consequence of checking its marking criteria. A hypothetical criterion may be revealed as part of a clearly labelled illustrative task, never as a claim about either degree. If the criterion is unknown, the resulting question must ask about the criterion, not the already known task. Make clear how the answer would change preparation or comparison.
Connection: a specific human decision should drive the scene. Let dialogue, interaction or action demonstrate why this person needed the method and how their next step changes. A lone presenter reciting a checklist is not a believable dilemma by itself. Keep one method and one academic concept consistent.
Discovery: make the challenge and its reveal answer a misconception within the original comparison. Missing evidence supports only 'not enough information'; make that third answer useful by showing exactly which missing link would resolve the question. No fabricated syllabus, subject overlap, exclusive degree labels or unrelated guessing game.
These are quality objectives, not fixed formats, shots, narrative order or treatments.
EDITORIAL SELF-REVIEW BEFORE RETURNING JSON (revise silently, never self-approve):
1. State the student's concrete initial confusion to yourself. Does every scene develop that same conflict and selected HLNI?
2. Check every academic term across dialogue, props and graphics: a prerequisite, a compulsory subject, an elective and an assessment criterion are different things. Use one consistent investigation.
3. Does a +2 student understand the example immediately? Prefer a simple school-level task to financial or technical jargon. Use the short selected sample without reciting all graphic text aloud.
4. Show a meaningful before/after: what the student would have asked or assumed before, and what specific better question/action the example now enables. The answer may remain unknown; make the improvement in the student's decision process observable. A confident nod is not resolution.
5. Retain the original named comparison in actual speech/graphics, including at the reveal or its consequence. Neutral illustrative A/B data cannot replace the user's topic. Explain why the reveal matters for comparing those degrees WITHOUT assigning imaginary facts to either degree.
6. Make the selected channel experience recognisable through the human situation and execution, not just its title. Check supported claims, readable graphics, shootable actions and natural speaking time. Remove generic advice and unsupported conclusions.
Do not output this private review or ratings. Keep the selected concept and flexible narrative format.
FINAL DELIVERY CHECK BEFORE RETURNING JSON:
The requested duration is ${duration}. Aim for ${Math.floor((parseInt(duration,10) || 28)*2)} total spoken words in English, leaving room for pauses. The hard maximum is ${Math.floor((parseInt(duration,10) || 28)*2.5)} words across ALL dialogue fields combined. Count them before returning. Each scene must fit its timestamp at no more than three spoken words per second. Shorten the speech rather than increasing the requested duration. Choose the shot count and unequal shot lengths to serve the story, within this duration.
Final content continuity check: the actual dialogue/graphics must contain ${JSON.stringify(selectedConcept.demonstration?.visibleInput)} and ${JSON.stringify(selectedConcept.demonstration?.nextQuestion)}. ${options.includeDiagnosticTags?'Include the functions array on every shot (or []), without adding scenes to cover functions.':''}
Return ONLY valid JSON.
`;

  try {
    let instruction = prompt;
    let candidate!: ReelStoryboard;
    let dialogueRepair = false;
    let editorialReviewed = false;
    let validCandidate:ReelStoryboard|undefined;
    let optionalRewrite=false;
    let lastWriterMs=0;
    const warnings:string[]=[];
    const advisoryEvent=(outcome:string,category?:string)=>options.onStage?.({stage:'advisory',outcome,category,elapsedMs:0,remainingMs:Math.max(0,deadline-Date.now())});
    const maxRepairs = options.maxRepairs ?? 2;
    for (let attempt = 0; attempt <= maxRepairs; attempt++) {
      ensureActive(options.signal);
      const writingStarted=Date.now();
      let raw:string;
      try {
        raw=await requestCandidate(instruction,'story',dialogueRepair?'dialogue':'story',
          {stage:optionalRewrite?'advisory_rewrite':attempt?'repair':'story',deadline:deadline-FINALISATION_MS,timeoutMs:options.timeoutMs || 45000});
      } catch(error) {
        ensureActive(options.signal);
        if(!validCandidate)throw error;
        candidate=validCandidate;
        const category=error instanceof AiProviderError?error.category:'invalid_response';
        warnings.push(`Optional advisory rewrite did not complete (${category}). The validated initial Draft was retained; editorial review is still required.`);
        advisoryEvent('retained_valid_draft',category);break;
      }
      lastWriterMs=Date.now()-writingStarted;
      let qa: QAResult;
      try {
        const parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, '').trim());
        const validation = validateAndRepairStoryboard(dialogueRepair ? applyDialogueRepair(candidate, parsed) : parsed, title);
        if (!validation.valid) throw new Error('Storyboard schema validation failed');
        candidate = validation.data;
        candidate.language = language;
        candidate.creativeDirection = direction === 'Auto' ? candidate.creativeDirection : direction;
        candidate.channel = channel;
        candidate.conceptSelection = conceptSelection;
        if (channel) candidate.targetAudience = CHANNEL_STRATEGIES[channel].audience;
        candidate = normalizeComparisonCaptions(candidate);
        qa = runMultiGateQA(candidate, contentCore, language, candidate.creativeDirection as CreativeDirection);
        if(qa.pass && options.includeDiagnosticTags && candidate.shots.some(shot=>!Array.isArray(shot.functions))) {
          qa={pass:false,failedGate:'Diagnostic function tags',failureReason:'The requested evaluation artifact omits diagnostic function arrays.',
            repairInstruction:'Include functions on each existing shot, using accurate optional narrative-function tags (or [] if none applies). Preserve the story-led shot count, order and treatment; no stage coverage checklist.'};
        }
        if(qa.pass && !candidate.hlni?.some(insight=>hlniIssues(insight,candidate).length===0)) {
          qa={pass:false,failedGate:'HLNI proposal',failureReason:'No complete HLNI proposal identifies the audience gap, practical change, support, insight shots and payoff shots.',
            repairInstruction:'Develop one non-obvious, useful, credible insight within the actual story. Add complete hlni metadata with valid shot references and meaningful payoff. Generic advice or metadata alone does not count; communicate the insight in the scenes. Keep the flexible shot count and optional interrupt/CTA. Do not invent evidence or self-approve.'};
        }
        const deliveryIssues=conceptDeliveryIssues(candidate,selectedConcept);
        if(qa.pass && deliveryIssues.length)qa={pass:false,failedGate:'Concept delivery',failureReason:deliveryIssues.join(' '),
          repairInstruction:deliveryIssues.join(' ')+'. Preserve the selected concrete example, recorded observation and limitations. These can appear in any shot or combined exchange; do not add a compulsory scene or CTA.'};
        const actualClaims=candidate.shots.map(s=>[s.dialogue,s.onscreenText,s.visual].join(' ')).join(' ')+' '+candidate.hlni?.map(h=>h.insight+' '+h.support).join(' ');
        if(qa.pass && /\bB\.?\s*Com\s+lens|\bBBA\s+lens|core subjects (?:often overlap|are identical)|a degree is only as good|is a reliable indicator|reveals? the true academic path/i.test(actualClaims)) {
          qa={pass:false,failedGate:'Concept credibility',failureReason:'The story adds an unsupported degree classification or predictive claim to a bounded reasoning tool.',
            repairInstruction:'Remove the unsupported degree-lens, universal curriculum or predictive claim. Preserve the selected reasoning tool, illustrative example, specific observation, resulting question and limitations. No academic evidence was supplied.'};
        }
        if(qa.pass && selectedConcept.basisId==='insufficient_information' && /hint:\s*(?:it is )?neither|answer:\s*neither|(?:it|this) (?:is|belongs to) neither|it['’]s both|it is both|answer(?: is|:) both/i.test(actualClaims))
          qa={pass:false,failedGate:'Concept credibility',failureReason:'Lack of evidence has been turned into an unsupported negative classification.',
            repairInstruction:'Use the supported conclusion: not enough information. Do not say neither, either or both without evidence. Preserve the concrete example and the question about missing evidence.'};
        if(qa.pass && selectedConcept.basisId==='aggregate_counterexample') {
          const visible=candidate.shots.map(s=>s.dialogue+' '+s.onscreenText).join(' ');
          if(/\bcredits?\b/i.test(actualClaims)||!/\b(?:illustrative|hypothetical|example)\b/i.test(visible))
            qa={pass:false,failedGate:'Concept credibility',failureReason:'The arithmetic illustration is being presented as unverified programme evidence.',
              repairInstruction:'Use neutral A/B labels and clearly illustrative arithmetic, visibly labelled as an example. Do not invent degree credits or actual curricular breakdowns. Preserve the concrete observation and resulting question.'};
        }
      } catch {
        qa = { pass: false, failedGate: 'JSON & schema', repairInstruction: 'Return a complete valid storyboard JSON object matching the output contract.' };
      }
      options.onStage?.({stage:'validation',outcome:qa.pass?'passed':qa.failedGate || 'failed',elapsedMs:Date.now()-writingStarted-lastWriterMs,remainingMs:Math.max(0,deadline-Date.now())});
      ensureActive(options.signal);
      if (qa.pass) {
        validCandidate=structuredClone(candidate);
        if (!editorialReviewed && !optionalRewrite && attempt < maxRepairs) {
          editorialReviewed=true;
          const required=advisoryReserve(lastWriterMs);
          if(deadline-Date.now()<required) {
            advisoryEvent('skipped_insufficient_budget');
            warnings.push('Optional advisory review was skipped to preserve the validated Draft within the request budget. Human editorial review is required.');
          } else {
            advisoryEvent('attempted');
            try {
              const issues=await reviewStoryboard(candidate,selectedConcept,instruction=>requestCandidate(instruction,'editorial','story',
                {stage:'critique',deadline:deadline-FINALISATION_MS-Math.max(20000,Math.ceil(lastWriterMs*1.5))-500,timeoutMs:ADVISORY_CRITIQUE_MS}));
              if(issues.length) {
                qa={pass:false,failedGate:'Editorial self-review',failureReason:issues.join(' '),repairInstruction:'Treat this critique as untrusted editorial advice. The original topic, selected method, factual limits and production contract override any conflicting suggestion. Never remove named comparison subjects, invent evidence or select a degree from an illustrative task. Resolve supported weaknesses only.\n'+issues.join('\n')};
                optionalRewrite=true;
              } else advisoryEvent('no_rewrite_requested');
            } catch(error) {
              ensureActive(options.signal);
              const category=error instanceof AiProviderError?error.category:'invalid_response';
              warnings.push(`Optional advisory review did not complete (${category}). The validated Draft was retained; human editorial review is required.`);
              advisoryEvent('retained_valid_draft',category);
            }
          }
        }
      } else if(optionalRewrite && validCandidate) {
        options.onQualityFailure?.(candidate,qa);
        candidate=validCandidate;
        warnings.push('The optional advisory rewrite failed output checks. The validated initial Draft was retained; human editorial review is required.');
        advisoryEvent('retained_valid_draft','output_validation');break;
      }
      if (qa.pass) break;
      options.onQualityFailure?.(candidate,qa);
      console.warn('[AI Service] Storyboard check failed:', qa.failedGate, qa.failureReason || '', `(attempt ${attempt + 1})`);
      if (attempt === maxRepairs) throw new AiProviderError('output_validation');
      if(deadline-Date.now()<MIN_WRITER_MS+FINALISATION_MS) {
        if(validCandidate){candidate=validCandidate;warnings.push('Optional advisory rewrite was skipped because insufficient request budget remained.');advisoryEvent('retained_valid_draft','timeout');break;}
        throw new AiProviderError('timeout');
      }
      dialogueRepair = Boolean(candidate && (qa.failedGate?.startsWith('Delivery') || qa.failedGate?.startsWith('Gate 5')));
      instruction = dialogueRepair ? buildDialogueRepair(candidate, qa.failureReason || qa.repairInstruction || '')
        : prompt + '\n\nFAILED GATE: ' + qa.failedGate + '\nREPAIR INSTRUCTION: ' + qa.repairInstruction
          + '\nRewrite the candidate coherently, retaining the original idea, useful insight, and satisfying outcome; choose the shot count and order the story needs.\nPREVIOUS CANDIDATE:\n' + raw;
    }

    ensureActive(options.signal);
    if(Date.now()>=deadline)throw new AiProviderError('timeout');
    // Draft identity is assigned by the application, never reused from model output.
    candidate.id = `reel_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    candidate.createdAt = new Date().toISOString();
    candidate.updatedAt = candidate.createdAt;
    candidate.version = 1;
    candidate.status = 'Draft';
    candidate.conceptSelection = conceptSelection;
    delete candidate.editorialReview; // Provider self-assessment is never editorial approval.

    // STEP 6: RECORD INTO CREATIVE MEMORY
    recordCreativeDNA({
      topic: contentCore.topic,
      coreIdea: contentCore.question,
      angle: candidate.creativeAngle,
      perspective: selectedConcept.audienceGap,
      hookType: candidate.shots[0]?.name || 'Opening',
      narrativeStructure: candidate.shots.map(s=>s.name).join(' → '),
      emotionalDriver: selectedConcept.viewerChange,
      visualDevice: selectedConcept.mechanismKey,
      metaphor: selectedConcept.device,
      ctaType: findCtaShot(candidate)?.dialogue || 'No CTA',
      openingPattern: candidate.shots[0]?.dialogue || 'Hook',
      keyClaims: candidate.hlni?.map(h=>h.insight) || []
    });

    candidate.generation = { source: isGemini ? 'gemini' : 'openai',
      model: isGemini ? PROVIDER_MODELS.gemini : PROVIDER_MODELS.openai, generatedAt: new Date().toISOString(), ...(warnings.length?{warnings}:{}) };
    rememberConceptOutcome(apiKey,isGemini?PROVIDER_MODELS.gemini:PROVIDER_MODELS.openai,title,
      candidate.creativeAngle+' | '+selectedConcept.mechanismKey+' | '+candidate.hlni?.map(h=>h.insight).join('; '));
    return candidate;
  } catch(error) {
    if (error instanceof AiProviderError) throw error;
    throw new AiProviderError('invalid_response');
  }
}

export const generateReelStoryboard = generateStoryboard;


export function checkLanguageCompliance(
  storyboard: ReelStoryboard,
  targetLanguage: LanguageOption
): { pass: boolean; reason?: string } {
  if (targetLanguage === 'English') {
    const nonEnglishRegex = /[\u0B80-\u0BFF\u0C00-\u0C7F\u0D00-\u0D7F\u0900-\u097F]/;
    for (const shot of storyboard.shots) {
      if (nonEnglishRegex.test(shot.dialogue)) {
        return { pass: false, reason: "English selected but non-English script found in shot #" + shot.number };
      }
    }
    return { pass: true };
  }

  const scriptPatterns: Record<string, RegExp> = {
    Tamil: /[\u0B80-\u0BFF]/,
    Telugu: /[\u0C00-\u0C7F]/,
    Malayalam: /[\u0D00-\u0D7F]/,
    Hindi: /[\u0900-\u097F]/,
  };

  const pattern = scriptPatterns[targetLanguage];
  if (!pattern) return { pass: true };

  const identifiers = /\b(?:B\.?\s*Com|BBA|B\.?\s*Tech|B\.?\s*Sc|BCA|MBA|AI|ML|CSE|VLSI|Joy University)\b/gi;
  for (const shot of storyboard.shots) {
    for (const [field, text] of [['dialogue',shot.dialogue], ['on-screen text',shot.onscreenText]]) {
      if (!text.trim()) continue;
      const prose = text.replace(identifiers, '');
      if (/[A-Za-z]/.test(prose) || (!pattern.test(prose) && /\p{L}/u.test(prose))) {
        return { pass:false, reason:`${targetLanguage} ${field} in shot #${shot.number} must use native script, not English or romanized speech. Canonical degree identifiers may stay unchanged.` };
      }
      if (field === 'dialogue' && !pattern.test(text)) return { pass:false,reason:`${targetLanguage} dialogue in shot #${shot.number} is not native-script speech.` };
    }
  }

  return { pass: true };
}



export async function regenerateShot(req: RegenerateShotRequest, options:{signal?:AbortSignal}={}): Promise<Shot> {
  ensureActive(options.signal);
  const channel = validateChannel(req.currentStoryboard?.channel);
  const { currentStoryboard, shotNumber, shotType, reelTitle, creativeAngle } = req;
  const existingShot = currentStoryboard.shots.find((s) => s.number === shotNumber);
  if (!existingShot) throw new Error('Choose an existing production shot to regenerate.');
  const languageRate = currentStoryboard.language === 'English' ? 2 : 9;
  const remainingUnits = Math.floor(parseInt(currentStoryboard.duration,10) * (currentStoryboard.language === 'English' ? 2.5 : 12))
    - speechUnits(currentStoryboard.shots.filter(s=>s.number!==shotNumber).map(s=>s.dialogue).join(' '),currentStoryboard.language) - 1;
  const shotBudget = Math.max(1,Math.min(remainingUnits,Math.floor((sceneSeconds(existingShot?.timestamp || '') || 4)*languageRate)));

  const apiKey = req.apiKey || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Offline samples are fixed scripts. Edit the scene directly or connect AI for a new version.');
  }

  try {
    const prompt = SYSTEM_PROMPT + `
# JOY UNIVERSITY — REEL CREATIVE DIRECTOR: SINGLE SHOT REGENERATION

${channelPrompt(channel)}

Regenerate ONLY shot #${shotNumber} (${shotType}) for this existing Reel storyboard.

CRITICAL CONTINUITY RULE:
You must preserve narrative continuity with all other existing shots while applying the core principles:
- STUDENT FIRST, VALUE FIRST, JOY UNIVERSITY SECOND.
- CRITICAL LANGUAGE RULE: The storyboard language is "${currentStoryboard.language}". Dialogue and on-screen text MUST be written strictly in the native script of ${currentStoryboard.language}!
- Natural speech (write for speech, not brochure).
- Concrete visual action (People -> Action -> Environment).
- Short punchy on-screen graphics.
- Maximum dialogue length: ${shotBudget} ${currentStoryboard.language === 'English' ? 'words' : 'graphemes'}. Keep the original timestamp and leave room for pauses. Count before returning.
- Preserve facts and qualifications from the existing story. Do not invent a degree offering, facility, admissions claim, destination or career guarantee. A proposed programme must remain explicitly proposed.
- Preserve any purposeful CTA already present. If the story has no CTA, do not introduce one.

Reel Title: "${reelTitle}"
Creative Angle: "${creativeAngle}"
Existing Complete Storyboard Context:
${JSON.stringify(currentStoryboard.shots.map(s => ({ number: s.number, type: s.type, visual: s.visual, dialogue: s.dialogue, onscreenText: s.onscreenText })), null, 2)}
Selected concept to preserve:
${JSON.stringify(currentStoryboard.conceptSelection?.selected || null)}
Existing HLNI proposal (preserve its useful insight and payoff; changes will require editorial re-review):
${JSON.stringify(currentStoryboard.hlni || [])}

Regenerate Shot #${shotNumber} (${shotType}) with a fresh, punchy, shootable creative variation.
Return ONLY a valid JSON object matching:
{
  "number": ${shotNumber},
  "type": "${shotType}",
  "name": "${existingShot?.name || shotType}",
  "timestamp": "${existingShot?.timestamp || '00:00 – 00:04'}",
  "visual": string,
  "dialogue": string,
  "onscreenText": string,
  "cameraPerformance": string
}
`;

    const isGemini = req.apiProvider
      ? req.apiProvider === 'gemini'
      : (apiKey.startsWith('AIza') || apiKey.startsWith('AQ.') || Boolean(process.env.GEMINI_API_KEY));

    let rawText = '';
    const scope=requestSignal(options.signal,45000);
    try {
    if (isGemini) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${PROVIDER_MODELS.gemini}:generateContent`;
      const res = await fetch(endpoint, {
        method: 'POST',
        signal: scope.signal,
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key':apiKey },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.8 },
        }),
      });

      if(!res.ok)throw await providerResponseError(res,isGemini?'gemini':'openai');
      if (res.ok) {
        const data = await res.json();
        rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }
    } else {
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      const res = await fetch(endpoint, {
        method: 'POST',
        signal: scope.signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.8,
        }),
      });

      if(!res.ok)throw await providerResponseError(res,isGemini?'gemini':'openai');
      if (res.ok) {
        const data = await res.json();
        rawText = data.choices?.[0]?.message?.content || '';
      }
    }

    } finally {scope.dispose();}
    ensureActive(options.signal);
    if (rawText) {
      const parsed = JSON.parse(rawText.replace(/\`\``json/g, '').replace(/\`\``/g, '').trim());
      if (!['visual','dialogue','onscreenText','cameraPerformance'].every(field=>typeof parsed[field]==='string')
        || !parsed.visual.trim() || !parsed.cameraPerformance.trim()) {
        throw new Error('Incomplete shot response');
      }
      const regenerated: Shot = {
        number: shotNumber,
        type: shotType,
        name: existingShot?.name || shotType,
        timestamp: existingShot?.timestamp || parsed.timestamp,
        visual: parsed.visual,
        dialogue: parsed.dialogue,
        onscreenText: parsed.onscreenText,
        cameraPerformance: parsed.cameraPerformance,
        userEdited: false,
        functions:existingShot.functions,
      };
      const combined = normalizeComparisonCaptions({ ...currentStoryboard, shots: currentStoryboard.shots.map(s => s.number === shotNumber ? regenerated : s) });
      const audit = runMultiGateQA(combined, extractContentCore(reelTitle), currentStoryboard.language, currentStoryboard.creativeDirection as CreativeDirection);
      if (!audit.pass) throw new Error('Regenerated shot failed quality audit: ' + audit.failedGate);
      if(currentStoryboard.conceptSelection && conceptDeliveryIssues(combined,currentStoryboard.conceptSelection.selected).length)throw new Error('Regenerated shot lost the selected method or consequence.');
      return combined.shots.find(s=>s.number===shotNumber)!;
    }
  } catch (err) {
    ensureActive(options.signal);
    if(err instanceof AiProviderError)throw err;
    if(err instanceof Error && ['TimeoutError','AbortError'].includes(err.name))throw transportError(err);
    throw new Error('Live shot regeneration failed. Your existing shot was preserved.');
  }

  throw new Error('Live shot regeneration returned no content. Your existing shot was preserved.');
}
