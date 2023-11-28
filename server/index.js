/* -------------------- Setup -------------------- */

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

await database.connect();

/* -------------------- Routes -------------------- */

app.post('/login', auth.authenticate('local', { failureMessage: true }), async (req, res) => {
  const data = {
    "username": req.user["username"],
    "settings": req.user["settings"]
  };
  res.status(200).json(data);
});

app.get('/logout', checkAuth, function(req, res) {
  req.logout((err) => { if (err) { throw new Error(err.toString()); }});
  res.sendStatus(200);
});

app.post('/register', async function(req, res) {
  try {
    await database.createUser(req.body);
    req.login(req.body, err => { if (err) { throw new Error(err.toString()); }});
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e.toString());
  }
});

app.get('/load', checkAuth, async function(req, res) {
  try {
    const data = await database.getUser(req.user.username);
    res.status(200).json(data);
  } catch(e) {
    res.status(500).send(e);
  }
});

app.post('/update', checkAuth, async function(req, res) {
  const settings = req.body;
  console.log(settings);
  try {
    await database.updateUser(req.user.username, settings);
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e.toString());
  }
});

app.post('/delete', checkAuth, async function(req, res) {
  try {
    await database.deleteUser(req.user.username);
    req.logout((err) => { if (err) { throw new Error(err.toString()); }});
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e.toString());
  }
});

// TODO: remove later, just for convenience for me to reset db during dev
app.get('/clear', async (req, res) => {
  try {
    await database.clear();
    res.sendStatus(200);
  } catch(e) {
    res.status(500).send(e);
  }
});

/* -------------------- ETC... -------------------- */

// Authentication middleware
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(404).send("Authentication required.");
  }
}

// Signal handler (closes DB connection)
process.on('SIGINT' || 'SIGTERM', async () => {
  await database.client.close();
  console.log("\nGoodbye!");
  process.exit(0);
});

// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});