import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar.js';
import { CompactTopBar } from './components/CompactTopBar.js';
import { HeroContextBar } from './components/HeroContextBar.js';
import { ReelTitleInput } from './components/ReelTitleInput.js';
import { GenerationLoader } from './components/GenerationLoader.js';
import { ShotCard } from './components/ShotCard.js';
import { ProductionNotesCard } from './components/ProductionNotesCard.js';
import { CreativeSummaryCard } from './components/CreativeSummaryCard.js';
import { SettingsModal } from './components/SettingsModal.js';
import { apiGenerateReel, apiRegenerateShot } from './services/api.js';
import { exportStoryboardPdf } from './services/exportPdf.js';
import { formatStoryboardForWhatsApp, formatProductionBriefing } from './services/copyUtils.js';
import { getShareableUrl, decodeStoryboardFromUrl, decodeLibraryFromUrl } from './services/shareUtils.js';
import {
  loadCurrentStoryboard,
  saveCurrentStoryboard,
  loadSavedProjects,
  saveProjectToLibrary,
  deleteProjectFromLibrary,
  loadApiSettings,
  saveApiSettings,
  ApiSettings,
} from './services/storage.js';
import { ReelStoryboard, Shot, CreativeDirection, LanguageOption, ReelProject } from '../shared/types.js';
import { AlertCircle } from 'lucide-react';
import { LibraryView } from './components/LibraryView.js';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'creator' | 'library'>('creator');
  const [currentReel, setCurrentReel] = useState<ReelStoryboard | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [regeneratingShotNumber, setRegeneratingShotNumber] = useState<number | null>(null);
  const [isRegeneratingEntire, setIsRegeneratingEntire] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSharedView, setIsSharedView] = useState(false);
  const [isSharedLibrary, setIsSharedLibrary] = useState(false);
  const [sharedProjectsData, setSharedProjectsData] = useState<ReelProject[] | null>(null);

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [savedProjects, setSavedProjects] = useState<ReelProject[]>([]);
  const [apiSettings, setApiSettings] = useState<ApiSettings>({ apiProvider: 'gemini' });
  const [isSaved, setIsSaved] = useState(false);

  // Creative Pipeline Generation State
  const [isGenerationComplete, setIsGenerationComplete] = useState(false);
  const [pendingReel, setPendingReel] = useState<ReelStoryboard | null>(null);
  const [generationMeta, setGenerationMeta] = useState<{
    title: string;
    direction: CreativeDirection;
    language: LanguageOption;
  }>({
    title: '',
    direction: 'Student Relatable',
    language: 'English',
  });
  const isGeneratingRef = useRef(false);

  // Load state on mount (including checking for ?share= or /library or ?data= parameter)
  useEffect(() => {
    const pathname = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('share');
    const libraryDataParam = urlParams.get('data');
    const viewParam = urlParams.get('view');

    if (pathname === '/library' || viewParam === 'library' || libraryDataParam) {
      setCurrentView('library');
      if (libraryDataParam) {
        const decodedLib = decodeLibraryFromUrl(libraryDataParam);
        if (decodedLib && decodedLib.length > 0) {
          setSharedProjectsData(decodedLib);
          setIsSharedLibrary(true);
        }
      }
    } else if (shareParam) {
      const decoded = decodeStoryboardFromUrl(shareParam);
      if (decoded) {
        setCurrentReel(decoded);
        setIsSharedView(true);
        setCurrentView('creator');
      }
    } else {
      const saved = loadCurrentStoryboard();
      if (saved) setCurrentReel(saved);
    }

    const projects = loadSavedProjects();
    setSavedProjects(projects);

    const settings = loadApiSettings();
    setApiSettings(settings);

    // Listen to browser forward/back buttons
    const handlePopState = () => {
      if (window.location.pathname === '/library' || window.location.search.includes('view=library')) {
        setCurrentView('library');
      } else {
        setCurrentView('creator');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToView = (view: 'creator' | 'library') => {
    setCurrentView(view);
    if (view === 'library') {
      window.history.pushState({}, '', '/library');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  const handleImportSharedLibrary = () => {
    if (!sharedProjectsData) return;
    let merged = [...savedProjects];
    sharedProjectsData.forEach((sp) => {
      if (!merged.some((p) => p.id === sp.id)) {
        merged.push(sp);
      }
    });
    localStorage.setItem('joy_reel_saved_projects', JSON.stringify(merged));
    setSavedProjects(merged);
    setIsSharedLibrary(false);
    setSharedProjectsData(null);
  };

  // Autosave current storyboard whenever it changes (unless in shared view before user interaction)
  useEffect(() => {
    if (currentReel && !isSharedView) {
      saveCurrentStoryboard(currentReel);
    }
  }, [currentReel, isSharedView]);

  const handleGenerationAnimationComplete = () => {
    if (pendingReel) {
      setCurrentReel(pendingReel);
      setPendingReel(null);
      setIsSaved(false);
    }
    setIsLoading(false);
    setIsGenerationComplete(false);
    isGeneratingRef.current = false;
  };

  const handleGenerate = async (
    title: string,
    direction: CreativeDirection = 'Student Relatable',
    language: LanguageOption = 'English'
  ) => {
    if (isGeneratingRef.current || isLoading) return;
    isGeneratingRef.current = true;
    setIsLoading(true);
    setIsGenerationComplete(false);
    setPendingReel(null);
    setError(null);
    setGenerationMeta({ title, direction, language });

    try {
      const generated = await apiGenerateReel({
        reelTitle: title,
        creativeDirection: direction,
        language: language,
        apiKey: apiSettings.apiKey,
        apiProvider: apiSettings.apiProvider,
      });
      setPendingReel(generated);
      setIsGenerationComplete(true);
    } catch (err: any) {
      console.error(err);
      setError("We couldn't generate the storyboard. Please verify your connection or API key and try again.");
      isGeneratingRef.current = false;
    }
  };

  const handleRegenerateEntire = async () => {
    if (!currentReel || isGeneratingRef.current || isLoading) return;
    isGeneratingRef.current = true;
    setIsLoading(true);
    setIsGenerationComplete(false);
    setPendingReel(null);
    setError(null);
    setIsRegeneratingEntire(true);
    setGenerationMeta({
      title: currentReel.reelTitle,
      direction: currentReel.creativeDirection as CreativeDirection,
      language: currentReel.language,
    });

    try {
      const regenerated = await apiGenerateReel({
        reelTitle: currentReel.reelTitle,
        creativeDirection: currentReel.creativeDirection as CreativeDirection,
        language: currentReel.language,
        duration: currentReel.duration,
        apiKey: apiSettings.apiKey,
        apiProvider: apiSettings.apiProvider,
      });
      regenerated.version = (currentReel.version || 1) + 1;
      setPendingReel(regenerated);
      setIsGenerationComplete(true);
    } catch (err: any) {
      console.error(err);
      setError("We couldn't regenerate the storyboard. Please try again.");
      isGeneratingRef.current = false;
    } finally {
      setIsRegeneratingEntire(false);
    }
  };

  const handleRegenerateShot = async (shotNumber: number) => {
    if (!currentReel) return;
    setRegeneratingShotNumber(shotNumber);
    try {
      const targetShot = currentReel.shots.find((s) => s.number === shotNumber);
      if (!targetShot) return;

      const updatedShot = await apiRegenerateShot({
        reelTitle: currentReel.reelTitle,
        creativeAngle: currentReel.creativeAngle,
        targetAudience: currentReel.targetAudience,
        shotNumber,
        shotType: targetShot.type,
        currentStoryboard: currentReel,
        apiKey: apiSettings.apiKey,
        apiProvider: apiSettings.apiProvider,
      });

      const newShots = currentReel.shots.map((s) => (s.number === shotNumber ? updatedShot : s));
      setCurrentReel({
        ...currentReel,
        shots: newShots,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error('Failed to regenerate shot:', err);
    } finally {
      setRegeneratingShotNumber(null);
    }
  };

  const handleUpdateShot = (updatedShot: Shot) => {
    if (!currentReel) return;
    const newShots = currentReel.shots.map((s) =>
      s.number === updatedShot.number ? updatedShot : s
    );
    setCurrentReel({
      ...currentReel,
      shots: newShots,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleUpdateMetadata = (fields: Partial<ReelStoryboard>) => {
    if (!currentReel) return;
    setCurrentReel({
      ...currentReel,
      ...fields,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleShiftTone = async (newDirection: CreativeDirection) => {
    if (!currentReel) return;
    handleUpdateMetadata({ creativeDirection: newDirection });
    handleGenerate(currentReel.reelTitle, newDirection, currentReel.language);
  };

  const handleShiftLanguage = async (newLanguage: LanguageOption) => {
    if (!currentReel) return;
    handleUpdateMetadata({ language: newLanguage });
    handleGenerate(currentReel.reelTitle, currentReel.creativeDirection as CreativeDirection, newLanguage);
  };

  const handleShiftDuration = (newDuration: string) => {
    handleUpdateMetadata({ duration: newDuration });
  };

  const handleSaveToLibrary = () => {
    if (!currentReel) return;
    const updated = saveProjectToLibrary(currentReel);
    setSavedProjects(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDeleteProject = (projectId: string) => {
    const updated = deleteProjectFromLibrary(projectId);
    setSavedProjects(updated);
    if (currentReel?.id === projectId) {
      setCurrentReel(null);
      saveCurrentStoryboard(null);
    }
  };

  const handleNewReel = () => {
    if (isLoading) return; // Prevent aborting active generation
    setCurrentReel(null);
    setPendingReel(null);
    saveCurrentStoryboard(null);
    navigateToView('creator');
  };

  const handleShareLink = () => {
    if (!currentReel) return;
    navigator.clipboard.writeText(getShareableUrl(currentReel));
  };

  const handleCopyWhatsApp = () => {
    if (!currentReel) return;
    navigator.clipboard.writeText(formatStoryboardForWhatsApp(currentReel));
  };

  const handleCopyBrief = () => {
    if (!currentReel) return;
    navigator.clipboard.writeText(formatProductionBriefing(currentReel));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      {/* Primary Header Navbar - Always Visible */}
      <Navbar
        onNewReel={handleNewReel}
        onOpenLibrary={() => navigateToView('library')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        savedCount={savedProjects.length}
        currentView={currentView}
        apiSettings={apiSettings}
      />

      {/* Storyboard Action Sub-Bar - Appears when editing an active Reel */}
      {currentView === 'creator' && currentReel && (
        <CompactTopBar
          reel={currentReel}
          onBack={handleNewReel}
          onRegenerateAll={handleRegenerateEntire}
          onExportPdf={() => exportStoryboardPdf(currentReel)}
          onShareLink={handleShareLink}
          onCopyWhatsApp={handleCopyWhatsApp}
          onCopyBrief={handleCopyBrief}
          onSave={handleSaveToLibrary}
          onOpenSettings={() => setIsSettingsOpen(true)}
          apiSettings={apiSettings}
          isRegenerating={isRegeneratingEntire}
          isSaved={isSaved}
        />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-red-800 text-sm font-semibold">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => handleRegenerateEntire()}
              className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* View Switching: Library View vs Creator View */}
        {currentView === 'library' ? (
          <LibraryView
            projects={sharedProjectsData || savedProjects}
            onSelectProject={(storyboard) => {
              setCurrentReel(storyboard);
              navigateToView('creator');
            }}
            onDeleteProject={handleDeleteProject}
            onNavigateToCreate={() => navigateToView('creator')}
            isSharedLibrary={isSharedLibrary}
            onImportSharedLibrary={handleImportSharedLibrary}
          />
        ) : isLoading ? (
          <GenerationLoader
            title={generationMeta.title}
            direction={generationMeta.direction}
            language={generationMeta.language}
            isComplete={isGenerationComplete}
            error={error}
            onCompleteAnimation={handleGenerationAnimationComplete}
            onRetry={() => {
              setError(null);
              isGeneratingRef.current = false;
              handleGenerate(generationMeta.title, generationMeta.direction, generationMeta.language);
            }}
          />
        ) : !currentReel ? (
          <ReelTitleInput onGenerate={handleGenerate} isLoading={isLoading} />
        ) : (
          /* Focus Mode: 90% Screen Real Estate Reserved for Storyboard Cards */
          <div className="pb-16 max-w-5xl mx-auto">
            {/* Shared Storyboard Notification Banner */}
            {isSharedView && (
              <div className="mb-6 p-4 rounded-lg bg-stone-100 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-stone-700 font-medium">
                  Viewing shared storyboard: <strong>"{currentReel.reelTitle}"</strong>
                </span>
                <button
                  onClick={handleSaveToLibrary}
                  className="px-3 py-1.5 rounded bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors"
                >
                  {isSaved ? 'Saved to Library' : 'Save to My Library'}
                </button>
              </div>
            )}

            {/* 2. Clean Hero Context (Single Minimal Bar with hidden settings gear) */}
            <HeroContextBar
              objective={currentReel.creativeAngle || currentReel.objective || '6-step decision breakdown — no fluff, just what matters.'}
              currentTone={currentReel.creativeDirection as CreativeDirection}
              currentLanguage={currentReel.language}
              currentDuration={currentReel.duration}
              onShiftTone={handleShiftTone}
              onShiftLanguage={handleShiftLanguage}
              onShiftDuration={handleShiftDuration}
              isLoading={isLoading}
            />

            {/* 3. Main Storyboard Canvas (The Hero Content) */}
            <div className="space-y-4 sm:space-y-5">
              {currentReel.shots.map((shot) => (
                <ShotCard
                  key={shot.number}
                  shot={shot}
                  reelTitle={currentReel.reelTitle}
                  onUpdateShot={handleUpdateShot}
                  onRegenerateShot={handleRegenerateShot}
                  isRegenerating={regeneratingShotNumber === shot.number}
                />
              ))}
            </div>

            {/* Collapsible Reference: Production Notes Call Sheet */}
            <details className="mt-10 pt-6 border-t border-stone-200 group/details">
              <summary className="cursor-pointer text-xs font-semibold text-stone-500 hover:text-stone-900 flex items-center justify-between select-none py-2.5 px-3.5 rounded-lg hover:bg-stone-100/70 transition-colors bg-white border border-stone-200/80">
                <span>Production Notes & Shooting Priorities (Optional Reference)</span>
                <span className="text-[10px] text-stone-400 group-open/details:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-4 space-y-6">
                <ProductionNotesCard notes={currentReel.productionNotes} />
                <CreativeSummaryCard summary={currentReel.creativeSummary} />
              </div>
            </details>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={apiSettings}
        onSaveSettings={(newSettings) => setApiSettings(newSettings)}
      />

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#AF1E2A]">Joy University</span>
            <span>•</span>
            <span>Reel Storyboard Generator</span>
          </div>
          <div>Vadakkankulam, Tirunelveli • 104-Acre Campus • UGC 2(f)</div>
        </div>
      </footer>
    </div>
  );
};
