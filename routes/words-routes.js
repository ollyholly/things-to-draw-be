const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('GET request in Words');
  res.json({ message: 'it works!' });
});

router.get('/words', (req, res, next) => {
  console.log('GET request in Words');
  res.json({ message: 'it works in words!' });
});

module.exports = router;
