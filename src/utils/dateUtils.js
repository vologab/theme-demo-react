import moment from 'moment';

const getAge = (startDate, endDate) => Math.floor(moment(endDate || moment()).diff(moment(startDate || moment()), 'years', true));

const getStringFromDate = (date, format = 'MM/DD/YYYY') => moment(date).format(format);

const getDateFromString = (dateString, format = 'MM/DD/YYYY') => new Date(moment(dateString, format, true).format());

const getFormattedDate = date => getStringFromDate(date, 'D MMMM, YYYY');

const validateDate = (date, format = 'MM/DD/YYYY') => moment(date, format).isValid();

export default {
  getAge,
  getStringFromDate,
  getDateFromString,
  getFormattedDate,
  validateDate
};
