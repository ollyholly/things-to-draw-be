const express = require('express');

const router = express.Router();

const { getWords } = require('../src/mongo');
const { createWord } = require('../src/mongoose');

const DUMMY_WORDS = [
  {
    id: 'w1',
    text: 'dog',
    type: 'noun',
    category: [
      'animal',
      'main',
    ],
    pack: ['easy'],
  },
  {
    id: 'w2',
    text: 'cat',
    type: 'noun',
    category: [
      'animal',
      'main',
    ],
    pack: ['easy'],
  },
  {
    id: 'w3',
    text: 'bird',
    type: 'noun',
    category: [
      'animal',
      'main',
    ],
    pack: ['easy'],
  },
];

router.get('/', getWords);

router.get('/:wid', (req, res) => {
  const wordId = req.params.wid;
  const word = DUMMY_WORDS.find((w) => w.id === wordId);
  res.json(word);
});

router.post('/', createWord);

module.exports = router;
