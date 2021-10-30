/**
 * @file App component.
 */

const React = require('react');
const PropTypes = require('prop-types');
const { Box, Text } = require('ink');
const importJsx = require('import-jsx');

const { isGitRepo } = require('../services/git');

const RepoInfo = importJsx('./RepoInfo');
const Calendar = importJsx('./Calendar');

const App = ({ repoPath, dateFrom, dateTo, year, author }) => {
  const [isRepo, setIsRepo] = React.useState();

  React.useEffect(() => {
    const fetchIsGitRepo = async () => {
      const isRepoResult = await isGitRepo(repoPath);

      setIsRepo(isRepoResult);
    };

    fetchIsGitRepo();
  }, []);

  if (typeof isRepo === 'undefined') {
    return null;
  }

  if (!isRepo) {
    return <Text>Not a git repository: {repoPath}</Text>;
  }

  return (
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
};

App.propTypes = {
  repoPath: PropTypes.string.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  year: PropTypes.number,
  author: PropTypes.string,
};

module.exports = App;
