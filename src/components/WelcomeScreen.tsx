import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ClipboardCheck, Award, Calendar, AlertTriangle, ShieldCheck, Trash2 } from "lucide-react";
import { TestAttempt } from "../types";

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  attempts: TestAttempt[];
  onClearHistory: () => void;
}

export function WelcomeScreen({ onStart, attempts, onClearHistory }: WelcomeScreenProps) {
  const [name, setName] = useState("");
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  // Generate unique background particles on mount
  useEffect(() => {
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 6 + 4
    }));
    setParticles(generated);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-100 overflow-hidden px-4 select-none">
      {/* Background Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-red-500/30 rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: ["0px", "-120px", "0px"],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        {/* Subtle glowing auras */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-red-900/10 blur-3xl animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-slate-900/20 blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row gap-8 items-stretch max-h-[90vh]">
        {/* Registration Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-center p-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden"
          id="registration_card"
        >
          {/* Accent Header Line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 via-rose-500 to-red-800" />

          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-red-950/50 text-red-400 border border-red-900/30 mb-3 uppercase">
              <ShieldCheck className="w-3.5 h-3.5" /> SECURE EXAM SYSTEM
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-1">
              Lab 3 Quiz
            </h1>
            <p className="text-xs font-mono text-red-400/85 mb-3 font-semibold tracking-wide">
              Developed by: Muhammad Sheeraz
            </p>
            <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto">
              This exam comprising 15 randomized questions enforces anti-cheat security. Pressing START triggers locked fullscreen mode.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="student_name" className="block text-xs font-mono tracking-wider font-semibold text-slate-300 uppercase">
                Student Full Name
              </label>
              <input
                id="student_name"
                type="text"
                placeholder="Enter your name to register..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                className="w-full h-12 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all font-sans text-sm tracking-wide text-center"
                autoComplete="off"
                required
              />
            </div>

            <motion.button
              id="start_exam_button"
              type="submit"
              disabled={!name.trim()}
              whileHover={name.trim() ? { scale: 1.02 } : {}}
              whileTap={name.trim() ? { scale: 0.98 } : {}}
              className={`w-full h-14 rounded-xl font-display text-base font-bold uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                name.trim()
                  ? "bg-gradient-to-r from-red-600 to-rose-700 text-white hover:shadow-red-900/20 shadow-red-500/10 hover:from-red-500 hover:to-rose-600"
                  : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
              }`}
            >
              <ClipboardCheck className="w-5 h-5" /> Start Exam
            </motion.button>
          </form>

          {/* Guidelines Mini Panel */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 grid grid-cols-2 gap-4 text-left">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-red-950/50 border border-red-900/30 flex items-center justify-center text-red-400 shrink-0 font-mono text-xs font-bold">15</div>
              <div>
                <p className="text-xs font-semibold text-slate-200">15 Questions</p>
                <p className="text-[10px] text-slate-400">8 MCQs, 4 T/F, 3 FIB</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-red-950/50 border border-red-900/30 flex items-center justify-center text-red-400 shrink-0 font-mono text-xs font-bold">10</div>
              <div>
                <p className="text-xs font-semibold text-slate-200">10 Min Timer</p>
                <p className="text-[10px] text-slate-400">Auto-submit at 00:00</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* History / Attempts Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1 flex flex-col p-6 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl h-[360px] md:h-[400px] overflow-hidden"
          id="history_card"
        >
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-4 shrink-0">
            <h2 className="font-display text-base font-bold tracking-tight text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-red-500" /> Exam Results Hub
            </h2>
          </div>

          {attempts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-950/25 rounded-xl border border-slate-800/30">
              <ClipboardCheck className="w-10 h-10 text-slate-700 mb-2" />
              <p className="text-xs font-semibold text-slate-400">No attempts found</p>
              <p className="text-[10px] text-slate-500 max-w-[200px] mt-1">
                Completed tests will appear here. Teachers can screenshot results from this screen.
              </p>
            </div>
          ) : (
            <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
              {attempts.map((att) => (
                <div
                  key={att.id}
                  className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-left relative overflow-hidden group hover:border-slate-700 transition-all"
                >
                  {/* Left edge percentage indicator bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${att.percentage >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  
                  <div className="pl-2 space-y-1">
                    <p className="text-xs font-bold text-slate-200 truncate max-w-[140px] md:max-w-[180px]">
                      {att.studentName}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                      <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" /> {new Date(att.date).toLocaleDateString()}</span>
                      {att.cheatCount.tabSwitches + att.cheatCount.fullscreenExits > 0 && (
                        <span className="text-amber-500 flex items-center gap-0.5">
                          <AlertTriangle className="w-3 h-3" /> {att.cheatCount.tabSwitches + att.cheatCount.fullscreenExits} Warnings
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-display font-extrabold text-white">
                      {att.score} <span className="text-[10px] font-normal text-slate-400">/ 15</span>
                    </p>
                    <p className={`text-[10px] font-mono font-bold ${att.percentage >= 80 ? 'text-emerald-400' : att.percentage >= 50 ? 'text-blue-400' : 'text-rose-400'}`}>
                      {att.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
