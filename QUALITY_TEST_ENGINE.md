# JOY UNIVERSITY — QUALITY TEST ENGINE SPECIFICATION

## ROLE & ARCHITECTURE

The **Quality Test Engine** is the automated evaluation and factual verification layer for the Joy University AI Content System. It audits generated short-form Reel storyboards across 35 QA dimensions before they reach human production teams.

---

## 4-STATE DECISION MODEL

The engine outputs exactly ONE of four formal states:

| Status | Meaning | Action / Pipeline Flow |
|---|---|---|
| 🟢 **PASS** | High creative quality, structurally sound, all factual assertions verified | **Direct to Production** |
| 🟡 **PASS — VERIFICATION REQUIRED** | High creative quality, but contains specific claims or dates requiring human verification | **Human Fact-Check → Production** |
| 🔴 **FAIL** | Content fails creative, strategic, structural, or material factual benchmarks (Score < 80 or P0 failure) | **Regenerate / Fix Script** |
| ⚫ **PIPELINE ERROR** | Content could not be evaluated (missing, empty, placeholder, transport failure) | **Fix System / Transport Layer** |

---

## STEP 0: INPUT INTEGRITY GATE

Before executing any evaluation, validate `GENERATED_OUTPUT`:

```text
IF GENERATED_OUTPUT is:
  - Empty, null, or undefined
  - Whitespace only
  - Shorter than minimum required storyboard structure
  - Contains placeholder tokens (e.g., {{GENERATED_OUTPUT}}, [Paste storyboard here], TODO, TBD)
THEN:
  STATUS: PIPELINE ERROR
  QA SCORE: NOT SCORED
  ERROR TYPE: INPUT_INTEGRITY_FAILURE
  STOP (Do not generate a fake scorecard or assign 0/100).
```

---

## STEP 1: STRUCTURAL INTEGRITY

Verify that the storyboard contains the exact 6-beat sequence:
1. `01 HOOK` (00:00 – 00:04)
2. `02 PROBLEM` (00:04 – 00:08)
3. `03 PATTERN INTERRUPT` (00:08 – 00:12)
4. `04 VALUE` (00:12 – 00:21)
5. `05 PAYOFF` (00:21 – 00:27)
6. `06 CTA` (00:27 – 00:30)

Each card must specify:
- `TIME`
- `VISUAL ACTION`
- `DIALOGUE / VOICEOVER`
- `ON-SCREEN GRAPHIC`
- `CAMERA & DIRECTION`

If structural elements are missing:
- **STATUS: FAIL**
- **ERROR TYPE: STRUCTURAL_FAILURE**

---

## STEP 2: EVIDENCE AUDIT & CLAIM SEVERITY

Every statement, metric, and date in the storyboard is parsed and assigned a severity level:

### P0 — CRITICAL (Statutory / High-Risk Claims)
Unsupported claims that could materially mislead students, parents, or regulatory authorities.
- **Examples:** UGC recognition status, accreditations, placement percentages, average/highest salaries, rankings, fee structures, scholarship guarantees, admission eligibility cut-offs, official event dates, course availability.
- **Enforcement:**
  - If fabricated or conflicting: **HARD FAIL**
  - If user-supplied or unconfirmed: **PASS — VERIFICATION REQUIRED**

### P1 — HIGH (Institutional Metrics & Attributes)
Specific institutional metrics, campus features, or infrastructure assertions.
- **Examples:** 104+ acres, 43-year legacy, Rajas Group association, lab counts, student population, partnership counts.
- **Enforcement:**
  - Must match verified Knowledge Base (`JOY_UNIVERSITY_VERIFIED_FACTS`).
  - Unsupported metric: **FAIL** or **PASS — VERIFICATION REQUIRED** with heavy factual score penalty.

### P2 — MEDIUM (Specific Non-Material Claims)
Comparative claims, industry alignment claims.
- **Examples:** "Leading", "industry-ready", "award-winning curriculum", "top tech stacks".
- **Enforcement:** Evidence preferred. Minor score warning if overused.

### P3 — CREATIVE (Emotional / Rhetorical Language)
Narrative tropes, emotional resonance, and relatable student dialogue.
- **Examples:** *"Your parents' proudest moment"*, *"four transformational years"*, *"nobody warns you how fast time flies"*.
- **Enforcement:** No factual verification required. Evaluated under Human Truth and Dialogue.

---

## VALUE CATEGORIZATION DISCIPLINE

Value must be explicitly identified as:
- **PRACTICAL / EDUCATIONAL VALUE:** Concrete takeaway (checklist, framework, 3 mistakes, comparison, step-by-step career path). Required for informational/discovery content.
- **EMOTIONAL / RESONANT VALUE:** Validation, reassurance, honoring sacrifice, community belonging. Permitted only for milestone/celebration content (e.g., Convocation, Campus Life).

---

## FINAL DECISION TREE

```text
IF Input Integrity Fails:
    → PIPELINE ERROR (QA Score: NOT SCORED)

ELSE IF P0 Unsupported Claim Fabricated:
    → FAIL (Factual Accuracy: 1–3/10)

ELSE IF Structural Requirements Fail:
    → FAIL (Structural Failure)

ELSE IF Overall Score < 80:
    → FAIL

ELSE IF P0/P1 Claims Need Confirmation (e.g. Unverified Date):
    → PASS — VERIFICATION REQUIRED (Overall Score: 80–89)

ELSE:
    → PASS (Overall Score: >= 80)
```
