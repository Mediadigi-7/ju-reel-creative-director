import type { ContentChannel } from '../channels.js';
import type { CreativeDirection } from '../types.js';
export const OFFLINE_CATALOGUE_VERSION = '1.0';
export const OFFLINE_IDEAS = [
  { id: 'next', title: 'I finished +2... now what?', question: 'How can I narrow my next study choice?', takeaway: 'Try a small subject task, compare syllabuses, and check eligibility.' },
  { id: 'mistakes', title: '3 mistakes students make after +2', question: 'Which three course-selection mistakes can I avoid?', takeaway: 'Do not copy a friend, choose by a label, or skip eligibility and cost checks.' },
  { id: 'engineering', title: 'Engineering is not for everyone', question: 'How do I explore whether engineering fits me?', takeaway: 'Explore the work behind engineering before deciding; other routes deserve comparison.' },
  { id: 'commerce', title: 'What should I study after Commerce?', question: 'How do I compare study directions after Commerce?', takeaway: 'Compare accounting, management, and economics through their subjects and work.' },
  { id: 'ai', title: 'AI will change these careers', question: 'How might AI change tasks in different careers?', takeaway: 'Look at tasks in accounting, design, and software; tools still need human checking.' },
  { id: 'college', title: 'How do I choose the right college?', question: 'What should I check when comparing colleges?', takeaway: 'Compare the same course, total cost, practical access, and recognition from official sources.' },
] as const;
export type OfflineIdeaId = typeof OFFLINE_IDEAS[number]['id'];
export type OfflineScriptId = `${OfflineIdeaId}-${CreativeDirection}`;
export type SceneCopy = readonly [dialogue: string, onscreenText: string, visual: string];
export interface OfflineScript {
  id: OfflineScriptId;
  angle: string;
  props: string[];
  cast: string;
  sound: string;
  scenes: readonly SceneCopy[];
}
export const OFFLINE_SCRIPTS: OfflineScript[] = [
  { id:'next-Informative', angle:'Replace a giant life decision with one small test.', props:['Notebook','Two sample syllabuses','Phone'], cast:'One student', sound:'Quiet room tone; pencil tap at the attention reset.', scenes:[
    ["Results are out. My course choice isn't.",'RESULTS ≠ A PLAN','Student puts the results screen beside an empty notebook.'],
    ["Every relative suggests a different degree. None asks what I enjoy doing.",'TOO MANY ANSWERS','Different course names arrive as message overlays; student lowers the phone.'],
    ["What could I try this week?",'ONE SMALL TEST','Student turns the phone face down and opens the notebook.'],
    ["Try a small task in two subjects. Compare the syllabuses. Check eligibility.",'TRY · COMPARE · CHECK','Student attempts a basic spreadsheet task and a short writing task; places the syllabuses alongside.'],
    ["I don't need my whole future today. Just a shortlist with reasons.",'A SHORTLIST WITH REASONS','Student circles two subjects and writes one reason beside each.'],
    ["Save this for your course shortlist.",'SAVE FOR YOUR SHORTLIST','Student closes the notebook; small Joy University logo on the end card.'],
  ] },
  { id:'next-Funny', angle:'A student chairs a meeting of conflicting family advice.', props:['Three chairs','Paper name cards','Notebook'], cast:'One student playing three relatives through simple position changes', sound:'Dry room tone; chair squeak on each character change; silence at the reset.', scenes:[
    ["Family meeting. Agenda: my entire future.",'ONE STUDENT. MANY ADVISERS.','Student solemnly arranges empty chairs around a notebook.'],
    ["Uncle says engineering. Aunt says business. Nobody has asked me yet.",'EVERYONE HAS A PLAN','Student swaps seats and performs each relative with a different posture.'],
    ["Could the student get a turn?",'THE STUDENT SPEAKS','Student raises a hand from a tiny chair; cut to an empty room.'],
    ["I tried a sample lesson. These two subjects held my attention.",'TWO SUBJECTS TO EXPLORE','Student slides two marked lesson pages onto the meeting table.'],
    ["Meeting adjourned. I finally made the shortlist.",'MY SHORTLIST','Student removes the relatives’ name cards and places their own in the centre.'],
    ["Share this with your family adviser.",'SHARE WITH YOUR FAMILY ADVISER','Student offers the empty chair to camera; restrained brand end card.'],
  ] },
  { id:'next-Trendy', angle:'A two-task reveal turns a blank page into a shortlist.', props:['Two task cards','Timer','Notebook'], cast:'One student', sound:'Light percussive beat; stop the beat before the reveal.', scenes:[
    ["Two subjects. Two tiny tasks. Which one would I keep doing?",'THE TWO-TASK TEST','Top-down view of two face-down task cards.'],
    ["Degree names alone aren't helping me choose.",'BEYOND THE DEGREE NAME','Student sweeps a stack of course-name cards aside.'],
    ["Names off. Tasks up.",'REVEAL THE TASKS','Match cut flips both cards to reveal a simple data task and a writing task.'],
    ["I try both. Then check the subjects and entry requirements behind each.",'TRY THE WORK · CHECK THE COURSE','Quick sequence of working, checking syllabuses, and noting official requirements.'],
    ["This one makes me want another attempt. That's worth exploring.",'CURIOSITY → A SHORTLIST','Student picks one task back up and writes it on a shortlist.'],
    ["Save the two-task test.",'SAVE THE TWO-TASK TEST','The two cards stack beneath a simple save end card.'],
  ] },
  { id:'mistakes-Informative', angle:'Three ordinary shortcuts that weaken a course decision.', props:['Course notes','Phone','Fee checklist'], cast:'One student', sound:'Three soft paper taps; silence when the checklist is revealed.', scenes:[
    ["My friend picked it. Is that my only reason?",'MISTAKE 1: COPYING A FRIEND','Student starts copying a friend’s course name, then pauses.'],
    ["Second mistake: choosing a degree because its name sounds impressive.",'MISTAKE 2: CHOOSING A LABEL','A glossy course-name card covers an unread syllabus.'],
    ["Third: skipping the checks.",'MISTAKE 3: SKIPPING DETAILS','Student uncovers a blank eligibility and cost checklist.'],
    ["Read the subjects. Check eligibility and total costs from official sources.",'SUBJECTS · ELIGIBILITY · TOTAL COST','Student highlights subjects and fills the checklist using official documents.'],
    ["Now my choice has reasons beyond a friend and a fancy name.",'CHOOSE WITH REASONS','Three crossed-out shortcuts sit beside the completed checklist.'],
    ["Save this before choosing a course.",'SAVE BEFORE CHOOSING','Student places the checklist on the course folder.'],
  ] },
  { id:'mistakes-Funny', angle:'A detective discovers that the evidence for a degree choice is missing.', props:['Toy magnifier','Three blank evidence cards','Course booklet'], cast:'One student playing applicant and detective', sound:'Playful detective rhythm; abrupt silence on the empty evidence card.', scenes:[
    ["Why this degree? My friend is going.",'CASE 1: THE FRIEND','Student points a magnifier at an application with a friend’s name circled.'],
    ["Why this one? The name sounds expensive.",'CASE 2: THE FANCY NAME','Applicant proudly presents an ornate title card with no subjects listed.'],
    ["And the eligibility? Awkward silence.",'CASE 3: THE MISSING CHECK','Detective flips an eligibility card; it is blank.'],
    ["Actual evidence: subjects, entry requirements, and the full cost.",'THE EVIDENCE THAT MATTERS','The magnifier moves from decorative lettering to the actual course documents.'],
    ["Case closed. My friend is not an admission criterion.",'A FRIEND IS NOT A CRITERION','Student stamps a personal checklist, leaving the friend’s choice untouched.'],
    ["Share this with your application buddy.",'SHARE WITH YOUR APPLICATION BUDDY','Detective slides the checklist toward camera.'],
  ] },
  { id:'mistakes-Trendy', angle:'Three application shortcuts are physically replaced by three checks.', props:['Three red cards','Three check cards','Application folder'], cast:'One student', sound:'Three taps on the beat; paper flip marks the reset.', scenes:[
    ["Three reasons this application needs a pause.",'THREE CHOICE TRAPS','Student freezes with a pen above an application; three red cards appear.'],
    ["Friend chose it. Fancy title. Details unread.",'FRIEND · LABEL · NO CHECKS','Snap cuts reveal the three shortcuts one at a time.'],
    ["Flip the cards.",'TURN REASONS INTO CHECKS','Student flips the red cards over in one overhead shot.'],
    ["Subjects I want to learn. Eligibility I meet. Costs I've checked.",'SUBJECTS · ELIGIBILITY · COSTS','The reverse sides show three checks, completed from course documents.'],
    ["Same application. Better reasons for filling it.",'BETTER REASONS','Pen returns to the page beside the checked cards.'],
    ["Save these three checks.",'SAVE THE THREE CHECKS','End on the three cards with one save instruction.'],
  ] },
  { id:'engineering-Informative', angle:'Evaluate engineering through its work rather than pressure or prestige.', props:['Simple model','Notebook','Two sample syllabuses'], cast:'One student', sound:'Natural table sounds; a model piece clicks into place at the reset.', scenes:[
    ["Good at maths. Does that mean engineering?",'MATHS ≠ AN AUTOMATIC CHOICE','Student holds a maths notebook beside an engineering course page.'],
    ["Marks tell one part. They don't tell me which work I'll enjoy.",'WHAT ABOUT THE WORK?','Student looks from the marks sheet to a blank interests column.'],
    ["What happens when I actually try it?",'TRY A SMALL PROBLEM','Close-up of student adjusting a simple paper bridge.'],
    ["I test, change, and test again. Then compare engineering subjects with another course.",'BUILD · TEST · COMPARE','Bridge test is followed by two sample syllabuses laid side by side.'],
    ["If the work interests me, I explore further. If not, other paths matter.",'FIT BEFORE PRESSURE','Student writes what they enjoyed and what they did not.'],
    ["Save this engineering fit check.",'SAVE THE FIT CHECK','Notebook closes on the personal observations, not the marks sheet.'],
  ] },
  { id:'engineering-Funny', angle:'A student discovers that exam confidence and enjoying engineering are different questions.', props:['Maths notebook','Paper bridge','Small eraser'], cast:'One student and one friend', sound:'Small comic drum hit when the paper bridge collapses; no laugh track.', scenes:[
    ["Good maths marks. Family has already called me engineer.",'PROMOTED BEFORE ADMISSION','Student receives a homemade ENGINEER badge from a friend.'],
    ["My paper bridge has other opinions.",'THE BRIDGE DISAGREES','A tiny eraser bends the paper bridge; student looks at the badge.'],
    ["Wait. I want another try.",'TRY AGAIN?','Student catches the falling eraser and reaches for another sheet.'],
    ["I change the fold, test again, then look at the actual course subjects.",'TINKER · TEST · READ','Friend watches the second bridge hold while the student opens a syllabus.'],
    ["The badge didn't answer it. Enjoying the problem gave me a clue.",'INTEREST IS A CLUE','Student puts the badge aside and keeps the bridge.'],
    ["Share this with the family engineer.",'SHARE WITH THE FAMILY ENGINEER','Friend gently places the badge beside the finished bridge.'],
  ] },
  { id:'engineering-Trendy', angle:'A repair challenge reveals curiosity rather than declaring someone suited or unsuited.', props:['Paper bridge','Small eraser','Two course cards'], cast:'One student', sound:'Short building rhythm; beat drops out for the second attempt.', scenes:[
    ["This bridge bends. Would you try fixing it?",'THE SECOND-ATTEMPT TEST','An eraser bends a paper bridge in a tight close-up.'],
    ["Engineering is more than picking a prestigious degree name.",'BEYOND THE TITLE','A degree-name card slides away to reveal the failed model.'],
    ["The interesting bit: attempt two.",'ATTEMPT TWO','Jump cut to hands making a different fold.'],
    ["Test a change. Notice your curiosity. Compare the syllabus with another route.",'CHANGE · NOTICE · COMPARE','Split screen shows the revised bridge and two course syllabuses.'],
    ["Enjoyed the process? Explore it. One model doesn't decide your future.",'A CLUE, NOT A VERDICT','Student writes a question mark beside the course name instead of a final tick.'],
    ["Save this before choosing engineering.",'SAVE BEFORE CHOOSING','End card sits next to both course options.'],
  ] },
  { id:'commerce-Informative', angle:'Compare what students learn rather than treating Commerce as one destination.', props:['Three subject cards','Calculator','Notebook'], cast:'One student', sound:'Steady light rhythm; three clear card taps.', scenes:[
    ["Commerce is my stream. What's my next subject?",'COMMERCE → WHICH DIRECTION?','Student writes Commerce at the top of a page with three empty branches.'],
    ["Everyone names a degree. I need to know what's inside it.",'LOOK INSIDE THE DEGREE','Student turns degree-name cards over to reveal subject lists.'],
    ["Start with the work.",'WHAT WOULD YOU STUDY?','Close-up of a calculator, a team plan, and a simple price chart.'],
    ["Accounting examines records. Management examines organisations. Economics examines choices and markets.",'ACCOUNTING · MANAGEMENT · ECONOMICS','Student matches the three objects to three subject cards.'],
    ["Now I can compare syllabuses and eligibility around what interests me.",'MATCH INTEREST TO SUBJECTS','Student circles a subject, then opens the relevant course documents.'],
    ["Save this Commerce starting point.",'SAVE YOUR COMMERCE STARTING POINT','Three branches remain visible on a simple brand end card.'],
  ] },
  { id:'commerce-Funny', angle:'Three friends interpret the same small shop through different subjects.', props:['Snack packet','Calculator','Price label','Notebook'], cast:'Three friends, or one actor in three positions', sound:'Natural snack-packet rustle; brief silence before the subject reveal.', scenes:[
    ["One snack shop. Three Commerce friends.",'SAME SHOP. DIFFERENT QUESTIONS.','Three friends gather around a snack packet on a table.'],
    ["One counts costs. One assigns jobs. One questions the price.",'COSTS? TEAM? PRICE?','Quick character cuts: calculator, task list, puzzled look at a price tag.'],
    ["We haven't even opened the packet.",'STILL NO SNACK','All three look at the unopened packet in silence.'],
    ["Accounting, management, economics. Different questions lead to different subjects.",'THREE SUBJECT DIRECTIONS','Cards reveal the subject behind each friend’s question.'],
    ["My subject choice needs more thought than my snack choice.",'SUBJECTS BEFORE DEGREE LABELS','Student places the packet aside and compares actual syllabuses.'],
    ["Share this with your Commerce group.",'SHARE WITH YOUR COMMERCE GROUP','Friends finally open the packet; simple share end card.'],
  ] },
  { id:'commerce-Trendy', angle:'Three objects reveal three subject directions after Commerce.', props:['Calculator','Team plan','Price chart','Three cards'], cast:'One student', sound:'Object taps on a beat; silence before all three cards flip.', scenes:[
    ["Calculator. Team plan. Price chart. Which catches your eye?",'PICK A QUESTION','Fast overhead cuts introduce the three objects.'],
    ["Choosing after Commerce is more than collecting degree names.",'DEGREE NAMES ARE NOT ENOUGH','Degree labels blur while the three objects stay sharp.'],
    ["Now reveal the subjects.",'REVEAL','Student flips a subject card beneath each object.'],
    ["Accounting: records. Management: organisations. Economics: choices and markets.",'RECORDS · ORGANISATIONS · MARKETS','Three short demonstrations show a ledger, a task board, and a price comparison.'],
    ["Your favourite question is a starting point. Check the syllabus and eligibility next.",'INTEREST → COURSE RESEARCH','Student links one question to a course document, leaving the others visible.'],
    ["Save this subject map.",'SAVE THE SUBJECT MAP','The three cards form a clean overhead end frame.'],
  ] },
  { id:'ai-Informative', angle:'Explain changed tasks in three careers without predicting job losses.', props:['Fictional spreadsheet','Design sketches','Code example'], cast:'One student', sound:'Quiet keyboard sounds; brief mute at the reset.', scenes:[
    ["AI changed the task. Did it replace the whole career?",'TASK ≠ WHOLE CAREER','Student crosses out one task on a long career task list, leaving the rest.'],
    ["A job title hides lots of different decisions.",'LOOK AT THE TASKS','Three task lists appear for accounting, design, and software.'],
    ["Here's the smaller question: which task?",'WHICH TASK CHANGES?','Camera moves from the job title to one highlighted task.'],
    ["AI can suggest code, draft designs, or flag unusual entries. People must check outputs.",'CODE · DESIGN · ACCOUNTING','Clearly labelled fictional examples show an incorrect suggestion being reviewed.'],
    ["Learning the tool helps. Understanding the subject helps you catch mistakes.",'TOOLS + SUBJECT KNOWLEDGE','Student corrects the sample output with a written explanation.'],
    ["Save this task-first career check.",'SAVE THE TASK-FIRST CHECK','The career task list returns with both tool and checking tasks visible.'],
  ] },
  { id:'ai-Funny', angle:'An overconfident tool user discovers why domain knowledge still matters.', props:['Laptop','Fictional expense sheet','Large printed AI suggestion'], cast:'One student and one friend', sound:'One triumphant music sting, interrupted by a calculator tap.', scenes:[
    ["AI did my work. I have retired.",'RETIRED AFTER ONE PROMPT?','Student leans back dramatically after pressing Enter.'],
    ["Small issue. It counted the same expense twice.",'THE DOUBLE EXPENSE','Friend points to two identical entries on a fictional expense sheet.'],
    ["Retirement postponed.",'BACK TO THE DESK','Student slowly rolls the chair back toward the laptop.'],
    ["Accounts, design, code: useful drafts still need someone who understands the work.",'A DRAFT NEEDS A CHECK','Three clearly fictional examples show a duplicate, a wrong label, and a failed code test.'],
    ["New task: check the assistant before trusting it.",'CHECK BEFORE TRUSTING','Student marks a correction and removes the homemade retirement sign.'],
    ["Share this with your prompt expert.",'SHARE WITH YOUR PROMPT EXPERT','Friend slides the duplicate expense sheet toward camera.'],
  ] },
  { id:'ai-Trendy', angle:'A spot-the-error reveal demonstrates human checking across AI-assisted tasks.', props:['Three fictional output cards','Red pencil'], cast:'One student', sound:'Three quick beats; silence while the error is revealed.', scenes:[
    ["Three AI drafts. Can you spot the mistake?",'SPOT THE ERROR','Three cards show a code suggestion, a design draft, and an expense summary.'],
    ["They look finished. That doesn't make them correct.",'POLISHED ≠ CORRECT','Student stamps DRAFT over the tidy-looking cards.'],
    ["Pause on the expense sheet.",'LOOK AT THE ENTRIES','Fast zoom becomes a still frame on two identical sample entries.'],
    ["One expense appears twice. Accounting checks it; designers and developers check their drafts too.",'DIFFERENT CAREERS. HUMAN CHECKS.','Red pencil circles the duplicate; adjacent cards show a design review and code test.'],
    ["Tools change tasks. Subject knowledge tells you what to question.",'KNOW WHAT TO QUESTION','A tool icon moves beside, rather than over, each subject card.'],
    ["Save this before trusting an AI draft.",'SAVE THE DRAFT CHECK','The corrected sheet and DRAFT stamp form the end card.'],
  ] },
  { id:'college-Informative', angle:'Turn campus comparison into a small, evidence-based checklist.', props:['Two fictional brochures','Comparison sheet','Phone'], cast:'One student', sound:'Brochure page turns; pencil tap at the comparison reveal.', scenes:[
    ["Two college brochures. Both look perfect.",'TWO BROCHURES. NOW WHAT?','Student holds two unbranded fictional brochures with equally glossy covers.'],
    ["Nice photos don't answer my course questions.",'PHOTOS ARE NOT ANSWERS','Student turns over a scenic image to reveal unanswered questions.'],
    ["Compare the same things.",'A FAIR COMPARISON','A ruled comparison page replaces the brochure covers.'],
    ["Same course. Total costs. Practical access. Recognition checked through official sources.",'COURSE · COST · ACCESS · RECOGNITION','Student records the source for each answer; unavailable details receive question marks.'],
    ["Now I know what to ask on a visit, and what still needs proof.",'QUESTIONS WITH EVIDENCE','Student highlights unresolved questions rather than inventing answers.'],
    ["Save this college comparison list.",'SAVE THE COMPARISON LIST','Comparison sheet fills the frame with a restrained brand mark.'],
  ] },
  { id:'college-Funny', angle:'A brochure beauty contest loses to a practical student checklist.', props:['Two fictional brochures','Phone','Checklist'], cast:'One student and one friend', sound:'Playful fashion-show beat that stops when the checklist appears.', scenes:[
    ["This college has a photogenic fountain.",'FOUNTAIN: VERY PHOTOGENIC','Student poses with a fictional brochure’s fountain photo.'],
    ["Lovely. What's the total fee?",'FEE: STILL UNKNOWN','Friend holds up an empty cost box beside the glamorous pose.'],
    ["The fountain hasn't replied.",'NO ANSWER FROM THE FOUNTAIN','Student looks at the photo as if waiting for it to speak.'],
    ["Course details, full costs, practical access, recognition. Those answers need official sources.",'FOUR THINGS TO VERIFY','Friend replaces the photo with a checklist and source column.'],
    ["I'll compare evidence. The fountain can stay in the photo.",'EVIDENCE BEFORE AESTHETICS','Student keeps the brochure but moves it behind the completed comparison sheet.'],
    ["Share this with your campus-visit buddy.",'SHARE WITH YOUR VISIT BUDDY','The friends leave with the checklist, not just the brochure.'],
  ] },
  { id:'college-Trendy', angle:'A side-by-side comparison reveals what glossy brochures leave unanswered.', props:['Two fictional brochures','Four question cards'], cast:'One student', sound:'Matched rhythmic cuts; beat drops at the blank-answer reveal.', scenes:[
    ["Campus A or B? The photos won't settle it.",'A OR B?','Split screen gives two fictional campus brochures identical framing.'],
    ["Both say plenty. Neither answers my exact questions yet.",'WHERE ARE THE ANSWERS?','Student lays blank answer cards beside both brochures.'],
    ["Covers down. Questions up.",'FLIP THE COMPARISON','Both brochures flip face down in a match cut.'],
    ["Compare course, full costs, practical access, and recognition. Record the official source.",'FOUR CHECKS · TWO COLUMNS','Four question cards land between columns A and B with a source line under each.'],
    ["A blank answer is a question to investigate, not a reason to guess.",'BLANK ≠ VERIFIED','Student leaves a question mark in an unverified box.'],
    ["Save this before your college visit.",'SAVE BEFORE YOUR VISIT','Four cards stack into a pocket-sized checklist.'],
  ] },
];

export function normalizeOfflineTitle(title: string): string {
  return title.normalize('NFKC').toLowerCase().replace(/[’‘]/g, "'").replace(/[.?!…]/g, '').replace(/\s+/g, ' ').trim();
}
export function findOfflineIdea(title: string) {
  const normalized = normalizeOfflineTitle(title);
  return OFFLINE_IDEAS.find(idea => normalizeOfflineTitle(idea.title) === normalized);
}

// The primary editorial purpose of each fixed sample, independent of its treatment.
export const OFFLINE_SAMPLE_CHANNELS: Record<OfflineIdeaId, ContentChannel> = {
  next:'Connection', mistakes:'Connection', engineering:'Connection', commerce:'Connection', ai:'Discovery', college:'Trust',
};
