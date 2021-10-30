/**
 * @file CLI utils.
 */

const path = require('path');
const { program } = require('commander');

const pkg = require('../../package.json');
const { getDateRange } = require('./date');

/**
 * Init command-line interface.
 */
exports.initCli = () => {
  program
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
    );

  program.version(pkg.version, '-v, --version');

  program.parse(process.argv);
};

/**
 * Return command-line options.
 *
 * @return {Object} The options.
 */
exports.getCliOptions = () => {
  const options = program.opts();

  const repoPath = path.resolve(options.path);
  const year = options.year ? parseInt(options.year, 10) : undefined;
  const dateRange = getDateRange(year);

  return { repoPath, year, dateRange, author: options.author };
};
