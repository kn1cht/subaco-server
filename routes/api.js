const express = require('express');
const Charge = require('../models/charge.model');
const Charger = require('../models/charger.model');
const Device = require('../models/device.model');
const SubacoModule = require('../models/subaco_module.model');

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

router.get('/user.info/', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  if(req.isUnauthenticated()) { 
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  const user = req.user;
  res.send({ 
    ok    : true,
    id    : user._id,
    name  : user.username,
    email : user.email
  });
});

router.get('/charge.list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await Charge.find({}).sort('-created_at')
    .populate('device_id', 'name').populate('charger_id', 'name')
    .catch((err) => { console.error(err); }));
});

router.get('/charger.list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await Charger.find({}).sort('-last_charge').catch((err) => { console.error(err); }));
});

router.get('/device.list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await Device.find({}).sort('-last_charge').catch((err) => { console.error(err); }));
});

router.post('/charge.append', async(req, res) => {
  const data = req.body;
  console.log(data);

  const subacoModule = await SubacoModule.findOne({
    token : data.token
  }).catch((err) => { console.error(err); });
  if(!subacoModule) { 
    res.send({ ok : false, error : 'wrong token' });
    return;
  }

  const condition = {
    name    : data.toDevice.name,
    serial  : data.toDevice.serialNum,
    user_id : subacoModule.user_id
  };
  const update = { 
    $set : {
      name        : data.toDevice.name,
      serial      : data.toDevice.serialNum,
      last_charge : new Date(data.ts * 1000),
      user_id     : subacoModule.user_id
    },
    $setOnInsert : { created_at : new Date() }
  };

  const device = await Device.findOneAndUpdate(
    condition, update, { upsert : true }
  ).catch((err) => { console.error(err); });

  const latestCharge = (await Charge.find({
    user_id : subacoModule.user_id
  }).sort('-created_at').limit(1))[0];
  
  const charger = (await Charger.find({
    user_id : subacoModule.user_id
  }).sort('-created_at').limit(1))[0];

  if(data.state === 1 || !latestCharge) { // start charging
    const charge = new Charge({
      start_time  : new Date(data.ts * 1000),
      update_time : new Date(data.ts * 1000),
      current     : data.current,
      user_id     : subacoModule.user_id,
      device_id   : device._id,
      charger_id  : latestCharge.charger_id || charger._id,
      module_id   : subacoModule._id,
      state       : data.state
    });
    await charge.save();
  }
  else {
    const timeFromStart = (new Date(data.ts * 1000) - latestCharge.start_time) / 1000 / 3600;
    const timeFromUpdate = (new Date(data.ts * 1000) - latestCharge.update_time) / 1000 / 3600;
    const capacity = latestCharge.capacity + data.current * 5 / 3.6 * timeFromUpdate; // lithium ion battery voltage : 3.6
    
    await Charge.update({ _id : latestCharge._id }, {
      $set : {
        current     : capacity / timeFromStart * 3.6 / 5,
        capacity,
        state       : data.state,
        update_time : new Date(data.ts * 1000),
      },
      $setOnInsert : { created_at : new Date() }
    }).catch((err) => { console.error(err); });
  }
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({ ok : true });
});

module.exports = router;
