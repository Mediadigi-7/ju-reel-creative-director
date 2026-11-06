import { ContentCore } from './aiService.js';

export interface RealityTriggerResult {
  humanSituation: string;
  abstractPatternAvoided: string;
  concreteDetail: string;
}

export function extractRealityTrigger(contentCore: ContentCore, title: string): RealityTriggerResult {
  const topic = (contentCore.topic + ' ' + title).toLowerCase();

  if (topic.includes('college') || topic.includes('branch') || topic.includes('+2') || topic.includes('after 12th')) {
    return {
      humanSituation: "Asking parents, parents asking relatives, and deciding based on what a neighbor's son chose.",
      abstractPatternAvoided: "Students face heavy decision anxiety during career selection.",
      concreteDetail: "Group chat discussions at 11 PM comparing branch cutoffs and placement stats."
    };
  }

  if (topic.includes('ai') || topic.includes('tech') || topic.includes('code') || topic.includes('future')) {
    return {
      humanSituation: "Opening ChatGPT to fix a bug or write an assignment, then realizing every recruiter is checking if you actually understand the logic.",
      abstractPatternAvoided: "AI is revolutionizing the education landscape.",
      concreteDetail: "Comparing a student who just uses AI prompts vs a student who builds AI tools."
    };
  }

  if (topic.includes('skill') || topic.includes('job') || topic.includes('interview') || topic.includes('salary')) {
    return {
      humanSituation: "Sitting in an interview room where 50 candidates have the exact same degree name, but only one can demo a working project.",
      abstractPatternAvoided: "Acquiring industry-relevant skills is paramount for success.",
      concreteDetail: "GitHub repository commit history or hands-on lab project demo."
    };
  }

  return {
    humanSituation: `A real student encountering ${contentCore.problem || contentCore.question} in their everyday hostel or classroom routine.`,
    abstractPatternAvoided: `Generic educational statements about ${contentCore.topic}.`,
    concreteDetail: `Specific dialogue and recognizable student action related to ${contentCore.intent}.`
  };
}
