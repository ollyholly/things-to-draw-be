const mongoose = require('mongoose');
require('dotenv').config();
const Word = require('../models/word');

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log('Connected!');
}).catch(() => {
  console.log('Connection failed!');
});

const createWord = async (req, res) => {
  const newWord = new Word(
    {
      text: req.body.text,
      partOfSpeech: req.body.partOfSpeech,
      category: req.body.category,
      pack: req.body.pack,
    },

  );
  const result = await newWord.save();

  res.json(result);
};

module.exports = {
  createWord,
};
