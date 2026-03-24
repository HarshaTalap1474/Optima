const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { calculatePriority } = require('../utils/priority');

// GET /tasks -> return all tasks
router.get('/', async (req, res) => {
  try {
    // We could recalculate priority on GET for all tasks, but that could be slow for many.
    // However, the requirement is "This calculation should run whenever tasks are displayed, not just when created."
    // And "Move the priority calculation logic to the backend so that every stored task includes a computed priority value."
    // Let's recalculate and update on fetch, or just compute and return. Requirements say "stored task includes computed priority value.", so updating before return makes sense.
    
    // First fetch all non-completed tasks (completed tasks don't need priority updates generally, or if they do, we can update them all).
    // Let's update all tasks before sending.
    const tasks = await Task.find();
    
    // Recalculate and save
    const updatedTasks = await Promise.all(tasks.map(async (task) => {
      if (!task.completed) {
        const newPriority = calculatePriority(task.deadline, task.time, task.importance);
        if (task.priority !== newPriority) {
          task.priority = newPriority;
          return task.save();
        }
      }
      return task;
    }));

    // Sort by priority descending (highest priority first)
    updatedTasks.sort((a, b) => b.priority - a.priority);
    res.json(updatedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /tasks -> create a new task
router.post('/', async (req, res) => {
  try {
    const { title, deadline, time, importance } = req.body;
    
    // Automatically calculate priority before saving
    const priority = calculatePriority(deadline, time, importance);

    const newTask = new Task({
      title,
      deadline,
      time,
      importance,
      priority
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /tasks/:id -> update task (including completion status)
router.put('/:id', async (req, res) => {
  try {
    const { title, deadline, time, importance, completed } = req.body;
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title !== undefined) task.title = title;
    if (deadline !== undefined) task.deadline = deadline;
    if (time !== undefined) task.time = time;
    if (importance !== undefined) task.importance = importance;
    if (completed !== undefined) task.completed = completed;

    // Recalculate priority if dealing with active tasks
    if (!task.completed) {
      task.priority = calculatePriority(task.deadline, task.time, task.importance);
    } else {
      task.priority = 0; // Completed tasks can have lowest priority
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /tasks/:id -> delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
