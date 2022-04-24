const HttpError = require('../models/http-error');
const Prompt = require('../models/prompt');
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

const getPrompts = async (req, res, next) => {
  let prompts;
  try {
    prompts = await Prompt.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get words.',
      500,
    );
    return next(error);
  }

  res.json({ prompts });
};

const getPromptById = async (req, res, next) => {
  const promptId = req.params.wid;

  let prompt;

  try {
    prompt = await Prompt.findById(promptId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get prompts.',
      500,
    );
    return next(error);
  }

  if (!prompt) {
    const error = new HttpError(`Could not find Prompt for the id ${promptId}`, 404);

    return next(error);
  }

  res.json({ prompt });
};

// Add request parameters for prompt structure
// either enum or array with POS
const generateRandomPrompt = async (req, res, next) => {
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

// const createPrompt = async (req, res, next) => {{
//   const {
//     text, gameMode, user
//   } = req.body;

//   const createdUser = new User(
//     {
//       text,
//       partOfSpeech,
//       category,
//       pack,
//     },
//   );

//   try {
//     await createdUser.save();
//   } catch (err) {
//     const error = new HttpError(
//       'Creating user failed, please try again.',
//       500,
//     );
//     return next(error);
//   }

//   res.status(201).json({ user: createdUser });
// };

module.exports = {
  generateRandomPrompt,
  getPrompts,
  getPromptById,
};
