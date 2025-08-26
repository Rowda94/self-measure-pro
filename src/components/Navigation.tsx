import { Button } from "@/components/ui/button";
import { Home, List, Trophy, User } from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'challenges', label: 'Challenges', icon: List },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">FitTracker Pro</h1>
              <p className="text-xs text-muted-foreground">Quantified Self</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onViewChange(item.id)}
                  className={`flex items-center gap-2 ${
                    currentView === item.id 
                      ? 'bg-gradient-primary text-white border-0' 
                      : 'hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <Button variant="ghost" size="sm">
              <Trophy className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col items-center gap-1 h-auto py-2 ${
                  currentView === item.id 
                    ? 'bg-gradient-primary text-white border-0' 
                    : ''
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};