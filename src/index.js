/**
 * @file App entrypoint.
 */

const path = require('path');
const React = require('react');
const { render } = require('ink');
const importJsx = require('import-jsx');
const cli = require('commander');

const pkg = require('../package.json');

cli
  .option('-p, --path <path>', 'Git repository path', process.cwd())
  .option('-a, --author <author>', 'Filter git commits by author', undefined)
  .action((cmd) => {
    const repoPath = path.resolve(cmd.path);

    const App = importJsx('./components/App');

    render(<App repoPath={repoPath} author={cmd.author} />);
  });

cli.version(pkg.version, '-v, --version');

cli.parse(process.argv);
