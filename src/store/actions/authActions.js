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

export const loginFetch = user => {
  return (dispatch, getState) => {
    dispatch(authLoading(true));

    let bodyFormData = new FormData();
    bodyFormData.set('email', user.email);
    bodyFormData.set('password', user.password);
    axios({
      method: 'post',
      url: 'https://localhost:44362/login',
      data: bodyFormData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
    })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
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

export const signUpFetch = user => {
  return (dispatch, getState) => {
    dispatch(authLoading(true));

    let bodyFormData = new FormData();
    bodyFormData.set('name', user.name);
    bodyFormData.set('email', user.email);
    bodyFormData.set('password', user.password);
    bodyFormData.set('confirmPassword', user.confirmPassword);
    axios({
      method: 'post',
      url: 'https://localhost:44362/login',
      data: bodyFormData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
    })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access_token);
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
