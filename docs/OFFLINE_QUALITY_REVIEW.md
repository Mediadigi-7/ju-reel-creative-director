# Offline creative-quality review

> Historical baseline: this audit describes the category-template engine that has now been replaced. See [the catalogue implementation](OFFLINE_CATALOGUE_IMPLEMENTATION.md) and [the 90 authored scripts](OFFLINE_SCRIPT_CATALOGUE.md) for the current version.

## Verdict

The offline engine is suitable for demonstrating storyboard structure. It does not meet the supplied creative rules for production-ready, idea-specific reels. No generation code was changed during this audit.

## Method

Generated 216 English outputs: 12 titles × 3 styles × 6 variation seeds. Reviewed the 12 default Informative scripts and representative style variations. Titles included the six home samples, B.Com vs BBA, B.Tech vs B.Sc, law after Commerce, AI in agriculture, design versus parental pressure for engineering, and software AI versus hardware robotics. Compared actual dialogue and on-screen text rather than titles or metadata. This deterministic sample is not a statistical estimate of all possible inputs.

## Findings

- Idea fidelity fails: B.Com vs BBA produces the generic commerce script with no BBA comparison. B.Tech vs B.Sc drops B.Sc. The design/parental-pressure title becomes generic engineering advice. AI in agriculture becomes broad AI-career marketing.
- Specific questions collapse into category templates: B.Com vs BBA, law after Commerce, and the home Commerce sample have identical default Informative dialogue. Merely changing the displayed title does not create a topic-specific narrative.
- Style execution is shallow: Informative and Trendy dialogue is identical for all 12 titles at seed 1. Trendy mainly changes camera directions. Funny replaces one pattern-interrupt line and adds a comic visual; most of the narrative stays unchanged.
- CTAs conflict: all six home samples at Informative/seed 1 ask viewers to save AND share. Some also have a different on-screen action, such as COMMENT. Across the full sample, a simple distinct-action keyword scan flagged 150/216 outputs; this count is a heuristic requiring review, not an independent semantic CTA validator.
- Unsupported and sweeping claims include “90% of +2 students make this exact mistake,” “your market value skyrockets,” and “future-proof tracks.” These claims are not justified by the generated content.
- Spoken delivery is overloaded: the default Informative scripts contain 87–112 English whitespace-separated words before accounting for performance or pauses. That implies roughly 186–240 words per minute for the default advertised 28 seconds.
- Every sampled output declares 28 seconds but its last scene ends at 00:30. Manual timing controls can retime scenes; the offline generator itself still has this mismatch.
- Schema consistency does not establish creative quality: 191/216 outputs passed the current multi-gate QA function, despite the issues above. The remaining 25 failed its entity-persistence gate. The no-key generation path does not enforce this auditor.

## What works

Six ordered scenes, practical visual/camera fields, and a usable editing scaffold. The software-versus-hardware robotics template addresses a concrete distinction more directly than the broad category templates. These strengths do not establish the accuracy of institutional facts or production readiness.

## Recommended changes before offering offline reels as finished content

1. Restrict offline mode to an explicit catalogue of reviewed demo scripts; do not imply it handles arbitrary ideas.
2. Give each supported idea its own useful answer, entity coverage, and coherent six-scene progression.
3. Remove unsupported statistics and promises, shorten spoken dialogue, and align timestamps with duration.
4. Enforce one consistent CTA across dialogue and on-screen text.
5. Design separate narrative treatments for Informative, Funny, and Trendy instead of changing only camera cues.
6. Add content-level acceptance checks for named comparisons, native-language output, timing, and CTA consistency; keep human editorial review for humor, coherence, usefulness, and factual accuracy.

Live AI and offline templates should continue to have distinct source labels. Fixing offline quality is separate from successful live-provider integration.
