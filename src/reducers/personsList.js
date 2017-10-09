import {
  GET_PERSONS_REQUEST,
  GET_PERSONS_SUCCESS,
  GET_PERSONS_FAILURE,
  UPDATE_PERSONS
} from 'constants/actionTypes';
import dateUtils from 'utils/dateUtils';

const initialState = {
  persons: {},
  fetchingPersonsList: false,
  fetchingPersonsListError: false
};

const formatPerson = (person) => {
  const newPerson = Object.assign(person);

  newPerson.name = `${newPerson.firstName} ${newPerson.lastName}`;
  newPerson.birthDateFormatted = newPerson.birthDate
    && dateUtils.getFormattedDate(new Date(newPerson.birthDate.iso));
  newPerson.deathDateFormatted = newPerson.deathDate
    && dateUtils.getFormattedDate(new Date(newPerson.deathDate.iso));
  newPerson.age = dateUtils.getAge(
    newPerson.birthDate ? new Date(newPerson.birthDate.iso) : null,
    newPerson.deathDate ? new Date(newPerson.deathDate.iso) : null
  );

  return newPerson;
};

const formatPersonsList = (personsList) => {
  const formattedPersonsList = {};
  personsList.forEach((person, key) => {
    formattedPersonsList[key] = formatPerson(person);
  });

  return formattedPersonsList;
};

const createMap = array => new Map(array.map(item => [item.objectId, item]));

const personsList = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONS_REQUEST:
      return {
        ...state,
        fetchingPersonsList: true,
        fetchingPersonsListError: false
      };

    case GET_PERSONS_SUCCESS:
      return {
        ...state,
        fetchingPersonsList: false,
        fetchingPersonsListError: false,
        persons: formatPersonsList(createMap(action.res))
      };

    case GET_PERSONS_FAILURE:
      return {
        ...state,
        fetchingPersonsList: false,
        fetchingPersonsListError: true
      };

    case UPDATE_PERSONS: {
      const newPerson = formatPerson(action.res.toJSON());
      return {
        ...state,
        persons: {
          ...state.persons,
          ...{ [newPerson.objectId]: newPerson }
        }
      };
    }
    default:
      return state;
  }
};

export default personsList;
