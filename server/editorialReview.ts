import { z } from 'zod';
import type { FinishedStory } from './finishedStoryMemory.js';
import type { ReelStoryboard } from '../shared/types.js';
import type { CreativeConcept } from '../shared/concepts.js';

// A model critique can request revisions; it cannot grant application approval
// or replace the independent weighted editorial evaluation.
const ReviewSchema=z.object({issues:z.array(z.object({
  category:z.enum(['fidelity','integrity','insight','payoff','channel','production']),
  evidence:z.string().min(5),revision:z.string().min(5),
})).max(6)});
export async function reviewStoryboard(reel:ReelStoryboard,concept:CreativeConcept,request:(prompt:string)=>Promise<string>,previous:FinishedStory[]=[]):Promise<string[]> {
 const raw=await request(`TASK: EDITORIAL_REVIEW
Critique this finished ${reel.channel || 'student'} Reel for +2 viewers. Read the actual production fields, not the flattering metadata. Return JSON {"issues":[{"category":"fidelity|integrity|insight|payoff|channel|production","evidence":"specific shot and observed defect","revision":"concrete correction"}]}.
Return [] only if no substantive defect is found. No scores or approval. Report up to six material weaknesses, not taste preferences. Require all six ordered primary stages for new generation, with one final CTA. Do not demand exactly six total shots or equal timings. Stage labels alone never demonstrate quality. Do not invent academic evidence to fix a story.
NON-NEGOTIABLE REVIEW LIMITS:
Never suggest adding counts of remaining/unique/core subjects or populating unsupplied course rows. A correction can act on the known shared title (such as restoring a provisionally excluded option) while leaving unknown depth/assessment as questions; do not demand a fabricated full comparison. Never suggest removing/changing the original topic or either named comparison subject. Never suggest selecting a degree from an illustrative task. Never request fabricated syllabi, mock evidence screens, invented subject overlap or a degree-specific claim. A question-forming method legitimately ends with an unanswered question: assess whether it follows from the observed unknown, not whether a real university answered it. A clearly labelled hypothetical task/worksheet is allowed; a document masquerading as actual academic evidence is not. Missing official documents are a reason to bound the method, not to invent proof or repeatedly demand it. Offer only corrections achievable using the supplied facts and selected method. Do not add a new academic claim in a revision instruction.
Check:
- Same original topic and concept throughout. In a named comparison both subjects must remain relevant to the reveal/consequence, not only the opening.
- One consistent method. Assessment criteria, task instructions, prerequisites and elective availability are distinct. The final question must address the actual unknown shown in the example.
- Specific HLNI demonstrated through a concrete accessible example. Generic 'check the syllabus/ask questions' is insufficient without showing what is learned and why it improves the decision. A task-question journal must actually inspect/try a task and record a specific sticking point; listing an interest is insufficient.
- Supported claims. Explicitly reject advice such as enjoying logic means you might lean toward BBA. A miniature task cannot rank degrees, predict aptitude or recommend a programme. No invented subject overlap, degree stereotypes, institutional facts or aptitude predictions. Illustrations must be labelled, logically sound and bounded.
- Speakable everyday language. Do not replace clear student speech with bureaucratic expressions such as insufficient to establish a disciplinary link. Never read placeholder punctuation or complete graphics aloud.
- A payoff which visibly changes the initial mistake, question or next action. A nod or assertion 'now choose better' alone is insufficient.
- Channel experience. Trust needs explanatory depth; Connection a specific believable personal dilemma or human interaction; Discovery a curiosity-led challenge or surprising educational reveal. These are objectives, not mandatory formats. A generic lone narrator with a checklist is not automatically differentiated by renamed props.
- Shootable actions, readable graphics and speakable timing.
CRITICAL SEMANTIC CHECK: Compare the actual observation with the exact resulting question. Do not rationalise a mismatch by adding narration. Categorising an expense is different from auditing a budget. Compare the actual ending with storySpine.changedAction and visibleConsequence; a question or a reaction is insufficient unless its use demonstrates the promised change. If the chosen concept promises a conversation or interaction, check that it occurs in actual scenes, not just metadata.
Previous actual stories from other channels (same account and topic; none means no finished comparison yet): ${JSON.stringify(previous)}
Compare actual audience experiences, not basis identifiers, actor counts or prop names. Sharing a setting is fine when the situations and dramatic mechanisms differ. Never copy the other channel to repair this one.
${reel.conceptSelection?.deliveryPolicy==='evidence-and-action-v1'?'EVIDENCE/ACTION PILOT: A visible correction of the original exclusion (restoring B.Com to a PROVISIONAL research list after seeing the verified row) is a valid payoff. Do not require the planning nextQuestion to be spoken or demand an additional curriculum comparison. A shortlist movement counts only when the original mistaken exclusion and its evidence-based correction are actually shown. Do not turn this into a final degree recommendation.':''}
Selected concept: ${JSON.stringify(concept)}
Finished topic: ${reel.reelTitle}. Duration: ${reel.duration}. Language: ${reel.language}.
Actual shots: ${JSON.stringify(reel.shots)}
Return JSON only.`);
 const review=ReviewSchema.parse(JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g,'')));
 // Discard observed advisory requests that contradict the immutable topic/evidence limits.
 // This is a narrow regression guard; the critic remains advisory, never factual authority.
 const safeIssues=review.issues.filter(i=>{
  const change=i.revision;
  if(/replace\b.{0,100}(?:degree|specific|B\.?Com|BBA).{0,100}(?:generic|Field A|Field B)/i.test(change))return false;
  if(/(?:styles?|subjects?|assessments?).{0,50}(?:typically|usually|commonly)\s+associated\s+with\s+B\.?Com/i.test(change))return false;
  return true;
 });
 return safeIssues.map(i=>`${i.category}: ${i.evidence} Revision: ${i.revision}`);
}
