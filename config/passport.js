const passport = require('passport');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    /*db.User.findById(id).then((user) => {
      done(null, user);
    }, (err) => {
      done(err, null);
    });*/
    done(null, {id}); // for test
  });

  passport.use(require('./passport/local'));
}