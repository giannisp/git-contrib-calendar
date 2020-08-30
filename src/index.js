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
const { getDateRange } = require('./utils/date');

/**
 * Run app.
 *
 * @param {String} pathInput The target git repository path.
 * @param {String} author Filter by author.
 * @param {String} yearInput Filter by year.
 */
const run = async (pathInput, author, yearInput) => {
  try {
    const repoPath = path.resolve(pathInput);
    const isRepo = await isGitRepo(repoPath);

    if (!isRepo) {
      console.log('Not a git repository:', repoPath);

      return;
    }

    const year = yearInput ? parseInt(yearInput, 10) : undefined;
    const dateRange = getDateRange(year);

    const App = importJsx('./components/App');

    render(
      <App
        repoPath={repoPath}
        dateFrom={dateRange.from}
        dateTo={dateRange.to}
        year={year}
        author={author}
      />,
    );
  } catch (error) {
    if (error instanceof InvalidPathError) {
      console.log(`${error.message}: ${error.data.path}`);

      return;
    }

    throw error;
  }
};

cli
  .option(
    '-p, --path <path>',
    'Path to any local git repository (example: -p /path/to/repo)',
    process.cwd(),
  )
  .option(
    '-a, --author <author>',
    'Filter git commits by author (example: -a John)',
    undefined,
  )
  .option(
    '-y, --year <yyyy>',
    'Display git commits for a specific year (example: -y 2018)',
    undefined,
  )
  .action((cmd) => run(cmd.path, cmd.author, cmd.year));

cli.version(pkg.version, '-v, --version');

cli.parse(process.argv);
