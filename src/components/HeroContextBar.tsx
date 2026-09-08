import React, { useState, useRef, useEffect } from 'react';
import { Settings, Check, ChevronDown } from 'lucide-react';
import { CreativeDirection, LanguageOption } from '../../shared/types.js';
import { CREATIVE_DIRECTIONS } from '../../shared/knowledgeBase.js';

interface HeroContextBarProps {
  objective: string;
  currentTone: CreativeDirection;
  currentLanguage: LanguageOption;
  currentDuration: string;
  onShiftTone: (tone: CreativeDirection) => void;
  onShiftLanguage: (lang: LanguageOption) => void;
  onShiftDuration: (duration: string) => void;
  isLoading: boolean;
}

const LANGUAGES: LanguageOption[] = ['English', 'Tanglish', 'Tamil'];
const DURATIONS = ['20s (Fast)', '28s (Standard)', '45s (Deep Dive)'];

export const HeroContextBar: React.FC<HeroContextBarProps> = ({
  objective,
  currentTone,
  currentLanguage,
  currentDuration,
  onShiftTone,
  onShiftLanguage,
  onShiftDuration,
  isLoading,
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative mb-6">
      <div className="bg-stone-100/80 border border-stone-200/80 rounded-lg px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
        {/* Left: Objective text */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-semibold text-stone-900 flex-shrink-0">Objective:</span>
          <span className="text-stone-600 truncate font-normal">
            {objective || '6-step decision breakdown — no fluff, just what matters.'}
          </span>
        </div>

        {/* Right: Small gear icon button to reveal settings popover */}
        <div ref={settingsRef} className="relative flex-shrink-0">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`p-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              settingsOpen
                ? 'bg-stone-200 text-stone-900'
                : 'text-stone-400 hover:text-stone-700 hover:bg-stone-200/60'
            }`}
            title="Adjust Tone & Language"
            aria-label="Adjust Tone & Language"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium text-stone-500 hidden sm:inline">Settings</span>
          </button>

          {/* Popover Settings Menu */}
          {settingsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-stone-200 shadow-xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Storyboard Parameters
                </span>
                <span className="text-[10px] text-stone-400">Click outside to close</span>
              </div>

              {/* Tone */}
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Creative Tone
                </label>
                <select
                  value={currentTone}
                  onChange={(e) => onShiftTone(e.target.value as CreativeDirection)}
                  disabled={isLoading}
                  className="w-full px-2.5 py-1.5 text-xs rounded-md border border-stone-200 bg-stone-50/50 text-stone-800 font-medium focus:outline-none focus:border-[#8B1721]"
                >
                  {CREATIVE_DIRECTIONS.map((dir) => (
                    <option key={dir} value={dir}>{dir}</option>
                  ))}
                </select>
              </div>

              {/* Language */}
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Spoken Language
                </label>
                <select
                  value={currentLanguage}
                  onChange={(e) => onShiftLanguage(e.target.value as LanguageOption)}
                  disabled={isLoading}
                  className="w-full px-2.5 py-1.5 text-xs rounded-md border border-stone-200 bg-stone-50/50 text-stone-800 font-medium focus:outline-none focus:border-[#8B1721]"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Target Duration */}
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Target Duration
                </label>
                <select
                  value={currentDuration}
                  onChange={(e) => onShiftDuration(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-2.5 py-1.5 text-xs rounded-md border border-stone-200 bg-stone-50/50 text-stone-800 font-medium focus:outline-none focus:border-[#8B1721]"
                >
                  {DURATIONS.map((dur) => (
                    <option key={dur} value={dur}>{dur}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
