const mongoose = require('mongoose');
const mongoDbServer = process.env.MONGODB_URI || 'mongodb://localhost:27017/LibraryApp';

mongoose.connect(mongoDbServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title : {
    type: String,
    index: true
  },
  author: {
    type: String,
    index: true
  },
  language: String,
  imageUrl: String,
  about: String
});


const BookData = mongoose.model('bookdata', BookSchema);

module.exports = BookData;