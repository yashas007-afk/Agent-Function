const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

exports.createAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Agent already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newAgent = new Agent({ name, email, mobile, password: hashed });
    await newAgent.save();

    res.status(201).json({ message: 'Agent created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
