# JOY UNIVERSITY

# REEL STORYBOARD GENERATOR — MVP PRD

## 1. PRODUCT PROMISE

> **ONE TITLE → ONE PRODUCTION-READY STORYBOARD**

The application converts a single Reel title/topic into a complete **6-shot production storyboard** that a video production team can directly use for shooting.

The user provides only:

> **Reel Title**

The AI makes all creative decisions.

---

# 2. MVP OBJECTIVE

Build a focused AI creative-director application that automatically generates:

* Creative angle
* Target audience
* Recommended duration
* Hook
* Problem
* Pattern interrupt
* Value
* Payoff
* CTA
* Visual direction
* Dialogue / VO
* On-screen text
* Camera / performance direction

The output must be presented as a professional:

> **6-SHOT REEL STORYBOARD**

---

# 3. USER FLOW

```text
USER
  ↓
Enter Reel Title
  ↓
[ GENERATE STORYBOARD ]
  ↓
AI CREATIVE ENGINE
  ↓
Analyze Title
  ↓
Identify Student Problem
  ↓
Create Story Structure
  ↓
Generate 6 Shots
  ↓
Validate Output
  ↓
PRODUCTION-READY STORYBOARD
```

There should be no requirement for the user to provide:

* Script
* Hook
* Audience
* CTA
* Reference video
* Visual concept
* Story structure

---

# 4. PRIMARY USER

### Primary

Joy University:

* Content team
* Social media team
* Video production team
* Marketing team

### End Audience

The generated content is primarily designed for:

> **+2 completed students**

including:

* Maths students
* Science students
* Commerce students
* Arts students
* Course-confused students
* Career-exploring students

---

# 5. INPUT

The application has exactly one primary input.

## Reel Title

Example:

> I finished +2… now what?

Other examples:

> Engineering is not for everyone.

> 3 mistakes students make after +2.

> What should I study after Commerce?

> AI will change these careers.

The title is treated as a **creative seed**, not as the final script.

---

# 6. AI CREATIVE ENGINE

The AI acts as:

> **Short-Form Video Creative Director**

The AI must independently determine:

### Content

* Student pain point
* Core insight
* Story
* Hook
* Value
* Payoff

### Creative

* Hook mechanism
* Pattern interrupt
* Visual concept
* Narrative style
* Emotional direction

### Production

* Shot composition
* Camera movement
* Performance
* Props
* Location
* Editing rhythm

---

# 7. MANDATORY STORY STRUCTURE

Every generated storyboard must contain exactly six sections:

```text
01 — HOOK
02 — PROBLEM
03 — PATTERN INTERRUPT
04 — VALUE
05 — PAYOFF
06 — CTA
```

The sequence must remain unchanged.

---

# 8. STORYBOARD OUTPUT

Each storyboard must include the following header.

## REEL TITLE

Original user input.

## CREATIVE ANGLE

One concise sentence explaining the creative concept.

## OBJECTIVE

What the Reel should make the viewer:

* Think
* Feel
* Understand
* Do

## TARGET AUDIENCE

Specific +2 student segment.

## DURATION

Recommended Reel duration.

Default:

> **25–30 seconds**

Allowed:

> **20–45 seconds**

## FORMAT

> **9:16 Vertical Reel**

---

# 9. SIX-SHOT STORYBOARD

Each shot must be independently production-ready.

---

## SHOT 01 — HOOK

### Time

Example:

> 00:00–00:04

### Visual

Describe exactly what should be filmed.

### Dialogue / VO

Exact spoken dialogue.

### On-Screen Text

Exact text appearing on screen.

### Camera / Performance

Specify:

* Framing
* Camera movement
* Subject position
* Facial expression
* Body language
* Performance direction

---

## SHOT 02 — PROBLEM

### Time

Example:

> 00:04–00:08

### Visual

Describe the student situation.

### Dialogue / VO

Exact spoken dialogue.

### On-Screen Text

Supporting text.

### Camera / Performance

Detailed direction.

---

## SHOT 03 — PATTERN INTERRUPT

### Time

Example:

> 00:08–00:12

### Visual

Create a meaningful attention reset.

Possible techniques:

* Sudden close-up
* Jump cut
* Silence
* Freeze frame
* Camera movement
* POV change
* Location change
* Unexpected prop
* Direct-to-camera moment
* Visual reveal

### Dialogue / VO

Exact spoken line.

### On-Screen Text

Exact text.

### Camera / Performance

Exact execution direction.

---

## SHOT 04 — VALUE

### Time

Example:

> 00:12–00:21

### Visual

Visually demonstrate the useful information.

### Dialogue / VO

Provide the actual useful content.

### On-Screen Text

Concise supporting information.

### Camera / Performance

Explain how the information should be delivered.

---

## SHOT 05 — PAYOFF

### Time

Example:

> 00:21–00:26

### Visual

Create the conclusion/reveal.

### Dialogue / VO

Memorable final insight.

### On-Screen Text

Key takeaway.

### Camera / Performance

Emotional direction and final visual.

---

## SHOT 06 — CTA

### Time

Example:

> 00:26–00:30

### Visual

Clear closing visual.

### Dialogue / VO

Exactly ONE CTA.

### On-Screen Text

Exactly ONE CTA.

### Camera / Performance

Final action and expression.

---

# 10. PRODUCTION SUMMARY

The storyboard must finish with:

## CAMERA

Recommended:

* Shot types
* Framing
* Movement
* POV
* Close-ups
* Wide shots

Only include what is relevant to the concept.

---

## EDITING

Specify:

* Cutting rhythm
* Transition style
* Text animation
* Zooms
* Speed changes
* Freeze frames
* Silence moments

Avoid unnecessary effects.

---

## SOUND

Specify:

* Music mood
* Sound effects
* Dialogue priority
* Silence moments
* Audio transitions

---

## PROPS

Only essential props.

Example:

* Phone
* Notebook
* Mark sheet
* Backpack

---

## LOCATIONS

Practical locations only.

Example:

* Campus walkway
* Classroom
* Cafeteria
* Library
* Hostel common area

---

## CASTING

Specify:

* Number of people
* Student / faculty / parent
* Approximate age
* Performance type

---

## PRODUCTION COMPLEXITY

Choose exactly one:

> LOW / MEDIUM / HIGH

---

# 11. CREATIVE SUMMARY

At the bottom:

```text
HOOK
↓
PROBLEM
↓
PATTERN INTERRUPT
↓
VALUE
↓
PAYOFF
↓
CTA
```

Then:

### KEY CREATIVE IDEA

One memorable sentence.

### MUST-GET SHOTS

List the 3–5 most important shots or moments.

---

# 12. UI REQUIREMENTS

The application interface should be intentionally simple.

## SCREEN 1 — INPUT

```text
JOY REEL STORYBOARD

Create a production-ready Reel storyboard
from one idea.

REEL TITLE

┌─────────────────────────────────────┐
│ I finished +2... now what?          │
└─────────────────────────────────────┘

              GENERATE STORYBOARD
```

No unnecessary fields.

---

# 13. SCREEN 2 — STORYBOARD DASHBOARD

After generation:

```text
┌─────────────────────────────────────────────┐
│ JOY REEL STORYBOARD                         │
├─────────────────────────────────────────────┤
│ TITLE                                       │
│ I finished +2... now what?                  │
│                                             │
│ CREATIVE ANGLE                              │
│ ...                                         │
│                                             │
│ OBJECTIVE                                   │
│ ...                                         │
│                                             │
│ AUDIENCE          DURATION        FORMAT    │
├─────────────────────────────────────────────┤
│ 01 HOOK                                     │
│                                             │
│ TIME                                        │
│ VISUAL                                      │
│ DIALOGUE / VO                               │
│ ON-SCREEN TEXT                              │
│ CAMERA / PERFORMANCE                        │
├─────────────────────────────────────────────┤
│ 02 PROBLEM                                  │
│ ...                                         │
├─────────────────────────────────────────────┤
│ 03 PATTERN INTERRUPT                        │
│ ...                                         │
├─────────────────────────────────────────────┤
│ 04 VALUE                                    │
│ ...                                         │
├─────────────────────────────────────────────┤
│ 05 PAYOFF                                   │
│ ...                                         │
├─────────────────────────────────────────────┤
│ 06 CTA                                      │
│ ...                                         │
├─────────────────────────────────────────────┤
│ PRODUCTION NOTES                            │
│ Camera • Editing • Sound • Props            │
│ Locations • Casting • Complexity            │
└─────────────────────────────────────────────┘
```

---

# 14. USER ACTIONS

MVP should provide only essential actions.

### Required

* Generate storyboard
* Regenerate entire storyboard
* Copy storyboard
* Export storyboard

### Optional

* Regenerate individual shot
* Edit generated text

These should not complicate the primary workflow.

---

# 15. AI OUTPUT SCHEMA

The AI must return structured data.

Conceptual schema:

```text
reel
├── title
├── creativeAngle
├── objective
├── targetAudience
├── duration
├── format
│
├── shots
│   ├── shot01
│   │   ├── time
│   │   ├── visual
│   │   ├── dialogue
│   │   ├── onscreenText
│   │   └── cameraPerformance
│   │
│   ├── shot02
│   ├── shot03
│   ├── shot04
│   ├── shot05
│   └── shot06
│
└── production
    ├── camera
    ├── editing
    ├── sound
    ├── props
    ├── locations
    ├── casting
    └── complexity
```

The frontend must render this structured data.

Do NOT ask the AI to generate HTML or UI.

---

# 16. AI VALIDATION

Before displaying the result, validate:

### Structure

* Exactly 6 shots
* Correct shot order
* All required fields present

### Story

* Hook exists
* Problem exists
* Pattern interrupt exists
* Value exists
* Payoff exists
* CTA exists

### CTA

Exactly one CTA.

### Duration

20–45 seconds unless otherwise justified.

### Timeline

No overlapping timestamps.

### Audience

Must remain relevant to +2 students.

### Production

Every shot must contain actionable visual direction.

---

# 17. JOY UNIVERSITY FACT SAFETY

The AI may use verified institutional information when relevant.

It must never invent:

* Rankings
* Placement statistics
* Salary figures
* Awards
* Accreditations
* Partnerships
* Facilities
* Course details
* Admission rules
* Dates
* Statistics

If a fact is necessary but not verified:

> **VERIFICATION REQUIRED**

---

# 18. CONTENT PRINCIPLE

The Reel must feel like:

> **Student content first. University marketing second.**

Avoid generic advertising language.

Do not automatically begin with:

> "Welcome to Joy University."

or:

> "At Joy University..."

unless the title specifically requires institutional content.

Prioritize:

> PEOPLE → ACTION → ENVIRONMENT

over:

> BUILDING → LOGO → PROMOTIONAL GRAPHICS

---

# 19. QUALITY REQUIREMENTS

Every generated storyboard must satisfy:

### Hook

Strong enough to create immediate curiosity or relevance.

### Problem

Based on a genuine student tension.

### Pattern Interrupt

Clearly distinguishable from surrounding shots.

### Value

Provides useful information or a practical insight.

### Payoff

Resolves or reframes the opening idea.

### CTA

Exactly one action.

### Visual

Realistically shootable by a university video team.

### Dialogue

Natural spoken language.

### Brand

Joy University integration must feel natural.

---

# 20. MVP ACCEPTANCE THRESHOLDS

Test using a minimum of:

> **20 different Reel titles**

## Technical

| Metric                      | MVP Threshold |
| --------------------------- | ------------: |
| Successful generation       |          ≥95% |
| P95 generation time         |       ≤30 sec |
| Six-shot structure          |          100% |
| Required field completeness |          ≥99% |
| Valid timestamps            |          100% |
| Exactly one CTA             |          100% |
| Duration 20–45 sec          |          ≥95% |
| Export success              |          ≥99% |
| Application crashes         |             0 |
| Known data-loss incidents   |             0 |

## Creative

Human reviewers score each category from 1–5.

| Category             | Minimum |
| -------------------- | ------: |
| Hook quality         |    ≥4.0 |
| Student relevance    |    ≥4.0 |
| Value quality        |    ≥4.0 |
| Production readiness |    ≥4.0 |
| Dialogue naturalness |    ≥4.0 |
| Visual shootability  |    ≥4.0 |
| Brand integration    |    ≥4.0 |

At least:

> **80% of test Reels must score 4 or higher**

for each major creative category.

---

# 21. MVP OUT OF SCOPE

The following are explicitly NOT required for MVP:

* Reference video analysis
* Automatic video generation
* AI video editing
* Voice generation
* Avatar generation
* Music generation
* Social media publishing
* Analytics
* Content calendar
* Campaign management
* Advanced project management
* Team collaboration
* Complex asset management
* CRM
* Admissions database
* Automatic course recommendation engine

The MVP is strictly:

> **TITLE → STORYBOARD**

---

# 22. MVP DEFINITION OF DONE

The MVP is complete when a user can:

```text
1. Open the application
2. Enter ONE Reel title
3. Click Generate Storyboard
4. Receive a complete 6-shot storyboard
5. Read exact dialogue/VO
6. Understand what to shoot
7. Understand camera/performance direction
8. Understand on-screen text
9. Understand editing and sound direction
10. Copy or export the storyboard
```

No additional information should be required from the user.

---

# 23. CORE PRODUCT PRINCIPLE

The entire MVP should be designed around one sentence:

# ONE TITLE → ONE PRODUCTION-READY STORYBOARD

The AI is the:

> **Creative Director**

The UI is the:

> **Storyboard Dashboard**

The user is responsible only for:

> **Providing the idea.**
