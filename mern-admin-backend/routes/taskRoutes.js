const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get tasks for a specific agent
router.get('/agent/:agentId', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.agentId }).populate('assignedTo', 'name email');
    res.status(200).json({ count: tasks.length, tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

module.exports = router;
