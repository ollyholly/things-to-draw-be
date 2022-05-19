const wordPacks = ['easy', 'hard', 'animals', 'fictional characters', 'people', 'emotions', 'characters', 'nouns', 'adjectives', 'verbs'];

const recipes = {
  'Adjective Noun Verb': {
    request:
      {
        noun: { tags: ['nouns'], custamisable: true },
        adjective: { tags: ['adjectives'], custamisable: true },
        verb: { tags: ['verbs'], custamisable: true },
      },
    formPrompt: ({ adjective, noun, verb }) => `${adjective} ${noun} ${verb}s`,
  },
  'Character + Environment': [
    {
      part_of_speech: 'noun',
      word_packs: [],
    },
    {
      word_packs: ['environment'],
    },
  ],
  'Single word': [],
  'Emotion Character': {
    request:
      {
        emotion: { tags: ['emotions'] },
        character: { tags: ['characters'], custamisable: true },
      },
    formPrompt: ({ emotion, character }) => `${emotion} ${character}`,
  },
  'Two characters story': {
    request:
      {
        characterOne: { tags: ['characters'], custamisable: true },
        characterTwo: { tags: ['characters'], custamisable: true },
        action: { tags: ['verbs'], custamisable: false },
      },
    formPrompt: ({ characterOne, characterTwo, action }) => `${characterOne} and ${characterTwo} ${action}`,
  },
};

module.exports = {
  wordPacks,
  recipes,
};
