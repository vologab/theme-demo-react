import { RESET_ERROR } from 'constants/actionTypes';

const initialState = {
  message: '',
  showError: false
};

export default function error(state = initialState, action) {
  if (action.type === RESET_ERROR) {
    return { ...state, showError: false };
  }

  if (action.type.includes('_FAILURE')) {
    return {
      message: action.err.message || '',
      showError: true
    };
  }

  return state;
}
