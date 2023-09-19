const Task = require('../models/taskModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

exports.getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ status: 'success', data: tasks });
});

exports.createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

exports.getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(createCustomError(`No task with id : ${req.params.id}`, 404));
  }
  res.status(200).json({ status: 'success', data: task });
});

exports.updateTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${req.params.id}`, 404));
  }
  res.status(200).json({ status: 'success', data: task });
});

exports.deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(createCustomError(`No task with id : ${req.params.id}`, 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
