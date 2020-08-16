/**
 * @file Date helpers.
 */

const moment = require('moment');
const groupBy = require('lodash.groupby');

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

/**
 * Return days grouped by weekday for calendar display purposes.
 *
 * @return {Object[]} The day data.
 */
const getCalendarDays = () => {
  const now = moment();
  const startDate = now.clone().subtract(1, 'years').isoWeekday(7);

  const days = [];
  const day = startDate.clone();

  while (day <= now) {
    days.push({
      dayIndex: day.day(),
      monthIndex: day.month(),
      year: day.year(),
      date: day.format('YYYY-MM-DD'),
    });
    day.add(1, 'days');
  }

  return { totalDays: days.length, days: groupBy(days, 'dayIndex') };
};

exports.getCalendarDays = getCalendarDays;
