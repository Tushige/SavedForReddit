import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../utils/auth';

function SecureRoute(props) {
  const { component: Component, path, location } = props;
  var componentToRender;
  if (location.search) {
    let query = new URLSearchParams(location.search);
    let code = query.get('code');
    localStorage.setItem('code', code);
  }
  if (isAuthUser()) {
    componentToRender = (
      <Route
        path={path}
        component={Component}
      />
    );
  } else {
    console.log('unauthorized path')
    componentToRender = <Redirect to='/'></Redirect>;
  }

  return componentToRender;
}

export default SecureRoute;
