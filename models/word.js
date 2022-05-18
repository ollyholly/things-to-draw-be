const mongoose = require('mongoose');
const { wordPacks } = require('../data/constants');

const wordSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    part_of_speech: { type: String, required: true },
    word_packs: [{ type: String, enum: wordPacks }],
  },
);

module.exports = mongoose.model('Word', wordSchema);
