import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (username, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    console.log(username, password);
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const ctx = {
    isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
