import { connect } from 'react-redux';

import { signup, googleLogin } from 'actions/auth';
import { resetError } from 'actions/error';
import Signup from 'components/Signup';

const select = state => ({
  error: state.error,
  userId: state.auth.userId,
  isSigningUp: state.auth.isSigningUp
});

const actions = {
  signup,
  googleLogin,
  resetError
};

export default connect(select, actions)(Signup);
