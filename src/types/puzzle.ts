
import { ReactNode } from "react";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface PuzzleType {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  icon: ReactNode;
  bestScore?: number;
  type: "sequence" | "pathfinder" | "memory" | "patterns";
}
