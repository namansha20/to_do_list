const Task = require('../models/task');

// GET /tasks - list all tasks
exports.index = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.render('index', { tasks, error: null });
  } catch (err) {
    res.render('index', { tasks: [], error: 'Failed to load tasks.' });
  }
};

// GET /tasks/new - render create form
exports.newForm = (req, res) => {
  res.render('form', { task: null, errors: [], formAction: '/tasks', method: 'POST' });
};

// POST /tasks - create a task
exports.create = async (req, res) => {
  if (req.validationErrors) {
    return res.render('form', {
      task: req.body,
      errors: req.validationErrors,
      formAction: '/tasks',
      method: 'POST',
    });
  }
  try {
    const { title, description, dueDate, category } = req.body;
    await Task.create({
      title,
      description,
      dueDate: dueDate || null,
      category,
    });
    res.redirect('/tasks');
  } catch (err) {
    res.render('form', {
      task: req.body,
      errors: [{ msg: 'Could not create task. Please try again.' }],
      formAction: '/tasks',
      method: 'POST',
    });
  }
};

// GET /tasks/:id/edit - render edit form
exports.editForm = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).render('error', { message: 'Task not found.' });
    }
    res.render('form', {
      task,
      errors: [],
      formAction: `/tasks/${task._id}?_method=PUT`,
      method: 'POST',
    });
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to load task.' });
  }
};

// PUT /tasks/:id - update a task
exports.update = async (req, res) => {
  if (req.validationErrors) {
    return res.render('form', {
      task: { ...req.body, _id: req.params.id },
      errors: req.validationErrors,
      formAction: `/tasks/${req.params.id}?_method=PUT`,
      method: 'POST',
    });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).render('error', { message: 'Task not found.' });
    }
    const { title, description, dueDate, category } = req.body;
    task.title = title;
    task.description = description;
    task.dueDate = dueDate || null;
    task.category = category;
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    res.render('form', {
      task: { ...req.body, _id: req.params.id },
      errors: [{ msg: 'Could not update task. Please try again.' }],
      formAction: `/tasks/${req.params.id}?_method=PUT`,
      method: 'POST',
    });
  }
};

// PATCH /tasks/:id/complete - mark task as completed
exports.complete = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).render('error', { message: 'Task not found.' });
    }
    if (task.completed) {
      return res.status(400).render('error', { message: 'Task is already marked as completed.' });
    }
    task.completed = true;
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to update task.' });
  }
};

// DELETE /tasks/:id - delete a task
exports.destroy = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).render('error', { message: 'Task not found.' });
    }
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).render('error', { message: 'Failed to delete task.' });
  }
};
