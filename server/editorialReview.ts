import { z } from 'zod';
import type { ReelStoryboard } from '../shared/types.js';
import type { CreativeConcept } from '../shared/concepts.js';

// A model critique can request revisions; it cannot grant application approval
// or replace the independent weighted editorial evaluation.
const ReviewSchema=z.object({issues:z.array(z.object({
  category:z.enum(['fidelity','integrity','insight','payoff','channel','production']),
  evidence:z.string().min(5),revision:z.string().min(5),
})).max(6)});
export async function reviewStoryboard(reel:ReelStoryboard,concept:CreativeConcept,request:(prompt:string)=>Promise<string>):Promise<string[]> {
 const raw=await request(`TASK: EDITORIAL_REVIEW
Critique this finished ${reel.channel || 'student'} Reel for +2 viewers. Read the actual production fields, not the flattering metadata. Return JSON {"issues":[{"category":"fidelity|integrity|insight|payoff|channel|production","evidence":"specific shot and observed defect","revision":"concrete correction"}]}.
Return [] only if no substantive defect is found. No scores or approval. Report up to six material weaknesses, not taste preferences. Do not demand six functions, a fixed shot count, an interrupt or a CTA. Do not invent academic evidence to fix a story.
NON-NEGOTIABLE REVIEW LIMITS:
Never suggest removing/changing the original topic or either named comparison subject. Never suggest selecting a degree from an illustrative task. Never request fabricated syllabi, mock evidence screens, invented subject overlap or a degree-specific claim. A question-forming method legitimately ends with an unanswered question: assess whether it follows from the observed unknown, not whether a real university answered it. A clearly labelled hypothetical task/worksheet is allowed; a document masquerading as actual academic evidence is not. Missing official documents are a reason to bound the method, not to invent proof or repeatedly demand it. Offer only corrections achievable using the supplied facts and selected method. Do not add a new academic claim in a revision instruction.
Check:
- Same original topic and concept throughout. In a named comparison both subjects must remain relevant to the reveal/consequence, not only the opening.
- One consistent method. Assessment criteria, task instructions, prerequisites and elective availability are distinct. The final question must address the actual unknown shown in the example.
- Specific HLNI demonstrated through a concrete accessible example. Generic 'check the syllabus/ask questions' is insufficient without showing what is learned and why it improves the decision. A task-question journal must actually inspect/try a task and record a specific sticking point; listing an interest is insufficient.
- Supported claims. No invented subject overlap, degree stereotypes, institutional facts or aptitude predictions. Illustrations must be labelled, logically sound and bounded.
- A payoff which visibly changes the initial mistake, question or next action. A nod or assertion 'now choose better' alone is insufficient.
- Channel experience. Trust needs explanatory depth; Connection a specific believable personal dilemma or human interaction; Discovery a curiosity-led challenge or surprising educational reveal. These are objectives, not mandatory formats. A generic lone narrator with a checklist is not automatically differentiated by renamed props.
- Shootable actions, readable graphics and speakable timing.
Selected concept: ${JSON.stringify(concept)}
Finished topic: ${reel.reelTitle}. Duration: ${reel.duration}. Language: ${reel.language}.
Actual shots: ${JSON.stringify(reel.shots)}
Return JSON only.`);
 const review=ReviewSchema.parse(JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g,'')));
 return review.issues.map(i=>`${i.category}: ${i.evidence} Revision: ${i.revision}`);
}
