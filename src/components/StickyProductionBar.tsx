import React from 'react';
import { RotateCw, Download, Bookmark, Copy, Check } from 'lucide-react';
import { ReelStoryboard } from '../../shared/types.js';
import { formatProductionBriefing } from '../services/copyUtils.js';

interface StickyProductionBarProps {
  reel: ReelStoryboard;
  onRegenerateEntire: () => void;
  onExportPdf: () => void;
  onSave: () => void;
  isRegenerating: boolean;
  isSaved: boolean;
}

const SHOT_ANCHORS = [
  { num: 1, label: 'Hook' },
  { num: 2, label: 'Problem' },
  { num: 3, label: 'Interrupt' },
  { num: 4, label: 'Value' },
  { num: 5, label: 'Payoff' },
  { num: 6, label: 'CTA' },
];

export const StickyProductionBar: React.FC<StickyProductionBarProps> = ({
  reel,
  onRegenerateEntire,
  onExportPdf,
  onSave,
  isRegenerating,
  isSaved,
}) => {
  const [copied, setCopied] = React.useState(false);

  const scrollToShot = (shotNum: number) => {
    const el = document.getElementById(`shot-${shotNum}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyBrief = () => {
    const text = formatProductionBriefing(reel);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside aria-label="Production quick controls" className="fixed bottom-0 inset-x-0 z-20 bg-white/95 backdrop-blur-sm border-t border-stone-200 py-2.5 px-4 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Title & Version */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded flex-shrink-0">
            v{reel.version || 1}.0
          </span>
          <span className="text-xs font-semibold text-stone-900 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
            {reel.reelTitle}
          </span>
        </div>

        {/* Center: Shot Navigation Index Anchors (01-06) */}
        <nav aria-label="Shot navigation index" className="hidden md:flex items-center gap-1 text-xs">
          {SHOT_ANCHORS.map((anchor) => (
            <button
              key={anchor.num}
              onClick={() => scrollToShot(anchor.num)}
              className="px-2 py-1 rounded text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors flex items-center gap-1 font-mono text-[11px]"
              title={`Jump to Shot 0${anchor.num}: ${anchor.label}`}
            >
              <span className="font-bold text-stone-700">0{anchor.num}</span>
              <span className="font-sans text-stone-500">{anchor.label}</span>
            </button>
          ))}
        </nav>

        {/* Right: Discreet Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleCopyBrief}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Copy Production Briefing text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Brief'}</span>
          </button>

          <button
            onClick={onExportPdf}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={onRegenerateEntire}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold text-white bg-[#AF1E2A] hover:bg-[#8B1721] transition-colors disabled:opacity-40"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating…' : 'Regenerate'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
