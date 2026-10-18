const { body } = require('express-validator');

const signupValidation = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),

  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
];

const loginValidation = [
  body().custom((value) => {
    if (!value || (!value.username && !value.email)) {
      throw new Error('Username or email is required');
    }
    return true;
  }),

  body('password')
    .isString()
    .notEmpty()
    .withMessage('Password is required')
];

module.exports = { signupValidation, loginValidation };
