const tags = [
  'easy',
  'hard',
  'animals',
  'fictional characters',
  'people',
  'emotions',
  'characters',
  'nouns',
  'adjectives',
  'verbs',
  'styles',
  'objects',
  'colors',
];

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
  'Single word': {
    request:
      {
        word: { tags: [], custamisable: true },
      },
    formPrompt: ({ word }) => `${word}`,
  },
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
  'In style': {
    request:
      {
        adjective: { tags: ['adjectives'] },
        noun: { tags: ['nouns'] },
        style: { tags: ['styles'], custamisable: true },
      },
    formPrompt: ({ adjective, noun, style }) => `${adjective} ${noun} in ${style} style`,
  },
};

module.exports = {
  tags,
  recipes,
};
