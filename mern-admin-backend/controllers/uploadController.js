
const csv = require('csvtojson');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const Task = require('../models/Task');
const Agent = require('../models/Agent');

// Parse file and distribute tasks
exports.uploadAndDistribute = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    let records = [];

    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === '.csv') {
      records = await csv().fromFile(file.path);
    } else if (ext === '.xlsx' || ext === '.xls') {
      const workbook = xlsx.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      records = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    } else {
      return res.status(400).json({ message: 'Invalid file format' });
    }

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    if (!records.length) {
      return res.status(400).json({ message: 'No records found in file' });
    }

    // Get 5 agents
    const agents = await Agent.find().limit(5);
    if (agents.length < 1) return res.status(400).json({ message: 'No agents found' });

    // Distribute tasks round-robin
    const tasksToInsert = records.map((record, index) => {
      const agent = agents[index % agents.length];
      return {
        firstName: record.FirstName,
        phone: record.Phone,
        notes: record.Notes,
        assignedTo: agent._id
      };
    });

    await Task.insertMany(tasksToInsert);

    res.status(200).json({ message: 'Tasks uploaded and distributed successfully', total: tasksToInsert.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};