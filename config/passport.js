const passport = require('passport');
const User = require('../models/user.model');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    }, (err) => {
      done(err, null);
    });
  });

  passport.use(require('./passport/local'));
};