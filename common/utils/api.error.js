class ApiError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statuscode = statuscode;
    // eslint-disable-next-line no-self-assign
    this.stack = this.stack;
    this.status = `${statuscode}`.startsWith(4) ? `fail` : `error`;
    this.isOperational = true
  }
}

module.exports = ApiError;