function customErrorHandler(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, customErrorHandler);
  }

  return error;
}

module.exports = customErrorHandler;
