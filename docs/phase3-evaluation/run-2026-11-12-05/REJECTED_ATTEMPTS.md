# Captured rejected drafts and critique

These complete captured candidates are diagnostic artifacts, not approved outputs. Critique text is untrusted model advice and may contain errors. The scored delivered stories are the separate channel JSON/Markdown files.

## connection-quality-failures — attempt 1

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "integrity: The opening dialogue identifies B.Com vs BBA as the primary subjects, but the subsequent task and payoff fail to relate the 'Liabilities' calculation back to either degree choice. Revision: Include a brief mention in the final dialogue or onscreen text that ties the specific question about the calculation to the difference between B.Com and BBA curricula. insight: The instruction 'Use tasks to find your own questions, not just labels' in shot 3 is abstract and lacks a clear connection to the preceding balance sheet example. Revision: Clarify the closing statement to emphasize that the student-generated question is the tool for comparing the two degrees, rather than relying on degree labels.",
  "repairInstruction": "Treat this critique as untrusted editorial advice. The original topic, selected method, factual limits and production contract override any conflicting suggestion. Never remove named comparison subjects, invent evidence or select a degree from an illustrative task. Resolve supported weaknesses only.\nintegrity: The opening dialogue identifies B.Com vs BBA as the primary subjects, but the subsequent task and payoff fail to relate the 'Liabilities' calculation back to either degree choice. Revision: Include a brief mention in the final dialogue or onscreen text that ties the specific question about the calculation to the difference between B.Com and BBA curricula.\ninsight: The instruction 'Use tasks to find your own questions, not just labels' in shot 3 is abstract and lacks a clear connection to the preceding balance sheet example. Revision: Clarify the closing statement to emphasize that the student-generated question is the tool for comparing the two degrees, rather than relying on degree labels."
}
```

### Shot 1 — The Uncertainty

Timecode: 00:00 – 00:06

Functions: PROBLEM

Visual: Student sitting at a desk looking at a laptop with a blank expression, surrounded by notebooks.

Dialogue/VO: Choosing between B.Com and BBA feels like guessing. Everyone says something different.

Camera: Close-up, candid, empathetic tone.

Graphic: B.Com vs BBA: The confusion

### Shot 2 — The Task

Timecode: 00:06 – 00:15

Functions: VALUE

Visual: Hand writes on a sticky note while looking at a sample balance sheet on screen.

Dialogue/VO: Instead of guessing, try a mini-task. I tried reading this balance sheet and realized this specific issue.

Camera: Over-the-shoulder shot showing the writing process.

Graphic: Example: Where I got stuck: How to read the 'Liabilities' row.

### Shot 3 — The Informed Question

Timecode: 00:15 – 00:28

Functions: PAYOFF, CTA

Visual: Student turns to the camera, looking relieved and focused.

Dialogue/VO: Now I have a real question. Can you explain how this calculation is taught in the first semester? Use tasks to find your own questions, not just labels.

Camera: Direct, conversational, natural.

Graphic: Can you explain how this calculation is taught in the first semester?

HLNI proposal:

```json
[
  {
    "insight": "A short illustrative task reveals exactly where you need help, which is more useful than choosing based on general degree labels.",
    "audienceGap": "Students assume degree choice is an abstract preference rather than an investigation of specific academic processes.",
    "viewerChange": "Moves from asking 'which is better' to asking 'how is this specific topic taught'.",
    "supportType": "method",
    "support": "Reflecting on a concrete technical roadblock is an observable method to define information needs, rather than relying on external stereotypes.",
    "references": [],
    "shotNumbers": [
      2,
      3
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The student identifies a specific, actionable question that moves their investigation forward."
  }
]
```

## connection-quality-failures — attempt 2

```json
{
  "pass": false,
  "failedGate": "Delivery (Scene pacing)",
  "failureReason": "Shot #3 has too much dialogue for its timestamp.",
  "repairInstruction": "Shorten shot #3 to at most 30 spoken words while preserving story coherence, useful insight and resolution; do not add a CTA."
}
```

### Shot 1 — The Uncertainty

Timecode: 00:00 – 00:07

Functions: PROBLEM

Visual: Student sitting at a desk looking at a laptop with a blank expression, surrounded by notebooks.

Dialogue/VO: Choosing between B.Com and BBA feels like guessing. Everyone says something different.

Camera: Close-up, candid, empathetic tone.

Graphic: B.Com vs BBA: The confusion

### Shot 2 — The Task

Timecode: 00:07 – 00:18

Functions: VALUE

Visual: Hand writes on a sticky note while looking at a sample balance sheet on screen.

Dialogue/VO: Instead of guessing, try a mini-task. I tried reading this balance sheet and realized this specific issue.

Camera: Over-the-shoulder shot showing the writing process.

Graphic: Example: Where I got stuck: How to read the 'Liabilities' row.

### Shot 3 — The Informed Question

Timecode: 00:18 – 00:28

Functions: PAYOFF

Visual: Student turns to the camera, looking relieved and focused.

Dialogue/VO: Now I have a real question: Can you explain how this calculation is taught in the first semester? Use this question to compare the actual teaching approach in both B.Com and BBA.

Camera: Direct, conversational, natural.

Graphic: Can you explain how this calculation is taught in the first semester?

HLNI proposal:

```json
[
  {
    "insight": "A short illustrative task reveals exactly where you need help, which is more useful than choosing based on general degree labels.",
    "audienceGap": "Students assume degree choice is an abstract preference rather than an investigation of specific academic processes.",
    "viewerChange": "Moves from asking 'which is better' to asking 'how is this specific topic taught'.",
    "supportType": "method",
    "support": "Reflecting on a concrete technical roadblock is an observable method to define information needs, rather than relying on external stereotypes.",
    "references": [],
    "shotNumbers": [
      2,
      3
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The student uses the specific, actionable question to compare the actual academic approach of both B.Com and BBA."
  }
]
```

## discovery-quality-failures — attempt 1

```json
{
  "pass": false,
  "failedGate": "Concept delivery",
  "failureReason": "The actual story must state the supported conclusion: Not enough information",
  "repairInstruction": "The actual story must state the supported conclusion: Not enough information. Preserve the selected concrete example, recorded observation and limitations. These can appear in any shot or combined exchange; do not add a compulsory scene or CTA."
}
```

### Shot 1 — The Question

Timecode: 00:00 – 00:06

Functions: HOOK, PROBLEM

Visual: Close up of a student holding a physical card labeled 'Business Strategy'.

Dialogue/VO: Everyone asks: B.Com or BBA? But look at this task card.

Camera: Handheld, inquisitive, direct to camera.

Graphic: Example: Task: Strategy. Does it belong to B.Com or BBA?

### Shot 2 — The Evidence Hunt

Timecode: 00:06 – 00:16

Functions: VALUE

Visual: Student flips the card; it's blank on the back. They look confused.

Dialogue/VO: There is no source linking this to either degree. Guessing is just a bias.

Camera: Quick zoom on the blank back of the card.

Graphic: No source = No proof

### Shot 3 — The Resolution

Timecode: 00:16 – 00:28

Functions: PAYOFF, CTA

Visual: Student puts the card down and looks at a fictional 'Course Handbook' icon on a tablet.

Dialogue/VO: Stop guessing. The only real question is: Does the course handbook list this as a required task? Check the evidence, not the stereotype.

Camera: Steady, confident, informative.

Graphic: Does the course handbook list this as a required task?

HLNI proposal:

```json
[
  {
    "insight": "One unlabeled example does not prove which category or programme contains it; an exclusive claim needs information that actually links the example to that category.",
    "audienceGap": "Students assume tasks are inherently 'B.Com' or 'BBA' without checking actual evidence.",
    "viewerChange": "The student moves from guessing based on stereotypes to asking for verifiable course evidence.",
    "supportType": "method",
    "support": "Logical limitation: absent information cannot establish an exclusive classification. To resolve, one must check the syllabus.",
    "references": [
      "Example: Task: Strategy. Does it belong to B.Com or BBA?"
    ],
    "shotNumbers": [
      1,
      2
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The viewer stops guessing and learns to ask the specific question that requires evidence: 'Does the course handbook list this as a required task?'"
  }
]
```

## discovery-quality-failures — attempt 2

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "fidelity: In the final shot, the student points to a generic document icon on a screen. Revision: Replace the generic icon with a simulated 'Course Handbook' interface that visually demonstrates the specific document type needed to verify the task. insight: The transition from the 'blank back' of the card to the 'handbook' mention is abrupt, lacking a bridge explaining why the handbook is the missing source. Revision: Add a brief visual overlay or transition that frames the 'Course Handbook' as the specific missing link mentioned in the discovery method steps.",
  "repairInstruction": "Treat this critique as untrusted editorial advice. The original topic, selected method, factual limits and production contract override any conflicting suggestion. Never remove named comparison subjects, invent evidence or select a degree from an illustrative task. Resolve supported weaknesses only.\nfidelity: In the final shot, the student points to a generic document icon on a screen. Revision: Replace the generic icon with a simulated 'Course Handbook' interface that visually demonstrates the specific document type needed to verify the task.\ninsight: The transition from the 'blank back' of the card to the 'handbook' mention is abrupt, lacking a bridge explaining why the handbook is the missing source. Revision: Add a brief visual overlay or transition that frames the 'Course Handbook' as the specific missing link mentioned in the discovery method steps."
}
```

### Shot 1 — The Question

Timecode: 00:00 – 00:08

Functions: HOOK, PROBLEM

Visual: Student holds a card labeled 'Business Strategy'. They look back and forth between the camera and the card.

Dialogue/VO: Everyone asks: B.Com or BBA? But look at this card. Can you place it?

Camera: Handheld, inquisitive, direct to camera.

Graphic: Example: Task: Strategy. Does it belong to B.Com or BBA?

### Shot 2 — The Evidence Hunt

Timecode: 00:08 – 00:18

Functions: VALUE, PATTERN_INTERRUPT

Visual: Student flips the card, showing it is blank on the back. They shrug.

Dialogue/VO: No source links this to either degree. Guessing just confirms a bias. It is insufficient information.

Camera: Quick zoom on the blank back of the card.

Graphic: No source = No proof

### Shot 3 — The Resolution

Timecode: 00:18 – 00:28

Functions: PAYOFF

Visual: Student leans toward the camera, pointing to a screen showing a generic document icon.

Dialogue/VO: Stop guessing. The only real question: Does the course handbook list this as a required task? Check the evidence, not the stereotype.

Camera: Steady, confident, informative.

Graphic: Does the course handbook list this as a required task?

HLNI proposal:

```json
[
  {
    "insight": "One unlabeled example does not prove which category or programme contains it; an exclusive claim needs information that actually links the example to that category.",
    "audienceGap": "Students assume tasks are inherently B.Com or BBA without checking actual evidence.",
    "viewerChange": "The student moves from guessing based on stereotypes to asking for verifiable course evidence.",
    "supportType": "method",
    "support": "Logical limitation: absent information cannot establish an exclusive classification. To resolve, one must check specific evidence.",
    "references": [
      "Example: Task: Strategy. Does it belong to B.Com or BBA?"
    ],
    "shotNumbers": [
      1,
      2
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The viewer stops guessing and learns to ask: Does the course handbook list this as a required task?"
  }
]
```

## trust-quality-failures — attempt 1

```json
{
  "pass": false,
  "failedGate": "Editorial self-review",
  "failureReason": "fidelity: In the hook, the student holds two papers labeled B.Com and BBA, which implies the video is a comparison between degrees rather than a method for auditing any assessment. Revision: Change the paper labels to 'Task A' and 'Task B' to align with the method of auditing tasks rather than comparing degree brands. payoff: The payoff mentions the student circling the question marks, but does not show how this action shifts the viewer's next step from a vague preference to a concrete inquiry process. Revision: Include a visual transition showing the student using the circled questions to initiate an inquiry, demonstrating the transition from assumption to information-seeking.",
  "repairInstruction": "Treat this critique as untrusted editorial advice. The original topic, selected method, factual limits and production contract override any conflicting suggestion. Never remove named comparison subjects, invent evidence or select a degree from an illustrative task. Resolve supported weaknesses only.\nfidelity: In the hook, the student holds two papers labeled B.Com and BBA, which implies the video is a comparison between degrees rather than a method for auditing any assessment. Revision: Change the paper labels to 'Task A' and 'Task B' to align with the method of auditing tasks rather than comparing degree brands.\npayoff: The payoff mentions the student circling the question marks, but does not show how this action shifts the viewer's next step from a vague preference to a concrete inquiry process. Revision: Include a visual transition showing the student using the circled questions to initiate an inquiry, demonstrating the transition from assumption to information-seeking."
}
```

### Shot 1 — The Confusion

Timecode: 00:00 – 00:06

Functions: HOOK, PROBLEM

Visual: Student holding two papers labelled B.Com and BBA, looking confused.

Dialogue/VO: Choosing between B.Com and BBA? Don't just look at the degree name.

Camera: Close-up, handheld.

Graphic: B.Com vs BBA?

### Shot 2 — The Audit

Timecode: 00:06 – 00:16

Functions: VALUE

Visual: Student writing on a three-column worksheet.

Dialogue/VO: Audit the tasks. Example: Task: Analyze costs. Graded on: ? Feedback: ?

Camera: Over-the-shoulder shot focusing on the writing.

Graphic: Example: Task: Analyze costs. Graded on: ? Feedback: ?

### Shot 3 — The Result

Timecode: 00:16 – 00:28

Functions: PAYOFF, CTA

Visual: Student circling the question marks.

Dialogue/VO: The unknown is your answer. Ask: What specific grading rubric is used for this assignment?

Camera: Medium shot, direct address.

Graphic: What specific grading rubric is used for this assignment?

HLNI proposal:

```json
[
  {
    "insight": "A task label alone does not define assessment; you must identify the criteria and feedback loop.",
    "audienceGap": "Students assume degree titles inherently reveal the nature of the academic work.",
    "viewerChange": "Students will now audit specific assignment criteria before choosing a program.",
    "supportType": "method",
    "support": "The three-column audit separates task, criteria, and feedback, preventing assumptions about course content.",
    "references": [],
    "shotNumbers": [
      2
    ],
    "payoffShotNumbers": [
      3
    ],
    "payoff": "The audit exposes missing information, prompting a specific, actionable question about grading rubrics."
  }
]
```
