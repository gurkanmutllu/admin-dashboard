// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { ROUTES } from '@/constants/routes';
import { STRINGS } from '@/constants/Strings';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      router.push(ROUTES.USERS);
    } catch (error) {
      alert((error as Error).message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder={STRINGS.USERNAME_PLACEHOLDER}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="password"
        placeholder={STRINGS.PASSWORD_PLACEHOLDER}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        {STRINGS.LOGIN_BUTTON}
      </button>
    </form>
  );
};

export default LoginPage;
