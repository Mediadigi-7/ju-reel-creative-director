import React, { useState } from 'react';
import {
  Copy,
  Download,
  RotateCw,
  Bookmark,
  Share2,
  Check,
  Edit2,
  Link2,
  Target,
  Users,
  Clock,
  Camera,
  Mic,
} from 'lucide-react';
import { ReelStoryboard, ProjectStatus } from '../../shared/types.js';
import { formatStoryboardForWhatsApp, formatProductionBriefing } from '../services/copyUtils.js';
import { getShareableUrl } from '../services/shareUtils.js';

interface StoryboardHeaderProps {
  reel: ReelStoryboard;
  onUpdateMetadata: (fields: Partial<ReelStoryboard>) => void;
  onRegenerateEntire: () => void;
  onExportPdf: () => void;
  onSave: () => void;
  isRegenerating: boolean;
  isSaved: boolean;
}

export const StoryboardHeader: React.FC<StoryboardHeaderProps> = ({
  reel,
  onUpdateMetadata,
  onRegenerateEntire,
  onExportPdf,
  onSave,
  isRegenerating,
  isSaved,
}) => {
  const [copiedType, setCopiedType] = useState<'whatsapp' | 'brief' | 'link' | null>(null);
  const [isEditingAngle, setIsEditingAngle] = useState(false);
  const [angleDraft, setAngleDraft] = useState(reel.creativeAngle);

  const handleShareLink = () => {
    const url = getShareableUrl(reel);
    navigator.clipboard.writeText(url);
    setCopiedType('link');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyWhatsApp = () => {
    const text = formatStoryboardForWhatsApp(reel);
    navigator.clipboard.writeText(text);
    setCopiedType('whatsapp');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyBrief = () => {
    const text = formatProductionBriefing(reel);
    navigator.clipboard.writeText(text);
    setCopiedType('brief');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleStatusChange = (status: ProjectStatus) => {
    onUpdateMetadata({ status });
  };

  const handleSaveAngle = () => {
    onUpdateMetadata({ creativeAngle: angleDraft });
    setIsEditingAngle(false);
  };

  const handleCancelAngle = () => {
    setAngleDraft(reel.creativeAngle);
    setIsEditingAngle(false);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 mb-6">
      {/* Top Document Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-5 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
            v{reel.version || 1}.0
          </span>
          <span className="text-stone-300">·</span>
          <select
            value={reel.status}
            onChange={(e) => handleStatusChange(e.target.value as ProjectStatus)}
            className="text-xs font-medium text-stone-700 bg-transparent border-0 border-b border-dotted border-stone-400 focus:outline-none focus:border-stone-900 cursor-pointer py-0.5 pr-4"
          >
            <option value="Draft">Draft</option>
            <option value="Ready for Production">Ready for Production</option>
            <option value="Shot">Shot</option>
            <option value="Edited">Edited</option>
            <option value="Published">Published</option>
            <option value="Archived">Archived</option>
          </select>
          {isSaved && (
            <span className="text-xs text-stone-400 font-medium">
              Saved to library
            </span>
          )}
        </div>

        {/* Document Action Group */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={handleShareLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200 transition-colors"
            title="Copy direct link to this storyboard"
          >
            {copiedType === 'link' ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Link2 className="w-3.5 h-3.5" />}
            <span>{copiedType === 'link' ? 'Link Copied' : 'Share Link'}</span>
          </button>

          <button
            onClick={handleCopyWhatsApp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200 transition-colors"
            title="Copy WhatsApp formatted breakdown"
          >
            {copiedType === 'whatsapp' ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedType === 'whatsapp' ? 'Copied' : 'WhatsApp'}</span>
          </button>

          <button
            onClick={handleCopyBrief}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200 transition-colors"
            title="Copy Production Briefing text"
          >
            {copiedType === 'brief' ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === 'brief' ? 'Copied' : 'Copy Brief'}</span>
          </button>

          <button
            onClick={onExportPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200 transition-colors"
            title="Export call sheet PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={onRegenerateEntire}
            disabled={isRegenerating}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-semibold text-white bg-[#AF1E2A] hover:bg-[#8B1721] transition-colors disabled:opacity-40"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating…' : 'Regenerate Reel'}</span>
          </button>
        </div>
      </div>

      {/* Production Document Header: Title & Context */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
          Production Storyboard
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight">
          {reel.reelTitle}
        </h1>

        {/* Standout "Key Creative Idea" / Creative Angle — signaled with Target icon */}
        <div className="mt-4 p-4 rounded-md bg-stone-50 border border-stone-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-500">
              <Target className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
              <span>Objective & Creative Angle</span>
            </span>
            {!isEditingAngle && (
              <button
                onClick={() => setIsEditingAngle(true)}
                className="text-stone-400 hover:text-stone-700 p-1 text-xs flex items-center gap-1 transition-colors"
                title="Edit creative angle"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {isEditingAngle ? (
            <div className="space-y-2 mt-2">
              <textarea
                value={angleDraft}
                onChange={(e) => setAngleDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') handleCancelAngle();
                }}
                rows={2}
                className="w-full text-xs sm:text-sm p-2.5 border border-stone-300 rounded bg-white text-stone-900 focus:outline-none focus:border-stone-500 font-normal"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancelAngle}
                  className="px-3 py-1 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel (Esc)
                </button>
                <button
                  onClick={handleSaveAngle}
                  className="px-3.5 py-1 bg-stone-900 text-white text-xs font-medium rounded hover:bg-stone-800"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm font-medium text-stone-800 leading-relaxed">
              {reel.creativeAngle}
            </p>
          )}
        </div>

        {/* Factual Specification Bar — instant recognition by category icon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-stone-100 text-xs">
          <div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
              <Users className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Audience</span>
            </span>
            <span className="font-medium text-stone-700">{reel.targetAudience}</span>
          </div>
          <div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
              <Clock className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Duration</span>
            </span>
            <span className="font-mono font-medium text-stone-700">{reel.duration}</span>
          </div>
          <div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
              <Camera className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Format</span>
            </span>
            <span className="font-medium text-stone-700">{reel.format}</span>
          </div>
          <div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
              <Mic className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span>Tone & Audio</span>
            </span>
            <span className="font-medium text-stone-700">{reel.creativeDirection} · {reel.language}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
