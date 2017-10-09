import { resetError } from 'actions/error';

const promiseStore = store => next => (action) => {
  const { promise, types, ...rest } = action;

  if (!promise || !types) {
    return next(action);
  }

  store.dispatch(resetError());

  const [REQUEST, SUCCESS, FAILURE] = types;

  next({
    type: REQUEST
  });

  return promise.then((res) => {
    next({
      ...rest,
      type: SUCCESS,
      res
    });
  }).catch((err) => {
    next({
      type: FAILURE,
      ...rest,
      err
    });
  });
};

export default promiseStore;
