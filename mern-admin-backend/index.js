const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// Routes


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware

app.use(express.json());
app.use(cors());


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const agentRoutes = require('./routes/agentRoutes');
app.use('/api/agents', agentRoutes);
const uploadRoutes = require('./routes/uploadRoutes');

// Below other routes
app.use('/api/uploads', uploadRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);




// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then((conn) => {
  console.log(`✅ MongoDB connected to database: ${conn.connection.name}`);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// API Routes

app.post('/test', (req, res) => {
  res.json({ msg: 'POST route working', body: req.body });
});



// Test Route
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🌐 Server is running on http://localhost:${PORT}`);
});
