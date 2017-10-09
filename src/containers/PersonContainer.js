import { connect } from 'react-redux';

import { personGet, personDelete, personEdit } from 'actions/person';
import Person from 'components/Person';

const select = state => ({
  avatar: state.person.avatar,
  about: state.person.about,
  birthDate: state.person.birthDate,
  deathDate: state.person.deathDate,
  error: state.error,
  firstName: state.person.firstName,
  id: state.person.id,
  isLoadingPerson: state.person.isLoadingPerson,
  lastName: state.person.lastName,
  occupation: state.person.occupation
});

const actions = {
  personGet,
  personDelete,
  personEdit
};

export default connect(select, actions)(Person);
