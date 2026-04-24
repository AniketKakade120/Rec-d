'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  User,
  Recommendation,
  Rating,
  RecommendationStatus,
  TasteScore,
  MoodTag,
  ReactionTag,
  Badge,
  Group,
  GroupMember,
  ActivityItem,
} from '@/lib/types';
import {
  mockUsers,
  mockRecommendations,
  mockRatings,
  mockBadges,
  mockGroups,
  mockGroupMembers,
  mockActivity,
  mockTasteScore,
  mockTitles,
  mockLeaderboard,
  currentUser as defaultUser,
} from '@/lib/mock-data';

interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  recommendations: Recommendation[];
  ratings: Rating[];
  badges: Badge[];
  groups: Group[];
  groupMembers: GroupMember[];
  activity: ActivityItem[];
  tasteScore: TasteScore;
}

interface AppContextType extends AppState {
  login: (user?: User) => void;
  logout: () => void;
  completeOnboarding: () => void;
  addRecommendation: (rec: Recommendation) => void;
  updateRecommendationStatus: (recId: string, status: RecommendationStatus) => void;
  addRating: (rating: Rating) => void;
  createGroup: (group: Group) => void;
  joinGroup: (groupId: string) => void;
  getTitle: (id: string) => typeof mockTitles[0] | undefined;
  getUser: (id: string) => User | undefined;
  getGroup: (id: string) => Group | undefined;
  getGroupMembers: (groupId: string) => User[];
  getGroupRecommendations: (groupId: string) => Recommendation[];
  getPendingForUser: () => Recommendation[];
  getUserBadges: (userId: string) => Badge[];
  leaderboard: typeof mockLeaderboard;
  titles: typeof mockTitles;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    isAuthenticated: false,
    isOnboarded: false,
    recommendations: mockRecommendations,
    ratings: mockRatings,
    badges: mockBadges,
    groups: mockGroups,
    groupMembers: mockGroupMembers,
    activity: mockActivity,
    tasteScore: mockTasteScore,
  });

  const login = useCallback((user?: User) => {
    setState(prev => ({
      ...prev,
      currentUser: user || defaultUser,
      isAuthenticated: true,
    }));
  }, []);

  const logout = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentUser: null,
      isAuthenticated: false,
      isOnboarded: false,
    }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setState(prev => ({ ...prev, isOnboarded: true }));
  }, []);

  const addRecommendation = useCallback((rec: Recommendation) => {
    setState(prev => ({
      ...prev,
      recommendations: [rec, ...prev.recommendations],
      activity: [
        {
          id: `act-${Date.now()}`,
          type: 'recommendation_sent' as const,
          user_id: rec.recommended_by,
          target_user_id: rec.recommended_to_user_id,
          title_id: rec.title_id,
          group_id: rec.group_id,
          message: `New recommendation sent`,
          created_at: new Date().toISOString(),
        },
        ...prev.activity,
      ],
    }));
  }, []);

  const updateRecommendationStatus = useCallback((recId: string, status: RecommendationStatus) => {
    setState(prev => ({
      ...prev,
      recommendations: prev.recommendations.map(r =>
        r.id === recId ? { ...r, status } : r
      ),
    }));
  }, []);

  const addRating = useCallback((rating: Rating) => {
    setState(prev => {
      const newRatings = [...prev.ratings, rating];
      // Recalculate taste score
      const userRatings = newRatings.filter(r => {
        const rec = prev.recommendations.find(rec => rec.id === r.recommendation_id);
        return rec?.recommended_by === prev.currentUser?.id;
      });
      const avgAccuracy = userRatings.length > 0
        ? userRatings.reduce((sum, r) => sum + r.recommendation_accuracy, 0) / userRatings.length
        : prev.tasteScore.avg_accuracy;

      return {
        ...prev,
        ratings: newRatings,
        recommendations: prev.recommendations.map(r =>
          r.id === rating.recommendation_id ? { ...r, status: 'rated' as const } : r
        ),
        tasteScore: {
          ...prev.tasteScore,
          score: Math.round((avgAccuracy / 5) * 100),
          total_rated: prev.tasteScore.total_rated + 1,
          avg_accuracy: Math.round(avgAccuracy * 10) / 10,
          best_reaction: rating.recommendation_accuracy >= 4 ? rating.reaction_tag : prev.tasteScore.best_reaction,
        },
      };
    });
  }, []);

  const createGroup = useCallback((group: Group) => {
    setState(prev => ({
      ...prev,
      groups: [...prev.groups, group],
      groupMembers: [
        ...prev.groupMembers,
        {
          id: `gm-${Date.now()}`,
          group_id: group.id,
          user_id: prev.currentUser?.id || '',
          role: 'admin' as const,
          joined_at: new Date().toISOString(),
        },
      ],
    }));
  }, []);

  const joinGroup = useCallback((groupId: string) => {
    setState(prev => ({
      ...prev,
      groupMembers: [
        ...prev.groupMembers,
        {
          id: `gm-${Date.now()}`,
          group_id: groupId,
          user_id: prev.currentUser?.id || '',
          role: 'member' as const,
          joined_at: new Date().toISOString(),
        },
      ],
    }));
  }, []);

  const getTitle = useCallback((id: string) => mockTitles.find(t => t.id === id), []);
  const getUser = useCallback((id: string) => mockUsers.find(u => u.id === id), []);
  const getGroup = useCallback((id: string) => state.groups.find(g => g.id === id), [state.groups]);

  const getGroupMembersFn = useCallback((groupId: string) => {
    const memberIds = state.groupMembers.filter(gm => gm.group_id === groupId).map(gm => gm.user_id);
    return mockUsers.filter(u => memberIds.includes(u.id));
  }, [state.groupMembers]);

  const getGroupRecommendations = useCallback((groupId: string) => {
    return state.recommendations.filter(r => r.group_id === groupId);
  }, [state.recommendations]);

  const getPendingForUser = useCallback(() => {
    return state.recommendations.filter(
      r => r.recommended_to_user_id === state.currentUser?.id && (r.status === 'pending' || r.status === 'accepted')
    );
  }, [state.recommendations, state.currentUser]);

  const getUserBadgesFn = useCallback((userId: string) => {
    return state.badges.filter(b => b.user_id === userId);
  }, [state.badges]);

  const value: AppContextType = {
    ...state,
    login,
    logout,
    completeOnboarding,
    addRecommendation,
    updateRecommendationStatus,
    addRating,
    createGroup,
    joinGroup,
    getTitle,
    getUser,
    getGroup,
    getGroupMembers: getGroupMembersFn,
    getGroupRecommendations,
    getPendingForUser,
    getUserBadges: getUserBadgesFn,
    leaderboard: mockLeaderboard,
    titles: mockTitles,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
