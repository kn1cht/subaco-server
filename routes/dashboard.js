const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Charge = require('../models/charge.model');
const Charger = require('../models/charger.model');
const Device = require('../models/device.model');

router.get('/',
  (req, res, next) => {
    if(req.isAuthenticated()) { return next(); }
    res.redirect('../login');
  }, async(req, res, next) => {
    const charge = await Charge.find({}).catch((err) => { 
      console.error(err); 
    });
    console.log(charge);

    res.render('dashboard', { title: 'Dashboard', username : req.user.username });
  }
);

module.exports = router;
