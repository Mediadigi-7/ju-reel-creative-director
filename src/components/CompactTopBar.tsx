import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Share2, Download, RotateCw, Check, Link2, Copy, Bookmark, ChevronDown, Settings } from 'lucide-react';
import { ReelStoryboard } from '../../shared/types.js';

interface CompactTopBarProps {
  reel: ReelStoryboard;
  onBack: () => void;
  onRegenerateAll: () => void;
  onExportPdf: () => void;
  onShareLink: () => void;
  onCopyWhatsApp: () => void;
  onCopyBrief: () => void;
  onSave: () => void;
  onOpenSettings?: () => void;
  apiSettings?: { apiKey?: string; apiProvider?: 'gemini' | 'openai' };
  isRegenerating: boolean;
  isSaved: boolean;
}

export const CompactTopBar: React.FC<CompactTopBarProps> = ({
  reel,
  onBack,
  onRegenerateAll,
  onExportPdf,
  onShareLink,
  onCopyWhatsApp,
  onCopyBrief,
  onSave,
  onOpenSettings,
  apiSettings,
  isRegenerating,
  isSaved,
}) => {
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (type: 'link' | 'whatsapp' | 'brief' | 'save') => {
    if (type === 'link') {
      onShareLink();
      setCopiedAction('link');
    } else if (type === 'whatsapp') {
      onCopyWhatsApp();
      setCopiedAction('whatsapp');
    } else if (type === 'brief') {
      onCopyBrief();
      setCopiedAction('brief');
    } else if (type === 'save') {
      onSave();
      setCopiedAction('save');
    }
    setTimeout(() => {
      setCopiedAction(null);
      setShareMenuOpen(false);
    }, 1500);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Back button, Title (medium bold), subtle metadata pill */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors flex-shrink-0"
            title="Back to New Reel"
            aria-label="Back to New Reel"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="h-4 w-px bg-stone-200 hidden sm:block flex-shrink-0" />

          <h1 className="text-sm sm:text-base font-semibold text-stone-900 tracking-tight truncate">
            {reel.reelTitle}
          </h1>

          <span className="hidden md:inline-flex items-center text-[11px] font-medium text-stone-500 bg-stone-100 border border-stone-200/80 px-2 py-0.5 rounded-full flex-shrink-0">
            {reel.duration || '28s'} • 9:16 Vertical
          </span>
        </div>

        {/* Right: Unified action cluster [Share], [Export PDF], [Regenerate All] */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Share Dropdown */}
          <div ref={shareRef} className="relative">
            <button
              onClick={() => setShareMenuOpen(!shareMenuOpen)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors"
              title="Share options"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {shareMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-stone-200 shadow-xl py-1.5 z-50 text-left animate-in fade-in zoom-in-95 duration-100 text-xs">
                <button
                  onClick={() => handleAction('link')}
                  className="w-full px-3.5 py-2 flex items-center justify-between text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Link2 className="w-3.5 h-3.5 text-stone-400" />
                    <span>Copy Share Link</span>
                  </span>
                  {copiedAction === 'link' && <Check className="w-3.5 h-3.5 text-[#8B1721]" />}
                </button>
                <button
                  onClick={() => handleAction('whatsapp')}
                  className="w-full px-3.5 py-2 flex items-center justify-between text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-stone-400" />
                    <span>WhatsApp Script</span>
                  </span>
                  {copiedAction === 'whatsapp' && <Check className="w-3.5 h-3.5 text-[#8B1721]" />}
                </button>
                <button
                  onClick={() => handleAction('brief')}
                  className="w-full px-3.5 py-2 flex items-center justify-between text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Copy className="w-3.5 h-3.5 text-stone-400" />
                    <span>Production Brief</span>
                  </span>
                  {copiedAction === 'brief' && <Check className="w-3.5 h-3.5 text-[#8B1721]" />}
                </button>
                <div className="my-1 border-t border-stone-100" />
                <button
                  onClick={() => handleAction('save')}
                  className="w-full px-3.5 py-2 flex items-center justify-between text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-3.5 h-3.5 text-stone-400" />
                    <span>{isSaved ? 'Saved to Library' : 'Save to Library'}</span>
                  </span>
                  {(isSaved || copiedAction === 'save') && <Check className="w-3.5 h-3.5 text-[#8B1721]" />}
                </button>
              </div>
            )}
          </div>

          {/* Export PDF */}
          <button
            onClick={onExportPdf}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors"
            title="Export Storyboard PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>

          {/* AI Settings / Status */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              title={apiSettings?.apiKey ? `${apiSettings.apiProvider === 'openai' ? 'OpenAI' : 'Gemini'} Active — Click to configure` : 'Running on Offline Fallback — Click to add API key'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                apiSettings?.apiKey
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${apiSettings?.apiKey ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
              <span className="hidden md:inline">{apiSettings?.apiKey ? (apiSettings.apiProvider === 'openai' ? 'GPT-4o' : 'Gemini') : 'AI Key'}</span>
              <Settings className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Clean Primary Action: Regenerate All (Brand Red) */}
          <button
            onClick={onRegenerateAll}
            disabled={isRegenerating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#8B1721] hover:bg-[#73131B] active:scale-95 transition-all shadow-xs disabled:opacity-50"
            title="Regenerate all 6 shots"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate All'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
