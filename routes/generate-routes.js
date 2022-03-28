const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('GET request in Generate');
  res.json({ message: 'it works for generate!' });
});

module.exports = router;
