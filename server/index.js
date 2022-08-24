import 'dotenv/config';
import * as util from './util.js';
import express from 'express';
import logger from 'morgan';
import { MongoClient } from 'mongodb';
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// We will use __dirname later on to send files back to the client.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Session configuration
const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

const client = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });
const port = process.env.PORT || 3000;
const app = express();

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
    // Otherwise, redirect to the login page.
    res.redirect('/login');
  }
}

app.post('/save', async function(req, res) {
  try {
    await client.connect();
    const users = await client.db('onelinerDB').collection('users');
    console.log("Successfully connected to: " + collection.namespace);
    await util.saveEntry(req.body.state, users);
    res.status(200).send("Successfully saved data");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error saving data");
  }
  await client.close();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});