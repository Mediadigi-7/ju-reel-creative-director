# Isolated Trust pilot — 16 November 2026

**Current result: one final-policy pilot at 86/100. The above-90 target and repeatability gate are not met. No expansion or deployment.**

## Implemented

- Production generates two concepts for the requested channel only. Another channel's invalid candidate can no longer block it. The old joint helper remains for legacy compatibility/tests; the actual API uses the isolated planner.
- Each concept retains its belief → observation → changed action → visible consequence spine. For this focused B.Com vs BBA Trust pilot, the premise is explicit: a student seeking management wrongly excludes B.Com; the verified management-course row restores B.Com to a provisional research list. This is a supplied editorial premise, not proof of unrestricted automatic ideation quality.
- Known official evidence is unchanged: Business Organization & Management in the two named published programme PDFs, with exact programme/version scope. No identical-teaching, admissions or final-degree inference is permitted.
- The scoped English pilot checks the actual course-title evidence, treating spoken “and” as equivalent to “&”. It does not require the model to recite an arbitrary planning question verbatim. Other legacy delivery contracts retain their strict behavior. Questions/actions are assessed in editorial review; this formatting check does not prove semantic correctness.
- Valid shortlist restoration is recognised as a consequence. The final critic is told not to force a mandatory research question or invent a full module comparison when the supplied evidence only establishes a shared title.
- The pre-writing review policy was calibrated against observed failures. Quote-grounded integrity concerns can block generation. Other creative criticism is retained in `reviewNotes` as untrusted advice, rather than automatically vetoing a valid requested-channel Draft. The writer must preserve the evidence and actual story logic instead of blindly following that advice. Human editorial approval remains mandatory; the model cannot grant it.

## Calibration: evidence and limitations

| Test | Result | Meaning |
| --- | --- | --- |
| [Initial six-case batch](reviewer-calibration-2026-11-16-01/result.json) | 5/6 | Missed an emotional-only payoff. |
| [Revised six-case batch](reviewer-calibration-2026-11-16-02/result.json) | 6/6 | Passed those explicit examples; this was not general accuracy proof. |
| [Broader eight-case batch](reviewer-calibration-2026-11-16-03/result.json) | 7/8 | Missed an unsupported curriculum claim. |
| [Eight individual reviews, matching production format](reviewer-calibration-2026-11-16-04/result.json) | 5/8 | Detected the bad cases but rejected three valid ones. |

Expected labels were not sent to the model. They were authored by the same assistant implementing the change, so this is not an independent human validation study. Batch size, source revisions and prompt context differ; these results do not isolate a causal effect of any one prompt change.

The failed broader tests are the reason creative judgements remain advisory. Exact quotations establish where criticism points; they do not establish that the interpretation is correct. Integrity concerns are still model judgements, not a universal source-certification system. The actual story must pass the unchanged editorial rubric before publication.

## Actual generation results

All runs contain complete returned scripts or explicit failures, source hashes, rejected plans/candidates and stage timing traces. There are no manually rewritten model outputs or offline substitutions.

| Source stage / runs | Outcome |
| --- | --- |
| Initial isolation, Trust 01–03 | Returned scores 73 and 63; the third request failed concept review. |
| Action brief, Trust 04 | Returned 62; the student motive and excluded option were inconsistent. |
| Explicit human premise, Trust 05–06 | One returned pilot at 86; the repeat failed pacing/literal-anchor checks. |
| Evidence/paraphrase pilot, Trust 07 | Returned 87, with an optional rewrite failure and retained initial Draft. |
| [Identical-source set, Trust 08–10](trust-repetitions-2026-11-16/SUMMARY.md) | Two returned pilots at 86 each; one requested-channel concept rejection. Repeatability did not pass. |
| [Final-policy Trust 11](../phase3-evaluation/trust-2026-11-16-11/EVALUATION.md) | Returned six scenes at 86 in 29.424 seconds, with correct exclusion → evidence → provisional-restoration logic. |
| [Final-policy Trust 12](../phase3-evaluation/trust-2026-11-16-12/REPORT.md) | Gemini provider unavailable; no storyboard or score. Planned third repetition was not attempted. |

The source changed between stages; their scores must not be pooled as a controlled repeated trial. Only each explicitly identical-source cohort is comparable. Scores are assistant editorial judgements using the existing weights and thresholds. Trust-only channel ratings assess the recognisable Trust experience; no fresh three-channel differentiation pass is claimed. All returned scripts remain Draft in the app even when the report score passes 85.

The latest returned pilot shows the student changing the same research card from Discard to Provisional after reading the official row. It does not promise B.Com suitability or equal teaching. Remaining improvements include more original execution, clearly legible source scope and stronger audience testing. No recorded natural read-aloud or deployed browser generation test was performed.

## Verification

[Build](../verification/trust-focus-2026-11-16/build-results.txt), [full regression](../verification/trust-focus-2026-11-16/regression-results.txt), [requested-channel isolation](../verification/trust-focus-2026-11-16/isolation-results.txt) and [source-evidence checks](../verification/trust-focus-2026-11-16/evidence-results.txt) pass. The existing large-bundle warning remains. Source hashes match the final-policy Trust 11/12 engine files, and the new artifact credential scan passes.

Tests cover malformed Discovery data not blocking Trust, valid local alternatives, bounded repair, topic/channel-specific brief scope, advisory-note retention, integrity rejection, legacy data behavior, natural question wording, ampersand equivalence and missing factual-evidence rejection.

## Next gate

Resume the incomplete final-policy Trust repetitions when Gemini is available. Require repeated acceptance at the unchanged 85 overall and HLNI/differentiation ≥4 floors, while continuing toward above 90. Only then expand fresh live evaluation to Connection and Discovery. Current expansion is held back; native-language creative quality and generalisation beyond this pilot remain unverified.

Staging, production, GitHub main and cloud environment publication are unchanged. Existing saved stories and authored offline samples are preserved.
