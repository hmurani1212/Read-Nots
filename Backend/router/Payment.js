const express = require('express');
const stripe = require('stripe')('sk_test_51ON9IWGOffRjuiXbCfwShaPB16cpqR8MXlj0vVmJSM12B6W3WfiYks6O85PGCxsHzX1FF5LYEZyttiQyAk20H2nR00FrmHMLpP');
const router= express.Router()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Payment = require('../Models/Payment'); // Adjust the path based on your project structure
router.post('/payment', async (req, res) => {
  const { token, amount } = req.body;

  try {
    const charge = await stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });

    // Save the payment information to the database
    const payment = new Payment({
      token: token.id,
      amount,
    });
    await payment.save();

    res.status(200).json({ success: true, charge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports=router
