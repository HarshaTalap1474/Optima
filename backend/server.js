require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');

const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Serve frontend assets statically in production
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendBuildPath));

  // SPA routing: redirect all other requests to index.html
  app.get('*any', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  // Root route for development API description
  app.get('/', (req, res) => {
    res.send('Optima API is running in development mode');
  });
}

// Setup MongoDB Server and connect
const startServer = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    let mongoServer;

    if (!mongoUri) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('MONGODB_URI or MONGO_URI environment variable is required in production.');
      }
      console.log('No MONGODB_URI provided. Starting MongoDB Memory Server for development...');
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
    }
    
    await mongoose.connect(mongoUri);
    console.log(mongoServer ? 'Connected to In-Memory MongoDB successfully' : 'Connected to MongoDB database successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
