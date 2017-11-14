const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy((username, password, done) => {
  var user = {id: 'test', username: 'testuser', password: 't3stUs3r'};

  if(username === user.username && password === user.password) {
    return done(null, user);
  }else {
    return done(null, false, {message: 'ログインに失敗しました。'});
  }
  /*User.findOne({ username: username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { message: 'ユーザーIDが正しくありません。' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'パスワードが正しくありません。' });
    }
    return done(null, user);
  });*/
});

