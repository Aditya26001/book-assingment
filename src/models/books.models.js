const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    bookName: { type: String, required: true },
    category: { type: String, required: true },
    rentPerDay: { type: Number, required: true }
}, 
    { timestamps: true }

);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
