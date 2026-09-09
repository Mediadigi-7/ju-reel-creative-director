import React, { useState, useEffect, useRef } from 'react';
import { Check, AlertCircle, RotateCw, Film, Compass, Clapperboard, ShieldCheck } from 'lucide-react';

export interface GenerationLoaderProps {
  title?: string;
  direction?: string;
  language?: string;
  isComplete?: boolean;
  error?: string | null;
  onCompleteAnimation?: () => void;
  onRetry?: () => void;
}

interface PipelineStage {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  targetProgress: number;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 1,
    title: 'Understand the title and topic',
    category: 'CONCEPT DECONSTRUCTION',
    subtitle: 'Analyzing core student question, search intent & topical context...',
    targetProgress: 14,
  },
  {
    id: 2,
    title: 'Identify audience psychology and tension',
    category: 'STUDENT PSYCHOLOGY',
    subtitle: 'Mapping peer anxiety, parent expectations & decision dilemmas...',
    targetProgress: 28,
  },
  {
    id: 3,
    title: 'Engineer the scroll-stopping hook',
    category: 'RETENTION HOOK',
    subtitle: 'Formulating 00:00–00:04 curiosity gap & opening tension...',
    targetProgress: 42,
  },
  {
    id: 4,
    title: 'Build problem and pattern interrupt',
    category: 'STORY ARCHITECTURE',
    subtitle: 'Confronting real campus choices & disrupting passive scroll...',
    targetProgress: 56,
  },
  {
    id: 5,
    title: 'Form the retention structure',
    category: 'PROGRESSIVE REVEAL',
    subtitle: 'Assembling 4 escalating reveals without premature spoilers...',
    targetProgress: 70,
  },
  {
    id: 6,
    title: 'Develop value, payoff and CTA',
    category: 'CONVERSION BEAT',
    subtitle: 'Synthesizing actionable takeaway & single high-intent next step...',
    targetProgress: 82,
  },
  {
    id: 7,
    title: 'Design camera, audio and visual direction',
    category: 'PRODUCTION CALL',
    subtitle: 'Directing 35mm handheld framing, lighting & campus environment...',
    targetProgress: 90,
  },
  {
    id: 8,
    title: 'Perform final creative QA and production preparation',
    category: 'QUALITY GATE',
    subtitle: 'Auditing language script compliance & final call sheet output...',
    targetProgress: 94, // Naturally holds here until real API completes!
  },
];

export const GenerationLoader: React.FC<GenerationLoaderProps> = ({
  title,
  direction = 'Student Relatable',
  language = 'English',
  isComplete = false,
  error = null,
  onCompleteAnimation,
  onRetry,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [progress, setProgress] = useState(8);
  const [isFinishing, setIsFinishing] = useState(false);
  const hasTriggeredCompletion = useRef(false);

  // Stage timer: Advance through stages 0 to 7 smoothly
  // Never loops (% is strictly avoided)
  useEffect(() => {
    if (error || isFinishing) return;

    // Stage progression intervals (decelerating naturally as it reaches later stages)
    const stageIntervals = [1800, 2000, 2100, 2200, 2300, 2400, 2500];
    const currentInterval = stageIntervals[activeStageIndex] || 2500;

    const timer = setTimeout(() => {
      setActiveStageIndex((prev) => {
        // Stop at the final stage (index 7 = Stage 8) and hold!
        if (prev < PIPELINE_STAGES.length - 1) {
          const next = prev + 1;
          setProgress(PIPELINE_STAGES[next].targetProgress);
          return next;
        }
        return prev;
      });
    }, currentInterval);

    return () => clearTimeout(timer);
  }, [activeStageIndex, error, isFinishing]);

  // Micro-progression when holding at final stage (Stage 8)
  // Keeps the UI alive and asymptotic between 92% and 94.8% without ever reaching 100%
  useEffect(() => {
    if (activeStageIndex !== PIPELINE_STAGES.length - 1 || isComplete || error || isFinishing) {
      return;
    }

    const holdPulse = setInterval(() => {
      setProgress((prev) => {
        if (prev < 94.8) {
          return Math.min(94.8, prev + 0.15);
        }
        return prev;
      });
    }, 400);

    return () => clearInterval(holdPulse);
  }, [activeStageIndex, isComplete, error, isFinishing]);

  // When real API responds successfully: animate smoothly to 100% and finish
  useEffect(() => {
    if (isComplete && !hasTriggeredCompletion.current && !error) {
      hasTriggeredCompletion.current = true;
      setIsFinishing(true);
      setActiveStageIndex(PIPELINE_STAGES.length - 1);
      setProgress(100);

      // Brief completion moment before smooth view transition
      const finishTimer = setTimeout(() => {
        if (onCompleteAnimation) {
          onCompleteAnimation();
        }
      }, 650);

      return () => clearTimeout(finishTimer);
    }
  }, [isComplete, error, onCompleteAnimation]);

  const currentStage = PIPELINE_STAGES[activeStageIndex];

  return (
    <div className="w-full max-w-2xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Header Ribbon */}
        <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-stone-100 bg-gradient-to-b from-stone-50/70 to-white">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1721]/5 border border-[#8B1721]/15 text-[#8B1721]">
              <span className="w-2 h-2 rounded-full bg-[#8B1721] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em]">
                AI Creative-Production Pipeline
              </span>
            </div>

            {/* Bounded Progress Metric */}
            <div className="flex items-center gap-1.5 font-mono text-xs text-stone-500 font-semibold">
              <span className="text-stone-400 text-[10px] tracking-wider uppercase font-sans">Progress</span>
              <span className={`text-sm font-bold transition-colors duration-300 ${isFinishing ? 'text-emerald-700 font-extrabold' : 'text-stone-900'}`}>
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Reel Context Display */}
          {title && (
            <div className="mt-2 space-y-1.5">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight line-clamp-2">
                “{title}”
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 font-medium">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                  <Compass className="w-3 h-3 text-stone-400" />
                  {direction}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                  <span>Language:</span>
                  <strong className="text-stone-900 font-semibold">{language}</strong>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                  <Film className="w-3 h-3 text-stone-400" />
                  9:16 Vertical Reel
                </span>
              </div>
            </div>
          )}

          {/* Non-Linear Progress Bar */}
          <div className="mt-5 w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                isFinishing
                  ? 'bg-emerald-600'
                  : error
                  ? 'bg-red-500'
                  : 'bg-gradient-to-r from-[#AF1E2A] via-[#8B1721] to-stone-900'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Error State Callout (if API failed) */}
        {error ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-stone-900">Creative Generation Interrupted</h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                {error}
              </p>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1721] hover:bg-[#73131B] text-white text-xs font-bold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Retry Generation</span>
              </button>
            )}
          </div>
        ) : (
          /* Active Pipeline Stages */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Active Stage Highlight Banner */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
              isFinishing
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : 'bg-stone-50/90 border-stone-200/90 text-stone-900'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1 min-w-0">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                    isFinishing ? 'text-emerald-700' : 'text-[#8B1721]'
                  }`}>
                    {isFinishing ? 'STATUS: READY' : `CURRENT PHASE • ${currentStage.category}`}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight leading-snug">
                    {isFinishing ? 'Production Call Sheet Complete' : currentStage.title}
                  </h4>
                  <p className="text-xs text-stone-600 font-normal leading-relaxed">
                    {isFinishing
                      ? 'All 6 beats synthesized with strict retention architecture and native script.'
                      : currentStage.subtitle}
                  </p>
                </div>

                <div className="flex-shrink-0 mt-0.5">
                  {isFinishing ? (
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center shadow-2xs">
                      <Clapperboard className="w-3.5 h-3.5 text-[#8B1721] animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 8-Stage Sequential Visual Timeline */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-3 px-1">
                Creative Production Roadmap
              </p>

              <div className="space-y-2.5">
                {PIPELINE_STAGES.map((st, idx) => {
                  const isPast = idx < activeStageIndex || isFinishing;
                  const isCurrent = idx === activeStageIndex && !isFinishing;

                  return (
                    <div
                      key={st.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                        isCurrent
                          ? 'bg-stone-50 border border-stone-200/80 shadow-2xs'
                          : 'opacity-85 hover:opacity-100'
                      }`}
                    >
                      {/* Step Indicator */}
                      <div className="flex-shrink-0">
                        {isPast ? (
                          <div className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-5 h-5 rounded-full border-2 border-[#8B1721] bg-[#8B1721]/10 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-[#8B1721] animate-ping" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-stone-200 bg-stone-100 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                          </div>
                        )}
                      </div>

                      {/* Stage Name & Details */}
                      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                        <span
                          className={`text-xs truncate ${
                            isCurrent
                              ? 'font-bold text-stone-900'
                              : isPast
                              ? 'font-medium text-stone-600'
                              : 'font-normal text-stone-400'
                          }`}
                        >
                          {st.title}
                        </span>

                        <span className="text-[10px] uppercase font-mono font-semibold text-stone-400 flex-shrink-0">
                          {isPast ? (
                            <span className="text-emerald-700">Done</span>
                          ) : isCurrent ? (
                            <span className="text-[#8B1721] font-bold">Active</span>
                          ) : (
                            <span>Pending</span>
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Proof Note */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>Joy University Retention & Language Compliance Engine</span>
              </span>
              <span className="font-mono text-[10px]">6 Beats • Vertical 9:16</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

