const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    game_mode: { type: String, required: true },
    created_at: { type: Date, required: true },
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  },
);

module.exports = mongoose.model('Prompt', promptSchema);
