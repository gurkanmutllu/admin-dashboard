import { useState, useEffect } from 'react';
import { userService } from '@/services/UserService';
import { UserDto } from '@/dtos/user/UserDto';

export const useUsers = () => {
  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.fetchUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  return { users };
}; 