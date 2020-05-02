import React from 'react';

import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { authenticated, handleLogin } = useAuth();

  console.log('Login', authenticated);

  return (
    <>
      <h1>Faça seu login</h1>
      <button onClick={() => handleLogin()}>Logar</button>
    </>
  );
}
