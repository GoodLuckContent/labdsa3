import { AlertOctagon, Maximize, Play } from "lucide-react";
import { motion } from "motion/react";

interface WarningOverlayProps {
  type: "fullscreen" | "tab";
  warningCount: number;
  onResume: () => void;
}

export function WarningOverlay({ type, warningCount, onResume }: WarningOverlayProps) {
  const isFullscreen = type === "fullscreen";

  return (
    <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center text-white p-6 select-none z-50">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-8 bg-slate-900 border-2 border-red-500 rounded-2xl shadow-2xl shadow-red-500/10 text-center relative overflow-hidden"
      >
        {/* Warning Indicator */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-950/50 border border-red-500/30 rounded-full text-red-500 animate-pulse">
            <AlertOctagon className="w-12 h-12" />
          </div>
        </div>

        <h2 className="font-display text-2xl font-black tracking-tight text-red-500 uppercase mb-3">
          {isFullscreen ? "Fullscreen Exited" : "Tab Switch Detected"}
        </h2>

        <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
          {isFullscreen
            ? "Your secure exam was suspended because you exited Fullscreen. This is a violation of exam integrity."
            : "Focus loss or tab switching was detected. You must keep focus on the exam window."}
        </p>

        {/* Warning Badge Meter */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 mb-8">
          <p className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-2">
            Warnings Issued
          </p>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-10 h-3 rounded-full border transition-all ${
                  i < warningCount
                    ? "bg-red-600 border-red-500 shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                    : "bg-slate-900 border-slate-800"
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-2">
            {warningCount < 3
              ? `${3 - warningCount} warnings remaining until automatic submission.`
              : "Warning limit reached. Auto-submitting..."}
          </p>
        </div>

        {warningCount < 3 && (
          <motion.button
            id="resume_test_button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onResume}
            className="w-full h-12 bg-red-600 hover:bg-red-500 text-white font-display text-sm font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-900/20"
          >
            {isFullscreen ? (
              <>
                <Maximize className="w-4 h-4" /> Re-enter Fullscreen
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Resume Test
              </>
            )}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
