const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubacoModuleSchema = new Schema({
  token : {
    type   : String,
    unique : true
  },
  user_id : { 
    type : Schema.Types.ObjectId, 
    ref  : 'User' 
  }
}, {
  timestamps : { createdAt : 'created_at' } 
});

mongoose.Promise = global.Promise; // set global Promise
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/subaco', { useMongoClient : true });

module.exports = mongoose.model('SubacoModule', SubacoModuleSchema);
