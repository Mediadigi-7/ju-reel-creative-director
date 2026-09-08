import React, { useState, useEffect } from 'react';

const STEPS = [
  'Analysing title & topic meaning',
  'Identifying student psychological tension',
  'Engineering scroll-stopping Hook',
  'Building Problem & Pattern Interrupt',
  'Formulating Value takeaway',
  'Drafting Payoff & Call-to-Action',
  'Writing camera & audio direction',
  'Finalising production call sheet',
];

export const GenerationLoader: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-lg mx-auto py-24 px-4">
      {/* Progress bar */}
      <div className="w-full h-0.5 bg-stone-100 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-stone-900 rounded-full transition-all duration-700"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">
        Creating storyboard
      </p>
      <p className="text-base font-medium text-stone-900 transition-all duration-300">
        {STEPS[step]}
      </p>

      {/* Step list */}
      <ul className="mt-8 space-y-2">
        {STEPS.map((s, i) => (
          <li
            key={i}
            className={`flex items-center gap-3 text-xs transition-colors duration-200 ${
              i < step
                ? 'text-stone-400'
                : i === step
                ? 'text-stone-900 font-semibold'
                : 'text-stone-300'
            }`}
          >
            <span
              className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${
                i < step ? 'bg-stone-300' : i === step ? 'bg-stone-900' : 'bg-stone-200'
              }`}
            />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
};
