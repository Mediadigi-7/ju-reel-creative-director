# Beginner experience refinement — 14 November 2026

Mode: refine / operate. Preserve JOY University's existing identity and the real storyboard production format. The primary user is a content creator or first-time operator preparing reels for +2 students. The immediate job is to choose an idea, understand the channel, create or open a draft, edit scenes and save/share/export it.

The Impeccable context launcher was not available on this computer; no PRODUCT.md, DESIGN.md or prior .design report was present. Direction was derived from the actual React app, existing screenshots, route/data behavior and the user's request. No design-system dependency or new font was added.

## Implemented

- Consistent, keyboard-accessible navigation links: New reel, Find ideas, Saved reels; one stable AI settings button. Current-page state is exposed programmatically. Added a skip link, route-specific document titles and focus handling which avoids hiding headings behind sticky navigation.
- A labelled creation form with plain-language explanations of Trust, Connection and Discovery. Native radios and selects provide familiar keyboard behavior. All five language choices, Auto and the existing styles remain available. Six real samples are discoverable without requiring a key.
- Selecting an idea opens the form for review instead of silently starting a generation request. Custom-topic validation retains the user's idea and presents an explicit connection action instead of opening settings unexpectedly. A saved key is recognised as present without falsely claiming it has been verified.
- Unfinished form choices survive route Back/Forward navigation. New reel explicitly starts a fresh form. Starting again or opening a saved project resets stale shared-view state.
- The idea bank uses expandable topic groups instead of displaying all 180 ideas at once. Search opens matching groups, announces result counts and offers clear-filter recovery. All channel filters wrap into view on small screens.
- Saved reels has labelled search/status controls, useful empty/filtered states and descriptive action names. An inline confirmation protects deletion, with deliberate focus placement. Clipboard failure does not show false success; copy feedback is announced.
- Save feedback stays Saved until the storyboard changes. The saved action is disabled while already saved, preventing duplicate saves. Selecting an existing saved project correctly reflects its saved state.
- Replaced the simulated eight-stage/percentage loading panel and obsolete six-beat promise with an honest preparation state, the topic/language, error recovery and a real-completion transition. Narrative functions and variable shot counts remain engine decisions.
- The editorial accordion is labelled Review before filming, with the same mandatory human insight/accuracy/payoff checks preserved. Essential production field labels have stronger contrast and larger text.
- AI settings explains when a connection is needed; provider selection and key errors expose state. Its background is inert and scroll-locked while open. Tab containment, Escape and focus restoration remain available.
- Shared focus styles, stronger form borders, 16px mobile inputs, touch-friendly controls, themed selection/caret and reduced-motion behavior.

## Confirmed evidence

[Browser results](beginner-ux-2026-11-14/browser-results.txt) cover the real local app with an isolated Chromium profile and a real offline sample. No live model requests or user storage were used. The test harness briefly paused the sample API request to inspect loading, then allowed it to continue normally. A denied clipboard was simulated to verify honest failure feedback.

Passed: skip link; navigation focus; native choices; empty/custom-topic recovery; deliberate idea selection without a generation request; Back/Forward topic preservation; fresh-form reset; real sample loading; six-scene rendering; last-scene edits/autosave; persistent saved state; labelled library filtering; deletion cancellation without data loss; clipboard success/failure; shared deep link; settings Tab trap/Escape/focus restoration; inert background; 320/390/720 CSS-pixel reflow; 16px mobile inputs; reduced-motion preference; accessibility-tree capture; no uncaught application exceptions.

The 720 CSS-pixel check represents reflow at the layout width of a 1440px browser at 200% zoom. Native browser-zoom UI and a screen reader were not tested. Accessibility-tree inspection is not a screen-reader test or an accessibility certification. Testing used Chromium, not every browser.

Measured updated palette pairs: white text on #AF1E2A = 6.90:1; #57534E text on white = 7.63:1; #8B8680 control border on white = 3.61:1; #8C1618 focus ring on white = 9.36:1. These measurements apply to the listed pairs, not every legacy color or state.

[Build](beginner-ux-2026-11-14/build-results.txt) and the full existing regression suite passed. The pre-existing large-bundle warning remains. This UI work changes no generation provider, 50-second request budget, factual standards, source metadata, offline scripts or creative acceptance thresholds. No new editorial approval is claimed.

## Screens

- [Before: desktop](beginner-ux-2026-11-14/before-desktop.png)
- [After: desktop creation](beginner-ux-2026-11-14/home-desktop.png)
- [After: mobile creation](beginner-ux-2026-11-14/home-390.png)
- [Mobile idea navigation](beginner-ux-2026-11-14/ideas-320.png)
- [Saved reels](beginner-ux-2026-11-14/saved-desktop.png)
- [Production editor](beginner-ux-2026-11-14/editor-desktop.png)
- [AI settings](beginner-ux-2026-11-14/settings-390.png)

Remaining validation: real first-time-user sessions, assistive-technology testing and deployed-preview smoke tests. Production must remain unchanged; a local browser pass is not a deployed-app verification.
