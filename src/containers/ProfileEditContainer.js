import { connect } from 'react-redux';
import { updateProfile } from '../actions/auth';
import Profile from '../components/Profile/index';

const select = state => ({
  error: state.error,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  avatar: state.auth.avatar,
  email: state.auth.email,
  about: state.auth.about,
  isUpdatingProfile: state.auth.isUpdatingProfile
});

const actions = {
  updateProfile
};

export default connect(select, actions)(Profile);
