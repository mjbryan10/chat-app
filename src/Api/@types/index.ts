export interface User {
  id: number;
  name: string;
}

export interface LoginResponse extends User {
  isAuthenticated: boolean;
}