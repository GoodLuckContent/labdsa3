import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, RefreshCw, AlertTriangle, FileText } from "lucide-react";

interface ResultScreenProps {
  studentName: string;
  score: number; // out of 15
  tabSwitches: number;
  fullscreenExits: number;
  submittedBy: "user" | "timeout" | "force_submit";
  onRestart: () => void;
}

export function ResultScreen({ studentName, score, tabSwitches, fullscreenExits, submittedBy, onRestart }: ResultScreenProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; color: string; tx: number; ty: number }[]>([]);
  const percentage = (score / 15) * 100;

  // Generate confetti burst particles
  useEffect(() => {
    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];
    const generated = Array.from({ length: 60 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 250 + 100;
      return {
        id: i,
        x: 50, // center percent
        y: 45, // center percent
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance
      };
    });
    setParticles(generated);
  }, []);

  // Simple cryptographic-looking verification code for teachers
  const verificationCode = `OOP-${score}-${studentName.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3)}-${Date.now().toString().slice(-6)}`;

  // Performance descriptors
  const getFeedback = () => {
    if (percentage >= 90) return { title: "Outstanding Genius!", text: "You have mastered Advanced OOP concepts with pristine execution." };
    if (percentage >= 75) return { title: "Superb Performance!", text: "Solid understanding of deep copy, destructors, and dynamic memory allocation." };
    if (percentage >= 50) return { title: "Passing Grade Secures", text: "Good effort, but recommend reviewing the Rule of Three rules." };
    return { title: "Revision Required", text: "Please review Abstract Data Types and pointer mechanics to improve your marks." };
  };

  const feedback = getFeedback();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden px-4 select-none">
      
      {/* Interactive Confetti / Firework Explosions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full opacity-0"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
            }}
            animate={{
              x: [0, p.tx],
              y: [0, p.ty],
              opacity: [0, 1, 1, 0],
              scale: [0.3, 1.2, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 1.5,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            }}
          />
        ))}

        {/* Big pulsing ambient colors */}
        <div className={`absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 animate-pulse-slow pointer-events-none ${
          percentage >= 50 ? "bg-emerald-600/10 top-1/4" : "bg-red-600/10 top-1/4"
        }`} />
      </div>

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        
        {/* Flash Result Card Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden text-center"
          id="result_receipt_card"
        >
          {/* Top colored status tab */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 ${
            percentage >= 80 ? "bg-emerald-500" : percentage >= 50 ? "bg-blue-500" : "bg-rose-500"
          }`} />

          {/* Large Badge Logo */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="flex justify-center mb-4"
          >
            <div className={`p-4 rounded-full border ${
              percentage >= 50 ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400" : "bg-red-950/40 border-red-500/30 text-red-400"
            }`}>
              <Award className="w-10 h-10" />
            </div>
          </motion.div>

          <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
            SECURE EXAMINATION RESULT
          </p>

          {/* Student Name Display */}
          <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1 mb-2">
            {studentName}
          </h2>

          {/* Pulse Score Circle */}
          <div className="relative flex justify-center items-center my-6">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center relative select-none shadow-xl bg-slate-950/60"
              style={{
                borderColor: percentage >= 80 ? "#10b981" : percentage >= 50 ? "#3b82f6" : "#f43f5e"
              }}
            >
              <span className="text-4xl font-display font-black text-white">
                {score}
              </span>
              <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mt-1">
                Out Of 15
              </span>
            </motion.div>
          </div>

          {/* Percentage */}
          <div className="mb-4">
            <p className={`text-3xl font-mono font-black tracking-tighter ${
              percentage >= 80 ? "text-emerald-400" : percentage >= 50 ? "text-blue-400" : "text-rose-400"
            }`}>
              {percentage.toFixed(2)}%
            </p>
            <p className="text-sm font-semibold text-slate-200 mt-2 font-display uppercase tracking-wide">
              {feedback.title}
            </p>
            <p className="text-xs text-slate-400 font-sans max-w-sm mx-auto mt-1 leading-relaxed">
              {feedback.text}
            </p>
          </div>

          {/* Verified Receipt Stamp for Screen-shot confirmation */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 my-6 text-left space-y-2.5 relative">
            
            {/* Stamp Logo Overlay */}
            <div className="absolute right-4 bottom-4 opacity-5 border border-slate-100 p-2 rounded-lg pointer-events-none rotate-12">
              <ShieldCheck className="w-16 h-16 text-slate-400" />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 pb-1.5 border-b border-slate-800/60">
              <FileText className="w-4 h-4 text-red-500" /> Official Score Report
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-xs font-mono">
              <div>
                <span className="text-slate-500 uppercase text-[9px]">Receipt Stamp</span>
                <p className="text-slate-300 select-all font-bold tracking-wider">{verificationCode}</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[9px]">Submission Trigger</span>
                <p className="text-slate-300 font-bold capitalize">
                  {submittedBy === "timeout" ? "Auto-Timeout" : submittedBy === "force_submit" ? "Lock Violation" : "Standard Submit"}
                </p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[9px]">Tab focus loss</span>
                <p className={`font-bold ${tabSwitches > 0 ? "text-amber-500" : "text-slate-300"}`}>{tabSwitches} switches</p>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[9px]">Fullscreen exit</span>
                <p className={`font-bold ${fullscreenExits > 0 ? "text-amber-500" : "text-slate-300"}`}>{fullscreenExits} exits</p>
              </div>
            </div>

            {tabSwitches + fullscreenExits > 0 && (
              <div className="pt-2 flex items-center gap-1.5 text-[10px] text-amber-500 font-mono">
                <AlertTriangle className="w-3.5 h-3.5" /> Note: Student had security violations during attempt.
              </div>
            )}
          </div>

          {/* Restart test button */}
          <motion.button
            id="restart_exam_button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full h-12 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-display text-xs font-extrabold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/30"
          >
            <RefreshCw className="w-4 h-4" /> Start New Test Attempt
          </motion.button>

        </motion.div>
        
        <p className="text-[10px] font-mono text-slate-500 mt-4 text-center">
          Take a screenshot of this full screen verified report to submit your marks to the teacher.
        </p>
      </div>
    </div>
  );
}
