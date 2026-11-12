import { CHANNEL_NAMES, CHANNEL_STRATEGIES, type ContentChannel } from '../../shared/channels.js';
import { OFFLINE_IDEAS, OFFLINE_SAMPLE_CHANNELS, matchOfflineIdea, supportsOffline, OFFLINE_CHANNEL_UNSUPPORTED } from '../../shared/offline/index.js';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronDown, Check, Sparkles, AlertCircle, Key } from 'lucide-react';
import { CREATIVE_DIRECTIONS } from '../../shared/knowledgeBase.js';
import { CreativeTreatment, LanguageOption } from '../../shared/types.js';

interface ReelTitleInputProps {
  onGenerate: (title: string, direction: CreativeTreatment, language: LanguageOption, channel?: ContentChannel) => void;
  isLoading: boolean;
  hasApiKey?: boolean;
  onOpenSettings?: () => void;
}

const TESTED_IDEAS = OFFLINE_IDEAS.map(idea => idea.title);

interface LanguageSelectOption {
  id: LanguageOption;
  label: string;
  nativeLabel: string;
}

const LANGUAGE_OPTIONS: LanguageSelectOption[] = [
  { id: 'English', label: 'English', nativeLabel: 'English' },
  { id: 'Tamil', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { id: 'Telugu', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { id: 'Malayalam', label: 'Malayalam', nativeLabel: 'മലയാളം' },
  { id: 'Hindi', label: 'Hindi', nativeLabel: 'हिन्दी' },
];

export const ReelTitleInput: React.FC<ReelTitleInputProps> = ({
  onGenerate,
  isLoading,
  hasApiKey = false,
  onOpenSettings,
}) => {
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState<ContentChannel>('Connection');
  const [direction, setDirection] = useState<CreativeTreatment>('Auto');
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
    if (isLoading) return; // Prevent duplicate generation requests
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError('Please enter a reel idea to continue.');
      inputRef.current?.focus();
      return;
    }

    // If user enters a custom topic (not one of the 6 tested sample ideas) and has no API key:
    if (!hasApiKey && !supportsOffline(cleanTitle, language)) {
      setError(
        'Connect an AI provider to create a reel from your own idea, or choose a sample below to try an offline template.'
      );
      if (onOpenSettings) {
        onOpenSettings();
      }
      return;
    }

    const offlineIdea = matchOfflineIdea(cleanTitle);
    if (!hasApiKey && offlineIdea && OFFLINE_SAMPLE_CHANNELS[offlineIdea.id] !== channel) {
      setError(OFFLINE_CHANNEL_UNSUPPORTED);
      return;
    }
    setError(null);
    setToneMenuOpen(false);
    setLangMenuOpen(false);
    onGenerate(cleanTitle, direction, language, channel);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isLoading) return; // Guard against multiple Enter presses
      handleSubmit();
    }
  };

  const handleChipClick = (idea: string) => {
    if (isLoading) return;
    setTitle(idea);
    const sample = matchOfflineIdea(idea);
    if (sample) setChannel(OFFLINE_SAMPLE_CHANNELS[sample.id]);
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
          Turn an idea into a story-led shooting plan with dialogue, visuals, and camera directions. Edit the draft, save it, then export your shooting plan.
        </p>
      </div>

      <p className="mb-4 text-sm text-stone-600">
        {hasApiKey ? 'AI configured. Enter your idea below.' : 'Try a sample without an API key, or connect AI for your own ideas.'}
        {!hasApiKey && onOpenSettings && <button type="button" onClick={onOpenSettings} className="ml-2 font-semibold text-[#8c1618] underline underline-offset-4">Connect AI</button>}
      </p>
      <fieldset className="w-full mb-5 text-left">
        <legend className="mb-2 text-sm font-semibold text-stone-700">Channel goal</legend>
        <div className="flex flex-wrap gap-2">
          {CHANNEL_NAMES.map(name => <button key={name} type="button" aria-pressed={channel === name} disabled={isLoading} onClick={() => setChannel(name)} className={`px-4 py-2 rounded-lg text-sm border ${channel === name ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-700 border-stone-200'}`}>{name}</button>)}
        </div>
        <p className="mt-2 text-xs text-stone-500">{CHANNEL_STRATEGIES[channel].goal}</p>
      </fieldset>
      {/* 2. Central Search Input Bar */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <label htmlFor="reel-title-input" className="self-start mb-2 text-sm font-semibold text-stone-700">What is your reel about?</label>
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
              className="w-full py-4 pl-6 pr-6 sm:py-4.5 sm:pl-7 sm:pr-7 text-base sm:text-lg text-[#1F1F1F] placeholder-[#9AA0A6] bg-transparent outline-none rounded-full font-medium"
            />


          </div>

          {error && (
            <div className="mt-3.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left w-full shadow-xs animate-fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium text-amber-900 leading-snug">{error}</span>
              </div>
              {onOpenSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex-shrink-0 transition-colors shadow-xs cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Connect AI</span>
                </button>
              )}
            </div>
          )}
        </div>

        <button type="submit" disabled={isLoading || !title.trim()} className="mt-4 w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-[#8c1618] text-white font-semibold hover:bg-[#731214] disabled:opacity-40 disabled:cursor-not-allowed">
          {isLoading ? 'Creating your reel…' : hasApiKey ? 'Create reel' : 'Try sample reel'}
          <ArrowRight className="w-4 h-4" />
        </button>

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
              <span className="text-[#70757A] font-normal">Style:</span>
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
                {(['Auto', ...CREATIVE_DIRECTIONS] as const).map((tone) => {
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
                      <span>{tone === 'Auto' ? 'Let AI choose' : tone}</span>
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
              <span className="text-[#70757A] font-normal">Language:</span>
              <span className="font-semibold text-[#1F1F1F]">
                {LANGUAGE_OPTIONS.find((l) => l.id === language)?.nativeLabel || language}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#70757A] transition-transform duration-200 ${
                  langMenuOpen ? 'rotate-180 text-[#8c1618]' : ''
                }`}
              />
            </button>

            {langMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-2xl border border-[#E0E0E0] shadow-xl z-50 py-1.5 text-left animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#70757A] border-b border-stone-100">
                  Select Spoken Language
                </div>
                {LANGUAGE_OPTIONS.map((item) => {
                  const isSelected = item.id === language;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setLanguage(item.id);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-xs sm:text-[13px] flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-[#FDF2F3] text-[#8c1618] font-semibold'
                          : 'text-[#3C4043] hover:bg-[#F1F3F4] font-medium'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-semibold">{item.nativeLabel}</span>
                        <span className="text-[11px] text-[#70757A]">({item.label})</span>
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#8c1618]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </form>

      {/* 4. Prompt Suggestion Chips ("Choose an offline sample") */}
      <div className="mt-12 sm:mt-14 w-full flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#8c1618]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#70757A]">
            Choose an offline sample
          </span>
          {!hasApiKey && (
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Offline templates
            </span>
          )}
        </div>

        <p className="mb-3 text-xs text-stone-500">Each fixed sample selects its matching channel goal.</p>
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

