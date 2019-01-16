import React from 'react';
import Auth from '../../lib/Auth';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = (props) => {
  if(!Auth.isAuthenticated()) {
    return(
      <Redirect to="/login" />
    );
  }
  return (
    <Route {...props} />
  );
};

export default SecureRoute;

//  <Route path="/films/:id/edit" component={FilmsEdit} />

//exact={props.exact} path={props.path} component={props.component} is the same as {...props}
