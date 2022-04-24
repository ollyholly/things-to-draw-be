const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    gameMode: { type: String, required: true },
    user: { type: String, required: true },
  },
);

module.exports = mongoose.model('Prompt', promptSchema);
