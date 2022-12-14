const mongoose = require('mongoose');
const mongoDbServer = process.env.MONGODB_URI || 'mongodb://localhost:27017/LibraryApp';

mongoose.connect(mongoDbServer, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((succ)=>{
  console.log(`MongoDB connected at ${mongoDbServer}`, );
}).catch((err)=> {
  console.log(`MongoDB connection error! --->`, err.message);
});

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: String,
    userName: {
      type: String,
      unique: true,
      index: true
    },
    passWord: String
});


const UserData = mongoose.model('userdata', UserSchema);

module.exports = UserData;