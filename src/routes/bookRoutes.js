/*
INPUT - book name or a term in the name of the book
OUTPUT - list of all the books with that name or term in the book name

INPUT - rent price range
OUTPUT - list of books with rent in that range

INPUT - category + name/term + rent per day(range)
OUTPUT - list of books with matching values as in input

*/

const express = require("express")
const router  = express.Router();
const {getBooksbyName,getBooksbyRange,getBooksbyFilters} = require('../controllers/book.controllers')

router.get('/find',getBooksbyName);
router.get('/rent',getBooksbyRange);
router.get('/filter',getBooksbyFilters)

module.exports = router;