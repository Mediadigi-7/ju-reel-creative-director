import { ReelStoryboard, Shot, CreativeDirection, LanguageOption, ShotType } from '../shared/types.js';
import { JOY_UNIVERSITY_VERIFIED_FACTS, HOOK_FRAMEWORKS, PATTERN_INTERRUPTS, SINGLE_CTAS } from '../shared/knowledgeBase.js';

interface TitleThemeAnalysis {
  category:
    | 'commerce'
    | 'engineering'
    | 'ai_tech'
    | 'college_compare'
    | 'marks_anxiety'
    | 'peer_parent'
    | 'mistakes'
    | 'passion_skills'
    | 'course_choice'
    | 'general_custom';
  cleanTopic: string;
  studentTension: string;
  coreInsight: string;
  defaultAngle: string;
  relevantSchools: string[];
}

export function analyzeTitle(title: string): TitleThemeAnalysis {
  const lower = title.toLowerCase();
  const clean = title.replace(/[?!.]+$/, '').trim();

  if (lower.includes('mistake') || lower.includes('wrong') || lower.includes('regret') || lower.includes('dont choose') || lower.includes("don't choose")) {
    return {
      category: 'mistakes',
      cleanTopic: clean,
      studentTension: 'Fear of making irreversible errors during college admissions and course selection.',
      coreInsight: 'Most post-+2 mistakes come from copying friends, chasing vanity rankings, or ignoring syllabus relevance.',
      defaultAngle: `Breaking down the real pitfalls behind "${clean}" before you lock in your choice.`,
      relevantSchools: ['School of Computational Intelligence', 'School of Engineering & Technology', 'School of Entrepreneurship & Management'],
    };
  }

  if (lower.includes('commerce') || lower.includes('b.com') || lower.includes('bba') || lower.includes('accounts') || lower.includes('finance')) {
    return {
      category: 'commerce',
      cleanTopic: clean,
      studentTension: 'Commerce students are told B.Com is the only choice or that modern corporate opportunities are limited.',
      coreInsight: 'Modern commerce combines business analytics, fintech, entrepreneurship, and corporate law.',
      defaultAngle: 'Debunking the "plain B.Com" myth with high-impact corporate fintech pathways.',
      relevantSchools: ['School of Entrepreneurship & Management', 'School of Law', 'Computational Intelligence'],
    };
  }

  if (lower.includes('engineer') || lower.includes('b.tech') || lower.includes('b.sc') || lower.includes('maths') || lower.includes('coding')) {
    return {
      category: 'engineering',
      cleanTopic: clean,
      studentTension: 'Defaulting to standard engineering without knowing if they enjoy actual technical building.',
      coreInsight: 'Modern tech requires applied, project-first learning with AI integration, not just rote book theory.',
      defaultAngle: `How to evaluate whether "${clean}" actually matches your career ambitions.`,
      relevantSchools: ['School of Engineering & Technology', 'School of Computational Intelligence', 'School of Design'],
    };
  }

  if (lower.includes('ai') || lower.includes('artificial') || lower.includes('future') || lower.includes('tech') || lower.includes('robot')) {
    return {
      category: 'ai_tech',
      cleanTopic: clean,
      studentTension: 'Panic that artificial intelligence will replace entry-level graduate jobs.',
      coreInsight: 'AI displaces repetitive tasks, but skyrockets demand for skilled builders and prompt-enabled domain specialists.',
      defaultAngle: `The real emerging careers shaped by AI — and what to study today to stay ahead.`,
      relevantSchools: ['School of Computational Intelligence', 'School of Design', 'School of Agricultural Sciences'],
    };
  }

  if (lower.includes('college') || lower.includes('compare') || lower.includes('campus') || lower.includes('infrastructure') || lower.includes('which college')) {
    return {
      category: 'college_compare',
      cleanTopic: clean,
      studentTension: 'Confusion caused by glossy marketing brochures, unverified placement claims, and campus hype.',
      coreInsight: 'True college quality lies in active lab access, mentor quality, and industry projects from year one.',
      defaultAngle: 'The 3 hidden filters you must check before applying to any college campus.',
      relevantSchools: ['Joy University 104-Acre Campus', 'Computational Intelligence Labs', 'Entrepreneurship Cell'],
    };
  }

  if (lower.includes('mark') || lower.includes('score') || lower.includes('topper') || lower.includes('define') || lower.includes('rank')) {
    return {
      category: 'marks_anxiety',
      cleanTopic: clean,
      studentTension: 'Belief that a single +2 board exam score has permanently capped their life potential.',
      coreInsight: 'Marks determine entrance cut-offs; curiosity, practical portfolio, and real projects determine your 30-year career.',
      defaultAngle: `Why your board marks only determine your starting line, not your ceiling.`,
      relevantSchools: ['School of Life & Health Sciences', 'School of Design', 'School of Entrepreneurship & Management'],
    };
  }

  if (lower.includes('parent') || lower.includes('family') || lower.includes('friend') || lower.includes('everyone says') || lower.includes('peer') || lower.includes('pressure')) {
    return {
      category: 'peer_parent',
      cleanTopic: clean,
      studentTension: 'Torn between parental expectations of safe government/traditional degrees and personal interests.',
      coreInsight: 'Parents want financial security for you. Presenting an emerging career with clear industry growth data resolves the tension.',
      defaultAngle: 'How to present an emerging career choice to Indian parents without conflict.',
      relevantSchools: ['School of Agricultural Sciences', 'School of Law', 'School of Nursing', 'School of Pharmacy'],
    };
  }

  if (lower.includes('passion') || lower.includes('good at') || lower.includes('interest') || lower.includes('talent') || lower.includes('skill')) {
    return {
      category: 'passion_skills',
      cleanTopic: clean,
      studentTension: 'Students are told to follow their passion, but have no roadmap to turn passion into an employable career.',
      coreInsight: 'Passion without high-leverage digital tools is a hobby. Pair your core curiosity with modern industry tools.',
      defaultAngle: `Turning your personal strengths into a high-demand career pathway.`,
      relevantSchools: ['School of Design', 'School of Computational Intelligence', 'School of Entrepreneurship & Management'],
    };
  }

  if (lower.includes('course') || lower.includes('study') || lower.includes('degree') || lower.includes('scope') || lower.includes('what after')) {
    return {
      category: 'course_choice',
      cleanTopic: clean,
      studentTension: 'Decision paralysis after +2 with conflicting advice from everyone around them.',
      coreInsight: 'Stop picking degrees by title alone; look at the practical day-to-day problems you want to solve.',
      defaultAngle: `The 3-filter decision framework for answering "${clean}".`,
      relevantSchools: ['School of Computational Intelligence', 'School of Engineering & Technology', 'School of Life & Health Sciences'],
    };
  }

  return {
    category: 'general_custom',
    cleanTopic: clean,
    studentTension: `Uncertainty and lack of clarity surrounding ${clean}.`,
    coreInsight: `Approaching ${clean} with an active student-first perspective and practical decision rules.`,
    defaultAngle: `A fresh, no-nonsense breakdown of "${clean}" for +2 students.`,
    relevantSchools: ['School of Computational Intelligence', 'School of Design', 'School of Engineering & Technology'],
  };
}

export function generateKnowledgeEngineStoryboard(
  title: string,
  direction: CreativeDirection = 'Student Relatable',
  language: LanguageOption = 'English',
  customDuration: string = '28 sec',
  variationSeed: number = 1
): ReelStoryboard {
  const analysis = analyzeTitle(title);
  const now = new Date().toISOString();
  const id = `joy_reel_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const cleanTitle = analysis.cleanTopic;

  const isTamil = language === 'Tamil';
  const isTanglish = language === 'Tanglish';
  const isTelugu = language === 'Telugu';
  const isMalayalam = language === 'Malayalam';
  const isHindi = language === 'Hindi';

  let shots: Shot[] = [];

  switch (analysis.category) {
    case 'mistakes':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist stands holding three college application folders, suddenly tossing one into a recycle bin with a sharp, candid look at camera.`,
          dialogue: isTamil
            ? `"+2 mudichutu innum neriya per panra biggest mistake enna theriyuma?"`
            : isTanglish
            ? `"Bro, +2 mudichutu 90% students panra biggest mistake enna theriyuma? Let\'s talk honestly."`
            : `"Before you lock in any college form, stop. 90% of +2 students make this exact mistake."`,
          onscreenText: `BIGGEST +2 MISTAKE ⚠️`,
          cameraPerformance: `Fast push-in from wide room to direct, urgent eye-level close-up.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist looks at a phone screen showing WhatsApp group chats where friends are copying each other\'s course selections.`,
          dialogue: isTamil
            ? `"Friends edukuranga-nu neengalum adhey course choose panna, 4 years kazhichu regret pannuveenga."`
            : isTanglish
            ? `"Mistake #1: Choosing a course just because your best friend took it. Four years down the line, unga interest vera, avanga path vera."`
            : `"Mistake #1: Picking a degree just because your friends picked it. What fits their goals could be four years of misery for you."`,
          onscreenText: `MISTAKE 1: COPYING FRIENDS`,
          cameraPerformance: `Over-the-shoulder POV shot panning between smartphone screen and stressed face.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Protagonist snaps fingers; screen instantly flashes black & white, all audio cuts to dead silence for 1 second before snappy beat resumes.`,
          dialogue: isTamil
            ? `"Wait! Stop right there. Look at how smart students decide."`
            : isTanglish
            ? `"Wait! Stop scrolling. Idhai correct panna oru simple rule irukku."`
            : `"Wait. Stop right there. Here is the 3-step rule smart students use instead."`,
          onscreenText: `STOP 🛑 HERE'S THE FIX`,
          cameraPerformance: `Sudden snap-zoom on protagonist snapping fingers with direct fourth-wall break.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist walks across Joy University\'s modern campus courtyard, pointing to three bold graphic pillars appearing on screen.`,
          dialogue: isTamil
            ? `"Rule 1: Check practical lab access. Rule 2: Industry projects from 2nd year. Rule 3: Digital & AI integration in your syllabus."`
            : isTanglish
            ? `"3 Rules to follow: First, syllabus-la modern tech iruka? Second, hands-on labs from Day 1? Third, real industry mentorship?"`
            : `"Follow these 3 checks: 1. Is modern tech embedded in the syllabus? 2. Do you get 100% lab freedom from year one? 3. Does the campus have active industry ties?"`,
          onscreenText: `1. TECH SYLLABUS  2. ACTIVE LABS  3. MENTORSHIP`,
          cameraPerformance: `Smooth gimbal tracking shot moving backwards with protagonist walking in bright, open sunlight.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist sits at a vibrant campus cafe table with peer creators, notebook open, smiling with clarity and relief.`,
          dialogue: isTamil
            ? `"Don\'t choose a degree for the next 4 years. Choose it for who you want to become."`
            : isTanglish
            ? `"College is not just passing exams. It\'s about building real capability."`
            : `"Don\'t pick a college just to pass exams. Pick a launchpad that builds your real-world capability."`,
          onscreenText: `BUILD REAL CAPABILITY`,
          cameraPerformance: `Warm, natural medium shot with genuine confident smile.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist turns phone toward screen showing course options portal.`,
          dialogue: isTamil
            ? `"Save this reel before your admissions counseling starts."`
            : isTanglish
            ? `"Save this reel right now before you finalize your applications."`
            : `"Save this reel before you finalize your college applications."`,
          onscreenText: `SAVE THIS FOR COUNSELING`,
          cameraPerformance: `Centered portrait framing with subtle Joy University red lower-third accent.`,
        },
      ];
      break;

    case 'ai_tech':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist looks up from laptop where AI code or prompt is generating text rapidly, leaning into camera with intense focus.`,
          dialogue: isTamil
            ? `"AI unga future job-ah eduthudum-nu bayama iruka? Here is the truth."`
            : isTanglish
            ? `"Everyone is screaming that AI will destroy jobs after +2. But here is the side nobody is showing you."`
            : `"Everyone is panicking that AI will wipe out careers. But here is what\'s actually happening."`,
          onscreenText: `AI VS YOUR CAREER 🤖`,
          cameraPerformance: `Fast low-angle push-in with laptop screen reflection in student\'s eyes.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Student points to a chart showing traditional routine jobs dropping while tech-hybrid jobs rise sharply.`,
          dialogue: isTamil
            ? `"Pazhaya syllabus padicha job kidaikadhu. But AI tools use panna therinja, demand is 10x."`
            : isTanglish
            ? `"If you study outdated theory, you will struggle. But if your degree embeds computational intelligence, you become irreplaceable."`
            : `"Rote memorization is dead. But when you combine your core field with computational intelligence, your market value skyrockets."`,
          onscreenText: `ROTE THEORY IS DEAD`,
          cameraPerformance: `Medium tracking shot following hand gestures across interactive visual graphic.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Cut to Joy University AI & Computational Intelligence Lab: a robotics prototype whirs to life, LED indicators blinking bright blue.`,
          dialogue: isTamil
            ? `"Wait. Real innovation theory-la illa, hands-on lab-la dhaan irukku."`
            : isTanglish
            ? `"Hold on! Stop looking at textbook slides. Look at real lab building."`
            : `"Wait. Stop reading slides. Look at what building with AI actually looks like."`,
          onscreenText: `REAL AI IN ACTION ⚡`,
          cameraPerformance: `Macro dynamic rack focus from glowing circuit to student smiling behind safety glasses.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist breaks down 3 emerging tech pathways on a clean glass board on campus.`,
          dialogue: isTamil
            ? `"Top 3 future tracks: 1. AI & Data Intelligence, 2. Smart Agriculture & Agri-Tech, 3. Digital Business & Cyber Law."`
            : isTanglish
            ? `"3 High-growth tracks right now: AI & Machine Intelligence, Smart Agri-Tech systems, and Tech-driven Corporate Law."`
            : `"Look at these 3 future-proof tracks: AI & Computational Intelligence, Smart Agri-Tech, and Tech-driven Corporate Law."`,
          onscreenText: `1. AI & DATA  2. AGRI-TECH  3. TECH LAW`,
          cameraPerformance: `Side tracking shot with kinetic on-screen icons popping up in sync with speech.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist joins peers working on laptops in Joy University\'s collaborative design & tech hub.`,
          dialogue: isTamil
            ? `"AI won\'t replace you. Someone who knows how to build with AI will."`
            : isTanglish
            ? `"AI ungalai replace pannadhu. AI use panna therinjavanga dhaan lead pannuvanga."`
            : `"AI won\'t replace you. But a professional who knows how to leverage AI will."`,
          onscreenText: `BE THE ONE WHO BUILDS`,
          cameraPerformance: `Dynamic wide shot capturing modern campus collaboration environment.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist looks directly at camera with confident, friendly expression.`,
          dialogue: isTamil
            ? `"Comment 'AI' below and we\'ll send you the top future tech courses."`
            : isTanglish
            ? `"Comment 'AI' below to get our breakdown of future-proof degree tracks."`
            : `"Comment 'AI' below and we\'ll break down the top emerging degree options."`,
          onscreenText: `COMMENT 'AI' FOR THE GUIDE`,
          cameraPerformance: `Centered portrait shot with clean Joy University logo accent.`,
        },
      ];
      break;

    case 'college_compare':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist holds two identical glossy college brochures, looking directly into the camera with a raised eyebrow.`,
          dialogue: isTamil
            ? `"Ellam college-um '100% placement' nu solranga. But unmaiyana difference enna theriyuma?"`
            : isTanglish
            ? `"Every single college brochure promises 100% placement and world-class campus. How do you actually tell the difference?"`
            : `"Every college brochure looks identical: tall buildings and '100% placement'. But how do you actually spot a great campus?"`,
          onscreenText: `HOW TO COMPARE COLLEGES 🏫`,
          cameraPerformance: `Quick push-in from wide desk to expressive direct address to camera.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist flips through pages highlighting generic stock photos of empty conference halls and stock handshake images.`,
          dialogue: isTamil
            ? `"Building perusa irundha mattum podhadhu. Real practical learning nadakudha nu paakanum."`
            : isTanglish
            ? `"Shiny buildings don\'t guarantee practical learning. If professors only teach theory, you won\'t build real skills."`
            : `"Glass buildings don\'t build your career. If the labs are locked and students only memorize slides, you lose."`,
          onscreenText: `DON\'T FALL FOR BUILDING HYPE`,
          cameraPerformance: `POV shot of finger pointing at generic brochure photos, tilting up to protagonist shaking head.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Abrupt match-cut to a student actively assembling a project prototype on a workbench at Joy University; sparks or soldering iron smoke rises.`,
          dialogue: isTamil
            ? `"Wait! This is what you should look for."`
            : isTanglish
            ? `"Hold up! Check what students are building right now."`
            : `"Wait. Look at what happens inside active project labs."`,
          onscreenText: `CHECK REAL LAB FREEDOM 🔬`,
          cameraPerformance: `Fast whip-pan from static paper brochure into dynamic live lab workspace.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist walks along Joy University\'s 104-acre open green campus boulevard, gesturing to 3 checklist items.`,
          dialogue: isTamil
            ? `"Ask these 3 questions: 1. Lab access Day 1-la iruka? 2. Campus offers multi-disciplinary freedom? 3. Real industry partnerships with verified track record?"`
            : isTanglish
            ? `"3-point campus checklist: 1. Day-1 open lab access, 2. Freedom to learn cross-stream skills, 3. 40+ years of verified institutional legacy."`
            : `"Use this 3-point filter: 1. Open lab access from Day 1, 2. Cross-disciplinary skill freedom, 3. Decades of verified academic legacy."`,
          onscreenText: `1. DAY-1 LABS  2. SKILL FREEDOM  3. VERIFIED LEGACY`,
          cameraPerformance: `Low-angle tracking shot showcasing wide open campus environment and natural daylight.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist stands with confident smile in front of the modern Joy University campus amphitheatre.`,
          dialogue: isTamil
            ? `"The best college gives you the freedom to discover what you\'re truly capable of."`
            : isTanglish
            ? `"Choose an environment that challenges you to build, not just memorize."`
            : `"Choose an environment that challenges you to build real things, not just memorize exams."`,
          onscreenText: `CHOOSE A LAUNCHPAD THAT BUILDS YOU`,
          cameraPerformance: `Heroic medium wide framing with golden hour sunlight.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist smiles warmly, holding student planner.`,
          dialogue: isTamil
            ? `"Save this checklist before your campus visits."`
            : isTanglish
            ? `"Save this reel right now before your college counselling visits."`
            : `"Save this checklist before you visit any college campus."`,
          onscreenText: `SAVE THIS CAMPUS CHECKLIST`,
          cameraPerformance: `Clean centered portrait with branded signature badge.`,
        },
      ];
      break;

    case 'peer_parent':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist sits at a dining table between a parent pointing to an engineering brochure and a friend texting about design courses.`,
          dialogue: isTamil
            ? `"Parents oru course solranga, ungaluku inoru field pidikudha? How to handle this without fighting?"`
            : isTanglish
            ? `"Parents want you to take a traditional safe course, but your heart is somewhere else. How do you bridge the gap?"`
            : `"Parents want one safe traditional course. You want something else. How do you explain it without a family debate?"`,
          onscreenText: `PARENTS VS YOUR CHOICE 🤝`,
          cameraPerformance: `Tense medium shot with quick camera pans between parent and student.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist looks at notebook with frustrated scribble: "Safe degree vs Modern career".`,
          dialogue: isTamil
            ? `"Parents unga security-kaga dhaan bayapaduranga. Because avangaluku modern emerging careers pathi full data theriyala."`
            : isTanglish
            ? `"Understand why parents push traditional degrees: they want financial safety. If you only talk passion without showing career scope, they will worry."`
            : `"Parents push traditional degrees because they care about your security. If you only talk about passion without showing career demand, they will worry."`,
          onscreenText: `THEY WANT YOUR SECURITY`,
          cameraPerformance: `Close-up on handwritten note, then rack focus to thoughtful student expression.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Protagonist turns laptop around to show a clean presentation slide with industry hiring trends and salary growth stats.`,
          dialogue: isTamil
            ? `"Stop arguing. Show them this exact data."`
            : isTanglish
            ? `"Don\'t argue with emotions. Show them the actual numbers."`
            : `"Don\'t argue with emotions. Show them the actual industry data."`,
          onscreenText: `PROOF > ARGUMENTS 📊`,
          cameraPerformance: `Snappy push-in on laptop screen with clean visual graphs.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist outlines 3 points on paper: 1. Industry Demand, 2. Practical Degree Hybrid, 3. University Mentorship.`,
          dialogue: isTamil
            ? `"Show them 3 things: 1. Top companies hiring in this field, 2. Hybrid curriculum blending business/tech, 3. Proven campus placement legacy."`
            : isTanglish
            ? `"Present these 3 points: Current industry job growth, how the degree blends technical tools, and the university\'s established placement track record."`
            : `"Present these 3 facts: 1. Verified industry growth, 2. How modern courses blend tech with domain skills, and 3. Decades of university placement legacy."`,
          onscreenText: `1. MARKET DEMAND  2. TECH BLEND  3. LEGACY`,
          cameraPerformance: `Over-the-shoulder tracking shot while student writes neatly on notepad.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist smiles warmly, showing parent nodding with understanding and support.`,
          dialogue: isTamil
            ? `"When you bring clarity instead of conflict, parents will become your biggest supporters."`
            : isTanglish
            ? `"Clarity builds confidence. When parents see a real plan, they will support you 100%."`
            : `"When you bring real clarity instead of emotion, your parents become your strongest supporters."`,
          onscreenText: `CLARITY BUILDS CONFIDENCE`,
          cameraPerformance: `Reassuring medium shot with natural warm lighting.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist looks directly into lens with friendly nod.`,
          dialogue: isTamil
            ? `"Share this reel with a friend preparing for course discussions at home."`
            : isTanglish
            ? `"Share this with a friend who is having this conversation at home right now."`
            : `"Share this with a friend who needs to have this conversation at home."`,
          onscreenText: `SHARE WITH A FRIEND`,
          cameraPerformance: `Direct eye contact portrait with Joy University color accent.`,
        },
      ];
      break;

    case 'passion_skills':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist sketches a design or writes code on a laptop in a sunlit room, pausing and looking up skeptically.`,
          dialogue: isTamil
            ? `"'Follow your passion' nu solranga... but can passion actually pay your bills?"`
            : isTanglish
            ? `"Everyone says \'follow your passion\' after +2. But how do you turn passion into a real high-demand career?"`
            : `"Everyone tells you to \'follow your passion\'. But how do you actually turn your interests into a high-value career?"`,
          onscreenText: `CAN PASSION PAY BILLS? 💡`,
          cameraPerformance: `Dynamic close-up push-in on protagonist looking directly at viewer.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist splits a whiteboard into two sides: "What I Like" vs "What Industry Hires For".`,
          dialogue: isTamil
            ? `"Passion mattum irundha hobby. But market demand kooda combine panna, it becomes a solid career."`
            : isTanglish
            ? `"Passion alone is just a hobby. But when you attach digital tools and computational intelligence, it becomes an unstoppable career."`
            : `"Passion alone is just a hobby. But when you attach practical tech and industry tools, it becomes an unstoppable career."`,
          onscreenText: `PASSION + DIGITAL TOOLS`,
          cameraPerformance: `Medium shot tracking quick marker strokes on whiteboard.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Student taps the camera lens; scene shifts instantly to a high-tech university digital design and innovation lab.`,
          dialogue: isTamil
            ? `"Wait! Look at how modern creators build careers."`
            : isTanglish
            ? `"Wait! Check out how students are turning skills into proof."`
            : `"Wait. Look at how modern students are turning skills into proof."`,
          onscreenText: `TURNING SKILLS INTO PROOF 🚀`,
          cameraPerformance: `Direct lens tap transition with smooth match cut to lab setting.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist points to 3 high-impact skill-stacking pathways.`,
          dialogue: isTamil
            ? `"The 3-part formula: 1. Core interest, 2. Modern computational tools, 3. Real portfolio projects built during college."`
            : isTanglish
            ? `"Use this formula: Core passion + computational tech layer + real campus client projects. You will never be unemployed."`
            : `"Use this 3-part formula: Core interest + computational tech layer + real campus projects. That\'s how you build real career leverage."`,
          onscreenText: `1. INTEREST  2. TECH LAYER  3. PORTFOLIO`,
          cameraPerformance: `Steadicam tracking shot showing active students creating in modern workspace.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist presents a completed digital prototype with team at Joy University entrepreneurship center.`,
          dialogue: isTamil
            ? `"Don\'t just follow your passion. Build the skills that make it valuable."`
            : isTanglish
            ? `"Don\'t just dream about it. Build the proof that makes your skills undeniable."`
            : `"Don\'t just dream about your passion. Build the proof that makes your skills undeniable."`,
          onscreenText: `MAKE YOUR SKILLS UNDENIABLE`,
          cameraPerformance: `Confident medium shot with team celebration in background.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist smiles at camera with tablet in hand.`,
          dialogue: isTamil
            ? `"Comment your favorite subject and let\'s explore matching modern degrees."`
            : isTanglish
            ? `"Comment your top interest below and we\'ll suggest high-growth degree matches."`
            : `"Comment your top interest below and let\'s map out the best degree matches."`,
          onscreenText: `COMMENT YOUR TOP INTEREST`,
          cameraPerformance: `Centered portrait framing with Joy University branding.`,
        },
      ];
      break;

    case 'commerce':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist sits at a study desk, staring at three identical accounting textbooks, looking visibly skeptical.`,
          dialogue: isTamil
            ? `"+2 Commerce mudichutu B.Com mattum dhaan option-nu nenachutu irukingala?"`
            : isTanglish
            ? `"Bro, commerce mudichutu verum plain B.Com mattum dhaan irukku-nu yaravadhu sonnangala?"`
            : `"Someone probably told you that Commerce after +2 just means plain old B.Com."`,
          onscreenText: `COMMERCE = ONLY B.COM? 🤔`,
          cameraPerformance: `Tight handheld push-in on protagonist face with relatable eye-roll.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist scrolls through job postings where standard manual bookkeeping roles are crowded with thousands of identical applicants.`,
          dialogue: isTamil
            ? `"Traditional syllabus won\'t cut it. Market full-ah fintech, analytics, corporate law-nu maariduchu."`
            : isTanglish
            ? `"The corporate world moved to fintech and business analytics. Plain theory leaves you stuck in a resume pile."`
            : `"Standard bookkeeping is automated. The old 3-year playbook leaves you fighting with thousands of identical resumes."`,
          onscreenText: `THE RESUME TRAP`,
          cameraPerformance: `POV shot of glowing smartphone screen cutting to a worried expression.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Friend steps in and slaps down a tablet showing real-time FinTech analytics and stock charts, shutting the dusty textbook.`,
          dialogue: isTamil
            ? `"Wait! Book-ah moodunga. Look at where real finance is happening."`
            : isTanglish
            ? `"Hold on! Stop scrolling. Idhai paarunga."`
            : `"Wait. Close that dusty book. Look at where actual finance is happening today."`,
          onscreenText: `MODERN FINTECH 📈`,
          cameraPerformance: `Rapid snap-zoom to tablet screen with snappy book-slam foley.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Two students walk across Joy University\'s open campus, pointing to kinetic text callouts appearing in the air.`,
          dialogue: isTamil
            ? `"Compare these 3 tracks: FinTech & AI Analytics, Corporate Law with BBA, and Digital Entrepreneurship."`
            : isTanglish
            ? `"Three high-growth options: FinTech with analytics, Corporate Law, and Tech Entrepreneurship. Business plus tech is unbeatable."`
            : `"Compare these three high-growth paths: FinTech with analytics, Corporate Law, and Tech Entrepreneurship. Business acumen plus tech tools is unbeatable."`,
          onscreenText: `1. FINTECH  2. CORP LAW  3. ENTREPRENEURSHIP`,
          cameraPerformance: `Smooth low-angle tracking shot walking with actors in natural daylight.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist works inside Joy University\'s modern entrepreneurship and business hub with team.`,
          dialogue: isTamil
            ? `"Commerce is no longer just counting numbers. It\'s about building and scaling businesses."`
            : isTanglish
            ? `"Commerce na verum ledger illa. It\'s about steering future industries."`
            : `"Commerce isn\'t about filling ledgers anymore. It\'s about running future industries."`,
          onscreenText: `RUN FUTURE INDUSTRIES`,
          cameraPerformance: `Medium close-up with authentic confident smile.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist turns phone toward viewer displaying course exploration portal.`,
          dialogue: isTamil
            ? `"Save this reel and share it with your commerce group."`
            : isTanglish
            ? `"Save this reel right now before your counselling starts."`
            : `"Save this reel before you finalize your commerce applications."`,
          onscreenText: `SAVE FOR COMMERCE ADMISSIONS`,
          cameraPerformance: `Static eye-level hero shot with Joy University logo graphic.`,
        },
      ];
      break;

    case 'engineering':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist stands before a whiteboard with 10 engineering branches written, crossing arms in utter overwhelm.`,
          dialogue: isTamil
            ? `"Ellarum B.Tech choose panranga-nu neengalum adhey track-la pogaporeengala?"`
            : isTanglish
            ? `"Everyone says just take B.Tech. But what if standard engineering is the exact wrong fit for you?"`
            : `"Everyone told you to just pick Engineering because it has 'scope'. But what if that's completely wrong?"`,
          onscreenText: `DON'T CHOOSE B.TECH BY DEFAULT ⚙️`,
          cameraPerformance: `Whip pan from whiteboard scribble to protagonist's skeptical gaze.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Student looks at brochures where every single page looks copy-pasted with obsolete theory.`,
          dialogue: isTamil
            ? `"4 varusham pass aana mattum podhadhu. Hands-on coding and real lab exposure illana, degree is just a paper."`
            : isTanglish
            ? `"Mugging up syllabus doesn\'t get you hired anymore. Practical innovation dhaan matters."`
            : `"Memorizing formulas for four years won\'t build real systems. If the college doesn\'t give you real lab freedom, you lose."`,
          onscreenText: `THE 4-YEAR REGRET`,
          cameraPerformance: `Slow push-in with rack focus from paper brochure to student\'s stressed expression.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Sudden cut to robotic sensor or computer vision hardware spinning into focus in an advanced lab; audio drops to pure mechanical sound.`,
          dialogue: isTamil
            ? `"Wait. Idhudhaan unmaiyana modern engineering."`
            : isTanglish
            ? `"Hold up! Stop looking at textbook syllabus. Look at this."`
            : `"Wait. Look at what actual engineering looks like today."`,
          onscreenText: `REAL ENGINEERING ⚡`,
          cameraPerformance: `Extreme macro close-up of high-tech gear with cinematic lighting.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist points out 3 clear checkmarks on clipboard while standing in Joy University\'s Computational Intelligence Lab.`,
          dialogue: isTamil
            ? `"Rule 1: Look for Computational Intelligence or AI integration. Rule 2: 100% practical lab access. Rule 3: Industry projects from 2nd year."`
            : isTanglish
            ? `"Check these three things: Computational intelligence focus, real lab access from Day 1, and projects over pure theory."`
            : `"Ask these 3 questions: Is AI embedded in the curriculum? Do you touch real hardware from year one? And do professors build with industry?"`,
          onscreenText: `1. AI INTEGRATED  2. LABS DAY-1  3. INDUSTRY PROJECTS`,
          cameraPerformance: `Medium tracking shot showcasing student peers actively collaborating on live prototypes.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist high-fives teammate after deploying code to a live robotics station.`,
          dialogue: isTamil
            ? `"Engineering is not about getting a degree. It\'s about building things that work."`
            : isTanglish
            ? `"Engineering na paper degree illa. It\'s about building real things."`
            : `"Engineering isn\'t about memorizing theory. It\'s about the thrill of building things that actually work."`,
          onscreenText: `BUILD THINGS THAT MATTER`,
          cameraPerformance: `Dynamic low-angle wide shot capturing student achievement.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist speaks directly into lens with friendly, warm authority.`,
          dialogue: isTamil
            ? `"Comment your stream below, and let\'s discuss your best engineering options."`
            : isTanglish
            ? `"Comment your +2 marks or group below — let\'s find your exact match."`
            : `"Comment the course you\'re considering below and we\'ll break down its real industry scope."`,
          onscreenText: `COMMENT YOUR TARGET COURSE`,
          cameraPerformance: `Clean static medium close-up with Joy University color accent.`,
        },
      ];
      break;

    case 'marks_anxiety':
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Close up of +2 marks sheet on desk, followed by protagonist exhaling with hands in pockets on an outdoor staircase.`,
          dialogue: isTamil
            ? `"Mark sheet paathutu future pochu-nu feel panreengala?"`
            : isTanglish
            ? `"Marks sheet vandhaachu, now you feel like one single score decided your whole life?"`
            : `"Your marks just arrived. And right now, you feel like one single number decided your entire future."`,
          onscreenText: `DID YOUR MARKS RUIN EVERYTHING? 📄`,
          cameraPerformance: `Dramatic slow push-in from marksheet numbers to reflective medium shot.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist sits between relatives who are constantly asking "What score did you get?" with overwhelming text overlay.`,
          dialogue: isTamil
            ? `"Relatives phone calls, friends comparison... the pressure is unreal."`
            : isTanglish
            ? `"Relatives call pannite irukanga, friends bragging... it feels like everyone is judging you."`
            : `"The endless phone calls from relatives and comparison with friends make you feel trapped."`,
          onscreenText: `THE COMPARISON TRAP`,
          cameraPerformance: `Handheld camera wobble conveying social anxiety.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Protagonist abruptly steps out into the bright, open 104-acre Joy University central boulevard. Deep breath, camera rotates 180 degrees.`,
          dialogue: isTamil
            ? `"Stop. Deep breath edunga. Here is the reality."`
            : isTanglish
            ? `"Hold on. Stop worrying. Reality vera madhiri irukku."`
            : `"Stop. Take a breath. Here is what colleges won\'t tell you."`,
          onscreenText: `TAKE A BREATH. HERE\'S REALITY. ☀️`,
          cameraPerformance: `Spinning 180-degree camera transition moving from dim indoor to sunny expansive outdoor vista.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist walks alongside university tech labs where students of all score backgrounds are building live apps.`,
          dialogue: isTamil
            ? `"Your marks only decide your starting line. Unga curiosity, projects, and right environment decide your entire 30-year career."`
            : isTanglish
            ? `"Marks decide your starting gate, but your practical portfolio decides your salary and growth."`
            : `"Marks only decide your entry ticket. Your portfolio, practical curiosity, and campus mentorship decide your entire 30-year career."`,
          onscreenText: `MARKS = ENTRY TICKET | SKILLS = CAREER`,
          cameraPerformance: `Steadicam tracking shot showing active students engaging with modern equipment.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist stands proudly with friends on campus amphitheatre steps, smiling with genuine relief.`,
          dialogue: isTamil
            ? `"Don\'t let a single exam define your potential. Choose an institution that builds YOU."`
            : isTanglish
            ? `"One exam doesn\'t define your life. Your next 4 years will."`
            : `"One board exam does not define your life. What you build in the next four years will."`,
          onscreenText: `YOUR NEXT 4 YEARS DEFINE YOU`,
          cameraPerformance: `Golden hour medium wide shot with warm, reassuring framing.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist gestures warmly toward screen with callout overlay.`,
          dialogue: isTamil
            ? `"Send this to a friend who needs this reminder today."`
            : isTanglish
            ? `"Send this to your best friend who is stressed about their marks."`
            : `"Send this to a friend who needs to hear this today."`,
          onscreenText: `SHARE WITH A STRESSED FRIEND`,
          cameraPerformance: `Direct eye contact, friendly conversational close-up.`,
        },
      ];
      break;

    default:
      // Dynamically generate tailored shots based on the user's specific cleanTitle
      shots = [
        {
          number: 1,
          type: 'HOOK',
          name: 'Hook',
          timestamp: '00:00 – 00:04',
          visual: `Protagonist turns directly to the camera with an engaging, candid expression in a student lounge, holding up a notebook with "${cleanTitle}" written on it.`,
          dialogue: isTamil
            ? `"${cleanTitle} pathi yosichu confuse aagite irukeengala? Idhai oru nimisham paarunga, unga confusion theerum."`
            : isTelugu
            ? `"${cleanTitle} gurinchi alochinchi confuse avthunnara? Oka sari idi chudandi, clear clarity vasthundi."`
            : isMalayalam
            ? `"${cleanTitle}-ne patti aalochichu confuse aakukayaano? Oru nimisham idhu kaanu, theerchayaayum clarity kittum."`
            : isHindi
            ? `"${cleanTitle} ko lekar confuse ho rahe ho? Ek minute ruko, poori clarity mil jayegi."`
            : isTanglish
            ? `"${cleanTitle} pathi yosikareengala? Stop listening to random advice, here is the real breakdown."`
            : `"If you've been wondering about '${cleanTitle}', stop listening to generic advice. Here's the truth."`,
          onscreenText: `${cleanTitle.toUpperCase()}? 🎯`,
          cameraPerformance: `Dynamic 35mm lens push-in with crisp subject focus and direct eye contact.`,
        },
        {
          number: 2,
          type: 'PROBLEM',
          name: 'Problem',
          timestamp: '00:04 – 00:08',
          visual: `Protagonist highlights conflicting opinions on a tablet: one side showing old traditional routes, the other showing unguided trends.`,
          dialogue: isTamil
            ? `"Ovvovvoru aalum ovvovvoru advice solvaanga. Ellaraiyum satisfy panna paatha, neenga dhaan stuck aaveenga."`
            : isTelugu
            ? `"Prathi okkalu okko mata chepthaaru. Andari matalu vini follow ayithe, meere stuck avthaaru."`
            : isMalayalam
            ? `"Ellaavarum oro upadesham parayum. Ellaavareyum kettu poyaal, ningal arikkum thalayil aakunnath."`
            : isHindi
            ? `"Har koi alag-alag advice deta hai. Sabki sunoge toh khud phans jaoge."`
            : isTanglish
            ? `"Half the advice you hear is 10 years outdated, and the other half is pure hype. You need a practical decision rule."`
            : `"Half the advice you hear is 10 years out of date, and the other half is hype. You need a practical decision rule."`,
          onscreenText: `OUTDATED ADVICE VS HYPE`,
          cameraPerformance: `Over-the-shoulder POV shot panning from tablet screen to thoughtful expression.`,
        },
        {
          number: 3,
          type: 'PATTERN_INTERRUPT',
          name: 'Pattern Interrupt',
          timestamp: '00:08 – 00:12',
          visual: `Protagonist closes the tablet decisively, camera cuts instantly to a lively outdoor setting on Joy University campus.`,
          dialogue: isTamil
            ? `"Vera yarodaiyum advice-ah kekaadheenga. Ungalukku neengale indha oru kelviya kettukonga."`
            : isTelugu
            ? `"Inka andari matalu aapandi. Meeku meere ee chinna question veskondi."`
            : isMalayalam
            ? `"Mathullavarude shabdam onnu nirthu. Ningal ningaloduthanne ee oru chodyam chodhikku."`
            : isHindi
            ? `"Sabka shor band karo. Khud se sirf ye ek seedha sawaal poocho."`
            : isTanglish
            ? `"Hold up! Cut through the noise. Here is the single question that actually matters."`
            : `"Stop the noise. Ask yourself this one simple question."`,
          onscreenText: `CUT THROUGH THE NOISE ✂️`,
          cameraPerformance: `Quick match-cut from indoor desk to bright open-air campus corridor.`,
        },
        {
          number: 4,
          type: 'VALUE',
          name: 'Value',
          timestamp: '00:12 – 00:22',
          visual: `Protagonist walks alongside modern labs, detailing 3 concrete checkpoints for "${cleanTitle}".`,
          dialogue: isTamil
            ? `"Indha 3 vishayatha check pannunga: 1. Ungalukku daily idhula interest irukka? 2. Syllabus-la modern tech & AI irukka? 3. Real campus project & lab access kidaikkuma?"`
            : isTelugu
            ? `"Ee 3 vishayalu check cheyandi: 1. Meeku daily indhulo interest unda? 2. Syllabus lo modern tech & AI unda? 3. College lo hands-on project labs unnaaya?"`
            : isMalayalam
            ? `"Ee 3 kaaryangal check cheyyu: 1. Ningalkku idhil nalla interest undo? 2. Syllabus-il modern tech & AI undo? 3. College-il real practical lab facilities kittumo?"`
            : isHindi
            ? `"Ye 3 cheezein check karo: 1. Kya daily ye kaam karne mein interest hai? 2. Syllabus mein modern tech aur AI hai? 3. Campus mein real project labs milenge?"`
            : isTanglish
            ? `"3 Checkpoints for ${cleanTitle}: Daily problem fit, modern tech & AI layer, and real day-1 lab access."`
            : `"Apply these 3 filters to ${cleanTitle}: 1. Practical day-to-day problem fit, 2. Digital & AI tool integration, 3. Real campus mentorship with industry projects."`,
          onscreenText: `1. PROBLEM FIT  2. TECH LAYER  3. ACTIVE LABS`,
          cameraPerformance: `Smooth gimbal tracking shot alongside protagonist in natural daylight.`,
        },
        {
          number: 5,
          type: 'PAYOFF',
          name: 'Payoff',
          timestamp: '00:22 – 00:26',
          visual: `Protagonist joins a group of engaged student peers around an outdoor study pod on Joy University campus.`,
          dialogue: isTamil
            ? `"Real capability irukka degree-ah choose panna, unga future pathina bayame irukaadhu."`
            : isTelugu
            ? `"Real capability iche course choose cheskunte, future gurinchi bhayapadalsina pani undadu."`
            : isMalayalam
            ? `"Real capability tharunna course thiranjeduthaal, future-ne patti oru pediyum venda."`
            : isHindi
            ? `"Jab real capability dene wala course choose karoge, toh future ka darr khatam ho jayega."`
            : isTanglish
            ? `"The right decision isn't about pleasing others. It's about building who you become."`
            : `"The right choice isn't about pleasing others. It's about picking a launchpad that builds who you want to become."`,
          onscreenText: `CHOOSE YOUR LAUNCHPAD`,
          cameraPerformance: `Medium wide heroic framing with vibrant green campus backdrop.`,
        },
        {
          number: 6,
          type: 'CTA',
          name: 'Call to Action',
          timestamp: '00:26 – 00:30',
          visual: `Protagonist smiles at camera with friendly nod.`,
          dialogue: isTamil
            ? `"Admissions start aaguradhukku munnadi, indha reel-ah save pannivechukkonga."`
            : isTelugu
            ? `"Admissions start ayye mundhe, ee reel ni thappakunda save cheskondi."`
            : isMalayalam
            ? `"Admissions thudangunnathinu munpaayi, ee reel ippol thanne save cheythu vekku."`
            : isHindi
            ? `"Admissions shuru hone se pehle, ye reel abhi save kar lo."`
            : isTanglish
            ? `"Save this reel right now before you make your final college decision."`
            : `"Save this reel before you finalize your college decision."`,
          onscreenText: `SAVE THIS REEL`,
          cameraPerformance: `Centered portrait framing with Joy University signature badge.`,
        },
      ];
      break;
  }

  // Direction adaptations
  if (direction === 'Funny') {
    shots[0].visual = `Protagonist dramatic face-plant onto a mound of application brochures for "${cleanTitle}" with comedy cartoon sigh.`;
    shots[2].dialogue = '"Hold up. Is anyone actually asking what WE want to study?"';
  } else if (direction === 'Cinematic') {
    shots[0].cameraPerformance = 'Anamorphic 2.39:1 letterbox simulation with cinematic rim lighting.';
    shots[4].cameraPerformance = 'Epic golden-hour tracking shot rising above the 104-acre Joy University campus.';
  } else if (direction === 'Bold') {
    shots[0].dialogue = `"Most advice you received about '${cleanTitle}' is 10 years out of date."`;
    shots[0].onscreenText = 'COLLEGE ADVICE IS BROKEN ⚡';
  }

  // ─── VARIATION SEED ROTATION ───────────────────────────────────────────────
  // Each seed (1–6) rotates Hook opener, Pattern Interrupt style, creative angle,
  // CTA phrase, and production notes — so every Regenerate click produces fresh content.
  const hookVariants: Array<{ dialogue: string; onscreenText: string; cameraPerformance: string; visual: string }> = [
    // Seed 1 – Direct Pain Point (default — already set above)
    { ...shots[0] },
    // Seed 2 – POV / Confession
    {
      dialogue: isTamil
        ? `"Nan +2 results vandha udane wrong decision panna ready-a irundhen. Stop panni kelu."`
        : isTelugu
        ? `"Nenu +2 results vachaka wrong decision tesukodaaniki ready ga unnanu. Okasari aagi vinandi."`
        : isMalayalam
        ? `"Njan +2 results vannappol thettaya theerumaanam edukkan ready aayirunnu. Onnu nirthi kelkku."`
        : isHindi
        ? `"Maine +2 results aane ke baad galat decision lene ki sochi thi. Ek second ruko aur suno."`
        : isTanglish
        ? `"POV: +2 result vandhuchu. Enna study panna nu theriyama phone scroll pannitu irukka? Same here bro."`
        : `"POV: Your +2 results just arrived. You have no idea what to do next. You're not alone."`,
      onscreenText: `POV: YOU JUST FINISHED +2`,
      cameraPerformance: `Intimate close-up selfie-style from protagonist POV, then flips camera outward.`,
      visual: `Protagonist sits on bed holding phone showing results screen — slow exhale, direct look to camera.`,
    },
    // Seed 3 – Contrarian / Myth Buster
    {
      dialogue: isTamil
        ? `"Ellorum solra advice follow pannathey. Unga career-la avanga live panna maataanga."`
        : isTelugu
        ? `"Andaru cheppe advice blindly follow avvaddhu. Me career lo vallu undaru, meere untaru."`
        : isMalayalam
        ? `"Ellaavarum parayunna upadesham kannumadachu vishwasikkaruthu. Ningalude career-il ningal aanu jeevikendathu."`
        : isHindi
        ? `"Sabki advice aankh band karke follow mat karo. Aapke career mein aapko jeena hai, unhe nahi."`
        : isTanglish
        ? `"Everyone giving you advice about '${cleanTitle}'? Most of them chose wrong themselves. Let's fix that."`
        : `"Everyone has an opinion about '${cleanTitle}'. Most of them got it wrong. Here's what actually matters."`,
      onscreenText: `STOP FOLLOWING THE CROWD`,
      cameraPerformance: `Camera pulls back from extreme close-up of protagonist's eyes to medium — deliberate and slow.`,
      visual: `Protagonist stands still as crowd of students rushes past — holds up hand to stop.`,
    },
    // Seed 4 – Question / Curiosity
    {
      dialogue: isTamil
        ? `"Oru simple question. Unga answer mattum unga future-a change pannatum."`
        : isTelugu
        ? `"Oka simple question. Me answer me future ni complete ga change chestundi."`
        : isMalayalam
        ? `"Oru simple question. Ningalude uthram ningalude future mathram maatti ezhuthum."`
        : isHindi
        ? `"Ek simple sawaal. Aur aapka jawaab aapka future badal sakta hai."`
        : isTanglish
        ? `"One question. Just one. And your answer will change how you see '${cleanTitle}' forever."`
        : `"Before you decide anything — answer this one question honestly. It changes everything."`,
      onscreenText: `ANSWER THIS FIRST 🧠`,
      cameraPerformance: `Tight static shot, protagonist leans slightly forward — low ambient sound, tension hold.`,
      visual: `Protagonist sits at empty table with single blank notebook — pauses, looks up at camera.`,
    },
    // Seed 5 – Stat Shock
    {
      dialogue: isTamil
        ? `"70% students wrong course-la join pannuvaanga. Neenga avanga-la oru aalaa aaganumaa?"`
        : isTelugu
        ? `"70% students wrong course lo join avutharu. Meeru kuda valla lanti vallu avvaalanukuntunnara?"`
        : isMalayalam
        ? `"70% vidyarthikal thettaya course-il cheraan idayundu. Ningalkkum avaril oral aakano?"`
        : isHindi
        ? `"70% students galat course choose kar lete hain. Kya aapko bhi unme se ek banna hai?"`
        : isTanglish
        ? `"Bro, 7 out of 10 students regret their course choice by second year. Let's make sure you're not one of them."`
        : `"7 out of 10 students say they'd have chosen differently. Don't become that statistic."`,
      onscreenText: `70% REGRET THIS DECISION ⚠️`,
      cameraPerformance: `Fast smash-cut from wide campus shot to extreme close-up of protagonist's concerned face.`,
      visual: `Split screen: left shows a stressed student in wrong lecture; right shows a happy, engaged student.`,
    },
    // Seed 6 – Challenge / Framework Teaser
    {
      dialogue: isTamil
        ? `"Oru 30-second framework. Correct course choose pannurathu ippove easy-aa agum."`
        : isTelugu
        ? `"Oka 30-second framework. Correct course choose cheskovadam ippude chaala easy avuthundi."`
        : isMalayalam
        ? `"Oru 30-second framework. Nalla course thiranjedukkunnath ippol thanne easy aakum."`
        : isHindi
        ? `"Sirf 30-second ka ek framework. Sahi course chunna abhi se easy ho jayega."`
        : isTanglish
        ? `"30 seconds. That's all I need to give you a framework for '${cleanTitle}' that actually works."`
        : `"Give me 30 seconds. I'll give you a decision framework for '${cleanTitle}' that nobody tells you."`,
      onscreenText: `30-SECOND FRAMEWORK ⚡`,
      cameraPerformance: `Protagonist writes on whiteboard/glass — camera tracks the hand writing the framework title.`,
      visual: `Protagonist stands at glass wall writing a framework outline with bold marker strokes.`,
    },
  ];

  const patternInterruptVariants = [
    `Abrupt record-scratch sound drop + direct deadpan stare into lens with 0.5s silence.`,
    `Quick snap-zoom from wide to close-up + single bass hit sound effect.`,
    `Protagonist steps forward and physically taps the camera lens — "Stop. Read this carefully."`,
    `Black screen flash for 0.3s then hard cut back — text pops: "WAIT."`,
    `Protagonist pulls out a phone and shows the screen to camera with a knowing look.`,
    `Match cut from indoor to outdoor — sudden ambient sound swap. Protagonist walks into bright daylight.`,
  ];

  const ctaVariants = [
    isTamil ? `"Save pannitu unga friends-ku share pannunga."` : isTelugu ? `"Save cheskoni me friends tho share cheyandi."` : isMalayalam ? `"Save cheythu ningalude friends-num share cheyyu."` : isHindi ? `"Save karke apne doston ke sath share karo."` : `"Save this reel and share it with a friend who needs to hear this."`,
    isTamil ? `"Comment-la unga stream type pannunga — next reel unga-ku."` : isTelugu ? `"Comment lo me stream cheppandi — next reel me kosame."` : isMalayalam ? `"Comment-il ningalude stream parayu — adutha reel ningalkkaayi."` : isHindi ? `"Comment mein apna stream batao — agla reel aapke liye."` : `"Comment your stream below — we'll break down the best path just for you."`,
    isTamil ? `"Follow pannunga — every week honest advice."` : isTelugu ? `"Follow cheyandi — every week honest guidance."` : isMalayalam ? `"Follow cheyyu — every week nalla career advice."` : isHindi ? `"Follow karo — har hafte authentic career guidance ke liye."` : `"Follow Joy University for weekly honest post-+2 decision content."`,
    isTamil ? `"Save pannunga — admissions-ku munnadiye review pannunga."` : isTelugu ? `"Save cheskondi — admissions mundhe review cheyandi."` : isMalayalam ? `"Save cheythu vekku — admissions munpu review cheyyu."` : isHindi ? `"Save kar lo — admission se pehle ye checklist zaroor dekhna."` : `"Tap save — review this checklist before you fill any application form."`,
    isTamil ? `"Share pannunga — unga da/ma-ku show pannunga."` : isTelugu ? `"Share cheyandi — me parents tho ee vishayam matladandi."` : isMalayalam ? `"Share cheyyu — ningalude parents-num idhu kaanichu kodukku."` : isHindi ? `"Share karo — apne parents ke sath ye baat start karo."` : `"Share this with your parents — it'll start the right conversation."`,
    isTamil ? `"Comment pannunga: Entha course confuse pannudu nu."` : isTelugu ? `"Comment cheyandi: Ee course meku confusion ga undi?"` : isMalayalam ? `"Comment cheyyu: Ethellam course aanu ningale confuse aakkunnath?"` : isHindi ? `"Comment karo: Kaunsa course aapko confuse kar raha hai?"` : `"Comment the course you're confused about — we'll answer in the next reel."`,
  ];

  const angleVariants = [
    analysis.defaultAngle,
    `A direct 6-step decision breakdown for "${cleanTitle}" — no fluff, just what matters.`,
    `The contrarian take on "${cleanTitle}" that most students never hear before they commit.`,
    `Using the 3-question framework to instantly clarify "${cleanTitle}" for any +2 student.`,
    `Why the obvious answer to "${cleanTitle}" is almost always the wrong one — and what to do instead.`,
    `Real student stories that reframe "${cleanTitle}" into a clear, confident next move.`,
  ];

  // Apply the variation (seed is 1-indexed, arrays are 0-indexed)
  const idx = (variationSeed - 1) % 6;

  // Swap Hook content
  const hookVar = hookVariants[idx];
  if (hookVar && idx > 0) {
    shots[0].dialogue = hookVar.dialogue;
    shots[0].onscreenText = hookVar.onscreenText;
    shots[0].cameraPerformance = hookVar.cameraPerformance;
    shots[0].visual = hookVar.visual;
  }

  // Swap Pattern Interrupt technique (shot 2, index 2)
  if (shots[2]) {
    shots[2].cameraPerformance = patternInterruptVariants[idx];
  }

  // Swap CTA dialogue (last shot)
  const lastShot = shots[shots.length - 1];
  if (lastShot && lastShot.type === 'CTA') {
    lastShot.dialogue = ctaVariants[idx];
  }

  // Vary the creative angle
  const creativeAngle = angleVariants[idx];
  // ────────────────────────────────────────────────────────────────────────────

  return {
    id,
    reelTitle: title,
    creativeAngle,
    objective: `Guide +2 students through "${cleanTitle}" with actionable clarity and decision frameworks.`,
    targetAudience: '+2 Completed Students (Ages 17–19)',
    duration: customDuration,
    format: '9:16 Vertical Reel',
    creativeDirection: direction,
    language,
    shots,
    productionNotes: {
      visualStyle: 'Warm, naturalistic, authentic South Indian student-first aesthetic. Avoid corporate promotional stiffness.',
      performance: 'Conversational, grounded, peer-to-peer delivery with micro-expressions of relatable doubt turning to confidence.',
      camera: 'Lightweight mirrorless camera or smartphone with f/1.8 prime lens for crisp subject isolation.',
      editing: 'Snappy rhythmic cuts (1.5–3.5s per shot), match cuts on action, kinetic typography for key takeaway phrases.',
      sound: 'Warm acoustic lofi guitar or subtle upbeat percussion beat with music ducked during dialogue and silence on pattern interrupt.',
      props: ['+2 Marksheet', 'Notebook', 'Smartphone with code/design screen', 'Course Booklet'],
      locations: ['Joy University Central Boulevard', 'Computational Intelligence Lab', 'Campus Amphitheatre'],
      casting: '1 protagonist (18–19 yrs old, approachable look) + 2 background student collaborators',
      complexity: 'LOW',
    },
    creativeSummary: {
      keyCreativeIdea: `Transform "${cleanTitle}" from anxiety into an empowering, concrete decision framework.`,
      shootingPriority: [
        'Nail the opening Hook facial expression within the first 1.5 seconds.',
        'Execute the Pattern Interrupt cut with perfect audio-video synchronization.',
        'Ensure the Value shot clearly highlights the 3-point framework in readable typography.',
        'Keep branding subtle until the final payoff and CTA.',
      ],
    },
    viralBlueprint: {
      viralScore: 91 + (idx % 8),
      obviousAngleAvoided: `A generic promotional monologue advising students to "work hard and follow their dreams" with campus drone b-roll.`,
      humanTruth: analysis.studentTension,
      hiddenProblem: `Students choose their degree based on WhatsApp forwards and parental pressure without testing real industry workflows.`,
      centralInformationGap: `What is the single filter that separates degrees facing AI obsolescence from those creating compounding career leverage?`,
      contentTension: `Perceived safety of conventional paths versus the reality of rapid modern technical change.`,
      progressiveRevelation: [
        `Reveal 1 (The Familiar Assumption): Believing "${cleanTitle}" is a solved checklist that everyone follows blindly.`,
        `Reveal 2 (The Unexpected Complication): Most students discover in their first year that traditional curriculum lags modern industry reality.`,
        `Reveal 3 (The Deeper Truth): ${analysis.coreInsight}`,
        `Reveal 4 (The Actionable Payoff): Pick practical project-first learning, modern labs, and multidisciplinary skills over vanity cut-offs.`,
      ],
      contentSurprise: `The degree everyone tells you is "safest" is often the most crowded with the highest risk of job-search friction.`,
      practicalValue: `A clear 3-question filter to evaluate any college syllabus and lab access before paying admission fees.`,
      payoff: `Total clarity and calm confidence — knowing exactly what questions to ask before locking in your admission.`,
      shareTrigger: `"My friends who just finished +2 need to hear this before locking their college choice."`,
      saveTrigger: `A 3-step decision checklist that students and parents will re-read during admission week.`,
      commentTrigger: `"Are you choosing this course because you genuinely want it or because family suggested it? Comment your stream below."`,
      joyUniversityConnection: `Joy University's hands-on project labs, future-ready multidisciplinary majors, and 104-acre research ecosystem serve as real proof points.`,
      directorInstruction: `Start with high empathy in the first 2 seconds, shatter the standard assumption by second 8, and deliver actionable clarity before introducing any university solutions.`,
    },
    tags: ['+2', 'careers', 'admissions', 'joy-university', analysis.category],
    createdAt: now,
    updatedAt: now,
    status: 'Draft',
    version: variationSeed,
  };
}
