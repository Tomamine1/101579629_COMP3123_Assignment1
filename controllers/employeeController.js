
const Employee = require('../models/Employee');

const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({
      createdBy: req.user.userId
    });

    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const { first_name, last_name, email, position, salary } = req.body;

    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      position,
      salary,
      createdBy: req.user.userId
    });

    return res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.eid,
      createdBy: req.user.userId
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID'
      });
    }
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const allowedFields = [
      'first_name',
      'last_name',
      'email',
      'position',
      'salary'
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Provide at least one field to update'
      });
    }

    const employee = await Employee.findOneAndUpdate(
      {
        _id: req.params.eid,
        createdBy: req.user.userId
      },
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID or field value'
      });
    }
    if (error.name === 'ValidationError' || error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Invalid data or employee email already exists'
      });
    }
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { eid } = req.query;

    if (!eid) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID (eid) is required'
      });
    }

    const employee = await Employee.findOneAndDelete({
      _id: eid,
      createdBy: req.user.userId
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    return res.status(204).send();
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID'
      });
    }
    next(error);
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};
