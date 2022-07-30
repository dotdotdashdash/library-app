const mongoose = require('mongoose');
const mongoDbServer = process.env.MONGODB_URI || 'mongodb://localhost:27017/LibraryApp';

mongoose.connect(mongoDbServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((succ)=>{
  console.log(`MongoDB connection successfull! Connected to server at ${mongoDbServer}`);
}).catch((err)=> {
  console.log(`MongoDB connection error! Can't connect to ${mongoDbServer}`);
});

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title : String,
  author: String,
  image: String,
  about: String
});


const BookData = mongoose.model('bookdata', BookSchema);

module.exports = BookData;