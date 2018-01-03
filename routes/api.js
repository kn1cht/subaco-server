const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const body = {
    ok: false,
    error: 'To use SUBACO API, please use POST method.'
  };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(body);
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
    ok: true
  };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(body);
});

module.exports = router;
