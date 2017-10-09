import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import LoadingOverlay from 'components/LoadingOverlay';
import AvatarPlaceholder from 'components/AvatarPlaceholder';
import './Profile.css';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      firstName: props.firstName,
      lastName: props.lastName,
      about: props.about,
      hasChanged: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAvatarChange = this.handleAvatarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      hasChanged: true
    });
  }

  handleAvatarChange(e) {
    this.setState({
      file: e.target.files.length ? e.target.files[0] : null,
      hasChanged: true
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { firstName, lastName, file, about } = this.state;
    this.props.updateProfile({ firstName, lastName, about }, file);
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

    return (
      <img
        src={usedAvatar}
        alt="avatar"
        className="img-responsive img-full-width"
      />
    );
  }

  render() {
    const { email, isUpdatingProfile } = this.props;

    return (
      <div className="profile-wrapper">
        {isUpdatingProfile && <LoadingOverlay />}

        <div className="form-wrapper">
          <Paper className="avatar-wrapper">
            {this.renderAvatar()}
          </Paper>

          <div className="profile-avatar-uploader">
            <Button
              color="primary"
              className="ui-fileupload-choose upload-btn"
            >
              {this.state.filename || 'Change avatar'}
              <input
                accept="image/*"
                type="file"
                onChange={this.handleAvatarChange}
              />
            </Button>
          </div>

          <div className="profile-description">

            <div className="username">
              {email}
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className="submit-btn-wrapper">
                <Button
                  raised
                  color="primary"
                  disabled={!this.state.hasChanged}
                  type="submit"
                >
                  Save
                </Button>
              </div>

              <div className="input-wrapper firstname">
                <TextField
                  value={this.state.firstName}
                  name="firstName"
                  onChange={this.handleChange}
                  label="First name"
                  fullWidth
                />
              </div>
              <div className="input-wrapper">
                <TextField
                  value={this.state.lastName}
                  name="lastName"
                  onChange={this.handleChange}
                  label="Last name"
                  fullWidth
                />
              </div>
              <div className="textarea-wrapper">
                <TextField
                  value={this.state.about}
                  name="about"
                  onChange={this.handleChange}
                  label="About"
                  multiline
                  rows={3}
                  rowsMax={5}
                  fullWidth
                />
              </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  about: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  isUpdatingProfile: PropTypes.bool,
  lastName: PropTypes.string,

  updateProfile: PropTypes.func.isRequired
};

ProfileEdit.defaultProps = {
  about: '',
  avatar: '',
  firstName: '',
  isUpdatingProfile: false,
  lastName: '',
};

export default ProfileEdit;
