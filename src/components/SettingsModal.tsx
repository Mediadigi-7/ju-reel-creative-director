import React, { useState } from 'react';
import { X, Key, ShieldCheck, Check, ExternalLink, HelpCircle, Info } from 'lucide-react';
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

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      apiKey: apiKey.trim(),
      apiProvider: provider,
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
                  onClick={() => setProvider('gemini')}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-bold border transition-all text-left flex items-center justify-between ${
                    provider === 'gemini'
                      ? 'border-[#AF1E2A] bg-red-50/80 text-[#AF1E2A] ring-1 ring-[#AF1E2A]'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>Google Gemini (2.0 Flash)</span>
                  {provider === 'gemini' && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setProvider('openai')}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-bold border transition-all text-left flex items-center justify-between ${
                    provider === 'openai'
                      ? 'border-[#AF1E2A] bg-red-50/80 text-[#AF1E2A] ring-1 ring-[#AF1E2A]'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>OpenAI (GPT-4o)</span>
                  {provider === 'openai' && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* API Key Input */}
            <div>
              <label
                htmlFor="api-key-input"
                className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5"
              >
                {provider === 'gemini' ? 'Google Gemini API Key' : 'OpenAI API Key'} (Optional)
              </label>
              <input
                id="api-key-input"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={
                  provider === 'gemini'
                    ? 'AIzaSy... (Leave empty for built-in Creative Engine)'
                    : 'sk-... (Leave empty for built-in Creative Engine)'
                }
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#AF1E2A] bg-white font-medium"
              />
              <p className="text-[11px] text-stone-500 mt-1.5 leading-relaxed">
                💡 <strong>Zero Setup:</strong> When left empty, the application runs on the built-in Joy University Creative Intelligence rules.
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
                  <span className="text-[#AF1E2A]">Google Gemini Guide (Recommended)</span>
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
                  <li>Copy your key (starts with <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">AIzaSy...</code>) and paste it above.</li>
                </ol>
                <div className="pt-1 text-[11px] text-stone-500 border-t border-stone-200/60">
                  ✨ <strong>Note:</strong> Google Gemini 2.0 Flash offers a generous <strong>free tier</strong> with high-speed response times.
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
                  <li>Log in or create an account.</li>
                  <li>Navigate to <strong>API Keys</strong> → click <strong>"Create new secret key"</strong>.</li>
                  <li>Copy your secret key (starts with <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">sk-...</code>) and paste it above.</li>
                </ol>
                <div className="pt-1 text-[11px] text-stone-500 border-t border-stone-200/60">
                  ✨ <strong>Note:</strong> Requires active OpenAI API credits on your OpenAI developer account.
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
