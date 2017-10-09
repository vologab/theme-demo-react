import { connect } from 'react-redux';

import { getPersons, personView, goToCreatePerson, personDelete } from 'actions/person';
import PersonsList from 'components/PersonsList';

const select = state => ({
  persons: state.personsList.persons,
  fetchingPersonsList: state.personsList.fetchingPersonsList,
  fetchingPersonsListError: state.personsList.fetchingPersonsListError
});

const actions = {
  getPersons,
  personView,
  personDelete,
  goToCreatePerson
};

export default connect(select, actions)(PersonsList);
