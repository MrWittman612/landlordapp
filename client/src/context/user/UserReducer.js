import {
  LOGIN,
  REGISTER,
  LOGOUT,
  CLEAR_ERRORS,
  AUTH_ERROR,
  USER_LOADED,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case LOGIN:
    case REGISTER:
      localStorage.setItem('token', action.payload.token);
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
