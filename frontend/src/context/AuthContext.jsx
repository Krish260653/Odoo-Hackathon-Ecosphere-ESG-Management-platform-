import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profiles table details linked to user ID
  const fetchUserProfile = async (userId, email, userMetadata) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*, departments(name)')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
      }

      const role = profile?.role || userMetadata?.role || 'employee';
      return {
        id: userId,
        email: email,
        name: profile?.name || userMetadata?.name || 'User',
        role: role,
        department: profile?.departments?.name || userMetadata?.department || 'IT Operations',
        department_id: profile?.department_id,
        xp: profile?.xp ?? 0,
        avatarUrl: role === 'admin' 
          ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      };
    } catch (e) {
      console.error('Profile parsing exception:', e);
      return null;
    }
  };

  const handleSession = async (session) => {
    if (session?.user) {
      const userData = await fetchUserProfile(
        session.user.id, 
        session.user.email, 
        session.user.user_metadata
      );
      setUser(userData);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    // 1. Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session);
    });

    // 2. Subscribe to auth state updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // SignUp wrapper
  const signUp = async (email, password, name, role, departmentName = 'IT Operations') => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
          department: departmentName
        }
      }
    });

    if (error) {
      setLoading(false);
      throw error;
    }
    return data;
  };

  // SignIn wrapper
  const signIn = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setLoading(false);
      throw error;
    }
    return data;
  };

  // SignOut wrapper
  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLoading(false);
      throw error;
    }
    setUser(null);
    setLoading(false);
  };

  // Backwards compatibility with login(role) helper for demo
  const login = async (role) => {
    // For demo purposes, we log in using seed credentials
    const email = role === 'admin' ? 'admin@ecosphere.com' : 'employee@ecosphere.com';
    const password = 'password123';
    return signIn(email, password);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, logout, login }}>
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

export default AuthContext;
