const { json } = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 8000;

const LOGIN_DIR = path.resolve(__dirname, 'login');
const LOGIN_INDEX = path.resolve(LOGIN_DIR, 'login.html');

const SITE_DIR = path.resolve(__dirname, 'src', '.vuepress', 'dist');
const SITE_INDEX = path.resolve(SITE_DIR, 'index.html');

/** Express app */
const app = express();

/** Use middleware */
app.use(morgan('dev'));
app.use(json({ strict: true }));

/** Login routes */
app.get('/login', (req, res) => {
  res.sendFile(LOGIN_INDEX);
});

app.post('/api/login', (req, res) => {
  console.log('body:', req.body);

  res.json({ success: true });
});

/** All other routes */
const controller = (req, res) => {
  // res.sendFile(SITE_INDEX);
  res.redirect('/login');
}

app.get('/', controller);
app.get('*.html', controller);

/** Static Directories  */
app.use(express.static(LOGIN_DIR));
app.use(express.static(SITE_DIR));

/** Start server  */
app.listen(PORT, () => {
  console.log(`Magic happens on port ${PORT}...`);
});