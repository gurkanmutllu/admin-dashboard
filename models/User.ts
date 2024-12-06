export default class User {
    username: string;
    password: string;
    name: string;
    createdDate: string; // ISO 8601 formatında tarih
    accessLevel: number; // Kullanıcının yetki seviyesi
  
    constructor(username: string, password: string, name: string, createdDate: string, accessLevel: number) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.createdDate = createdDate;
        this.accessLevel = accessLevel;
    }
  }
  