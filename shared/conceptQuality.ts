import { z } from 'zod';

/** Optional on stored concepts; required by the new-generation concept gate. */
export const StorySpineSchema=z.object({
  startingBelief:z.string().min(12),studentSituation:z.string().min(12),
  observation:z.string().min(12),focus:z.string().min(3),
  whyQuestionFollows:z.string().min(16),changedAction:z.string().min(16),
  visibleConsequence:z.string().min(16),channelExperience:z.string().min(16),
});
export type StorySpine=z.infer<typeof StorySpineSchema>;
export const CONCEPT_QUALITY_CONTRACT=`CONCEPT QUALITY CONTRACT v1:
Before writing shots, establish one specific student's starting belief and situation; one observable result; the precise knowledge gap (focus); WHY the resulting question follows from that observation; the action it changes; and the visible consequence. Keep the same academic concept throughout. The resulting question must investigate the same specific uncertainty shown by the observation. A smile, a closed notebook, 'choose better' or a restatement of the method is not a consequence.
A question can be the changed action only when its precise wording and use visibly improve the original decision. Clearly hypothetical tasks/criteria may demonstrate a preparation change without inventing facts about a real degree.
ChannelExperience must describe what the audience experiences in THIS execution, not repeat Trust/Connection/Discovery labels. A believable solo dilemma is allowed; a planned conversation must survive into the script.
These fields are a proposal, never proof of quality or permission to fabricate evidence.`;
export function storySpineIssues(value:unknown):string[]{
 const parsed=StorySpineSchema.safeParse(value);
 if(!parsed.success)return ['Provide the complete story spine before drafting: belief, situation, observation, focus, causal explanation, changed action, visible consequence and channel experience.'];
 const spine=parsed.data;
 if(/^(?:the )?student (?:smiles|nods|feels confident|closes (?:the |a )?notebook)[.!]?$/i.test(spine.visibleConsequence.trim()))return ['Replace the generic reaction with a visible consequence of the information.'];
 if(spine.observation.trim().toLowerCase()===spine.visibleConsequence.trim().toLowerCase())return ['The consequence must demonstrate what changes because of the observation.'];
 return [];
}
