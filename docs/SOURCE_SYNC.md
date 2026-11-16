# Source synchronisation for a current preview

GitHub main was verified on 12 November 2026 at `65e3a4ac98e9708dba87178ad9036bf24deb2d86`, the 6 November source used by the older preview. Subsequent work had remained uncommitted in the cloud workspace. A successful deployment of that old commit does not verify the newer engine or UI.

The `codex/phase3a-reliability` branch packages the current implementation and its regressions: flexible shot counts, Trust/Connection/Discovery channels, five-language authored offline catalogue, proposed-programme labels, concept-first Gemini writing, mandatory human HLNI approval, deadline-aware optional critique with validated same-request Draft retention, cancellation/error handling, and editing/storage/share/PDF compatibility. No user browser data, API credentials, dependency cache, build output or scratch files belong in this branch.

Relevant evidence:

- [Latest real Gemini run and independent scores](phase3-evaluation/PHASE_3A_RELIABILITY_FIX.md): three complete Drafts within 50 seconds; scores 72/63/73. These are not creative approval.
- [Subsequent factual/offline/browser review](release-review/2026-11-12-01/README.md): 90 technical catalogue passes, five-language review packets, browser regression evidence and unresolved source/access issues.
- [Canonical creative references](creative-references/README.md): benchmarks, not fixed scripts or verified JOY curriculum facts.

Deployment must identify the exact branch commit that contains this source. Compare the Vercel deployment's Git commit with this branch, not a date or a successful build status alone. Preserve production; deploy this branch only as Preview, then test its API routing, real generation, error reporting, edit/save/share/export paths and mobile layout. A Preview Ready status does not establish runtime or creative acceptance.

This source-sync branch does not merge main, publish an environment or deploy production. The earlier reports retain their original attempt identities, source hashes, scores and failures.
