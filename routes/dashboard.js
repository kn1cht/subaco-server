const express = require('express');
const router = express.Router();
const Charge = require('../models/charge.model');
const Charger = require('../models/charger.model');
const Device = require('../models/device.model');

router.get('/', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.render('dashboard', { title : 'ダッシュボード', username : req.user.username });
});

router.get('/charge.list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await Charge.find({}).catch((err) => { console.error(err); }));
});

router.get('/charger.list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await Charger.find({}).catch((err) => { console.error(err); }));
});

router.get('/device.list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await Device.find({}).catch((err) => { console.error(err); }));
});

module.exports = router;
