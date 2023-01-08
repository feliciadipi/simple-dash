import 'dotenv/config';
import express from 'express';
import expressSession from 'express-session';
import logger from 'morgan';
import database from './database.js';
import auth from './auth.js';

const app = express();
const port = process.env.PORT || 3000;
const sessionConfig = {
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

app.use(logger('dev'));
app.use(expressSession(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('client'));
auth.configure(app);

function verify(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

app.post('/login', auth.authenticate('local', { successRedirect: '/', failureRedirect: '/', failureMessage: true }));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(req.body);
    await database.createUser(username, password);
  } catch(e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.get('/load', verify, async function(req, res) {
  try {
    const data = await database.getUser(req.user);
    res.status(200).json(data);
  } catch(e) {
    res.status(500).send(e);
  }
});

app.post('/save', verify, async function(req, res) {
  const { user, state } = req.body;
  try {
    await database.saveState(user, state);
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e);
  }
});

app.post('/delete', verify, async function(req, res) {
  const { user } = req.body;
  try {
    await database.deleteUser(user);
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e);
  }
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// TODO: remove later, just for convenience for me to reset db during dev
app.post('/clear', async (req, res) => {
  try {
    await database.clear();
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});