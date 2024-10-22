'use client';

import { createContext, ReactNode, useContext } from 'react';
import { User } from '@/src/types';

const AuthContext = createContext<User | null>(null);

interface AuthProviderProps {
  value: User | null;
  children: ReactNode;
}

export const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
