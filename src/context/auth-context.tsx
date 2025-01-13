import React, { createContext, useContext, useState, useEffect } from "react";
import firebaseAuthAdapter from "@/adapters/firebase-auth-adapter"; // Update the path if needed
import { User } from "firebase/auth";

// Define the context interface
interface AuthContextType {
  user: User | null;
  loginWithEmailPassword: (email: string, password: string) => Promise<User>;
  registerWithEmailPassword: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  loginWithApple: () => Promise<User>;
  sendPasswordReset: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Subscribe to user changes
  useEffect(() => {
    const unsubscribe = firebaseAuthAdapter.onAuthStateChange((firebaseUser) => {
      setUser(firebaseUser);
    });

    // Cleanup subscription on component unmount
    // return () => unsubscribe();
  }, []);

  // Provide auth methods and user state
  const value: AuthContextType = {
    user,
    loginWithEmailPassword: firebaseAuthAdapter.loginWithEmailPassword,
    registerWithEmailPassword: firebaseAuthAdapter.registerWithEmailPassword,
    loginWithGoogle: firebaseAuthAdapter.loginWithGoogle,
    loginWithApple: firebaseAuthAdapter.loginWithApple,
    sendPasswordReset: firebaseAuthAdapter.sendPasswordReset,
    logout: firebaseAuthAdapter.logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
