# Live validation and Vercel staging

Current application: https://ju-reel-creative.vercel.app/. No production deployment has been performed by this work.

## Access setup

The free-only validation draft adds `generativelanguage.googleapis.com`. Staging also uses `api.github.com`, `api.vercel.com`, and `ju-reel-creative.vercel.app`. The earlier OpenAI destination is retained in settings but is not used by the free-only validation runner. Existing package-manager presets and setup scripts are preserved. Secret requirements, not values, were saved for `REEL_GEMINI_API_KEY` (Gemini destination) and `VERCEL_TOKEN` (Vercel API destination).

Enter values securely in environment settings; never paste them into chat or repository files. Review/save the draft and publish the cloud environment to apply it, as required by the environment configuration workflow. This cloud-environment publication is separate from deploying the application to Vercel. Saving a draft alone does not apply it to this running instance.

After access is applied, recheck current runtime readiness and the actual affected requests. A GH_TOKEN variable already exists; do not ask for a duplicate GitHub credential solely because deployment metadata was blocked by the network policy. Do not print token values or dump the environment.

## Phase 3: real provider validation

From the repository directory, with the provided proxy and CA settings intact:

```bash
NODE_USE_ENV_PROXY=1 npm run validate:live
```

The script refuses to run without the secure Gemini binding. It first executes one real generation test. If access, billing, quota, or model availability fails, it stops rather than substituting a template or retrying unchanged requests. It then generates B.Com vs BBA for Trust, Connection, and Discovery, checks a Tamil version, and regenerates the Trust Hook without modifying other scenes. The local report is saved to ignored `scratch/live-channel-validation.json`, with no credentials.

Inspect the output for idea fidelity, channel distinctions, supportive university-managed Connection voice, native-language fluency, one CTA, coherent six-stage flow, proposed-programme wording, and factual accuracy. Automated success does not complete human editorial review. The OpenAI and Gemini model identifiers are reported by Test AI generation; actual account/model availability remains unverified until a real request succeeds.

## Phase 4: target confirmation and preview

1. Use authorized Vercel metadata to identify the existing project and its owner. Verify that the production domain is exactly `ju-reel-creative.vercel.app`; do not create or select a similarly named project by guesswork.
2. Set the non-secret `VERCEL_PROJECT_ID` and `VERCEL_ORG_ID` selectors from that verified metadata. No secret values should be written to the repository.
3. Run the preview helper:

```bash
bash scripts/stagingPreview.sh
```

The helper first verifies the project ID, owner ID, and exact production domain through the Vercel API, then runs build/tests and deploys the working tree to the verified existing project's default Preview target. It never passes `--prod`. Vercel CLI is pinned to 65.12.1, obtained from the npm registry; its local version command passed. The preview target verification has simulated tests for wrong project, owner, domain, and access failures. Missing credentials or selectors cause a preflight refusal; no remote deployment has yet been executed or validated.

If the resulting preview hostname needs separate cloud network permission, add that exact hostname through the environment configuration workflow. Do not broadly allow all Vercel domains to bypass policy.

## Staging acceptance

- Root, `/ideas`, and `/library` load directly, including refresh.
- `/api/health` is JSON; API routes are not rewritten to the SPA.
- Missing-key generation tests fail explicitly, and real tests report the selected provider/model with no offline fallback.
- The same custom idea produces distinct Trust, Connection, and Discovery outputs.
- Channel and user edits survive save/reopen and shared-link navigation.
- Scene regeneration preserves other scenes; unsupported offline/channel combinations fail clearly.
- PDF download contains the channel and expected content; check actual native-language rendering separately before treating multilingual PDF export as validated.
- Desktop, phone-width layout, and errors remain usable.

Only after these checks and content review should a production release be considered. No production release is implicit in the preview helper.


Free-only update: live validation uses Gemini, not paid OpenAI. Supply a Google AI Studio key for a project with billing disabled. Free quota/model availability must be confirmed by the actual generation test. No automatic paid-provider fallback is permitted. Historical OpenAI access observations do not establish or restrict the new Gemini path.
