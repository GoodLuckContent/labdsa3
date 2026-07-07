import { Question } from "./data/questionBank";

export interface TestAttempt {
  id: string;
  studentName: string;
  score: number; // out of 15
  percentage: number;
  date: string; // ISO string
  cheatCount: {
    tabSwitches: number;
    fullscreenExits: number;
  };
  submittedBy: "user" | "timeout" | "force_submit";
}
