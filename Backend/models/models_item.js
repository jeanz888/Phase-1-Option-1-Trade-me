const mongoose = require('mongoose');

// Define the schema for the item
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Trim whitespace from the name
  },
  description: {
    type: String,
    trim: true // Trim whitespace from the description
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Ensure price is not negative
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Methods or Statics can be added here if needed.
 * Example:
 * itemSchema.methods.methodName = function() { ... };
 */
 
// Create and export the Item model based on the item schema
module.exports = mongoose.model('Item', itemSchema);