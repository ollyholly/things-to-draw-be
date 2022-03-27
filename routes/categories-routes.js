const express = require('express');

const router = express.Router();

router.get('/categories', (req, res, next) => {
  console.log('GET request in Categories');
  res.json({ message: 'it works for categories!' });
});

module.exports = router;
