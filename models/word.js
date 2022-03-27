const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    pack: { type: String, required: true },
  },
);

module.exports = mongoose.model('Word', wordSchema);
