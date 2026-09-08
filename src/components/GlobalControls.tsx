import React from 'react';
import { Target, Mic, Clock } from 'lucide-react';
import { CreativeDirection, LanguageOption } from '../../shared/types.js';
import { CREATIVE_DIRECTIONS } from '../../shared/knowledgeBase.js';

interface GlobalControlsProps {
  currentDirection: CreativeDirection;
  currentLanguage: LanguageOption;
  currentDuration: string;
  onShiftTone: (direction: CreativeDirection) => void;
  onShiftLanguage: (language: LanguageOption) => void;
  onShiftDuration: (duration: string) => void;
  isLoading: boolean;
}

export const GlobalControls: React.FC<GlobalControlsProps> = ({
  currentDirection,
  currentLanguage,
  currentDuration,
  onShiftTone,
  onShiftLanguage,
  onShiftDuration,
  isLoading,
}) => {
  return (
    <div className="bg-white border border-stone-200 rounded-lg p-4 sm:p-5 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-0.5">
            Storyboard Parameters
          </span>
          <span className="text-xs text-stone-600 font-medium">
            Fine-tune delivery tone, spoken language, or target duration
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Tone — Target */}
          <div className="flex items-center gap-1.5">
            <label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              <Target className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Tone</span>
            </label>
            <select
              value={currentDirection}
              onChange={(e) => onShiftTone(e.target.value as CreativeDirection)}
              disabled={isLoading}
              className="text-xs px-2.5 py-1.5 rounded border border-stone-200 bg-white text-stone-800 font-medium focus:outline-none focus:border-stone-400"
            >
              {CREATIVE_DIRECTIONS.map((dir) => (
                <option key={dir} value={dir}>
                  {dir}
                </option>
              ))}
            </select>
          </div>

          {/* Language — Mic */}
          <div className="flex items-center gap-1.5">
            <label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              <Mic className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Language</span>
            </label>
            <select
              value={currentLanguage}
              onChange={(e) => onShiftLanguage(e.target.value as LanguageOption)}
              disabled={isLoading}
              className="text-xs px-2.5 py-1.5 rounded border border-stone-200 bg-white text-stone-800 font-medium focus:outline-none focus:border-stone-400"
            >
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Hindi">Hindi</option>
              <option value="Tanglish">Tanglish</option>
            </select>
          </div>

          {/* Duration — Clock */}
          <div className="flex items-center gap-1.5">
            <label className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
              <Clock className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Duration</span>
            </label>
            <select
              value={currentDuration}
              onChange={(e) => onShiftDuration(e.target.value)}
              disabled={isLoading}
              className="text-xs px-2.5 py-1.5 rounded border border-stone-200 bg-white text-stone-800 font-medium focus:outline-none focus:border-stone-400"
            >
              <option value="20 sec">20s (Fast)</option>
              <option value="28 sec">28s (Standard)</option>
              <option value="35 sec">35s (Expanded)</option>
              <option value="45 sec">45s (Deep)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
