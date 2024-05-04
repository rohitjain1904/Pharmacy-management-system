const mongoose = require('mongoose');

// Define a schema for the counter collection
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 }
});

// Define a model for the counter collection
const Counter = mongoose.model('Counter', counterSchema);

// Define the invoice schema
const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: Number, unique: true },
  invoiceDate: { type: Date, required: true },
  customer: {
    type: {
      name: String,
      mobileNumber: String,
      email: String,
      address: String,
    },
    required: true,
  },
  billItems: [{
    medicine: {
      type: {
        name: String,
        pricePerUnit: Number,
      },
      required: true,
    },
    quantity: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
});

// Pre-save hook to auto-increment the invoiceNumber field
invoiceSchema.pre('save', async function(next) {
  try {
    if (!this.isNew) return next();

    const counter = await Counter.findByIdAndUpdate(
      { _id: 'invoiceNumber' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    this.invoiceNumber = counter.sequence_value;
    next();
  } catch (error) {
    next(error);
  }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
