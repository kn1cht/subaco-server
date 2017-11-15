const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.post('/', 
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }), (req, res) => {
    res.redirect('/dashboard');
  });

module.exports = router;
