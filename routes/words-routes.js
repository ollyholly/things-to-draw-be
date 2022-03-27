const express = require('express');

const router = express.Router();

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

router.get('/', (req, res) => {
  console.log('GET request in Words');
  res.json(DUMMY_WORDS);
});

router.get('/:wid', (req, res) => {
  const wordId = req.params.wid;
  const word = DUMMY_WORDS.find((w) => w.id === wordId);
  res.json(word);
});

module.exports = router;
