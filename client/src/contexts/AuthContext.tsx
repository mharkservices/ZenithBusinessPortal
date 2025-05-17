import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    
    setIsAuthenticated(loggedIn);
    setUserRole(role);
  }, []);

  const login = (role: string) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};