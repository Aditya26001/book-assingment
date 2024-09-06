/*
-issue book
-return book
-get issue history of a book
-total rent bybook
-books issued to a user
-books issued by range and to person

*/

const express = require("express")
const router = express.Router();
const {issueBook,returnBook,getIssueHistory,getTotalRent,
    getIssuedBooks,getIssuedBooksByRange} = require('../controllers/transaction.controllers')

router.post('/issue',issueBook);
router.post('/return',returnBook);
router.get('/book/history',getIssueHistory);
router.get('/book/rent',getTotalRent);
router.get('/user/book',getIssuedBooks);
router.get('/daterange',getIssuedBooksByRange)

module.exports = router;