// dtos/UserDTO.ts
export interface UserDto {
    username: string;
    password: string;
    name: string;
    createdDate: string;
    accessLevel: number; // adminLevel olarak da kullanılabilir
  }
  