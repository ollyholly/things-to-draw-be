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

const getWordById = async (req, res, next) => {
  const wordId = req.params.wid;

  let word;

  try {
    word = await Word.findById(wordId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get words.',
      500,
    );
    return next(error);
  }

  if (!word) {
    const error = new HttpError(`Could not find word for the id ${wordId}`, 404);

    return next(error);
  }

  res.json({ word });
};

const getRandomWord = async (req, res, next) => {
  let word;
  const { tags } = req.body;
  const query = { tags: { $all: tags } };
  try {
    const count = await Word.find(query).count();
    const random = Math.floor(Math.random() * count);
    word = await Word.findOne(query).skip(random);
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
    text, part_of_speech, word_packs,
  } = req.body;

  const createdWord = new Word(
    {
      text,
      part_of_speech,
      word_packs,
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

const createWordDb = async (
  text,
  tags,
) => {
  const createdWord = new Word(
    {
      text,
      tags,
    },
  );

  try {
    await createdWord.save();
  } catch (err) {
    const error = new HttpError(
      'Creating word failed, please try again.',
      500,
    );
    return error;
  }

  return createdWord;
};

const createWords = async (req, res) => {
  const {
    word_list, tags,
  } = req.body;

  const promiseArray = [];

  for (let i = 0; i < word_list.length; i += 1) {
    const word = createWordDb(word_list[i], tags)
      .catch((e) => console.log(e.response));

    promiseArray.push(word);
  }

  let createdWords = [];

  await Promise.all(promiseArray)
    .then((items) => {
      createdWords = [...createdWords, ...items];
    });

  res.status(201).json({ words: createdWords });
};

module.exports = {
  createWord,
  getWords,
  getRandomWord,
  getWordById,
  createWords,
};
