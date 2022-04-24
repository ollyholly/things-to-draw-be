const express = require('express');

const router = express.Router();

const {
  getPrompts, getPromptById, generateRandomPrompt, createPrompt,
} = require('../controllers/prompts-controllers');

router.get('/', getPrompts);

router.post('/', createPrompt);

router.get('/generate', generateRandomPrompt);

router.get('/:pid', getPromptById);

module.exports = router;
