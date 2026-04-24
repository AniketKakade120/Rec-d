'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import GroupCard from '@/components/GroupCard';
import PageHeader from '@/components/PageHeader';
import EmptyState from '@/components/EmptyState';
import GlassCard from '@/components/GlassCard';
import { GROUP_VIBES, GroupVibe } from '@/lib/types';

export default function GroupsPage() {
  const { groups, createGroup, joinGroup } = useApp();
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupVibe, setNewGroupVibe] = useState<GroupVibe>('Movie chaos');
  const [joinCode, setJoinCode] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    
    createGroup({
      id: `group-${Date.now()}`,
      name: newGroupName,
      vibe: newGroupVibe,
      invite_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      created_by: 'current-user-id',
      created_at: new Date().toISOString(),
      avatar_gradient: Math.floor(Math.random() * 10) + 1,
    });
    
    setIsCreating(false);
    setNewGroupName('');
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    
    // In mock mode, we just join group-1 if the code is wrong
    const targetGroup = groups.find(g => g.invite_code === joinCode.toUpperCase());
    joinGroup(targetGroup?.id || 'group-1');
    
    setIsJoining(false);
    setJoinCode('');
  };

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Your Groups" 
        subtitle="Where the judging happens."
        action={
          <div className="flex gap-2">
            <button 
              onClick={() => { setIsJoining(!isJoining); setIsCreating(false); }}
              className="px-4 py-2 bg-surface border border-border text-soft-white rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors btn-press"
            >
              Join
            </button>
            <button 
              onClick={() => { setIsCreating(!isCreating); setIsJoining(false); }}
              className="px-4 py-2 bg-electric text-white rounded-lg text-sm font-medium hover:bg-electric/90 transition-colors shadow-lg shadow-electric/20 btn-press"
            >
              + Create
            </button>
          </div>
        }
      />

      {isCreating && (
        <GlassCard className="mb-8 border-electric/30" glow="blue">
          <h3 className="font-bold text-lg mb-4">Create a new group</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Group Name</label>
              <input 
                type="text" 
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                placeholder="e.g. Film Chaos Club" 
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Group Vibe</label>
              <div className="flex flex-wrap gap-2">
                {GROUP_VIBES.map(vibe => (
                  <button
                    key={vibe}
                    type="button"
                    onClick={() => setNewGroupVibe(vibe)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      newGroupVibe === vibe 
                        ? 'bg-electric/20 border-electric text-soft-white' 
                        : 'bg-surface border-border text-muted hover:border-muted/50'
                    }`}
                  >
                    {vibe}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-sm text-muted hover:text-soft-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!newGroupName.trim()}
                className="px-6 py-2 bg-electric text-white rounded-lg text-sm font-medium hover:bg-electric/90 transition-colors disabled:opacity-50"
              >
                Create Group
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {isJoining && (
        <GlassCard className="mb-8 border-purple/30" glow="purple">
          <h3 className="font-bold text-lg mb-4">Join a group</h3>
          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1">Invite Code</label>
              <input 
                type="text" 
                value={joinCode}
                onChange={e => setJoinCode(e.target.value)}
                placeholder="Enter 6-digit code" 
                autoFocus
                className="uppercase"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => setIsJoining(false)}
                className="px-4 py-2 text-sm text-muted hover:text-soft-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={!joinCode.trim()}
                className="px-6 py-2 bg-purple text-white rounded-lg text-sm font-medium hover:bg-purple/90 transition-colors disabled:opacity-50"
              >
                Join Group
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <EmptyState 
          title="Your taste has no audience yet." 
          description="Create a group or join one to start recommending and judging."
          icon="👥"
          action={
            <button 
              onClick={() => setIsCreating(true)}
              className="px-6 py-3 bg-electric text-white font-medium rounded-xl hover:bg-electric/90 transition-colors btn-press mt-4"
            >
              Create a group
            </button>
          }
        />
      )}
    </div>
  );
}
