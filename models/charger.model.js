const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChargerSchema = new Schema({
  name           : String,
  last_charge    : Date,
  last_discharge : Date,
  residual       : Number, // mAh
  capacity       : Number, // mAh
  user_id        : { 
    type : Schema.Types.ObjectId, 
    ref  : 'User' 
  },
  alert_enabled : {
    type    : Boolean,
    default : false
  }
}, {
  timestamps : { createdAt : 'created_at' } 
});

mongoose.Promise = global.Promise; // set global Promise
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/subaco', { useMongoClient : true });

module.exports = mongoose.model('Charger', ChargerSchema);