// services/UserService.ts
import { BaseService } from './BaseService';
import { UserDto } from '@/dtos/user/UserDto';
import { STRINGS } from '@/constants/Strings';
import { ADMIN_LEVELS } from '@/constants/AdminLevels';

class UserService extends BaseService<UserDto> {
  protected endpoint = 'https://raw.githubusercontent.com/papcorns/test-json/refs/heads/main/user_list.json';

  async fetchUsers(): Promise<UserDto[]> {
    return this.fetchData();
  }

  async authenticate(auth: { username: string; password: string }): Promise<UserDto | null> {
    const users = await this.fetchUsers();
    const authenticatedUser = users.find(
      (user) => 
        user.username === auth.username && 
        user.password === auth.password
    );
    if (!authenticatedUser) {
      throw new Error(STRINGS.AUTH_ERRORS.INVALID_CREDENTIALS);
    }
    if (authenticatedUser.accessLevel < ADMIN_LEVELS.HIGH) {
      throw new Error(STRINGS.AUTH_ERRORS.UNAUTHORIZED);
    }
    
    return authenticatedUser;
  }

  async verifyUser(user: UserDto): Promise<boolean> {
    const users = await this.fetchUsers();
    return users.some(
      (u) => u.username === user.username && u.accessLevel === user.accessLevel
    );
  }
}

export const userService = new UserService();

