# Flexible 6 × 3 creative framework

Mandatory editorial addition: [HLNI standard](HLNI_EDITORIAL_STANDARD.md). Every channel must deliver at least one credible, audience-relevant high-leverage new insight. This adds no compulsory shot or narrative stage; the flexible framework below remains in force.

Current contract, updated 7 November 2026. This supersedes older instructions requiring six separate ordered shots or a mandatory CTA. The canonical prompt is `shared/creativeFramework.ts`.

| Narrative function | Trust | Connection | Discovery |
| --- | --- | --- | --- |
| Hook | Raise a question worth understanding | Introduce a relatable situation or emotion | Create curiosity, surprise or a challenge |
| Problem | Reveal a knowledge gap or misconception | Establish a personal dilemma or tension | Challenge an assumption or expectation |
| Pattern Interrupt | Introduce evidence that changes perspective | Introduce a moment that shifts the conversation | Reveal an unexpected clue or contradiction |
| Value | Deliver verified facts, comparisons or methods | Offer practical insight through human experience | Teach through the challenge or reveal |
| Payoff | Help the viewer reach an informed conclusion | Resolve emotional or personal tension | Deliver a satisfying reveal with a meaningful takeaway |
| CTA, when useful | Encourage saving or exploring further | Encourage sharing or responding | Invite participation or a relevant next action |

Choose the concept first. Use the matrix to ideate and diagnose the whole story, never to assign six compulsory production scenes. Functions can combine, recur or move. An interrupt is optional. Value is what the viewer gains; payoff is how the tension resolves. They can happen together. An ending can stand without an engagement request; use at most one purposeful action when appropriate. Channel identity guides purpose without prescribing style, opening, device or sequence.

The production format stays: **Shot / Timecode / Visual Action / Dialogue or Voiceover / Camera Direction / On-Screen Graphic**. Silent shots are legitimate. Live creation defaults to Auto (Let AI choose). Users can still guide treatment through Informative, Funny or Trendy.

## Implementation and compatibility

- The schema preserves every production shot in its sequence. It no longer pads, truncates or relabels stories into six stages.
- New scenes use `type: SCENE` with their own names. Optional `functions` tags can describe combined functions; missing tags do not fail QA. Legacy function types remain supported.
- QA checks production fields, topic retention, language, speech budgets and cliché risks. Labelled Value/Problem shots, fixed beat order, and speech/text in visual-only scenes are not required. Useful insight and resolution need editorial judgement; tags alone establish neither.
- Repairs keep actual scene counts and boundaries. Regeneration works for any existing shot number and preserves other scenes.
- Sharing retains count, names and function tags. Timing changes scale actual scene proportions. Text/PDF exports include the whole production list and do not invent a CTA.
- Existing offline samples and saved six-shot reels remain intact as concrete stories. Their count does not constrain new generation. Auto selects the existing Informative authored sample offline; offline has no model choosing a new treatment or story.

## Verification

Build and full regressions pass, including 1-, 3-, 4-, 7- and 10-shot stories, combined/reordered functions, no interrupt, no CTA, visual-only scenes, Auto treatment, sharing, repairs, timing, exports and shot 7 regeneration. Legacy six-shot authored samples remain unchanged.

Chromium checks pass for the homepage selector, three- and eight-shot production pages, custom scene names, last-scene editing/autosave, two PDF downloads and mobile layout without horizontal overflow. These browser records are labelled test fixtures, not creative-quality evidence.

Real Gemini generation with Auto treatment on “B.Com vs BBA” produced **Trust: 3 shots; Connection: 3 shots; Discovery: 4 shots**, all passing current automated checks. The model chose Informative for each. The genuine local report is `scratch/live-flexible-validation.json`. No paid provider or offline substitution was used.

This verifies flexibility mechanically, not consistent creative excellence. Editorial inspection still finds similar desk-and-syllabus concepts across channels. Before release, assess coherence, audience relevance, factual precision, useful insight, natural read-aloud timing and a satisfying outcome. Strong channel references should guide judgement without becoming mandatory templates. Native-language coverage from earlier work is not a new live-native test of this framework. No staging or production deployment was made.
