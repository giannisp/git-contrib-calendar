/**
 * @file App defined errors.
 */

/* eslint-disable max-classes-per-file */

/**
 * Generic app error handler extending base Error.
 */
class AppError extends Error {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

/**
 * Error for invalid path.
 */
class InvalidPathError extends AppError {
  constructor(path) {
    super('Invalid path');
    this.data = { path };
  }
}

module.exports = {
  AppError,
  InvalidPathError,
};
