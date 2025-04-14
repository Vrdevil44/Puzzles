
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { shuffle } from "@/utils/puzzle-utils";
import { toast } from "sonner";

interface MemoryPuzzleProps {
  onComplete: (score: number) => void;
}

const createGrid = (size: number) => {
  const symbols = ["🍎", "🍌", "🍇", "🍓", "🍒", "🍑", "🍍", "🥝"];
  const pairs = [...symbols.slice(0, (size * size) / 2), ...symbols.slice(0, (size * size) / 2)];
  return shuffle(pairs);
};

const MemoryPuzzle = ({ onComplete }: MemoryPuzzleProps) => {
  const [gridSize, setGridSize] = useState(4); // 4x4 grid
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [matched, setMatched] = useState<boolean[]>([]);
  const [moves, setMoves] = useState(0);
  const [firstSelection, setFirstSelection] = useState<number | null>(null);
  const [secondSelection, setSecondSelection] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  useEffect(() => {
    resetGame();
  }, [gridSize]);
  
  useEffect(() => {
    // Check if all cards are matched
    if (matched.length > 0 && matched.every(m => m)) {
      setGameCompleted(true);
      const score = calculateScore();
      setTimeout(() => {
        toast.success(`Completed! Your score: ${score}`);
        onComplete(score);
      }, 1000);
    }
  }, [matched]);
  
  useEffect(() => {
    // Check for match when two cards are flipped
    if (firstSelection !== null && secondSelection !== null) {
      setIsChecking(true);
      
      if (cards[firstSelection] === cards[secondSelection]) {
        // Match found
        const newMatched = [...matched];
        newMatched[firstSelection] = true;
        newMatched[secondSelection] = true;
        setMatched(newMatched);
        resetSelections();
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          const newFlipped = [...flipped];
          newFlipped[firstSelection] = false;
          newFlipped[secondSelection] = false;
          setFlipped(newFlipped);
          resetSelections();
        }, 1000);
      }
    }
  }, [firstSelection, secondSelection]);
  
  const resetSelections = () => {
    setFirstSelection(null);
    setSecondSelection(null);
    setIsChecking(false);
  };
  
  const resetGame = () => {
    const newCards = createGrid(gridSize);
    setCards(newCards);
    setFlipped(new Array(newCards.length).fill(false));
    setMatched(new Array(newCards.length).fill(false));
    setMoves(0);
    setFirstSelection(null);
    setSecondSelection(null);
    setIsChecking(false);
    setGameCompleted(false);
  };
  
  const handleCardClick = (index: number) => {
    // Ignore clicks if already checking, card is already flipped or matched
    if (isChecking || flipped[index] || matched[index]) return;
    
    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
    
    if (firstSelection === null) {
      setFirstSelection(index);
    } else {
      setSecondSelection(index);
      setMoves(moves + 1);
    }
  };
  
  const calculateScore = () => {
    // Score based on grid size and moves taken
    const totalPairs = (gridSize * gridSize) / 2;
    const perfectMoves = totalPairs; // Best case: find each pair in one attempt
    const movePenalty = Math.max(0, moves - perfectMoves) * 5;
    return Math.max(0, 100 - movePenalty);
  };
  
  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Memory Match</h2>
        <p className="text-muted-foreground mb-4">
          Find all matching pairs with the fewest moves
        </p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium bg-primary/10 px-4 py-2 rounded-full">
            Moves: {moves}
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => !gameCompleted && resetGame()}
              disabled={gameCompleted}
            >
              Reset
            </Button>
          </div>
        </div>
        
        <div
          className="grid gap-2 mb-6"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {cards.map((card, index) => (
            <button
              key={index}
              className={`aspect-square flex items-center justify-center text-2xl rounded-md transition-all transform ${
                flipped[index] || matched[index]
                  ? "bg-primary/10 rotate-0 scale-100"
                  : "bg-primary text-primary-foreground rotate-y-180"
              } ${
                matched[index] ? "bg-accent/20 text-accent-foreground animate-success" : ""
              }`}
              onClick={() => handleCardClick(index)}
              disabled={isChecking || gameCompleted}
            >
              {(flipped[index] || matched[index]) && card}
            </button>
          ))}
        </div>
        
        {gameCompleted && (
          <div className="text-center">
            <p className="text-xl mb-4">
              Game Complete! Score: {calculateScore()}
            </p>
            <div className="flex space-x-3 justify-center">
              <Button 
                onClick={() => {
                  resetGame();
                }}
              >
                Play Again
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setGridSize(gridSize === 4 ? 6 : 4);
                }}
              >
                Switch to {gridSize === 4 ? "6×6" : "4×4"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryPuzzle;
