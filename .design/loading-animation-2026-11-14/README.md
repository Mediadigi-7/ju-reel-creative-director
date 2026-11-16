# Subtle loading motion — 14 November 2026

Added a quiet three-second shimmer across a decorative storyboard preview beneath the existing loading explanation. The animation stops when completion/error replaces the loading state. It adds no percentages, fake pipeline stages, extra model calls or completion delay. The existing 250ms real-completion transition is unchanged.

The preview is hidden from assistive technology. With reduced motion, the sweep is removed and the quiet static preview remains; the existing busy/status text stays available.

TypeScript/Vite build passed. Isolated Chromium verified that the sweep transform advances over time, 320px layout does not overflow, reduced motion removes the sweep, and releasing a paused local API request still opens the real offline sample normally. No live AI calls were used. This is not a screen-reader certification.

[Desktop](loading-desktop.png) · [Mobile](loading-mobile.png) · [Reduced motion](loading-reduced-motion.png) · [Verification](verification.txt).
