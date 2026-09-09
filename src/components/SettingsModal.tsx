import React, { useState } from 'react';
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
  const [testingKey, setTestingKey] = useState(false);
  const [testResult, setTestResult] = useState<{ status: 'success' | 'error'; message: string } | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(
    Boolean(settings.isVerified && settings.apiKey === apiKey && settings.apiProvider === provider)
  );

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
        let connected = false;
        let errMsg = '';

        // Try gemini-3.6-flash generation
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`;
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: 'ping' }] }],
              generationConfig: { maxOutputTokens: 5 },
            }),
          });

          if (res.ok) {
            connected = true;
          } else {
            const errData = await res.json().catch(() => ({}));
            errMsg = errData.error?.message || `Status ${res.status}`;
          }
        } catch (e: any) {
          errMsg = e.message;
        }

        // If direct generation failed, check models list to verify key authenticity
        if (!connected) {
          try {
            const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
            if (modelsRes.ok) {
              connected = true;
            }
          } catch {
            // ignore
          }
        }

        if (connected) {
          setIsVerified(true);
          setTestResult({ status: 'success', message: '✓ Connected! Your Google Gemini API key is valid and working.' });
        } else {
          setIsVerified(false);
          setTestResult({ status: 'error', message: `Gemini Error: ${errMsg || 'Key rejected by Google API.'}` });
        }
      } else {
        // OpenAI testing
        const endpoint = 'https://api.openai.com/v1/models';
        const res = await fetch(endpoint, {
          method: 'GET',
          headers: { Authorization: `Bearer ${key}` },
        });

        if (res.ok) {
          setIsVerified(true);
          setTestResult({ status: 'success', message: '✓ Connected! Your OpenAI (GPT-4o) API key is valid and working.' });
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
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#AF1E2A]" />
            <h2 className="font-extrabold text-stone-900 text-base sm:text-lg tracking-tight">
              AI & API Configuration
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <form id="api-form" onSubmit={handleSave} className="space-y-4">
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
                    <span>Google Gemini (Flash)</span>
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
                    <span>OpenAI (GPT-4o)</span>
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
                    ? 'AIzaSy... or AQ... (Paste your free key from Google AI Studio)'
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
                        Your key starts with <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">{trimmedKey.slice(0, 3)}...</code>, which is a <strong>Google Gemini</strong> key. OpenAI (GPT-4o) requires keys starting with <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">sk-</code>.
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
                    <span>Switch to OpenAI (GPT-4o)</span>
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
                      <span>Test Key Connection</span>
                    </>
                  )}
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
                💡 When left empty, the app runs on the built-in offline Joy University Knowledge Engine. Adding a key enables live, hyper-creative AI generation.
              </p>
            </div>
          </form>

          {/* Guide Notes Section */}
          <div className="pt-2 border-t border-stone-100 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700">
              <HelpCircle className="w-4 h-4 text-[#AF1E2A]" />
              <span>How to get your API Key</span>
            </div>

            {provider === 'gemini' ? (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2.5">
                <div className="flex items-center justify-between font-bold text-stone-900">
                  <span className="text-[#AF1E2A]">Google Gemini Guide (Recommended & Free)</span>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#AF1E2A] hover:underline font-semibold"
                  >
                    <span>Get Free Gemini Key</span>
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
                  ✨ <strong>100% Free:</strong> Google Gemini offers an instant free tier with high speed and zero setup fee.
                </div>
              </div>
            ) : (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2.5">
                <div className="flex items-center justify-between font-bold text-stone-900">
                  <span className="text-stone-900">OpenAI (GPT-4o) Guide</span>
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
                  ⚠️ <strong>Important Note:</strong> A ChatGPT Plus consumer subscription does <em>not</em> provide API access. OpenAI API requires active developer billing credits. If you don't have paid credits, switch to <strong>Google Gemini (Free)</strong>.
                </div>
              </div>
            )}
          </div>

          {/* Privacy Box */}
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-emerald-900 leading-snug">
              <strong>100% Client-Side Privacy:</strong> Your key is stored solely in your local browser storage. It is never logged or shared with anyone else.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-stone-200 bg-stone-50/60 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="api-form"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#AF1E2A] hover:bg-[#8B1721] text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Configuration</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
