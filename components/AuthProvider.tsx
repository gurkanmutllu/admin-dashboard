'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UserDto } from '@/dtos/user/UserDto';
import { userService } from '@/services/UserService';
import { STRINGS } from '@/constants/Strings';

interface AuthContextType {
  user: UserDto | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    verifyUserSession();
  }, []);

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

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
