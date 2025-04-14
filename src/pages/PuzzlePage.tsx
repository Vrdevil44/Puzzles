
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, Brain, Layers, Route, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import SequencePuzzle from "@/components/puzzles/SequencePuzzle";
import MemoryPuzzle from "@/components/puzzles/MemoryPuzzle";
import PatternsPuzzle from "@/components/puzzles/PatternsPuzzle";
import PathfinderPuzzle from "@/components/puzzles/PathfinderPuzzle";
import { toast } from "sonner";

const PuzzlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bestScore, setBestScore] = useState<number | undefined>(undefined);
  
  useEffect(() => {
    // Load best score for this puzzle
    const savedScores = localStorage.getItem("puzzle-scores");
    if (savedScores) {
      const scores = JSON.parse(savedScores);
      setBestScore(scores[id || ""] || undefined);
    }
  }, [id]);
  
  const handlePuzzleComplete = (score: number) => {
    // Update best score if the new score is higher
    if (!bestScore || score > bestScore) {
      setBestScore(score);
      
      // Save to localStorage
      const savedScores = localStorage.getItem("puzzle-scores");
      const scores = savedScores ? JSON.parse(savedScores) : {};
      scores[id || ""] = score;
      localStorage.setItem("puzzle-scores", JSON.stringify(scores));
      
      toast.success(`New high score: ${score}!`);
    } else {
      toast.info(`Score: ${score}`);
    }
  };
  
  const getPuzzleComponent = () => {
    switch (id) {
      case "sequence":
        return <SequencePuzzle onComplete={handlePuzzleComplete} />;
      case "memory":
        return <MemoryPuzzle onComplete={handlePuzzleComplete} />;
      case "patterns":
        return <PatternsPuzzle onComplete={handlePuzzleComplete} />;
      case "pathfinder":
        return <PathfinderPuzzle onComplete={handlePuzzleComplete} />;
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Puzzle Not Found</h2>
            <Button onClick={() => navigate("/puzzles")}>Return to Puzzles</Button>
          </div>
        );
    }
  };
  
  const getPuzzleIcon = () => {
    switch (id) {
      case "sequence":
        return <Calculator className="w-8 h-8" />;
      case "memory":
        return <Brain className="w-8 h-8" />;
      case "patterns":
        return <Layers className="w-8 h-8" />;
      case "pathfinder":
        return <Route className="w-8 h-8" />;
      default:
        return null;
    }
  };
  
  const getPuzzleTitle = () => {
    switch (id) {
      case "sequence":
        return "Number Sequence";
      case "memory":
        return "Memory Match";
      case "patterns":
        return "Pattern Recognition";
      case "pathfinder":
        return "Pathfinder";
      default:
        return "Unknown Puzzle";
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => navigate("/puzzles")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Puzzles
          </Button>
          
          {bestScore !== undefined && (
            <div className="text-sm bg-accent/20 px-3 py-1 rounded-full">
              Best Score: <span className="font-bold">{bestScore}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            {getPuzzleIcon()}
          </div>
          <h1 className="text-2xl font-bold">{getPuzzleTitle()}</h1>
        </div>
        
        <div className="bg-card rounded-lg shadow p-4 mb-8">
          {getPuzzleComponent()}
        </div>
      </main>
    </div>
  );
};

export default PuzzlePage;
