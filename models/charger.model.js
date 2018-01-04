const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChargerSchema = new Schema({
  charger_name   : String,
  charger_serial : String,
  last_charge    : Date,
  last_discharge : Date,
  charger_soc    : Number,
  user_id        : { 
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

module.exports = mongoose.model('Charger', ChargerSchema);