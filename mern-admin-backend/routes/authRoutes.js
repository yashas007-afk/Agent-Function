// routes/authRoutes.js

const express = require('express');
const router = express.Router();

const { registerAdmin, loginAdmin } = require('../controllers/authController');

// 👇 These should both point to valid functions
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

module.exports = router;
