import { useState, useEffect } from 'react';
import { UserDto } from '@/dtos/user/UserDto';
import { userService } from '@/services/UserService';
import { STRINGS } from '@/constants/Strings';

export const useAuth = () => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyUserSession();
  }, []);

  const verifyUserSession = async () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setLoading(false);
      return;
    }

    try {
      const parsedUser: UserDto = JSON.parse(storedUser);
      const validUser = await userService.verifyUser(parsedUser);

      if (validUser) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
    } catch (error) {
      console.error(STRINGS.AUTH_ERRORS.SESSION_VERIFY_ERROR, error);
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const user = await userService.authenticate({ username, password });
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        throw new Error(STRINGS.AUTH_ERRORS.INVALID_CREDENTIALS);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setLoading(false);
  };

  return { user, loading, login, logout };
}; 