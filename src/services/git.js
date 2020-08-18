/**
 * @file Git service.
 */

const simpleGit = require('simple-git');

const { InvalidPathError } = require('../utils/errors');

/**
 * Return a git instance.
 *
 * @param {String} repoPath The local repository path.
 *
 * @return {Object} The git instance.
 */
const getGit = (repoPath) => {
  try {
    return simpleGit(repoPath);
  } catch (error) {
    if (error instanceof simpleGit.GitConstructError) {
      throw new InvalidPathError(repoPath);
    }

    throw error;
  }
};

exports.getGit = getGit;

/**
 * Return if path is an actual git repository.
 *
 * @param {String} repoPath The local repository path.
 *
 * @return {Promise<Boolean>} If path is a git repository.
 */
const isGitRepo = async (repoPath) => {
  const git = getGit(repoPath);

  return git.checkIsRepo();
};

exports.isGitRepo = isGitRepo;

/**
 * Return branch data.
 *
 * @param {String} repoPath The local repository path.
 * @param {Object} options The branch command options.
 *
 * @return {Promise<Object>} The branch data.
 */
const getBranch = async (repoPath, options) => {
  const git = getGit(repoPath);

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
  const git = getGit(repoPath);

  return git.log(options);
};

exports.getLog = getLog;
