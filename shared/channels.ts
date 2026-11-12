export const CHANNEL_NAMES = ['Trust','Connection','Discovery'] as const;
export type ContentChannel = typeof CHANNEL_NAMES[number];
export const CHANNEL_STRATEGIES: Record<ContentChannel, { audience: string; goal: string; guidance: string }> = {
  Trust: {
    audience: '+2 students seeking academic depth and well-supported course and career decisions',
    goal: 'Build credibility through useful explanation and verifiable evidence.',
    guidance: 'Evidence, comparisons or methods can build credibility when useful; choose the strongest concept for the topic. Explain one bounded distinction and its limits; acknowledge overlap where appropriate. Do not turn a degree comparison into a numbers-versus-leadership stereotype. Use specific examples and verified programme facts only when relevant. Never manufacture expertise, testimonials, proof, rankings, outcomes, or institutional claims.',
  },
  Connection: {
    audience: '+2 students seeking accessible, supportive guidance, including students worried about marks, confidence, or belonging',
    goal: 'Help the viewer feel understood and identify a practical next step.',
    guidance: 'A specific student situation, conversation or emotion can create recognition; it is an option, not a required opening. Let the student recognise the dilemma, then give one attainable next step. Use respectful natural speech. Do not label anyone low-grade, assume low ability, shame marks, or promise outcomes. This is a university-managed channel with an informal, student-centred voice. Be candid and relatable while keeping ownership clear; never impersonate an independent student account.',
  },
  Discovery: {
    audience: 'A broad +2 student audience discovering ideas, courses, or student experiences',
    goal: 'Earn curiosity and participation while delivering a coherent, useful discovery.',
    guidance: 'Curiosity, surprise, emotion or a challenge can create discovery; a visual puzzle or prediction is an option, not a required format. Do not reuse the generic everyone-says-safe opening. Demonstrate the distinction and resolve the opening question. Without a supplied trend reference, call the execution trend-inspired and never invent currently trending audio or participation claims.',
  },
};
export function isContentChannel(value: unknown): value is ContentChannel {
  return (CHANNEL_NAMES as readonly unknown[]).includes(value);
}
export function validateChannel(value: unknown): ContentChannel | undefined {
  if (value === undefined) return undefined;
  if (!isContentChannel(value)) throw new Error('INVALID_CHANNEL');
  return value;
}
export function channelPrompt(channel?: ContentChannel): string {
  if (!channel) return 'No channel goal was supplied. Preserve the idea and provide useful student-centred content without inventing a channel identity.';
  const strategy = CHANNEL_STRATEGIES[channel];
  return `CHANNEL GOAL: ${channel}\nTARGET AUDIENCE: ${strategy.audience}\nPURPOSE: ${strategy.goal}\nEXECUTION GUIDANCE: ${strategy.guidance}\nChannel is independent of treatment, tone, and format. Any channel can educate, entertain, or use humour when appropriate. Channel must never replace the original idea. Choose a coherent, useful story with a satisfying outcome. Narrative functions can combine or move; pattern interrupts and CTAs are optional. Use at most one purposeful next action.`;
}
