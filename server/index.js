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
auth.configure(app);

/**
 * Verify that user is authenticated.
 */
function verify(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

/**
 * Log user in with passport.
 */
app.post('/login', auth.authenticate('local', {
  successRedirect: '/load',
  failureRedirect: '/',
}));

/**
 * Create new user entry in database.
 */
app.post('/register', async function(req, res) {
  const { user, pass, config } = req.body;
  try {
    await database.createUser(user, pass, config);
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e);
  }
});

/**
 * Retrieve user settings/notes from database.
 * Required authentication.
 */
app.get('/load', verify, async function(req, res) {
  const { user } = req.body;
  try {
    const data = await database.getUser(user);
    res.status(200).json(data);
  } catch(e) {
    res.status(500).send(e);
  }
});

/**
 * Save user settings/notes to database.
 * Required authentication.
 */
app.post('/save', verify, async function(req, res) {
  const { user, config } = req.body;
  try {
    await database.saveState(user, config);
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e);
  }
});

/**
 * Delete user settings/notes from database.
 * Required authentication.
 */
app.post('/delete', verify, async function(req, res) {
  const { user } = req.body;
  try {
    await database.deleteUser(user);
  } catch(e) {
    res.status(500).send(e);
  }
});

/**
 * Log the user out. Redirect to homepage.
 * TODO reset html elements on client side.
 */
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.post('/clear', async (req, res) => {
  try {
    await database.clear();
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e);
  }
});


/**
 * Open server on ${port}.
 */
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});