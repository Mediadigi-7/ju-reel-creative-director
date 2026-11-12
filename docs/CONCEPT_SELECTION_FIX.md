# Concept-first generation fix

The old engine chose a category-level takeaway before developing the concept. On B.Com vs BBA it locked every channel to comparing module lists. Random territory suggestions and benchmark summaries did not undo that choice. The old 42/47/38 evaluation is preserved in [baseline run 01](phase3-evaluation/run-2026-11-09-01/EVALUATION.md).

## Implemented flow

1. Lock the original topic, student question and named subjects without deciding the takeaway.
2. Ask the model for two candidate concepts per channel before requesting any production shots. Each proposal identifies the audience gap, human/visual concept, mechanism, illustrative demonstration and resulting question.
3. Ground the HLNI in a bounded editorial reasoning tool. Current tools are assessment-question auditing, a task-question journal, insufficient-information reasoning, constraint checking and an illustrative aggregate counterexample. These are reasoning foundations, not scripts, factual syllabus sources, channel-exclusive devices or psychological tests. They can be extended when verified evidence is available.
4. Examine all candidate combinations. Reject unsupported or colliding choices; choose a compatible set with concrete, readable demonstrations rather than blindly trusting the model's preferred IDs. This pre-story feasibility selection is not a creative-quality score or approval.
5. Give the writer only the selected concept, its rationale/limits and the selected channel benchmark. Keep the other channel selections as audit metadata, not competing writing instructions.
6. Check that the example and resulting question actually appear in spoken/visible production content. Content can unfold across scenes and props; valid equivalent conclusions such as Insufficient evidence and Not enough information are accepted. Known degree-lens, predictive, invented-credit and neither/both reasoning errors are rejected. These checks are targeted guards, not complete semantic verification.
7. Run the existing topic, language, pacing, structure and HLNI proposal checks. Record the returned angle and actual HLNI for subsequent planning, not an unused random territory. Human editorial approval remains mandatory.

Gemini receives structured schemas for concept batches, full storyboards and dialogue-only repairs. Shot arrays have no fixed count or function order. Function arrays are diagnostics, not required coverage. The production format, optional interrupt/CTA, existing authored offline stories and old saved reels are preserved.

## Runtime and privacy

A cold live request normally needs a planning call plus a writing call. Planning may have one bounded quality repair; writing retains its existing bounded repairs and shared 50-second deadline. There is no paid-provider switch or offline substitution after live failure. The settings explanation now mentions planning before generation.

A validated joint plan may be reused for its other unconsumed channels for two minutes in the same warm process. A consumed channel requests a new plan. Caches/history are bounded and scoped to the API account/provider/topic; credential values and cache keys are not returned or logged. This is not persistent cross-device novelty tracking. Each cold process still compares the three channel selections within its own planning request.

## Verification

Regression coverage includes stage order, a neutral topic lock, grounding that cannot be replaced by model-invented support, compatible alternative selection, collisions, unavailable evidence, operational steps, bounded failure, account isolation, native-script anchors, examples spread across scenes, equivalent conclusions, actual-content delivery/repair, preservation in sharing and returned-concept memory. Existing build, provider, authored-catalogue, flexible-story and HLNI review checks remain in the suite.

Browser checks verify concept-planned records still render in three- and eight-shot production pages, retain concept metadata after editing/autosave, export PDFs and fit a mobile viewport. Browser records are labelled workflow fixtures, not editorially approved content.

## Honest live outcome

The intermediate live runs are kept in `docs/phase3-evaluation/run-2026-11-09-02` through `run-2026-11-09-11`. They exposed unsupported energy/learning-style claims, arbitrary degree lenses, invented programme breakdowns, missing fields and overly strict delivery checks. They are experiments, not approved examples. Some runs are intentionally incomplete because validation rejected an output; no substitute was inserted.

The latest archived verification is [run 12](phase3-evaluation/run-2026-11-09-12/README.md). Trust and Connection delivered complete storyboards with distinct grounded methods. Discovery was rejected after bounded repairs because the actual content lost B.Com. It is not assigned a creative score. [The latest evaluation](phase3-evaluation/run-2026-11-09-12/EVALUATION.md) records actual evidence and remaining revisions.

The architecture defect is repaired; consistent creative-quality acceptance is not established. The latest editorial scores are Trust 72/100 and Connection 63/100 versus baseline 42/47. Discovery is unscored because it was not delivered; no score is invented for a failed case. No draft is automatically approved, no staging preview was deployed, and production is unchanged.

## Phase 3A follow-up — 12 November 2026

[Current validation report](phase3-evaluation/PHASE_3A_VALIDATION.md) records prompt improvements, bounded advisory review, all four independent attempts, complete available scripts and explicit failures. The final one-pass implementation timed out during Trust's rewrite; it has no completed three-channel creative validation. Earlier prompt-only scores are 55/62/41 and must not be attributed to the later implementation. Phase 3A remains open; staging and production are unchanged.

A live generation now may include one editorial critique and a rewrite, using the existing request deadline and repair budget. A critique cannot grant editorial approval. Repeated semantic-review gates were experimentally rejected after the reviewer suggested unsupported evidence and topic changes; the final pass treats critique as untrusted advice subordinate to the original brief.

## Deadline-aware reliability follow-up — 12 November 2026

[Current reliability fix and evidence](phase3-evaluation/PHASE_3A_RELIABILITY_FIX.md): run 05 completed all three new Gemini Drafts in 13.979/7.977/11.239 seconds, with source hashes and stage timings. Optional work now reserves a complete rewrite and response margin and preserves a validated same-request Draft on failure; client cancellation and provider errors propagate. Connection exercised the retention path after an invalid advisory rewrite. Creative scores are 72/63/73, all REVISE. These are distinct from the earlier run 01 and run 04 records. Phase 3A remains open; staging and production are unchanged.
