const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
name: { type: String, required: true },
description: String,
price: { type: Number, required: true },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', itemSchema);