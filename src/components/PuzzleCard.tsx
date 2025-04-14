
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PuzzleType } from "@/types/puzzle";
import { Link } from "react-router-dom";

interface PuzzleCardProps {
  puzzle: PuzzleType;
}

const PuzzleCard = ({ puzzle }: PuzzleCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{puzzle.title}</CardTitle>
          <Badge variant={puzzle.difficulty === "Easy" ? "default" : puzzle.difficulty === "Medium" ? "secondary" : "destructive"}>
            {puzzle.difficulty}
          </Badge>
        </div>
        <CardDescription>{puzzle.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center overflow-hidden">
          {puzzle.icon}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Best Score: <span className="font-medium">{puzzle.bestScore || '—'}</span>
        </div>
        <Button asChild>
          <Link to={`/puzzle/${puzzle.id}`}>Play</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PuzzleCard;
