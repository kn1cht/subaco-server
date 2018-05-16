const express = require('express');
const Charge = require('../../models/charge.model');
const Charger = require('../../models/charger.model');
const Device = require('../../models/device.model');
const RecentCharge = require('../../models/recent_charge.model');
const SubacoModule = require('../../models/subaco_module.model');
const User = require('../../models/user.model');

const router = express.Router();

const findSubacoModuleFromToken = (token) => {
  return SubacoModule.findOne({ token }).catch((err) => { console.error(err); });
}

router.get('/list', async(req, res) => {
  if(req.isUnauthenticated()) {
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  res.header('Content-Type', 'application/json; charset=utf-8');
  const list = await Charge.find({
    user_id : req.user._id
  }).sort('-created_at')
    .populate('device_id', 'name')
    .populate('charger_id', 'name')
    .catch((err) => { console.error(err); });
  res.send({ ok : true, list });
});

router.get('/latest', async(req, res) => {
  if(req.isUnauthenticated()) {
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  res.header('Content-Type', 'application/json; charset=utf-8');
  const charge = (await Charge.find({
    user_id : req.user._id
  }).sort('-created_at').limit(1))[0];
  res.send({ ok : true, charge });
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

  const subacoModule = await findSubacoModuleFromToken(data.token);
  if(!subacoModule) {
    res.send({ ok : false, error : 'Wrong token' });
    return;
  }
  // create charge start event
  const recentCharge = new RecentCharge({
    is_charging : true,
    user_id     : subacoModule.user_id
  });
  recentCharge.save().catch((err) => { console.error(err); });
  // update user info
  const user = await User.findOneAndUpdate({
    _id : subacoModule.user_id
  }, { $set : {
    is_charging : true
  }}, {
    returnNewDocument : true
  }).catch((err) => { console.error(err); });
  // update device info (or create new one)
  const device = await Device.findOneAndUpdate({
    manufacturer : data.toDevice.manufacturer,
    name         : data.toDevice.name,
    serial       : data.toDevice.serialNum,
    user_id      : subacoModule.user_id
  }, { $set : {
    manufacturer : data.toDevice.manufacturer,
    name         : data.toDevice.name,
    serial       : data.toDevice.serialNum,
    user_id      : subacoModule.user_id,
    last_charge  : new Date(data.ts * 1000)
  }}, {
    returnNewDocument : true,
    upsert            : true // create if not exist
  }).catch((err) => { console.error(err); });
  // update charger info
  const charger = await Charger.findOneAndUpdate({
    _id : user.active_charger_id
  }, { $set : {
    last_discharge : new Date(data.ts * 1000)
  }}).catch((err) => { console.error(err); });
  // create new charge entry
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

  const subacoModule = await findSubacoModuleFromToken(data.token);
  if(!subacoModule) {
    res.send({ ok : false, error : 'wrong token' });
    return;
  }
  const user = await User.findOne({ _id : subacoModule.user_id });
  if(data.state === 0) {
    // update user info if charge ended
    user.is_charging = false;
    user.save();
    // create charge end event
    const recentCharge = new RecentCharge({
      is_charging : false,
      user_id     : subacoModule.user_id
    });
    recentCharge.save().catch((err) => { console.error(err); });
  }

  const latestCharge = (await Charge.find({
    user_id : subacoModule.user_id
  }).sort('-created_at').limit(1))[0];
  const timeFromStart = (new Date(data.ts * 1000) - latestCharge.start_time) / 1000 / 3600;
  const timeFromUpdate = (new Date(data.ts * 1000) - latestCharge.update_time) / 1000 / 3600;
  const capacityDiff = data.current * 5 / 3.6 * timeFromUpdate; // lithium ion battery voltage : 3.6
  const capacity = latestCharge.capacity + capacityDiff;
  // update charger info
  const charger = await Charger.findOne({ _id : user.active_charger_id });
  charger.last_discharge = new Date(data.ts * 1000);
  charger.residual -= capacityDiff; // reduce charger's capacity
  charger.save().catch((err) => { console.error(err); });
  // update charge info
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
