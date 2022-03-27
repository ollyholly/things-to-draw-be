const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = `mongodb+srv://ollyholly:${process.env.DB_PASSWORD}@cluster0.6vbkm.mongodb.net/DrawingGames?retryWrites=true&w=majority`;

const createWord = async (req, res) => {
  const newWord = {
    text: req.body.text,
    type: req.body.type,
    category: req.body.category,
    pack: req.body.pack,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('words').insertOne(newWord);
  } catch (error) {
    return res.json({ message: 'Could not store data!' });
  }

  client.close();

  res.json(newWord);
};

const getWords = async (req, res) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('words').find().toArray();
    res.json(result);
  } catch (error) {
    return res.json({ message: 'Could not get data!' });
  }

  client.close();
};

module.exports = {
  createWord,
  getWords,
};
