const express = require('express');

const router = express.Router();

const { createWord, getWords } = require('../controllers/words-controllers');

router.get('/', getWords);

router.post('/', createWord);

module.exports = router;
