const express = require('express');

const router = express.Router();

const { createWord, getWords, getRandomWord } = require('../controllers/words-controllers');

router.get('/', getWords);

router.get('/random', getRandomWord);

router.post('/', createWord);

module.exports = router;
