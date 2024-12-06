import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useNavigation } from './useNavigation';
import { useErrorHandler } from './useErrorHandler';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { navigateToUsers } = useNavigation();
  const { handleError } = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigateToUsers();
    } catch (error) {
      handleError(error);
    }
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit
  };
}; 