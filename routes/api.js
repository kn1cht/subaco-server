const express = require('express');
const Charge = require('../models/charge.model');
const Charger = require('../models/charger.model');
const Device = require('../models/device.model');

const router = express.Router();

router.get('/', (req, res) => {
  const body = {
    ok    : false,
    error : 'To use SUBACO API, please use POST method.'
  };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(body);
});

router.get('/user.isAuthed/', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({ ok : req.isAuthenticated() });
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

router.post('/', (req, res) => {
  /*
  {
    token,
    ts,
    current,
    toDevice {
      name,
      manufacturer,
      serialNum
    },
    type : [start, continue, end]
  }
  */
  console.log(req.body);
  const body = {
    ok : true
  };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(body);
});

module.exports = router;
