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

    const user = await User.findOne({userName});
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const transaction  = await Transaction.create({
        bookId: book._id,
        userId: user._id,
        issueDate
    })
    if(!transaction){
        res.status(400);
        throw new Error("Cannot create transaction data");
    }

    const populatedTransaction = await Transaction.findById(transaction._id)
    .populate('userId','name email')
    .populate('bookId','bookName')

    res.status(201).json(populatedTransaction);

})

const returnBook = asyncHandler(async (req, res) => {
    const { bookName, userName, returnDate } = req.body;

    
    const book = await Book.findOne({ bookName });
    if (!book) return 
        res.status(404).json({ message:'Book not found'});

    const user = await User.findOne({userName});
    if (!user) return r
        res.status(404).json({ message:'User not found'});

    const transaction = await Transaction.findOne({
        bookId: book._id,
        userId: user._id,
        returnDate: null
    });

    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

    const issueDate = new Date(transaction.issueDate);
    const return_Date = new Date(returnDate);
    const daysRented = Math.ceil((return_Date - issueDate) / (1000 * 60 * 60 * 24));
    const totalRent = daysRented * book.rentPerDay;

    transaction.returnDate = returnDate;
    transaction.totalRent = totalRent;
    await transaction.save();

    res.json({ message: 'Book returned successfully', totalRent });
});

const getIssueHistory = asyncHandler(async (req,res) => {
    const {bookName} = req.query;

    const book = await Book.findOne({bookName});
    if(!book) {
        res.status(404);
        throw new Error('Book not found');
    }

    const transactions = await Transaction.find({bookId: book._id})
        .populate('userId', 'name email')
        .populate('bookId', 'bookName');
        
    const total = transactions.length;
    const currentHolder = transactions.find(transaction => !transaction.returnDate);

    res.json({
        totalCount,
        currentHolder: currentHolder ? currentHolder.userId : 'No one currently holds this book'
    });

})

const getTotalRent = asyncHandler(async(req,res)=>{
    const {bookName} = req.query;

    const book = await Book.findOne({bookName});
    if(!book){

    }

    const transactions = await Transaction.find({bookId:book._id});
    const total = transactions.reduce((sum, transaction) => sum + (transaction.totalRent || 0), 0);

    res.json({total});

})

const getIssuedBooks = asyncHandler(async(req,res)=>{
    const { userId, userName } = req.query;
    if(!userId||!userName) {
        res.status(400);
        throw new Error("Please enter all required fields"); 
    }
    let user;

    if(userId){
        user = await User.findById(userId);
    }
    else{
        user = await User.findOne({userName})
    }

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    const transactions = await Transaction.find({ userId: user._id })
    .populate('bookId', 'bookName')
    .populate('userId','userName')
    res.json(transactions);

})

const getIssuedBooksByRange = asyncHandler(async(req,res)=>{
    const { startDate, endDate } = req.query;

    const transactions = await Transaction.find({
        issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
    })
    .populate('userId', 'name')
    .populate('bookId', 'bookName');

    res.json(transactions);

})

module.exports = {issueBook,returnBook,getIssueHistory
    ,getTotalRent,getIssuedBooks,
    getIssuedBooksByRange
}