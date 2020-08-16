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
    return '#d0d0d0';
  }

  if (commitsCount > 0 && commitsCount <= 10) {
    return '#00d700';
  }

  if (commitsCount > 10 && commitsCount <= 30) {
    return '#00af00';
  }

  return '#005f00';
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
