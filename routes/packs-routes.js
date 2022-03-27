const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('GET request in Packs');
  res.json({ message: 'it works for packs!' });
});

module.exports = router;
