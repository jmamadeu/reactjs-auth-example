import React, { useEffect, useState } from 'react';

import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Users() {
  const [users, setUsers] = useState([]);
  const { handleLogOut } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/users');

      setUsers(data);
    })();
  });

  return (
    <>
      <h1>Users</h1>
      {users.map((user) => (
        <p key={user.id}>
          <strong>{user.name}</strong>
          <strong>{user.website}</strong>
        </p>
      ))}
      <button onClick={() => handleLogOut()}>Log Out</button>
    </>
  );
}
