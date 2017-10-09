import { connect } from 'react-redux';
import Alert from 'components/Alert';
import { resetError } from 'actions/error';

const select = state => ({
  message: state.error.message,
  showError: state.error.showError
});

const actions = {
  resetError
};

export default connect(select, actions)(Alert);
