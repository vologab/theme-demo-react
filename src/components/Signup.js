import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router';
import GoogleLogin from 'react-google-login';

import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

import AlertContainer from 'containers/AlertContainer';
import batterySvg from 'images/battery.svg';
import './Login.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      formErrors: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }
    };

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleTextFieldChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }, () => this.validateInputs(name, value));
  }

  validateInputs(fieldName, value) {
    const { formErrors } = this.state;
    switch (fieldName) {
      case 'email': {
        const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'Invalid Email';
        break;
      }
      case 'password': {
        if (!value) {
          formErrors.password = 'Required';
        } else {
          const passwordValid = value.length >= 6;
          formErrors.password = passwordValid ? '' : 'Password must be minimum of 6 characters';
        }
        break;
      }
      case 'firstName': {
        formErrors.firstName = value ? '' : 'Required';
        break;
      }
      case 'lastName': {
        formErrors.lastName = value ? '' : 'Required';
        break;
      }
      default:
        break;
    }

    this.setState({ formErrors });
  }

  handleGoogleAuth(response) {
    const authData = {
      authData: {
        access_token: response.accessToken,
        id: response.googleId
      }
    };

    this.props.googleLogin(authData, response.profileObj);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { email, password, firstName, lastName, formErrors } = this.state;
    if (Object.values(formErrors).some(d => d)) {
      // display error to user
      return;
    }
    this.props.signup(email, password, firstName, lastName);
  }

  render() {
    const { isSigningUp } = this.props;
    return (
      <div className="signup auth-page">
        <div className="bg-overlay" />
        <div className="logo-wrapper">
          <img src={batterySvg} alt="Logo" className="logo" />
        </div>
        <Paper className="login-form-wrapper">
          <AlertContainer />
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-container">
              <FormControl error={!!this.state.formErrors.firstName} fullWidth required>
                <InputLabel htmlFor="firstName-input">First name</InputLabel>
                <Input
                  id="firstName-input"
                  value={this.state.firstName}
                  onChange={this.handleTextFieldChange}
                  name="firstName"
                />
                <FormHelperText>{this.state.formErrors.firstName}</FormHelperText>
              </FormControl>
            </div>
            <div className="input-container">
              <FormControl error={!!this.state.formErrors.lastName} fullWidth required>
                <InputLabel htmlFor="lastName-input">Last name</InputLabel>
                <Input
                  id="lastName-input"
                  value={this.state.lastName}
                  onChange={this.handleTextFieldChange}
                  name="lastName"
                />
                <FormHelperText>{this.state.formErrors.lastName}</FormHelperText>
              </FormControl>
            </div>
            <div className="input-container">
              <FormControl error={!!this.state.formErrors.email} fullWidth required>
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <Input
                  id="email-input"
                  value={this.state.email}
                  onChange={this.handleTextFieldChange}
                  name="email"
                />
                <FormHelperText>{this.state.formErrors.email}</FormHelperText>
              </FormControl>
            </div>
            <div className="input-container">
              <FormControl error={!!this.state.formErrors.password} fullWidth required>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input
                  id="password-input"
                  value={this.state.password}
                  onChange={this.handleTextFieldChange}
                  name="password"
                  minLength={6}
                  type="password"
                />
                <FormHelperText>{this.state.formErrors.password}</FormHelperText>
              </FormControl>
            </div>
            <div className="input-container">
              <Button
                raised
                color="primary"
                disabled={isSigningUp}
                type="submit"
              >
                {isSigningUp ? 'Signing up...' : 'Sign up'}
              </Button>
            </div>
          </form>
          <div className="input-container">
            <GoogleLogin
              buttonText=""
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={this.handleGoogleAuth}
              onFailure={this.handleGoogleAuth}
              className="google-btn"
              tag="div"
            >
              <Button
                raised
              >
                Google Signup
              </Button>
            </GoogleLogin>
          </div>
          Have an account? <Link to="login">Log In</Link>
        </Paper>
        <div className="slogan-wrapper">
          <h1 className="title">Bekitzur</h1>
          <h1 className="slogan">We make a long story short</h1>
          <Button raised className="learn-more-btn">
            <Link to="https://bekitzur.com/" target="_blank" rel="noopener noreferrer">
              Learn more
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  isSigningUp: PropTypes.bool,

  googleLogin: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
};

Signup.defaultProps = {
  isSigningUp: false
};

export default withRouter(Signup);
