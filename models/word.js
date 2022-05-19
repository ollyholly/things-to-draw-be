const mongoose = require('mongoose');
const { tags } = require('../data/constants');

const wordSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    tags: [{ type: String, enum: tags }],
  },
);

module.exports = mongoose.model('Word', wordSchema);
