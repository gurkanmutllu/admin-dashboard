import { useState, useEffect } from 'react';
import { EventDto } from '@/dtos/event/EventDto';
import { eventService } from '@/services/EventService';

interface Stats {
  totalPurchases: number;
  totalDownloads: number;
  totalSignIns: number;
  dailyEarnings: { date: string; earnings: number }[];
}

export const useStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [events, setEvents] = useState<EventDto[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const calculateStats = (events: EventDto[]) => {
    const totalPurchases = events.filter(e => e.eventName === 'pay').length;
    const totalDownloads = events.filter(e => e.eventName === 'download').length;
    const totalSignIns = events.filter(e => e.eventName === 'signin').length;

    const dailyEarningsMap: { [date: string]: number } = {};
    events
      .filter(e => e.eventName === 'pay')
      .forEach(e => {
        const date = new Date(e.eventDate).toISOString().split('T')[0];
        if (e.amount) {
          dailyEarningsMap[date] = (dailyEarningsMap[date] || 0) + e.amount;
        }
      });

    const dailyEarnings = Object.entries(dailyEarningsMap)
      .map(([date, earnings]) => ({ date, earnings }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalPurchases,
      totalDownloads,
      totalSignIns,
      dailyEarnings
    };
  };

  const loadStats = async () => {
    try {
      const fetchedEvents = await eventService.fetchEvents();
      setEvents(fetchedEvents);
      setStats(calculateStats(fetchedEvents));
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return { stats, events };
}; 