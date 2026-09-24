import React, { useState } from 'react';
import {
  Lightbulb,
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
  Smile,
  Flame,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { CreativeDirection } from '../../shared/types.js';

interface IdeasViewProps {
  onSelectIdea: (idea: string, direction?: CreativeDirection) => void;
  onNavigateToCreate: () => void;
}

interface Subcategory {
  name: string;
  ideas: string[];
}

interface IdeaCategory {
  id: CreativeDirection;
  name: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  subcategories: Subcategory[];
}

const CATEGORIZED_IDEAS: IdeaCategory[] = [
  {
    id: 'Informative',
    name: '1. Informative',
    badge: 'Education & Guidance (85 Titles)',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    badgeBorder: 'border-blue-200',
    icon: BookOpen,
    description: 'Teach, guide & provide clear educational value for students & parents',
    subcategories: [
      {
        name: 'A. Career & Course Discovery',
        ideas: [
          'What can I do after Maths besides engineering?',
          'B.Tech vs B.Sc — which fits me?',
          'Is B.Com enough for a good career?',
          'What careers can Arts students build?',
          'How do I choose a course?',
          'I finished +2… now what?',
          'Maths students: engineering is not your only option.',
          '3 careers Commerce students rarely hear about.',
          'Arts students: your career options are bigger than you think.',
          'What can Maths students do beyond engineering?',
          'B.Tech vs B.Sc — choose using these 3 questions.',
          'If every course sounds confusing, do this first.',
          'Answer 3 questions and narrow your course choice.',
          'Find your course: start here.',
          'Not interested in engineering? Explore these career pathways.',
          'What can you study after choosing Commerce in +2?',
          'Science students: 5 career directions beyond medicine.',
          'Can Arts students enter the technology industry?',
          'Which degree matches your interests, not just your marks?',
          'What is the difference between a degree and a career?',
          '3 questions to ask before choosing a professional course.',
          'What if you choose the wrong course after +2?',
          'Can you change your career path after graduation?',
          'What do students misunderstand about career opportunities?',
          'Diploma, degree, or skill-based learning: what is the difference?',
          'What should you learn alongside your college degree?',
        ],
      },
      {
        name: 'B. AI, Technology & Future Careers',
        ideas: [
          'AI is not just coding — here are 4 roles.',
          'AI careers beyond becoming a software developer.',
          'What is VLSI, and why does it matter in modern technology?',
          'Do you need to study Computer Science to work with AI?',
          'How do chips power the technology we use every day?',
          '4 emerging technology roles students should explore.',
          'What is the difference between AI, ML, and data science?',
          'Can electronics students build careers in semiconductor technology?',
          'What skills will help you prepare for an AI-driven workplace?',
          'Engineering branches explained: which problems do they solve?',
          'What is high-performance computing, and where is it used?',
          'Is coding the only skill needed for a technology career?',
          'How can students start exploring AI before college?',
        ],
      },
      {
        name: 'C. College Selection & Admissions',
        ideas: [
          'How do I know this college is worth it?',
          'What should I compare before choosing a college?',
          'Before choosing a college, parents should check these 5 things.',
          'Don\'t compare colleges using only these 3 things.',
          'What makes a campus feel safe and student-ready?',
          'A faculty member answers a parent’s biggest question.',
          'What should real proof from a university look like?',
          'What should you look for during a campus visit?',
          'College fees: what should students and parents understand?',
          'How do you check whether a university offers the course you need?',
          'Placement statistics: what questions should you ask?',
          'How can you compare two colleges fairly?',
          'What is the difference between accreditation and affiliation?',
          'Why should students explore the curriculum before joining?',
          'Hostel or day scholar: what factors should you consider?',
          'How do internships help you explore a career?',
          'What questions should you ask during an admission enquiry?',
          'How do you identify misleading college promises?',
          'Before paying college fees, what should you verify?',
        ],
      },
      {
        name: 'D. Parents & Student Guidance',
        ideas: [
          '5 questions parents should ask before applying.',
          'How to take the next step without overthinking it.',
          'What an alumnus wishes they knew at +2.',
          'How do you support your child\'s course decision?',
          'What if your interests differ from your parents\' expectations?',
          'Marks are not the only factor in choosing a career.',
          'How do you discuss college expenses with your family?',
          'What should first-generation college students know?',
          'How can parents help students handle college anxiety?',
          'What should students prepare before their first college day?',
          'How do you ask for help when you are confused about your future?',
          'What does a supportive college environment look like?',
          'How can students make the most of their first semester?',
          'What should you do if your friends choose a different course?',
          'How do you build confidence before entering college?',
        ],
      },
      {
        name: 'E. District-Focused Guidance',
        ideas: [
          'Students from Kanyakumari: what should you check?',
          'From Tirunelveli / Kanyakumari to college: what students actually want to know.',
          'Students from Tirunelveli: why campus choice matters.',
          'Kanyakumari students: what should you explore before choosing a university?',
          'Tirunelveli students: 5 questions to ask during a campus visit.',
          'Nagercoil students: what should you know before joining college?',
          'Thoothukudi students: how do you compare courses and campuses?',
          'From your hometown to university: what changes after +2?',
          'Students from South Tamil Nadu: what are your biggest college questions?',
          'What do students in South Tamil Nadu look for in a university?',
          'Parents from South Tamil Nadu: what should you verify before admission?',
          'Can students explore new career paths without leaving South Tamil Nadu?',
        ],
      },
    ],
  },
  {
    id: 'Funny',
    name: '2. Funny',
    badge: 'Relatable & Entertaining (40 Titles)',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    badgeBorder: 'border-purple-200',
    icon: Smile,
    description: 'Student relatable moments, hilarious POVs & entertaining campus humor',
    subcategories: [
      {
        name: 'A. +2 & Career Confusion',
        ideas: [
          'POV: Your first day after +2.',
          'The night before joining college: what you actually worry about.',
          'POV: Everyone asks what you are going to study after +2.',
          'When you say you are still thinking about your course choice.',
          'Parents: Choose a course. Me: Let me search one more time.',
          'POV: Your friend has already decided their career.',
          'When your relatives ask about your college plans.',
          'The difference between what you imagined college would be and reality.',
          'When your parents compare your college plans with your cousin\'s.',
          'POV: You open the course list and see 100 options.',
          'When you tell your friend you are joining college and they ask which branch.',
          'The first time someone asks you to introduce yourself in college.',
          'When everyone thinks engineering means only coding.',
          'POV: You chose a course and everyone has an opinion.',
          'When your friend says every degree has the same career path.',
          'The difference between a course brochure and your first class.',
          'When you say you want to explore your options and get 10 career suggestions.',
          'POV: Your family discovers a new career on social media.',
          'When your friend chooses a course because the name sounds cool.',
          'Trying to explain your course to a relative who has never heard of it.',
          'When someone asks about your future salary before you start college.',
          'POV: You select a course after watching one five-minute video.',
        ],
      },
      {
        name: 'B. Campus & Student Situations',
        ideas: [
          'POV: The professor says, "This is very easy."',
          'When your attendance is safe until you check the percentage.',
          'First day of college: Expectations vs reality.',
          'When your group assignment has one person doing all the work.',
          'POV: You arrive early and the classroom is empty.',
          'When your friend says, "Let\'s study tomorrow."',
          'The different types of students during an internal exam.',
          'When your parents ask how college was and you say "Fine."',
          'POV: You have an assignment due tomorrow.',
          'When the timetable changes and nobody tells you.',
          'The student who knows every shortcut around campus.',
          'When the exam question looks completely unfamiliar.',
          'When your friend says, "I\'ll explain it later."',
          'The student who asks, "Is this important for the exam?"',
          'When your alarm rings on the first day of college.',
          'POV: You enter the wrong classroom with full confidence.',
          'When the lecturer asks a question right after you stop paying attention.',
          'The group project meeting that becomes a food break.',
        ],
      },
    ],
  },
  {
    id: 'Trendy',
    name: '3. Trendy',
    badge: 'Experience & Engagement (55 Titles)',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-200',
    icon: Flame,
    description: 'Fast hooks, interactive challenges, campus speed runs & student stories',
    subcategories: [
      {
        name: 'A. Campus Experience',
        ideas: [
          '24 hours of college life in 30 seconds.',
          'Campus speed run: 5 stops in 15 seconds.',
          'A campus tour, but every stop has a surprise.',
          'Follow a student through one complete college day.',
          'The fastest tour of our campus: ready?',
          'What can you discover in 60 seconds around campus?',
          'Student vs faculty: who knows the campus better?',
          'Campus scavenger hunt: can you find all 5 locations?',
          'A day in the life of a first-year student.',
          'One question, five students, five different answers.',
          'Campus sounds: identify the location.',
          'POV: You just entered Joy University.',
          'A complete campus experience using only transitions.',
          'From classroom to lab: follow the learning journey.',
          'The 30-second university challenge.',
        ],
      },
      {
        name: 'B. Challenges & Interactive Reels',
        ideas: [
          'Lab challenge: can you guess the result?',
          'Can you guess the course from these 3 clues?',
          'Identify the lab equipment before the timer ends.',
          'Guess the career from the skill.',
          'Students answer: this or that?',
          'Can you solve this problem before the reveal?',
          'Faculty vs student: who answers faster?',
          'Guess the department from a close-up shot.',
          'Choose your course based on these 3 situations.',
          'Finish the sentence: After +2, I want to…',
          'Can you identify this technology in 10 seconds?',
          'One question. Three students. What would you choose?',
          'Comment your answer before watching the explanation.',
          'The 15-second challenge: show your department.',
          'One object, five courses: how is it used?',
          'Match the skill to the career in rapid-fire mode.',
          'What happens inside this lab? Watch the process.',
        ],
      },
      {
        name: 'C. Student Voices & Stories',
        ideas: [
          'One student, one honest reason they chose Joy.',
          'Why did you choose this course? One student, one answer.',
          'Ask a final-year student: what should freshers know?',
          'Students describe their department in 3 words.',
          'The one thing I wish I knew before joining college.',
          'What does your first month at university actually look like?',
          'Ask an alumnus: what skill helped you after graduation?',
          'Students share their biggest first-year learning.',
          'From +2 to university: one student\'s transition.',
          'What is one thing you would tell your younger self?',
          'A faculty member answers a parent’s biggest question.',
          'Rapid-fire: admissions questions answered.',
          'Ask a Joy faculty member anything about this course.',
        ],
      },
      {
        name: 'D. Visual & Fast-Paced Concepts',
        ideas: [
          'A course explained through 5 cinematic shots.',
          'One question, five departments: how do they answer?',
          'A visual guide to a day of practical learning.',
          'Before and after: a student\'s first day on campus.',
          'A complete department tour in 30 seconds.',
          'What can you learn from one day in the laboratory?',
          'Three students, three career goals.',
          'The campus transition challenge.',
          'Show your department using only five shots.',
          'One skill, three careers, one fast-paced reel.',
        ],
      },
    ],
  },
];

export const IdeasView: React.FC<IdeasViewProps> = ({ onSelectIdea, onNavigateToCreate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const query = searchQuery.trim().toLowerCase();

  const filteredCategories = CATEGORIZED_IDEAS.map((cat) => {
    const matchingSubcats = cat.subcategories
      .map((sub) => {
        const matchingIdeas = sub.ideas.filter((idea) =>
          idea.toLowerCase().includes(query)
        );
        return { ...sub, ideas: matchingIdeas };
      })
      .filter((sub) => sub.ideas.length > 0);

    return { ...cat, subcategories: matchingSubcats };
  }).filter(
    (cat) =>
      (selectedCat === 'all' || cat.id === selectedCat) &&
      cat.subcategories.length > 0
  );

  const totalFilteredCount = filteredCategories.reduce(
    (acc, cat) => acc + cat.subcategories.reduce((sAcc, sub) => sAcc + sub.ideas.length, 0),
    0
  );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Navigation & Action */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onNavigateToCreate}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
            180 Verified Reel Ideas
          </span>
        </div>
      </div>

      {/* Header & Filter Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-7 mb-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-100/80 text-amber-800 border border-amber-200 shadow-2xs">
              <Lightbulb className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block mb-0.5">
                Joy University • Creative Bank
              </span>
              <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                Combined Reel Title Library
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Classified into Informative, Funny, and Trendy ideas. Click any topic to auto-fill & generate immediately!
              </p>
            </div>
          </div>
        </div>

        {/* Search & Classification Filter Pills */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 180 reel ideas..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 text-stone-900 placeholder:text-stone-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Classification Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCat === 'all'
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-stone-200'
              }`}
            >
              All Types (180)
            </button>
            {CATEGORIZED_IDEAS.map((cat) => {
              const catTotal = cat.subcategories.reduce((acc, sub) => acc + sub.ideas.length, 0);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCat === cat.id
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 border border-stone-200'
                  }`}
                >
                  {cat.id} ({catTotal})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Categories & Titles Grid */}
      <div className="space-y-10">
        {totalFilteredCount === 0 ? (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-500">
            <Sparkles className="w-9 h-9 text-stone-300 mx-auto mb-2" />
            <p className="text-base font-bold text-stone-800">No ideas found matching "{searchQuery}"</p>
            <p className="text-xs text-stone-400 mt-1">Try searching for different keywords or clear your search query.</p>
          </div>
        ) : (
          filteredCategories.map((cat) => {
            const IconComp = cat.icon;
            const categoryIdeaCount = cat.subcategories.reduce((acc, sub) => acc + sub.ideas.length, 0);

            return (
              <div key={cat.id} className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-6">
                {/* Category Main Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-stone-100 text-stone-800 border border-stone-200">
                      <IconComp className="w-5 h-5 text-stone-800" />
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-stone-900 leading-tight">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-stone-500 mt-0.5">{cat.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg border ${cat.badgeBg} ${cat.badgeText} ${cat.badgeBorder}`}>
                    {categoryIdeaCount} Titles
                  </span>
                </div>

                {/* Subcategories */}
                <div className="space-y-7">
                  {cat.subcategories.map((subcat) => (
                    <div key={subcat.name} className="space-y-3.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-stone-700 uppercase tracking-wide">
                        <Layers className="w-3.5 h-3.5 text-stone-400" />
                        <span>{subcat.name}</span>
                        <span className="text-[10px] font-mono font-semibold text-stone-400 px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
                          {subcat.ideas.length}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {subcat.ideas.map((idea) => (
                          <button
                            key={idea}
                            onClick={() => onSelectIdea(idea, cat.id)}
                            className="group flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-white hover:bg-amber-50/70 hover:border-amber-300 text-left transition-all duration-150 shadow-2xs hover:shadow-xs active:scale-[0.99] cursor-pointer"
                          >
                            <span className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-amber-950 leading-snug pr-3">
                              {idea}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-amber-600 group-hover:text-white text-stone-400 flex items-center justify-center flex-shrink-0 transition-colors shadow-2xs">
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
