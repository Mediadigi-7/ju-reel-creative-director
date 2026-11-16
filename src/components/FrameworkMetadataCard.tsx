import React from 'react';
import { FrameworkMetadata } from '../../shared/types.js';

interface FrameworkMetadataCardProps {
  metadata?: FrameworkMetadata;
  creativeDirection?: string;
}

const STAGES = [
  {
    number: '01',
    label: 'HOOK',
    description: 'How the reel grabs attention',
    field: 'hookStatement' as keyof FrameworkMetadata,
    accentColor: 'text-amber-600',
    dotColor: 'bg-amber-500',
    borderColor: 'border-l-amber-400',
    fallback: 'Opening hook not yet generated.',
  },
  {
    number: '02',
    label: 'PROBLEM',
    description: 'What makes the viewer relate',
    field: 'problemStatement' as keyof FrameworkMetadata,
    accentColor: 'text-blue-600',
    dotColor: 'bg-blue-500',
    borderColor: 'border-l-blue-400',
    fallback: 'Problem setup not yet generated.',
  },
  {
    number: '03',
    label: 'PATTERN INTERRUPT',
    description: 'How attention is reset',
    field: 'patternInterruptStatement' as keyof FrameworkMetadata,
    accentColor: 'text-purple-600',
    dotColor: 'bg-purple-500',
    borderColor: 'border-l-purple-400',
    fallback: 'Pattern interrupt not yet generated.',
  },
  {
    number: '04',
    label: 'VALUE',
    description: 'What the viewer gets',
    field: 'valueStatement' as keyof FrameworkMetadata,
    accentColor: 'text-emerald-600',
    dotColor: 'bg-emerald-500',
    borderColor: 'border-l-emerald-400',
    fallback: 'Value content not yet generated.',
  },
  {
    number: '05',
    label: 'PAYOFF',
    description: 'How the story resolves',
    field: 'payoffStatement' as keyof FrameworkMetadata,
    accentColor: 'text-indigo-600',
    dotColor: 'bg-indigo-500',
    borderColor: 'border-l-indigo-400',
    fallback: 'Payoff resolution not yet generated.',
  },
  {
    number: '06',
    label: 'CTA',
    description: 'What the viewer should do next',
    field: 'ctaStatement' as keyof FrameworkMetadata,
    accentColor: 'text-rose-600',
    dotColor: 'bg-rose-500',
    borderColor: 'border-l-rose-400',
    fallback: 'CTA not yet generated.',
  },
];

const TYPE_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  Informative: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Funny:       { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Trendy:      { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
};

export const FrameworkMetadataCard: React.FC<FrameworkMetadataCardProps> = ({
  metadata,
  creativeDirection,
}) => {
  const cType = metadata?.creativeType || (creativeDirection as string) || 'Informative';
  const badge = TYPE_BADGE[cType] || TYPE_BADGE.Informative;

  // Check if we have any real blueprint content to show
  const hasContent = metadata && (
    metadata.hookStatement ||
    metadata.problemStatement ||
    metadata.patternInterruptStatement ||
    metadata.valueStatement ||
    metadata.payoffStatement ||
    metadata.ctaStatement
  );

  if (!hasContent) return null;

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
            Reel Blueprint
          </span>
          <span className="text-stone-300 text-xs">—</span>
          <span className="text-xs text-stone-500 font-medium">
            Narrative notes — functions may combine or move
          </span>
        </div>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}
        >
          {cType}
        </span>
      </div>

      {/* Blueprint Grid */}
      <div className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-2xs divide-y divide-stone-100">
        {STAGES.filter(stage => typeof metadata?.[stage.field] === 'string' && String(metadata[stage.field]).trim()).map((stage) => {
          const content = metadata?.[stage.field];
          const displayContent = (typeof content === 'string' && content.trim())
            ? content.trim()
            : stage.fallback;
          const isEmpty = displayContent === stage.fallback;

          return (
            <div
              key={stage.number}
              className={`flex items-start gap-4 px-5 py-4 border-l-[3px] ${stage.borderColor} hover:bg-stone-50/60 transition-colors`}
            >
              {/* Stage number + dot */}
              <div className="flex flex-col items-center gap-1.5 pt-0.5 flex-shrink-0 w-8">
                <span className={`text-[10px] font-black tracking-widest ${stage.accentColor}`}>
                  {stage.number}
                </span>
                <div className={`w-1.5 h-1.5 rounded-full ${stage.dotColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-800">
                    {stage.label}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium hidden sm:inline">
                    {stage.description}
                  </span>
                </div>
                <p className={`text-sm font-medium leading-relaxed ${isEmpty ? 'text-stone-300 italic' : 'text-stone-700'}`}>
                  {displayContent}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
