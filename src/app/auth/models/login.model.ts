import { User } from "./user.model";

export interface Login {
  token: string;
  user: User;
  expirationDate: number;
}

export interface LoginForm {
  username: string;
  password: string;
  role: string;
  keepLogin: boolean;
}
