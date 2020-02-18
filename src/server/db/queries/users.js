const bcrypt = require('bcryptjs');
const knex = require('../connection');

function addUser({ email, password }) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return knex('users')
    .insert({
      email: email,
      password: hash,
    })
    .returning('*');
}

function findUserByEmail(email) {
  return knex('users')
    .where({ email })
    .first();
}

module.exports = {
  addUser,
  findUserByEmail,
};
