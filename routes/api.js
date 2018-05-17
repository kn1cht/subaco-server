const express = require('express');
const Charger = require('../models/charger.model');
const Device = require('../models/device.model');
const SubacoModule = require('../models/subaco_module.model');

const router = express.Router();
router.use('/user', require('./api/user'));
router.use('/charge', require('./api/charge'));
router.use('/charger', require('./api/charger'));

router.get('/', (req, res) => {
  const body = {
    ok    : false,
    error : 'Please specify a method.'
  };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(body);
});

router.get('/device/list', async(req, res) => {
  if(req.isUnauthenticated()) {
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  res.header('Content-Type', 'application/json; charset=utf-8');
  const list = await Device.find({}).sort('-last_charge')
                            .catch((err) => { console.error(err); });
  res.send({ ok : true, list });
});

router.get('/module/list', async(req, res) => {
  if(req.isUnauthenticated()) {
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  res.header('Content-Type', 'application/json; charset=utf-8');
  const list = await SubacoModule.find({}).sort('-last_charge')
                            .catch((err) => { console.error(err); });
  res.send({ ok : true, list });
});

module.exports = router;
