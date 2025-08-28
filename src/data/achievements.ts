import { Achievement } from "@/types/achievements";

export const baseAchievements: Omit<Achievement, 'isUnlocked' | 'unlockedAt'>[] = [
  // Progress Achievements
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Log your first progress entry',
    icon: '👶',
    category: 'progress',
    type: 'bronze',
    requirement: {
      type: 'total_progress',
      value: 1
    },
    points: 10
  },
  {
    id: 'getting_started',
    title: 'Getting Started',
    description: 'Accumulate 100 points of progress',
    icon: '🚀',
    category: 'progress',
    type: 'bronze',
    requirement: {
      type: 'total_progress',
      value: 100
    },
    points: 25
  },
  {
    id: 'making_progress',
    title: 'Making Progress',
    description: 'Accumulate 500 points of progress',
    icon: '📈',
    category: 'progress',
    type: 'silver',
    requirement: {
      type: 'total_progress',
      value: 500
    },
    points: 50
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: 'Accumulate 1000 points of progress',
    icon: '💪',
    category: 'progress',
    type: 'gold',
    requirement: {
      type: 'total_progress',
      value: 1000
    },
    points: 100
  },

  // Streak Achievements
  {
    id: 'daily_dedication',
    title: 'Daily Dedication',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    category: 'streak',
    type: 'bronze',
    requirement: {
      type: 'streak_days',
      value: 3
    },
    points: 20
  },
  {
    id: 'week_warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '⚡',
    category: 'streak',
    type: 'silver',
    requirement: {
      type: 'streak_days',
      value: 7
    },
    points: 50
  },
  {
    id: 'month_master',
    title: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '🏆',
    category: 'streak',
    type: 'gold',
    requirement: {
      type: 'streak_days',
      value: 30
    },
    points: 150
  },
  {
    id: 'legendary_streak',
    title: 'Legendary Streak',
    description: 'Maintain a 100-day streak',
    icon: '👑',
    category: 'streak',
    type: 'platinum',
    requirement: {
      type: 'streak_days',
      value: 100
    },
    points: 500
  },

  // Completion Achievements
  {
    id: 'first_finish',
    title: 'First Finish',
    description: 'Complete your first challenge',
    icon: '🎯',
    category: 'completion',
    type: 'bronze',
    requirement: {
      type: 'challenges_completed',
      value: 1
    },
    points: 30
  },
  {
    id: 'challenge_collector',
    title: 'Challenge Collector',
    description: 'Complete 5 challenges',
    icon: '🏅',
    category: 'completion',
    type: 'silver',
    requirement: {
      type: 'challenges_completed',
      value: 5
    },
    points: 75
  },
  {
    id: 'achievement_hunter',
    title: 'Achievement Hunter',
    description: 'Complete 10 challenges',
    icon: '🏆',
    category: 'completion',
    type: 'gold',
    requirement: {
      type: 'challenges_completed',
      value: 10
    },
    points: 200
  },
  {
    id: 'master_achiever',
    title: 'Master Achiever',
    description: 'Complete 25 challenges',
    icon: '👑',
    category: 'completion',
    type: 'platinum',
    requirement: {
      type: 'challenges_completed',
      value: 25
    },
    points: 500
  },

  // Special Achievements
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Log progress before 8 AM',
    icon: '🌅',
    category: 'special',
    type: 'bronze',
    requirement: {
      type: 'daily_goal',
      value: 1
    },
    points: 15
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Log progress after 10 PM',
    icon: '🌙',
    category: 'special',
    type: 'bronze',
    requirement: {
      type: 'daily_goal',
      value: 1
    },
    points: 15
  },
  {
    id: 'step_master',
    title: 'Step Master',
    description: 'Complete the 10,000 Steps challenge',
    icon: '👟',
    category: 'special',
    type: 'silver',
    requirement: {
      type: 'specific_challenge',
      value: 1,
      challengeId: '1'
    },
    points: 60
  },
  {
    id: 'water_champion',
    title: 'Water Champion',
    description: 'Complete the Hydration Challenge',
    icon: '💧',
    category: 'special',
    type: 'silver',
    requirement: {
      type: 'specific_challenge',
      value: 1,
      challengeId: '4'
    },
    points: 60
  }
];

export const germanAchievements: Omit<Achievement, 'isUnlocked' | 'unlockedAt'>[] = [
  // Progress Achievements
  {
    id: 'first_steps',
    title: 'Erste Schritte',
    description: 'Trage deinen ersten Fortschritt ein',
    icon: '👶',
    category: 'progress',
    type: 'bronze',
    requirement: {
      type: 'total_progress',
      value: 1
    },
    points: 10
  },
  {
    id: 'getting_started',
    title: 'Loslegen',
    description: 'Sammle 100 Fortschrittspunkte',
    icon: '🚀',
    category: 'progress',
    type: 'bronze',
    requirement: {
      type: 'total_progress',
      value: 100
    },
    points: 25
  },
  {
    id: 'making_progress',
    title: 'Fortschritte machen',
    description: 'Sammle 500 Fortschrittspunkte',
    icon: '📈',
    category: 'progress',
    type: 'silver',
    requirement: {
      type: 'total_progress',
      value: 500
    },
    points: 50
  },
  {
    id: 'unstoppable',
    title: 'Unaufhaltbar',
    description: 'Sammle 1000 Fortschrittspunkte',
    icon: '💪',
    category: 'progress',
    type: 'gold',
    requirement: {
      type: 'total_progress',
      value: 1000
    },
    points: 100
  },

  // Streak Achievements
  {
    id: 'daily_dedication',
    title: 'Tägliche Hingabe',
    description: 'Halte eine 3-Tage-Serie',
    icon: '🔥',
    category: 'streak',
    type: 'bronze',
    requirement: {
      type: 'streak_days',
      value: 3
    },
    points: 20
  },
  {
    id: 'week_warrior',
    title: 'Wochenkrieger',
    description: 'Halte eine 7-Tage-Serie',
    icon: '⚡',
    category: 'streak',
    type: 'silver',
    requirement: {
      type: 'streak_days',
      value: 7
    },
    points: 50
  },
  {
    id: 'month_master',
    title: 'Monatsmeister',
    description: 'Halte eine 30-Tage-Serie',
    icon: '🏆',
    category: 'streak',
    type: 'gold',
    requirement: {
      type: 'streak_days',
      value: 30
    },
    points: 150
  },
  {
    id: 'legendary_streak',
    title: 'Legendäre Serie',
    description: 'Halte eine 100-Tage-Serie',
    icon: '👑',
    category: 'streak',
    type: 'platinum',
    requirement: {
      type: 'streak_days',
      value: 100
    },
    points: 500
  },

  // Completion Achievements
  {
    id: 'first_finish',
    title: 'Erster Abschluss',
    description: 'Schließe deine erste Challenge ab',
    icon: '🎯',
    category: 'completion',
    type: 'bronze',
    requirement: {
      type: 'challenges_completed',
      value: 1
    },
    points: 30
  },
  {
    id: 'challenge_collector',
    title: 'Challenge-Sammler',
    description: 'Schließe 5 Challenges ab',
    icon: '🏅',
    category: 'completion',
    type: 'silver',
    requirement: {
      type: 'challenges_completed',
      value: 5
    },
    points: 75
  },
  {
    id: 'achievement_hunter',
    title: 'Erfolgs-Jäger',
    description: 'Schließe 10 Challenges ab',
    icon: '🏆',
    category: 'completion',
    type: 'gold',
    requirement: {
      type: 'challenges_completed',
      value: 10
    },
    points: 200
  },
  {
    id: 'master_achiever',
    title: 'Meister-Erreicher',
    description: 'Schließe 25 Challenges ab',
    icon: '👑',
    category: 'completion',
    type: 'platinum',
    requirement: {
      type: 'challenges_completed',
      value: 25
    },
    points: 500
  },

  // Special Achievements
  {
    id: 'early_bird',
    title: 'Frühaufsteher',
    description: 'Trage vor 8 Uhr Fortschritt ein',
    icon: '🌅',
    category: 'special',
    type: 'bronze',
    requirement: {
      type: 'daily_goal',
      value: 1
    },
    points: 15
  },
  {
    id: 'night_owl',
    title: 'Nachteule',
    description: 'Trage nach 22 Uhr Fortschritt ein',
    icon: '🌙',
    category: 'special',
    type: 'bronze',
    requirement: {
      type: 'daily_goal',
      value: 1
    },
    points: 15
  },
  {
    id: 'step_master',
    title: 'Schritt-Meister',
    description: 'Schließe die 10.000 Schritte Challenge ab',
    icon: '👟',
    category: 'special',
    type: 'silver',
    requirement: {
      type: 'specific_challenge',
      value: 1,
      challengeId: '1'
    },
    points: 60
  },
  {
    id: 'water_champion',
    title: 'Wasser-Champion',
    description: 'Schließe die Hydrations-Challenge ab',
    icon: '💧',
    category: 'special',
    type: 'silver',
    requirement: {
      type: 'specific_challenge',
      value: 1,
      challengeId: '4'
    },
    points: 60
  }
];