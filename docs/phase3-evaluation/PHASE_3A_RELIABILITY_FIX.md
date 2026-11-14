# Phase 3A — deadline-aware generation reliability fix

**Decision: CONTINUE PHASE 3A. Staging unchanged. Production unchanged.**

12 November 2026. The live request-budget failure is addressed and all three new Gemini drafts completed within the unchanged 50-second limit in one observed set. Creative acceptance remains unmet: **Trust 72, Connection 63, Discovery 73 /100**. None reaches 85. These are assistant editorial judgements on actual outputs, not independent human-panel approval.

[Full editorial evaluation](run-2026-11-12-05/EVALUATION.md) · [Complete Trust storyboard](run-2026-11-12-05/trust.md) · [Complete Connection storyboard](run-2026-11-12-05/connection.md) · [Complete Discovery storyboard](run-2026-11-12-05/discovery.md) · [Stage timings](run-2026-11-12-05/TIMINGS.md) · [Manifest and source hashes](run-2026-11-12-05/manifest.json)

## A. Root cause and evidence

The previous implementation set one 50-second deadline, then sequentially executed concept planning, writing, possibly ordinary repair, optional critique and a full advisory rewrite. `providerJsonClient` limited an individual call to the remaining deadline, but it did not reserve time for subsequent work. The writer loop started critique after an output-check pass based only on an unused repair count. It had no check that critique **and a complete rewrite** could fit.

The earlier [run 04 manifest](run-2026-11-12-04/manifest.json) records Trust failing after **50,005 ms**. Its [captured critique](run-2026-11-12-04/REJECTED_ATTEMPTS.md) shows that the initial writer reached critique; the log recorded the critique and entered the following writer iteration before timing out. The precise failure boundary was the advisory rewrite's awaited `requestCandidate` call in the writing loop, whose fetch timeout was the remaining shared deadline. The exception escaped the loop and became the whole request's timeout error. There was no separately retained validated candidate to return.

That historical run had no stage instrumentation. It cannot establish how much of its budget planning, writing, critique or rewrite individually consumed; slow provider service is possible but cannot be isolated from those records. The verified control-flow defects are cumulative sequential budget consumption, lack of an optional-work reservation, and loss of an already valid result. The fix does not increase the deadline or assume Gemini latency alone caused the failure.

Cancellation also stopped at provider-generated timeout signals: callers could not propagate their own abort signal, and the Express routes did not forward client disconnects. The planner's in-flight promise coalescing could couple two callers to the first caller's request deadline. Browser-side catch logic could additionally substitute an offline sample when a failing server request had no browser key, even if the server had a live credential.

## B. Implementation and compatibility

- [requestBudget.ts](../../server/requestBudget.ts): shared budget constants, external cancellation check, abort-controller/timer cleanup, and typed stage events. The end-to-end ceiling is still 50 seconds; 1.5 seconds is reserved for finalisation. New complete writing/repair calls need at least 12 seconds available. Planning calls reserve that writer minimum and have a 15-second cap.
- [providerClient.ts](../../server/providerClient.ts): computes the remaining stage budget, combines it with the caller's abort signal, keeps the timer active through response-body consumption, and cleans up listeners/timers. All supported provider calls use the signal; only Gemini was used in live validation. Stages report durations, remaining time and safe error categories, never credentials.
- [aiService.ts](../../server/aiService.ts): stores a clone only after the complete ordinary output checks pass. Optional critique requires eight seconds for critique, at least twenty seconds for rewriting (or 1.5× the observed writer time, whichever is larger), validation allowance and finalisation margin. Critique runs at most once, only with a remaining repair slot. An optional error, timeout, malformed critique or invalid rewrite retains that same request's valid candidate and adds a visible warning. It never substitutes previous, cached or offline storyboards. Cancellation always stops the request rather than returning a fallback. With no valid candidate, errors remain errors. Ordinary repairs are bounded by count and remaining time.
- [conceptPlanner.ts](../../server/conceptPlanner.ts): removes shared in-flight requests bound to another caller's abort/deadline; completed, account-scoped concept-plan reuse remains. Stronger guidance establishes one specific student situation, consistent unknown and consequence before shots. Different devices must produce different experiences. No hardcoded scripts, shot counts or channel-exclusive templates were added.
- [requestCancellation.ts](../../server/requestCancellation.ts), [server/index.ts](../../server/index.ts), [api/index.ts](../../api/index.ts), [testAiGeneration.ts](../../server/testAiGeneration.ts): forward client disconnect/cancellation through generation, testing and shot regeneration. Normal request-body completion does not falsely cancel work. Provider errors are returned as safe typed error codes rather than a generic 500. Shot regeneration retains the existing scene number, boundaries and diagnostic function tags.
- [src/services/api.ts](../../src/services/api.ts): accepts optional caller signals, shows safe provider error messages and removes catch-based offline substitution. Healthy no-key offline mode still exists on the server; failed live requests stay visible.
- [shared/types.ts](../../shared/types.ts), [shared/schema.ts](../../shared/schema.ts), [CompactTopBar.tsx](../../src/components/CompactTopBar.tsx): optional generation warnings survive parsing and are displayed with provenance. Legacy stories need no migration. Neither warning metadata nor model critique grants approval.
- [phase3CreativeRun.ts](../../scripts/phase3CreativeRun.ts): archives source hashes plus HEAD identity, exact model/parameters, full outputs, warnings, stage durations, QA failures and final Draft/error status. A provider/transport failure stops subsequent attempts; there is no paid fallback or unchanged retry loop.

The source controls and production storyboard format remain intact. No saved-content migration or overwrite was run. Every returned new story is Draft; existing content-bound human approval and edit invalidation remain in force. No staging or production action was performed.

## C. Test evidence

All passed before the one fresh live set:

- [TypeScript and Vite build](run-2026-11-12-05/verification/build.log). The pre-existing large-chunk warning remains non-blocking.
- [Full npm regression suite](run-2026-11-12-05/verification/regressions.log), including offline catalogue, variable scene counts, channel strategy, provider errors, repairs, sharing, text/PDF workflows, edits, HLNI approval invalidation and rubric calculations.
- New deterministic [budget regressions](../../server/requestBudgetTestSuite.ts): insufficient-time critique skip; retained Draft after network/quota/timeout or malformed critique; retained Draft after advisory rewrite timeout or invalid output; explicit error with no valid candidate; at most one critique; ordinary-repair time reservation; provider errors; pre-abort and abort during writing; original-topic/factual precedence over critique; no approval, no paid/offline fallback; unchanged scenes and shared boundaries; no mutation of existing content.
- New [local HTTP integration tests](../../server/httpReliabilityTestSuite.ts): actual API quota error propagation and a client disconnect aborting the in-flight mocked provider with no subsequent model call. These use mocked provider responses, not OpenAI or Gemini network requests.
- [Seven freshness cases](run-2026-11-12-05/verification/freshness.log) and `git diff --check` passed.
- Manifest/source, output and evaluation SHA-256 checks passed. The source hashes match the exact code used by the live run. Tests are not creative approval or proof of future provider latency.

## D. One fresh live Gemini validation set

Exact request: **B.Com vs BBA; Trust, Connection, Discovery; Auto; English; 28 seconds; gemini-3.1-flash-lite; 50-second maximum**. The existing configured Gemini key was used without logging it. Billing status is not inferred from key possession. No OpenAI requests or provider changes were made.

| Channel | End-to-end | Advisory result | HLNI /5 | Differentiation /5 | Score /100 | Decision |
| --- | ---: | --- | ---: | ---: | ---: | --- |
| Trust | 13.979 s | One critique; validated rewrite returned | 4 | 3 | 72 | REVISE |
| Connection | 7.977 s | One critique; rewrite failed scene pacing; initial validated Draft retained with warning | 3 | 3 | 63 | REVISE |
| Discovery | 11.239 s | One ordinary repair; one critique; validated rewrite returned | 4 | 4 | 73 | REVISE |

All three full storyboards and their actual HLNI proposals are linked above. All actual production fields and diagnostic tags are preserved. [Rejected candidates and exact QA/critique feedback](run-2026-11-12-05/REJECTED_ATTEMPTS.md) remain visible. Critique text in that archive is untrusted model advice, not verified facts.

Trust separates task, criteria and feedback and now asks about the missing rubric, but stops short of showing how checking it changes preparation or comparison. Connection records difficulty reading a liabilities row, then switches to a question about a calculation; its generic solitary presenter also fails to develop a believable personal dilemma. Discovery delivers a relevant missing-evidence reveal, but checking whether one handbook lists a required task does not establish exclusive degree classification, and its official-looking placeholder is underspecified.

The unchanged weighted rubric and criterion-specific evidence, revisions, timecodes and word counts are in the [evaluation](run-2026-11-12-05/EVALUATION.md). Earlier 55/62/41 scores remain attached to run 01; they are not attributed to this implementation. The later historical timeout remains attached to run 04.

## E. Remaining risks

This is one successful live delivery set, not a statistical reliability or hosting-load guarantee. Optional time reservations use conservative fixed minima plus observed writer time; provider latency and free quota can still cause initial-generation errors. The local runner exercises the same generation service; it does not certify a deployed Vercel function, browser-to-Vercel networking, cold starts or infrastructure disconnect behaviour. No deployment was made.

No official institution/programme/current-curriculum evidence was supplied or independently verified in this run. These are bounded methods, not confirmation of JOY programme content. Delhi University/IGNOU creative references do not establish JOY facts. An actual institutional claim still needs institution, programme, curriculum/academic-year version when available, official source and exact supported claim. Proposed offerings remain proposed.

Natural read-aloud timing and phone-size graphic legibility remain unverified. The English run does not approve Tamil, Telugu, Malayalam, Hindi or offline catalogue creative quality. Existing compatibility tests do not replace fluent reviewers, content-owner approval, full browser regression or later production checks.

## F. Phase decision

**CONTINUE PHASE 3A.** The request-budget preservation path is implemented and has one successful three-channel live set, including real retention of a valid Draft after a bad advisory rewrite. Creative completion is still unmet. No channel reaches 85/100, and Trust/Connection also miss differentiation or HLNI floors.

The next creative correction is to make the selected method cause a specific, observable outcome in the actual story while retaining precise academic terminology and evidence scope. Re-evaluate a separately archived fresh set after those corrections. Do not lower thresholds or automatically approve the present drafts.

**Staging unchanged. Production unchanged.**
