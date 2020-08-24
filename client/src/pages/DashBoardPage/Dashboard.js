import React, { useContext, useEffect } from 'react';

import UserContext from '../../context/user/UserContext';

const Dashboard = () => {
  const { user, loadUser, logout } = useContext(UserContext);
  const foo = user ? user.name : 'no user';

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <h1>{foo}</h1>
      <button onClick={(e) => console.log('look')}>Logout</button>
    </div>
  );
};

export default Dashboard;
