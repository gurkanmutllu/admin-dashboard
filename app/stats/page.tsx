'use client';

import { useEffect } from 'react';
import { useAuth } from "@/components/AuthProvider";
import { ROUTES } from "@/constants/routes";
import LoadingSpinner from '@/components/LoadingSpinner';
import { renderAuthContent } from "@/components/RenderAuthContent";
import StatsChart from '@/components/StatsChart';
import { useStats } from '@/hooks/useStats';
import { useNavigation } from '@/hooks/useNavigation';

const StatsPage = () => {
  const { user, loading } = useAuth();
  const { stats, events } = useStats();
  const { navigateToUsers, navigateToLogin } = useNavigation();

  useEffect(() => {
    if (!loading && !user) {
      navigateToLogin();
    }
  }, [user, loading, navigateToLogin]);

  if (user && !stats) {
    return <LoadingSpinner />;
  }

  return renderAuthContent(
    loading,
    user,
    <div className="flex flex-col items-center p-8">
      {stats && <StatsChart 
        stats={stats} 
        events={events} 
        onBackClick={navigateToUsers} 
      />}
    </div>
  );
};

export default StatsPage;
