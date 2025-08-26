import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Flame, Clock } from "lucide-react";
import { Challenge, UserProgress } from "@/types/fitness";

interface DashboardProps {
  challenges: Challenge[];
  userProgress: UserProgress[];
  onSelectChallenge: (challenge: Challenge) => void;
}

export const Dashboard = ({ challenges, userProgress, onSelectChallenge }: DashboardProps) => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalAchievements, setTotalAchievements] = useState(12);

  const activeChallenges = challenges.filter(challenge => 
    userProgress.some(progress => progress.challengeId === challenge.id && progress.isActive)
  );

  const getProgressForChallenge = (challengeId: string) => {
    return userProgress.find(progress => progress.challengeId === challengeId);
  };

  const calculateOverallProgress = () => {
    if (activeChallenges.length === 0) return 0;
    const totalProgress = activeChallenges.reduce((sum, challenge) => {
      const progress = getProgressForChallenge(challenge.id);
      return sum + (progress ? (progress.currentValue / challenge.targetValue) * 100 : 0);
    }, 0);
    return Math.round(totalProgress / activeChallenges.length);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{currentStreak}</div>
            <div className="text-sm opacity-90">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-secondary text-white border-0">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{activeChallenges.length}</div>
            <div className="text-sm opacity-90">Active Goals</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-success text-white border-0">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{totalAchievements}</div>
            <div className="text-sm opacity-90">Achievements</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-warning text-white border-0">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{calculateOverallProgress()}%</div>
            <div className="text-sm opacity-90">Overall Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Active Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeChallenges.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No active challenges yet!</p>
              <p className="text-sm">Start your fitness journey by selecting a challenge.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeChallenges.map((challenge) => {
                const progress = getProgressForChallenge(challenge.id);
                const progressPercentage = progress 
                  ? Math.round((progress.currentValue / challenge.targetValue) * 100)
                  : 0;

                return (
                  <div 
                    key={challenge.id}
                    className="p-4 rounded-lg border bg-card hover:shadow-card transition-all cursor-pointer"
                    onClick={() => onSelectChallenge(challenge)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {challenge.category}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">
                          {progress?.currentValue || 0} / {challenge.targetValue} {challenge.unit}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <div className="text-right text-sm font-medium text-primary">
                        {progressPercentage}% Complete
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};