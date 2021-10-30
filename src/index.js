/**
 * @file App entrypoint.
 */

/* eslint-disable no-console */

const fs = require('fs');
const React = require('react');
const { render } = require('ink');
const importJsx = require('import-jsx');

const { initCli, getCliOptions } = require('./utils/cli');

initCli();

const { repoPath, year, dateRange, author } = getCliOptions();

if (!fs.existsSync(repoPath)) {
  console.log(`Invalid path: ${repoPath}`);

  process.exit();
}

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
