import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

const login = async (email, password) => {
  const response = await apiLogin(email, password);
  setUser(response.data.user);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
};

const register = async (username, email, password) => {
  const response = await apiRegister(username, email, password);
  setUser(response.data.user);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
};

const logout = () => {
  setUser(null);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

return (
  
    {children}
  
);
};