const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/',
  (req, res, next) => {
    if(!req.isAuthenticated()) { return next(); }
    res.redirect('../dashboard');
  }, (req, res) => {
    res.render('login', { title : 'ログイン' });
  }
);

router.post('/', 
  passport.authenticate('local', {
    failureRedirect : '/login',
    failureFlash    : true
  }), (req, res) => {
    res.redirect('/dashboard');
  });

module.exports = router;
