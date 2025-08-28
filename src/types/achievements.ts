export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'progress' | 'streak' | 'completion' | 'special';
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  requirement: {
    type: 'total_progress' | 'streak_days' | 'challenges_completed' | 'specific_challenge' | 'daily_goal';
    value: number;
    challengeId?: string;
  };
  points: number;
  unlockedAt?: Date;
  isUnlocked: boolean;
}

export interface UserAchievements {
  totalPoints: number;
  unlockedAchievements: Achievement[];
  progress: {
    [achievementId: string]: {
      current: number;
      required: number;
    };
  };
}