const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username : {
    type   : String,
    unique : true
  },
  email : {
    type      : String,
    lowercase : true,
    unique    : true
  },
  password : String,
  admin    : {
    type    : Boolean,
    default : false
  }
});

mongoose.Promise = global.Promise; // set global Promise
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/subaco', { useMongoClient : true });

module.exports = mongoose.model('User', UserSchema);