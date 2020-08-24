import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from './context/user/UserProvider';
import PrivateRoute from './hoc/AuthorizationGuard/PrivateRoute';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import DashBoard from './pages/DashBoardPage/Dashboard';

function App() {
  return (
    <UserProvider>
      <Router>
        <Fragment>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <PrivateRoute path='/' component={DashBoard} />
          </Switch>
        </Fragment>
      </Router>
    </UserProvider>
  );
}

export default App;
