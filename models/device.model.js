const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  device_name   : String,
  device_serial : String,
  last_charge   : Date,
  user_id       : { 
    type : Schema.Types.ObjectId, 
    ref  : 'User' 
  },
  alert_enabled : {
    type    : Boolean,
    default : false
  }
});

mongoose.Promise = global.Promise; // set global Promise
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/subaco', { useMongoClient : true });

module.exports = mongoose.model('Device', DeviceSchema);