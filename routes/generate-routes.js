const express = require('express');

const router = express.Router();

const { getRandomPrompt } = require('../controllers/generate-controllers');

router.get('/prompt', getRandomPrompt);

module.exports = router;
