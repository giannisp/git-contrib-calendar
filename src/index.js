/**
 * @file App entrypoint.
 */

const React = require('react');
const { render } = require('ink');
const importJsx = require('import-jsx');

const repoPath = process.argv[2] || process.cwd();
const author = process.argv[3] || undefined;

const App = importJsx('./components/App');

render(<App repoPath={repoPath} author={author} />);
