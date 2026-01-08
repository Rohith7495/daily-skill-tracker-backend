const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
