import passport from 'passport';
import passportLocal from 'passport-local';
import database from './database.js';

const { Strategy } = passportLocal;

const strategy = new Strategy(async function(user, pass, done) {
  if (!await database.userExists(user)) {
    return done(null, false, { message: 'User does not exist.' });
  }
  if (!await database.validatePassword(user, pass)) {
    // should disable logins after N messages
    // delay return to rate-limit brute-force attacks
    await new Promise((r) => setTimeout(r, 2000)); // two second delay
    return done(null, false, { message: 'Incorect password' });
  }
  // success: return user data
  const data = await database.getUser(user);
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
