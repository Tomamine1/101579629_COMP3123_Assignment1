
const express = require('express');
const { param, query, body } = require('express-validator');

const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

router.use(authMiddleware);

const employeeValidation = [
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required'),
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email is required')
    .normalizeEmail(),
  body('position')
    .trim()
    .notEmpty()
    .withMessage('Position is required'),
  body('salary')
    .isFloat({ min: 0 })
    .withMessage('Salary must be a number greater than or equal to 0')
];

const employeeIdValidation = [
  param('eid')
    .isMongoId()
    .withMessage('A valid employee ID is required')
];

router.get('/employees', getEmployees);

router.post(
  '/employees',
  employeeValidation,
  validateRequest,
  createEmployee
);

router.get(
  '/employees/:eid',
  employeeIdValidation,
  validateRequest,
  getEmployeeById
);

router.put(
  '/employees/:eid',
  employeeIdValidation,
  validateRequest,
  updateEmployee
);

router.delete(
  '/employees',
  query('eid')
    .isMongoId()
    .withMessage('A valid employee ID (eid) is required'),
  validateRequest,
  deleteEmployee
);

module.exports = router;
