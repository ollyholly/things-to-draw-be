const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const wordsRoutes = require('./routes/words-routes');
const categoriesRoutes = require('./routes/categories-routes');
const packsRoutes = require('./routes/packs-routes');
const generateRoutes = require('./routes/generate-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/words', wordsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/packs', packsRoutes);
app.use('/api/generate', generateRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .mongoose.connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('Connected like OMG!');
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
