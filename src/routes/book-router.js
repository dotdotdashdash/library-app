const express = require(`express`);
const jwt = require(`jsonwebtoken`);
const BookData = require(`../model/book-model`);

const booksRouter = express.Router();

booksRouter.get(`/`, (req, res)=> {

  BookData.find()
    .then((books)=> {
      // console.log('Success', succ);
      if(books.length == 0) {
        res.status(200).json({
          status: false,
          result: `No books in DB`
        });
      } else {
        res.status(200).json({
          status: true,
          result: books
        });
      }
    })
    .catch((err)=> {
      // console.log(err);
      res.status(500).json({
        status: false,
        result: `Server error`
      });
    });
});

module.exports = booksRouter;

