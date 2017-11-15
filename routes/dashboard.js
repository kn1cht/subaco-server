const express = require('express');
const router = express.Router();

router.get('/',
  (req, res, next) => {
    if(req.isAuthenticated()) { return next(); }
    res.redirect('../login');
  }, (req, res, next) => {
    res.render('dashboard', { title: 'Dashboard', username : req.user.username });
  }
);

module.exports = router;
