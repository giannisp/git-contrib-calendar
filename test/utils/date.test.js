/**
 * @file Date util tests.
 */

const { getCalendarDays, getDateRange } = require('../../src/utils/date');

describe('Date util', () => {
  it('Should return calendar days for a date range', () => {
    const calendarDays = getCalendarDays('2022-01-01', '2022-01-03');
    expect(calendarDays).toHaveLength(3);
    expect(calendarDays[0]).toEqual({
      dayIndex: 6,
      monthIndex: 0,
      year: 2022,
      date: '2022-01-01',
    });
    expect(calendarDays[1]).toEqual({
      dayIndex: 0,
      monthIndex: 0,
      year: 2022,
      date: '2022-01-02',
    });
    expect(calendarDays[2]).toEqual({
      dayIndex: 1,
      monthIndex: 0,
      year: 2022,
      date: '2022-01-03',
    });
  });

  it('Should return a date range for a specific year', () => {
    const dateRange = getDateRange(2022);
    expect(dateRange.from).toEqual('2022-01-02');
    expect(dateRange.to).toEqual('2022-12-31');
  });
});
