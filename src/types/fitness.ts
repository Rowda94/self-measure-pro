export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetValue: number;
  unit: string;
  duration: number; // in days
  points: number;
  createdAt: Date;
}

export interface UserProgress {
  id: string;
  challengeId: string;
  currentValue: number;
  entries: ProgressEntry[];
  isActive: boolean;
  startDate: Date;
  completedDate?: Date;
  streak: number;
}

export interface ProgressEntry {
  id: string;
  date: Date;
  value: number;
  note?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  category: string;
}

export interface UserStats {
  totalChallengesCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  achievements: Achievement[];
}