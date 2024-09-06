/*
INPUT - book name or a term in the name of the book
OUTPUT - list of all the books with that name or term in the book name

INPUT - rent price range
OUTPUT - list of books with rent in that range

INPUT - category + name/term + rent per day(range)
OUTPUT - list of books with matching values as in input

*/
const Book = require('../models/books.models.js')

const getBooksbyName = (async (req,res)=>{

    const find = req.query.name;
    const books = await Book.find({bookName:{ $regex:find , options:'i'}});
    res.json(books);
})

const getBooksbyRange = (async(req,res)=>{

    const {minRent , maxRent} = req.query;
    const books = await Book.find({
        rentPerDay:{
            $gte : parseInt(minRent) , $lte : parseInt(maxRent)
        }
    })

    res.json(books);
})

const getBooksbyFilters = (async(req,res)=>{
    const {category,name,minRent,maxRent} = req.query;
    const books = await Book.find({
        category : category,
        bookName:{ $regex:find , options:'i'},
        rentPerDay:{
            $gte : parseInt(minRent) , $lte : parseInt(maxRent)
        }
    })
    res.json(books);
})

module.exports = {getBooksbyName,getBooksbyRange,getBooksbyFilters}