const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create goal
router.post('/', async (req, res) => {
  try {
    const { text, user } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });
    const goal = new Goal({ text, user });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update goal
router.put('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
