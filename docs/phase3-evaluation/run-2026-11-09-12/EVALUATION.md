# Phase 3 — creative-quality evaluation

**Decision: REVISE. This run does not authorize deployment.**

Fresh run started 9 November 2026 at 4:36 pm IST. Provider/model: Gemini / gemini-3.1-flash-lite. Topic: B.Com vs BBA. Auto (Let AI Choose), English, 28-second target per channel.

[Approved canonical references](../../creative-references/BCOM_VS_BBA_APPROVED.md) · [Reference status and rubric](../../creative-references/README.md) · [Manifest](manifest.json) · [Machine-readable evaluation](evaluation.json)

This run uses the repaired concept-first engine: candidates are proposed and grounded in bounded reasoning tools; compatible selections are compared before one chosen concept is sent to the writer. The writer receives only its selected channel benchmark. Gemini uses structured response schemas. Scores below are editorial judgements on delivered stories, not scores for the planner's metadata. Source/output files are unchanged.

## Results

| Channel | Complete output | HLNI /5 | Differentiation /5 | Total /100 | Decision |
| --- | --- | ---: | ---: | ---: | --- |
| Trust | [Storyboard](trust.md) · [JSON](trust.json) | 4 | 3 | 72 | REVISE |
| Connection | [Storyboard](connection.md) · [JSON](connection.json) | 3 | 3 | 63 | REVISE |

Trust and Connection produced complete three-shot Informative storyboards with real example inputs and resulting questions. Discovery was rejected after bounded topic-fidelity repairs because B.Com disappeared from the actual production content; it has no delivered storyboard or creative score. Concept selection is no longer locked to the same module-comparison method, but this run does not meet Phase 3 acceptance.

**Discovery: not scored.** No validated storyboard was delivered (output_validation). Rejected candidates, where recorded, are in the run's quality-failure artifact; they are not approved outputs.

## Scoring method and hard gates

Each editorial rating is 0–5: 0 missing, 1 poor, 2 weak, 3 partial, 4 strong, 5 exceptional. Weighted total = Σ(weight × rating / 5). Apply the user's proposed thresholds: total ≥85, HLNI ≥4 and differentiation ≥4. Material factual errors, missing meaningful insight and unworkable production instructions independently trigger revision. These are reasoned editorial judgements, not an objective measurement of creativity.

No external curriculum source audit was performed. An unsupported claim is not labelled proven false: material-factual-error triggers are therefore not asserted. References still require verification before using apparent document evidence.

## Trust — 72/100: REVISE

| Criterion | Weight | Rating /5 | Weighted points | Evidence in actual output |
| --- | ---: | ---: | ---: | --- |
| High-Leverage New Information | 25% | 4 | 20 | Shots 2–3 now separate task, grading and feedback, then use unknown cells to ask a precise assessment question. The example is labelled Example and makes no verified degree-content claim. This is a usable question-forming method, stronger than the baseline's check-the-module advice. |
| Channel differentiation | 20% | 3 | 12 | The assessment audit is a different reasoning basis from Connection's preference check, but both finished stories still show an uncertain student at a desk, a checklist and a direct question. Three-way differentiation is unverified because Discovery was not delivered. |
| Narrative coherence | 20% | 4 | 16 | The title-based choice problem leads to an audit and a question about grading. The sequence is connected; it could better show why grading and feedback are distinct rather than reciting fields. |
| Payoff | 15% | 4 | 12 | Shot 3 supplies the concrete question What specific criteria do you use to grade this submission? It follows from an unanswered criterion cell and gives a relevant next action without diagnosing degree fit. |
| Production readiness | 15% | 3 | 9 | Fields/timecodes are complete and consecutive. Worksheet assets are feasible, but Analyze Q3 financial variance is specialist language for a broad +2 audience, and the graphic/voiceover load in Shot 2 needs a natural read-aloud and phone-size legibility check. |
| Originality | 5% | 3 | 3 | The selected audit is more specific than the old module-matching idea, but desk/brochure/confused-student staging and a three-column worksheet remain familiar and close to the reference device. |

**Hard-trigger assessment:** No hard trigger asserted: a meaningful bounded method is present, no material factual falsehood was established, and filming is feasible. Revision is required because the total and differentiation floor are not met.

**Decision reasons:** Overall score is below 85/100. Channel differentiation is below 4/5.

**Specific revisions:**

1. Shot 2: use a +2-friendly illustrative task, such as making a short shop poster or explaining a simple chart; show one known work product and one clearly missing assessment criterion.

2. Connect the empty criterion to the final question on screen, so the viewer sees what the audit changes rather than only hearing the three headings.

3. Choose a fresh evidence/question-testing execution that is more distinct from Connection's checklist. Do not force a new shot count, function order or treatment.

**Production evidence:** 3 shots; 48 spoken words; Informative.

| Shot | Timecode | AI-supplied function tags | Words | Seconds |
| --- | --- | --- | ---: | ---: |
| 1 | 00:00 – 00:06 | HOOK, PROBLEM | 13 | 6 |
| 2 | 00:06 – 00:18 | VALUE, PATTERN_INTERRUPT | 17 | 12 |
| 3 | 00:18 – 00:28 | PAYOFF, CTA | 18 | 10 |

Time budgets are text estimates, not a recorded natural read-aloud or proof of legible evidence footage.

## Connection — 63/100: REVISE

| Criterion | Weight | Rating /5 | Weighted points | Evidence in actual output |
| --- | ---: | ---: | ---: | --- |
| High-Leverage New Information | 25% | 3 | 15 | The script makes a useful partial distinction between liking a topic and verifying its role in a programme. However, its graphic asks for a Required prerequisite while the dialogue asks core subject versus elective. Those are different checks, so the practical method is not clear enough for 4/5. |
| Channel differentiation | 20% | 3 | 12 | The planned constraint-check basis differs from Trust's assessment audit, but the finished device is again a lone student, labelled degree cards, a checklist and a direct question. A specific personal situation or human exchange is not developed; a second actor itself is not required. |
| Narrative coherence | 20% | 3 | 12 | Preference versus availability is a coherent starting tension, but the switch between prerequisites, required subjects and elective choice blurs the progression. |
| Payoff | 15% | 3 | 9 | The exact resulting question is delivered, but it does not resolve which unknown was recorded in the prerequisite cell. The viewer needs one consistent investigation to carry through. |
| Production readiness | 15% | 4 | 12 | The cards and checklist are simple, the source is visibly labelled Example, and the production fields/timecodes are complete. A timed read-aloud remains necessary, but there is no impossible production instruction. |
| Originality | 5% | 3 | 3 | The interest-versus-confirmation angle is more specific than generic reassurance, while the worried-student-to-confident-nod execution remains familiar. |

**Hard-trigger assessment:** No hard trigger asserted: the interest-checking idea is partially useful, no actual institution's rules are asserted, and production is feasible. It fails total, HLNI and differentiation thresholds. The confusing terminology requires revision rather than being labelled a proven material factual error.

**Decision reasons:** Overall score is below 85/100. HLNI is below 4/5. Channel differentiation is below 4/5.

**Specific revisions:**

1. Choose one unknown: whether the desired subject is compulsory/elective/available, or whether an actual entry requirement is satisfied. Do not mix those questions.

2. Make a concrete student's preference create an observable question or interaction, then show how checking the answer changes the next action. A personal exchange, experiment or another genuine human device can work; none is a mandatory template.

3. Replace the generic confident nod with the consistent result of the chosen check. Preserve the limited claim: preference alone does not confirm availability or suitability.

**Production evidence:** 3 shots; 53 spoken words; Informative.

| Shot | Timecode | AI-supplied function tags | Words | Seconds |
| --- | --- | --- | ---: | ---: |
| 1 | 00:00 – 00:08 | HOOK, PROBLEM | 20 | 8 |
| 2 | 00:08 – 00:20 | VALUE | 16 | 12 |
| 3 | 00:20 – 00:28 | PAYOFF, CTA | 17 | 8 |

Time budgets are text estimates, not a recorded natural read-aloud or proof of legible evidence footage.

## Cross-channel finding and next step

The selected insights now differ: assessment-question auditing, preference-versus-requirement checking, and an aggregate counterexample. The available stories are more operational than baseline run 01: each shows an example and asks a specific resulting question. However, Trust and Connection still lean on similar lone-student/checklist execution, Connection confuses prerequisites with core/elective status, and Discovery failed topic retention. Distinct planning metadata is not sufficient evidence of distinct, strong finished stories.

Keep the concept-first architecture. Next improve writer delivery: retain the named comparison while keeping illustrative data neutral; simplify examples and terminology for +2 viewers; make the Connection experience arise through a specific human situation and a usable tool. Re-evaluate complete outputs using the same thresholds. No score is assigned to the rejected Discovery drafts, and no staging deployment is authorized.

## Status

- References: user-approved.
- Validated fresh storyboards: 2/3.
- Editorial decision: REVISE.
- Staging not deployed; production unchanged.
