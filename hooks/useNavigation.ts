import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export const useNavigation = () => {
  const router = useRouter();

  return {
    navigateToStats: () => router.push(ROUTES.STATS),
    navigateToLogin: () => router.push(ROUTES.LOGIN),
    navigateToUsers: () => router.push(ROUTES.USERS)
  };
}; 