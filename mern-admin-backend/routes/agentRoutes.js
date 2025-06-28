const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const { createAgent } = require('../controllers/agentController');

// Add this new import:
const Agent = require('../models/Agent');

// Existing POST route:
router.post('/add', authMiddleware, createAgent);

// New GET route to list agents:
router.get('/', authMiddleware, async (req, res) => {
  try {
    const agents = await Agent.find().select('-password');
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch agents' });
  }
});


module.exports = router;
