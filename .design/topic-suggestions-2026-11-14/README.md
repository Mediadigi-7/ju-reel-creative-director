# Topic suggestions — 14 November 2026

User-requested follow-up: remove the separate Try a sample topic section and show its six topics when the topic/search field is clicked or focused.

Implemented a single input-attached suggestion list. Typing filters the existing topics. Choosing an item fills the topic, selects the matching channel, preserves the draft and closes the list; it does not submit the form. Pointer selection, Arrow Up/Down, Enter, Escape, Tab and outside-click dismissal are supported. The input exposes combobox/listbox state and its active option. Other controls, samples and generation behavior are preserved.

Verification: TypeScript/Vite build passed. Isolated Chromium passed initial-hidden state, click/focus opening, typing/filtering, pointer and keyboard selection, matching-channel binding, dismissal, no automatic generation, opening a real offline sample, and 320/390px reflow. No live AI calls or user browser storage were used. Screen-reader coverage is not claimed.

[Desktop suggestions](open-desktop.png) · [Mobile suggestions](open-390.png) · [Collapsed form](closed-desktop.png) · [Verification](verification.txt).

This supersedes the always-visible sample section shown in the earlier beginner-UX screenshots; those are preserved as historical evidence.
