import 'dotenv/config';
import express from 'express';
import expressSession from 'express-session';
import logger from 'morgan';
import users from './users.js';
import auth from './auth.js';
import * as rest from './rest.js';
import * as mongo from './mongo.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));
const sessionConfig = {
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

// Use Morgan logger
app.use(logger('dev'));
// Allow static file serving
app.use('/client', express.static('client'));
// Setup the session middleware
app.use(expressSession(sessionConfig));
// Allow JSON inputs
app.use(express.json());
// Allow URLencoded data
app.use(express.urlencoded({ extended: true }));
// Configure our authentication strategy
auth.configure(app);

// Our own middleware to check if the user is authenticated
function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, yell at the user.
    res.status(401).send('Hey! You must be logged in to do that! 🤬');
  }
} 

app.post('/register', async function(req, res) {
});

app.post('/login', async function(req, res) {
});

app.post('/update/user', async function(req, res) {
});

app.post('/delete/user', async function(req, res) {
});

app.post('/save/state', async function(req, res) {
  try {
    const client = await mongo.connect();
    const states = await mongo.getCollection(client, 'onelinerDB', 'states');
    console.log("Connected..."); // A little checkpoint
    await rest.saveState(req.body, states);
    await client.close;
    res.status(200).send('Success');
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/update/state', async function(req, res) {
});

app.post('/delete/state', async function(req, res) {
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});