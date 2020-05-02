import React, { createContext, useContext, useState, useEffect } from 'react';
import history from '../routes/history.routes';

import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, SetAuthenticated] = useState(false);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));

    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      SetAuthenticated(true);
      SetLoading(false);

      // history.push('/');
    } else {
      SetLoading(false);
      SetAuthenticated(false);
    }
  }, []);

  async function handleLogin() {
    const { data } = await api.post('/authenticate');

    localStorage.setItem('token', JSON.stringify(data.token));

    api.defaults.headers['Authorization'] = `Bearer ${data.token}`;

    SetAuthenticated(true);

    history.push('/');
  }

  async function handleLogOut() {
    localStorage.clear();

    SetAuthenticated(false);

    history.push('/login');
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, handleLogin, handleLogOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const { authenticated, handleLogin, loading, handleLogOut } = useContext(
    AuthContext
  );

  return { authenticated, handleLogin, loading, handleLogOut };
}

export { AuthProvider, useAuth };
