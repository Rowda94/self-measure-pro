import { Challenge } from "@/types/fitness";

export const germanChallenges: Challenge[] = [
  {
    id: "1",
    title: "Tägliche Schritte Challenge",
    description: "Gehe 30 Tage lang täglich 10.000 Schritte. Entwickle eine konstante Gehgewohnheit und verbessere deine Herz-Kreislauf-Gesundheit.",
    category: "Ausdauer",
    difficulty: "Beginner",
    targetValue: 300000,
    unit: "Schritte",
    duration: 30,
    points: 100,
    createdAt: new Date("2024-01-01")
  },
  {
    id: "2", 
    title: "Liegestütz-Meister",
    description: "Absolviere 1000 Liegestütze über 30 Tage. Beginne mit dem was du schaffst und steigere deine Kraft schrittweise.",
    category: "Kraft",
    difficulty: "Intermediate", 
    targetValue: 1000,
    unit: "Wiederholungen",
    duration: 30,
    points: 150,
    createdAt: new Date("2024-01-02")
  },
  {
    id: "3",
    title: "Meditations-Achtsamkeit",
    description: "Meditiere insgesamt 10 Stunden über 30 Tage. Verbessere dein mentales Wohlbefinden und reduziere Stress.",
    category: "Mentale Gesundheit",
    difficulty: "Beginner",
    targetValue: 600,
    unit: "Minuten", 
    duration: 30,
    points: 120,
    createdAt: new Date("2024-01-03")
  },
  {
    id: "4",
    title: "Hydration-Held",
    description: "Trinke 21 Tage lang täglich 8 Gläser Wasser. Bleibe richtig hydriert und steigere dein Energielevel.",
    category: "Ernährung",
    difficulty: "Beginner",
    targetValue: 168,
    unit: "Gläser",
    duration: 21,
    points: 80,
    createdAt: new Date("2024-01-04")
  },
  {
    id: "5",
    title: "Laufdistanz-Ziel",
    description: "Laufe insgesamt 100 Kilometer über 30 Tage. Verbessere deine Ausdauer und Herz-Kreislauf-Fitness.",
    category: "Ausdauer",
    difficulty: "Advanced",
    targetValue: 100,
    unit: "km",
    duration: 30,
    points: 200,
    createdAt: new Date("2024-01-05")
  },
  {
    id: "6",
    title: "Flexibilitäts-Flow",
    description: "Absolviere 15 Stunden Stretching/Yoga über 30 Tage. Verbessere deine Flexibilität und beuge Verletzungen vor.",
    category: "Flexibilität",
    difficulty: "Intermediate",
    targetValue: 900,
    unit: "Minuten",
    duration: 30,
    points: 140,
    createdAt: new Date("2024-01-06")
  },
  {
    id: "7",
    title: "Gewichtsabnahme-Reise",
    description: "Verliere auf gesunde Weise 5 kg über 60 Tage. Fokussiere dich auf nachhaltige Gewohnheiten und Lebensstiländerungen.",
    category: "Gewichtsabnahme",
    difficulty: "Intermediate",
    targetValue: 5,
    unit: "kg",
    duration: 60,
    points: 300,
    createdAt: new Date("2024-01-07")
  },
  {
    id: "8",
    title: "Krafttraining-Konstanz",
    description: "Absolviere 20 Krafttraining-Einheiten über 30 Tage. Baue Muskeln auf und steigere deine Gesamtkraft.",
    category: "Kraft",
    difficulty: "Advanced",
    targetValue: 20,
    unit: "Einheiten",
    duration: 30,
    points: 180,
    createdAt: new Date("2024-01-08")
  }
];