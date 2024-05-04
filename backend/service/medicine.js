const express = require('express');
const router = express.Router();
const Medicine = require('../model/Medicine');

router.post('/medicine', async (req, res) => {
  try {
    const { name, companyName, quantity, pricePerUnit, expiryDate } = req.body;
    const findExist = await Medicine.findOne({ name });
    if (findExist) {
      return res.status(403).send({ message: 'Already Exist' });
    }
    const newMedicine = new Medicine({ name, companyName, quantity, pricePerUnit, expiryDate });
    await newMedicine.save();
    return res.status(201).json({ success: true, message: 'Medicine added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getMedicines', async (req, res) => {
  try {
    
    const medicines = await Medicine.find();
    if (!medicines || medicines.length === 0) {
      return res.status(404).json({ message: 'No medicines found' });
    }
    res.status(200).json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/medicines/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findOne({_id: req.params.id });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json(medicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/medicines/:id', async (req, res) => {
  try {
    const { name, companyName, quantity, pricePerUnit, expiryDate } = req.body;
    const medicine = await Medicine.findOne({ _id: req.params.id });
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    medicine.name = name;
    medicine.companyName = companyName;
    medicine.quantity = quantity;
    medicine.pricePerUnit = pricePerUnit;
    medicine.expiryDate = expiryDate;
    await medicine.save();
    res.status(200).json({ success: true, message: 'Medicine updated successfully', updatedMedicine: medicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/medicines/:id', async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findOneAndDelete({ _id: req.params.id });
    if (!deletedMedicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json({ success: true, message: 'Medicine deleted successfully', deletedMedicine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
