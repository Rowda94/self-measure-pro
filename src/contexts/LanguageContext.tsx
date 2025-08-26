import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.challenges': 'Challenges',
    'nav.achievements': 'Achievements',
    'nav.profile': 'Profile',
    'nav.appName': 'FitTracker Pro',
    'nav.appSubtitle': 'Quantified Self',
    
    // Dashboard
    'dashboard.dayStreak': 'Day Streak',
    'dashboard.activeGoals': 'Active Goals',
    'dashboard.achievements': 'Achievements',
    'dashboard.overallProgress': 'Overall Progress',
    'dashboard.activeChallenges': 'Active Challenges',
    'dashboard.noChallenges': 'No active challenges yet!',
    'dashboard.noChallengesDesc': 'Start your fitness journey by selecting a challenge.',
    'dashboard.progress': 'Progress',
    'dashboard.complete': 'Complete',
    
    // Challenge List
    'challenges.searchPlaceholder': 'Search challenges...',
    'challenges.allCategories': 'All Categories',
    'challenges.participants': 'participants',
    'challenges.points': 'points',
    'challenges.joinChallenge': 'Join Challenge',
    'challenges.enrolled': 'Enrolled ✓',
    'challenges.noChallengesFound': 'No challenges found',
    'challenges.noChallengesDesc': 'Try adjusting your search criteria or browse all categories.',
    'challenges.days': 'days',
    
    // Challenge Detail
    'detail.points': 'Points',
    'detail.days': 'Days',
    'detail.yourProgress': 'Your Progress',
    'detail.started': 'Started',
    'detail.streak': 'Streak',
    'detail.logProgress': 'Log Progress',
    'detail.recentEntries': 'Recent Entries',
    'detail.noEntries': 'No entries yet',
    'detail.noEntriesDesc': 'Start logging your progress!',
    'detail.readyToStart': 'Ready to Start?',
    'detail.readyToStartDesc': 'Join this challenge and start tracking your progress towards your fitness goals.',
    'detail.saveEntry': 'Save Entry',
    'detail.cancel': 'Cancel',
    'detail.addNote': 'Add a note (optional)...',
    'detail.enterValue': 'Enter',
    
    // Toast Messages
    'toast.invalidInput': 'Invalid Input',
    'toast.invalidInputDesc': 'Please enter a valid positive number.',
    'toast.progressLogged': 'Progress Logged!',
    'toast.progressLoggedDesc': 'Added',
    'toast.toYourProgress': 'to your progress.',
    
    // Difficulties
    'difficulty.Beginner': 'Beginner',
    'difficulty.Intermediate': 'Intermediate',
    'difficulty.Advanced': 'Advanced',
    
    // Categories
    'category.Cardio': 'Cardio',
    'category.Strength': 'Strength',
    'category.Mental Health': 'Mental Health',
    'category.Nutrition': 'Nutrition',
    'category.Flexibility': 'Flexibility',
    'category.Weight Loss': 'Weight Loss',
    
    // Units
    'unit.steps': 'steps',
    'unit.reps': 'reps',
    'unit.minutes': 'minutes',
    'unit.glasses': 'glasses',
    'unit.km': 'km',
    'unit.kg': 'kg',
    'unit.sessions': 'sessions',
    
    // Coming Soon Pages
    'achievements.title': 'Achievements',
    'achievements.desc': 'Coming soon! Unlock badges and trophies as you complete challenges.',
    'profile.title': 'Profile',
    'profile.desc': 'Coming soon! Manage your profile and view detailed statistics.',
  },
  de: {
    // Navigation  
    'nav.dashboard': 'Dashboard',
    'nav.challenges': 'Challenges',
    'nav.achievements': 'Erfolge',
    'nav.profile': 'Profil',
    'nav.appName': 'FitTracker Pro',
    'nav.appSubtitle': 'Quantified Self',
    
    // Dashboard
    'dashboard.dayStreak': 'Tage-Serie',
    'dashboard.activeGoals': 'Aktive Ziele',
    'dashboard.achievements': 'Erfolge',
    'dashboard.overallProgress': 'Gesamtfortschritt',
    'dashboard.activeChallenges': 'Aktive Challenges',
    'dashboard.noChallenges': 'Noch keine aktiven Challenges!',
    'dashboard.noChallengesDesc': 'Starte deine Fitness-Reise, indem du eine Challenge auswählst.',
    'dashboard.progress': 'Fortschritt',
    'dashboard.complete': 'Abgeschlossen',
    
    // Challenge List
    'challenges.searchPlaceholder': 'Challenges suchen...',
    'challenges.allCategories': 'Alle Kategorien',
    'challenges.participants': 'Teilnehmer',
    'challenges.points': 'Punkte',
    'challenges.joinChallenge': 'Challenge beitreten',
    'challenges.enrolled': 'Beigetreten ✓',
    'challenges.noChallengesFound': 'Keine Challenges gefunden',
    'challenges.noChallengesDesc': 'Versuche deine Suchkriterien anzupassen oder durchsuche alle Kategorien.',
    'challenges.days': 'Tage',
    
    // Challenge Detail
    'detail.points': 'Punkte',
    'detail.days': 'Tage',
    'detail.yourProgress': 'Dein Fortschritt',
    'detail.started': 'Gestartet',
    'detail.streak': 'Serie',
    'detail.logProgress': 'Fortschritt eintragen',
    'detail.recentEntries': 'Letzte Einträge',
    'detail.noEntries': 'Noch keine Einträge',
    'detail.noEntriesDesc': 'Beginne mit dem Eintragen deines Fortschritts!',
    'detail.readyToStart': 'Bereit loszulegen?',
    'detail.readyToStartDesc': 'Tritt dieser Challenge bei und beginne mit dem Tracking deiner Fitnessziele.',
    'detail.saveEntry': 'Eintrag speichern',
    'detail.cancel': 'Abbrechen',
    'detail.addNote': 'Notiz hinzufügen (optional)...',
    'detail.enterValue': 'Eingabe',
    
    // Toast Messages
    'toast.invalidInput': 'Ungültige Eingabe',
    'toast.invalidInputDesc': 'Bitte gib eine gültige positive Zahl ein.',
    'toast.progressLogged': 'Fortschritt gespeichert!',
    'toast.progressLoggedDesc': 'Hinzugefügt',
    'toast.toYourProgress': 'zu deinem Fortschritt.',
    
    // Difficulties
    'difficulty.Beginner': 'Anfänger',
    'difficulty.Intermediate': 'Fortgeschritten',
    'difficulty.Advanced': 'Experte',
    
    // Categories
    'category.Cardio': 'Ausdauer',
    'category.Strength': 'Kraft',
    'category.Mental Health': 'Mentale Gesundheit',
    'category.Nutrition': 'Ernährung',
    'category.Flexibility': 'Flexibilität',
    'category.Weight Loss': 'Gewichtsabnahme',
    
    // Units
    'unit.steps': 'Schritte',
    'unit.reps': 'Wiederholungen',
    'unit.minutes': 'Minuten',
    'unit.glasses': 'Gläser',
    'unit.km': 'km',
    'unit.kg': 'kg',
    'unit.sessions': 'Einheiten',
    
    // Coming Soon Pages
    'achievements.title': 'Erfolge',
    'achievements.desc': 'Bald verfügbar! Schalte Abzeichen und Trophäen frei, während du Challenges abschließt.',
    'profile.title': 'Profil',
    'profile.desc': 'Bald verfügbar! Verwalte dein Profil und betrachte detaillierte Statistiken.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};