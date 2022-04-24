const express = require('express');

const router = express.Router();

const {
  createWord, getWords, getRandomWord, getWordById,
} = require('../controllers/words-controllers');

router.get('/', getWords);

router.get('/random', getRandomWord);

router.get('/:wid', getWordById);

router.post('/', createWord);

module.exports = router;
