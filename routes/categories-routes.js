const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({ message: 'it works for categories!' });
});

module.exports = router;
