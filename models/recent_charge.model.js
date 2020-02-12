/* manage recently started or ended charge events */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recentChargeSchema = new Schema({
  is_charging : {
    default  : false,
    required : true,
    type     : Boolean
  },
  user_id : {
    type     : Schema.Types.ObjectId,
    ref      : 'User',
    required : true
  }
}, {
  capped : 1048576 // = 1 MB
});

mongoose.Promise = global.Promise; // set global Promise
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/subaco', { useMongoClient : true });

module.exports = mongoose.model('RecentCharge', recentChargeSchema);
