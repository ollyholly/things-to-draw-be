const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Prompt = require('../models/prompt');
const Word = require('../models/word');
const User = require('../models/user');

const getRandomWord = async (partOfSpeech) => {
  let word;
  try {
    const count = await Word.find({ part_of_speech: partOfSpeech }).count();
    const random = Math.floor(Math.random() * count);
    word = await Word.findOne({ part_of_speech: partOfSpeech }).skip(random);
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
  let noun;
  let adjective;
  let verb;

  console.log(req.query);

  try {
    // Refactor this to iterate over array of params
    // promise all
    noun = await getRandomWord('noun');
    adjective = await getRandomWord('adjective');
    verb = await getRandomWord('verb');

    // return an object
    prompt = `${adjective.text} ${noun.text} ${verb.text}s`;
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get words.',
      500,
    );
    return next(error);
  }

  const result = {
    prompt,
    noun: noun.text,
    adjective: adjective.text,
    verb: verb.text,
  };

  res.json(result);
};

const createPrompt = async (req, res, next) => {
  const {
    text, game_mode, user_id,
  } = req.body;

  const createdPrompt = new Prompt(
    {
      text,
      game_mode,
      user_id,
      created_at: new Date(),
    },
  );

  let user;

  try {
    user = await User.findOne({ _id: user_id });
  } catch (err) {
    const error = new HttpError(
      'Couldnt find the user with this id. Creating prompt failed, please try again.',
      500,
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for the provided id.', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPrompt.save({ session: sess });
    user.prompts.push(createdPrompt);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating prompt failed, please try again.',
      500,
    );
    return next(error);
  }

  res.status(201).json({ prompt: createdPrompt });
};

module.exports = {
  generateRandomPrompt,
  getPrompts,
  getPromptById,
  createPrompt,
};
