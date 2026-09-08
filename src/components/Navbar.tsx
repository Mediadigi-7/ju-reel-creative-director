import React from 'react';
import { Library, Settings, Plus } from 'lucide-react';

interface NavbarProps {
  onNewReel: () => void;
  onOpenLibrary: () => void;
  onOpenSettings: () => void;
  savedCount: number;
  currentView?: 'creator' | 'library';
  apiSettings?: { apiKey?: string; apiProvider?: 'gemini' | 'openai' };
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewReel,
  onOpenLibrary,
  onOpenSettings,
  savedCount,
  currentView = 'creator',
  apiSettings,
}) => {
  const hasKey = Boolean(apiSettings?.apiKey && apiSettings.apiKey.trim().length > 0);
  const providerName = apiSettings?.apiProvider === 'openai' ? 'OpenAI' : 'Gemini';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand */}
        <button onClick={onNewReel} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/joy-university-logo.png"
            alt="Joy University"
            className="h-8 w-auto object-contain"
          />
          <span className="hidden md:block h-4 w-px bg-stone-300" />
          <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-stone-500">
            Reel Creative Director
          </span>
        </button>

        {/* Nav Actions */}
        <nav className="flex items-center gap-1.5">
          <button
            onClick={onNewReel}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              currentView === 'creator'
                ? 'bg-stone-100 text-stone-900'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Reel</span>
          </button>

          <button
            onClick={onOpenLibrary}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              currentView === 'library'
                ? 'bg-stone-100 text-stone-900'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            <Library className="w-3.5 h-3.5" />
            <span>Library</span>
            {savedCount > 0 && (
              <span className="ml-0.5 text-[10px] font-bold text-stone-500">
                ({savedCount})
              </span>
            )}
          </button>

          <span className="w-px h-4 bg-stone-200 mx-1" />

          {/* AI Status & Settings Button */}
          {hasKey ? (
            <button
              onClick={onOpenSettings}
              title={`${providerName} AI Active — Click to configure`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] hidden sm:inline">{providerName} Active</span>
              <Settings className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          ) : (
            <button
              onClick={onOpenSettings}
              title="Running on Offline Fallback — Click to add Gemini/OpenAI API key"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-stone-600 bg-stone-100 border border-stone-300 hover:bg-stone-200 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-[11px] hidden sm:inline">Add AI Key</span>
              <Settings className="w-3.5 h-3.5 text-stone-500" />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
