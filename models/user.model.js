const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username : {
    required : true,
    type     : String,
    unique   : true
  },
  email : {
    lowercase : true,
    required  : true,
    type      : String,
    unique    : true
  },
  password : String,
  is_admin : {
    default : false,
    type    : Boolean
  },
  is_charging : {
    default : false,
    type    : Boolean
  },
  active_charger_id : {
    type     : Schema.Types.ObjectId,
    ref      : 'Charger',
    required : true
  }
});

mongoose.Promise = global.Promise; // set global Promise
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/subaco', { useMongoClient : true });

module.exports = mongoose.model('User', UserSchema);
