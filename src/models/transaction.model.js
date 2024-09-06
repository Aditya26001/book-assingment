const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    issueDate: { type: Date, required: true },
    returnDate: Date,
    totalRent: Number
}, 
    { timestamps: true }

);

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;
