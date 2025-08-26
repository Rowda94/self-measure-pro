import { Challenge, UserProgress, ProgressEntry } from "@/types/fitness";

export const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Daily Steps Challenge",
    description: "Walk 10,000 steps every day for 30 days. Build a consistent walking habit and improve your cardiovascular health.",
    category: "Cardio",
    difficulty: "Beginner",
    targetValue: 300000,
    unit: "steps",
    duration: 30,
    points: 100,
    createdAt: new Date("2024-01-01")
  },
  {
    id: "2", 
    title: "Push-Up Master",
    description: "Complete 1000 push-ups over 30 days. Start with what you can do and gradually increase your strength.",
    category: "Strength",
    difficulty: "Intermediate", 
    targetValue: 1000,
    unit: "reps",
    duration: 30,
    points: 150,
    createdAt: new Date("2024-01-02")
  },
  {
    id: "3",
    title: "Meditation Mindfulness",
    description: "Meditate for 10 hours total over 30 days. Improve your mental well-being and reduce stress.",
    category: "Mental Health",
    difficulty: "Beginner",
    targetValue: 600,
    unit: "minutes", 
    duration: 30,
    points: 120,
    createdAt: new Date("2024-01-03")
  },
  {
    id: "4",
    title: "Hydration Hero",
    description: "Drink 8 glasses of water daily for 21 days. Stay properly hydrated and boost your energy levels.",
    category: "Nutrition",
    difficulty: "Beginner",
    targetValue: 168,
    unit: "glasses",
    duration: 21,
    points: 80,
    createdAt: new Date("2024-01-04")
  },
  {
    id: "5",
    title: "Running Distance Goal",
    description: "Run a total of 100 kilometers over 30 days. Improve your endurance and cardiovascular fitness.",
    category: "Cardio",
    difficulty: "Advanced",
    targetValue: 100,
    unit: "km",
    duration: 30,
    points: 200,
    createdAt: new Date("2024-01-05")
  },
  {
    id: "6",
    title: "Flexibility Flow",
    description: "Complete 15 hours of stretching/yoga over 30 days. Improve your flexibility and prevent injuries.",
    category: "Flexibility",
    difficulty: "Intermediate",
    targetValue: 900,
    unit: "minutes",
    duration: 30,
    points: 140,
    createdAt: new Date("2024-01-06")
  },
  {
    id: "7",
    title: "Weight Loss Journey",
    description: "Lose 5 kg in a healthy way over 60 days. Focus on sustainable habits and lifestyle changes.",
    category: "Weight Loss",
    difficulty: "Intermediate",
    targetValue: 5,
    unit: "kg",
    duration: 60,
    points: 300,
    createdAt: new Date("2024-01-07")
  },
  {
    id: "8",
    title: "Strength Training Consistency",
    description: "Complete 20 strength training sessions over 30 days. Build muscle and increase your overall strength.",
    category: "Strength",
    difficulty: "Advanced",
    targetValue: 20,
    unit: "sessions",
    duration: 30,
    points: 180,
    createdAt: new Date("2024-01-08")
  }
];

export const mockProgressEntries: ProgressEntry[] = [
  {
    id: "1",
    date: new Date("2024-01-20"),
    value: 12000,
    note: "Great walk in the park!"
  },
  {
    id: "2", 
    date: new Date("2024-01-21"),
    value: 8500,
    note: "Busy day, but got some steps in"
  },
  {
    id: "3",
    date: new Date("2024-01-22"),
    value: 15000,
    note: "Went hiking with friends"
  },
  {
    id: "4",
    date: new Date("2024-01-23"),
    value: 9200,
    note: ""
  },
  {
    id: "5",
    date: new Date("2024-01-24"),
    value: 11500,
    note: "Morning jog plus evening walk"
  }
];

export const mockUserProgress: UserProgress[] = [
  {
    id: "1",
    challengeId: "1",
    currentValue: 56200,
    entries: mockProgressEntries,
    isActive: true,
    startDate: new Date("2024-01-20"),
    streak: 5
  },
  {
    id: "2",
    challengeId: "3",
    currentValue: 180,
    entries: [
      {
        id: "6",
        date: new Date("2024-01-20"),
        value: 20,
        note: "Morning meditation"
      },
      {
        id: "7",
        date: new Date("2024-01-21"), 
        value: 15,
        note: "Quick evening session"
      },
      {
        id: "8",
        date: new Date("2024-01-22"),
        value: 30,
        note: "Deep meditation session"
      },
      {
        id: "9",
        date: new Date("2024-01-23"),
        value: 25,
        note: ""
      },
      {
        id: "10",
        date: new Date("2024-01-24"),
        value: 20,
        note: "Guided meditation"
      }
    ],
    isActive: true,
    startDate: new Date("2024-01-20"),
    streak: 5
  }
];