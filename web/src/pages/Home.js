import React from 'react';

import history from '../routes/history.routes';

export default function Home() {
  return (
    <>
      {' '}
      <h1>Home</h1>
      <button onClick={() => history.push('users')}>Ir para users</button>
    </>
  );
}
