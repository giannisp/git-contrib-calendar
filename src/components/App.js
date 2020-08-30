/**
 * @file App component.
 */

const React = require('react');
const PropTypes = require('prop-types');
const { Box } = require('ink');
const importJsx = require('import-jsx');

const RepoInfo = importJsx('./RepoInfo');
const Calendar = importJsx('./Calendar');

const App = ({ repoPath, dateFrom, dateTo, year, author }) => (
  <Box flexDirection="column">
    <Box marginTop={1} marginBottom={1}>
      <RepoInfo repoPath={repoPath} />
    </Box>

    <Calendar
      repoPath={repoPath}
      dateFrom={dateFrom}
      dateTo={dateTo}
      year={year}
      author={author}
    />
  </Box>
);

App.propTypes = {
  repoPath: PropTypes.string.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  year: PropTypes.number,
  author: PropTypes.string,
};

module.exports = App;
