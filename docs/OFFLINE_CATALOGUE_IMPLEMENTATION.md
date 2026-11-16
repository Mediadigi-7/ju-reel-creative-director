# Offline catalogue v1.0

## Scope and creative approach

Six homepage ideas, three authored narrative treatments, and five languages: English, Tamil, Telugu, Malayalam, Hindi. There are 18 distinct stories and 90 language versions. Visuals, props, casting, camera directions, and sound are specific to the story. Localized dialogue and on-screen text follow that visual narrative; this is not random sentence substitution.

The first idea illustrates the distinction:

- Informative: a student replaces overwhelming post-+2 advice with two small subject tasks and a course shortlist.
- Funny: the student chairs a meeting of relatives who have each already planned the student's future; the student finally gets a turn.
- Trendy: a two-task reveal uncovers the student's curiosity before course research.

The supplied programme catalogue remains available to the AI engine, with the new 16 programmes labelled proposed for 2027–28. These general offline samples make no admissions, eligibility, placement, lab, or approval claims about Joy University. Fictional example documents and suggested filming spaces are identified as such.

## Behaviour

- Only the six known ideas (including known localized titles) can be generated offline. There is no broad keyword-to-category fallback. Custom comparisons such as B.Com vs BBA require live AI.
- Each style has a complete coherent six-scene narrative. Regeneration seeds do not change the script or splice unrelated hooks into it.
- Every script ends with one matching spoken/on-screen action: Share for Funny, Save for Informative and Trendy. No additional engagement prompts are injected.
- Each scene receives its own conservative spoken-delivery estimate plus pause allowance. Timestamp endpoints match the returned duration. Default estimates range from 28 to 34 seconds; a requested shorter duration cannot force a script below its estimate.
- Offline scripts remain editable. Reset sample reloads the authored script. Creative single-scene regeneration requires AI; it is disabled without access rather than pretending to produce a new scene.
- New drafts record template ID and catalogue version. Older saved templates are identified as older and are not silently migrated or overwritten.
- Unsupported generation returns HTTP 422 with OFFLINE_UNSUPPORTED. Offline creative regeneration returns AI_REQUIRED. The browser directs users to sample selection or AI setup.

## Files and review

- `shared/offline/catalogue.ts`: the 18 English stories, visuals, and production context.
- `shared/offline/ta.ts`, `te.ts`, `ml.ts`, `hi.ts`: authored language adaptations.
- `shared/offline/index.ts`: exact matching, language selection, pacing, source metadata, and storyboard assembly.
- `shared/offline/validate.ts`: runtime schema, stage, native-script, claim/cliché, timing, and CTA guards.
- `docs/OFFLINE_SCRIPT_CATALOGUE.md`: all 90 language versions in readable stage tables.

## Verification

`npm test` runs the existing application checks (22 assertions) and the offline acceptance suite. The latter checks all 90 versions, distinct treatments within each idea/language, stable whole-story assembly, 180 requested-duration variants, exact supported scope, and negative CTA/native-script/timing cases.

Separate provider-repair, freshness, source-label, interaction, and proposed-programme regressions pass. HTTP smoke checks exercised all five languages × three styles and explicit unsupported responses. A Chromium walkthrough exercised a Tamil Funny script, six native-script cards, the source label, Reset sample, disabled offline AI regeneration, phone-width layout, and custom-topic redirection to AI setup.

Automated checks cannot certify humor, cultural fit, native-speaker fluency, or an actor's delivery speed. Scripts are authored drafts; editorial review and read-aloud rehearsal remain necessary before filming. No live-provider success or deployment is claimed by these checks.
