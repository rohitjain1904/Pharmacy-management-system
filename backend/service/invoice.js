const express = require('express');
const router = express.Router();
const Invoice = require('../model/Invoice');

// Create a new invoice
router.post('/invoices', async (req, res) => {
  try {
    const newInvoice = await Invoice.create(req.body);
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all invoices
router.get('/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    console.error('Get all invoices error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//delete invoice 
router.delete('/invoice/:id',async (req,res) => {
  try {
    const result = await Invoice.deleteOne({_id:req.params.id});
    if(result){
      return res.status(200).send({message:'Invoice Deleted Successfully.'})
    }
  } catch(error){
    return res.status(500).send({message:'Internal Server Error'});
  }
})

// Get an invoice by ID
router.get('/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ invoiceNumber: req.params.id });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error('Get invoice by ID error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
