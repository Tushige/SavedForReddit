import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthUser } from '../utils/auth';

function SecureRoute(props) {
  const { component: Component, path } = props;
  var componentToRender;
  if (isAuthUser()) {
    componentToRender = (
      <Route
        path={path}
        render={() => {
          return (
            <Component />
          );
        }}
      />
    );
  } else {
      console.log('unauthorized path')
    componentToRender = <Redirect to="/"></Redirect>;
  }

  return componentToRender;
}

export default SecureRoute;
