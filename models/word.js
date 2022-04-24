const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    part_of_speech: { type: String, required: true },
    categories: { type: String, required: true },
  },
);

module.exports = mongoose.model('Word', wordSchema);
