const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    customerName: String,
    email: String,
    feedback: String,
    date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
