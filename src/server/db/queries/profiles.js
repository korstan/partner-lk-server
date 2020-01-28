const knex = require('../connection');

function getSingleProfile(email) {
  return knex('profiles')
    .select('*')
    .where({ email });
}

function addProfile(profile) {
  return knex('profiles')
    .insert(profile)
    .returning('*');
}

function updateProfile(email, profile) {
    return knex('profiles')
    .update(profile)
    .where({ email })
    .returning('*');
}

module.exports = {
  getSingleProfile,
  addProfile,
  updateProfile,
};
