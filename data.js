const mongoose = require('mongoose');
const User = require('./src/models/user.model.js');  
const Book = require('./src/models/books.models.js'); 
const dotenv = require('dotenv');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const usersData = [
  { name: "Alice Johnson", email: "alice@example.com" },
  { name: "Bob Smith", email: "bob@example.com" },
  { name: "Carol Davis", email: "carol@example.com" },
  { name: "David Lee", email: "david@example.com" },
  { name: "Eve Turner", email: "eve@example.com" }
];

const booksData = [
  { bookName: "The Great Adventure", category: "Fiction", rentPerDay: 5 },
  { bookName: "Learning JavaScript", category: "Programming", rentPerDay: 3 },
  { bookName: "The Art of War", category: "History", rentPerDay: 4 },
  { bookName: "Node.js Design Patterns", category: "Programming", rentPerDay: 6 },
  { bookName: "The Science of Sleep", category: "Science", rentPerDay: 2 },
  { bookName: "The Silent Patient", category: "Thriller", rentPerDay: 4 },
  { bookName: "Atomic Habits", category: "Self-Help", rentPerDay: 3 },
  { bookName: "1984", category: "Fiction", rentPerDay: 5 },
  { bookName: "Becoming", category: "Biography", rentPerDay: 4 },
  { bookName: "Sapiens", category: "History", rentPerDay: 5 },
  { bookName: "Clean Code", category: "Programming", rentPerDay: 7 },
  { bookName: "The Pragmatic Programmer", category: "Programming", rentPerDay: 6 },
  { bookName: "The Power of Habit", category: "Self-Help", rentPerDay: 4 },
  { bookName: "Educated", category: "Biography", rentPerDay: 5 },
  { bookName: "The Psychology of Money", category: "Finance", rentPerDay: 3 },
  { bookName: "Deep Work", category: "Self-Help", rentPerDay: 4 },
  { bookName: "Thinking, Fast and Slow", category: "Psychology", rentPerDay: 5 },
  { bookName: "The Catcher in the Rye", category: "Fiction", rentPerDay: 4 },
  { bookName: "The Lean Startup", category: "Business", rentPerDay: 6 },
  { bookName: "The Innovator's Dilemma", category: "Business", rentPerDay: 5 }
];

const enterData = async () => {
  try {
    
    await User.insertMany(usersData); 
    await Book.insertMany(booksData); 

    console.log("Data successfully inserted!");
    process.exit();
    
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
};

enterData();
