# Template access and validation recovery — 16 November 2026

All six templates open locally without a key, including with a saved key. Explicit AI requests remain separate; failed AI responses never silently become templates.

Browser verification used an isolated Chromium profile, fake saved credentials and an intercepted AI timing failure. All six topics were opened with and without a saved key, with zero generation requests. Language, style and reset remained local. Explicit AI made one intercepted request. Recovery restored the template picker. Reflow passed at 320, 390 and 720 CSS pixels, with no uncaught errors. No real provider calls were made.

Screenshots: saved-key-template-picker.png, ai-timing-error.png, mobile-template-picker.png.

The historical screenshot cannot identify the exact failed check. Safe validation categories now distinguish concept, evidence, structure, topic, language, timing and insight. Production validation gates remain unchanged. This verifies access and error recovery, not a 90/100 creative quality claim.
