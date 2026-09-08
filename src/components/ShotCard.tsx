import React, { useState } from 'react';
import { RotateCw, Copy, Edit2, Check, Clock, Mic, Eye, Type, Camera } from 'lucide-react';
import { Shot } from '../../shared/types.js';
import { formatSingleShot } from '../services/copyUtils.js';

interface ShotCardProps {
  shot: Shot;
  reelTitle: string;
  onUpdateShot: (updated: Shot) => void;
  onRegenerateShot: (shotNumber: number) => void;
  isRegenerating: boolean;
}

const SHOT_TYPE_LABELS: Record<string, string> = {
  HOOK: 'Hook',
  PROBLEM: 'Problem',
  PATTERN_INTERRUPT: 'Pattern Interrupt',
  VALUE: 'Value',
  PAYOFF: 'Payoff',
  CTA: 'Call to Action',
};

export const ShotCard: React.FC<ShotCardProps> = ({
  shot,
  reelTitle,
  onUpdateShot,
  onRegenerateShot,
  isRegenerating,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visualDraft, setVisualDraft] = useState(shot.visual);
  const [dialogueDraft, setDialogueDraft] = useState(shot.dialogue);
  const [textDraft, setTextDraft] = useState(shot.onscreenText);
  const [cameraDraft, setCameraDraft] = useState(shot.cameraPerformance);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatSingleShot(shot, reelTitle));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onUpdateShot({ ...shot, visual: visualDraft, dialogue: dialogueDraft, onscreenText: textDraft, cameraPerformance: cameraDraft, userEdited: true });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setVisualDraft(shot.visual);
    setDialogueDraft(shot.dialogue);
    setTextDraft(shot.onscreenText);
    setCameraDraft(shot.cameraPerformance);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <div
      id={`shot-${shot.number}`}
      className="group bg-white border border-stone-200 rounded-xl overflow-hidden scroll-mt-20 shadow-xs hover:shadow-md transition-all duration-200"
      onKeyDown={handleKeyDown}
    >
      {/* ─── Shot Header: "SHOT 01 • HOOK" with duration tag & subdued hover controls ─── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100 bg-stone-50/40">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-stone-900 tracking-wider">
            SHOT 0{shot.number} • {(SHOT_TYPE_LABELS[shot.type] ?? shot.name).toUpperCase()}
          </span>
          <span className="text-stone-300">·</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 font-medium bg-stone-100/90 px-2 py-0.5 rounded border border-stone-200/60">
            <Clock className="w-3 h-3 text-stone-400" />
            <span>{shot.timestamp}</span>
          </span>
          {shot.userEdited && (
            <span className="text-[10px] text-amber-600 font-medium bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              edited
            </span>
          )}
        </div>

        {/* Subdued Hover Controls: Edit, Copy, Regenerate appear ONLY on card hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            title="Copy shot text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
              isEditing
                ? 'bg-stone-200 text-stone-900'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
            }`}
            title="Edit shot"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Close' : 'Edit'}</span>
          </button>
          <button
            onClick={() => onRegenerateShot(shot.number)}
            disabled={isRegenerating}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-[#8B1721] hover:bg-[#FDF2F3] transition-colors disabled:opacity-40"
            title="Regenerate this shot"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>{isRegenerating ? 'Regenerating...' : 'Regenerate'}</span>
          </button>
        </div>
      </div>

      {/* ─── Shot Body ─── */}
      {isEditing ? (
        <div className="p-5 space-y-4 bg-stone-50/50">
          {/* Edit: Visual */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              <Eye className="w-3 h-3 text-stone-400" />
              <span>Visual Action</span>
            </label>
            <textarea
              value={visualDraft}
              onChange={(e) => setVisualDraft(e.target.value)}
              rows={2}
              className="w-full text-sm px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-[#8B1721] resize-none font-normal"
            />
          </div>
          {/* Edit: Dialogue */}
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
              <Mic className="w-3 h-3 text-[#8B1721]" />
              <span>Dialogue / Voiceover</span>
            </label>
            <textarea
              value={dialogueDraft}
              onChange={(e) => setDialogueDraft(e.target.value)}
              rows={2}
              className="w-full text-sm px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-[#8B1721] resize-none font-normal"
            />
          </div>
          {/* Edit: Graphic + Camera */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                <Type className="w-3 h-3 text-[#8B1721]" />
                <span>On-Screen Graphic</span>
              </label>
              <input
                type="text"
                value={textDraft}
                onChange={(e) => setTextDraft(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-[#8B1721]"
              />
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                <Camera className="w-3 h-3 text-stone-400" />
                <span>Camera Direction</span>
              </label>
              <input
                type="text"
                value={cameraDraft}
                onChange={(e) => setCameraDraft(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-900 focus:outline-none focus:border-[#8B1721]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
            <button onClick={handleCancel} className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 rounded hover:bg-stone-100">
              Cancel (Esc)
            </button>
            <button onClick={handleSave} className="px-4 py-1.5 text-xs font-bold bg-[#8B1721] hover:bg-[#73131B] text-white rounded transition-colors">
              Save
            </button>
          </div>
        </div>
      ) : (
        /* Focus Mode 2-Column Storyboard: Left: Visuals & Camera, Right: Dialogue & On-Screen Text */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 p-5 sm:p-6">
          {/* Column 1 (Visuals): Visual Action description + Camera Direction note */}
          <div className="space-y-3.5">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                <Eye className="w-3 h-3 text-stone-400 flex-shrink-0" />
                <span>Visual Action</span>
              </div>
              <p className="text-sm text-stone-800 leading-relaxed font-normal">
                {shot.visual}
              </p>
            </div>

            {shot.cameraPerformance && (
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                  <Camera className="w-3 h-3 text-stone-400 flex-shrink-0" />
                  <span>Camera Direction</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-normal bg-stone-50/70 p-2.5 rounded-lg border border-stone-100/90">
                  {shot.cameraPerformance}
                </p>
              </div>
            )}
          </div>

          {/* Column 2 (Audio & Graphics): Dialogue/Voiceover text in clean blockquote + On-screen Graphic badge */}
          <div className="space-y-3.5">
            {shot.dialogue && (
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                  <Mic className="w-3 h-3 text-[#8B1721] flex-shrink-0" />
                  <span>Dialogue / Voiceover</span>
                </div>
                <blockquote className="text-sm font-semibold text-stone-900 leading-snug border-l-2 border-[#8B1721] pl-3.5 py-1.5 bg-stone-50/50 rounded-r">
                  "{shot.dialogue.replace(/^"|"$/g, '')}"
                </blockquote>
              </div>
            )}

            {shot.onscreenText && (
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                  <Type className="w-3 h-3 text-[#8B1721] flex-shrink-0" />
                  <span>On-Screen Graphic</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#FDF2F3] text-[#8B1721] border border-[#8B1721]/25 text-xs font-semibold">
                  {shot.onscreenText}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
