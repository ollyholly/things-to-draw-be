const HttpError = require('../models/http-error');
const Word = require('../models/word');

const getRandomWord = async (partOfSpeech) => {
  let word;
  try {
    const count = await Word.find({ partOfSpeech }).count();
    const random = Math.floor(Math.random() * count);
    word = await Word.findOne({ partOfSpeech }).skip(random);
  } catch (err) {
    throw new HttpError(
      'Something went wrong, could not get words.',
      500,
    );
  }
  return word;
};

// Add request parameters for prompt structure
// either enum or array with POS
const getRandomPrompt = async (req, res, next) => {
  let prompt;
  try {
    // Refactor this to iterate over array of params
    // promise all
    const noun = await getRandomWord('noun');
    const adjective = await getRandomWord('adjective');
    const verb = await getRandomWord('verb');

    // return an object
    prompt = `${adjective.text} ${noun.text} ${verb.text}s`;
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get words.',
      500,
    );
    return next(error);
  }

  res.json({ randomPrompt: prompt });
};

module.exports = {
  getRandomPrompt,
};
