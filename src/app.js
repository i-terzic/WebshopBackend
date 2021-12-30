const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const api = require('./api');

const middlewares = require('./middlewares');
const info = require('./info');

const app = express();

require('dotenv').config('.env');

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'info.html'));
});

app.use('/api/v1', api);
app.use('/info', info);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
// app, (module.exports = app);
module.exports = app;
