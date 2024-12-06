// app/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { userService } from '@/services/UserService';
import { UserDto } from '@/dtos/user/UserDto';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { STRINGS } from '@/constants/Strings';


const UsersList = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.fetchUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  const { logout } = useAuth();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logout();
      router.push(ROUTES.LOGIN);
    } catch (error) {
      alert((error as Error).message);
    } 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      router.push(ROUTES.STATS);
    } catch (error) {
      alert((error as Error).message);
    } 
  };

  // Tarih formatlama yardımcı fonksiyonu ekleyelim
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div className="flex justify-between mb-4">
        <form onSubmit={handleLogout}>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {STRINGS.LOGOUT_BUTTON}
          </button>
        </form>
        <form onSubmit={handleSubmit}>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            {STRINGS.STATS_BUTTON}
          </button>
        </form>
      </div>
      <h1 className='text-2xl font-bold' style={{ textAlign: 'center', color: '#333' }}>
        {STRINGS.USER_LIST_TITLE}
      </h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{STRINGS.USER_LIST_HEADERS.USERNAME}</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{STRINGS.USER_LIST_HEADERS.NAME}</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{STRINGS.USER_LIST_HEADERS.CREATED_DATE}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.username} style={{ textAlign: 'center' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.username}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{formatDate(user.createdDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  
};

export default UsersList;
