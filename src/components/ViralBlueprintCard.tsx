import React, { useState } from 'react';
import { 
  Flame, 
  EyeOff, 
  Sparkles, 
  HelpCircle, 
  TrendingUp, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  Clapperboard, 
  ChevronDown, 
  ChevronUp,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { ViralBlueprint } from '../../shared/types.js';

interface ViralBlueprintCardProps {
  blueprint?: ViralBlueprint;
}

export const ViralBlueprintCard: React.FC<ViralBlueprintCardProps> = ({ blueprint }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!blueprint) return null;

  const score = blueprint.viralScore || 90;
  const scoreColor = score >= 90 
    ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
    : score >= 80 
    ? 'text-amber-700 bg-amber-50 border-amber-200' 
    : 'text-stone-700 bg-stone-50 border-stone-200';

  return (
    <div className="bg-white border border-stone-200/90 rounded-xl shadow-sm mb-6 overflow-hidden transition-all">
      {/* Header Bar */}
      <div 
        className="px-5 py-3.5 bg-gradient-to-r from-stone-50 via-white to-amber-50/30 border-b border-stone-200/70 flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 text-[#AF1E2A] flex items-center justify-center font-bold">
            <Flame className="w-4 h-4 text-[#AF1E2A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-900 tracking-tight">Viral Content Blueprint</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                Retention & Virality Engine
              </span>
            </div>
            <p className="text-[11px] text-stone-500 line-clamp-1">
              {blueprint.centralInformationGap || 'Audience tension, progressive reveal, and engagement triggers'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Viral Score Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${scoreColor}`}>
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{score}/100</span>
            <span className="text-[10px] font-normal opacity-80 hidden sm:inline">Viral Score</span>
          </div>

          <button 
            type="button" 
            className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Toggle Viral Blueprint"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-5 sm:p-6 space-y-5">
          {/* Angle Comparison: Obvious Angle Avoided vs Real Hidden Insight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Obvious Angle Avoided */}
            <div className="p-3.5 rounded-lg bg-red-50/40 border border-red-100 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-red-800 mb-1">
                <EyeOff className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span>Obvious Angle Avoided (Zero Fluff)</span>
              </div>
              <p className="text-stone-600 line-through decoration-red-400/60 leading-relaxed">
                {blueprint.obviousAngleAvoided || 'Generic motivational Reel or standard campus brochure recitation.'}
              </p>
            </div>

            {/* Content Surprise / The Fresh Angle */}
            <div className="p-3.5 rounded-lg bg-emerald-50/50 border border-emerald-200 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>The Content Surprise / Counter-Intuitive Twist</span>
              </div>
              <p className="text-stone-800 font-medium leading-relaxed">
                {blueprint.contentSurprise || 'Reframing the problem so students see what they are actually deciding.'}
              </p>
            </div>
          </div>

          {/* Audience Psychological Grounding */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-stone-800 mb-1">
                <HeartHandshake className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                <span>Human Truth</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {blueprint.humanTruth}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200/80 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-stone-800 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                <span>Central Information Gap & Tension</span>
              </div>
              <p className="text-stone-600 leading-relaxed font-medium">
                {blueprint.centralInformationGap}
              </p>
            </div>
          </div>

          {/* 4-Beat Progressive Revelation Sequence */}
          {blueprint.progressiveRevelation && blueprint.progressiveRevelation.length > 0 && (
            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2.5">
                <Layers className="w-3.5 h-3.5 text-stone-400" />
                <span>4-Stage Progressive Revelation (Keeps Viewers Hooked)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {blueprint.progressiveRevelation.map((reveal, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-lg bg-white border border-stone-200 text-xs flex flex-col justify-between hover:border-stone-300 transition-colors"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 font-mono uppercase mb-1">
                        Reveal 0{idx + 1}
                      </div>
                      <p className="text-stone-700 leading-relaxed">
                        {reveal.replace(/^Reveal \d+(\s*\([^)]*\))?:\s*/i, '')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Triggers: Share, Save, Comment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-sky-50/50 border border-sky-100 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-sky-800 mb-1">
                <Share2 className="w-3.5 h-3.5 text-sky-600" />
                <span>Share Trigger</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {blueprint.shareTrigger}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                <Bookmark className="w-3.5 h-3.5 text-amber-600" />
                <span>Save Trigger</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {blueprint.saveTrigger}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-purple-50/50 border border-purple-100 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-purple-800 mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                <span>Comment Trigger</span>
              </div>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {blueprint.commentTrigger}
              </p>
            </div>
          </div>

          {/* Creative Director Instruction */}
          {blueprint.directorInstruction && (
            <div className="pt-2 border-t border-stone-100 flex items-start gap-2.5 text-xs text-stone-600">
              <Clapperboard className="w-4 h-4 text-stone-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-stone-800 mr-1.5">Director's Note:</span>
                <span>{blueprint.directorInstruction}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
