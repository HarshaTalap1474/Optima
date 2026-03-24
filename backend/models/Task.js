const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  deadline: {
    type: Date,
    required: true
  },
  time: {
    type: Number, // in minutes
    required: true,
    min: 1
  },
  importance: {
    type: Number, // 1: Low, 2: Medium, 3: High
    required: true,
    enum: [1, 2, 3]
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
