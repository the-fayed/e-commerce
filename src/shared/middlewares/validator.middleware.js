const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.CONFLICT).json({ errors: errors.array() });
  }
  next();
};

module.exports = validator;