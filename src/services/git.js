/**
 * @file Git service.
 */

const simpleGit = require('simple-git');

/**
 * Return branch data.
 *
 * @param {String} repoPath The local repository path.
 * @param {Object} options The branch command options.
 *
 * @return {Promise<Object>} The branch data.
 */
const getBranch = async (repoPath, options) => {
  const git = simpleGit({
    baseDir: repoPath,
  });

  return git.branch(options);
};

exports.getBranch = getBranch;

/**
 * Return log data.
 *
 * @param {String} repoPath The local repository path.
 * @param {Object} options The log command options.
 *
 * @return {Promise<Object>} The log data.
 */
const getLog = async (repoPath, options) => {
  const git = simpleGit({
    baseDir: repoPath,
  });

  return git.log(options);
};

exports.getLog = getLog;
