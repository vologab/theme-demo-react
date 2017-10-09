import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

import AlertContainer from 'containers/AlertContainer';
import Preloader from 'components/Preloader';
import AvatarPlaceholder from 'components/AvatarPlaceholder';

import dateUtils from 'utils/dateUtils';
import stringUtils from 'utils/stringUtils';

import './Person.css';

class Person extends Component {
  constructor(props) {
    super(props);
    this.personEdit = this.personEdit.bind(this);
    this.personDelete = this.personDelete.bind(this);
  }
  componentDidMount() {
    if (this.props.params && this.props.params.id) {
      this.props.personGet(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.personGet(nextProps.params.id);
    }
  }

  personEdit() {
    this.props.personEdit(this.props.params.id);
  }

  personDelete() {
    this.props.personDelete(this.props.params.id);
  }

  render() {
    const {
      avatar, about, birthDate, deathDate, firstName, id, isLoadingPerson, lastName, occupation
    } = this.props;
    const age = dateUtils.getAge(birthDate, deathDate);
    let ageString = '';

    if (age < 0) {
      ageString = 'Not born yet';
    } else if (age === 0) {
      ageString = 'Newborn';
    } else {
      ageString = `${age} ${stringUtils.pluralize(age, 'year', 'years')}`;
    }

    return (
      <div className="person-wrapper">
        <AlertContainer />
        {isLoadingPerson && <Preloader />}
        {id && (
          <div className="person-block">
            <div className="background-container" />
            <div className="person-buttons">
              <Button
                raised
                color="primary"
                onClick={this.personEdit}
              >
                Edit
              </Button>

              <Button
                raised
                color="accent"
                onClick={this.personDelete}
              >
                Delete
              </Button>
            </div>
            <Paper className="person-avatar-wrapper">
              {
                avatar ?
                  (<div className="person-avatar">
                    <img src={avatar} className="img-responsive" alt="person" />
                  </div>) :
                  <AvatarPlaceholder />
              }
            </Paper>

            {(firstName || lastName) && (
              <div className="person-name">{`${firstName} ${lastName}`}</div>
            )}

            <p>
              {occupation && (
                <span className="person-occupation">{occupation},</span>
              )}
              {birthDate && (
                <span className="person-birth"> born {dateUtils.getFormattedDate(birthDate)},</span>
              )}
              {deathDate && (
                <span className="person-death"> died {dateUtils.getFormattedDate(deathDate)},</span>
              )}
              <span className="person-age"> {ageString}</span>
            </p>

            <div className="divider" />

            <p className="person-about">
              {about}
            </p>
          </div>

        )}
      </div>
    );
  }
}

Person.propTypes = {
  avatar: PropTypes.string,
  about: PropTypes.string,
  birthDate: PropTypes.string,
  deathDate: PropTypes.string,
  firstName: PropTypes.string,
  id: PropTypes.string,
  isLoadingPerson: PropTypes.bool,
  lastName: PropTypes.string,
  occupation: PropTypes.string,
  params: PropTypes.shape({
    id: PropTypes.string
  }),

  personDelete: PropTypes.func.isRequired,
  personEdit: PropTypes.func.isRequired,
  personGet: PropTypes.func.isRequired
};

Person.defaultProps = {
  avatar: '',
  about: '',
  birthDate: null,
  deathDate: null,
  firstName: '',
  id: null,
  isLoadingPerson: false,
  lastName: '',
  occupation: '',
  params: null
};

export default Person;
