import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import {
  loginUser,
  logoutUser,
  registerUser,
  User,
} from "../store/slices/authSlice";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "patient" | "provider";
  }) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (email: string, password: string) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (result.user.role === "patient") {
        navigate("/patient-portal/dashboard");
      } else if (result.user.role === "provider") {
        navigate("/provider-portal/dashboard");
      }
    } catch (error) {
      // Error is handled by the Redux slice
    }
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      // Error is handled by the Redux slice
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "patient" | "provider";
  }) => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      if (result.user.role === "patient") {
        navigate("/patient-portal/dashboard");
      } else if (result.user.role === "provider") {
        navigate("/provider-portal/dashboard");
      }
    } catch (error) {
      // Error is handled by the Redux slice
    }
  };

  const clearError = () => {
    // This would dispatch a clearError action if needed
  };

  // Check for existing authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData && !isAuthenticated) {
      // Auto-login if token exists
      const user = JSON.parse(userData);
      if (user.role === "patient") {
        navigate("/patient-portal/dashboard");
      } else if (user.role === "provider") {
        navigate("/provider-portal/dashboard");
      }
    }
  }, [isAuthenticated, navigate]);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
