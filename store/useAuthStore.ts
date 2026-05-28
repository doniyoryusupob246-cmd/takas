import { create } from 'zustand';
import Cookies from 'js-cookie';

interface User {
  id: number;
  fullName: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  logOut: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (userData, token) => {
    Cookies.set('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true });
  },

  logOut: () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const token = Cookies.get('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      set({ user: JSON.parse(savedUser), isAuthenticated: true });
    }
  },
}));
