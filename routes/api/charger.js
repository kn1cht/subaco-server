const express = require('express');
const Charger = require('../../models/charger.model');
const User = require('../../models/user.model');

const router = express.Router();

router.get('/list', async(req, res) => {
  if(req.isUnauthenticated()) {
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  res.header('Content-Type', 'application/json; charset=utf-8');
  const list = await Charger.find({}).sort('-last_discharge')
    .catch((err) => { console.error(err); });
  res.send({ ok : true, list });
});

router.get('/activate', async(req, res) => {
  if(req.isUnauthenticated()) {
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  if(!req.query.id) {
    res.send({ ok : false, error : 'Please specify id parameter' });
    return;
  }
  await User.update({
    _id : req.user._id
  }, { $set : {
    active_charger_id : req.query.id
  }});

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({ ok : true });
});

router.get('/setFull', async(req, res) => {
  if(req.isUnauthenticated()) {
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  if(!req.query.id) {
    res.send({ ok : false, error : 'Please specify id parameter' });
    return;
  }
  const charger = await Charger.findOne({ _id : req.query.id });
  charger.residual = charger.capacity;
  await charger.save().catch((err) => { console.error(err); });

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({ ok : true });
});
module.exports = router;
