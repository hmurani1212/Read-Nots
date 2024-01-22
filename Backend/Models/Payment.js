const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new mongoose.Schema({
    token: String, 
    amount: Number,
    timestamp: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
