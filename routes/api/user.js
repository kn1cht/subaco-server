const express = require('express');
const RecentCharge = require('../../models/recent_charge.model');
const User = require('../../models/user.model');

const router = express.Router();

router.get('/isAuthed', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send({ ok : req.isAuthenticated() });
});

router.get('/info', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  if(req.isUnauthenticated()) {
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  const user = req.user;
  user.ok = true;
  user.password = null;
  res.send(user);
});

router.get('/isCharging/push', async(req, res) => {
  req.socket.setTimeout(Number.MAX_SAFE_INTEGER); // because Infinity causes error
  res.header({
    'Content-Type'  : 'text/event-stream; charset=utf-8',
    'Cache-Control' : 'no-cache',
    'Connection'    : 'keep-alive'
  });
  if(req.isUnauthenticated()) {
    res.send({ ok : false, error : 'Not Authed' });
    return;
  }
  const lastRecord = await RecentCharge.find().sort({ $natural : -1 }).limit(1)[0];
  console.log(lastRecord);
  const cursor = RecentCharge.find({ _id : req.user._id }).gt('_id', lastRecord._id).tailable().cursor();
  let sseId = 0; // event id of server sent event

  cursor.on('error', (err) => { console.error(err); });
  cursor.on('data', (data) => {
    console.log(data);
    res.write(`id: ${sseId++}\n`);
    res.write(`data: ${data.is_charging}\n\n`);
  });
  cursor.on('close', () => {
    console.log('Mongo cursor closed.');
  });

  req.on('close', () => {
    cursor.destroy();
    console.log("Connection closed.");
  });
});

module.exports = router;
