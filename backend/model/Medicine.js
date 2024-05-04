const mongoose = require('mongoose');



const medicineSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date, // Add expiry date field
    required: true
  }
});


const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
