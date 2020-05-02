import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';

import history from './history.routes';

import { useAuth } from '../contexts/AuthContext';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Users from '../pages/Users';
import NotFound from '../pages/NotFound';

function Loading() {
  return <h1>Carregando... </h1>;
}

function CusomRoutes({ isPrivate, isPublic, ...rest }) {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to='/login' />;
  }

  if (isPublic && authenticated) {
    return <Redirect to='/' />;
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <CusomRoutes isPrivate exact component={Home} path='/' />
          <CusomRoutes isPublic component={Login} path='/login' />
          <CusomRoutes isPrivate component={Users} path='/users' />
          <CusomRoutes isPublic component={Loading} path='/loading' />
          <CusomRoutes component={NotFound} path='*' />
        </Switch>
      </Router>
    </>
  );
}
