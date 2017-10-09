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

const initialState = {
  isSigningUp: false,
  isLoggingIn: false,
  userId: '',
  email: '',
  firstName: '',
  lastName: '',
  avatar: '',
  isUpdatingProfile: false,
  sessionToken: null,
  shouldShowPreloader: false,
  about: ''
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isSigningUp: true
      };

    case SIGNUP_SUCCESS: {
      const { currentUser } = action;
      localStorage.setItem('sessionToken', currentUser.getSessionToken());

      return {
        ...state,
        isSigningUp: false,
        email: currentUser.getEmail(),
        firstName: currentUser.get('firstName'),
        lastName: currentUser.get('lastName'),
        userId: currentUser.id,
        sessionToken: currentUser.getSessionToken()
      };
    }

    case SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false
      };

    case LOGIN_REQUEST:

      return {
        ...state,
        isLoggingIn: true
      };

    case LOGIN_SUCCESS: {
      const { currentUser } = action;
      localStorage.setItem('sessionToken', currentUser.getSessionToken());

      return {
        ...state,
        isLoggingIn: false,
        userId: currentUser.id,
        email: currentUser.getEmail(),
        firstName: currentUser.get('firstName'),
        lastName: currentUser.get('lastName'),
        avatar: (currentUser.get('avatar') && currentUser.get('avatar').url()) ||
        currentUser.get('avatarUrl'),
        sessionToken: currentUser.getSessionToken(),
        about: currentUser.get('about')
      };
    }

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false
      };

    case RESTORE_SESSION: {
      const { currentUser } = action;
      return {
        ...state,
        email: currentUser.getEmail(),
        userId: currentUser.id,
        firstName: currentUser.get('firstName'),
        lastName: currentUser.get('lastName'),
        avatar: (currentUser.get('avatar') && currentUser.get('avatar').url()) ||
        currentUser.get('avatarUrl'),
        sessionToken: currentUser.getSessionToken(),
        about: currentUser.get('about')
      };
    }

    case UNAUTH_USER:
      return initialState;

    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        isUpdatingProfile: true
      };

    case UPDATE_PROFILE_SUCCESS: {
      const avatar = (action.res.get('avatar') && action.res.get('avatar').url()) ||
        action.res.get('avatarUrl');
      const firstName = action.res.get('firstName');
      const lastName = action.res.get('lastName');
      const about = action.res.get('about');

      return {
        ...state,
        avatar,
        firstName,
        lastName,
        about,
        isUpdatingProfile: false
      };
    }

    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isUpdatingProfile: true
      };

    case TOGGLE_PRELOADER:
      return {
        ...state,
        shouldShowPreloader: action.showPreloader
      };

    default:
      return state;
  }
};

export default auth;
