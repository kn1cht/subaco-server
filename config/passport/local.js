const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user.model');

const getHash = (target) => {
  const sha = crypto.createHmac('sha256', process.env.HMAC_SECRET || '');
  sha.update(target);
  return sha.digest('hex');
};

module.exports = new LocalStrategy(async(username, password, done) => {
  const user = await User.findOne({ username }).catch((err) => { 
    console.error(err); 
  });
  if(!user) {
    return done(null, false, { message : 'ユーザーが見つかりませんでした。' });
  }
  if(user.password !== getHash(password)) {
    return done(null, false, { message : 'パスワードが間違っています。' });
  }
  return done(null, user);
});
