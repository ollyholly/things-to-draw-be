const express = require('express');

const router = express.Router();

const { getPrompts, getPromptById, generateRandomPrompt } = require('../controllers/prompts-controllers');

router.get('/', getPrompts);

// router.post('/', createPrompt);

router.get('/:pid', getPromptById);

router.get('/generate', generateRandomPrompt);

module.exports = router;
