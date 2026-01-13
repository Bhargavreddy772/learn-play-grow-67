import React, { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

type Leader = {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  isCurrentUser?: boolean;
};

export const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // backend returns: { data: [...] }
        const res = await apiGet<{ data: Leader[] }>("/api/leaderboard?limit=7");
        setLeaders(res.data || []);
      } catch (err) {
        console.error("Failed to load leaderboard", err);
        setLeaders([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4">Loading leaderboard...</div>;

  return (
    <div className="bg-card p-6 rounded-xl shadow-lg">
      <h2 className="font-display text-xl font-bold mb-4">🏆 Leaderboard</h2>

      <div className="space-y-3">
        {leaders.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center justify-between p-3 rounded-lg ${
              player.isCurrentUser ? "bg-yellow-100" : "bg-muted"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold w-6">{player.rank}</span>
              <span className="text-xl">{player.avatar}</span>
              <div>
                <p className="font-semibold">{player.name}</p>
                <p className="text-sm text-muted-foreground">
                  🔥 Streak: {player.streak}
                </p>
              </div>
            </div>
            <span className="font-bold">{player.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};
