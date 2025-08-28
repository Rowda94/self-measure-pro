import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { User, Edit3, Save, LogOut, Calendar, Trophy, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

interface ProfileProps {
  user: SupabaseUser;
}

export const Profile = ({ user }: ProfileProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setDisplayName(data.display_name || '');
        setBio(data.bio || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setSaving(true);
    try {
      const updates = {
        user_id: user.id,
        display_name: displayName,
        bio: bio,
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;

      await fetchProfile();
      setEditing(false);
      toast({
        title: t('profile.saved'),
        description: t('profile.savedDescription'),
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t('common.error'),
        description: t('profile.saveError'),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  const memberSince = profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : new Date().toLocaleDateString();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-gradient-subtle border-border/50">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                  {(profile?.display_name || user.email || 'U').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">
              {editing ? (
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="text-center text-2xl font-bold bg-background/50"
                  placeholder={t('profile.displayName')}
                />
              ) : (
                profile?.display_name || user.email
              )}
            </CardTitle>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{t('profile.memberSince')} {memberSince}</span>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            {editing ? (
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder={t('profile.bioPlaceholder')}
                className="mb-4 bg-background/50"
                rows={3}
              />
            ) : (
              <p className="text-muted-foreground mb-4">
                {profile?.bio || t('profile.noBio')}
              </p>
            )}
            
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-primary/10">
                <User className="w-3 h-3 mr-1" />
                {t('profile.active')}
              </Badge>
            </div>

            <div className="flex justify-center gap-2">
              {editing ? (
                <>
                  <Button onClick={updateProfile} disabled={saving} className="bg-gradient-primary text-white border-0">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? t('common.saving') : t('common.save')}
                  </Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    {t('common.cancel')}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditing(true)} variant="outline">
                  <Edit3 className="w-4 h-4 mr-2" />
                  {t('profile.editProfile')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">{t('dashboard.completedChallenges')}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">{t('dashboard.activeChallenges')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">{t('profile.accountSettings')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertDescription>
                <strong>{t('auth.email')}:</strong> {user.email}
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={signOut} 
              variant="destructive" 
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('auth.signOut')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};