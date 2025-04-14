
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { shuffle } from "@/utils/puzzle-utils";
import { toast } from "sonner";

interface PatternsPuzzleProps {
  onComplete: (score: number) => void;
}

const PatternsPuzzle = ({ onComplete }: PatternsPuzzleProps) => {
  const [pattern, setPattern] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const maxRounds = 5;

  const patterns = [
    {
      sequence: ["🔴", "🔵", "🔴", "🔵", "🔴", "❓"],
      answer: "🔵",
      wrong: ["🔴", "🟢", "🟡"]
    },
    {
      sequence: ["🟡", "🟢", "🟡", "🟡", "🟢", "❓"],
      answer: "🟡",
      wrong: ["🟢", "🔴", "🔵"]
    },
    {
      sequence: ["🔵", "🔵", "🟢", "🔵", "🔵", "🟢", "❓"],
      answer: "🔵",
      wrong: ["🟢", "🔴", "🟡"]
    },
    {
      sequence: ["🟢", "🟡", "🟡", "🟢", "🟡", "🟡", "❓"],
      answer: "🟢",
      wrong: ["🟡", "🔴", "🔵"]
    },
    {
      sequence: ["🔴", "🟡", "🟢", "🔵", "🔴", "🟡", "❓"],
      answer: "🟢",
      wrong: ["🔵", "🔴", "🟡"]
    }
  ];

  useEffect(() => {
    startNewRound();
  }, [round]);

  const startNewRound = () => {
    const currentPattern = patterns[(round - 1) % patterns.length];
    setPattern(currentPattern.sequence);
    
    // Create options with the correct answer and some wrong ones
    const allOptions = [currentPattern.answer, ...currentPattern.wrong];
    setOptions(shuffle(allOptions));
    setSelectedOption(null);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    const currentPattern = patterns[(round - 1) % patterns.length];
    const isCorrect = option === currentPattern.answer;
    
    if (isCorrect) {
      toast.success("Correct pattern!");
      setScore(score + 20);
    } else {
      toast.error("Incorrect pattern!");
    }
    
    // Move to next round after a short delay
    setTimeout(() => {
      if (round < maxRounds) {
        setRound(round + 1);
      } else {
        onComplete(score + (isCorrect ? 20 : 0));
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center space-y-8 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Pattern Recognition</h2>
        <p className="text-muted-foreground mb-4">
          Identify the pattern and select the next item in the sequence
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="text-sm font-medium bg-primary/10 px-4 py-2 rounded-full">
            Round {round} of {maxRounds} - Current Score: {score}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {pattern.map((item, idx) => (
            <div 
              key={idx}
              className={`h-16 w-16 flex items-center justify-center rounded-lg text-3xl 
                ${item === "❓" ? "bg-accent/20 border-2 border-dashed border-accent" : "bg-muted"}
              `}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {options.map((option, idx) => (
            <Button
              key={idx}
              variant={selectedOption === option ? "default" : "outline"}
              size="lg"
              className="h-20 text-3xl"
              onClick={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
            >
              {option}
            </Button>
          ))}
        </div>

        {round === maxRounds && selectedOption !== null && (
          <div className="mt-8 text-center">
            <p className="text-xl mb-4">
              Game complete! You scored {score + (selectedOption === patterns[(round - 1) % patterns.length].answer ? 20 : 0)} points!
            </p>
            <Button 
              onClick={() => {
                setRound(1);
                setScore(0);
              }}
            >
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternsPuzzle;
