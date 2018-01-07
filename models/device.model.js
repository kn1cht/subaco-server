const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  name        : String,
  serial      : String,
  last_charge : Date,
  user_id     : { 
    type : Schema.Types.ObjectId, 
    ref  : 'User' 
  },
  alert_enabled : {
    type    : Boolean,
    default : true
  }
}, {
  timestamps : { createdAt : 'created_at' } 
});

mongoose.Promise = global.Promise; // set global Promise
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/subaco', { useMongoClient : true });

module.exports = mongoose.model('Device', DeviceSchema);
