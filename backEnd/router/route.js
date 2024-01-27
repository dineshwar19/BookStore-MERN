const express = require("express");
const router = express.Router();
const Book = require("../models/books");
// get all the books from the database
router.get("/", async (req, res) => {
  try {
    const db = await Book.find();
    res.status(200).json({
      count: db.length,
      data: db,
    });
  } catch (err) {
    console.log(err.message);
  }
});

// get any one book using params
// app.get("/:id", async (req, res) => {
//   try {
//     const oneBook = await Book.find();
//     res.status(200).json(oneBook[req.params.id]);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// use any one method to fetch the books from the database.

// get book using id of the database like 65b35bc8466fe9d89be80ff8
router.get("/:id", async (req, res) => {
  try {
    const oneBook = await Book.findById(req.params.id);
    res.status(200).json(oneBook);
  } catch (err) {
    console.log(err.message);
  }
});

// to Update a book in the database
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      res.status(400).send("please fill the required fields");
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedBook) {
      res.status(400).json({ error: "No books in that id" });
    }
    updatedBook.save();
    res.status(200).json({ message: "Book has successfully updated" });
  } catch (err) {
    console.log(err.message);
  }
});

// to add any book to the database
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      res.status(400).json({ error: "please fill all the required fields" });
    } else {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishedYear: req.body.publishedYear,
      };
      const book = await Book.create(newBook);
      res.status(200).json({ message: "Book has successfully created" });
    }
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(400).json({ error: "there no book to delete in this id" });
    }
    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
