import { apiTestAiGeneration } from '../services/api.js';
import type { AiGenerationTestResult } from '../../shared/providers.js';
import React, { useState, useRef, useEffect } from 'react';
import { X, Key, ShieldCheck, Check, ExternalLink, HelpCircle, Info, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { ApiSettings, saveApiSettings } from '../services/storage.js';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSaveSettings: (settings: ApiSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [apiKey, setApiKey] = useState(settings.apiKey || '');
  const [provider, setProvider] = useState<'gemini' | 'openai'>(settings.apiProvider || 'gemini');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testingGeneration, setTestingGeneration] = useState(false);
  const [generationResult, setGenerationResult] = useState<AiGenerationTestResult | null>(null);
  const generationRequest = useRef(0);
  const generationAbort = useRef<AbortController | null>(null);
  const [testingKey, setTestingKey] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(
    Boolean(settings.isVerified && settings.apiKey === apiKey && settings.apiProvider === provider)
  );

  useEffect(() => {
    if (!isOpen) return;
    setApiKey(settings.apiKey || ''); setProvider(settings.apiProvider || 'gemini');
    setIsVerified(Boolean(settings.isVerified && settings.apiKey));
    setTestResult(null); setSavedSuccess(false);
  }, [isOpen]);
  useEffect(() => {
    generationRequest.current++;
    generationAbort.current?.abort();
    setGenerationResult(null); setTestingGeneration(false);
  }, [apiKey, provider, isOpen]);

  const handleTestGeneration = async () => {
    const request = ++generationRequest.current;
    const controller = new AbortController(); generationAbort.current = controller;
    setTestingGeneration(true); setGenerationResult(null);
    const result = await apiTestAiGeneration(provider, apiKey, AbortSignal.any([controller.signal, AbortSignal.timeout(55000)]));
    if (generationRequest.current !== request) return;
    setGenerationResult(result); setTestingGeneration(false);
    if (result.success) setIsVerified(true);
    else if (result.category === 'authentication') setIsVerified(false);
  };

  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), a[href], select, [tabindex="0"]') || []);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); previous?.focus(); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmedKey = apiKey.trim();
  const isGeminiFormat = trimmedKey.startsWith('AIza') || trimmedKey.startsWith('AQ.');
  const isOpenAiFormat = trimmedKey.startsWith('sk-');
  const isMismatchGeminiOnOpenAi = provider === 'openai' && isGeminiFormat;
  const isMismatchOpenAiOnGemini = provider === 'gemini' && isOpenAiFormat;

  const handleTestKey = async () => {
    const key = apiKey.trim();
    if (!key) {
      setTestResult({ status: 'error', message: 'Please enter an API key to test.' });
      setIsVerified(false);
      return;
    }
    setTestingKey(true);
    setTestResult(null);

    try {
      if (provider === 'gemini') {
        const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models', {
          headers:{'x-goog-api-key':key},signal:AbortSignal.timeout(20000),
        });
        setIsVerified(res.ok);
        setTestResult(res.ok
          ? {status:'success',message:'Key verified. Test AI generation to check the model and free-tier quota.'}
          : {status:'error',message:`Gemini key verification failed (HTTP ${res.status}). Check your AI Studio key and account access.`});
      } else {
        // OpenAI testing
        const endpoint = 'https://api.openai.com/v1/models';
        const res = await fetch(endpoint, {
          method: 'GET',
          signal: AbortSignal.timeout(20000),
          headers: { Authorization: `Bearer ${key}` },
        });

        if (res.ok) {
          setIsVerified(true);
          setTestResult({ status: 'success', message: 'Key verified. Create a reel to check generation access.' });
        } else {
          setIsVerified(false);
          const errData = await res.json().catch(() => ({}));
          const rawMsg = errData.error?.message || `OpenAI API returned status ${res.status}`;
          let displayMsg = `OpenAI Error: ${rawMsg}`;
          if (res.status === 401 && (key.startsWith('AQ.') || key.startsWith('AIza'))) {
            displayMsg = `OpenAI Error: Key mismatch. This is a Google Gemini key (starts with "${key.slice(0, 3)}..."). OpenAI keys start with "sk-". Click "Switch to Google Gemini" above.`;
          } else if (res.status === 401) {
            displayMsg = `OpenAI Error: Incorrect API key. OpenAI keys start with "sk-" and require active billing credits on platform.openai.com.`;
          } else if (res.status === 429) {
            displayMsg = `OpenAI Error: Insufficient quota or rate limited. Please ensure your OpenAI account has paid credits.`;
          }
          setTestResult({ status: 'error', message: displayMsg });
        }
      }
    } catch (err: any) {
      setIsVerified(false);
      setTestResult({ status: 'error', message: `Connection failed: ${err.message}` });
    } finally {
      setTestingKey(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = apiKey.trim();
    const updated: ApiSettings = {
      apiKey: cleanKey,
      apiProvider: provider,
      isVerified: cleanKey.length > 0 ? isVerified : false,
      lastTestedProvider: isVerified ? provider : undefined,
    };
    saveApiSettings(updated);
    onSaveSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Connect AI" className="bg-white rounded-2xl border border-stone-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#AF1E2A]" />
            <h2 className="font-extrabold text-stone-900 text-base sm:text-lg tracking-tight">
              Connect AI
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close AI settings"
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <form id="api-form" onSubmit={handleSave} className="space-y-4">
            <fieldset disabled={testingGeneration || testingKey} className="space-y-4">
            {/* Provider Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Select AI Provider
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setProvider('gemini');
                    setTestResult(null);
                    if (settings.apiProvider !== 'gemini' || settings.apiKey !== apiKey) {
                      setIsVerified(false);
                    }
                  }}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-bold border transition-all text-left flex items-center justify-between ${
                    provider === 'gemini'
                      ? isVerified
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-800 ring-2 ring-emerald-500/60 shadow-xs'
                        : 'border-stone-400 bg-stone-100 text-stone-900 ring-1 ring-stone-400'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {provider === 'gemini' && isVerified && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                    <span>Google Gemini (free tier)</span>
                  </span>
                  {provider === 'gemini' && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        isVerified ? 'text-emerald-600' : 'text-stone-700'
                      }`}
                    />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProvider('openai');
                    setTestResult(null);
                    if (settings.apiProvider !== 'openai' || settings.apiKey !== apiKey) {
                      setIsVerified(false);
                    }
                  }}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-bold border transition-all text-left flex items-center justify-between ${
                    provider === 'openai'
                      ? isVerified
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-800 ring-2 ring-emerald-500/60 shadow-xs'
                        : 'border-stone-400 bg-stone-100 text-stone-900 ring-1 ring-stone-400'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {provider === 'openai' && isVerified && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    )}
                    <span>OpenAI (API credits)</span>
                  </span>
                  {provider === 'openai' && (
                    <Check
                      className={`w-3.5 h-3.5 ${
                        isVerified ? 'text-emerald-600' : 'text-stone-700'
                      }`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* API Key Input */}
            <div>
              <label
                htmlFor="api-key-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5"
              >
                {provider === 'gemini' ? 'Google Gemini API Key' : 'OpenAI API Key'}
              </label>
              <input
                id="api-key-input"
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestResult(null);
                  setIsVerified(false);
                }}
                placeholder={
                  provider === 'gemini'
                    ? 'AIzaSy... or AQ... (Paste your key from Google AI Studio)'
                    : 'sk-... (Paste your OpenAI API key)'
                }
                className={`w-full px-3.5 py-2.5 text-xs rounded-lg border font-mono text-stone-900 focus:outline-none bg-white font-medium transition-all ${
                  isVerified
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-50/10'
                    : isMismatchGeminiOnOpenAi || isMismatchOpenAiOnGemini
                    ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-50/10'
                    : 'border-stone-300 focus:ring-1 focus:ring-[#AF1E2A]'
                }`}
              />

              {/* Mismatch Warning Callouts */}
              {isMismatchGeminiOnOpenAi && (
                <div className="mt-2.5 p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="font-bold text-amber-900">Google Gemini Key Detected for OpenAI!</p>
                      <p className="text-amber-800 text-[11px] leading-relaxed">
                        Your key starts with <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">{trimmedKey.slice(0, 3)}...</code>, which is a <strong>Google Gemini</strong> key. OpenAI requires keys starting with <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">sk-</code>.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setProvider('gemini');
                      setTestResult(null);
                    }}
                    className="self-start ml-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Switch to Google Gemini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {isMismatchOpenAiOnGemini && (
                <div className="mt-2.5 p-3 rounded-xl bg-blue-50 border border-blue-300 text-blue-950 text-xs flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="font-bold text-blue-900">OpenAI Key Detected for Gemini!</p>
                      <p className="text-blue-800 text-[11px] leading-relaxed">
                        Your key starts with <code className="bg-blue-100 px-1 py-0.5 rounded font-mono font-bold">sk-</code>, which is an <strong>OpenAI</strong> API key. Google Gemini keys start with <code className="bg-blue-100 px-1 py-0.5 rounded font-mono font-bold">AIza...</code> or <code className="bg-blue-100 px-1 py-0.5 rounded font-mono font-bold">AQ...</code>.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setProvider('openai');
                      setTestResult(null);
                    }}
                    className="self-start ml-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Switch to OpenAI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Test Button & Status */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleTestKey}
                  disabled={testingKey || !apiKey.trim()}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 hover:border-stone-400 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {testingKey ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#AF1E2A]" />
                      <span>Testing Key...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-3.5 h-3.5" />
                      <span>Verify key</span>
                    </>
                  )}
                </button>
                <button type="button" onClick={handleTestGeneration} disabled={testingGeneration || testingKey || !apiKey.trim() || isMismatchGeminiOnOpenAi || isMismatchOpenAiOnGemini} className="px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-50 disabled:opacity-50">
                  {testingGeneration ? 'Testing generation…' : 'Test AI generation'}
                </button>
                {apiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      setApiKey('');
                      setTestResult(null);
                      setIsVerified(false);
                    }}
                    className="text-[11px] text-stone-400 hover:text-stone-700 underline"
                  >
                    Clear key
                  </button>
                )}
              </div>

              <p className="text-[11px] text-stone-500 mt-2">Verify key checks API access. Test AI generation plans a concept, then asks the app server to create a sample storyboard. {provider === 'gemini' ? 'For free-only use, choose an AI Studio project with billing disabled. Requests use its free quota; availability and limits depend on your account and region.' : 'OpenAI requires API credits. Choose Gemini for the free-tier workflow.'}</p>
              {generationResult && <div role="status" className={`mt-3 p-3 rounded-lg border text-xs ${generationResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
                <p className="font-semibold">{generationResult.success ? 'Live generation passed' : 'Live generation failed'}</p>
                <p className="mt-1">{generationResult.message}</p>
                <p className="mt-2">{generationResult.provider === 'openai' ? 'OpenAI' : 'Google Gemini'} · {generationResult.model}</p>
                <p>{new Date(generationResult.checkedAt).toLocaleString()} · {(generationResult.elapsedMs / 1000).toFixed(1)}s</p>
                <p className="mt-1">This tests access and output checks. Review generated content separately for creative quality.</p>
              </div>}
              {testResult && (
                <div
                  className={`mt-2.5 p-2.5 rounded-lg text-xs flex items-start gap-2 ${
                    testResult.status === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {testResult.status === 'success' ? (
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="leading-snug">{testResult.message}</span>
                </div>
              )}

              <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                Without a key, you can try offline sample templates. With a key, your ideas are sent to the selected AI provider for generation.
              </p>
            </div>
            </fieldset>
          </form>

          {/* Guide Notes Section */}
          <details className="pt-2 border-t border-stone-100 space-y-3">
            <summary className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
              <HelpCircle className="w-4 h-4 text-[#AF1E2A]" />
              <span>Need an API key? Setup guide</span>
            </summary>

            {provider === 'gemini' ? (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2.5">
                <div className="flex items-center justify-between font-bold text-stone-900">
                  <span className="text-[#AF1E2A]">Google Gemini setup</span>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#AF1E2A] hover:underline font-semibold"
                  >
                    <span>Get Gemini Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-600 font-normal leading-relaxed">
                  <li>Visit <strong className="text-stone-800">Google AI Studio</strong> (aistudio.google.com).</li>
                  <li>Sign in with your Google account.</li>
                  <li>Click <strong>"Create API key"</strong>.</li>
                  <li>Copy your key (starts with <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">AIzaSy...</code> or <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">AQ...</code>) and paste it above.</li>
                </ol>
                <div className="pt-1 text-[11px] text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                  ✨ <strong>Provider billing:</strong> Gemini availability, pricing, and quotas depend on your account and selected model.
                </div>
              </div>
            ) : (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2.5">
                <div className="flex items-center justify-between font-bold text-stone-900">
                  <span className="text-stone-900">OpenAI Guide</span>
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#AF1E2A] hover:underline font-semibold"
                  >
                    <span>Get OpenAI Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-600 font-normal leading-relaxed">
                  <li>Visit <strong className="text-stone-800">OpenAI Platform</strong> (platform.openai.com).</li>
                  <li>Log in or create a developer account.</li>
                  <li>Navigate to <strong>API Keys</strong> → click <strong>"Create new secret key"</strong>.</li>
                  <li>Copy your secret key (starts strictly with <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">sk-...</code>) and paste it above.</li>
                </ol>
                <div className="pt-1 text-[11px] text-amber-800 bg-amber-50/80 p-2 rounded-lg border border-amber-200 leading-relaxed">
                  ⚠️ <strong>Important Note:</strong> A ChatGPT subscription does <em>not</em> provide API access. OpenAI API requires active developer billing credits. Check your provider account for current billing and quota requirements.
                </div>
              </div>
            )}
          </details>

          {/* Privacy Box */}
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-emerald-900 leading-snug">
              <strong>How your key is used:</strong> Your key is saved in this browser and sent to the generation server and selected AI provider when you create a reel. Use your own device and clear the key on shared devices.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50/60 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close AI settings"
            className="px-3.5 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="api-form"
            disabled={testingGeneration || testingKey}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#AF1E2A] hover:bg-[#8B1721] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save AI settings</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
