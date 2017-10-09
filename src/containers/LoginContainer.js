import { connect } from 'react-redux';

import { login, googleLogin } from 'actions/auth';
import { resetError } from 'actions/error';
import Login from 'components/Login';

const select = state => ({
  error: state.error,
  userId: state.auth.userId,
  isLoggingIn: state.auth.isLoggingIn
});

const actions = {
  login,
  googleLogin,
  resetError
};

export default connect(select, actions)(Login);
