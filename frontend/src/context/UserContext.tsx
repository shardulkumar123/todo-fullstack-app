"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (token) {
      // Decode token if needed and set user data
      const userData = JSON.parse(atob(token.split("=")[1].split(".")[1]));
      setUser(userData);
    }

    setIsLoading(false);
  }, []);

  const login = (data: User) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    document.cookie = `token=${data.token}; path=/;`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  return (
    <UserContext.Provider value={{ user, isLoading, login, logout }}>
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
