class UnauthorizedError extends Error {

  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
    this.code = 401;
    this.status = 401;
  }

};

module.exports = UnauthorizedError;