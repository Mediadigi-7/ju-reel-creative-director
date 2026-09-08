import React from 'react';
import { Target, ShieldCheck } from 'lucide-react';
import { CreativeSummary } from '../../shared/types.js';
import { JOY_UNIVERSITY_VERIFIED_FACTS } from '../../shared/knowledgeBase.js';

interface CreativeSummaryCardProps {
  summary: CreativeSummary;
}

export const CreativeSummaryCard: React.FC<CreativeSummaryCardProps> = ({ summary }) => {
  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 mb-6">
      <div className="pb-4 mb-5 border-b border-stone-100">
        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-0.5">
          Execution Direction
        </span>
        <h2 className="text-base font-bold text-stone-900 tracking-tight">
          Shooting Priorities & Verification
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Shooting Priorities — Target */}
        <div>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-3">
            <Target className="w-3 h-3 text-stone-400 flex-shrink-0" />
            <span>Top Videographer Focus</span>
          </span>
          <ol className="space-y-3">
            {summary.shootingPriority.map((priority, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <span className="flex-shrink-0 font-mono text-xs font-bold text-stone-400 mt-0.5">
                  0{idx + 1}
                </span>
                <span className="leading-relaxed">{priority}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Fact-Safety & Institutional Baseline — ShieldCheck */}
        <div className="flex flex-col justify-between border-t md:border-t-0 md:border-l border-stone-100 md:pl-8 pt-4 md:pt-0">
          <div>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              <ShieldCheck className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Institutional Baseline Verification</span>
            </span>
            <p className="text-xs text-stone-600 leading-relaxed">
              All narrative elements comply strictly with verified institutional facts:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-stone-600 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-stone-400 rounded-full" />
                <span>{JOY_UNIVERSITY_VERIFIED_FACTS.institution} — {JOY_UNIVERSITY_VERIFIED_FACTS.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-stone-400 rounded-full" />
                <span>{JOY_UNIVERSITY_VERIFIED_FACTS.campusSize} · {JOY_UNIVERSITY_VERIFIED_FACTS.legacyYears}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-stone-400 rounded-full" />
                <span>{JOY_UNIVERSITY_VERIFIED_FACTS.recognition} · AISHE: {JOY_UNIVERSITY_VERIFIED_FACTS.aisheCode}</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100">
            <span className="text-[11px] text-stone-400 font-normal">
              Confidence standard: Zero fabricated placement statistics or salary claims.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
