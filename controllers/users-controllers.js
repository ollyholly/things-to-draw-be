const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let Users;
  try {
    Users = await User.find();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get Users.',
      500,
    );
    return next(error);
  }

  res.json({ Users });
};

const getRandomUser = async (req, res, next) => {
  let user;
  const { partOfSpeech } = req.query;
  try {
    const count = await User.find({ partOfSpeech }).count();
    const random = Math.floor(Math.random() * count);
    user = await User.findOne({ partOfSpeech }).skip(random);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get Users.',
      500,
    );
    return next(error);
  }

  res.json({ randomUser: user });
};

const createUser = async (req, res, next) => {
  const {
    text, partOfSpeech, category, pack,
  } = req.body;

  const createdUser = new User(
    {
      text,
      partOfSpeech,
      category,
      pack,
    },
  );

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Creating user failed, please try again.',
      500,
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser });
};

module.exports = {
  createUser,
  getUsers,
  getRandomUser,
};
