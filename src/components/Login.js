import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';
import { withRouter, Link } from 'react-router';

import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

import AlertContainer from 'containers/AlertContainer';
import batterySvg from 'images/battery.svg';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: '',
        password: ''
      }
    };

    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleGoogleAuth = this.handleGoogleAuth.bind(this);
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
        formErrors.password = !value.length ? 'Required' : '';
        break;
      }
      default:
        break;
    }
    this.setState({ formErrors });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const { email, password, formErrors } = this.state;
    if (Object.values(formErrors).some(d => d)) {
      // display error to user
      return;
    }

    this.props.login(email, password);
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

  render() {
    const { isLoggingIn } = this.props;
    return (
      <div className="login auth-page">
        <div className="bg-overlay" />
        <div className="logo-wrapper">
          <img src={batterySvg} alt="Logo" className="logo" />
        </div>
        <Paper className="login-form-wrapper">
          <AlertContainer />
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-container">
              <FormControl error={!!this.state.formErrors.email} fullWidth>
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <Input
                  id="email-input"
                  value={this.state.email}
                  onChange={this.handleTextFieldChange}
                  name="email"
                  required
                />
                <FormHelperText>{this.state.formErrors.email}</FormHelperText>
              </FormControl>
            </div>
            <div className="input-container">
              <FormControl error={!!this.state.formErrors.password} fullWidth>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input
                  id="password-input"
                  value={this.state.password}
                  onChange={this.handleTextFieldChange}
                  name="password"
                  minLength={6}
                  required
                  type="password"
                />
                <FormHelperText>{this.state.formErrors.password}</FormHelperText>
              </FormControl>
            </div>
            <div className="input-container">
              <Button
                raised
                color="primary"
                disabled={isLoggingIn}
                type="submit"
              >
                {isLoggingIn ? 'Logging in...' : 'Log in'}
              </Button>
            </div>
          </form>
          <div className="input-container">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText=""
              onSuccess={this.handleGoogleAuth}
              onFailure={this.handleGoogleAuth}
              className="google-btn"
              tag="div"
            >
              <Button
                raised
              >
                Google Login
              </Button>
            </GoogleLogin>
          </div>
          <div>
            Need an account? <Link to="signup">Sign Up</Link>
          </div>
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

Login.propTypes = {
  isLoggingIn: PropTypes.bool,

  googleLogin: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

Login.defaultProps = {
  isLoggingIn: false
};

export default withRouter(Login);
