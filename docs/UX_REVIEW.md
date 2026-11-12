# First-time user UX review

Reviewed the supplied desktop screenshot and current React flows for create, connect AI, review, save, reopen, export, and error recovery. This is an expert walkthrough with rendered-component checks and an automated Chromium walkthrough, not a usability study with new users.

## Main findings and changes

- **What do I get?** Explain the six scenes in plain language: dialogue, visuals, and camera directions. Show the next steps: edit, save, export.
- **How do I start?** Label the input and replace the arrow-only submit control with a visible Create reel / Try sample reel button. Put the offline-vs-AI choice before submission. Keep style and language optional.
- **Where do I go?** Use New reel, Ideas, Saved, and AI settings. Distinguish account setup from Reel options.
- **Did AI actually generate this?** Keep the per-result source and original generation timestamp separate from key verification. Mark saved/shared/restored and legacy content explicitly.
- **How do I keep it?** Expose Save reel beside export and sharing. Explain that Saved reels belong to this browser. Use Rewrite reel rather than promising a version-history feature.
- **What does setup require?** Collapse the provider guide, remove free-service guarantees, explain that key verification is separate from generation, and accurately describe the key's route through the server/provider.
- **Can I recover?** End loading on failure and retry the operation that failed, including a single shot. Keep existing content when live generation fails.
- **Keyboard and small screens:** Add dialog semantics, Escape dismissal, focus containment and restoration. Let storyboard actions wrap and constrain the brand image on narrow screens.

## Validation and limits

Run `npm run build`, `npm test`, `./node_modules/.bin/tsx server/freshnessTestSuite.ts`, `./node_modules/.bin/tsx server/creativeRulesTestSuite.ts`, and `./node_modules/.bin/tsx src/services/apiTestSuite.ts`.

Browser verification: create and AI setup screens captured at 1440px desktop and 390px phone width. The phone layout has no horizontal overflow. Selecting an offline example, creating a six-scene draft, saving it, and finding it in Saved passed in Chromium.

Before public rollout, check the deployed flow on a phone and desktop with a real provider: verify key, save settings, generate a custom comparison, review source, edit, save, reopen from Saved, and export. Also check keyboard focus in the settings dialog. Live provider access, billing, and layout behavior are not established by mocked-provider or static-render tests. Existing large-bundle build warning remains.

## Button verification

A Chromium walkthrough with isolated local test data passed: opening/closing AI settings; provider selection; key input/clear; guide expansion; saving settings; Cancel/Escape; sample creation; scene editing/save/cancel; copying scene text; share-link, WhatsApp, and production-brief clipboard output; PDF download (verified `%PDF` file header); saving/reopening; offline shot regeneration; full rewrite; Ideas filtering/search; Saved filtering/search; timing adjustment; and deletion of a test reel.

Fixed during the pass: stale scene-edit drafts after regeneration, source metadata omitted from share links, tone/language labels changing before successful generation, duration selection that previously changed only the label, and create buttons that reopened the current reel instead of starting a new one. Timing controls now adjust six sequential scene estimates without rewriting spoken content.

Limits: no valid provider key is available to this browser profile. Real key verification, live generation and regeneration, provider billing/quota, deployment routing, and other browsers remain unverified. Provider failures and repair paths have separate mocked regression coverage. This is not a claim that every button and every failure condition has been exhaustively tested.


## Authored offline catalogue update

Offline generation now has six supported ideas, three distinct treatments, and five languages (90 versions). Creative shot regeneration is disabled without AI; Reset sample reloads the fixed script. Earlier button-walkthrough references to offline regeneration describe the replaced engine. A later Chromium check passed for a Tamil Funny sample, fixed-script controls, unsupported-topic redirection, and phone-width layout. See OFFLINE_CATALOGUE_IMPLEMENTATION.md for current scope and validation.
