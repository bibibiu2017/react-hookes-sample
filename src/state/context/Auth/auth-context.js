import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: (username, password) => {},
});

export default AuthContext;
