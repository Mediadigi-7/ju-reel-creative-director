import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronDown, Check, Sparkles } from 'lucide-react';
import { CREATIVE_DIRECTIONS } from '../../shared/knowledgeBase.js';
import { CreativeDirection, LanguageOption } from '../../shared/types.js';

interface ReelTitleInputProps {
  onGenerate: (title: string, direction: CreativeDirection, language: LanguageOption) => void;
  isLoading: boolean;
}

const TESTED_IDEAS: string[] = [
  'I finished +2... now what?',
  '3 mistakes students make after +2',
  'Engineering is not for everyone',
  'What should I study after Commerce?',
  'AI will change these careers',
  'How do I choose the right college?',
];

const LANGUAGE_OPTIONS: LanguageOption[] = ['English', 'Tamil', 'Telugu', 'Malayalam', 'Hindi', 'Tanglish'];

export const ReelTitleInput: React.FC<ReelTitleInputProps> = ({ onGenerate, isLoading }) => {
  const [title, setTitle] = useState('');
  const [direction, setDirection] = useState<CreativeDirection>('Student Relatable');
  const [language, setLanguage] = useState<LanguageOption>('English');
  const [error, setError] = useState<string | null>(null);

  // Dropdown menus state
  const [toneMenuOpen, setToneMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const toneRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toneRef.current && !toneRef.current.contains(e.target as Node)) {
        setToneMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError('Please enter a reel idea to continue.');
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setToneMenuOpen(false);
    setLangMenuOpen(false);
    onGenerate(cleanTitle, direction, language);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChipClick = (idea: string) => {
    setTitle(idea);
    setError(null);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 flex flex-col items-center text-center">
      {/* 1. Header & Title (Centered) */}
      <div className="mb-8 sm:mb-10 w-full flex flex-col items-center">
        {/* Eyebrow label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-stone-100/90 border border-[#E3E3E3]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8c1618]" />
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5F6368]">
            Joy University • Reel Creative Director
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F1F1F] tracking-tight leading-tight sm:leading-tight">
          Enter Your <span className="text-[#8c1618]">Reel Idea</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-[#5F6368] max-w-md font-normal">
          One title → one complete 6-shot production storyboard.
        </p>
      </div>

      {/* 2. Central Search Input Bar */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <div className="w-full relative group">
          <div
            className={`w-full flex items-center bg-white rounded-full border transition-all duration-200 shadow-[0_1px_6px_rgba(32,33,36,0.08)] hover:shadow-[0_2px_12px_rgba(32,33,36,0.12)] ${
              error
                ? 'border-red-400 ring-2 ring-red-100'
                : 'border-[#E0E0E0] focus-within:border-[#8c1618] focus-within:ring-4 focus-within:ring-[#8c1618]/10'
            }`}
          >
            <input
              ref={inputRef}
              id="reel-title-input"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKey}
              disabled={isLoading}
              placeholder='e.g., "What should I study after +2?"'
              autoFocus
              className="w-full py-4 pl-6 pr-14 sm:py-4.5 sm:pl-7 sm:pr-16 text-base sm:text-lg text-[#1F1F1F] placeholder-[#9AA0A6] bg-transparent outline-none rounded-full font-medium"
            />

            {/* Right-aligned Circular Action Button with Brand Color #8c1618 */}
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#8c1618] hover:bg-[#731214] active:scale-95 text-white flex items-center justify-center transition-all duration-150 shadow-sm hover:shadow disabled:opacity-40 disabled:hover:bg-[#8c1618] disabled:cursor-not-allowed flex-shrink-0"
              title="Generate Storyboard"
              aria-label="Generate Storyboard"
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {error && (
            <p className="mt-2 text-xs text-red-600 font-medium text-left pl-6 animate-fade-in">
              {error}
            </p>
          )}
        </div>

        {/* 3. Secondary Options (Tone & Language Low-Profile Pill Dropdowns) */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full">
          {/* Tone Dropdown */}
          <div ref={toneRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setToneMenuOpen(!toneMenuOpen);
                setLangMenuOpen(false);
              }}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-150 border ${
                toneMenuOpen
                  ? 'border-[#8c1618] bg-white text-[#8c1618] shadow-sm ring-2 ring-[#8c1618]/10'
                  : 'border-[#E0E0E0] bg-white text-[#3C4043] hover:border-[#DADCE0] hover:bg-[#F8F9FA] shadow-xs'
              }`}
            >
              <span className="text-[#70757A] font-normal">Creative Tone:</span>
              <span className="font-semibold text-[#1F1F1F]">{direction}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#70757A] transition-transform duration-200 ${
                  toneMenuOpen ? 'rotate-180 text-[#8c1618]' : ''
                }`}
              />
            </button>

            {toneMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 max-h-64 overflow-y-auto bg-white rounded-2xl border border-[#E0E0E0] shadow-xl z-50 py-1.5 text-left animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#70757A] border-b border-stone-100">
                  Select Creative Tone
                </div>
                {CREATIVE_DIRECTIONS.map((tone) => {
                  const isSelected = tone === direction;
                  return (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => {
                        setDirection(tone);
                        setToneMenuOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-xs sm:text-[13px] flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#FDF2F3] text-[#8c1618] font-semibold'
                          : 'text-[#3C4043] hover:bg-[#F1F3F4] font-medium'
                      }`}
                    >
                      <span>{tone}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#8c1618]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Language Dropdown */}
          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setToneMenuOpen(false);
              }}
              disabled={isLoading}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-150 border ${
                langMenuOpen
                  ? 'border-[#8c1618] bg-white text-[#8c1618] shadow-sm ring-2 ring-[#8c1618]/10'
                  : 'border-[#E0E0E0] bg-white text-[#3C4043] hover:border-[#DADCE0] hover:bg-[#F8F9FA] shadow-xs'
              }`}
            >
              <span className="text-[#70757A] font-normal">Spoken Language:</span>
              <span className="font-semibold text-[#1F1F1F]">{language}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#70757A] transition-transform duration-200 ${
                  langMenuOpen ? 'rotate-180 text-[#8c1618]' : ''
                }`}
              />
            </button>

            {langMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-2xl border border-[#E0E0E0] shadow-xl z-50 py-1.5 text-left animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#70757A] border-b border-stone-100">
                  Select Spoken Language
                </div>
                {LANGUAGE_OPTIONS.map((lang) => {
                  const isSelected = lang === language;
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setLanguage(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-xs sm:text-[13px] flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#FDF2F3] text-[#8c1618] font-semibold'
                          : 'text-[#3C4043] hover:bg-[#F1F3F4] font-medium'
                      }`}
                    >
                      <span>{lang}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#8c1618]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </form>

      {/* 4. Prompt Suggestion Chips ("Try a tested idea") */}
      <div className="mt-12 sm:mt-14 w-full flex flex-col items-center">
        <div className="flex items-center gap-1.5 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#8c1618]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#70757A]">
            Try a tested idea
          </span>
        </div>

        {/* Balanced Grid of Chips without truncation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-xl">
          {TESTED_IDEAS.map((idea) => {
            const isCurrent = title.trim().toLowerCase() === idea.trim().toLowerCase();
            return (
              <button
                key={idea}
                type="button"
                onClick={() => handleChipClick(idea)}
                disabled={isLoading}
                className={`w-full px-4 py-2.5 rounded-full text-xs sm:text-[13px] font-medium text-center border transition-all duration-150 leading-snug break-words ${
                  isCurrent
                    ? 'border-[#8c1618] bg-[#FDF2F3] text-[#8c1618] shadow-xs ring-1 ring-[#8c1618]/30 font-semibold'
                    : 'border-[#E8EAED] bg-white text-[#3C4043] hover:text-[#8c1618] hover:bg-[#FDF2F3]/50 hover:border-[#8c1618]/30 shadow-xs active:scale-[0.98]'
                }`}
                title={idea}
              >
                {idea}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

