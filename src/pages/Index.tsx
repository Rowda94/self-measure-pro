import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";
import { ChallengeList } from "@/components/ChallengeList";
import { ChallengeDetail } from "@/components/ChallengeDetail";
import { Profile } from "@/components/Profile";
import { Achievements } from "@/components/Achievements";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { mockChallenges, mockUserProgress } from "@/data/mockData";
import { germanChallenges } from "@/data/germanChallenges";
import { Challenge, UserProgress, ProgressEntry } from "@/types/fitness";
import { useLanguage } from "@/contexts/LanguageContext";
import type { User, Session } from '@supabase/supabase-js';

const Index = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress[]>(mockUserProgress);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  // Use German challenges if language is German, otherwise use English challenges
  const challenges = language === 'de' ? germanChallenges : mockChallenges;

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
          <Achievements userProgress={userProgress} />
        );
      case 'profile':
        return user ? (
          <Profile user={user} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">{t('profile.title')}</h2>
            <p className="text-muted-foreground">{t('profile.desc')}</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🏃‍♂️</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{t('nav.appName')}</h1>
          <p className="text-muted-foreground mb-6">{t('nav.appSubtitle')}</p>
          <Button 
            onClick={() => navigate('/auth')} 
            className="bg-gradient-primary text-white border-0"
          >
            {t('auth.signIn')}
          </Button>
        </div>
      </div>
    );
  }

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
