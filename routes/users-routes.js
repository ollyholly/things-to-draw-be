const { check } = require('express-validator');

const express = require('express');

const router = express.Router();

const {
  signup, getUsers, getUserById, login,
} = require('../controllers/users-controllers');

router.get('/', getUsers);

router.get('/:uid', getUserById);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup,
);

router.post('/login', login);

module.exports = router;
