
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PathfinderPuzzleProps {
  onComplete: (score: number) => void;
}

const PathfinderPuzzle = ({ onComplete }: PathfinderPuzzleProps) => {
  const [gridSize, setGridSize] = useState(5); // 5x5 grid
  const [grid, setGrid] = useState<("empty" | "path" | "blocked" | "start" | "end")[][]>([]);
  const [playerPosition, setPlayerPosition] = useState<[number, number]>([0, 0]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [level, setLevel] = useState(1);
  
  useEffect(() => {
    resetGame();
  }, [gridSize, level]);
  
  const resetGame = () => {
    // Create a new grid with start, end, and some blocked cells
    const newGrid: ("empty" | "path" | "blocked" | "start" | "end")[][] = [];
    
    for (let i = 0; i < gridSize; i++) {
      const row: ("empty" | "path" | "blocked" | "start" | "end")[] = [];
      for (let j = 0; j < gridSize; j++) {
        row.push("empty");
      }
      newGrid.push(row);
    }
    
    // Set start position (top-left)
    newGrid[0][0] = "start";
    
    // Set end position (bottom-right)
    newGrid[gridSize - 1][gridSize - 1] = "end";
    
    // Add obstacles based on level
    const obstacleCount = Math.min(5 + level * 2, gridSize * gridSize * 0.3);
    let placed = 0;
    
    while (placed < obstacleCount) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      
      // Don't block start, end, or already blocked cells
      if (
        (row !== 0 || col !== 0) && 
        (row !== gridSize - 1 || col !== gridSize - 1) &&
        newGrid[row][col] === "empty"
      ) {
        newGrid[row][col] = "blocked";
        placed++;
      }
    }
    
    setGrid(newGrid);
    setPlayerPosition([0, 0]);
    setMoves(0);
    setGameCompleted(false);
  };
  
  const handleMove = (direction: "up" | "down" | "left" | "right") => {
    if (gameCompleted) return;
    
    const [row, col] = playerPosition;
    let newRow = row;
    let newCol = col;
    
    switch (direction) {
      case "up":
        newRow = Math.max(0, row - 1);
        break;
      case "down":
        newRow = Math.min(gridSize - 1, row + 1);
        break;
      case "left":
        newCol = Math.max(0, col - 1);
        break;
      case "right":
        newCol = Math.min(gridSize - 1, col + 1);
        break;
    }
    
    // Check if the new position is valid
    if (
      newRow !== row || newCol !== col && // moved
      grid[newRow][newCol] !== "blocked" // not blocked
    ) {
      // Update grid - mark previous position as "path"
      const newGrid = [...grid.map(row => [...row])];
      
      if (newGrid[row][col] === "start") {
        newGrid[row][col] = "start";
      } else {
        newGrid[row][col] = "path";
      }
      
      // Check if reached the end
      if (newGrid[newRow][newCol] === "end") {
        setGameCompleted(true);
        const score = calculateScore();
        toast.success(`Level ${level} complete! Score: ${score}`);
        
        setTimeout(() => {
          if (level < 3) {
            setLevel(level + 1);
          } else {
            onComplete(score);
          }
        }, 1500);
      }
      
      setPlayerPosition([newRow, newCol]);
      setMoves(moves + 1);
    }
  };
  
  const calculateScore = () => {
    // Score based on grid size and moves taken
    const minMoves = 2 * gridSize - 2; // Minimum possible moves in a perfect path
    const movePenalty = Math.max(0, moves - minMoves) * 2;
    return Math.max(0, 100 - movePenalty);
  };
  
  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Pathfinder</h2>
        <p className="text-muted-foreground mb-4">
          Find the shortest path from start to finish
        </p>
        
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-medium bg-primary/10 px-4 py-2 rounded-full">
            Level: {level} | Moves: {moves}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => resetGame()}
            disabled={gameCompleted}
          >
            Reset
          </Button>
        </div>
        
        <div className="mb-6 grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`aspect-square rounded flex items-center justify-center ${
                  rowIndex === playerPosition[0] && colIndex === playerPosition[1]
                    ? "bg-accent text-accent-foreground"
                    : cell === "start"
                    ? "bg-primary/20"
                    : cell === "end"
                    ? "bg-primary text-primary-foreground"
                    : cell === "blocked"
                    ? "bg-destructive/20"
                    : cell === "path"
                    ? "bg-muted"
                    : "bg-secondary"
                }`}
              >
                {rowIndex === playerPosition[0] && colIndex === playerPosition[1]
                  ? "🧠"
                  : cell === "start"
                  ? "S"
                  : cell === "end"
                  ? "E"
                  : cell === "blocked"
                  ? "×"
                  : ""}
              </div>
            ))
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <Button
            onClick={() => handleMove("up")}
            disabled={gameCompleted}
            variant="secondary"
          >
            ↑
          </Button>
          <div></div>
          
          <Button
            onClick={() => handleMove("left")}
            disabled={gameCompleted}
            variant="secondary"
          >
            ←
          </Button>
          
          <Button
            onClick={() => handleMove("down")}
            disabled={gameCompleted}
            variant="secondary"
          >
            ↓
          </Button>
          
          <Button
            onClick={() => handleMove("right")}
            disabled={gameCompleted}
            variant="secondary"
          >
            →
          </Button>
        </div>
        
        {level === 3 && gameCompleted && (
          <div className="mt-6 text-center">
            <p className="text-xl mb-4">
              All levels complete! Final score: {calculateScore()}
            </p>
            <Button onClick={() => {
              setLevel(1);
              resetGame();
            }}>
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PathfinderPuzzle;
