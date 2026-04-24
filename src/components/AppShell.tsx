'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/context';

const navItems = [
  { name: 'Home', path: '/home', icon: '🏠' },
  { name: 'Groups', path: '/groups', icon: '👥' },
  { name: 'Recommend', path: '/discover', icon: '✨', isPrimary: true },
  { name: 'Leaderboard', path: '/leaderboard', icon: '🏆' },
  { name: 'Profile', path: '/profile', icon: '👤' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated } = useApp();

  // Hide nav on auth/landing pages
  if (!isAuthenticated || pathname === '/' || pathname === '/login' || pathname === '/onboarding') {
    return <main className="min-h-full flex flex-col">{children}</main>;
  }

  return (
    <div className="min-h-full flex flex-col md:flex-row pb-20 md:pb-0">
      {/* Desktop Sidebar Nav */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-ink p-6 sticky top-0 h-screen overflow-y-auto z-40">
        <div className="mb-10 px-2">
          <Link href="/home" className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-purple flex items-center justify-center text-white text-sm">R</span>
            Rec'd
          </Link>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.path);
            
            if (item.isPrimary) {
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all my-6 bg-gradient-to-r from-electric to-purple text-white shadow-lg hover:shadow-electric/20 btn-press"
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              );
            }
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all btn-press ${
                  isActive 
                    ? 'bg-surface-hover text-soft-white border border-border/50' 
                    : 'text-muted hover:bg-surface hover:text-soft-white border border-transparent'
                }`}
              >
                <span className={`text-xl ${isActive ? 'opacity-100' : 'opacity-70 grayscale'}`}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-border">
          <div className="bg-surface rounded-xl p-4 border border-border/50">
            <p className="text-xs text-muted mb-2 font-medium">Taste Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-sm font-bold text-soft-white">Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 max-w-4xl mx-auto w-full px-4 sm:px-6 md:px-8 py-8">
        <div className="page-enter">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-ink/90 backdrop-blur-xl z-50 px-2 pb-safe pt-2 flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          
          if (item.isPrimary) {
            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative -top-5 flex flex-col items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-electric to-purple text-white shadow-[0_4px_20px_rgba(37,99,255,0.4)] btn-press"
              >
                <span className="text-2xl">{item.icon}</span>
              </Link>
            );
          }
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-all btn-press ${
                isActive ? 'text-electric' : 'text-muted hover:text-soft-white'
              }`}
            >
              <span className={`text-xl mb-1 ${!isActive && 'opacity-60 grayscale'}`}>{item.icon}</span>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
