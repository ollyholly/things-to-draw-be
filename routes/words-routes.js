const express = require('express');

const router = express.Router();

const {
  createWord, getWords, getRandomWord, getWordById, createWords,
} = require('../controllers/words-controllers');

router.get('/', getWords);

router.post('/random', getRandomWord);

router.get('/:wid', getWordById);

router.post('/', createWord);

router.post('/multiple', createWords);

module.exports = router;
