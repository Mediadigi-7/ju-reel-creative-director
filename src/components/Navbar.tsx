import React from 'react';
import { Library, Settings, Home, Lightbulb } from 'lucide-react';
import { ApiSettings } from '../services/storage.js';

interface NavbarProps {
  onNewReel: () => void;
  onOpenIdeas?: () => void;
  onOpenLibrary: () => void;
  onOpenSettings: () => void;
  savedCount: number;
  currentView?: 'creator' | 'library' | 'ideas';
  apiSettings?: ApiSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewReel,
  onOpenIdeas,
  onOpenLibrary,
  onOpenSettings,
  savedCount,
  currentView = 'creator',
  apiSettings,
}) => {
  const hasKey = Boolean(apiSettings?.apiKey && apiSettings.apiKey.trim().length > 0);
  const isVerified = Boolean(hasKey && apiSettings?.isVerified);
  const providerLabel = apiSettings?.apiProvider === 'openai' ? 'OpenAI' : 'Gemini';

  return (
    <header className="relative sm:sticky top-0 z-30 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-14 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        {/* Brand */}
        <button onClick={onNewReel} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/joy-university-logo.png"
            alt="Joy University"
            className="h-7 sm:h-8 max-w-[110px] sm:max-w-none w-auto object-contain"
          />
          <span className="hidden md:block h-4 w-px bg-stone-300" />
          <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-stone-500">
            Reel Creative Director
          </span>
        </button>

        {/* Nav Actions */}
        <nav aria-label="Main navigation" className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-0.5 sm:gap-1.5">
          <button
            onClick={onNewReel}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              currentView === 'creator'
                ? 'bg-stone-100 text-stone-900 font-semibold'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>New reel</span>
          </button>

          <button
            onClick={onOpenIdeas}
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              currentView === 'ideas'
                ? 'bg-stone-100 text-stone-900 font-semibold'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
            }`}
            title="Browse Reel Ideas Bank"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Ideas</span>
          </button>

          <button
            onClick={onOpenLibrary}
            className={`relative flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              currentView === 'library'
                ? 'bg-stone-100 text-stone-900'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="ml-0.5 text-[10px] font-bold text-stone-500">
                ({savedCount})
              </span>
            )}
          </button>

          <span className="w-px h-4 bg-stone-200 mx-1" />

          {/* AI Status & Settings Button */}
          {hasKey ? (
            isVerified ? (
              <button
                onClick={onOpenSettings}
                title={`${providerLabel} key verified — Open AI settings`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-xs cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 " />
                <span className="text-[11px]">AI settings</span>
                <Settings className="w-3.5 h-3.5 text-emerald-700" />
              </button>
            ) : (
              <button
                onClick={onOpenSettings}
                title={`${providerLabel} key not verified — Open AI settings`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-amber-900 bg-amber-50 border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-[11px]">Check AI</span>
                <Settings className="w-3.5 h-3.5 text-amber-700" />
              </button>
            )
          ) : (
            <button
              onClick={onOpenSettings}
              title="Connect an AI provider to create reels from your own ideas"
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-950 bg-amber-100 border border-amber-400 hover:bg-amber-200 transition-all shadow-xs cursor-pointer ring-2 ring-amber-400/30 "
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-[11px] font-bold">Connect AI</span>
              <Settings className="w-3.5 h-3.5 text-amber-800" />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
