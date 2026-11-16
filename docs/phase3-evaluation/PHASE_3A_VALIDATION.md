# Phase 3A — creative reliability validation

**Decision: CONTINUE PHASE 3A. Not ready to advance.**

12 November 2026. B.Com vs BBA, Auto, English, 28 seconds, Gemini `gemini-3.1-flash-lite` only. No OpenAI requests, offline substitution, deployment, or changes to users' saved content. The configured Gemini key was used; provider billing status cannot be established from a key alone.

## Changes evaluated

The existing concept-first writing engine remains in place. Planning and writing now explicitly require a single conflict, simple +2-level academic example, consistent terminology, and an observable consequence. Actual B.Com/BBA relevance must survive through the reveal or decision consequence. Missing evidence remains an unknown; it must not be filled with invented curriculum details.

A bounded model critique can request one advisory rewrite after the ordinary output checks pass and while a repair remains. This shares the existing repair and 50-second request budgets. The rewritten story must pass the existing checks. The critique is untrusted advice, never a source, independent rating, or application approval. The original topic and factual limits override conflicting suggestions. A request with no repair budget does not make the extra critique call. Every returned story remains Draft pending the existing human editorial gate.

Repeated model critique was tested and rejected as a strategy: the reviewer sometimes recommended dropping the original topic or inventing course evidence. One advisory pass limits that feedback loop but has not yet demonstrated creative reliability or timely delivery.

## Actual results and preserved attempts

| Independent run | Result | Evidence |
| --- | --- | --- |
| [01: prompt improvements](run-2026-11-12-01/EVALUATION.md) | Three complete outputs: Trust **55**, Connection **62**, Discovery **41** /100. All REVISE. | [Trust](run-2026-11-12-01/trust.md), [Connection](run-2026-11-12-01/connection.md), [Discovery](run-2026-11-12-01/discovery.md) include complete shots, timecodes, functions, production fields and proposed HLNI. |
| [02: repeated review experiment](run-2026-11-12-02/EVALUATION.md) | All three rejected. Unscored. | [Complete captured rejected candidates and QA](run-2026-11-12-02/REJECTED_ATTEMPTS.md). |
| [03: review instruction calibration](run-2026-11-12-03/EVALUATION.md) | All three rejected. Unscored. | [Complete captured rejected candidates and QA](run-2026-11-12-03/REJECTED_ATTEMPTS.md). |
| [04: final one-pass advisory implementation](run-2026-11-12-04/EVALUATION.md) | Trust timed out during rewrite. Runner stopped; Connection and Discovery not attempted. No scores. | [Captured candidate and critique](run-2026-11-12-04/REJECTED_ATTEMPTS.md), [manifest](run-2026-11-12-04/manifest.json). |

These scores are independent assistant editorial judgements using the user's unchanged rubric, not model self-scores or approval. The initial run is evidence about the prompt-only version; its scores cannot be attributed to the later implementation. Source hashes distinguish each run. Older 72/63/rejected results remain in [the previous baseline](run-2026-11-09-12/EVALUATION.md); scores have not been selectively replaced by better attempts.

## Weaknesses requiring correction

- **Trust:** The example already names the task, but the final question asks what task is assessed rather than asking about the missing marking criterion. The broad subject-overlap claim is unsupported in the supplied context. The payoff must demonstrate the consequence of checking the criterion.
- **Connection:** The availability check is more consistent than the previous prerequisite/elective mixture, but remains familiar advice delivered by a lone student. A believable personal dilemma and useful demonstrated decision method are still missing.
- **Discovery:** Naming both degrees at the start fixes entity disappearance, but does not make the rest a comparison story. The task-journal example lists an interest without inspecting a task or recording a difficulty. A supported, relevant surprise is still missing.
- **Delivery:** The final advisory-rewrite version exceeded the request deadline on its first channel. Successful mocked regressions cannot establish live delivery reliability.

## Acceptance and verification

Each channel still requires total ≥85/100, HLNI ≥4/5 and differentiation ≥4/5, with no material factual or production blockers. None is approved. Factual source audit and recorded speaking/graphic-legibility checks remain pending; method metadata does not certify a story.

Local verification passed: TypeScript/Vite build, full `npm test` suite, seven freshness regression cases, and `git diff --check`. Added tests exercise actual critique-driven rewriting, a single critique limit, malformed review rejection, provider error propagation, and Draft status with no automatic editorial approval. The existing Vite large-chunk warning remains non-blocking. No full browser regression or five-language/offline quality approval is claimed for this phase.

## Next work

First resolve the live request-budget blocker without substituting old content or abandoning factual constraints. Then obtain one fresh complete three-channel run from the final implementation and score the actual stories using the same rubric. Use specific shortcomings above to revise examples and payoffs. Do not lower thresholds or infer quality from schemas, tags or different tool IDs.

Factual verification, language/offline review, full app regression and staging remain downstream. Staging and production were left untouched.
