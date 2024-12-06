'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/components/AuthProvider";
import { eventService } from '@/services/EventService';
import { ROUTES } from "@/constants/routes";
import LoadingSpinner from '@/components/LoadingSpinner';
import { renderAuthContent } from "@/components/RenderAuthContent";
import StatsChart from '@/components/StatsChart';
import { EventDto } from '@/dtos/event/EventDto';

interface Stats {
  totalPurchases: number;
  totalDownloads: number;
  totalSignIns: number;
  dailyEarnings: { date: string; earnings: number }[];
}

const StatsPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [events, setEvents] = useState<EventDto[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace(ROUTES.LOGIN);
    }
  }, [user, loading, router]);

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      const fetchedEvents = await eventService.fetchEvents();
      setEvents(fetchedEvents);

      const now = new Date();
      const last90Days = new Date();
      last90Days.setDate(now.getDate() - 90);

      const totalPurchases = fetchedEvents.filter((e) => e.eventName === 'pay').length;
      const totalDownloads = fetchedEvents.filter((e) => e.eventName === 'download').length;
      const totalSignIns = fetchedEvents.filter((e) => e.eventName === 'signin').length;

      const dailyEarningsMap: { [date: string]: number } = {};
      fetchedEvents
        .filter((e) => e.eventName === 'pay' && new Date(e.eventDate) >= last90Days)
        .forEach((e) => {
          const date = new Date(e.eventDate).toISOString().split('T')[0];
          if (e.amount) {
            dailyEarningsMap[date] = (dailyEarningsMap[date] || 0) + e.amount;
          }
        });

      const dailyEarnings = Object.entries(dailyEarningsMap)
        .map(([date, earnings]) => ({ date, earnings }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setStats({ totalPurchases, totalDownloads, totalSignIns, dailyEarnings });
    };

    if (user) {
      loadStats();
    }
  }, [user]);

  const handleBackToUsers = () => {
    router.push(ROUTES.USERS);
  };

  if (user && !stats) {
    return <LoadingSpinner />;
  }

  return renderAuthContent(
    loading,
    user,
    <div className="flex flex-col items-center p-8">
      {stats && <StatsChart stats={stats} onBackClick={handleBackToUsers} events={events} />}
    </div>
  );
};

export default StatsPage;
