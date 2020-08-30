/**
 * @file Date helpers.
 */

const moment = require('moment');

exports.DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

exports.MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const DATE_FORMAT = 'YYYY-MM-DD';

/**
 * Return the date range for the calendar.
 *
 * @param {Number|undefined} year The optional year input.
 *
 * @return {Object} The date range data.
 */
const getDateRange = (year) => {
  if (year) {
    return {
      from: moment(`${year}-01-01`).isoWeekday(7).format(DATE_FORMAT),
      to: moment(`${year}-12-31`).format(DATE_FORMAT),
    };
  }

  const now = moment();

  return {
    from: now.clone().subtract(1, 'years').isoWeekday(7).format(DATE_FORMAT),
    to: now.format(DATE_FORMAT),
  };
};

exports.getDateRange = getDateRange;

/**
 * Return calendar days for a specific date range.
 *
 * @param {String} dateFrom The date from.
 * @param {String} dateTo The date to.
 *
 * @return {Object[]} The day data.
 */
const getCalendarDays = (dateFrom, dateTo) => {
  const dateToMoment = moment(dateTo);

  const days = [];
  const day = moment(dateFrom);

  while (day <= dateToMoment) {
    days.push({
      dayIndex: day.day(),
      monthIndex: day.month(),
      year: day.year(),
      date: day.format('YYYY-MM-DD'),
    });
    day.add(1, 'days');
  }

  return days;
};

exports.getCalendarDays = getCalendarDays;
