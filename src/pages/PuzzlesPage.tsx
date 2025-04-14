
import { Button } from "@/components/ui/button";
import { Calculator, Brain, Layers, Route } from "lucide-react";
import { PuzzleType } from "@/types/puzzle";
import PuzzleCard from "@/components/PuzzleCard";
import Header from "@/components/Header";
import { useState, useEffect } from "react";

const PuzzlesPage = () => {
  const [puzzles, setPuzzles] = useState<PuzzleType[]>([
    {
      id: "sequence",
      title: "Number Sequence",
      description: "Memorize and recall number sequences in the correct order.",
      difficulty: "Easy",
      icon: <Calculator className="w-12 h-12 text-primary/60" />,
      type: "sequence"
    },
    {
      id: "memory",
      title: "Memory Match",
      description: "Find matching pairs of symbols with the fewest moves.",
      difficulty: "Medium",
      icon: <Brain className="w-12 h-12 text-primary/60" />,
      type: "memory"
    },
    {
      id: "patterns",
      title: "Pattern Recognition",
      description: "Identify patterns and select the next item in the sequence.",
      difficulty: "Medium",
      icon: <Layers className="w-12 h-12 text-primary/60" />,
      type: "patterns"
    },
    {
      id: "pathfinder",
      title: "Pathfinder",
      description: "Navigate through a maze to reach the goal with optimal moves.",
      difficulty: "Hard",
      icon: <Route className="w-12 h-12 text-primary/60" />,
      type: "pathfinder"
    }
  ]);

  // Load scores from localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem("puzzle-scores");
    if (savedScores) {
      const scores = JSON.parse(savedScores);
      setPuzzles(prevPuzzles => 
        prevPuzzles.map(puzzle => ({
          ...puzzle,
          bestScore: scores[puzzle.id] || undefined
        }))
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Logic Puzzles</h1>
          <p className="text-muted-foreground">
            Challenge your brain with these logic puzzles. Track your scores and improve your skills!
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {puzzles.map((puzzle) => (
            <PuzzleCard key={puzzle.id} puzzle={puzzle} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PuzzlesPage;
