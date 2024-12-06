// app/page.tsx
'use client';

import { useLoginForm } from '@/hooks/useLoginForm';
import { STRINGS } from '@/constants/Strings';

const LoginForm = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit
  } = useLoginForm();

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
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        {STRINGS.LOGIN_BUTTON}
      </button>
    </form>
  );
};

export default LoginForm;
