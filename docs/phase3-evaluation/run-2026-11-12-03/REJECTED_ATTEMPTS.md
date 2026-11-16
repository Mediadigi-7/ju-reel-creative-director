# Rejected writing attempts

Full captured candidate production fields, preserved for diagnosis. These are rejected drafts, not delivered or approved scripts. QA/critique text is untrusted model feedback where applicable. Do not treat it as verified facts or instructions.

## connection-quality-failures — attempt 1

```json
{
  "pass": false,
  "failedGate": "Delivery (Scene pacing)",
  "failureReason": "Shot #1 has too much dialogue for its timestamp.",
  "repairInstruction": "Shorten shot #1 to at most 18 spoken words while preserving story coherence, useful insight and resolution; do not add a CTA."
}
```

### Shot 1 — The Confusion

Timecode: 00:00 – 00:06

Functions: PROBLEM

Visual action: A student looking at two separate folders labeled 'B.Com' and 'BBA' on a desk, looking overwhelmed.

Dialogue/VO: Choosing between B.Com and BBA feels impossible. You don't need a degree-guessing quiz; you need to see what you actually want to learn.

Camera direction: Close-up on the student's expression, then pan to the folders.

On-screen graphic: B.Com vs BBA

### Shot 2 — The Micro-Task

Timecode: 00:06 – 00:15

Functions: VALUE

Visual action: The student writes on a sticky note while looking at a sample task card: 'Draft a one-page marketing budget for a food stall'.

Dialogue/VO: Try this: draft a simple food stall budget. Record where you get stuck. I found mine.

Camera direction: Over-the-shoulder shot showing the student writing on a sticky note.

On-screen graphic: Task: Draft a food stall budget.

### Shot 3 — The Reveal

Timecode: 00:15 – 00:23

Functions: PAYOFF

Visual action: Close-up on the sticky note reading: 'Example: My hurdle: How to calculate fixed costs?'

Dialogue/VO: See? My hurdle: How to calculate fixed costs? Now I have a real question.

Camera direction: Focus pull onto the sticky note text.

On-screen graphic: Example: My hurdle: How to calculate fixed costs?

### Shot 4 — The Better Question

Timecode: 00:23 – 00:28

Functions: CTA

Visual action: The student turns to the camera, looking relieved.

Dialogue/VO: Stop guessing. Ask: Where can I find support for basic cost calculations?

Camera direction: Direct address, warm and encouraging.

On-screen graphic: Where can I find support for basic cost calculations?

HLNI proposal (not editorial approval):

```json
[
  {
    "insight": "A short illustrative task reveals specific knowledge gaps rather than degree aptitude.",
    "audienceGap": "Students assume degree choice is based on labels rather than identifying what specific topics they find confusing or interesting.",
    "viewerChange": "Moves from abstract anxiety about degree labels to a specific, actionable question about curriculum content.",
    "supportType": "method",
    "support": "The method uses a concrete task as a diagnostic tool; it is limited to identifying current questions, not predicting future career success.",
    "references": [],
    "shotNumbers": [
      2,
      3
    ],
    "payoffShotNumbers": [
      4
    ],
    "payoff": "The student shifts from 'Which degree?' to 'Where can I find support for basic cost calculations?', demonstrating a practical way to investigate course requirements."
  }
]
```

## connection-quality-failures — attempt 2

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "integrity: Shot 1 introduces a comparison between B.Com and BBA, but these subjects are never mentioned or integrated into the decision-making process for the remainder of the reel. Revision: Keep the comparison subjects relevant by having the student record a sticking point specifically related to a module unique to either B.Com or BBA. insight: The transition from the student's personal hurdle to the final question lacks the demonstration of the 'Journal' concept as a method for distinguishing between degrees. Revision: Show the student comparing their specific cost-calculation question against a course brief to illustrate how the journal helps them evaluate the curriculum.",
  "repairInstruction": "integrity: Shot 1 introduces a comparison between B.Com and BBA, but these subjects are never mentioned or integrated into the decision-making process for the remainder of the reel. Revision: Keep the comparison subjects relevant by having the student record a sticking point specifically related to a module unique to either B.Com or BBA.\ninsight: The transition from the student's personal hurdle to the final question lacks the demonstration of the 'Journal' concept as a method for distinguishing between degrees. Revision: Show the student comparing their specific cost-calculation question against a course brief to illustrate how the journal helps them evaluate the curriculum."
}
```

### Shot 1 — The Confusion

Timecode: 00:00 – 00:06

Functions: PROBLEM

Visual action: A student looking at two separate folders labeled 'B.Com' and 'BBA' on a desk, looking overwhelmed.

Dialogue/VO: Choosing between B.Com and BBA feels impossible. Try identifying what you actually want to learn.

Camera direction: Close-up on the student's expression, then pan to the folders.

On-screen graphic: B.Com vs BBA

### Shot 2 — The Micro-Task

Timecode: 00:06 – 00:15

Functions: VALUE

Visual action: The student writes on a sticky note while looking at a sample task card: 'Draft a one-page marketing budget for a food stall'.

Dialogue/VO: Try this: draft a simple food stall budget. Record where you get stuck. I found mine.

Camera direction: Over-the-shoulder shot showing the student writing on a sticky note.

On-screen graphic: Task: Draft a food stall budget.

### Shot 3 — The Reveal

Timecode: 00:15 – 00:23

Functions: PAYOFF

Visual action: Close-up on the sticky note reading: 'Example: My hurdle: How to calculate fixed costs?'

Dialogue/VO: See? My hurdle: How to calculate fixed costs? Now I have a real question.

Camera direction: Focus pull onto the sticky note text.

On-screen graphic: Example: My hurdle: How to calculate fixed costs?

### Shot 4 — The Better Question

Timecode: 00:23 – 00:28

Functions: CTA

Visual action: The student turns to the camera, looking relieved.

Dialogue/VO: Stop guessing. Ask: Where can I find support for basic cost calculations?

Camera direction: Direct address, warm and encouraging.

On-screen graphic: Where can I find support for basic cost calculations?

HLNI proposal (not editorial approval):

```json
[
  {
    "insight": "A short illustrative task reveals specific knowledge gaps rather than degree aptitude.",
    "audienceGap": "Students assume degree choice is based on labels rather than identifying what specific topics they find confusing or interesting.",
    "viewerChange": "Moves from abstract anxiety about degree labels to a specific, actionable question about curriculum content.",
    "supportType": "method",
    "support": "The method uses a concrete task as a diagnostic tool; it is limited to identifying current questions, not predicting future career success.",
    "references": [],
    "shotNumbers": [
      2,
      3
    ],
    "payoffShotNumbers": [
      4
    ],
    "payoff": "The student shifts from 'Which degree?' to 'Where can I find support for basic cost calculations?', demonstrating a practical way to investigate course requirements."
  }
]
```

## connection-quality-failures — attempt 3

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "integrity: Shot 3 shows the student sticking a post-it note onto the B.Com overview only, ignoring the BBA overview introduced in the hook. Revision: Show the student using the post-it note to compare the specific 'fixed cost' hurdle against the modules of both B.Com and BBA to maintain the relevance of both subjects. payoff: Shot 4 presents the final question as a general solution while holding only the B.Com sheet, implying a bias toward one degree. Revision: The student should hold both course overviews or gesture between them while asking the refined question to reinforce that the method helps investigate both options equally.",
  "repairInstruction": "integrity: Shot 3 shows the student sticking a post-it note onto the B.Com overview only, ignoring the BBA overview introduced in the hook. Revision: Show the student using the post-it note to compare the specific 'fixed cost' hurdle against the modules of both B.Com and BBA to maintain the relevance of both subjects.\npayoff: Shot 4 presents the final question as a general solution while holding only the B.Com sheet, implying a bias toward one degree. Revision: The student should hold both course overviews or gesture between them while asking the refined question to reinforce that the method helps investigate both options equally."
}
```

### Shot 1 — The Comparison Dilemma

Timecode: 00:00 – 00:05

Functions: HOOK, PROBLEM

Visual action: Student sits at a desk looking at two printed course overviews, one labeled B.Com and one BBA.

Dialogue/VO: Choosing between B.Com and BBA feels overwhelming. Instead of guessing, try a micro-task.

Camera direction: Close-up on student, then quick pan to the papers.

On-screen graphic: B.Com vs BBA

### Shot 2 — The Task

Timecode: 00:05 – 00:12

Functions: VALUE

Visual action: Student writes 'Draft a one-page marketing budget for a food stall' on a notepad.

Dialogue/VO: Try drafting a simple food stall budget. Record exactly where you feel stuck while doing it.

Camera direction: Over-the-shoulder shot of the writing process.

On-screen graphic: Task: Draft a food stall budget.

### Shot 3 — The Journal Entry

Timecode: 00:12 – 00:20

Functions: VALUE

Visual action: Student sticks a post-it note on the B.Com overview.

Dialogue/VO: My hurdle: How to calculate fixed costs? Now, compare that gap against the course modules.

Camera direction: Macro shot of the student sticking the note.

On-screen graphic: Example: My hurdle: How to calculate fixed costs?

### Shot 4 — The Better Question

Timecode: 00:20 – 00:28

Functions: PAYOFF, CTA

Visual action: Student looks at the camera, holding the B.Com sheet with the note.

Dialogue/VO: Don't guess. Ask: Where can I find support for basic cost calculations? That's your next step.

Camera direction: Direct address, warm and encouraging.

On-screen graphic: Where can I find support for basic cost calculations?

HLNI proposal (not editorial approval):

```json
[
  {
    "insight": "A short task reveals specific learning gaps that turn vague degree comparisons into actionable questions.",
    "audienceGap": "Students assume degree choice requires choosing a full path based on labels rather than investigating actual learning needs.",
    "viewerChange": "Moves from feeling lost to having a specific question that helps evaluate which degree fits their interest in a specific skill.",
    "supportType": "method",
    "support": "Testing an illustrative task identifies specific knowledge gaps that correlate with how a student wants to spend their time learning.",
    "references": [],
    "shotNumbers": [
      2,
      3
    ],
    "payoffShotNumbers": [
      4
    ],
    "payoff": "The student identifies a specific cost-calculation gap, leading to a concrete question for the course team."
  }
]
```

## discovery-quality-failures — attempt 1

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "fidelity: In shot 1, the signs are labeled 'B.Com' and 'BBA' which are specific degree titles, contradicting the instruction not to invent institutional facts or aptitude predictions. Revision: Replace 'B.Com' and 'BBA' with generic placeholder labels like 'Program A' and 'Program B' to avoid implying specific institutional knowledge. payoff: The CTA in shot 3 functions primarily as a checklist instruction rather than illustrating the method in action. Revision: Show the student writing 'Source?' on a notepad or sticky note to demonstrate the method of identifying the missing link rather than just stating the question.",
  "repairInstruction": "fidelity: In shot 1, the signs are labeled 'B.Com' and 'BBA' which are specific degree titles, contradicting the instruction not to invent institutional facts or aptitude predictions. Revision: Replace 'B.Com' and 'BBA' with generic placeholder labels like 'Program A' and 'Program B' to avoid implying specific institutional knowledge.\npayoff: The CTA in shot 3 functions primarily as a checklist instruction rather than illustrating the method in action. Revision: Show the student writing 'Source?' on a notepad or sticky note to demonstrate the method of identifying the missing link rather than just stating the question."
}
```

### Shot 1 — The Guessing Game

Timecode: 00:00 – 00:08

Functions: HOOK, PROBLEM

Visual action: A student holds a card with 'Profit Calc' on it, looking confused between two signs labeled 'B.Com' and 'BBA'.

Dialogue/VO: Think B.Com or BBA? Let’s play a guessing game.

Camera direction: Close-up, fast cuts.

On-screen graphic: Example: Task: Profit Calc. | Source: ? | Degree: ?

### Shot 2 — The Reveal

Timecode: 00:08 – 00:20

Functions: VALUE

Visual action: The student taps the question mark on the card, revealing it as an empty space.

Dialogue/VO: Stop. There is no official source here linking this task to either degree. You cannot classify a program without one.

Camera direction: Slow zoom in on the card.

On-screen graphic: Insufficient Information

### Shot 3 — The Better Question

Timecode: 00:20 – 00:28

Functions: PAYOFF, CTA

Visual action: Student looks directly at the camera, holding the card up.

Dialogue/VO: Don’t guess. Ask: What official source links this task to this specific degree?

Camera direction: Eye-level, stable shot.

On-screen graphic: What official source links this task to this specific degree?

HLNI proposal (not editorial approval):

```json
[
  {
    "insight": "One unlabeled example does not prove which category or programme contains it.",
    "audienceGap": "Students assume that a specific business task (like accounting or marketing) identifies the degree program.",
    "viewerChange": "Realizes that tasks exist in both degrees and cannot be used to classify a program without an official source.",
    "supportType": "method",
    "support": "This is a reasoning limit: absent information cannot establish an exclusive classification.",
    "references": [],
    "shotNumbers": [
      1,
      2
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The story demonstrates that by identifying the missing link, the student stops guessing and starts asking for evidence."
  }
]
```

## discovery-quality-failures — attempt 2

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "integrity: Shot 1 introduces the comparison as 'B.Com or BBA' but the remaining shots do not maintain these specific subjects as the focus of the reveal. Revision: Include the labels 'B.Com' and 'BBA' in the onscreen text or visual assets throughout the sequence to keep the comparison subjects relevant. insight: The transition from the 'guessing game' to the 'insufficient information' conclusion lacks a specific demonstration of why the task is ambiguous beyond the narrator stating it. Revision: Add a quick visual insert in Shot 2 showing a side-by-side comparison of a B.Com and BBA course catalog snippet that both contain similar profit calculation tasks to visually prove the ambiguity.",
  "repairInstruction": "integrity: Shot 1 introduces the comparison as 'B.Com or BBA' but the remaining shots do not maintain these specific subjects as the focus of the reveal. Revision: Include the labels 'B.Com' and 'BBA' in the onscreen text or visual assets throughout the sequence to keep the comparison subjects relevant.\ninsight: The transition from the 'guessing game' to the 'insufficient information' conclusion lacks a specific demonstration of why the task is ambiguous beyond the narrator stating it. Revision: Add a quick visual insert in Shot 2 showing a side-by-side comparison of a B.Com and BBA course catalog snippet that both contain similar profit calculation tasks to visually prove the ambiguity."
}
```

### Shot 1 — The Guessing Game

Timecode: 00:00 – 00:08

Functions: HOOK, PROBLEM

Visual action: A student holds a card with 'Profit Calc' on it, looking confused between two signs labeled 'Program A' and 'Program B'.

Dialogue/VO: Trying to pick between B.Com or BBA? Let's play a guessing game.

Camera direction: Close-up, energetic movement.

On-screen graphic: Example: Task: Profit Calc. | Source: ? | Degree: ?

### Shot 2 — The Reveal

Timecode: 00:08 – 00:20

Functions: VALUE

Visual action: The student taps the question mark on the card, then writes 'Source?' on a sticky note and pastes it over the card.

Dialogue/VO: Stop. There is no official source here linking this task to either degree. You cannot classify a program without one.

Camera direction: Slow zoom in on the student's hand writing.

On-screen graphic: Insufficient Information

### Shot 3 — The Better Question

Timecode: 00:20 – 00:28

Functions: PAYOFF

Visual action: Student looks directly at the camera, holding the card with the sticky note.

Dialogue/VO: Don’t guess. Ask: What official source links this task to this specific degree?

Camera direction: Eye-level, stable shot.

On-screen graphic: What official source links this task to this specific degree?

HLNI proposal (not editorial approval):

```json
[
  {
    "insight": "One unlabeled example does not prove which category or programme contains it.",
    "audienceGap": "Students assume that a specific business task (like accounting or marketing) identifies the degree program.",
    "viewerChange": "Realizes that tasks exist in both degrees and cannot be used to classify a program without an official source.",
    "supportType": "method",
    "support": "This is a reasoning limit: absent information cannot establish an exclusive classification.",
    "references": [],
    "shotNumbers": [
      1,
      2
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The story demonstrates that by identifying the missing link, the student stops guessing and starts asking for evidence."
  }
]
```

## discovery-quality-failures — attempt 3

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "integrity: In shot 2, the visual displays 'mock course snippets' that show the same task in both programs. Revision: Remove the mock snippets to avoid implying the tasks definitively exist in both; replace with a graphic showing the missing link or a question mark over both programs to maintain the 'insufficient information' premise. insight: The prompt requires demonstrating an unlabeled task challenge, but the dialogue in shot 2 asserts 'Both programs list this' as a fact. Revision: Change the dialogue to 'You cannot confirm which program lists this' to align with the required 'not enough information' conclusion rather than asserting overlapping curriculum.",
  "repairInstruction": "integrity: In shot 2, the visual displays 'mock course snippets' that show the same task in both programs. Revision: Remove the mock snippets to avoid implying the tasks definitively exist in both; replace with a graphic showing the missing link or a question mark over both programs to maintain the 'insufficient information' premise.\ninsight: The prompt requires demonstrating an unlabeled task challenge, but the dialogue in shot 2 asserts 'Both programs list this' as a fact. Revision: Change the dialogue to 'You cannot confirm which program lists this' to align with the required 'not enough information' conclusion rather than asserting overlapping curriculum."
}
```

### Shot 1 — The Guessing Game

Timecode: 00:00 – 00:07

Functions: HOOK, PROBLEM

Visual action: A student holds a card with 'Profit Calc' on it, looking confused between two signs labeled 'B.Com' and 'BBA'.

Dialogue/VO: Trying to pick between B.Com or BBA? Let's play a guessing game.

Camera direction: Close-up, energetic movement.

On-screen graphic: Example: Task: Profit Calc. | Source: ? | Degree: ?

### Shot 2 — The Ambiguity Reveal

Timecode: 00:07 – 00:19

Functions: VALUE

Visual action: Split screen showing two mock course snippets. Both list 'Profit Calculation'. Student points to both.

Dialogue/VO: Both programs list this. Without an official source linking the task to one degree, you are just guessing.

Camera direction: Mid-shot, pointing at the screen.

On-screen graphic: Insufficient Information

### Shot 3 — The Better Question

Timecode: 00:19 – 00:28

Functions: PAYOFF

Visual action: Student looks directly at the camera, holding the card.

Dialogue/VO: Don’t guess. Ask: What official source links this task to this specific degree?

Camera direction: Eye-level, stable shot.

On-screen graphic: What official source links this task to this specific degree?

HLNI proposal (not editorial approval):

```json
[
  {
    "insight": "One unlabeled example does not prove which category or programme contains it.",
    "audienceGap": "Students assume that a specific business task (like accounting or marketing) identifies the degree program.",
    "viewerChange": "Realizes that tasks exist in both degrees and cannot be used to classify a program without an official source.",
    "supportType": "method",
    "support": "This is a reasoning limit: absent information cannot establish an exclusive classification.",
    "references": [],
    "shotNumbers": [
      1,
      2
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The story demonstrates that by identifying the missing link, the student stops guessing and starts asking for evidence."
  }
]
```

## trust-quality-failures — attempt 1

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "fidelity: In shot 1, the student holds brochures for B.Com vs BBA, but the actual task concept is about auditing an assessment, not comparing degrees. Revision: Replace brochures with a single sample syllabus or course description page to maintain focus on the assessment audit method rather than a degree comparison. insight: The dialogue in shot 2 lists 'Work: Report, Grade: Logic?, Feedback: ?' but does not explain that the student is meant to search for these in course documents. Revision: Add a brief visual or audio cue indicating that the student is extracting these categories from an actual (hypothetical) course document to demonstrate the audit process.",
  "repairInstruction": "fidelity: In shot 1, the student holds brochures for B.Com vs BBA, but the actual task concept is about auditing an assessment, not comparing degrees. Revision: Replace brochures with a single sample syllabus or course description page to maintain focus on the assessment audit method rather than a degree comparison.\ninsight: The dialogue in shot 2 lists 'Work: Report, Grade: Logic?, Feedback: ?' but does not explain that the student is meant to search for these in course documents. Revision: Add a brief visual or audio cue indicating that the student is extracting these categories from an actual (hypothetical) course document to demonstrate the audit process."
}
```

### Shot 1 — The Confusion

Timecode: 00:00 – 00:08

Functions: HOOK, PROBLEM

Visual action: Student holding two different course brochures looking frustrated.

Dialogue/VO: Choosing between B.Com and BBA based on subject lists is a mistake. You need to look at how you are actually assessed.

Camera direction: Close-up, serious and analytical tone.

On-screen graphic: B.Com vs BBA?

### Shot 2 — The Audit Method

Timecode: 00:08 – 00:18

Functions: VALUE

Visual action: Student writing on a three-column worksheet. Zoom in on the text.

Dialogue/VO: Try this audit. Break down a sample task: Work: Report, Grade: Logic?, Feedback: ?.

Camera direction: Over-the-shoulder shot focusing on the pen on paper.

On-screen graphic: Example: Work: Report | Grade: Logic? | Feedback: ?

### Shot 3 — The Concrete Question

Timecode: 00:18 – 00:28

Functions: PAYOFF, CTA

Visual action: Student pointing at the empty Feedback column with a questioning look.

Dialogue/VO: If the answer is unknown, ask: What specific feedback do students receive on their case reports? Use this to guide your choice.

Camera direction: Direct to camera, helpful and encouraging.

On-screen graphic: What specific feedback do students receive on their case reports?

HLNI proposal (not editorial approval):

```json
[
  {
    "insight": "A task label does not reveal how you are assessed or the quality of feedback provided.",
    "audienceGap": "Students assume degree choice is dictated by subject lists.",
    "viewerChange": "Shifts focus to evaluating assessment criteria and feedback mechanisms.",
    "supportType": "method",
    "support": "Separating output, criteria, and feedback prevents assuming degree quality based on subject titles alone.",
    "references": [],
    "shotNumbers": [
      2,
      3
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The method turns vague uncertainty into a precise, actionable question for admissions."
  }
]
```

## trust-quality-failures — attempt 2

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "payoff: In the final shot, the student advises using the audit to 'compare' B.Com and BBA, but the worksheet example remains limited to a single task (Business Case) without demonstrating how to map two different programs to the same audit framework. Revision: Show the student briefly placing two worksheets side-by-side or referencing two columns to visually demonstrate the comparison process mentioned in the dialogue. fidelity: The dialogue in shot 1 mentions comparing 'B.Com or BBA', but the onscreen worksheet only shows a generic 'Business Case' task, failing to explicitly link the comparison subjects to the audit method. Revision: Label the top of the worksheet with 'B.Com' or 'BBA' to ensure the viewer understands the method applies to these specific comparison subjects.",
  "repairInstruction": "payoff: In the final shot, the student advises using the audit to 'compare' B.Com and BBA, but the worksheet example remains limited to a single task (Business Case) without demonstrating how to map two different programs to the same audit framework. Revision: Show the student briefly placing two worksheets side-by-side or referencing two columns to visually demonstrate the comparison process mentioned in the dialogue.\nfidelity: The dialogue in shot 1 mentions comparing 'B.Com or BBA', but the onscreen worksheet only shows a generic 'Business Case' task, failing to explicitly link the comparison subjects to the audit method. Revision: Label the top of the worksheet with 'B.Com' or 'BBA' to ensure the viewer understands the method applies to these specific comparison subjects."
}
```

### Shot 1 — The Syllabus Scan

Timecode: 00:00 – 00:07

Functions: HOOK, PROBLEM

Visual action: Student examining a single course description page, highlighting a specific task.

Dialogue/VO: Choosing B.Com or BBA by subject lists alone is misleading. Audit the assessment instead.

Camera direction: Close-up, focused and analytical.

On-screen graphic: B.Com vs BBA: Audit your tasks

### Shot 2 — The Audit Method

Timecode: 00:07 – 00:19

Functions: VALUE

Visual action: Student filling a three-column table while referencing the course document.

Dialogue/VO: Look at the task. Identify the work, the criteria, and the feedback source. If it is blank, you have found your gap.

Camera direction: Over-the-shoulder, clear focus on the worksheet.

On-screen graphic: Example: Work: Report | Grade: Logic? | Feedback: ?

### Shot 3 — The Concrete Question

Timecode: 00:19 – 00:28

Functions: PAYOFF, CTA

Visual action: Student looking directly at the camera, holding the completed audit.

Dialogue/VO: Don't guess. Ask: What specific feedback do students receive on their case reports? Use this to compare.

Camera direction: Direct, calm, and practical.

On-screen graphic: What specific feedback do students receive on their case reports?

HLNI proposal (not editorial approval):

```json
[
  {
    "insight": "A task label does not reveal how you are assessed or the quality of feedback provided.",
    "audienceGap": "Students assume degree choice is dictated by subject lists.",
    "viewerChange": "Shifts focus from degree labels to evaluating specific assessment and feedback mechanisms.",
    "supportType": "method",
    "support": "Separating output, criteria, and feedback prevents assuming degree quality based on subject titles alone.",
    "references": [],
    "shotNumbers": [
      1,
      2
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The method turns vague uncertainty into a precise, actionable question for admissions."
  }
]
```

## trust-quality-failures — attempt 3

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "fidelity: In the second scene, the worksheet columns are not explicitly labeled as 'Product', 'Assessment Criteria', and 'Feedback' as required by the concept. Revision: Include clear column headers in the worksheet graphic to ensure the three distinct categories of the audit method are visually legible to the viewer. insight: The dialogue suggests tracking these elements for 'each' (B.Com and BBA), but the visual only shows one table, leaving the comparison between the two degrees incomplete. Revision: Update the graphic in scene two to show two side-by-side tables, ensuring the viewer understands the comparison process between the two degree options.",
  "repairInstruction": "fidelity: In the second scene, the worksheet columns are not explicitly labeled as 'Product', 'Assessment Criteria', and 'Feedback' as required by the concept. Revision: Include clear column headers in the worksheet graphic to ensure the three distinct categories of the audit method are visually legible to the viewer.\ninsight: The dialogue suggests tracking these elements for 'each' (B.Com and BBA), but the visual only shows one table, leaving the comparison between the two degrees incomplete. Revision: Update the graphic in scene two to show two side-by-side tables, ensuring the viewer understands the comparison process between the two degree options."
}
```

### Shot 1 — The Syllabus Scan

Timecode: 00:00 – 00:07

Functions: HOOK, PROBLEM

Visual action: Student holds two papers labelled B.Com and BBA. They look confused, scanning both.

Dialogue/VO: Choosing B.Com or BBA by subject lists alone is misleading. Audit the assessment instead.

Camera direction: Close-up, focused and analytical.

On-screen graphic: B.Com vs BBA: Audit your tasks

### Shot 2 — The Audit Method

Timecode: 00:07 – 00:19

Functions: VALUE

Visual action: Student places two worksheets side-by-side. One is titled B.Com, one BBA. They write in a three-column table for a 'Business Case' task.

Dialogue/VO: For each, track the work, the grading criteria, and feedback source. If it is blank, you have found your gap.

Camera direction: Over-the-shoulder, clear focus on the worksheet comparison.

On-screen graphic: Example: Work: Report | Grade: Logic? | Feedback: ?

### Shot 3 — The Concrete Question

Timecode: 00:19 – 00:28

Functions: PAYOFF, CTA

Visual action: Student looking directly at the camera, holding the two completed audit sheets.

Dialogue/VO: Don't guess. Ask: What specific feedback do students receive on their case reports? Use this to compare.

Camera direction: Direct, calm, and practical.

On-screen graphic: What specific feedback do students receive on their case reports?

HLNI proposal (not editorial approval):

```json
[
  {
    "insight": "A task label does not reveal how you are assessed or the quality of feedback provided.",
    "audienceGap": "Students assume degree choice is dictated by subject lists.",
    "viewerChange": "Shifts focus from degree labels to evaluating specific assessment and feedback mechanisms.",
    "supportType": "method",
    "support": "Separating output, criteria, and feedback prevents assuming degree quality based on subject titles alone.",
    "references": [],
    "shotNumbers": [
      1,
      2
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The method turns vague uncertainty into a precise, actionable question for admissions."
  }
]
```
