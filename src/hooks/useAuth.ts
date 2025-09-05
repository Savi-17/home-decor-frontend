
import { useState } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email: string, password: string) => {
    // Simulate login - in real app, this would be an API call
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email: email
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const register = (name: string, email: string, password: string) => {
    // Simulate registration - in real app, this would be an API call
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    isLoggedIn: !!user,
    login,
    register,
    logout
  };
}
