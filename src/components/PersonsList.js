import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PersonCard from 'components/PersonCard';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Icon from 'material-ui/Icon';

import './PersonsList.css';

class PersonsList extends Component {
  componentDidMount() {
    this.props.getPersons();
  }

  render() {
    const { persons, personView, personDelete, goToCreatePerson } = this.props;
    return (
      <div className="persons-list">
        <Card className="person-card-add" onClick={goToCreatePerson}>
          <CardContent className="person-card-add-content">
            <Icon color="accent" style={{ fontSize: 150 }}>add</Icon>
            <Typography type="headline" component="h2" className="person-card-title">
              Add new person
            </Typography>
          </CardContent>
        </Card>
        {
          Object.keys(persons).map((personKey) => {
            const person = persons[personKey];
            return (
              <PersonCard
                {...person}
                personView={personView}
                personDelete={personDelete}
                key={personKey}
              />
            );
          })
        }
      </div>
    );
  }
}

PersonsList.propTypes = {
  persons: PropTypes.shape({
    age: PropTypes.number,
    about: PropTypes.string,
    birthDate: PropTypes.object,
    deathDate: PropTypes.object,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    occupation: PropTypes.string
  }),

  getPersons: PropTypes.func.isRequired,
  personView: PropTypes.func.isRequired,
  personDelete: PropTypes.func.isRequired,
  goToCreatePerson: PropTypes.func.isRequired
};

PersonsList.defaultProps = {
  persons: {}
};

export default PersonsList;
