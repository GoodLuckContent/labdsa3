import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, CheckCircle, ShieldAlert, AlertTriangle, ArrowRight } from "lucide-react";
import { Question, MCQQuestion, TFQuestion, FIBQuestion } from "../data/questionBank";
import { WarningOverlay } from "./WarningOverlay";

interface TestScreenProps {
  studentName: string;
  questions: Question[];
  onSubmit: (score: number, tabSwitches: number, fullscreenExits: number, submittedBy: "user" | "timeout" | "force_submit") => void;
}

export function TestScreen({ studentName, questions, onSubmit }: TestScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
  const [isPaused, setIsPaused] = useState(false);
  const [warningType, setWarningType] = useState<"fullscreen" | "tab" | null>(null);

  // Cheat Warning Counters
  const [tabSwitches, setTabSwitches] = useState(0);
  const [fullscreenExits, setFullscreenExits] = useState(0);

  // Input states for FIB
  const [fibInput, setFibInput] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentIndex];

  // Request Fullscreen on Start
  useEffect(() => {
    const triggerFullscreen = async () => {
      try {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        }
      } catch (err) {
        console.warn("Fullscreen permission blocked by container iframe.", err);
      }
    };
    
    // Slight delay to ensure countdown transitions are done
    const timer = setTimeout(() => {
      triggerFullscreen();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleForceSubmit("timeout");
      return;
    }

    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, isPaused]);

  // Listen to Window Blur (Tab Switching) & Fullscreen changes
  useEffect(() => {
    const handleBlur = () => {
      // Focus lost - tab change or app minimize
      const nextTabSwitches = tabSwitches + 1;
      setTabSwitches(nextTabSwitches);
      if (nextTabSwitches >= 3) {
        handleForceSubmit("force_submit", nextTabSwitches, fullscreenExits);
      } else {
        setIsPaused(true);
        setWarningType("tab");
      }
    };

    const handleFullscreenChange = () => {
      // Check if exited fullscreen
      if (!document.fullscreenElement) {
        const nextExits = fullscreenExits + 1;
        setFullscreenExits(nextExits);
        if (nextExits >= 3) {
          handleForceSubmit("force_submit", tabSwitches, nextExits);
        } else {
          setIsPaused(true);
          setWarningType("fullscreen");
        }
      }
    };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [tabSwitches, fullscreenExits]);

  // Clean input field whenever question index changes
  useEffect(() => {
    if (currentQuestion.type === "fib") {
      setFibInput(answers[currentQuestion.id] || "");
    }
  }, [currentIndex, currentQuestion]);

  const handleSelectOption = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleSelectTF = (value: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleFibChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFibInput(value);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  // Check if current question has been answered
  const isCurrentQuestionAnswered = () => {
    const ans = answers[currentQuestion.id];
    if (currentQuestion.type === "fib") {
      return ans !== undefined && ans.trim().length > 0;
    }
    return ans !== undefined;
  };

  const handleNext = () => {
    if (isCurrentQuestionAnswered()) {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Submit Test!
        calculateAndSubmit("user");
      }
    }
  };

  // Format time left (MM:SS)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Resume after warning dismissed
  const handleResume = async () => {
    setIsPaused(false);
    setWarningType(null);
    
    // Try to re-trigger fullscreen if it was exited
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Could not re-enter fullscreen inside safe sandbox environment.");
    }
  };

  const calculateAndSubmit = (submittedBy: "user" | "timeout" | "force_submit", finalTabs = tabSwitches, finalExits = fullscreenExits) => {
    // Score computation
    let score = 0;
    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns === undefined) return;

      if (q.type === "mcq") {
        if (userAns === q.answer) score += 1;
      } else if (q.type === "tf") {
        if (userAns === q.answer) score += 1;
      } else if (q.type === "fib") {
        // Case-insensitive, whitespace-trimmed comparison
        const userClean = userAns.trim().toLowerCase().replace(/\s+/g, " ");
        const correctClean = q.answer.trim().toLowerCase().replace(/\s+/g, " ");
        if (userClean === correctClean) score += 1;
      }
    });

    // Exit fullscreen cleanly
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    } catch (e) {}

    onSubmit(score, finalTabs, finalExits, submittedBy);
  };

  const handleForceSubmit = (type: "timeout" | "force_submit", finalTabs = tabSwitches, finalExits = fullscreenExits) => {
    calculateAndSubmit(type, finalTabs, finalExits);
  };

  // Progress Percentage calculation
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  // Determine timer ring color/pulse
  const isTimeCritical = timeLeft < 60; // Less than 1 minute
  const isTimeWarning = timeLeft < 180 && timeLeft >= 60; // Less than 3 minutes

  return (
    <div className="relative w-full h-full bg-slate-950 text-slate-100 flex flex-col justify-between select-none">
      {/* Dynamic Background Grid Decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="space-y-0.5">
          <p className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
            Active Candidate
          </p>
          <p className="text-sm font-bold text-white tracking-wide">
            {studentName}
          </p>
        </div>

        {/* Security / anti-cheat badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-mono">
          <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
          <span className="text-slate-400">Security:</span>
          <span className="text-emerald-400 font-bold uppercase">Locked</span>
        </div>

        {/* Timer countdown bubble */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Time Remaining</p>
            <p className={`font-mono text-lg font-bold ${isTimeCritical ? "text-red-500 animate-pulse" : isTimeWarning ? "text-amber-400" : "text-slate-200"}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
          <div className={`p-2 rounded-xl border flex items-center justify-center ${
            isTimeCritical ? "bg-red-950/40 border-red-500/50 text-red-500" : isTimeWarning ? "bg-amber-950/30 border-amber-500/30 text-amber-500" : "bg-slate-950 border-slate-800 text-slate-400"
          }`}>
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Progress Bar Indicator */}
      <div className="relative z-10 w-full h-1 bg-slate-900 shrink-0">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-800"
        />
      </div>

      {/* Main Content Box */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-6 overflow-hidden">
        <div className="w-full max-w-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 flex flex-col justify-between min-h-[440px] max-h-[85vh] relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {/* Question Meta Row */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
                  {currentQuestion.type === "mcq" ? "Multiple Choice" : currentQuestion.type === "tf" ? "True / False Statement" : "Fill In The Blank"}
                </span>
                <span className="text-xs font-mono text-slate-500 font-bold">
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              {/* Question Text */}
              <div className="mb-6 flex-1 flex flex-col justify-center">
                <h3 className="font-display text-base md:text-lg font-bold text-white tracking-wide leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Input Workspace (MCQ/TF/FIB) */}
              <div className="space-y-3 mb-6">
                {currentQuestion.type === "mcq" && (currentQuestion as MCQQuestion).options.map((option, index) => {
                  const isSelected = answers[currentQuestion.id] === option;
                  const labelPrefix = String.fromCharCode(65 + index); // A, B, C

                  return (
                    <motion.button
                      key={`${currentQuestion.id}_opt_${index}`}
                      id={`opt_${labelPrefix.toLowerCase()}`}
                      onClick={() => handleSelectOption(option)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full p-4 rounded-xl border text-left text-sm font-sans tracking-wide transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? "bg-red-950/20 border-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.1)] font-medium"
                          : "bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950/80"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center border shrink-0 ${
                        isSelected
                          ? "bg-red-600 border-red-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}>
                        {labelPrefix}
                      </span>
                      <span>{option}</span>
                    </motion.button>
                  );
                })}

                {currentQuestion.type === "tf" && (
                  <div className="grid grid-cols-2 gap-4">
                    {[true, false].map((val) => {
                      const isSelected = answers[currentQuestion.id] === val;
                      return (
                        <motion.button
                          key={`${currentQuestion.id}_tf_${val}`}
                          id={`tf_${val ? 'true' : 'false'}`}
                          onClick={() => handleSelectTF(val)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`h-24 rounded-xl border text-center font-display font-bold text-base transition-all cursor-pointer flex flex-col items-center justify-center gap-2 uppercase tracking-widest ${
                            isSelected
                              ? "bg-red-950/20 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.1)]"
                              : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-950/80"
                          }`}
                        >
                          <span className="text-lg">{val ? "True" : "False"}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.type === "fib" && (
                  <div className="space-y-2">
                    <input
                      id="fib_input_field"
                      type="text"
                      placeholder="Type your answer statement..."
                      value={fibInput}
                      onChange={handleFibChange}
                      className="w-full h-14 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-sans text-sm tracking-wide text-center"
                      autoComplete="off"
                      autoFocus
                    />
                    <p className="text-[10px] font-mono text-slate-500 text-center">
                      Ensure spelling is accurate. Answers are evaluated case-insensitively ignoring double spaces.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Footer */}
          <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 shrink-0 mt-4">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <AlertTriangle className="w-3.5 h-3.5" /> No backtrack allowed
            </div>

            <motion.button
              id="next_question_button"
              disabled={!isCurrentQuestionAnswered()}
              whileHover={isCurrentQuestionAnswered() ? { scale: 1.02 } : {}}
              whileTap={isCurrentQuestionAnswered() ? { scale: 0.98 } : {}}
              onClick={handleNext}
              className={`px-6 h-12 rounded-xl font-display text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all ${
                isCurrentQuestionAnswered()
                  ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-950/45 text-glow"
                  : "bg-slate-800/40 border border-slate-800 text-slate-600 cursor-not-allowed"
              }`}
            >
              {currentIndex === questions.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Submit Exam
                </>
              ) : (
                <>
                  Next Question <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>

        </div>
      </div>

      {/* Safety Bottom Label */}
      <div className="relative z-10 py-3 bg-slate-950 border-t border-slate-900 text-center text-[10px] font-mono text-slate-600 uppercase tracking-widest shrink-0">
        Anti-Cheat Integrity Enforced • DO NOT exit window or tab • Attempt #{Date.now().toString().slice(-4)}
      </div>

      {/* Warnings & Security Suspended Overlays */}
      {isPaused && warningType && (
        <WarningOverlay
          type={warningType}
          warningCount={warningType === "fullscreen" ? fullscreenExits : tabSwitches}
          onResume={handleResume}
        />
      )}
    </div>
  );
}
