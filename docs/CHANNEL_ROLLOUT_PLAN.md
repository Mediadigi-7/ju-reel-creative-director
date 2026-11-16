# Channel strategy rollout plan

Current creative contract: [Flexible 6 × 3 framework](FLEXIBLE_CREATIVE_FRAMEWORK.md). This supersedes the fixed six-shot and mandatory-CTA assumptions in historical entries below.

Goal: Trust, Connection, and Discovery must guide generation, remain independent of treatment/style, and survive editing, saving, and sharing. Work proceeds in order; each phase has its own evidence and completion status.

## Phase 1 — Channel-aware generation (complete)

- Add a shared channel definition with its audience, purpose, creative guidance, and factual constraints.
- Carry channel from Ideas and the create screen through API requests, live generation/repair, and scene regeneration.
- Store and display channel on new reels; retain it in library storage, exports, and shared links. Older reels remain unclassified rather than receiving an invented channel.
- Preserve the offline catalogue's actual editorial scope. A fixed sample is not silently relabelled to meet an incompatible channel request.
- Acceptance: channel appears in provider prompts and returned metadata; stays unchanged after repair/regeneration/save/share; unsupported values and incompatible offline requests fail clearly; UI and existing regressions pass.

## Phase 2 — Real generation test in AI settings (complete; real-account success not yet verified)

- Add Test AI generation beside the existing key verification.
- Make a small real generation request using the selected provider and configured model, with no offline fallback.
- Report provider/model and safe failure categories (authentication, quota/billing, model access, network, invalid response), without keys or raw sensitive provider responses.
- Explain that the test can consume API credit.
- Acceptance: mocked success and failures exercise the actual test route; settings handles loading/error/success; browser checks pass. A real-account success is recorded separately.

## Phase 3 — Live content validation (free-tier Gemini; awaiting secure key)

- Generate the same idea for Trust, Connection, and Discovery using a real provider.
- Review idea fidelity, audience fit, distinct execution, one CTA, six-stage coherence, and factual/proposal wording.
- Check at least one native-language output and a scene regeneration; preserve other scenes and user edits.
- Requires usable provider credentials in the execution context or a user-run test in their browser. Do not ask for secret values in chat. Offline/mocked tests do not establish live creative quality.

## Phase 4 — Staging deployment and smoke test (target verified; awaiting successful live validation)

- Confirm host and current application URL; repository configuration suggests Vercel.
- Prepare a reviewable change and deploy to staging using authorized hosting access. Do not publish a production release implicitly.
- Verify API routing, real generation, error reporting, editing, save/reopen, shared links, PDF export, and mobile layout on staging.
- Record the staging URL and actual checks; report any external access blockers precisely.

## Decisions still requested

- Confirmed: Connection is university-managed, with an informal student-centred voice; never pretend to be an independent account.
- Confirmed current application: https://ju-reel-creative.vercel.app/ on Vercel. Staging access and deployment credentials still need verification.

## Existing safeguards retained

Exactly six stages; original idea remains central; channel does not dictate tone; one CTA; proposed 2027–28 programmes remain explicitly proposed; no fabricated institutional claims; no silent live-to-offline fallback; old local edits and library records are preserved.


### Phase 1 evidence

All three channels × three treatments pass request/repair/regeneration prompt tests, audience binding, metadata, storage separation, sharing, exports, and legacy compatibility. Chromium confirms create-screen selection, library selection independent of treatment, shared-reel channel preservation, incompatible offline-channel blocking, and phone-width layout. The build and full regression suite pass.


### Phase 2 evidence

Service and HTTP-route tests pass for both provider paths, missing key, authentication, quota, rate limits, model access, provider failure, network failure, timeout, invalid response, and rejected storyboard output. Results contain no credential echoes. The test performs one generation request with no offline fallback. Chromium checks pass for saved-settings loading, pending state and duplicate prevention, simulated success, stale-result clearing, safe errors, empty-key disabling, and phone width. All browser success/error responses in this check were simulated, not proof of real provider access.

### Access observations and staging preparation

The current cloud instance reports enforced restricted networking, no secret bindings, and no OPENAI_API_KEY, GEMINI_API_KEY or VERCEL_TOKEN in the actual process. A public read of https://ju-reel-creative.vercel.app/ failed with CONNECT 403; a GitHub deployments metadata read also returned Forbidden. A GH_TOKEN variable exists, so a missing GitHub token is not assumed and no duplicate GitHub credential is requested.

Vercel configuration now routes /api paths to the serverless Express handler and application deep links to index.html, with a 60-second function budget. Generation has a 50-second overall provider-request budget; the generation test has a single 45-second request budget. These settings are prepared, not evidence of a successful Vercel deployment.


### Access draft and next execution

Required destinations and secret metadata were saved in the environment draft (no values). The running instance has not applied them. Review/save/publish the cloud environment after entering values securely to resume actual live validation and deployment. No application deployment or production release has occurred. The live runner is `npm run validate:live`; staging preparation and refusal checks are documented in STAGING_AND_LIVE_VALIDATION.md.


### Verification after environment publication — 2026-11-06

The published workspace restored the implementation and dependencies. Current runtime observations are current, networking is enforced with the requested domains, and both credential bindings report ready. Actual Vercel metadata reads and the exact project/owner/domain verification succeed. The verified non-secret selectors are saved locally in ignored scratch/verified-vercel-target.json and must be rechecked by the deployment guard before any preview.

Actual OpenAI generation testing fails authentication. A separate read-only /v1/models request confirms HTTP 401 with code invalid_api_key. No further billable validation requests were made after this failure. Replace the value of the existing REEL_OPENAI_API_KEY binding securely; do not add a duplicate binding or paste a value into chat. After the updated value is applied, retry the real validation runner. Production and staging have not been deployed by this work; staging remains gated on the failed live-validation prerequisite.


### Verification after updated key — 2026-11-06

The new instance reports current ready secret bindings and enforced network policy. OpenAI's read-only model-list request now returns HTTP 200, and gpt-4o-mini is listed. The actual single-request generation preflight fails with the billing_quota category. Authentication is therefore resolved; a further key replacement is not indicated by the observed response. The three-channel outputs, Tamil check, and regeneration check remain unrun because the prerequisite generation test failed. No repeated generation requests were made without a billing/quota state change.

Vercel project/owner/domain verification succeeds again for ju-reel-creative.vercel.app. No preview or production deployment was made. Resume validate:live after API credits/quota for this key's organization/project are available; the same credential can be retained.


### Free-only requirement — 2026-11-06

The user requires free API use. OpenAI billing is no longer a prerequisite; do not make further paid OpenAI validation requests. Live validation now explicitly uses Gemini through REEL_GEMINI_API_KEY, with no provider fallback. The user should supply a Google AI Studio key from a project with billing disabled. Free-tier availability and quota depend on the account, region, and model; key presence alone does not establish free generation access.

The Gemini model configuration was updated from the old hardcoded identifier to gemini-3.8-flash, the example in Google's official js-genai README retrieved from https://raw.githubusercontent.com/googleapis/js-genai/main/README.md. This is a model-name reference, not evidence of free-tier entitlement. Actual model and quota checks remain pending. Gemini authentication now uses x-goog-api-key headers rather than query strings. Existing OpenAI bindings are preserved but are not used by the free-only live validation runner.

### Latest live verification — 2026-11-06

The updated Gemini binding is ready and actual generation succeeds with gemini-3.1-flash-lite. The earlier 3.8 model timed out during full generation; the selected Flash-Lite model completed a real six-shot preflight in 5.8 seconds. No OpenAI request or offline substitution was used. API success alone does not establish the project's billing configuration; keep billing disabled in the user's Google project for free-only use.

Phase 3 remains incomplete. Earlier outputs exposed romanized Tamil and overly similar channel treatments. The engine now checks native dialogue and captions separately, enforces total and per-scene spoken pacing, preserves neutral comparison subjects, and gives stronger channel-specific guidance. The latest run produced a 54-word Trust script, but Connection and Discovery exhausted their repair attempts on pacing checks, and Tamil exhausted repairs on native-script captions. Native output and hook regeneration therefore remain unverified in this run. The ignored local report is scratch/live-channel-validation.json.

Build, full npm test suite, freshness suite (including new regression cases for romanized dialogue hidden by native captions and excessive speech), and git diff --check pass. These local checks are distinct from the partially failing live run. No preview or production deployment occurred. The next step is to improve constrained live repair, rerun the failed channel/language cases, then review the actual creative content before advancing to staging.

### Targeted repairs and editorial review — 2026-11-06

The next real Gemini run passed the preflight and produced all three English channels within speech limits using targeted dialogue/caption repair. Tamil, Telugu and Malayalam retained `vs` in degree-comparison captions; the run stopped when Hindi hit free-tier quota. No further live requests were made after quota failure. A narrow comparison-label normalizer now uses a neutral slash between the existing degree identifiers. Replaying the three genuine saved native candidates through the complete QA checks passes with all spoken dialogue unchanged. Hindi and live regeneration remain unverified.

Editorial review still rejects the channel similarity and unqualified curriculum stereotypes in those saved outputs. The generation brief and comparison constraints have been tightened, but these latest creative changes require fresh live validation after quota resets. Full evidence, acceptance criteria, and remaining steps are in [LIVE_CREATIVE_REVIEW.md](LIVE_CREATIVE_REVIEW.md). No preview or production deployment occurred.


### Approved references and scored fresh run — 9 November 2026

All three attached B.Com vs BBA reference scripts are user-approved as non-mandatory creative benchmarks. Canonical text and rubric: [creative-references/README.md](creative-references/README.md). Their institutional claims still require the actual supporting curriculum documents before factual use.

Three fresh real Gemini Auto outputs were generated with AI-supplied narrative-function tags and complete production fields. Each has three shots; that count and the Informative treatment selected by the model are valid. Evidence-based editorial scores are Trust 42/100, Connection 47/100 and Discovery 38/100. All require revision under the user's proposed 85/100 total and 4/5 HLNI/differentiation thresholds. The full scripts, scores, critical-trigger decisions and specific revisions are in [the Phase 3 evaluation](phase3-evaluation/run-2026-11-09-01/EVALUATION.md).

The shared desk/module-comparison concept is the main differentiation failure; operational HLNI and demonstrated payoffs are still weak. This completes the requested generation/evaluation artifact, not creative approval or Phase 3 acceptance. Staging is not deployed; production is unchanged.


### Concept-first architecture repair — 9 November 2026

Implemented a separate concept/HLNI planning stage. The original topic and entities stay locked, but category takeaways and career-fit assumptions are no longer imposed before concept selection. The selector evaluates compatible candidate combinations, grounds supported reasoning methods, and gives the writer only its selected concept. Details: [CONCEPT_SELECTION_FIX.md](CONCEPT_SELECTION_FIX.md).

Latest live verification: [run 12](phase3-evaluation/run-2026-11-09-12/EVALUATION.md). Trust improved from 42 to 72/100 and Connection from 47 to 63/100 under the same rubric. Discovery was rejected for topic drift and is not scored. These results do not meet Phase 3 acceptance. Build/regression/browser checks validate the implementation, not creative-quality approval. No staging or production deployment occurred.

### Release review after user accepted proceeding — 12 November 2026

The user accepted moving forward from Phase 3A; the recorded 72/63/73 scores remain unresolved editorial findings, not automatic approval. [Current factual, language/offline and app review](release-review/2026-11-12-01/README.md). Automatic factual-compliance UI assurances were removed. All 90 offline versions pass technical checks, and complete five-language editorial review packets are prepared; no native/editorial approval is claimed. The official source supplied is joyuniversity.edu.in, currently blocked by managed proxy CONNECT 403. A narrowly scoped cloud network draft adds the official domain while preserving existing access; it is saved, not applied or published. Staging and production remain unchanged.

Release-review completion: current browser checks also pass human-review persistence/invalidation, saving and shared deep-link reopening. A fresh read-only Vercel target guard returned HTTP 403; historical project verification must not be treated as current access. See the release-review report for evidence and the two separate access blockers. No deployment was attempted.
