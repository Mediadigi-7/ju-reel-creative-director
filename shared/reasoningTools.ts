// Editorial reasoning tools, not scripts, degree facts, psychological tests or
// channel templates. They supply bounded HLNI foundations while the model invents
// the human situation, concept, visual device, treatment and production shots.
export const REASONING_TOOLS = {
  assessment_questions:{
    insight:'A task label alone does not tell you what you must produce, what will be assessed, or what feedback you receive. Ask these as separate questions.',
    steps:['Write the expected work product.','Ask what criterion is used to assess it.','Ask what feedback is available; mark unknown answers as questions.'],
    rule:'Use the unanswered cells to ask a precise question about the actual course or task before deciding.',
    proof:'A three-column question sheet turns one vague preference into a concrete unanswered question.',
    support:'The method separates three different pieces of information; it does not assume particular course content.',
    limit:'This is a question-forming aid, not a degree ranking, aptitude test or prediction of success.',
  },
  task_question_journal:{
    insight:'A short illustrative activity can reveal where you need help or what you want to investigate next; it cannot determine which degree suits you.',
    steps:['Try or inspect a clearly illustrative task.','Record one point where you needed help and one question you want to investigate.','Turn the observation into a question for a real course brief or course team.'],
    rule:'Use the recorded observation to choose the next question, not to select a degree from one activity.',
    proof:'A person records a specific sticking point and asks a different, more useful question afterward.',
    support:'The observation belongs to this activity and participant; it supports a next question rather than a general prediction.',
    limit:'A brief exercise does not measure aptitude, learning style, long-term interest or academic performance.',
  },
  insufficient_information:{
    insight:'One unlabeled example does not prove which category or programme contains it. An exclusive claim needs information that actually links the example to that category.',
    steps:['Present one example without a source linking it to a category.','Separate a plausible guess from what the available information proves.','Identify the exact missing source or information needed to decide.'],
    rule:'Answer not enough information when the necessary link is absent, then name the evidence that would resolve it.',
    proof:'A forced-choice guess is replaced by a justified third answer and a precise request for missing evidence.',
    support:'This is a reasoning limit: absent information cannot establish an exclusive classification.',
    limit:'Do not assert that the example belongs to both degrees, or to either one, without actual curriculum evidence.',
  },
  constraint_check:{
    insight:'An appealing option and an available option are different questions. Unknown requirements should be recorded as checks rather than assumed to be satisfied.',
    steps:['Name the option you prefer.','List the actual requirements you need to check and mark unknowns.','Verify an unknown before treating the option as available.'],
    rule:'Use an unknown requirement as the next verification task; preference alone is not confirmation.',
    proof:'A preference card moves to a provisional list until one concrete requirement is checked.',
    support:'The method distinguishes a desire from confirmation; it asserts no particular institutional rule.',
    limit:'Never invent eligibility rules, admission availability or prerequisites.',
  },
  aggregate_counterexample:{
    insight:'The same total can result from different component values; an aggregate alone cannot tell you the underlying mix.',
    steps:['Show two clearly illustrative component lists with the same total.','Reveal their different components.','Ask for the breakdown before drawing a conclusion from the total.'],
    rule:'Use the breakdown to ask what differs; do not infer identical experiences from equal totals.',
    proof:'An explicitly illustrative arithmetic counterexample makes the hidden difference visible.',
    support:'The claim follows from the displayed arithmetic, not an invented university metric.',
    limit:'Keep figures clearly illustrative and do not assign them to actual programmes, credits or outcomes.',
  },
} as const;
export type ReasoningToolId=keyof typeof REASONING_TOOLS;
