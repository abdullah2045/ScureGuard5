import React, { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export function AuthProvider({ children }) {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    nama: "",
    email: "",
    phone: "",
  });

  // Function to login/register with user data
  const login = (userInfo) => {
    setUserData({
      isLoggedIn: true,
      ...userInfo,
    });
  };

  // Function to logout
  const logout = () => {
    setUserData({
      isLoggedIn: false,
      nama: "",
      email: "",
      phone: "",
    });
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
