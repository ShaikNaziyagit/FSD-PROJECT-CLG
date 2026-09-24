import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('campusos_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('campusos_token') || null);
  const [loading, setLoading] = useState(true);

  // Sync token in localStorage & verify session
  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.success && res.data) {
            setUser(res.data);
            localStorage.setItem('campusos_user', JSON.stringify(res.data));
          }
        } catch (err) {
          console.warn('[AuthContext] Session expired or invalid, logging out.');
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.success && res.data) {
      const { token: userToken, ...userData } = res.data;
      setToken(userToken);
      setUser(userData);
      localStorage.setItem('campusos_token', userToken);
      localStorage.setItem('campusos_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.message || 'Login failed.');
  };

  const register = async (formData) => {
    const res = await api.post('/auth/register', formData);
    if (res.success && res.data) {
      const { token: userToken, ...userData } = res.data;
      setToken(userToken);
      setUser(userData);
      localStorage.setItem('campusos_token', userToken);
      localStorage.setItem('campusos_user', JSON.stringify(userData));
      return userData;
    }
    throw new Error(res.message || 'Registration failed.');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('campusos_token');
    localStorage.removeItem('campusos_user');
  };

  const updateUserProfile = async (updatedFields) => {
    const res = await api.put('/auth/profile', updatedFields);
    if (res.success && res.data) {
      setUser((prev) => ({ ...prev, ...res.data }));
      localStorage.setItem('campusos_user', JSON.stringify({ ...user, ...res.data }));
      return res.data;
    }
    throw new Error(res.message || 'Profile update failed.');
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await api.get('/auth/me');
      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('campusos_user', JSON.stringify(res.data));
      }
    } catch (e) {
      console.error('Failed to refresh user', e);
    }
  };

  const isStudent = user?.role === 'student';
  const isFaculty = user?.role === 'faculty';
  const isClubAdmin = user?.role === 'club_admin';
  const isAdmin = user?.role === 'super_admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && !!token,
        isStudent,
        isFaculty,
        isClubAdmin,
        isAdmin,
        login,
        register,
        logout,
        updateUserProfile,
        refreshUser,
      }}
    >
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
