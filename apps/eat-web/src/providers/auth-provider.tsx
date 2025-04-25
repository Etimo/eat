import { useNavigate } from 'react-router';
import { AuthContext, User } from '../contexts';
import { useEffect, useState } from 'react';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const clearAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('http://localhost:3101/auth/user', {
        credentials: 'include',
      });
      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
        setIsAuthenticated(true);
        setIsAdmin(user.role === 'admin');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    // Redirect to Google login
    window.location.href = 'http://localhost:3101/auth/google';
  };

  const logout = async () => {
    await fetch('http://localhost:3101/auth/logout', {
      credentials: 'include',
    });
    clearAuth();
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        logout,
        isLoading,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
