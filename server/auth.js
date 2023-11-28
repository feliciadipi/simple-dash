import passport from 'passport';
import passportLocal from 'passport-local';
import database from './database.js';

const { Strategy } = passportLocal;

const strategy = new Strategy(async function(username, password, done){ // anon is "verify" function
  const data = await database.getUser(username);
  if (!data) {
    return done(null, false, { message: 'Incorrect username' });
  }
  if (data.password !== password) {
    // should disable logins after N messages
    // delay return to rate-limit brute-force attacks
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { message: 'Incorrect password' });
  }
  // done is a parameter to the closure that calling this will return
  // it is defined when you call the closure and pass it a function as an argument
  // it should have the form (err, user, info) => {}
  // success: return user data
  return done(null, data);
});

// Configure passport to use the LocalStrategy object.
passport.use(strategy);

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user);
});

// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

export default {
  configure: (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
  },

  authenticate: (domain, where) => {
    return passport.authenticate(domain, where);
  },
};
