const fs = require('fs');

const readWordsFromFile = async (key) => {
  const path = `./text/${key}.txt`;

  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      const lines = data.split(/\r?\n/);
      resolve(lines);
    });
  });
};

const genRandomWord = async (key) => {
  const words = await readWordsFromFile(key);

  const randomWord = words[Math.floor(Math.random() * words.length)];

  return randomWord;
};

(async () => {
  try {
    console.log(`${await genRandomWord('adjectives')} ${await genRandomWord('nouns')} ${await genRandomWord('verbs')}`);
  } catch (e) {
    console.error(e);
  }
})();
