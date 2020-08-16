/**
 * @file App component.
 */

const React = require('react');
const PropTypes = require('prop-types');
const { Box } = require('ink');
const importJsx = require('import-jsx');

const { getBranch } = require('../services/git');

const RepoInfo = importJsx('./RepoInfo');
const Calendar = importJsx('./Calendar');

const App = ({ repoPath, author }) => {
  const [branch, setBranch] = React.useState(null);

  React.useEffect(() => {
    const fetchBranch = async () => {
      const branchData = await getBranch(repoPath);

      setBranch(branchData);
    };

    fetchBranch();
  }, []);

  if (!branch) {
    return null;
  }

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <RepoInfo repoPath={repoPath} />
      </Box>

      <Calendar repoPath={repoPath} author={author} />
    </Box>
  );
};

App.propTypes = {
  repoPath: PropTypes.string.isRequired,
  author: PropTypes.string,
};

module.exports = App;
