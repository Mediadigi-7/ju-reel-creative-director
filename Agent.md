# JOY UNIVERSITY — REEL CREATIVE DIRECTOR

## MASTER AGENT INSTRUCTION

You are the lead product engineer, UX designer, AI architect, and creative-system engineer responsible for building:

> **JOY REEL CREATIVE DIRECTOR**

This is an internal AI-powered short-form video content creation system for Joy University.

The application's primary purpose is:

> **USER ENTERS ONLY A REEL TITLE → AI CREATES A COMPLETE PRODUCTION-READY REEL DASHBOARD**

The application must not behave like a generic AI chatbot.

It must behave like a structured **AI Creative Director + Production Planning System**.

---

# 1. PRODUCT VISION

Build a professional internal tool that allows a content/marketing/video team to generate a complete Reel concept from a single idea.

### Core workflow

```text
REEL TITLE
     ↓
AI CREATIVE ENGINE
     ↓
CREATIVE ANALYSIS
     ↓
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
     ↓
VISUAL DIRECTION
     ↓
CAMERA DIRECTION
     ↓
EDITING DIRECTION
     ↓
PRODUCTION NOTES
     ↓
PRODUCTION DASHBOARD
```

The user should not need to manually provide:

* Hook
* Script
* Story structure
* Audience
* Problem
* Value
* CTA
* Visual concept
* Camera direction
* Editing direction
* Production notes

The AI makes these decisions.

---

# 2. CORE PRODUCT PRINCIPLE

The application has two separate layers.

## Layer A — AI CREATIVE ENGINE

Responsible for:

* Creative thinking
* Storytelling
* Script
* Visual concept
* Camera direction
* Editing
* Sound
* CTA
* Production planning

## Layer B — APPLICATION UI

Responsible for:

* Rendering structured AI output
* Editing
* Regeneration
* Saving
* Versioning
* Exporting
* Searching
* Organizing projects

### IMPORTANT

Do NOT allow the AI to generate the application's UI structure.

The UI must be deterministic.

The AI generates structured content.

The frontend renders that content.

---

# 3. PRIMARY USER

The primary user is a:

> Content Creator / Visual Designer / Media & Digital Team member

The application is intended for professional production workflows.

The user should be able to generate a Reel concept in less than one minute.

---

# 4. PRIMARY AUDIENCE OF GENERATED CONTENT

The generated Reels primarily target:

> +2 completed students

Relevant segments include:

* +2 Maths students
* +2 Science students
* +2 Commerce students
* +2 Arts students
* Students confused about course selection
* Students exploring careers
* Students comparing colleges
* Students worried about career opportunities
* Students influenced by friends/family
* Parents where appropriate

The content should feel relevant to the student's current decision-making stage.

---

# 5. MVP USER EXPERIENCE

The initial application should be extremely simple.

## Screen 1 — CREATE

Display:

```text
JOY REEL
CREATIVE DIRECTOR

Turn one idea into a complete Reel.

REEL TITLE

[ Enter your Reel title... ]

Optional Creative Direction

[ Student Relatable ▼ ]

[ ✦ GENERATE REEL ]
```

The title is the only mandatory input.

---

# 6. OPTIONAL CREATIVE DIRECTION

Creative direction is optional.

Available options:

```text
Student Relatable
Funny
Emotional
Cinematic
Bold
Educational
Gorilla Marketing
Premium
Storytelling
Trend-Based
```

Default:

> Student Relatable

If the user does not select anything, the AI automatically determines the most appropriate creative direction.

Do not make creative direction mandatory.

---

# 7. EXAMPLE INPUTS

The application must support titles such as:

```text
I finished +2... now what?

3 mistakes students make after +2

Engineering is not for everyone.

What should I study after Commerce?

AI will change these careers.

College is not just about marks.

Your marks don't decide your career.

Don't choose a course because your friend chose it.
```

The title is a creative starting point.

It is NOT the final script.

---

# 8. AI CREATIVE ENGINE

The AI must behave as:

> **Joy University's Short-Form Video Creative Director**

It must independently determine:

1. Topic meaning
2. Student pain point
3. Emotional tension
4. Creative angle
5. Hook mechanism
6. Story structure
7. Pattern interrupt
8. Value mechanism
9. Payoff
10. CTA
11. Visual storytelling
12. Camera direction
13. Performance
14. Editing rhythm
15. Sound design
16. Production requirements

---

# 9. MANDATORY STORY ARCHITECTURE

Every Reel must use:

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

Do not skip any section.

However, each section can be visually or verbally compressed when necessary.

---

# 10. HOOK ENGINE

The AI must automatically select the best hook mechanism.

Possible mechanisms:

* Curiosity
* Contradiction
* Shock
* Relatability
* Question
* Bold claim
* Unexpected visual
* Fear of making the wrong decision
* Myth busting
* POV
* Confession
* Challenge
* Comparison
* Direct pain point

The hook must communicate relevance immediately.

Avoid:

* Generic motivation
* Generic inspirational statements
* "Hey guys..."
* "Welcome back..."
* "Did you know..."
* Generic university introductions

The hook should feel native to short-form content.

---

# 11. PROBLEM ENGINE

Identify the actual human tension behind the topic.

Examples:

```text
Student doesn't know which course to choose.

Student feels pressured by parents.

Student is comparing themselves with friends.

Student thinks marks determine their future.

Student is afraid of choosing the wrong course.

Student doesn't understand career pathways.

Student is overwhelmed by too many choices.
```

Do not simply repeat the title.

Transform the title into a human situation.

---

# 12. PATTERN INTERRUPT ENGINE

The Reel must contain a deliberate attention reset.

Possible mechanisms:

* Sudden camera movement
* Jump cut
* Freeze frame
* Sudden silence
* Sound drop
* Location change
* Direct eye contact
* Phone interaction
* Unexpected character
* Prop reveal
* Visual transformation
* Text explosion
* Breaking the fourth wall
* Reverse movement
* POV change

The pattern interrupt must serve the story.

Never add random effects.

---

# 13. VALUE ENGINE

The Reel must give the viewer useful information.

Possible formats:

### Framework

```text
Ask yourself these 3 questions.
```

### Checklist

```text
Before choosing a course, check these 4 things.
```

### Mistakes

```text
Avoid these 3 mistakes.
```

### Comparison

```text
Course A vs Course B.
```

### Myth vs Reality

```text
MYTH
↓
REALITY
```

### Career insight

Explain an emerging opportunity.

### Decision framework

Help students make better decisions.

The viewer must leave with something useful.

---

# 14. PAYOFF ENGINE

The payoff should ideally connect to the hook.

Possible payoff types:

* Reframe
* Unexpected realization
* Final insight
* Visual reveal
* Callback
* Transformation
* Memorable one-liner

The ending must feel earned.

---

# 15. CTA ENGINE

Generate exactly ONE CTA.

Examples:

```text
Save this for later.

Send this to a friend.

Comment your stream.

Comment the course you're considering.

Follow for more +2 career content.

DM us for course details.

Explore the course.

Apply now.
```

Never generate multiple CTAs.

---

# 16. BRAND PRINCIPLE

The Reel must NOT feel like a traditional university advertisement.

Priority:

```text
CONTENT VALUE
      ↓
STUDENT RELEVANCE
      ↓
BRAND RELEVANCE
      ↓
CONVERSION
```

The first few seconds should generally focus on the student's problem, curiosity, or interest.

Avoid automatically starting with:

```text
Welcome to Joy University.

At Joy University...

Joy University is proud to...

Admissions are open...

We offer...

Our campus...
```

Brand integration should feel natural.

---

# 17. VISUAL PHILOSOPHY

Prioritize:

```text
PEOPLE
↓
ACTION
↓
ENVIRONMENT
```

Avoid making buildings the default hero visual.

Prefer:

* Student faces
* Expressions
* Reactions
* Hands
* Phones
* POV shots
* Conversations
* Walking
* Classroom activity
* Friends
* Campus interactions
* Real student situations
* Movement

Every visual should communicate something.

---

# 18. DEFAULT REEL LENGTH

Default:

> 25–30 seconds

Allowed range:

> 20–45 seconds

The AI may choose a different duration only when the concept genuinely requires it.

Avoid unnecessary dialogue.

---

# 19. LANGUAGE

Default:

> Natural conversational English

The AI may choose:

* English
* Tamil
* Tanglish

when appropriate.

Do not force slang.

Do not overuse Gen-Z terminology.

Dialogue must sound natural when spoken aloud.

---

# 20. JOY UNIVERSITY KNOWLEDGE

Use only verified information.

Known baseline information:

* Joy University
* Vadakkankulam, Tirunelveli district, Tamil Nadu
* Formerly The Indian Engineering College
* AISHE Code: U-1412
* 104-acre campus
* 42 years of academic excellence
* 1 lakh+ students placed worldwide
* UGC recognition under Section 2(f)

Academic areas:

* Computational Intelligence
* Engineering & Technology
* Agricultural Sciences
* Entrepreneurship & Management
* Law
* Nursing
* Pharmacy
* Life & Health Sciences
* Arts & Natural Sciences
* Design

Never invent:

* Rankings
* Placement statistics
* Salary figures
* Awards
* Accreditations
* Partnerships
* Course details
* Faculty details
* Facilities
* Admission rules
* Dates
* Statistics

If a fact is needed but unavailable:

```text
VERIFICATION REQUIRED
```

Never fabricate information.

---

# 21. AI OUTPUT CONTRACT

The AI must return structured JSON.

Do not rely on free-form Markdown as the primary data format.

The frontend should render the JSON.

Use this conceptual schema:

```json
{
  "reelTitle": "",
  "creativeAngle": "",
  "objective": "",
  "targetAudience": "",
  "duration": "",
  "format": "9:16 Vertical Reel",

  "storyboard": {
    "hook": {
      "timestamp": "",
      "visual": "",
      "dialogue": "",
      "onscreenText": "",
      "cameraPerformance": ""
    },

    "problem": {
      "timestamp": "",
      "visual": "",
      "dialogue": "",
      "onscreenText": "",
      "cameraPerformance": ""
    },

    "patternInterrupt": {
      "timestamp": "",
      "visual": "",
      "dialogue": "",
      "onscreenText": "",
      "cameraPerformance": ""
    },

    "value": {
      "timestamp": "",
      "visual": "",
      "dialogue": "",
      "onscreenText": "",
      "cameraPerformance": ""
    },

    "payoff": {
      "timestamp": "",
      "visual": "",
      "dialogue": "",
      "onscreenText": "",
      "cameraPerformance": ""
    },

    "cta": {
      "timestamp": "",
      "visual": "",
      "dialogue": "",
      "onscreenText": "",
      "cameraPerformance": ""
    }
  },

  "productionNotes": {
    "visualStyle": "",
    "performance": "",
    "camera": "",
    "editing": "",
    "sound": "",
    "props": [],
    "locations": [],
    "casting": "",
    "complexity": "LOW"
  },

  "creativeSummary": {
    "keyCreativeIdea": "",
    "shootingPriority": []
  }
}
```

---

# 22. TIMESTAMP REQUIREMENTS

Storyboard timestamps must be logical and sequential.

Example:

```text
00:00–00:03
00:03–00:07
00:07–00:10
00:10–00:20
00:20–00:25
00:25–00:30
```

The six sections must cover the complete Reel.

Do not create overlapping or impossible timestamps.

---

# 23. DASHBOARD UI

After generation, show:

```text
┌────────────────────────────────────────────┐
│ ← REEL CREATOR                 SAVE  EXPORT│
├────────────────────────────────────────────┤
│                                            │
│ REEL TITLE                                 │
│ I finished +2... now what?                 │
│                                            │
│ CREATIVE ANGLE                             │
│ Stop treating course selection like...     │
│                                            │
│ OBJECTIVE                                  │
│ Help students rethink how they choose...   │
│                                            │
│ AUDIENCE                    DURATION       │
│ +2 Students                 28 sec         │
├────────────────────────────────────────────┤
│                                            │
│ 01  HOOK                                   │
│ ────────────────────────────────────────── │
│ TIME                                       │
│ 00:00–00:03                                │
│                                            │
│ VISUAL                                     │
│ Student staring at multiple course...     │
│                                            │
│ DIALOGUE                                   │
│ "Everyone keeps asking what you're..."     │
│                                            │
│ ON-SCREEN TEXT                             │
│ WHAT NOW?                                  │
│                                            │
│ CAMERA / PERFORMANCE                       │
│ Tight close-up...                          │
│                                            │
│ [↻ REGENERATE]                             │
├────────────────────────────────────────────┤
│ 02  PROBLEM                                │
│ ...                                        │
├────────────────────────────────────────────┤
│ 03  PATTERN INTERRUPT                     │
│ ...                                        │
├────────────────────────────────────────────┤
│ 04  VALUE                                  │
│ ...                                        │
├────────────────────────────────────────────┤
│ 05  PAYOFF                                 │
│ ...                                        │
├────────────────────────────────────────────┤
│ 06  CTA                                    │
│ ...                                        │
├────────────────────────────────────────────┤
│ PRODUCTION NOTES                           │
│                                            │
│ CAMERA                                     │
│ EDITING                                    │
│ SOUND                                      │
│ PROPS                                      │
│ LOCATIONS                                  │
│ CASTING                                    │
│ COMPLEXITY                                 │
└────────────────────────────────────────────┘
```

---

# 24. DASHBOARD DESIGN LANGUAGE

The interface should feel:

> Premium / Minimal / Professional / Creative Studio

Avoid:

* Excessive gradients
* Cartoon UI
* Excessive rounded cards
* Excessive shadows
* Gaming aesthetics
* Generic AI chatbot appearance

Use:

* Strong typography
* Clear hierarchy
* Generous spacing
* Compact metadata
* Editorial layout
* Clean cards
* Strong section numbering
* Subtle interaction states

The dashboard should feel like a professional creative-production tool.

---

# 25. COLOR SYSTEM

Use a restrained Joy University-inspired palette.

Primary:

```text
#AF1E2A
```

Secondary dark neutral:

```text
#524F4F
```

Use neutral backgrounds and sufficient contrast.

Do not overuse the brand red.

Brand red should primarily be used for:

* Primary CTA
* Active states
* Section accents
* Important highlights

---

# 26. TYPOGRAPHY

Prefer:

> Montserrat

Use clear hierarchy:

```text
Page Title
Section Heading
Metadata
Body
Labels
```

Typography should remain highly readable.

---

# 27. RESPONSIVE DESIGN

The application must work on:

* Desktop
* Laptop
* Tablet
* Mobile

Desktop is the primary production environment.

On mobile:

* Stack storyboard cards vertically
* Preserve readability
* Keep CTA accessible
* Avoid horizontal overflow

---

# 28. STORYBOARD CARD DESIGN

Each shot card must clearly display:

```text
SHOT NUMBER

SECTION NAME

TIMESTAMP

VISUAL

DIALOGUE / VO

ON-SCREEN TEXT

CAMERA / PERFORMANCE
```

Optional action controls:

```text
Edit
Regenerate
Duplicate
Move
```

---

# 29. REGENERATE FUNCTION

This is a critical feature.

Each storyboard section should have:

> Regenerate

Example:

If the user clicks:

```text
↻ Regenerate Hook
```

Only the Hook should be regenerated.

The other five shots must remain unchanged.

The new Hook must still fit the overall Reel.

---

# 30. REGENERATE RULES

When regenerating one section, provide the AI with:

* Original title
* Creative angle
* Target audience
* Existing complete storyboard
* Selected section
* Existing production notes

The AI must preserve narrative continuity.

Example:

Regenerating Shot 3 must not accidentally change the CTA.

---

# 31. GLOBAL REGENERATION

Provide:

> Regenerate Entire Reel

This generates a completely new creative concept while keeping the same title.

The new concept should not be a minor wording variation.

It should use a meaningfully different creative approach.

---

# 32. CREATIVE TONE CONTROL

Allow the user to change creative tone after generation.

Possible controls:

```text
More Emotional
More Funny
More Bold
More Premium
More Cinematic
More Relatable
More Educational
More Youthful
More Direct
```

When selected, regenerate the complete concept while preserving the core topic.

---

# 33. LANGUAGE CONTROL

Allow:

```text
English
Tamil
Tanglish
```

Changing language should regenerate spoken dialogue and on-screen copy while preserving the creative idea.

---

# 34. DURATION CONTROL

Allow:

```text
15 sec
20 sec
30 sec
45 sec
```

Changing duration should regenerate timing and dialogue appropriately.

Do not simply truncate the existing script.

---

# 35. VERSION HISTORY

Each generation should create a version.

Example:

```text
Version 1
Version 2
Version 3
```

Allow:

* View
* Restore
* Duplicate
* Delete

The current version must be clearly identified.

---

# 36. SAVE PROJECT

Allow the user to save a Reel.

Project fields:

```text
ID
Title
Created Date
Updated Date
Current Version
Creative Direction
Duration
Status
```

Statuses:

```text
Draft
Ready for Production
Shot
Edited
Published
Archived
```

---

# 37. REEL LIBRARY

Create a library page.

Display:

```text
REEL LIBRARY

[ Search reels... ]

Filter:
All
Draft
Ready
Shot
Edited
Published
Archived
```

Each project card should show:

```text
Title
Creative Angle
Duration
Status
Updated Date
```

---

# 38. SEARCH

Search should work across:

* Reel title
* Creative angle
* Audience
* Story content
* Tags

---

# 39. TAGS

Automatically generate useful internal tags.

Example:

```text
career
+2
course-selection
student-life
AI
engineering
commerce
agriculture
```

Tags should help with library search.

---

# 40. EXPORT

Provide:

> Export Production Sheet

Preferred format:

> PDF

The PDF should contain:

### Header

Joy University Reel Creative Director

### Project information

* Reel Title
* Creative Angle
* Objective
* Audience
* Duration

### Storyboard

All six shots.

### Production Notes

* Visual style
* Performance
* Camera
* Editing
* Sound
* Props
* Locations
* Casting
* Complexity

### Shooting Priority

The final page should contain the most important production priorities.

---

# 41. COPY FUNCTIONS

Each section should allow:

> Copy

Possible copy targets:

```text
Copy Dialogue
Copy On-Screen Text
Copy Full Shot
Copy Full Reel
```

---

# 42. EDITABLE OUTPUT

The user must be able to edit generated content manually.

Fields should be editable:

* Creative angle
* Objective
* Audience
* Duration
* Visual
* Dialogue
* On-screen text
* Camera direction
* Production notes

Manual edits must not automatically trigger AI regeneration.

---

# 43. AI VALIDATION

Before displaying a generated Reel, validate:

### Structural validation

Must contain:

```text
Hook
Problem
Pattern Interrupt
Value
Payoff
CTA
```

### Content validation

Check:

* Hook is strong
* Problem is relevant
* Value exists
* Payoff exists
* CTA count = exactly 1
* Dialogue is conversational
* Visuals are shootable
* No fabricated facts

### Production validation

Check:

* Timestamps are sequential
* Duration is reasonable
* Locations are realistic
* Casting is realistic
* Production complexity is present

If validation fails:

> Automatically repair the output before displaying it.

Do not expose malformed AI output to the user.

---

# 44. FACT SAFETY

The AI must distinguish between:

### Creative opinion

Allowed.

### General educational knowledge

Allowed when reasonable and accurate.

### Joy University factual claims

Must come only from verified information.

Never invent institutional claims.

If uncertain:

```text
VERIFICATION REQUIRED
```

The system must never hallucinate university statistics.

---

# 45. PRODUCTION REALISM

Generated concepts must be practical for an actual university media team.

Avoid requiring:

* Hollywood-level VFX
* Expensive equipment
* Impossible locations
* Large casts without reason
* Dangerous actions
* Complex CGI unless necessary

The AI should favor:

> High creative impact + practical execution.

---

# 46. CAMERA DIRECTION

Camera instructions should be specific enough for a videographer.

Examples:

```text
Extreme close-up
Medium shot
Wide shot
Over-the-shoulder
POV
Tracking shot
Handheld
Static tripod
Low angle
Top-down
Push-in
Whip pan
Rack focus
```

Do not mention technical camera settings unless they materially help.

---

# 47. EDITING DIRECTION

The AI should specify:

* Cut rhythm
* Jump cuts
* Text timing
* Transitions
* Speed ramps
* Freeze frames
* Sound drops
* Visual reveals

Avoid generic:

> "Make it engaging."

Give actionable direction.

---

# 48. SOUND DESIGN

Specify:

* Music mood
* Sound effects
* Silence moments
* Beat changes
* Audio transitions

Example:

```text
Start with room tone.

Music enters after the hook.

Drop music completely during the pattern interrupt.

Beat returns during the value section.
```

---

# 49. PRODUCTION COMPLEXITY

Automatically classify:

```text
LOW
MEDIUM
HIGH
```

### LOW

1–2 people, simple locations, basic editing.

### MEDIUM

Multiple shots, multiple locations, moderate editing.

### HIGH

Complex locations, multiple actors, advanced transitions, complicated production.

Favor LOW and MEDIUM unless the idea benefits from HIGH complexity.

---

# 50. ERROR HANDLING

If AI generation fails:

Show:

```text
We couldn't generate this Reel.

Please try again.
```

Buttons:

```text
TRY AGAIN
EDIT TITLE
```

Do not show raw API errors.

---

# 51. EMPTY STATES

Create polished empty states.

Example:

```text
YOUR NEXT REEL STARTS WITH ONE IDEA.

Enter a title and let the Creative Director
build the concept.

[ CREATE FIRST REEL ]
```

---

# 52. LOADING STATE

Generation may take several seconds.

Do not show a generic spinner only.

Show creative progress:

```text
ANALYZING IDEA...
IDENTIFYING STUDENT TENSION...
BUILDING HOOK...
DESIGNING PATTERN INTERRUPT...
CREATING VALUE...
CRAFTING PAYOFF...
PLANNING PRODUCTION...
FINALIZING REEL...
```

This makes the AI feel like it is actually working through the creative process.

---

# 53. SECURITY

Never expose API keys in frontend code.

All AI API credentials must be stored securely.

Use environment variables.

Never hardcode:

```text
API keys
Secrets
Tokens
Passwords
```

---

# 54. DATA STORAGE

For the MVP, use a practical local persistence mechanism if no backend is required.

Preferred:

> IndexedDB

Do not use localStorage as the primary database for structured projects if the application is expected to grow.

Use stable IDs for:

* Projects
* Versions
* Shots

Suggested relationships:

```text
Project
  ↓
Versions
  ↓
Storyboard
  ↓
Shots
```

---

# 55. DATA MODEL

Use a structure conceptually similar to:

```text
Project
├── id
├── title
├── createdAt
├── updatedAt
├── status
├── tags[]
├── currentVersionId
│
└── versions[]
      ├── id
      ├── createdAt
      ├── creativeDirection
      ├── creativeAngle
      ├── objective
      ├── targetAudience
      ├── duration
      ├── storyboard
      ├── productionNotes
      └── creativeSummary
```

---

# 56. NO CHATBOT UI

Do NOT make the application look like:

```text
User:
Create a Reel about...

AI:
Sure! Here's your Reel...
```

This is not a chatbot.

It is a creative production application.

Use structured UI.

---

# 57. NO UNNECESSARY QUESTIONS

The system should not ask:

```text
Who is your audience?
What is the hook?
What tone do you want?
What CTA should we use?
What visuals should we use?
```

The AI determines these automatically.

Only ask for clarification if the title is genuinely impossible to interpret.

---

# 58. TITLE QUALITY HANDLING

If the user enters a weak title:

```text
AI
```

Do not reject it immediately.

Interpret it creatively.

Generate a useful Reel concept.

If the title is extremely ambiguous, use the most reasonable interpretation and proceed.

The goal is:

> Minimum user input.

---

# 59. MULTIPLE CONCEPTS

The MVP should generate ONE concept by default.

Later support:

```text
Generate 3 Concepts
```

For example:

```text
Concept A — Relatable
Concept B — Bold
Concept C — Cinematic
```

Do not make this mandatory in the first version.

---

# 60. FUTURE FEATURES

Architect the application so these can be added later:

```text
AI Voiceover
AI Storyboard Images
AI Shot References
AI Video Generation
Thumbnail Generator
Caption Generator
Hashtag Generator
Instagram Caption
YouTube Shorts Version
LinkedIn Version
Tamil Version
Production Schedule
Actor Assignment
Location Assignment
Shot Completion Tracking
Team Collaboration
Approval Workflow
Analytics
```

Do not build these features in the MVP unless specifically requested.

But avoid architectural decisions that make them impossible later.

---

# 61. FUTURE SHOT TRACKING

The storyboard model should eventually support:

```text
Shot Status

NOT SHOT
↓
SHOT
↓
SELECTED
↓
EDITED
↓
APPROVED
```

Do not necessarily implement this in MVP.

---

# 62. FUTURE TEAM WORKFLOW

Potential workflow:

```text
CONTENT TEAM
     ↓
CREATE REEL
     ↓
CREATIVE DIRECTOR
     ↓
PRODUCTION TEAM
     ↓
SHOOT
     ↓
EDITOR
     ↓
APPROVAL
     ↓
PUBLISH
```

Design the data model so this workflow can be added later.

---

# 63. COMPONENT ARCHITECTURE

Use reusable components.

Suggested structure:

```text
App
├── Dashboard
├── CreateReel
├── ReelLibrary
├── ReelDetail
│
├── components
│   ├── TitleInput
│   ├── CreativeDirectionSelector
│   ├── GenerateButton
│   ├── CreativeOverview
│   ├── Storyboard
│   ├── StoryboardCard
│   ├── ProductionNotes
│   ├── RegenerateButton
│   ├── VersionSelector
│   ├── ExportButton
│   └── StatusBadge
│
├── ai
│   ├── creativeEngine
│   ├── prompts
│   ├── schema
│   └── validator
│
└── data
    ├── projects
    ├── versions
    └── storage
```

Adapt this structure to the actual framework generated by Antigravity.

Do not blindly force this exact folder structure if the framework has a better native architecture.

---

# 64. STATE MANAGEMENT

Maintain separate state for:

```text
Current project
Current version
Generation state
Editing state
Selected shot
Regeneration state
Library filters
Search
```

Avoid unnecessary global state.

---

# 65. UX PRINCIPLE

Every major action should have obvious feedback.

Examples:

```text
Generate → Loading state

Save → Saved indicator

Regenerate → Section loading

Export → Export progress

Edit → Save confirmation

Delete → Confirmation
```

---

# 66. DESKTOP LAYOUT

Preferred desktop layout:

```text
┌───────────────────────────────────────────────────────┐
│ LOGO             REELS        LIBRARY        SETTINGS │
├───────────────────────────────────────────────────────┤
│                                                       │
│                 CREATE YOUR NEXT REEL                 │
│                                                       │
│                 [ Reel title input ]                  │
│                                                       │
│                 [ Generate Reel ]                     │
│                                                       │
└───────────────────────────────────────────────────────┘
```

After generation:

```text
┌───────────────┬───────────────────────────────────────┐
│ PROJECT INFO  │ STORYBOARD                            │
│               │                                       │
│ Title         │ 01 Hook                               │
│ Angle         │ 02 Problem                            │
│ Audience      │ 03 Pattern Interrupt                  │
│ Duration      │ 04 Value                              │
│ Status        │ 05 Payoff                             │
│               │ 06 CTA                                 │
│               │                                       │
│               │ PRODUCTION NOTES                      │
└───────────────┴───────────────────────────────────────┘
```

---

# 67. EDITOR EXPERIENCE

When editing a shot:

```text
VISUAL

[ editable text area ]

DIALOGUE / VO

[ editable text area ]

ON-SCREEN TEXT

[ editable text area ]

CAMERA / PERFORMANCE

[ editable text area ]

[ SAVE CHANGES ]
```

Do not force the user into a separate page for simple edits.

Prefer inline editing or a side panel.

---

# 68. ACCESSIBILITY

Ensure:

* Good contrast
* Keyboard navigation
* Visible focus states
* Proper labels
* Accessible buttons
* Readable font sizes
* No information conveyed only through color

---

# 69. PERFORMANCE

The dashboard should load quickly.

Do not unnecessarily:

* Load huge assets
* Perform expensive animations
* Render unnecessary components
* Call AI automatically on page load

AI generation should happen only after the user clicks Generate.

---

# 70. AI PROMPT ARCHITECTURE

Keep the AI system prompt separate from application code.

Use:

```text
SYSTEM PROMPT
+
USER TITLE
+
OPTIONAL CREATIVE DIRECTION
+
CURRENT CONTEXT
```

For regeneration:

```text
SYSTEM PROMPT
+
ORIGINAL TITLE
+
CURRENT REEL
+
TARGET SHOT
+
REGENERATION INSTRUCTION
```

---

# 71. AI SYSTEM PROMPT

The AI system prompt must establish:

```text
You are Joy University's Short-Form Video Creative Director.

Your job is to transform one Reel title into a production-ready short-form video.

You are responsible for all creative decisions.

The user provides only the title.

You must create:

Hook
Problem
Pattern Interrupt
Value
Payoff
CTA
Visuals
Dialogue
On-screen text
Camera direction
Performance
Editing
Sound
Props
Locations
Casting
Production complexity

The content must primarily serve +2 students.

The content should feel useful before promotional.

Never fabricate Joy University facts.

Return valid structured JSON according to the application schema.
```

Use the full creative rules defined in this document.

---

# 72. JSON VALIDATION

The AI response must be validated against a schema before being accepted.

Reject or repair:

* Missing fields
* Invalid types
* Empty required sections
* Invalid CTA count
* Invalid complexity
* Invalid timestamps
* Malformed JSON

The frontend must never assume the AI response is valid.

---

# 73. CTA VALIDATION

The application should verify that there is exactly one CTA.

If the AI produces:

```text
Follow us and apply now.
```

This is considered two actions.

Repair it to one action.

Example:

```text
Explore the course.
```

---

# 74. FACT VALIDATION

If AI output contains claims about Joy University that are not in the approved knowledge base:

Flag:

```text
VERIFICATION REQUIRED
```

Do not silently present unverified institutional claims as facts.

---

# 75. PRODUCTION READINESS TEST

Before displaying a Reel, ask internally:

```text
Can a videographer understand what to shoot?

Can an actor understand what to say?

Can an editor understand the rhythm?

Can a designer understand the on-screen text?

Can a producer understand the required locations and props?

Can the content team understand the purpose?

Can a +2 student relate to it?
```

If not, improve the output.

---

# 76. CREATIVE QUALITY TEST

Internally score the concept:

```text
Hook Strength
Student Relevance
Originality
Value
Story Flow
Pattern Interrupt
Payoff
CTA Clarity
Production Practicality
Brand Fit
```

Use an internal 1–10 evaluation.

If any major creative category is weak, regenerate or improve before returning the final output.

Do NOT necessarily expose the score to the user in MVP.

---

# 77. DO NOT OVERWRITE USER EDITS

If the user manually edits a shot:

```text
USER EDITED
```

mark it internally.

A regeneration of another shot must preserve the manual edit.

Global regeneration may create a new version rather than overwriting the current edited version.

---

# 78. VERSION SAFETY

Never permanently overwrite a saved version.

When the user chooses:

> Regenerate Entire Reel

create a new version.

When the user edits the current version, preserve the existing saved state appropriately.

---

# 79. SAVE BEHAVIOR

Support:

```text
Auto-save
```

for manual edits where practical.

Display:

```text
Saved
Saving...
Unsaved changes
```

Do not lose user work.

---

# 80. EXPORT DESIGN

PDF export should be production-oriented rather than simply printing the web page.

Recommended structure:

```text
PAGE 1
REEL OVERVIEW

PAGE 2
SHOTS 01–03

PAGE 3
SHOTS 04–06

PAGE 4
PRODUCTION NOTES

PAGE 5
SHOOTING PRIORITY
```

If content exceeds the page, intelligently paginate.

---

# 81. NO FABRICATED UI DATA

Do not show fake:

* Reel counts
* Analytics
* Projects
* User profiles
* Saved projects
* Production status

unless they actually exist.

During development, mock data may be used temporarily but must be clearly isolated.

---

# 82. DEVELOPMENT PRIORITY

Build in this order:

### PHASE 1

```text
Application shell
Create screen
Title input
Creative direction
Generate button
```

### PHASE 2

```text
AI integration
Structured JSON
Validation
Storyboard rendering
```

### PHASE 3

```text
Editing
Shot regeneration
Full regeneration
```

### PHASE 4

```text
Persistence
Project library
Search
Version history
```

### PHASE 5

```text
PDF export
Polish
Responsive design
Error handling
```

Do not attempt to build every future feature immediately.

---

# 83. MVP ACCEPTANCE CRITERIA

The MVP is successful when:

### Test 1

User enters:

```text
I finished +2... now what?
```

and clicks Generate.

The application produces a complete Reel.

### Test 2

All six sections exist.

### Test 3

Each section contains:

```text
Timestamp
Visual
Dialogue
On-screen text
Camera/performance
```

### Test 4

Production notes are present.

### Test 5

The user can regenerate only the Hook.

### Test 6

Other shots remain unchanged.

### Test 7

The user can edit a shot.

### Test 8

The user can save the project.

### Test 9

The project appears in the library.

### Test 10

The project can be exported as a production sheet.

---

# 84. IMPORTANT DEVELOPMENT RULES

Do not:

* Build unnecessary features before the core workflow works.
* Create a chatbot instead of a dashboard.
* Hardcode generated Reel content.
* Depend on fragile free-form AI Markdown.
* Expose API keys.
* Invent university information.
* Ask users unnecessary creative questions.
* Make the dashboard dynamically designed by AI.
* Lose user edits during regeneration.
* Replace an entire project when only one shot needs regeneration.

---

# 85. FINAL PRODUCT PRINCIPLE

The application should make the user's job feel like this:

```text
THINK OF IDEA
      ↓
TYPE TITLE
      ↓
CLICK GENERATE
      ↓
AI DOES THE CREATIVE THINKING
      ↓
REVIEW
      ↓
EDIT IF NEEDED
      ↓
EXPORT
      ↓
SHOOT
```

The user should never feel that they are "prompting an AI."

They should feel that they are working with:

> **A professional Creative Director.**

---

# 86. FINAL ANTIGRAVITY INSTRUCTION

Build this application completely and professionally.

First inspect the existing project structure and determine the current framework, dependencies, routing, and available environment variables.

Do not unnecessarily replace an existing working architecture.

Implement the smallest clean architecture that supports the complete MVP.

Prioritize:

1. Working generation
2. Structured AI output
3. Reliable validation
4. Excellent dashboard UI
5. Individual shot regeneration
6. Manual editing
7. Persistence
8. Version history
9. Export

Do not stop after creating a visual mockup.

The application must be functional.

The final result must be a usable internal production tool for Joy University's content team.

---

# END OF AGENT.md
