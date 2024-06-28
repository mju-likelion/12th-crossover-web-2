import React, { createContext, useState, useContext, Children } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [islogined, setIsLogined] = useState(false);

  const logined = () => {
    setIsLogined(true);
  };

  const logouted = () => {
    setIsLogined(false);
  };

  return (
    <AuthContext.Provider value={{ islogined, logined, logouted }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
