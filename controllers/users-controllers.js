const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500,
    );
    return next(error);
  }

  // res.json({ users });
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not get prompts.',
      500,
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(`Could not find user with id ${userId}`, 404);

    return next(error);
  }

  res.status(201).json({ user: user.toObject({ getters: true }) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422),
    );
  }

  const {
    name, email, password,
  } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Creating user failed, please try again.',
      500,
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(`User with email ${email} already exists. Please login.`, 422);
    return next(error);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (er) {
    const error = new HttpError(
      'Could not create a user, please try again.',
      500,
    );
    return next(error);
  }

  const createdUser = new User(
    {
      name, email, hashedPassword, prompts: [],
    },
  );

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again.',
      500,
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500,
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not find a user.',
      401,
    );
    return next(error);
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compareSync(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Wrong password!', 401);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Wrong password.',
      401,
    );
    return next(error);
  }

  res.json({
    message: 'Logged in!',
    user: existingUser.toObject({ getters: true }),
  });
};

module.exports = {
  signup,
  getUsers,
  getUserById,
  login,
};
