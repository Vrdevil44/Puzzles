
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { shuffle } from "@/utils/puzzle-utils";
import { toast } from "sonner";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface SequencePuzzleProps {
  onComplete: (score: number) => void;
}

const SequencePuzzle = ({ onComplete }: SequencePuzzleProps) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [status, setStatus] = useState<"showing" | "input" | "completed">("showing");
  const [remainingNumbers, setRemainingNumbers] = useState<number[]>([]);
  const [round, setRound] = useState(1);
  const sequenceLength = Math.min(3 + round, 9);
  
  useEffect(() => {
    startNewRound();
  }, [round]);

  const startNewRound = () => {
    // Generate a random sequence
    const newSequence = shuffle([...numbers]).slice(0, sequenceLength);
    setSequence(newSequence);
    setUserSequence([]);
    setRemainingNumbers([...newSequence]);
    setStatus("showing");
    
    // After 3 seconds, hide the sequence and allow input
    setTimeout(() => {
      if (status !== "completed") {
        setStatus("input");
      }
    }, 3000);
  };

  const handleNumberClick = (num: number) => {
    if (status !== "input") return;
    
    const newUserSequence = [...userSequence, num];
    setUserSequence(newUserSequence);
    setRemainingNumbers(remainingNumbers.filter(n => n !== num));
    
    // Check if the sequence is complete
    if (newUserSequence.length === sequence.length) {
      // Check if the answer is correct
      const isCorrect = newUserSequence.every((n, i) => n === sequence[i]);
      
      if (isCorrect) {
        toast.success("Correct sequence!");
        if (round < 5) {
          setRound(round + 1);
        } else {
          setStatus("completed");
          onComplete(round * 20);
        }
      } else {
        toast.error("Incorrect sequence!");
        setStatus("completed");
        onComplete(Math.max(0, (round - 1) * 20));
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Number Sequence</h2>
        <p className="text-muted-foreground mb-4">
          {status === "showing" 
            ? "Memorize the sequence..." 
            : status === "input" 
            ? "Now recall the numbers in order" 
            : "Round complete!"}
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="text-sm font-medium bg-primary/10 px-4 py-2 rounded-full">
            Round {round} of 5 - Remember {sequenceLength} numbers
          </div>
        </div>

        {status === "showing" && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {sequence.map((num, idx) => (
              <div 
                key={idx}
                className="h-16 flex items-center justify-center bg-primary text-primary-foreground rounded-lg text-xl font-bold animate-slide-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {num}
              </div>
            ))}
          </div>
        )}

        {status === "input" && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {Array.from({ length: sequence.length }).map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-16 flex items-center justify-center rounded-lg text-xl font-bold border-2 ${
                    idx < userSequence.length 
                      ? "border-primary bg-primary/10" 
                      : "border-dashed border-muted-foreground/30"
                  }`}
                >
                  {idx < userSequence.length ? userSequence[idx] : ""}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {numbers.map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  size="lg"
                  className={`h-16 text-lg ${!remainingNumbers.includes(num) ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!remainingNumbers.includes(num)}
                  onClick={() => handleNumberClick(num)}
                >
                  {num}
                </Button>
              ))}
            </div>
          </>
        )}

        {status === "completed" && (
          <div className="text-center">
            <p className="text-xl mb-4">
              You completed {round} rounds and scored {Math.max(0, (round - 1) * 20)} points!
            </p>
            <Button onClick={() => {
              setRound(1);
              startNewRound();
            }}>
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SequencePuzzle;
