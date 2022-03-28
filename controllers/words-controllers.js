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
};
