
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Brain, Layers, Route, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/10 to-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Challenge Your Mind with <span className="text-primary">LogicQuest</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Train your brain with a variety of engaging logic puzzles designed to test your memory, 
              pattern recognition, and problem-solving skills.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/puzzles">
                  Start Playing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg">
                <Link to="/puzzles">
                  Browse Puzzles
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Puzzles */}
        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Featured Puzzles</h2>
          <p className="text-muted-foreground text-center mb-12">
            Test different cognitive skills with our variety of puzzles
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Calculator className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Number Sequence</h3>
                  <p className="text-muted-foreground mb-4">
                    Test your short-term memory by remembering and recalling number sequences.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/puzzle/sequence">Play Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Memory Match</h3>
                  <p className="text-muted-foreground mb-4">
                    Find matching pairs with the fewest moves in this classic memory game.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/puzzle/memory">Play Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Layers className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pattern Recognition</h3>
                  <p className="text-muted-foreground mb-4">
                    Identify patterns and predict the next item in various sequences.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/puzzle/patterns">Play Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-border">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Route className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pathfinder</h3>
                  <p className="text-muted-foreground mb-4">
                    Navigate through a maze to reach the goal with optimal moves.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/puzzle/pathfinder">Play Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Why Train Your Brain?</h2>
              <p className="text-lg mb-8">
                Regular mental exercise can improve cognitive function, enhance memory, 
                and help maintain mental sharpness. LogicQuest provides a fun and engaging 
                way to challenge your brain with varied puzzles targeting different cognitive skills.
              </p>
              <Button asChild>
                <Link to="/puzzles">Start Your Brain Training</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 LogicQuest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
