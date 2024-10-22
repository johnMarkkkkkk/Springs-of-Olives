const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerId: String,
    name: String,
    phone: String,
    email: String,
    totalPoints: Number,
    pointsInKsh: Number,
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
