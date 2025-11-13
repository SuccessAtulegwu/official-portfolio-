import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface HistoryItem {
  id: string;
  url: string;
  platform: string;
  title: string;
  timestamp: number;
}

interface Stats {
  totalDownloads: number;
  thisWeek: number;
  thisMonth: number;
  byPlatform: { facebook: number; instagram: number };
  byMonth: Record<string, number>;
  streak: number;
  averagePerDay: number;
  mostActiveDay: string;
  firstDownload: number | null;
}

export function useStats() {
  const [history] = useLocalStorage<HistoryItem[]>('downloadHistory', []);

  const stats = useMemo(() => {
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    const weekMs = 7 * dayMs;
    const monthMs = 30 * dayMs;

    // Calculate basic stats
    const totalDownloads = history.length;
    const thisWeek = history.filter(h => now - h.timestamp < weekMs).length;
    const thisMonth = history.filter(h => now - h.timestamp < monthMs).length;

    // By platform
    const byPlatform = history.reduce(
      (acc, h) => {
        if (h.platform === 'facebook') acc.facebook++;
        else if (h.platform === 'instagram') acc.instagram++;
        return acc;
      },
      { facebook: 0, instagram: 0 }
    );

    // By month
    const byMonth: Record<string, number> = {};
    history.forEach(h => {
      const date = new Date(h.timestamp);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      byMonth[key] = (byMonth[key] || 0) + 1;
    });

    // Calculate streak
    let streak = 0;
    const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const item of sortedHistory) {
      const itemDate = new Date(item.timestamp);
      itemDate.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor((currentDate.getTime() - itemDate.getTime()) / dayMs);
      
      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff > streak) {
        break;
      }
    }

    // Average per day
    const firstDownload = history.length > 0 ? Math.min(...history.map(h => h.timestamp)) : null;
    const daysSinceFirst = firstDownload ? Math.max(1, Math.floor((now - firstDownload) / dayMs)) : 1;
    const averagePerDay = totalDownloads / daysSinceFirst;

    // Most active day
    const dayCount: Record<string, number> = {};
    history.forEach(h => {
      const date = new Date(h.timestamp);
      const dayKey = date.toLocaleDateString();
      dayCount[dayKey] = (dayCount[dayKey] || 0) + 1;
    });
    const mostActiveDay = Object.entries(dayCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      totalDownloads,
      thisWeek,
      thisMonth,
      byPlatform,
      byMonth,
      streak,
      averagePerDay: Math.round(averagePerDay * 10) / 10,
      mostActiveDay,
      firstDownload,
    };
  }, [history]);

  return stats;
}







