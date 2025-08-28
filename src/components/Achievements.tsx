import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Award, Target, Star, Lock, Unlock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { baseAchievements, germanAchievements } from "@/data/achievements";
import { Achievement, UserAchievements } from "@/types/achievements";
import { UserProgress } from "@/types/fitness";

interface AchievementsProps {
  userProgress: UserProgress[];
}

export const Achievements = ({ userProgress }: AchievementsProps) => {
  const { language, t } = useLanguage();
  const [userAchievements, setUserAchievements] = useState<UserAchievements>({
    totalPoints: 0,
    unlockedAchievements: [],
    progress: {}
  });

  const achievements = language === 'de' ? germanAchievements : baseAchievements;

  useEffect(() => {
    calculateAchievements();
  }, [userProgress, language]);

  const calculateAchievements = () => {
    const totalProgressValue = userProgress.reduce((sum, progress) => sum + progress.currentValue, 0);
    const maxStreak = Math.max(...userProgress.map(p => p.streak), 0);
    const completedChallenges = userProgress.filter(p => {
      // Assume a challenge is completed if currentValue reaches the target (this would need challenge data)
      return p.currentValue >= 100; // Simplified completion logic
    }).length;

    const updatedAchievements: Achievement[] = achievements.map(achievement => {
      let isUnlocked = false;
      let currentProgress = 0;

      switch (achievement.requirement.type) {
        case 'total_progress':
          currentProgress = totalProgressValue;
          isUnlocked = totalProgressValue >= achievement.requirement.value;
          break;
        case 'streak_days':
          currentProgress = maxStreak;
          isUnlocked = maxStreak >= achievement.requirement.value;
          break;
        case 'challenges_completed':
          currentProgress = completedChallenges;
          isUnlocked = completedChallenges >= achievement.requirement.value;
          break;
        case 'specific_challenge':
          const specificProgress = userProgress.find(p => p.challengeId === achievement.requirement.challengeId);
          currentProgress = specificProgress ? (specificProgress.currentValue >= 100 ? 1 : 0) : 0;
          isUnlocked = currentProgress >= achievement.requirement.value;
          break;
        case 'daily_goal':
          // Special achievements - simplified logic
          isUnlocked = userProgress.length > 0;
          currentProgress = isUnlocked ? 1 : 0;
          break;
      }

      return {
        ...achievement,
        isUnlocked,
        unlockedAt: isUnlocked ? new Date() : undefined
      };
    });

    const unlockedAchievements = updatedAchievements.filter(a => a.isUnlocked);
    const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

    const progress: { [key: string]: { current: number; required: number } } = {};
    updatedAchievements.forEach(achievement => {
      let current = 0;
      switch (achievement.requirement.type) {
        case 'total_progress':
          current = totalProgressValue;
          break;
        case 'streak_days':
          current = maxStreak;
          break;
        case 'challenges_completed':
          current = completedChallenges;
          break;
        case 'specific_challenge':
          const specificProgress = userProgress.find(p => p.challengeId === achievement.requirement.challengeId);
          current = specificProgress ? (specificProgress.currentValue >= 100 ? 1 : 0) : 0;
          break;
        case 'daily_goal':
          current = userProgress.length > 0 ? 1 : 0;
          break;
      }
      
      progress[achievement.id] = {
        current: Math.min(current, achievement.requirement.value),
        required: achievement.requirement.value
      };
    });

    setUserAchievements({
      totalPoints,
      unlockedAchievements: updatedAchievements,
      progress
    });
  };

  const getTypeIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'bronze': return <Award className="w-4 h-4 text-amber-600" />;
      case 'silver': return <Award className="w-4 h-4 text-gray-400" />;
      case 'gold': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'platinum': return <Star className="w-4 h-4 text-purple-500" />;
    }
  };

  const getTypeColor = (type: Achievement['type']) => {
    switch (type) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'progress': return <Target className="w-5 h-5" />;
      case 'streak': return <span className="text-lg">🔥</span>;
      case 'completion': return <Trophy className="w-5 h-5" />;
      case 'special': return <Star className="w-5 h-5" />;
    }
  };

  const filterAchievementsByCategory = (category: Achievement['category']) => {
    return userAchievements.unlockedAchievements.filter(a => a.category === category);
  };

  const filterAchievementsByType = (type: Achievement['type']) => {
    return userAchievements.unlockedAchievements.filter(a => a.type === type);
  };

  const unlockedCount = userAchievements.unlockedAchievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Stats */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('achievements.title')}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <Card className="bg-gradient-primary/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{unlockedCount}</div>
                <div className="text-sm text-muted-foreground">{t('achievements.unlocked')}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-secondary/10 border-secondary/20">
              <CardContent className="p-4 text-center">
                <Star className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold">{userAchievements.totalPoints}</div>
                <div className="text-sm text-muted-foreground">{t('achievements.totalPoints')}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-accent/10 border-accent/20">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold">{Math.round((unlockedCount / totalCount) * 100)}%</div>
                <div className="text-sm text-muted-foreground">{t('achievements.completion')}</div>
              </CardContent>
            </Card>
          </div>
          
          <Progress value={(unlockedCount / totalCount) * 100} className="max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">
            {unlockedCount} {t('common.of')} {totalCount} {t('achievements.achieved')}
          </p>
        </div>

        {/* Achievement Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">{t('achievements.all')}</TabsTrigger>
            <TabsTrigger value="progress">{t('achievements.progress')}</TabsTrigger>
            <TabsTrigger value="streak">{t('achievements.streak')}</TabsTrigger>
            <TabsTrigger value="completion">{t('achievements.completion')}</TabsTrigger>
            <TabsTrigger value="special">{t('achievements.special')}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userAchievements.unlockedAchievements.map((achievement) => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                  progress={userAchievements.progress[achievement.id]}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userAchievements.unlockedAchievements
                .filter(a => a.category === 'progress')
                .map((achievement) => (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                    progress={userAchievements.progress[achievement.id]}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="streak" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userAchievements.unlockedAchievements
                .filter(a => a.category === 'streak')
                .map((achievement) => (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                    progress={userAchievements.progress[achievement.id]}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="completion" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userAchievements.unlockedAchievements
                .filter(a => a.category === 'completion')
                .map((achievement) => (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                    progress={userAchievements.progress[achievement.id]}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="special" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userAchievements.unlockedAchievements
                .filter(a => a.category === 'special')
                .map((achievement) => (
                  <AchievementCard 
                    key={achievement.id} 
                    achievement={achievement} 
                    progress={userAchievements.progress[achievement.id]}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface AchievementCardProps {
  achievement: Achievement;
  progress: { current: number; required: number };
}

const AchievementCard = ({ achievement, progress }: AchievementCardProps) => {
  const { t } = useLanguage();
  
  const getTypeIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'bronze': return <Award className="w-4 h-4 text-amber-600" />;
      case 'silver': return <Award className="w-4 h-4 text-gray-400" />;
      case 'gold': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'platinum': return <Star className="w-4 h-4 text-purple-500" />;
    }
  };

  const getTypeColor = (type: Achievement['type']) => {
    switch (type) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-200';
    }
  };

  return (
    <Card className={`transition-all duration-200 ${
      achievement.isUnlocked 
        ? 'bg-card border-border hover:shadow-lg' 
        : 'bg-muted/30 border-muted opacity-60'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{achievement.icon}</div>
            <div>
              <CardTitle className="text-lg">{achievement.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`text-xs ${getTypeColor(achievement.type)}`}>
                  {getTypeIcon(achievement.type)}
                  <span className="ml-1 capitalize">{achievement.type}</span>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {achievement.points} {t('challenges.points')}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-primary">
            {achievement.isUnlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="text-sm mb-3">
          {achievement.description}
        </CardDescription>
        
        {!achievement.isUnlocked && progress && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t('achievements.progress')}</span>
              <span>{progress.current} / {progress.required}</span>
            </div>
            <Progress 
              value={(progress.current / progress.required) * 100} 
              className="h-2"
            />
          </div>
        )}
        
        {achievement.isUnlocked && achievement.unlockedAt && (
          <div className="text-xs text-muted-foreground">
            {t('achievements.unlockedOn')} {achievement.unlockedAt.toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};