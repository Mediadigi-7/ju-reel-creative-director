# Six-stage storyboard navigation

Small editor refinement using the existing JOY University interface. New `six-stage-v2` drafts show Hook, Problem, Pattern interrupt, Value, Payoff and Call to action as six links to actual production shots. Stage groups can contain extra shots. Older records keep their real scene lists and have no fabricated stage strip.

[Desktop](editor-desktop.png) and [narrow layout](editor-mobile.png) show an explicitly illustrative local fixture, not a fresh AI output or creative-quality approval. Browser testing used a separate Chromium profile, no user data and no real API requests.

[Browser checks](browser-results.txt) passed six visible labels, Tab/Enter focus on the linked shot, eight-shot grouping, legacy three-shot preservation, 320/390/720 CSS-pixel reflow and 44px link targets. The 720px check represents reflow at the layout width of a 1440px browser at 200% zoom; native browser zoom and screen-reader operation were not tested. No broad accessibility certification is claimed.

[Build](build-results.txt) passes. The existing bundle-size warning remains. The new UI is local; no deployment was performed. Live writing-quality status is recorded separately in the phase-3 evaluation artifacts.
