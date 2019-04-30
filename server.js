const { json } = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const ms = require('ms');
const path = require('path');
const { includes } = require('ramda');

/**
 * Configs
 */
const PORT = process.env.PORT || 8000;
const SECRETKEY = process.env.SECRETKEY || 'secret';
const USERNAMES = process.env.USERNAMES || 'user:name';
const PASSWORD = process.env.PASSWORD || 'password';
const LOGIN_DIR = path.resolve(__dirname, 'login');
const LOGIN_INDEX = path.resolve(LOGIN_DIR, 'login.html');
const SITE_DIR = path.resolve(__dirname, 'src', '.vuepress', 'dist');
const SITE_INDEX = path.resolve(SITE_DIR, 'index.html');

const validUsers = USERNAMES.split(':');

/**
 * Express app
 */
const app = express();

/**
 * Middleware
 */
app.use(morgan('dev'));
app.use(json({ strict: true }));
app.use(cookieParser(SECRETKEY));

/**
 * Login page
 */
app.get('/login', (req, res) => {
  if(req.cookies.auth) {
    res.redirect('/');
  } else {
    res.sendFile(LOGIN_INDEX);
  }
});

/**
 * Login route
 */
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const isValidUser = includes(username, validUsers);
  const isValidPassword = password === PASSWORD;

  if (isValidUser && isValidPassword) {
    const token = jwt.sign({ username }, SECRETKEY);
    res.cookie('auth', token, { httpOnly: true, maxAge: ms('1d') });
    return res.sendStatus(200);
  }

  return res.sendStatus(401);
});

/**
 * Site page
 */
const controller = (req, res) => {
  if(req.cookies.auth) {
    res.sendFile(SITE_INDEX);
  } else {
    res.redirect('/login');
  }
}

app.get('/', controller);
app.get('*.html', controller);

/**
 * Static Directories
 */
app.use(express.static(LOGIN_DIR));
app.use(express.static(SITE_DIR));

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}...`);
});