const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/', 
  passport.authenticate('local', {
    failureRedirect : '/#/login',
    failureFlash    : true
  }), (req, res) => {
    res.redirect('/#/dashboard');
  });

module.exports = router;
