const express = require('express');
const rateLimit = require('express-rate-limit');
const { signup, login } = require('../controllers/userController');
const { signupValidation, loginValidation } = require('../validators/userValidator');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.'
  }
});

router.post('/signup', authLimiter, signupValidation, validateRequest, signup);
router.post('/login', authLimiter, loginValidation, validateRequest, login);

module.exports = router;
