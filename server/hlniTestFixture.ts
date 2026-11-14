import type { ReelStoryboard } from '../shared/types.js';

// Structural test data for mocked providers, never evidence of creative quality.
export function withHlniTestProposal(reel:ReelStoryboard):ReelStoryboard {
  return {...reel,shots:reel.shots.map((s,i)=>i===reel.shots.length-1?{...s,onscreenText:s.onscreenText+' Test example. What will I practise? Not enough information.'}:s),hlni:[{
    insight:'Compare the concrete tasks in the example rather than deciding from labels alone.',
    audienceGap:'The test audience is comparing labels without examining the underlying work.',
    viewerChange:'The viewer has a concrete comparison question to use before making a choice.',
    supportType:'method',support:'Test-only proposed method; requires editorial verification in the actual story.',
    shotNumbers:[reel.shots[0].number],payoffShotNumbers:[reel.shots.at(-1)!.number],
    payoff:'Review how the ending connects the comparison to the decision.',
  }]};
}
