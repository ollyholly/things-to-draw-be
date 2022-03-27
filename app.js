const express = require('express');
// const bodyParser = require('body-parser');

const wordsRoutes = require('./routes/words-routes');
const categoriesRoutes = require('./routes/categories-routes');
const packsRoutes = require('./routes/packs-routes');

const app = express();

app.use(wordsRoutes);
app.use(categoriesRoutes);
app.use(packsRoutes);

app.listen(4000);
