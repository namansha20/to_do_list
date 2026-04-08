const { body, validationResult } = require('express-validator');

const taskValidationRules = () => [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Task title cannot be empty'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.validationErrors = errors.array();
    return next();
  }
  next();
};

module.exports = { taskValidationRules, validate };
