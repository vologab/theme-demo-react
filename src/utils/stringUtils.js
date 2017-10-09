const pluralize = (number, one, many) => {
  // TODO: Make sure there is a number
  if (Math.abs(number) % 10 === 1) {
    return one;
  }

  return many;
};

export default {
  pluralize
};
