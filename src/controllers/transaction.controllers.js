const Transaction = require('../models/transaction.model.js')
const Book = require('../models/books.models.js')
const User = require('../models/user.model.js')
const asyncHandler = require("express-async-handler")


const issueBook = asyncHandler(async(req,res)=>{
    const {bookName, userName, issueDate} = req.body;

    if(!bookName||!userName||!issueDate) {
        res.status(400);
        throw new Error("Please enter all required fields"); 
    }

    const book = await Book.findOne({bookName});
    if(!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    const user = await User.findOne({name : userName});
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const transaction  = await Transaction.create({
        book: await Book.findById(book._id),
        user: await User.findById(user._id),
        issueDate
    })
    if(!transaction){
        res.status(400);
        throw new Error("Cannot create transaction data");
    }

    const populatedTransaction = await Transaction.findById(transaction._id)
    .populate('user','name')
    .populate('book','bookName')

    res.status(201).json(populatedTransaction);

})

const returnBook = asyncHandler(async (req, res) => {
    const { bookName, userName, returnDate } = req.body;

    const book = await Book.findOne({bookName : bookName });
    if (!book) {
        res.status(404);
        throw new Error("Book not found");
    }

    const user = await User.findOne({name :userName});
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const transaction = await Transaction.findOne({
        book: book._id,
        user: user._id,
        returnDate: null
    });

    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const issueDate = new Date(transaction.issueDate);
    const return_Date = new Date();
    let daysRented = Math.ceil((return_Date - issueDate) / (1000 * 60 * 60 * 24));
     console.log(return_Date);
    if(daysRented==0) daysRented = 1;
    console.log(daysRented)
    const totalRent = daysRented * book.rentPerDay;

    transaction.returnDate = returnDate;
    transaction.totalRent = totalRent;
    await transaction.save();

    res.json({ message: 'Book returned successfully', totalRent });
});

const getIssueHistory = asyncHandler(async (req, res) => {
    const bookName = req.query.bookName;

    if (!bookName) {
        res.status(400);
        throw new Error('Book name is required');
    }

    const book = await Book.findOne({ bookName: bookName });
    if (!book) {
        res.status(404);
        throw new Error('Book not found');
    }
    
    const transactions = await Transaction.find({ book: book._id });
    
    const total = transactions.length;

    const currentHolder = transactions.find(transaction => !transaction.returnDate);
    console.log(currentHolder);
    
    
    res.json({
        total,
        currentHolder: currentHolder ? currentHolder.user : 'No one holds this book'
    });
});


const getTotalRent = asyncHandler(async(req,res)=>{
    const {bookName} = req.query;

    const book = await Book.findOne({bookName});
    console.log(book);
    if(!book){
        res.status(404);
        throw new Error('Book not found')
    }

    const transactions = await Transaction.find({book:book._id});
    console.log(transactions);
    
    const total = transactions.reduce((sum, transaction) => sum + (transaction.totalRent || 0), 0);

    res.json({total});

})
/* check */


const getIssuedBooks = asyncHandler(async(req,res)=>{
    const userName  = req.body.name;

    if(!userName) {
        res.status(400);
        throw new Error("Please enter all required fields"); 
    }
    
    const user = await User.findOne({name : userName})
    
    

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    const transactions = await Transaction.find({ user: user._id })
    .populate('book', 'bookName')
    .populate('user','userName')
    res.json(transactions);

})

const getIssuedBooksByRange = asyncHandler(async(req,res)=>{
    const { startDate, endDate } = req.query;

    const transactions = await Transaction.find({
        issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
    })
    .populate('user', 'name')
    .populate('book', 'bookName');

    res.json(transactions);

})

module.exports = {issueBook,returnBook,getIssueHistory
    ,getTotalRent,getIssuedBooks,
    getIssuedBooksByRange
}