const express = require('express');
const Charger = require('../models/charger.model');
const Device = require('../models/device.model');
const SubacoModule = require('../models/subaco_module.model');

const router = express.Router();
router.use('/user', require('./api/user'));
router.use('/charge', require('./api/charge'));

router.get('/', (req, res) => {
  const body = {
    ok    : false,
    error : 'Please specify a method.'
  };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(body);
});

router.get('/charger/list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await Charger.find({}).sort('-last_discharge').catch((err) => { console.error(err); }));
});

router.get('/device/list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await Device.find({}).sort('-last_charge').catch((err) => { console.error(err); }));
});

router.get('/module/list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await SubacoModule.find({}).sort('-last_charge').catch((err) => { console.error(err); }));
});

module.exports = router;
