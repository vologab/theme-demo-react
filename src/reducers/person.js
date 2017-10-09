import {
  PERSON_CREATE_REQUEST,
  /* PERSON_CREATE_SUCCESS, */
  PERSON_CREATE_FAILURE,
  PERSON_RESET,
  PERSON_GET_REQUEST,
  PERSON_GET_SUCCESS,
  PERSON_GET_FAILURE,
  PERSON_UPDATE_REQUEST,
  PERSON_UPDATE_SUCCESS,
  PERSON_UPDATE_FAILURE,
  /* PERSON_DELETE_REQUEST,
  PERSON_DELETE_SUCCESS,
  PERSON_DELETE_FAILURE */
  FORM_FIELD_UPDATE,
  PERSON_DELETE_AVATAR
} from 'constants/actionTypes';
import dateUtils from 'utils/dateUtils';

const initialState = {
  avatar: null,
  about: '',
  birthDate: null,
  deathDate: null,
  error: '',
  firstName: '',
  id: '',
  isLoadingPerson: false,
  isSavingPerson: false,
  lastName: '',
  occupation: ''
};

const person = (state = initialState, action) => {
  switch (action.type) {
    case PERSON_GET_REQUEST:
      return {
        ...state,
        isLoadingPerson: true
      };

    case PERSON_RESET:
      return {
        ...state,
        ...initialState
      };

    case PERSON_GET_SUCCESS:
      return {
        ...state,
        avatar: action.res.get('avatar') ? action.res.get('avatar').url() : null,
        about: action.res.get('about'),
        birthDate: action.res.get('birthDate') ? dateUtils.getStringFromDate(action.res.get('birthDate')) : null,
        deathDate: action.res.get('deathDate') ? dateUtils.getStringFromDate(action.res.get('deathDate')) : null,
        firstName: action.res.get('firstName'),
        id: action.res.id,
        isLoadingPerson: false,
        lastName: action.res.get('lastName'),
        occupation: action.res.get('occupation')
      };

    case PERSON_GET_FAILURE:
      return {
        ...state,
        isLoadingPerson: false
      };

    case PERSON_CREATE_REQUEST:
      return {
        ...state,
        isSavingPerson: true
      };

    case PERSON_CREATE_FAILURE:
      return {
        ...state,
        isSavingPerson: false
      };

    case PERSON_UPDATE_REQUEST:
      return {
        ...state,
        isSavingPerson: true
      };

    case PERSON_UPDATE_SUCCESS:
      return {
        ...state,
        avatar: action.res.get('avatar') ? action.res.get('avatar').url() : null,
        about: action.res.get('about'),
        birthDate: action.res.get('birthDate') ? dateUtils.getStringFromDate(action.res.get('birthDate')) : null,
        deathDate: action.res.get('deathDate') ? dateUtils.getStringFromDate(action.res.get('deathDate')) : null,
        firstName: action.res.get('firstName'),
        id: action.res.id,
        isSavingPerson: false,
        lastName: action.res.get('lastName'),
        occupation: action.res.get('occupation')
      };

    case PERSON_UPDATE_FAILURE:
      return {
        ...state,
        isSavingPerson: false
      };

    case PERSON_DELETE_AVATAR:
      return {
        ...state,
        avatar: null
      };

    case FORM_FIELD_UPDATE:
      return {
        ...state,
        [action.data.fieldName]: action.data.fieldValue
      };

    default:
      return state;
  }
};

export default person;
