import type { ContentChannel } from './channels.js';

export const APPROVED_CREATIVE_BENCHMARKS = [
  {channel:'Trust',title:'The Syllabus Surprise',quality:'Evidence-backed comparison plus a concrete practical decision method.'},
  {channel:'Connection',title:'Try My Course for Five Minutes',quality:'Relatable student interaction that delivers a usable self-assessment method, beyond reassurance.'},
  {channel:'Discovery',title:'The Impossible Quiz',quality:'An interactive challenge with a surprising educational reveal and meaningful takeaway.'},
] as const;

export function approvedBenchmarkPrompt(channel?:ContentChannel):string {
  return `USER-APPROVED CREATIVE-QUALITY REFERENCES (non-mandatory editorial benchmarks):
${APPROVED_CREATIVE_BENCHMARKS.filter(r=>!channel||r.channel===channel).map(r=>`${r.channel} — ${r.title}: ${r.quality}`).join('\n')}
${channel?`Selected channel: ${channel}.`:''}
Transfer the quality of useful insight, connected progression, distinct concept and meaningful payoff. Do not copy the scripts, titles, shot counts, function order, duration or preferred treatment. The examples do not prescribe every future channel's storytelling device. Choose an original concept for the actual topic and audience.
Reference approval is creative approval, not verification of academic claims. Named universities, subject overlap and programme structures need actual supporting documents before use as evidence. No real syllabi were supplied for this generation; do not invent them or fabricate document screens. A method or illustrative activity must be clearly framed and logically supported.
Editorial assessment will weight HLNI 25%, channel differentiation 20%, narrative coherence 20%, payoff 15%, production readiness 15%, originality 5%. Aim for specific, accurate, useful information delivered in the scenes, not metadata alone. Do not output self-scores or editorial approval.`;
}
