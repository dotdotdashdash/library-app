const express = require(`express`);
const jwt = require(`jsonwebtoken`);
const BookData = require(`../model/book-model`);

const booksRouter = express.Router();

verifyToken = (req, res, next)=> {

  if(!req.headers.authorization) {
    return res.status(401).send(`Unauthorized Request`);
  }

  console.log(req.headers.authorization.split(' '));

  let token = req.headers.authorization.split(' ')[1]
  if(token == null) {
    return res.status(401).send(`Unauthorized Request`);
  }

  let payload = jwt.verify(token, `secretKey`, (err, succ)=> {
    err ? console.log(err.message) : console.log(succ); ;
  });

  if(!payload) {
    return res.status(401).send(`Unauthorized Request`);
  }

  req.userId = payload.subject;
  next();
  
}

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
    }).catch((err)=> {
      // console.log(err);
      res.status(500).json({
        status: false,
        result: `Server error`
      });
    });
});

booksRouter.delete(`/delete/:id`, (req, res)=> {

  BookData.deleteOne({_id: req.params.id})
    .then((succ)=> {
      console.log(succ);
      res.status(404).json({
        success: true,
        result: `Succesfully deleted`
      });
    }).catch((err)=> {
      console.log(err.message);
      res.status(404).json({
        success: false,
        result: `Delete failed`
      });
    });
});

booksRouter.post(`/add`, verifyToken, (req,res)=> {
  // console.log('POST: Add book: L:34', req.body);

  var book = {
    title : req.body.title,
    author : req.body.author,
    language : req.body.language,
    imageUrl : req.body.imageUrl,
    about : req.body.about,
  }

  var newBook = new BookData(book);
  newBook.save()
    .then((book)=> {
      console.log(`SUCCESS: (New Book)--> ${book.title}`);
      res.status(200).json({
        status: true,
        bookId: book._id,
        endpoint: '/api/books/add',
        result: `Successfully added ${book.title}`
      });
    }).catch((error)=> {
      console.log('ERROR: (New Book)-->', error.code);
      res.json({
        status: false,
        result: `Add book failed`,
        endpoint: '/api/books/add',
        error: error.code
      });
    });

});

module.exports = booksRouter;

