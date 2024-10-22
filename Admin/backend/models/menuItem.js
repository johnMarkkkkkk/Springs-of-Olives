const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    image: String,
    title: String,
    price: Number,
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
