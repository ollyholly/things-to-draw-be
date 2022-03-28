const express = require('express');

const router = express.Router();

const { getWords } = require('../src/mongo');
const { createWord } = require('../src/mongoose');

router.get('/', getWords);

router.get('/:wid', (req, res) => {
  // const wordId = req.params.wid;
  const word = 'some word';
  // const word = DUMMY_WORDS.find((w) => w.id === wordId);
  res.json(word);
});

router.post('/', createWord);

module.exports = router;
