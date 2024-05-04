const mongoose = require('mongoose');

// Define a separate schema for managing the sequence
const sequenceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 }
});

// Define a model for the sequence schema
const Sequence = mongoose.model('Sequence', sequenceSchema);

// Define the customer schema
const customerSchema = new mongoose.Schema({
  userID: {
    type: Number, // ID field
    unique: true // Ensure uniqueness
  },
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Define a pre-save hook to generate the sequential ID
customerSchema.pre('save', async function(next) {
  try {
    if (!this.userID) {
      const sequence = await Sequence.findByIdAndUpdate(
        { _id: 'userID' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.userID = sequence.sequence_value;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
