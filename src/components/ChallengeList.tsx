import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Clock, Trophy, Users, Target } from "lucide-react";
import { Challenge, UserProgress } from "@/types/fitness";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChallengeListProps {
  challenges: Challenge[];
  userProgress: UserProgress[];
  onEnrollChallenge: (challenge: Challenge) => void;
  onSelectChallenge: (challenge: Challenge) => void;
}

export const ChallengeList = ({ 
  challenges, 
  userProgress, 
  onEnrollChallenge, 
  onSelectChallenge 
}: ChallengeListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { t } = useLanguage();

  const categories = Array.from(new Set(challenges.map(c => c.category)));

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isEnrolled = (challengeId: string) => {
    return userProgress.some(progress => progress.challengeId === challengeId && progress.isActive);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-gradient-success';
      case 'Intermediate': return 'bg-gradient-warning';
      case 'Advanced': return 'bg-gradient-primary';
      default: return 'bg-gradient-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={t('challenges.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('challenges.allCategories')}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {t(`category.${category}` as any) || category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => {
          const enrolled = isEnrolled(challenge.id);
          
          return (
            <Card 
              key={challenge.id} 
              className="hover:shadow-elevated transition-all cursor-pointer group"
              onClick={() => onSelectChallenge(challenge)}
            >
              <CardHeader className="pb-3">
                <div className={`w-full h-32 rounded-lg ${getDifficultyColor(challenge.difficulty)} 
                              flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <Target className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {challenge.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {t(`category.${challenge.category}` as any) || challenge.category}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={`text-white ${getDifficultyColor(challenge.difficulty)}`}
                  >
                    {t(`difficulty.${challenge.difficulty}` as any) || challenge.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {challenge.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{challenge.duration} {t('challenges.days')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span>{challenge.targetValue} {t(`unit.${challenge.unit}` as any) || challenge.unit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{Math.floor(Math.random() * 1000) + 100} {t('challenges.participants')}</span>
                  </div>
                  <div className="font-medium text-primary">
                    {challenge.points} {t('challenges.points')}
                  </div>
                </div>

                <Button 
                  className={`w-full ${enrolled ? 'bg-gradient-success' : 'bg-gradient-primary'} 
                            text-white border-0 hover:opacity-90 transition-opacity`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!enrolled) {
                      onEnrollChallenge(challenge);
                    }
                  }}
                  disabled={enrolled}
                >
                  {enrolled ? t('challenges.enrolled') : t('challenges.joinChallenge')}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">{t('challenges.noChallengesFound')}</h3>
            <p className="text-muted-foreground">
              {t('challenges.noChallengesDesc')}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};