import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';

import MaskedInput from 'react-text-mask';

import AvatarPlaceholder from 'components/AvatarPlaceholder';
import AlertContainer from 'containers/AlertContainer';
import Preloader from 'components/Preloader';

import './Person.css';

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
      birthDate: props.birthDate,
      deathDate: props.deathDate,
      isAlive: !props.deathDate,
      file: null,
      hasChanged: false
    };

    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleBirthDateFieldChange = this.handleBirthDateFieldChange.bind(this);
    this.handleCheckboxFieldChange = this.handleCheckboxFieldChange.bind(this);
    this.handleDeathDateFieldChange = this.handleDeathDateFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.deleteAvatar = this.deleteAvatar.bind(this);
    this.renderDateMask = this.renderDateMask.bind(this);
  }

  componentDidMount() {
    if (this.props.params && this.props.params.id) {
      this.props.personGet(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.personGet(nextProps.params.id);
    } else {
      this.setState({
        birthDate: nextProps.birthDate,
        deathDate: nextProps.deathDate,
        isAlive: !nextProps.deathDate
      });
    }
  }

  handleAvatarChange(e) {
    this.setState({
      file: e.target.files.length ? e.target.files[0] : null,
      hasChanged: true
    });
  }

  handleBirthDateFieldChange(e) {
    this.props.changeField('birthDate', e.target.value);
    this.setState({
      hasChanged: true
    });
  }

  handleCheckboxFieldChange(e) {
    const { checked } = e.target;
    if (checked) {
      this.props.changeField(
        'deathDate', null
      );
    }
    this.setState({
      isAlive: checked,
      hasChanged: true
    });
  }

  handleDeathDateFieldChange(e) {
    this.props.changeField('deathDate', e.target.value);
    this.setState({
      hasChanged: true
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // TODO: Move file to store
    this.props.personSave(this.state.file);
  }

  handleTextFieldChange(e) {
    this.props.changeField(
      e.target.name, e.target.value
    );
    this.setState({
      hasChanged: true
    });
  }

  deleteAvatar() {
    this.props.deleteAvatar();
    this.setState({
      hasChanged: true
    });
  }

  renderDateMask(props) {
    return (
      <MaskedInput
        {...props}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        placeholder="mm/dd/yyyy"
      />
    );
  }

  renderAvatar() {
    const { avatar } = this.props;
    let usedAvatar;
    if (this.state.file) {
      usedAvatar = window.URL.createObjectURL(this.state.file);
    } else if (avatar) {
      usedAvatar = avatar;
    } else {
      return <AvatarPlaceholder />;
    }

    return <img src={usedAvatar} className="img-responsive" alt="person" />;
  }

  render() {
    const { isLoadingPerson, isSavingPerson } = this.props;

    return (
      <div className="person-wrapper">
        <div className="background-container" />

        <AlertContainer />
        {isLoadingPerson && <Preloader />}
        {isSavingPerson && <div className="loading-overlay" />}

        {(!this.props.params.id || this.props.id) && (
          <form className="person-block" onSubmit={this.handleFormSubmit}>

            <div className="submit-btn-wrapper">
              <Button raised color="primary" type="submit" disabled={!this.state.hasChanged}>
                {this.props.params.id ? 'Save' : 'Create'}
              </Button>
            </div>

            <div className="person-avatar-wrapper">
              <Paper className="person-avatar">
                {this.renderAvatar()}
              </Paper>
            </div>

            <div className="person-avatar-button-bar">
              <Button
                color="primary"
                className="person-avatar-uploader"
              >
                {this.state.filename || 'Change'}
                <input
                  accept="image/*"
                  type="file"
                  onChange={this.handleAvatarChange}
                />
              </Button>
              <Button color="accent" onClick={this.deleteAvatar}>
                Delete
              </Button>
            </div>


            <div className="person-info">
              <div className="person-inputs-flexible form-control">
                <div className="first input-wrapper">
                  <TextField
                    disabled={isSavingPerson}
                    name="firstName"
                    value={this.props.firstName || Person.defaultProps.firstName}
                    onChange={this.handleTextFieldChange}
                    label="First name"
                    required
                    fullWidth
                  />
                </div>
                <div className="input-wrapper">
                  <TextField
                    disabled={isSavingPerson}
                    name="lastName"
                    value={this.props.lastName || Person.defaultProps.lastName}
                    onChange={this.handleTextFieldChange}
                    label="Last name"
                    required
                    className=""
                    fullWidth
                  />
                </div>
              </div>

              <div className="form-control">
                <TextField
                  disabled={isSavingPerson}
                  id="occupation"
                  name="occupation"
                  defaultValue={this.props.occupation}
                  onChange={this.handleTextFieldChange}
                  label="Occupation"
                  fullWidth
                  required
                />
              </div>
              <div className="person-inputs-flexible form-control">
                <div className={`input-wrapper ${!this.state.isAlive && 'first'}`}>
                  <Input
                    disabled={isSavingPerson}
                    value={this.state.birthDate}
                    inputComponent={this.renderDateMask}
                    onChange={this.handleBirthDateFieldChange}
                    name="birthDate"
                    required
                    fullWidth
                  />
                </div>
                {!this.state.isAlive && (
                  <div className="input-wrapper">
                    <Input
                      value={this.state.deathDate}
                      inputComponent={this.renderDateMask}
                      onChange={this.handleDeathDateFieldChange}
                      name="deathDate"
                      fullWidth
                    />
                  </div>
                )}
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.isAlive}
                    onChange={this.handleCheckboxFieldChange}
                    disabled={isSavingPerson}
                    value="isAlive"
                  />
                }
                label="Is Alive"
              />
              <div className="person-about">
                <div className="textarea-wrapper">
                  <TextField
                    disabled={isSavingPerson}
                    value={this.props.about}
                    name="about"
                    onChange={this.handleTextFieldChange}
                    label="About"
                    multiline
                    rows={3}
                    rowsMax={5}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </form>
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
  isSavingPerson: PropTypes.bool,
  lastName: PropTypes.string,
  occupation: PropTypes.string,
  params: PropTypes.shape({
    id: PropTypes.string
  }),

  changeField: PropTypes.func.isRequired,
  deleteAvatar: PropTypes.func.isRequired,
  personGet: PropTypes.func.isRequired,
  personSave: PropTypes.func.isRequired
};

Person.defaultProps = {
  avatar: '',
  about: '',
  birthDate: undefined,
  deathDate: undefined,
  firstName: '',
  id: null,
  isLoadingPerson: false,
  isSavingPerson: false,
  lastName: '',
  occupation: '',
  params: undefined
};

export default Person;
