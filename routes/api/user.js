const express = require('express');

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
  res.send({ 
    ok    : true,
    id    : user._id,
    name  : user.username,
    email : user.email
  });
});

module.exports = router;
