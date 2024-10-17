export interface User {
  username: string;
  role: string;
  permissions: string[];
}

export interface StoredUserIntoLocalStorage {
  user: User;
  token: string;
  expiresIn: number;
}
