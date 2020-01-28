const passport = require('koa-passport');
const knex = require('./db/connection');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

function comparePasswords(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  return knex('users')
    .where({ email })
    .first()
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      knex('users')
        .where({ email })
        .first()
        .then(user => {
          if (!user) return done(null, false);
          if (!comparePasswords(password, user.password)) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch(err => {
          return done(err);
        });
    },
  ),
);
