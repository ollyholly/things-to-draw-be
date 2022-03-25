const words = {
  adjectives: ['good', 'bad', 'random', 'red', 'flying',
  ],
  nouns: ['cat', 'dog', 'bird', 'banana'],
  verbs: ['running', 'eating', 'jumping', 'laughing'],
};

const genRandomWord = (key) => {
  const array = words[key];

  const randomWord = array[Math.floor(Math.random() * array.length)];

  return randomWord;
};

console.log(`${genRandomWord('adjectives')} ${genRandomWord('nouns')} ${genRandomWord('verbs')}`);
