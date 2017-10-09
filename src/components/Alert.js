import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const Alert = ({ message, showError, resetError }) => (
  <Dialog open={showError} onRequestClose={resetError}>
    <DialogTitle>
      Error:
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        {message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={resetError} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);


Alert.propTypes = {
  message: PropTypes.string,
  showError: PropTypes.bool,
  resetError: PropTypes.func.isRequired
};

Alert.defaultProps = {
  message: '',
  showError: false
};

export default Alert;
