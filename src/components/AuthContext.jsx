import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Rehydrate authentication state when the provider mounts
  useEffect(() => {
    const persistedUser = localStorage.getItem("user");
    const persistedLogin = localStorage.getItem("isLoggedIn");

    if (persistedLogin === "true" && persistedUser && persistedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(persistedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error parsing persisted user:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
      }
    }
  }, []);

  // Update local storage whenever the user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Update local storage whenever isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);
  console.log("isLoggedIn", isLoggedIn);
  const login = (userData) => {
    const actualUserData = userData || {};
    setUser(actualUserData);
    setIsLoggedIn(true);
    if (actualUserData.token) {
      localStorage.setItem("token", actualUserData.token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
