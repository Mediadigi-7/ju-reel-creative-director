# Mandatory HLNI editorial standard

Current Phase 3 result: the three reference scripts are user-approved, and three fresh Gemini outputs have been scored. [Complete scripts, evaluation and revisions](phase3-evaluation/run-2026-11-09-01/EVALUATION.md). All generated channels require revision; reference approval has not been applied to those drafts.

Updated 9 November 2026. Applies to Trust, Connection and Discovery, live AI drafts, offline samples and older saved reels.

**Concept first → Connected story → At least one High-Leverage New Information → Meaningful payoff → Editorial verification.**

The insight must be new to the target audience, useful enough to change understanding/action, and credible. Novelty is audience-relative; filling a metadata field or avoiding a few generic phrases cannot establish it. Emotion, polish, entertainment and familiar advice alone do not qualify.

HLNI is not a seventh stage or a required shot. It may emerge through dialogue, evidence, comparison, action or a reveal, early or late. Insight and payoff can occur in one scene. Shot counts and sequence remain story-led; interrupts and CTAs remain optional. The production format is unchanged.

## Five editorial checks

| Check | Required to approve |
| --- | --- |
| New information | At least one identifiable, non-obvious insight for this audience |
| High-leverage | Meaningfully changes understanding, a decision or a practical next action |
| Supported | Claims are accurate, appropriately qualified and verifiable; methods/perspectives have credible reasoning |
| Integrated | The actual shots communicate the insight within the same connected story |
| Payoff | The viewer understands why the insight matters and what changes |

Metadata alone is not delivery. For a method, the viewer needs usable steps and an understanding of how the result informs a decision. Merely saying “compare assignments” or “read the syllabus” is not enough. Factual claims inside a method/perspective still require verification. Unsupported absolutes such as “the only reliable way” are not acceptable.

## Reference directions for B.Com vs BBA

These are ideation references, not mandatory channel templates or editorially approved scripts.

- **Trust:** request an actual assessment brief from each programme. Compare the task, expected output, and grading/feedback criteria. Show how those dimensions reveal the work the student would practise. This is a concrete comparison method; do not invent briefs or pretend that example paperwork is a real syllabus.
- **Connection:** move beyond reassurance about staying friends. Students can try a small task from a genuine course brief, note what engaged/confused them and what they would practise again, then compare their notes before copying a friend's choice. This is an exploratory decision tool, not a validated aptitude test or career prediction.
- **Discovery:** a shared subject name can be a starting question rather than proof of equivalent experience. Check its compulsory/elective status, credit weight and assessment in actual course documents. Claims such as Financial Accounting appearing in both degrees or Marketing being offered within B.Com need relevant verified curriculum references and qualification; programme titles alone do not establish them.

## App behaviour

- Live generation must propose at least one structurally complete HLNI: insight, audience gap, viewer change, support/qualifications, insight-shot references and payoff-shot references/explanation. A missing proposal triggers bounded repair; persistent failure rejects generation without an offline substitute.
- The model cannot approve itself. Fresh output is a draft even when automated production/proposal checks pass.
- The storyboard includes a collapsible editorial review panel. Reviewers identify an insight in the actual shots, check its support and confirm all five criteria before choosing **Approve creative quality**. Facts need a reference. A reference field does not prove that a source exists or supports a claim; reviewers must check it.
- Approval records are bound to the content. Scene, language, channel, duration or insight changes invalidate approval and return Ready for Production records to Draft. Withdrawing a check revokes approval. Published/shot history is not rewritten, but it does not establish HLNI approval.
- Older/offline scripts are not grandfathered into approval. Their content is preserved and can be reviewed or improved. Draft saving/exporting remain available, labelled with editorial status.
- Shared storyboards retain HLNI proposals but require a fresh local review. Local editorial confirmation is not an authenticated certification service.

## Verification and remaining editorial work

Build/regression checks cover missing proposals, bounded repair, rejection of known generic advice, all five confirmations, missing fact references, invalid shot links, combined insight/payoff scenes, model self-approval removal, stale reviews, storage/normalization, exports and untrusted shares. Browser checks cover disabled approval, all five checks, persistence after reload, immediate revocation, factual reference requirements, scene-edit invalidation and mobile layout. Simulated browser approval uses labelled test fixtures, not approval of real creative content.

Real Gemini generation supplied HLNI proposals for all three channels in `scratch/live-hlni-validation.json`. Editorial inspection did not approve them: the methods remain broad, channel concepts are similar and some support explanations make unsupported absolute claims. A further Connection draft after stronger operational-method guidance is in `scratch/live-hlni-method-recheck.json`; it still largely says to compare modules/assessments rather than demonstrating a sufficiently specific tool. It remains **Draft**, with no editorial approval. This is not evidence that the model consistently meets the HLNI standard.

Next: develop the reference directions into strong connected scripts, verify any actual academic claims, and use those references to assess new drafts without turning examples into compulsory narrative templates. No staging or production deployment has occurred.
