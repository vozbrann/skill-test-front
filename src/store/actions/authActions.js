import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, AUTH_LOADING } from './types';


const authUser = user => ({
  type: AUTH_USER,
  payload: user
});

const authError = errorMessage => ({
  type: AUTH_ERROR,
  payload: errorMessage
});

const authLoading = bool => ({
  type: AUTH_LOADING,
  payload: bool
});

export const logout = () => {
  return (dispatch, getState) => {
    localStorage.setItem("access_token", '');
    dispatch(authUser(null));
  }
};


export const fetchUser = () => {
  return (dispatch, getState) => {
    dispatch(authLoading(true));
    axios({
      method: 'get',
      url: 'http://localhost:8000/skillful/current_user/',
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem("access_token")}`
      },
    })
      .then((response) => {
        dispatch(authUser(response.data));
        dispatch(authLoading(false));
      })
      .catch((error) => {
        logout();
        if(error.response) {
          dispatch(authError(error.response.data.errorText));
        } else {
          dispatch(authError("Something went wrong."));
        }
        dispatch(authLoading(false));
      });
  }
};

export const loginFetch = user => {
  return (dispatch, getState) => {
    dispatch(authLoading(true));
    axios({
      method: 'post',
      url: 'http://localhost:8000/token-auth/',
      data: user,
      headers: {
        'Accept': 'application/json'
      },
    })
      .then((response) => {
        localStorage.setItem("access_token", response.data.token);
        dispatch(authUser(response.data.user));
        dispatch(authLoading(false));
      })
      .catch((error) => {
        if(error.response) {
          dispatch(authError(error.response.data.errorText));
        } else {
          dispatch(authError("Something went wrong."));
        }
        dispatch(authLoading(false));
      });
  }
};

export const signUpFetch = user => {
  return (dispatch, getState) => {
    dispatch(authLoading(true));
    axios({
      method: 'post',
      url: 'http://localhost:8000/skillful/users/',
      data: user,
      headers: {
        'Accept': 'application/json'
      },
    })
      .then((response) => {
        localStorage.setItem("access_token", response.data.token);
        dispatch(authUser(response.data));
        dispatch(authLoading(false));
      })
      .catch((error) => {
        if(error.response) {
          dispatch(authError(error.response.data.errorText));
        } else {
          dispatch(authError("Something went wrong."));
        }
        dispatch(authLoading(false));
      });
  }
};
