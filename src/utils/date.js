/**
 * @file Date helpers.
 */

const { DateTime, Interval } = require('luxon');

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

const DATE_FORMAT = 'yyyy-MM-dd';

/**
 * Return the date range for the calendar.
 *
 * @param {Number|undefined} year The optional year input.
 *
 * @return {Object} The date range data.
 */
const getDateRange = (year) => {
  let dateFrom = null;
  let dateTo = null;

  if (year) {
    dateFrom = DateTime.fromObject({ year });
    dateTo = dateFrom.endOf('year');
  } else {
    const now = DateTime.now();
    dateFrom = now.minus({ years: 1 });
    dateTo = now;
  }

  return {
    from: dateFrom.endOf('week').toFormat(DATE_FORMAT),
    to: dateTo.toFormat(DATE_FORMAT),
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
  const interval = Interval.fromDateTimes(
    DateTime.fromFormat(dateFrom, DATE_FORMAT),
    DateTime.fromFormat(dateTo, DATE_FORMAT).plus({ days: 1 }),
  );

  const intervalDays = interval.splitBy({ days: 1 }).map((day) => day.start);

  return intervalDays.map((intervalDay) => ({
    dayIndex: intervalDay.weekday % 7, // convert from 1-7 to 0-6 (0 is Sun)
    monthIndex: intervalDay.month - 1,
    year: intervalDay.year,
    date: intervalDay.toFormat(DATE_FORMAT),
  }));
};

exports.getCalendarDays = getCalendarDays;
