const express = require('express');
const Charge = require('../../models/charge.model');
const Charger = require('../../models/charger.model');
const Device = require('../../models/device.model');
const SubacoModule = require('../../models/subaco_module.model');

const router = express.Router();

router.get('/list', (req, res, next) => {
  if(req.isAuthenticated()) { return next(); }
  res.redirect('../login');
}, async(req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(await Charge.find({}).sort('-created_at')
    .populate('device_id', 'name').populate('charger_id', 'name')
    .catch((err) => { console.error(err); }));
});

router.get('/delete', async(req, res) => {
  if(!req.query.id) {
    res.send({ ok : false, error : 'Please specify id parameter' });
    return;
  }
  await Charge.remove({ _id : req.query.id });
  
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({ ok : true });
});

router.post('/start', async(req, res) => {
  const data = req.body;

  const subacoModule = await SubacoModule.findOne({
    token : data.token
  }).catch((err) => { console.error(err); });
  if(!subacoModule) {
    res.send({ ok : false, error : 'Wrong token' });
    return;
  }
  const device = await Device.findOneAndUpdate({
    name    : data.toDevice.name,
    serial  : data.toDevice.serialNum,
    user_id : subacoModule.user_id
  }, {$set : { 
    name        : data.toDevice.name,
    serial      : data.toDevice.serialNum,
    user_id     : subacoModule.user_id,
    last_charge : new Date(data.ts * 1000) 
  }}, {
    upsert : true // create if not exist
  }).catch((err) => { console.error(err); });

  const charger = (await Charger.find({
    user_id : subacoModule.user_id
  }).sort('-last_discharge').limit(1))[0];
  charger.last_discharge = new Date(data.ts * 1000);
  charger.save();

  const charge = new Charge({
    start_time  : new Date(data.ts * 1000),
    update_time : new Date(data.ts * 1000),
    current     : data.current,
    user_id     : subacoModule.user_id,
    device_id   : device._id,
    charger_id  : charger._id,
    module_id   : subacoModule._id,
    state       : data.state
  });
  await charge.save().catch((err) => { console.error(err); });
  
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({ ok : true });
});

router.post('/append', async(req, res) => {
  const data = req.body;

  const subacoModule = await SubacoModule.findOne({
    token : data.token
  }).catch((err) => { console.error(err); });
  if(!subacoModule) {
    res.send({ ok : false, error : 'wrong token' });
    return;
  }

  const latestCharge = (await Charge.find({
    user_id : subacoModule.user_id
  }).sort('-created_at').limit(1))[0];

  const timeFromStart = (new Date(data.ts * 1000) - latestCharge.start_time) / 1000 / 3600;
  const timeFromUpdate = (new Date(data.ts * 1000) - latestCharge.update_time) / 1000 / 3600;
  const capacityDiff = data.current * 5 / 3.6 * timeFromUpdate; // lithium ion battery voltage : 3.6
  const capacity = latestCharge.capacity + capacityDiff;
  
  const charger = (await Charger.find({
    user_id : subacoModule.user_id
  }).sort('-last_discharge').limit(1))[0];
  charger.last_discharge = new Date(data.ts * 1000);
  charger.residual -= capacityDiff;
  charger.save().catch((err) => { console.error(err); });

  await Charge.update({ _id : latestCharge._id }, {
    $set : {
      current     : capacity / timeFromStart * 3.6 / 5,
      capacity,
      state       : data.state,
      update_time : new Date(data.ts * 1000),
    },
    $setOnInsert : { created_at : new Date() }
  }).catch((err) => { console.error(err); });

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({ ok : true });
});
module.exports = router;
