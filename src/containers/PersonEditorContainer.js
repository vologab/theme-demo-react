import { connect } from 'react-redux';

import { personGet, personUpdate, changeField, personCreate, personSave, deleteAvatar } from 'actions/person';
import PersonEditor from 'components/Person/PersonEditor';

const select = state => ({
  avatar: state.person.avatar,
  about: state.person.about,
  birthDate: state.person.birthDate,
  deathDate: state.person.deathDate,
  error: state.error,
  firstName: state.person.firstName,
  id: state.person.id,
  isLoadingPerson: state.person.isLoadingPerson,
  isSavingPerson: state.person.isSavingPerson,
  lastName: state.person.lastName,
  occupation: state.person.occupation
});

const actions = {
  deleteAvatar,
  personGet,
  personUpdate,
  changeField,
  personCreate,
  personSave
};

export default connect(select, actions)(PersonEditor);
