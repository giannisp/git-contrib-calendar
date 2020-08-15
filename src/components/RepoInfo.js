/**
 * @file RepoInfo component.
 */

const React = require('react');
const PropTypes = require('prop-types');
const { Box, Text, Newline } = require('ink');

const { getBranch } = require('../services/git');

const RepoInfo = ({ repoPath }) => {
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
    <Box marginBottom={1}>
      <Text>
        Repository: {repoPath}
        <Newline />
        Branch: {branch.current}
      </Text>
    </Box>
  );
};

RepoInfo.propTypes = {
  repoPath: PropTypes.string.isRequired,
};

module.exports = RepoInfo;
