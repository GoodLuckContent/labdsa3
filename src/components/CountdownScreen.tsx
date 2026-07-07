import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CountdownScreenProps {
  onComplete: () => void;
}

export function CountdownScreen({ onComplete }: CountdownScreenProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [count, onComplete]);

  return (
    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-white font-display overflow-hidden select-none z-50">
      {/* Background radial glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-red-950/20 blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.div
            key={`count_${count}`}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center"
          >
            <span className="text-8xl md:text-9xl font-extrabold tracking-tighter text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              {count}
            </span>
            <span className="text-xs tracking-widest uppercase text-slate-500 mt-4 font-mono">
              Securing Workspace...
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="start"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <span className="text-6xl md:text-8xl font-black tracking-widest text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] uppercase">
              START!
            </span>
            <span className="text-xs tracking-widest uppercase text-red-500 mt-4 font-mono">
              Do Not Exit Fullscreen
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
