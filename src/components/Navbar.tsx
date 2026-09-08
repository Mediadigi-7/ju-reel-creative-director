import React from 'react';
import { Library, Settings, Plus } from 'lucide-react';

interface NavbarProps {
  onNewReel: () => void;
  onOpenLibrary: () => void;
  onOpenSettings: () => void;
  savedCount: number;
  currentView?: 'creator' | 'library';
}

export const Navbar: React.FC<NavbarProps> = ({
  onNewReel,
  onOpenLibrary,
  onOpenSettings,
  savedCount,
  currentView = 'creator',
}) => {
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
        <nav className="flex items-center gap-1">
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

          <button
            onClick={onOpenSettings}
            title="API Settings"
            className="p-2 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </header>
  );
};
