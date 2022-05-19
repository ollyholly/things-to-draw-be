const wordPacks = ['easy', 'hard', 'animals', 'fictional characters'];

const recipes = {
  'Adjective Noun Verb': [
    {
      part_of_speech: 'noun',
    },
    {
      part_of_speech: 'adjective',
    },
    {
      part_of_speech: 'verb',
    },
  ],
  'Character + Environment': [
    {
      part_of_spech: 'noun',
      word_packs: [],
    },
    {
      word_packs: ['environment'],
    },
  ],
  'Single word': [],
  'Emotion + Character': [
    {
      part_of_spech: 'adjective',
      word_packs: ['emotions'],
    },
    {
      part_of_spech: 'noun',
      word_packs: [],
    },
  ],
};

module.exports = {
  wordPacks,
  recipes,
};
