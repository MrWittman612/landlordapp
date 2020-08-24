import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../context/user/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useContext(UserContext);
  console.log(!isAuthenticated);
  console.log(!loading);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
