import React from 'react';
import { Trophy, Medal, Crown, Star, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  isCurrentUser?: boolean;
}

import api from '@/lib/api';

const initialLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Emma Watson', avatar: '👸', points: 2450, streak: 15 },
  { rank: 2, name: 'Noah Smith', avatar: '🧑‍🎓', points: 2280, streak: 12 },
  { rank: 3, name: 'Olivia Brown', avatar: '👧', points: 2150, streak: 10 },
  { rank: 4, name: 'Alex (You)', avatar: '🦸', points: 1890, streak: 7, isCurrentUser: true },
  { rank: 5, name: 'Liam Johnson', avatar: '👦', points: 1750, streak: 8 },
  { rank: 6, name: 'Sophia Davis', avatar: '👩‍🦱', points: 1620, streak: 5 },
  { rank: 7, name: 'Mason Wilson', avatar: '🧒', points: 1480, streak: 6 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-student-yellow fill-student-yellow" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />;
    default:
      return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{rank}</span>;
  }
};

const getRankBackground = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-student-yellow/20 to-student-orange/20 border-student-yellow/30';
    case 2:
      return 'bg-gradient-to-r from-gray-200/20 to-gray-300/20 border-gray-300/30';
    case 3:
      return 'bg-gradient-to-r from-amber-200/20 to-amber-300/20 border-amber-300/30';
    default:
      return 'bg-card border-border';
  }
};

export const Leaderboard: React.FC = () => {
  const [data, setData] = React.useState<LeaderboardEntry[]>(initialLeaderboard);

  React.useEffect(() => {
    (async () => {
      const remote = await api.getLeaderboard(7);
      if (remote && Array.isArray(remote)) {
        setData(remote.map((r: any, i: number) => ({ rank: i + 1, ...r })));
      }
    })();
  }, []);

  return (
    <div className="bg-card rounded-3xl border border-border p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-student-yellow to-student-orange flex items-center justify-center">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">Leaderboard</h3>
          <p className="text-sm text-muted-foreground">This Week's Top Learners</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-2 mb-6 px-4">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <span className="text-3xl mb-2">{leaderboardData[1].avatar}</span>
          <div className="w-20 h-16 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-600">2</span>
          </div>
          <p className="text-xs font-medium text-muted-foreground mt-1 truncate w-20 text-center">
            {leaderboardData[1].name.split(' ')[0]}
          </p>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center -mt-4">
          <Crown className="w-8 h-8 text-student-yellow fill-student-yellow mb-1 animate-bounce-gentle" />
          <span className="text-4xl mb-2">{leaderboardData[0].avatar}</span>
          <div className="w-24 h-24 bg-gradient-to-t from-student-yellow to-student-orange rounded-t-lg flex items-center justify-center">
            <span className="text-3xl font-bold text-white">1</span>
          </div>
          <p className="text-sm font-bold text-foreground mt-1 truncate w-24 text-center">
            {leaderboardData[0].name.split(' ')[0]}
          </p>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <span className="text-3xl mb-2">{leaderboardData[2].avatar}</span>
          <div className="w-20 h-12 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <p className="text-xs font-medium text-muted-foreground mt-1 truncate w-20 text-center">
            {leaderboardData[2].name.split(' ')[0]}
          </p>
        </div>
      </div>

      {/* Full List */}
      <div className="space-y-2">
        {data.map((entry) => (
          <div
            key={entry.rank}
            className={cn(
              'flex items-center gap-4 p-3 rounded-xl border transition-all hover:scale-[1.02]',
              getRankBackground(entry.rank),
              entry.isCurrentUser && 'ring-2 ring-student-blue/50'
            )}
          >
            {/* Rank */}
            <div className="w-8 flex justify-center">
              {getRankIcon(entry.rank)}
            </div>

            {/* Avatar */}
            <span className="text-2xl">{entry.avatar}</span>

            {/* Name & Points */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                'font-display font-semibold text-foreground truncate',
                entry.isCurrentUser && 'text-student-blue'
              )}>
                {entry.name}
                {entry.isCurrentUser && (
                  <span className="ml-2 text-xs bg-student-blue/20 text-student-blue px-2 py-0.5 rounded-full">
                    You
                  </span>
                )}
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-student-yellow fill-student-yellow" />
                  {entry.points.toLocaleString()} pts
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-student-green" />
                  {entry.streak} day streak
                </span>
              </div>
            </div>

            {/* Points Badge */}
            <div className={cn(
              'px-3 py-1 rounded-full text-sm font-bold',
              entry.rank === 1 ? 'bg-student-yellow/20 text-student-yellow' :
              entry.rank === 2 ? 'bg-gray-200 text-gray-600' :
              entry.rank === 3 ? 'bg-amber-100 text-amber-700' :
              'bg-muted text-muted-foreground'
            )}>
              #{entry.rank}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-4 py-3 text-center text-student-blue font-semibold hover:bg-student-blue/5 rounded-xl transition-colors">
        View Full Leaderboard →
      </button>
    </div>
  );
};
