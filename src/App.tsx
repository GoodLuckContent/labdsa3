import { useState, useEffect } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { CountdownScreen } from "./components/CountdownScreen";
import { TestScreen } from "./components/TestScreen";
import { ResultScreen } from "./components/ResultScreen";
import { generateTest, Question } from "./data/questionBank";
import { TestAttempt } from "./types";

type ScreenState = "welcome" | "countdown" | "test" | "result";

export default function App() {
  const [screen, setScreen] = useState<ScreenState>("welcome");
  const [studentName, setStudentName] = useState("");
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  
  // Results / Security logs of current session
  const [currentScore, setCurrentScore] = useState(0);
  const [currentTabs, setCurrentTabs] = useState(0);
  const [currentExits, setCurrentExits] = useState(0);
  const [submittedBy, setSubmittedBy] = useState<"user" | "timeout" | "force_submit">("user");

  // Load attempt history from localStorage safely
  const [attempts, setAttempts] = useState<TestAttempt[]>(() => {
    try {
      localStorage.removeItem("oop_quiz_attempts"); // Explicitly erase old records key
      localStorage.removeItem("lab1_quiz_attempts"); // Explicitly erase old lab 1 records
      localStorage.removeItem("lab2_quiz_attempts"); // Explicitly erase old lab 2 records
      const saved = localStorage.getItem("lab3_quiz_attempts");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Keep localStorage synchronized
  useEffect(() => {
    try {
      localStorage.setItem("lab3_quiz_attempts", JSON.stringify(attempts));
    } catch (e) {
      console.error("Could not write attempts history to localStorage:", e);
    }
  }, [attempts]);

  // Anti-cheat: Disable right click, copy, paste, select, print, and Inspect Element keys globally
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Copy (Ctrl+C), Paste (Ctrl+V), Print (Ctrl+P), Cut (Ctrl+X), Inspect (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
      const ctrlOrCmd = e.ctrlKey || e.metaKey;
      
      if (
        (ctrlOrCmd && e.key === "c") ||
        (ctrlOrCmd && e.key === "v") ||
        (ctrlOrCmd && e.key === "p") ||
        (ctrlOrCmd && e.key === "x") ||
        (ctrlOrCmd && e.key === "u") ||
        (ctrlOrCmd && e.shiftKey && e.key === "I") ||
        (ctrlOrCmd && e.shiftKey && e.key === "J") ||
        e.key === "F12"
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleCopyPaste = (e: Event) => {
      e.preventDefault();
    };

    // Bind event listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
    };
  }, []);

  // Handler to register name and transition to countdown
  const handleStartRegister = (name: string) => {
    setStudentName(name);
    // Shuffle and pick exactly 15 fresh unique questions
    const generated = generateTest();
    setTestQuestions(generated);
    setScreen("countdown");
  };

  const handleCountdownComplete = () => {
    setScreen("test");
  };

  const handleTestSubmit = (
    score: number,
    tabs: number,
    exits: number,
    type: "user" | "timeout" | "force_submit"
  ) => {
    setCurrentScore(score);
    setCurrentTabs(tabs);
    setCurrentExits(exits);
    setSubmittedBy(type);

    // Save attempt inside local logs history
    const newAttempt: TestAttempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      studentName,
      score,
      percentage: (score / 15) * 100,
      date: new Date().toISOString(),
      cheatCount: {
        tabSwitches: tabs,
        fullscreenExits: exits,
      },
      submittedBy: type,
    };

    setAttempts((prev) => [newAttempt, ...prev]);
    setScreen("result");
  };

  const handleRestart = () => {
    // Completely clear exam variables and load portal landing state
    setStudentName("");
    setTestQuestions([]);
    setCurrentScore(0);
    setCurrentTabs(0);
    setCurrentExits(0);
    setSubmittedBy("user");
    setScreen("welcome");
  };

  const handleClearHistory = () => {
    setAttempts([]);
  };

  return (
    <div className="w-full h-full bg-slate-950 font-sans text-slate-100 overflow-hidden relative">
      {screen === "welcome" && (
        <WelcomeScreen
          onStart={handleStartRegister}
          attempts={attempts}
          onClearHistory={handleClearHistory}
        />
      )}

      {screen === "countdown" && (
        <CountdownScreen onComplete={handleCountdownComplete} />
      )}

      {screen === "test" && (
        <TestScreen
          studentName={studentName}
          questions={testQuestions}
          onSubmit={handleTestSubmit}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          studentName={studentName}
          score={currentScore}
          tabSwitches={currentTabs}
          fullscreenExits={currentExits}
          submittedBy={submittedBy}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
