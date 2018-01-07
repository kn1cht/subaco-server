const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChargeSchema = new Schema({
  start_time : {
    type     : Date,
    required : true
  },
  update_time : Date,
  current     : {
    type : Number,
    min  : 0
  },
  capacity : {
    type    : Number,
    default : 0,
    min     : 0
  },
  user_id : { 
    type : Schema.Types.ObjectId, 
    ref  : 'User' 
  },
  device_id : {
    type : Schema.Types.ObjectId, 
    ref  : 'Device' 
  },
  charger_id : { 
    type : Schema.Types.ObjectId, 
    ref  : 'Charger' 
  },
  module_id : { 
    type : Schema.Types.ObjectId, 
    ref  : 'Charger' 
  },
  data_count : Number,
  state      : Number, // 0: end 1: start 2: ongoing
  enabled    : {
    type    : Boolean,
    default : true
  }
}, {
  timestamps : { createdAt : 'created_at' } 
});

mongoose.Promise = global.Promise; // set global Promise
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/subaco', { useMongoClient : true });

module.exports = mongoose.model('Charge', ChargeSchema);
