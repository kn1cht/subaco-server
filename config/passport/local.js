const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user.model');

const getHash = (target) => {
  const sha = crypto.createHmac('sha256', process.env.HMAC_SECRET || '');
  sha.update(target);
  return sha.digest('hex');
};

module.exports = new LocalStrategy((username, password, done) => {
  process.nextTick(()=> {
    User.findOne({ username }, (err, user) => {
      if (err) { return done(err); }
      if(!user) {
        return done(null, false, { message : "ユーザーが見つかりませんでした。" });
      }
      const hashedPassword = getHash(password);
      if(user.password !== hashedPassword) {
        return done(null, false, { message : "パスワードが間違っています。" });
      }
      return done(null, user);
    });
  });
});
