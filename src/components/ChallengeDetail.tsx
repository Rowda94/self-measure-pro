import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Trophy, Calendar, Target, TrendingUp, Plus } from "lucide-react";
import { Challenge, UserProgress, ProgressEntry } from "@/types/fitness";
import { toast } from "@/hooks/use-toast";

interface ChallengeDetailProps {
  challenge: Challenge;
  userProgress?: UserProgress;
  onBack: () => void;
  onLogProgress: (challengeId: string, value: number, note?: string) => void;
}

export const ChallengeDetail = ({ 
  challenge, 
  userProgress, 
  onBack, 
  onLogProgress 
}: ChallengeDetailProps) => {
  const [logValue, setLogValue] = useState("");
  const [logNote, setLogNote] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);

  const progressPercentage = userProgress 
    ? Math.round((userProgress.currentValue / challenge.targetValue) * 100)
    : 0;

  const handleLogProgress = () => {
    const value = parseFloat(logValue);
    if (isNaN(value) || value <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid positive number.",
        variant: "destructive"
      });
      return;
    }

    onLogProgress(challenge.id, value, logNote);
    setLogValue("");
    setLogNote("");
    setShowLogForm(false);
    
    toast({
      title: "Progress Logged!",
      description: `Added ${value} ${challenge.unit} to your progress.`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-gradient-success';
      case 'Intermediate': return 'bg-gradient-warning';
      case 'Advanced': return 'bg-gradient-primary';
      default: return 'bg-gradient-secondary';
    }
  };

  const recentEntries = userProgress?.entries
    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    ?.slice(0, 7) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onBack}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{challenge.title}</h1>
          <p className="text-muted-foreground">{challenge.category} Challenge</p>
        </div>
      </div>

      {/* Challenge Overview */}
      <Card className="shadow-elevated">
        <CardContent className="p-6">
          <div className={`w-full h-40 rounded-lg ${getDifficultyColor(challenge.difficulty)} 
                          flex items-center justify-center mb-6`}>
            <Target className="w-16 h-16 text-white" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{challenge.points}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
            
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{challenge.duration}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            
            <div className="text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{challenge.targetValue}</div>
              <div className="text-sm text-muted-foreground">{challenge.unit}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{challenge.category}</Badge>
            <Badge 
              variant="secondary" 
              className={`text-white ${getDifficultyColor(challenge.difficulty)}`}
            >
              {challenge.difficulty}
            </Badge>
          </div>

          <p className="text-muted-foreground">{challenge.description}</p>
        </CardContent>
      </Card>

      {/* Progress Section */}
      {userProgress && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Progress */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {progressPercentage}%
                </div>
                <div className="text-muted-foreground">
                  {userProgress.currentValue} / {challenge.targetValue} {challenge.unit}
                </div>
              </div>
              
              <Progress value={progressPercentage} className="h-3" />
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Started: {userProgress.startDate.toLocaleDateString()}</span>
                <span>Streak: {userProgress.streak} days</span>
              </div>

              <Button 
                className="w-full bg-gradient-primary text-white border-0"
                onClick={() => setShowLogForm(!showLogForm)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Log Progress
              </Button>

              {showLogForm && (
                <div className="space-y-3 p-4 border rounded-lg bg-accent/10">
                  <div>
                    <Input
                      type="number"
                      placeholder={`Enter ${challenge.unit}...`}
                      value={logValue}
                      onChange={(e) => setLogValue(e.target.value)}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Add a note (optional)..."
                      value={logNote}
                      onChange={(e) => setLogNote(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-primary text-white"
                      onClick={handleLogProgress}
                    >
                      Save Entry
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowLogForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Entries */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              {recentEntries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No entries yet</p>
                  <p className="text-sm">Start logging your progress!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentEntries.map((entry) => (
                    <div 
                      key={entry.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border"
                    >
                      <div>
                        <div className="font-medium">
                          {entry.value} {challenge.unit}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </div>
                        {entry.note && (
                          <div className="text-sm text-muted-foreground mt-1">
                            "{entry.note}"
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Call to Action for Non-enrolled Users */}
      {!userProgress && (
        <Card className="shadow-card border-2 border-primary/20">
          <CardContent className="text-center py-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Ready to Start?</h3>
            <p className="text-muted-foreground mb-6">
              Join this challenge and start tracking your progress towards your fitness goals.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-primary text-white border-0 px-8"
            >
              Join Challenge
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};