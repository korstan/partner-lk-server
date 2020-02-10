const config = require('../config');
const passport = require('koa-passport');
const knex = require('./db/connection');
const bcrypt = require('bcryptjs');
const { findUserByEmail } = require('./db/queries/users');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

function comparePasswords(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  return findUserByEmail(email)
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
      session: 'false',
    },
    (email, password, done) => {
      findUserByEmail(email)
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

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.SECRET,
    },
    (payload, done) => {
      return findUserByEmail(payload.sub)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => {
          console.log(err);
          done(err, false);
        });
    },
  ),
);
