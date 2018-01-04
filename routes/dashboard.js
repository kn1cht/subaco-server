const express = require('express');
const router = express.Router();
const Charge = require('../models/charge.model');
//const Charger = require('../models/charger.model');
//const Device = require('../models/device.model');

router.get('/', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.render('dashboard', { title : 'Dashboard', username : req.user.username });
});

router.get('/chargelist', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  const charge = await Charge.find({}).catch((err) => { console.error(err); });
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(charge);
});

module.exports = router;
