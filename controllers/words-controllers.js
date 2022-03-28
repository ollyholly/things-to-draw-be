const HttpError = require('../models/http-error');
const Word = require('../models/word');

const getWords = async (req, res, next) => {
  let words;
  try {
    words = await Word.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get words.',
      500,
    );
    return next(error);
  }

  res.json({ words });
};

const getRandomWord = async (req, res, next) => {
  let word;
  try {
    const count = await Word.find({ partOfSpeech: req.query.partOfSpeech }).count();
    const random = Math.floor(Math.random() * count);
    word = await Word.findOne({ partOfSpeech: req.query.partOfSpeech }).skip(random);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get words.',
      500,
    );
    return next(error);
  }

  res.json({ randomWord: word });
};

const createWord = async (req, res, next) => {
  const {
    text, partOfSpeech, category, pack,
  } = req.body;

  const createdWord = new Word(
    {
      text,
      partOfSpeech,
      category,
      pack,
    },
  );

  try {
    await createdWord.save();
  } catch (err) {
    const error = new HttpError(
      'Creating word failed, please try again.',
      500,
    );
    return next(error);
  }

  res.status(201).json({ word: createdWord });
};

module.exports = {
  createWord,
  getWords,
  getRandomWord,
};
