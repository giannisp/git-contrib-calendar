/**
 * @file App entrypoint.
 */

/* eslint-disable no-console */

const path = require('path');
const React = require('react');
const { render } = require('ink');
const importJsx = require('import-jsx');
const cli = require('commander');

const pkg = require('../package.json');
const { isGitRepo } = require('./services/git');
const { InvalidPathError } = require('./utils/errors');

/**
 * Run app.
 *
 * @param {String} pathInput The target git repository path.
 * @param {String} author Filter by author.
 */
const run = async (pathInput, author) => {
  try {
    const repoPath = path.resolve(pathInput);
    const isRepo = await isGitRepo(repoPath);

    if (!isRepo) {
      console.log('Not a git repository:', repoPath);

      return;
    }

    const App = importJsx('./components/App');

    render(<App repoPath={repoPath} author={author} />);
  } catch (error) {
    if (error instanceof InvalidPathError) {
      console.log(`${error.message}: ${error.data.path}`);

      return;
    }

    throw error;
  }
};

cli
  .option('-p, --path <path>', 'Git repository path', process.cwd())
  .option('-a, --author <author>', 'Filter git commits by author', undefined)
  .action((cmd) => run(cmd.path, cmd.author));

cli.version(pkg.version, '-v, --version');

cli.parse(process.argv);
