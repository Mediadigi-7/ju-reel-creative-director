import type { ContentChannel } from '../shared/channels.js';
import { ReelStoryboard, CreativeTreatment, LanguageOption } from '../shared/types.js';
import { JOY_UNIVERSITY_VERIFIED_FACTS, HOOK_FRAMEWORKS, PATTERN_INTERRUPTS, SINGLE_CTAS, findRelevantJoyCourses } from '../shared/knowledgeBase.js';

interface TitleThemeAnalysis {
  category:
    | 'robotics'
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
  relevantCourses?: string[];
}

export function analyzeTitle(title: string): TitleThemeAnalysis {
  const lower = title.toLowerCase();
  const clean = title.replace(/[?!.]+$/, '').trim();

  if (lower.includes('robot') || lower.includes('automation') || (lower.includes('ai') && lower.includes('robot'))) {
    return {
      category: 'robotics',
      cleanTopic: clean,
      studentTension: 'Students are confused between software AI coding and hardware robotics automation.',
      coreInsight: 'Joy University offers two specific B.Tech pathways: B.Tech CSE (AI & Robotics) for software/algorithms and B.Tech Mech (Robotics & Automation) for machines and automation.',
      defaultAngle: 'Software vs Hardware Robotics: Which B.Tech course matches your actual strength?',
      relevantSchools: ['School of Computational Intelligence', 'School of Engineering & Technology'],
      relevantCourses: ['B.Tech CSE (AI & Robotics)', 'B.Tech Mech (Robotics & Automation)'],
    };
  }

  if (lower.includes('mistake') || lower.includes('wrong') || lower.includes('regret') || lower.includes('dont choose') || lower.includes("don't choose")) {
    return {
      category: 'mistakes',
      cleanTopic: clean,
      studentTension: 'Fear of making irreversible errors during college admissions and course selection.',
      coreInsight: 'Most post-+2 mistakes come from copying friends, chasing vanity rankings, or ignoring syllabus relevance.',
      defaultAngle: `Breaking down the real pitfalls behind "${clean}" before you lock in your choice.`,
      relevantSchools: ['School of Computational Intelligence', 'School of Engineering & Technology', 'School of Entrepreneurship & Management'],
      relevantCourses: ['B.Tech CSE (AI & Robotics)', 'B.Tech Mech (Robotics & Automation)', 'B.Com (FinTech & AI)'],
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
      relevantCourses: ['B.Com (FinTech & AI)', 'B.Com (Accounting & Finance)', 'BBA (Business Analytics)'],
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
      relevantCourses: ['B.Tech CSE (AI & Robotics)', 'B.Tech Mech (Robotics & Automation)', 'B.Tech ECE (VLSI Design)'],
    };
  }

  if (lower.includes('ai') || lower.includes('artificial') || lower.includes('future') || lower.includes('tech')) {
    return {
      category: 'ai_tech',
      cleanTopic: clean,
      studentTension: 'Panic that artificial intelligence will replace entry-level graduate jobs.',
      coreInsight: 'AI displaces repetitive tasks, but skyrockets demand for skilled builders and prompt-enabled domain specialists.',
      defaultAngle: `The real emerging careers shaped by AI — and what to study today to stay ahead.`,
      relevantSchools: ['School of Computational Intelligence', 'School of Design', 'School of Agricultural Sciences'],
      relevantCourses: ['B.Tech CSE (AI & Robotics)', 'B.Tech CSE (AI & Data Science)', 'B.Tech CSE (Cyber Security)'],
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

// Offline generation is an explicit catalogue, not a classifier-driven substitution.
import { generateOfflineStoryboard } from '../shared/offline/index.js';
export function generateKnowledgeEngineStoryboard(title: string, direction: CreativeTreatment = 'Informative', language: LanguageOption = 'English', duration = '28 sec', _variationSeed = 1, channel?: ContentChannel): ReelStoryboard {
  return generateOfflineStoryboard(title, direction === 'Auto' ? 'Informative' : direction, language, duration, channel);
}
