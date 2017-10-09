import { push } from 'react-router-redux';
import api from 'api';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  UNAUTH_USER,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  RESTORE_SESSION,
  TOGGLE_PRELOADER
} from 'constants/actionTypes';

export const togglePreloader = showPreloader => ({ type: TOGGLE_PRELOADER, showPreloader });

const googleLoginAsync = async (dispatch, getState, authData, profile) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { locationBeforeTransitions } = getState().routing;
    const pathToRedirect = (locationBeforeTransitions && locationBeforeTransitions.query.next) || '/';

    const currentUser = await api.googleLogin(authData, profile);

    dispatch({
      type: LOGIN_SUCCESS,
      currentUser
    });

    dispatch(push(pathToRedirect));
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      err
    });
    dispatch(push('/login'));
  }
};

export const googleLogin = (authData, profile) => (dispatch, getState) =>
  googleLoginAsync(dispatch, getState, authData, profile);

const loginAsync = async (dispatch, getState, email, password) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { locationBeforeTransitions } = getState().routing;
    const pathToRedirect = (locationBeforeTransitions && locationBeforeTransitions.query.next) || '/';

    const currentUser = await api.login(email, password);

    dispatch({
      type: LOGIN_SUCCESS,
      currentUser
    });

    dispatch(push(pathToRedirect));
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      err
    });
    dispatch(push('/login'));
  }
};

export const login = (email, password) => (dispatch, getState) =>
  loginAsync(dispatch, getState, email, password);

const signupAsync = async (dispatch, getState, email, password, firstName, lastName) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const { locationBeforeTransitions } = getState().routing;
    const pathToRedirect = (locationBeforeTransitions && locationBeforeTransitions.query.next) || '/';

    const currentUser = await api.signup(email, password, firstName, lastName);

    dispatch({
      type: SIGNUP_SUCCESS,
      currentUser
    });

    dispatch(push(pathToRedirect));
  } catch (err) {
    dispatch({
      type: SIGNUP_FAILURE,
      err
    });
    dispatch(push('/signup'));
  }
};

export const signup = (email, password, firstName, lastName) => (dispatch, getState) =>
  signupAsync(dispatch, getState, email, password, firstName, lastName);

const restoreSessionAsync = async (dispatch, getState, sessionToken) => {
  try {
    dispatch(togglePreloader(true));

    const { locationBeforeTransitions } = getState().routing;
    const pathToRedirect = locationBeforeTransitions && locationBeforeTransitions.query.next;

    const currentUser = await api.getCurrentUser(sessionToken);

    dispatch({
      type: RESTORE_SESSION,
      currentUser
    });

    if (pathToRedirect) {
      dispatch(push(pathToRedirect));
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAILURE,
      err
    });
    dispatch(push('/login'));
  } finally {
    dispatch(togglePreloader(false));
  }
};

export const restoreSession = () => (dispatch, getState) => {
  const sessionToken = localStorage.getItem('sessionToken');
  if (!sessionToken) {
    dispatch(push('/login'));
  } else {
    restoreSessionAsync(dispatch, getState, sessionToken);
  }
};

export const unAuthUser = () => (dispatch) => {
  api.unAuthUser();
  localStorage.removeItem('sessionToken');
  dispatch({ type: UNAUTH_USER });
  dispatch(push('/login'));
};

export const updateProfile = (user, file) => ({
  types: [UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE],
  promise: api.updateUser(user, file)
});

