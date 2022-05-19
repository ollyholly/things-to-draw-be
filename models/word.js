const mongoose = require('mongoose');
const { wordPacks } = require('../data/constants');

const wordSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    tags: [{ type: String, enum: wordPacks }],
  },
);

module.exports = mongoose.model('Word', wordSchema);
