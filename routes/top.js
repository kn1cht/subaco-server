const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('top', { title: 'Top' });
});

module.exports = router;
