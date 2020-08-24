import React, { useReducer } from 'react';
import UserContext from './UserContext';
import UserReducer from './UserReducer';
import Axios from 'axios';
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  CLEAR_ERRORS,
  AUTH_ERROR,
  USER_LOADED,
} from '../types';

const setContextAuthToken = (token) => {
  if (token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete Axios.defaults.headers.common['Authorization'];
  }
};

export const UserProvider = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const loadUser = async () => {
    setContextAuthToken(localStorage.token);

    try {
      const result = await Axios.get('/api/user');
      console.log('R:', result.data);
      dispatch({ type: USER_LOADED, payload: result.data });
    } catch (error) {
      console.error(error);
      dispatch({ type: AUTH_ERROR });
    }
  };

  const registerNewUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const result = await Axios.post('/api/register', formData, config);
      dispatch({ type: REGISTER, payload: result.data });
      loadUser();
    } catch (error) {
      console.error('registerNewUser Hook:', error);
    }
  };

  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const result = await Axios.post('/api/login', formData, config);
      console.log('result:', result.data);
      dispatch({ type: LOGIN, payload: result.data });
      loadUser();
    } catch (error) {
      console.error('loginNewUser Hook:', error);
    }
  };

  const logout = () => dispatch({ type: LOGOUT });

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        login,
        logout,
        loadUser,
        registerNewUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
