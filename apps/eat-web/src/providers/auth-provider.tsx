import { useNavigate } from 'react-router';
import { AuthContext, User } from '../contexts';
import { useEffect, useState } from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
      const response = await fetch(`${backendUrl}/auth/user`, {
        credentials: 'include',
      });
      if (response.ok) {
        const { user } = await response.json();
        setUser(user);
        setIsAuthenticated(true);
        setIsAdmin(user.role === 'admin');
        navigate('/');
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
    window.location.href = `${backendUrl}/auth/google`;
  };

  const logout = async () => {
    await fetch(`${backendUrl}/auth/logout`, {
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
