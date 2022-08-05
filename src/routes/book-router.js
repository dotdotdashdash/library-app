const express = require(`express`);
const jwt = require(`jsonwebtoken`);
const BookData = require(`../model/book-model`);

const booksRouter = express.Router();

verifyToken = (req, res, next)=> {

  if(!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      error: `Unauthorized request`
    });
  }

  let token = req.headers.authorization.split(' ')[1]
  if(token == null) {
    return res.status(401).json({
      success: false,
      error: `Unauthorized request`
    });
  }

  jwt.verify(token, `secretKey`, (err, succ)=> {
    if(err) {
      // console.log('ERROR:--> JWT Verification', err.message);
      return res.status(401).json({
        success: false,
        error: err.message
      });
    } else {
      // console.log('SUCCESS:--> JWT Verification', succ); 
      // req.userId = payload.subject;
      next();
    }
  });
  
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

booksRouter.get(`/:id`, (req, res)=> {
  // console.log(req.params.id);

  BookData.findOne({'_id': req.params.id})
    .then((book)=> {
      console.log(`GET: Get a book: ${book.title}`);
      res.status(200).json({
        endpoint : '/api/books/:id',
        success : true,
        response : book
      });
    }).catch((err)=> {
      console.log(`GET: Get a book ERROR ${err.message}`);
      res.status(404).json({
        endpoint : '/api/books/:id',
        success : false,
        response : 'Book with the id not found'
      });
    });

});

booksRouter.post(`/add`, verifyToken, (req,res)=> {
  // console.log('POST: Add book: L:88', req.body);

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
      console.log(`SUCCESS: (New book added)--> ${book.title}`);
      res.status(200).json({
        success: true,
        bookId: book._id,
        endpoint: '/api/books/add',
        result: `Successfully added ${book.title}`
      });
    }).catch((error)=> {
      console.log('ERROR: (New Book)-->', error.code);
      res.status(501).json({
        success: false,
        result: `Add book failed`,
        endpoint: '/api/books/add',
        error: error.code
      });
    });

});

booksRouter.put(`/update`,verifyToken, (req, res)=> {
  // console.log(req.body);

  BookData.findByIdAndUpdate({ "_id": req.body._id }, { $set: req.body }, { new: true}, 
    (err, book)=> {
      if(err) {
        console.log('ERROR: (Updata Book)-->', err.message);
        res.status(501).json({
          success: false,
          result: `Update operation failed`,
          endpoint: '/api/books/update',
          error: err.message
        });
      } else {
        console.log(`SUCCESS: (Update Book)--> ${book.title}`);
        res.status(200).json({
          success: true,
          bookId: book._id,
          endpoint: '/api/books/update',
          result: `Successfully updated ${book.title}`
        });
      }
    }
  );
});

booksRouter.delete(`/delete/:id`, verifyToken, (req, res)=> {

  BookData.deleteOne({_id: req.params.id})
    .then((succ)=> {
      console.log(`DELETED: (${req.params.id}) ---->`, succ);
      res.status(200).json({
        success: true,
        result: `Succesfully deleted`,
        response: succ
      });
    }).catch((err)=> {
      console.log(err.message);
      res.status(501).json({
        success: false,
        result: `Delete failed`,
        error: err.message
      });
    });
});


module.exports = booksRouter;

