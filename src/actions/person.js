import { push } from 'react-router-redux';
import { PersonQuery } from 'configureParse';

import {
  PERSON_CREATE_REQUEST,
  PERSON_CREATE_SUCCESS,
  PERSON_CREATE_FAILURE,
  PERSON_GET_REQUEST,
  PERSON_GET_SUCCESS,
  PERSON_GET_FAILURE,
  PERSON_UPDATE_REQUEST,
  PERSON_UPDATE_SUCCESS,
  PERSON_UPDATE_FAILURE,
  PERSON_DELETE_REQUEST,
  PERSON_DELETE_SUCCESS,
  PERSON_DELETE_FAILURE,
  GET_PERSONS_REQUEST,
  GET_PERSONS_SUCCESS,
  GET_PERSONS_FAILURE,
  UPDATE_PERSONS,
  FORM_FIELD_UPDATE,
  PERSON_RESET,
  PERSON_DELETE_AVATAR
} from 'constants/actionTypes';
import api from 'api';
import dateUtils from 'utils/dateUtils';

export const deleteAvatar = () => ({
  type: PERSON_DELETE_AVATAR
});

export const personGet = personId => (dispatch) => {
  dispatch({ type: PERSON_RESET });

  return dispatch({
    types: [PERSON_GET_REQUEST, PERSON_GET_SUCCESS, PERSON_GET_FAILURE],
    promise: api.personGet(personId)
  });
};

export const personSave = file => (dispatch, getState) => {
  const personState = getState().person;
  const personToSave = {
    about: personState.about,
    avatar: personState.avatar,
    birthDate: (personState.birthDate && dateUtils.validateDate(personState.birthDate))
      ? dateUtils.getDateFromString(personState.birthDate)
      : null,
    deathDate: (personState.deathDate && dateUtils.validateDate(personState.deathDate))
      ? dateUtils.getDateFromString(personState.deathDate)
      : null,
    firstName: personState.firstName,
    lastName: personState.lastName,
    occupation: personState.occupation
  };

  if (personState.id) {
    return dispatch({
      types: [PERSON_UPDATE_REQUEST, PERSON_UPDATE_SUCCESS, PERSON_UPDATE_FAILURE],
      promise: api.personUpdate(personState.id, personToSave, file)
    });
  }

  return dispatch({
    types: [PERSON_CREATE_REQUEST, PERSON_CREATE_SUCCESS, PERSON_CREATE_FAILURE],
    promise: api.personCreate(personToSave, file)
  });
};

export const personDelete = personId => ({
  types: [PERSON_DELETE_REQUEST, PERSON_DELETE_SUCCESS, PERSON_DELETE_FAILURE],
  promise: api.personDelete(personId)
});

export const goToCreatePerson = () => (dispatch) => {
  dispatch({ type: PERSON_RESET });

  return dispatch(push('/person/create'));
};

export const personEdit = personId => dispatch => dispatch(push(`/person/${personId}/edit`));

export const personView = personId => dispatch => dispatch(push(`/person/${personId}`));

export const changeField = (fieldName, fieldValue) => ({
  type: FORM_FIELD_UPDATE,
  data: { fieldName, fieldValue }
});

export const getPersons = () => ({
  types: [GET_PERSONS_REQUEST, GET_PERSONS_SUCCESS, GET_PERSONS_FAILURE],
  promise: api.getPersons()
});

export const setPerson = person => ({
  type: PERSON_GET_SUCCESS,
  res: person
});

export const updatePersons = person => ({
  type: UPDATE_PERSONS,
  res: person
});

export const personLiveQueryListener = () => (dispatch) => {
  const PersonSubscription = PersonQuery.subscribe();
  PersonSubscription.on('update', (person) => {
    dispatch(setPerson(person));
    dispatch(updatePersons(person));
  });
  return PersonSubscription;
};
