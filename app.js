const express = require('express');
// const bodyParser = require('body-parser');

const wordsRoutes = require('./routes/words-routes');
const categoriesRoutes = require('./routes/categories-routes');
const packsRoutes = require('./routes/packs-routes');

const app = express();

app.use('/api/words', wordsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/packs', packsRoutes);

app.listen(4000);
