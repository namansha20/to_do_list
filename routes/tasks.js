const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { taskValidationRules, validate } = require('../middleware/validation');

router.get('/', taskController.index);
router.get('/new', taskController.newForm);
router.post('/', taskValidationRules(), validate, taskController.create);
router.get('/:id/edit', taskController.editForm);
router.put('/:id', taskValidationRules(), validate, taskController.update);
router.patch('/:id/complete', taskController.complete);
router.delete('/:id', taskController.destroy);

module.exports = router;
