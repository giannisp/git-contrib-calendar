/**
 * @file CalendarDay component.
 */

const React = require('react');
const PropTypes = require('prop-types');
const { Box, Text } = require('ink');

/**
 * Return the background color for the calendar day box.
 *
 * @param {Number} commitsCount The commits count.
 *
 * @return {String} The background color.
 */
const getBackgroundColor = (commitsCount) => {
  if (commitsCount === 0) {
    return '#cdcdcd';
  }

  if (commitsCount > 0 && commitsCount <= 10) {
    return '#40c463';
  }

  if (commitsCount > 10 && commitsCount <= 30) {
    return '#30a14e';
  }

  return '#216e39';
};

const CalendarDay = ({ commitsCount }) => (
  <Box width={2}>
    <Text backgroundColor={getBackgroundColor(commitsCount)}>{'  '}</Text>
  </Box>
);

CalendarDay.propTypes = {
  commitsCount: PropTypes.number.isRequired,
};

module.exports = CalendarDay;
