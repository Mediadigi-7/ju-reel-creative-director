# Why the current outputs miss 90/100

Scope: diagnosis of the existing engine and archived B.Com vs BBA runs. No app changes, model calls or deployments were made for this analysis. The scores are assistant editorial judgements using the agreed rubric, not audience-test results. These runs do not prove that the engine or Gemini can never produce a 90+ Reel.

## Evidence baseline

| Run | Trust | Connection | Discovery |
| --- | ---: | ---: | ---: |
| 14 November 01 | 63 | 47 | 73 |
| 14 November 02 | 63 | No accepted output | 68 |
| 14 November 04, latest source | 66 | 51 | 65 |

[Latest full evaluation](../phase3-evaluation/run-2026-11-14-04/EVALUATION.md). Run 04 returned three fresh Gemini outputs, each with six ordered stages, one final CTA, continuous 28-second timecodes and estimated speech pacing within limits. Structural improvement did not establish creative improvement. These are separate stochastic runs, not a controlled causal experiment.

## 1. Iceberg model

| Depth | Observed condition | Evidence and consequence |
| --- | --- | --- |
| Events | Weak payoff, mismatched question, similar execution | Trust ends with an inquiry rather than a demonstrated consequence. Connection moves from categorising expenses to auditing budgets. Discovery shifts from curriculum-membership evidence to assessment criteria. |
| Patterns | Degree uncertainty → desk/worksheet → a better question → generic advice | Different reasoning-tool identifiers survive, but student situations and visible devices converge. This appears across several recent accepted outputs. |
| Structures | Closed insight foundations, feasibility-based selection, phrase-presence validation and shared repair allowance | Grounding replaces candidate insight/steps/proof with one of five tools. Selection rewards short sample/question text. Delivery checks required strings, not causal validity or actual peer interaction. Pacing repairs consume opportunities for editorial review. |
| Operating assumptions inferred from those structures | A safe method, a named channel and all six stages will yield a strong script | The code protects legitimacy and format, but the story can remain generic, logically disconnected or emotionally empty. This is an inference about the implemented design, not a claim about anyone's intentions. |

Deepest finding: the enforceable generation checks and the editorial rubric reward different things. The UI correctly retains Draft status; this is not evidence that the application falsely granted editorial approval.

## 2. First-principles analysis

The smallest useful creative unit is a supported change for a specific viewer:

**Existing belief/problem → understandable evidence or demonstration → meaningful change in understanding/action.**

Each arrow must make sense. For Connection, "I cannot categorise this expense" can lead to "How should this expense be classified, and why?" Asking how budgets are audited is a different investigation. Putting the exact latter question into both the concept and screenplay cannot repair that logical gap.

The rubric allocates 80% to HLNI, differentiation, coherence and payoff, and 20% to production/originality. If the four core dimensions are all 3/5, even perfect production and originality produce only 68/100. Formatting and polish cannot compensate for a weak information/story foundation.

Necessary ingredients and present gaps:

1. Specific supported information: current planning receives no actual syllabi and disallows fact-based selections. Hypothetical methods remain viable, but the factual comparison route is closed for this run.
2. A strong original concept: candidate compatibility is checked, but the selection score does not assess useful surprise, causal payoff or student-specific stakes.
3. A logically valid demonstration: the code verifies sample/question presence; it does not establish that the question follows from the observation.
4. A distinct finished experience: selected concepts are compared before writing, while complete scripts are not compared together for actual channel differentiation.
5. A consequence visible in the story: payoff strings are required, but a sufficiently long description can still mean only "ask a question" or "feel comfortable".
6. A feasible production plan: timing checks work, but current repair orchestration can spend the editorial opportunity fixing speech.

The five reasoning tools are useful safeguards. Their existence does not prove a ceiling below 90; making them the only insight foundations and overwriting candidate insight fields is a plausible source of sameness that needs an isolated test. Likewise, no evidence here establishes that a paid API is needed.

## 3. Five Whys

1. **Why are the latest outputs below 90?** They deliver partial insight, weak consequences and insufficiently distinct channel experiences.
2. **Why do those weaknesses survive drafting?** The chosen observation, question and consequence are not consistently meaningful; the Connection writer also drops the selected two-student exchange.
3. **Why are such plans/scripts accepted as generated Drafts?** Feasibility checks confirm field completeness, selected identifiers, topic words, required phrases and production limits. They do not establish the key causal relationships or finished-story channel identity.
4. **Why doesn't the editorial review correct this reliably?** It is advisory and shares the bounded repair loop with pacing. In run 04 the Connection critic asked the writer to explain the auditing question as a consequence of the expense-classification observation, rather than challenging the mismatch. Its rewrite then failed speech limits and the valid initial Draft was retained. Discovery used two pacing repairs and received no critic pass even though about 43.46 seconds remained.
5. **Why is the system designed this way?** The current implementation strongly enforces safe claims, complete JSON, timing and availability. Creative-quality instructions are extensive, but key editorial relationships lack equivalent checks and evaluation at the point a concept is selected or a finished script is accepted for review.

Root cause: **an under-specified and insufficiently validated transition from grounded insight to human situation, causal demonstration and visible consequence.** Limited evidence inputs and a restrictive insight search space contribute. More prompt rules alone are unlikely to resolve this reliably, though their exact effect has not been isolated.

## Code evidence

- [Concept planner](../../server/conceptPlanner.ts): `chooseCompatibleConcepts` scores concise sample/question text and avoidance of selected jargon, after feasibility filtering; `groundConceptBatch` replaces HLNI/support/steps/rule/proof/limitations with tool values. All selected channels must use different basis IDs. Neither rule establishes distinct finished storytelling.
- [Delivery validator](../../shared/concepts.ts): `conceptDeliveryIssues` checks normalized sample/question text and supported conclusion. It does not validate observation → question logic, cast/interaction fidelity or payoff consequence.
- [Writer and repair orchestration](../../server/aiService.ts): default two repairs; editorial review requires `attempt < maxRepairs`. Valid candidates remain Draft and are retained when optional rewrites fail checks.
- [Provider concept schema](../../server/generationSchemas.ts): requires payoff. The planning prompt's "exactly these fields" illustration omits payoff, while an earlier paragraph requests it. This is a confirmed instruction inconsistency; its contribution to the scores is unmeasured.
- [Benchmark injection](../../shared/editorialBenchmarks.ts): the model receives short reference summaries, not the full approved scripts or fully worked cause-and-consequence annotations. Human approval of the reference document does not mean its full detail reaches generation.

## Priority actions and falsifiable validation

1. **Add a small concept gate before writing.** Specify the viewer's starting belief, concrete demonstration, observation, warranted conclusion, visible consequence and evidence/limits. Reject an observation/question mismatch and a consequence that merely restates the method. Preserve creative freedom and six stages.
2. **Select for creative merit after factual feasibility.** Assess whether the concept offers a specific useful change, meaningful tension and a demonstrated consequence; do not rank principally by length. Model judgements remain advisory and need independent editorial verification.
3. **Check the actual finished scripts.** Verify promised interactions/situations, observation-to-question consistency, original-topic relevance and payoff. Compare the three completed storyboards for differentiated experiences; different basis IDs alone do not pass.
4. **Separate technical repair from editorial opportunity within the deadline.** Pacing fixes must not automatically exhaust the only critique opportunity; preserve the hard request limit and prevent unbounded calls. Keep technically valid but editorially weak output visibly Draft.
5. **Expand evidence and creative options carefully.** Add verified programme/assessment facts when available; allow original, supported methods beyond five fixed insight statements. Retain factual safeguards. Correct schema/prompt inconsistencies and supply concise annotated examples showing why a payoff works, without prescribing plots.

First experiment: hold topic, provider/model, six-stage requirement, duration and rubric constant. Change only the concept gate/selection first, archive every attempt, and separately assess concept quality before script quality. Then test the finished-script/repair changes. Evaluate several fresh runs per channel in assessor-blinded order, report the full score distribution and technical failures, and retain failed attempts. Expand to other topics and languages after this comparison. A single 90+ result is a successful example, not proof of reliability.

Decision: focus the next change on semantic concept quality and its survival into the script. No evidence justifies removing safeguards, reducing the threshold, buying an API, blaming the six-stage UI or rebuilding the entire engine.
