const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadAndDistribute } = require('../controllers/uploadController');

// Multer setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.csv', '.xlsx', '.xls'];
  const ext = path.extname(file.originalname).toLowerCase();
  cb(null, allowed.includes(ext));
};

const upload = multer({ storage, fileFilter });

// Final route with logic
router.post('/upload', authMiddleware, upload.single('file'), uploadAndDistribute);

module.exports = router;
