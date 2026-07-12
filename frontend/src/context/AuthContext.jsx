import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ecosphere_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role) => {
    const userData = {
      role: role || 'admin',
      name: role === 'admin' ? 'Neha Sharma' : 'Amit Kumar',
      email: role === 'admin' ? 'admin@ecosphere.com' : 'employee@ecosphere.com',
      department: role === 'admin' ? 'Sustainability Board' : 'IT Operations',
      avatarUrl: role === 'admin' 
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    };
    setUser(userData);
    localStorage.setItem('ecosphere_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecosphere_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
