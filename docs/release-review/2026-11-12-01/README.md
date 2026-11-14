# Release review — 12 November 2026

The user accepted proceeding beyond the Phase 3A improvement cycle. The last creative scores remain **Trust 72, Connection 63, Discovery 73**; proceeding is not a rewrite of those results or automatic editorial approval. [Previous live validation](../../phase3-evaluation/PHASE_3A_RELIABILITY_FIX.md).

## Completed work

Removed automatic factual-compliance claims from the production summary and removed unsupported campus-size/recognition promotion from the footer. The summary now asks the editor to check institution, programme, academic year, proposal status and the official source for each actual claim. The legacy knowledge-base export name remains compatible, with its unverified provenance clearly documented. Original course data and all user stories were preserved.

The provided source of truth is **https://joyuniversity.edu.in/**. The initial read failed because the sandbox could not connect to its inherited proxy; repeating the same destination through the inherited proxy outside the sandbox returned **CONNECT 403**. No website content was obtained. This is a network-access blocker, not evidence that the website or university claim is false.

A cloud-environment network draft was saved for `joyuniversity.edu.in` and `www.joyuniversity.edu.in`, preserving all 151 existing effective destinations. It has **not** been applied or published. The environment tool returned `status: saved` and `requires_publish: true`. To apply it, review/save the draft and publish the cloud environment in Environment settings. That is separate from deploying the application. After application, recheck the actual official pages before certifying any claims.

## Factual review register

[Machine-readable claim and programme inventory](results.json) contains 13 legacy assertion groups, 45 older course entries and all 16 user-proposed additions. Official source fields are deliberately empty until the relevant page/document has been read.

- Legacy assertions and older offerings: **VERIFICATION REQUIRED**, not assumed current or false.
- Proposed programmes: exactly **16 programmes, nine schools, proposed for 2027–28**; user proposal provenance retained. This is not official launch or admissions confirmation.
- Institutional verification must record the exact supporting page/document, institution, programme where relevant, curriculum/academic-year version where available, and the exact supported claim. A homepage link alone does not verify every assertion.
- Do not generalise a group placement total, predecessor history or another university's curriculum into a JOY University programme claim.

## Offline and language technical audit

All **90 authored versions** passed the existing catalogue/schema, native-script, continuous-timecode and CTA consistency checks. The six-shot format here belongs to these authored legacy samples; it does not restrict new AI stories. All samples remain **Draft**, and none has an approved HLNI record. The audit did not modify catalogue text, timing logic or existing user data.

| Language | Versions | Actual estimated duration for a 28s request | Versions extended for speech | Editorial/native-speaker approval |
| --- | ---: | --- | ---: | --- |
| English | 18 | 28–29s | 1 | Pending |
| Tamil | 18 | 28–34s | 15 | Pending |
| Telugu | 18 | 28s | 0 | Pending |
| Malayalam | 18 | 28s | 0 | Pending |
| Hindi | 18 | 28–34s | 9 | Pending |

The existing catalogue allocator lengthens an authored sample when its estimated speech needs more time; it does not silently cut dialogue to match 28 seconds. These are text-based estimates, not measured native speech. A native-script pass does not certify fluency, meaning, register, pronunciation or cultural fit.

Review packets include every actual scene's dialogue, graphic, action, camera direction and timecode. Native packets include English source dialogue/graphics beside each translation:

- [English](english.md)
- [Tamil](tamil.md)
- [Telugu](telugu.md)
- [Malayalam](malayalam.md)
- [Hindi](hindi.md)

Each packet has fields for the actual HLNI, factual or bounded-method support, specific weaknesses, timed read-aloud and an editorial decision. No scores, native-speaker signatures or approvals were fabricated. Snapshot/source hashes and counts are in [manifest.json](manifest.json).

### Editorial issues to examine before approving offline content

The short-task stories must present exploratory clues and questions, not validated aptitude tests or proof of degree fit. The three-mistakes and college-checklist stories need a specific useful insight beyond familiar advice; visually distinct executions do not automatically establish strong HLNI. AI-error stories have concrete fictional checking demonstrations, but those examples should remain visibly fictional rather than appearing as real student or institutional evidence. Each native version needs the same qualifications and meaning as its English source.

These are targeted review concerns, not a claim that the 18 English narratives or 72 translations have received full semantic-quality approval.

## Verification evidence

Build, full regression suite and the separate proposed-programme suite passed. The latter confirms all 16 exact additions, nine-school classification, proposed wording and preservation of older course groups. The pre-existing Vite large-chunk warning remains non-blocking.

Isolated Chromium checks passed for Auto treatment, three- and eight-shot rendering, last-scene edits, autosave, selected-concept preservation, two real PDF downloads and a 390px mobile layout without horizontal overflow. The production screens contain neither the old automatic verified-compliance sentence nor the campus-size footer claim. Browser fixtures are explicitly labelled test content and stored only in a fresh temporary profile; no real user storage or provider keys were read.

Evidence logs and screenshots are saved alongside this report after verification. The previous Gemini live run is preserved as a separate artifact; no extra paid or Gemini generation was used for this audit.

## Next execution

Apply the saved cloud network draft, then verify the exact official pages and update the factual register with supported claims. Complete editorial/native-language and read-aloud review using the packets, retaining uncertain samples as Draft. The existing preview helper is prepared, but **no staging or production deployment was performed** in this review.

## Final browser and hosting observations

The isolated browser also passed saving to the library, copying a real share URL through the clipboard, reopening the shared deep link, preserving all scene counts and keeping a shared Draft review-required. The editorial form requires all five confirmations, persists simulated test approval over reload, blocks factual proposals lacking references, revokes approval when credibility is withdrawn and invalidates approval after scene edits. Those are workflow tests using labelled fixtures, not approval of actual creative content.

[Production/browser log](verification/browser-production.log) · [Editorial browser log](verification/browser-editorial.log) · [Save/share browser log](verification/browser-sharing.log) · [Build](verification/build.log) · [Regression suite](verification/regressions.log) · [Programme checks](verification/proposed-programmes.log).

Screenshots: [three-shot production fixture](screenshots/3-shots.png), [eight-shot mobile fixture](screenshots/mobile.png), [mobile editorial form](screenshots/approval/mobile-review.png), [shared Draft](screenshots/shared-draft.png). Fixture shot durations are workflow test data and must not be treated as production timing approval.

A fresh **read-only** Vercel target guard using the previously verified project and owner selectors returned **HTTP 403** on metadata access. [Guard result](verification/vercel-target.log). The older target verification is historical evidence, not proof of access today. The observation does not distinguish token scope, account permission or selector validity; do not assume the credential is absent or request a duplicate blindly. Current authorized access to the existing project must be restored and verified before any preview deployment. No deploy command ran.

Current state: local build, regression, offline technical audit and browser workflows pass. Official factual verification awaits the saved network draft taking effect; native/editorial approval remains pending; hosting access currently fails the target guard. These results do not certify deployment readiness.
