require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const endpoints = require('./routes');
const stokabService = require('./services/stokab.service');
const helper = require('./helper');
const errorHandler = require('./helper/error-handler');
const jwt = require('./helper/jwt');
const sessionMiddleware = require('./helper/session-middleware');

// check for migrations
const seq = require('./helper/sequelize');

seq.checkForMigrations().then((migrations) => {
  if (migrations.length) {
    // eslint-disable-next-line no-console
    console.error('Pending migrations need to be run:\n',
      migrations.map((migration) => migration.file).join('\n '),
      '\nUse this command to run migrations:\n "yarn sequelize db:migrate" or "npm run sequelize db:migrate"');
    process.exit(1);
  }
});

const app = express(express);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable cors for dev
app.use(helper.cors);

// initialize session to store quality
app.enable('trust proxy');
app.use(session({
  secret: process.env.SESSION_SECRET || 'servercentralen-session-scecret',
  resave: false,
  saveUninitialized: false,
}));

// use JWT auth to secure the api
app.use(['/api'], jwt(), sessionMiddleware);

// define endpoints
endpoints(app);

// initialize public path to store images
const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));

app.use(express.static(path.join(__dirname, './dist')));
app.use('/', express.static(`${__dirname}./`));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});
app.get('/**', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

// global error handler
app.use(errorHandler);
stokabService.getToken();

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Connected & Listen to port 8080');
});
