# Live creative-quality review

Current creative contract: [Flexible 6 × 3 framework](FLEXIBLE_CREATIVE_FRAMEWORK.md). This supersedes the fixed six-shot and mandatory-CTA assumptions in historical entries below.

Reviewed 2026-11-06. Test idea: **B.Com vs BBA**. Provider: Gemini, model `gemini-3.1-flash-lite`. These are real saved provider responses, not offline scripts. Source evidence is in the ignored `scratch/live-channel-validation.json`; local caption rechecks are in `scratch/native-quality-replay.json`.

**Decision: do not deploy yet.** Mechanical delivery checks and creative approval are separate. Passing the first does not establish the second.

| Criterion | Evidence | Decision |
| --- | --- | --- |
| Original idea | Both degrees remain central throughout the English scripts. | Pass for this sample |
| Six-stage story | Hook, problem, interruption, value, payoff, CTA remain in order. | Pass for this sample |
| Spoken delivery | All three English channel outputs passed the engine's total/per-scene speech limits after targeted repair. | Automated pass; timed read-aloud still needed |
| Native captions | Tamil, Telugu and Malayalam candidates retained only the comparison connector “vs” in English. Narrow label normalization changes `B.Com vs BBA?` to `B.Com / BBA?`. Saved native candidates then pass the full automated QA replay with dialogue unchanged. | Replay pass; no new live-generation claim |
| Hindi | The provider reported exhausted free-tier quota before a Hindi storyboard was obtained. | Unverified |
| Distinct channel execution | All three English openings use a student holding two books/brochures. Connection lacks a specific personal interaction; Discovery lacks a prediction with a satisfying reveal. | Fail editorial review |
| Factual precision | Trust says “It is depth versus width”; other scripts assert a finance-versus-strategy split without actual syllabuses. These oversimplify degrees whose curricula vary. | Fail editorial review |
| Single CTA | Each English ending uses one recognised action (Save or Comment), with no invented link/guide. | Pass for these outputs |
| Native fluency | Script checks do not establish idiomatic speech or pronunciation. | Fluent editorial review and read-aloud pending |
| Shot regeneration | The live runner stopped on quota before regeneration. Local regression tests confirm malformed responses fail and preserve the existing draft. | Live result unverified |

## Fixes implemented

- Pacing/language repair edits only the six dialogue/caption pairs. The prompt supplies actual current speech counts and a separate budget for each scene. Visuals, chronology, identity and scene boundaries are retained; the complete candidate is audited again. Incomplete patches fail.
- Native comparison-label cleanup is limited to complete pairs of canonical degree identifiers joined by `vs` or `versus`. It introduces no new prose and never conceals English sentences, rewrites speech, or substitutes an offline story.
- The final generation brief repeats channel-specific execution requirements: an evidence-checking step for Trust; a concrete human interaction/situation for Connection; a visible prediction and resolved reveal for Discovery. A different CTA or label alone is insufficient.
- Comparison guidance now states that no syllabuses were supplied. It asks for a useful comparison method rather than invented curriculum contents, fixed depth/width hierarchies, or guaranteed careers.
- Shot regeneration receives its own remaining speech budget, rejects incomplete provider responses and applies the same caption cleanup. It never fills missing creative fields with placeholder content.

## Next verification

When Gemini's free-tier quota resets, run `NODE_USE_ENV_PROXY=1 npm run validate:live`. It stops on provider quota/auth/network failures; it does not switch to OpenAI or pay for a fallback. The run checks three English channel treatments, four native-language Trust treatments, and a hook regeneration. Latest reports remain local and contain no API keys.

Review the generated scripts against the table above. Read all six lines as one continuous thought; check that each value scene adds one concrete useful insight and that the payoff resolves the opening. Compare the three openings and visual devices side by side. Check curriculum statements against actual supplied evidence; otherwise retain explicit uncertainty. Time a natural read-aloud with pauses. A fluent reviewer should check native phrasing and pronunciation before publication. Do not invent a creative-quality score or treat automated script compliance as editorial approval.

Only advance to staging when the live checks and this editorial review both pass. Production is unchanged.
