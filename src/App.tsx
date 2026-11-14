import { HlniReviewCard } from './components/HlniReviewCard.js';
import { enforceEditorialStatus } from '../shared/hlni.js';
import type { ContentChannel } from '../shared/channels.js';
import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar.js';
import { CompactTopBar } from './components/CompactTopBar.js';
import { HeroContextBar } from './components/HeroContextBar.js';
import { ReelTitleInput, type IdeaSelection } from './components/ReelTitleInput.js';
import { GenerationLoader } from './components/GenerationLoader.js';
import { ShotCard } from './components/ShotCard.js';
import { ProductionNotesCard } from './components/ProductionNotesCard.js';
import { CreativeSummaryCard } from './components/CreativeSummaryCard.js';

import { SettingsModal } from './components/SettingsModal.js';
import { IdeasView } from './components/IdeasView.js';
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
import { ReelStoryboard, Shot, CreativeDirection, CreativeTreatment, LanguageOption, ReelProject } from '../shared/types.js';
import { retimeStoryboard } from '../shared/timing.js';
import { AlertCircle } from 'lucide-react';
import { LibraryView } from './components/LibraryView.js';

export const App: React.FC = () => {
  const [creationSession,setCreationSession]=useState(0);
  const [selectedIdea,setSelectedIdea]=useState<IdeaSelection|undefined>();
  const [currentView, setCurrentView] = useState<'creator' | 'library' | 'ideas'>('creator');
  const [openedFrom, setOpenedFrom] = useState<'new' | 'library' | 'restored' | 'shared'>('new');
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
    direction: CreativeTreatment;
    language: LanguageOption;
    channel?: ContentChannel;
  }>({
    title: '',
    direction: 'Informative',
    language: 'English',
  });
  const isGeneratingRef = useRef(false);
  const retryAction = useRef<(() => void) | null>(null);

  // Load state on mount (including checking for ?share= or /library or ?data= parameter)
  useEffect(() => {
    const pathname = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('share');
    const libraryDataParam = urlParams.get('data');
    const viewParam = urlParams.get('view');

    if (pathname === '/ideas' || viewParam === 'ideas') {
      setCurrentView('ideas');
    } else if (pathname === '/library' || viewParam === 'library' || libraryDataParam) {
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
        setOpenedFrom('shared');
        setIsSharedView(true);
        setCurrentView('creator');
      }
    } else {
      const saved = loadCurrentStoryboard();
      if (saved) { setCurrentReel(saved); setOpenedFrom('restored'); }
    }

    const projects = loadSavedProjects();
    setSavedProjects(projects);

    const settings = loadApiSettings();
    setApiSettings(settings);

    // Listen to browser forward/back buttons
    const handlePopState = () => {
      if (window.location.pathname === '/ideas' || window.location.search.includes('view=ideas')) {
        setCurrentView('ideas');
      } else if (window.location.pathname === '/library' || window.location.search.includes('view=library')) {
        setCurrentView('library');
      } else {
        setCurrentView('creator');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigationReady=useRef(false);
  useEffect(()=>{
    document.title=`${currentView==='ideas'?'Find ideas':currentView==='library'?'Saved reels':currentReel?.reelTitle || 'Create a storyboard'} · JOY Reel Creative Director`;
    if(navigationReady.current){document.getElementById('main-content')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'auto'});}
    navigationReady.current=true;
  },[currentView,currentReel?.id]);

  const navigateToView = (view: 'creator' | 'library' | 'ideas') => {
    setCurrentView(view);
    if (view === 'ideas') {
      window.history.pushState({}, '', '/ideas');
    } else if (view === 'library') {
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
      setOpenedFrom('new');
      setPendingReel(null);
      setIsSaved(false);
    }
    setIsLoading(false);
    setIsGenerationComplete(false);
    isGeneratingRef.current = false;
  };

  const handleGenerate = async (
    title: string,
    direction: CreativeTreatment = 'Auto',
    language: LanguageOption = 'English',
    channel?: ContentChannel
  ) => {
    if (isGeneratingRef.current || isLoading) return;
    retryAction.current = () => handleGenerate(title, direction, language, channel);
    isGeneratingRef.current = true;
    setIsLoading(true);
    setIsGenerationComplete(false);
    setPendingReel(null);
    setError(null);
    setGenerationMeta({ title, direction, language, channel });

    try {
      const generated = await apiGenerateReel({
        reelTitle: title,
        creativeDirection: direction,
        channel,
        language: language,
        apiKey: apiSettings.apiKey,
        apiProvider: apiSettings.apiProvider,
      });
      setPendingReel(generated);
      setIsGenerationComplete(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Generation failed. Please retry.');
      setIsLoading(false);
      isGeneratingRef.current = false;
    }
  };

  const handleRegenerateEntire = async () => {
    if (!currentReel || isGeneratingRef.current || isLoading) return;
    retryAction.current = () => handleRegenerateEntire();
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
      channel: currentReel.channel,
    });

    try {
      const regenerated = await apiGenerateReel({
        reelTitle: currentReel.reelTitle,
        creativeDirection: currentReel.creativeDirection as CreativeDirection,
        language: currentReel.language,
        duration: currentReel.duration,
        channel: currentReel.channel,
        apiKey: apiSettings.apiKey,
        apiProvider: apiSettings.apiProvider,
      });
      regenerated.version = (currentReel.version || 1) + 1;
      setPendingReel(regenerated);
      setIsGenerationComplete(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Regeneration failed. Please retry.');
      setIsLoading(false);
      isGeneratingRef.current = false;
    } finally {
      setIsRegeneratingEntire(false);
    }
  };

  const handleRegenerateShot = async (shotNumber: number) => {
    if (!currentReel) return;
    retryAction.current = () => handleRegenerateShot(shotNumber);
    setRegeneratingShotNumber(shotNumber);
    setError(null);
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
      setCurrentReel(enforceEditorialStatus({
        ...currentReel,
        shots: newShots,
        updatedAt: new Date().toISOString(),
      }));
    } catch (err: any) {
      setError(err.message || 'Shot regeneration failed. Your existing shot was preserved.');
    } finally {
      setRegeneratingShotNumber(null);
    }
  };

  const handleUpdateShot = (updatedShot: Shot) => {
    if (!currentReel) return;
    setIsSaved(false);
    const newShots = currentReel.shots.map((s) =>
      s.number === updatedShot.number ? updatedShot : s
    );
    setCurrentReel(enforceEditorialStatus({
      ...currentReel,
      shots: newShots,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleUpdateMetadata = (fields: Partial<ReelStoryboard>) => {
    if (!currentReel) return;
    setIsSaved(false);
    setCurrentReel(enforceEditorialStatus({
      ...currentReel,
      ...fields,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleShiftTone = async (newDirection: CreativeDirection) => {
    if (!currentReel) return;
    handleGenerate(currentReel.reelTitle, newDirection, currentReel.language, currentReel.channel);
  };

  const handleShiftLanguage = async (newLanguage: LanguageOption) => {
    if (!currentReel) return;
    handleGenerate(currentReel.reelTitle, currentReel.creativeDirection as CreativeDirection, newLanguage, currentReel.channel);
  };

  const handleShiftDuration = (newDuration: string) => {
    if (currentReel) handleUpdateMetadata(retimeStoryboard(currentReel, parseInt(newDuration, 10)));
  };

  const handleSaveToLibrary = () => {
    if (!currentReel) return;
    const updated = saveProjectToLibrary(currentReel);
    setSavedProjects(updated);
    setIsSaved(true);

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
    if (isLoading) return; // Keep the active generation intact.
    setCreationSession(value=>value+1);
    setSelectedIdea(undefined);
    setIsSharedView(false);
    setIsSharedLibrary(false);
    setSharedProjectsData(null);
    setIsSaved(false);
    setError(null);
    setCurrentReel(null);
    setPendingReel(null);
    saveCurrentStoryboard(null);
    navigateToView('creator');
  };

  const handleSelectIdea = (ideaTitle: string, direction: CreativeDirection = 'Informative', channel?: ContentChannel) => {
    setCurrentReel(null);
    setPendingReel(null);
    saveCurrentStoryboard(null);
    navigateToView('creator');
    setError(null);
    setIsSharedView(false);
    setIsSaved(false);
    setSelectedIdea({title:ideaTitle,direction,channel});
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
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {/* Primary Header Navbar - Always Visible */}
      <Navbar
        onNewReel={handleNewReel}
        onOpenIdeas={() => navigateToView('ideas')}
        onOpenLibrary={() => {setIsSharedLibrary(false);setSharedProjectsData(null);navigateToView('library');}}
        onOpenSettings={() => setIsSettingsOpen(true)}
        savedCount={savedProjects.length}
        currentView={currentView}
        apiSettings={apiSettings}
      />

      {/* Storyboard Action Sub-Bar - Appears when editing an active Reel */}
      {currentView === 'creator' && currentReel && (
        <CompactTopBar
          reel={currentReel}
          openedFrom={openedFrom}
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

      <main id="main-content" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Notification */}
        {error && (
          <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-red-800 text-sm font-semibold">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => { setError(null); retryAction.current?.(); }}
              className="px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* View Switching: Ideas View vs Library View vs Creator View */}
        {currentView === 'ideas' ? (
          <IdeasView
            onSelectIdea={handleSelectIdea}
            onNavigateToCreate={handleNewReel}
          />
        ) : currentView === 'library' ? (
          <LibraryView
            projects={sharedProjectsData || savedProjects}
            onSelectProject={(storyboard) => {
              setCurrentReel(storyboard);
              setOpenedFrom('library');
              setIsSharedView(false);
              setIsSaved(true);
              navigateToView('creator');
            }}
            onDeleteProject={handleDeleteProject}
            onNavigateToCreate={handleNewReel}
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
              handleGenerate(generationMeta.title, generationMeta.direction, generationMeta.language, generationMeta.channel);
            }}
          />
        ) : !currentReel ? (
          <ReelTitleInput
            key={creationSession}
            onDraftChange={setSelectedIdea}
            initialIdea={selectedIdea}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            hasApiKey={Boolean(apiSettings.apiKey?.trim())}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
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

            <p className="mb-4 text-sm text-stone-600">{currentReel.generation?.source === 'offline' ? (currentReel.generation.templateId ? 'Offline sample: an authored script you can edit. Connect AI for a new story or custom idea.' : 'This saved template predates the authored catalogue. Choose a new sample for the updated scripts.') : 'Your reel draft is ready. Review the scenes, edit any details, then save your reel or export a PDF.'}</p>
            {/* 2. Clean Hero Context (Single Minimal Bar with hidden settings gear) */}
            <HeroContextBar
              objective={currentReel.creativeAngle || currentReel.objective || 'A useful insight and a clear outcome for the viewer.'}
              channel={currentReel.channel}
              onShiftChannel={(channel) => handleGenerate(currentReel.reelTitle, currentReel.creativeDirection as CreativeDirection, currentReel.language, channel)}
              currentTone={currentReel.creativeDirection as CreativeDirection}
              currentLanguage={currentReel.language}
              currentDuration={currentReel.duration}
              onShiftTone={handleShiftTone}
              onShiftLanguage={handleShiftLanguage}
              onShiftDuration={handleShiftDuration}
              isLoading={isLoading}
            />

            <HlniReviewCard reel={currentReel} onUpdate={handleUpdateMetadata} />

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
                  canRegenerate={Boolean(apiSettings.apiKey?.trim()) || currentReel.generation?.source === 'openai' || currentReel.generation?.source === 'gemini'}
                />
              ))}
            </div>

            {/* Collapsible Reference: Production Notes Call Sheet */}
            <details className="mt-10 pt-6 border-t border-stone-200 group/details">
              <summary className="cursor-pointer text-xs font-semibold text-stone-500 hover:text-stone-900 flex items-center justify-between select-none py-2.5 px-3.5 rounded-lg hover:bg-stone-100/70 transition-colors bg-white border border-stone-200/80">
                <span>Shoot preparation: locations, props, and priorities</span>
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
          <div>Trust • Connection • Discovery</div>
        </div>
      </footer>
    </div>
  );
};
