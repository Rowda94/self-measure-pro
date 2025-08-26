import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { ChallengeList } from "@/components/ChallengeList";
import { ChallengeDetail } from "@/components/ChallengeDetail";
import { mockChallenges, mockUserProgress } from "@/data/mockData";
import { Challenge, UserProgress, ProgressEntry } from "@/types/fitness";

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [challenges] = useState<Challenge[]>(mockChallenges);
  const [userProgress, setUserProgress] = useState<UserProgress[]>(mockUserProgress);

  const handleEnrollChallenge = (challenge: Challenge) => {
    const newProgress: UserProgress = {
      id: Date.now().toString(),
      challengeId: challenge.id,
      currentValue: 0,
      entries: [],
      isActive: true,
      startDate: new Date(),
      streak: 0
    };
    
    setUserProgress(prev => [...prev, newProgress]);
    setCurrentView('dashboard');
  };

  const handleLogProgress = (challengeId: string, value: number, note?: string) => {
    const newEntry: ProgressEntry = {
      id: Date.now().toString(),
      date: new Date(),
      value: value,
      note: note
    };

    setUserProgress(prev => 
      prev.map(progress => {
        if (progress.challengeId === challengeId) {
          return {
            ...progress,
            currentValue: progress.currentValue + value,
            entries: [...progress.entries, newEntry],
            streak: progress.streak + (isToday(progress.entries[progress.entries.length - 1]?.date) ? 0 : 1)
          };
        }
        return progress;
      })
    );
  };

  const isToday = (date?: Date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCurrentView('challenge-detail');
  };

  const handleBackFromDetail = () => {
    setSelectedChallenge(null);
    setCurrentView('challenges');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            challenges={challenges}
            userProgress={userProgress}
            onSelectChallenge={handleSelectChallenge}
          />
        );
      case 'challenges':
        return (
          <ChallengeList 
            challenges={challenges}
            userProgress={userProgress}
            onEnrollChallenge={handleEnrollChallenge}
            onSelectChallenge={handleSelectChallenge}
          />
        );
      case 'challenge-detail':
        return selectedChallenge ? (
          <ChallengeDetail 
            challenge={selectedChallenge}
            userProgress={userProgress.find(up => up.challengeId === selectedChallenge.id)}
            onBack={handleBackFromDetail}
            onLogProgress={handleLogProgress}
          />
        ) : null;
      case 'achievements':
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <p className="text-muted-foreground">Coming soon! Unlock badges and trophies as you complete challenges.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p className="text-muted-foreground">Coming soon! Manage your profile and view detailed statistics.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
